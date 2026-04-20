import { inject, Injectable } from '@angular/core';
import { CategoriesService } from './categories.service';
import { PaymentMethod, TransactionRow, TransactionType } from './transactions.service';

export interface CsvImportRow {
  date: string;
  type: TransactionType;
  amount: number;
  categoryName: string;
  categoryId: string | null;
  description: string;
  paymentMethod: PaymentMethod;
  error: string | null;
  line: number;
}

const HEADER = 'date,type,amount,category,description,payment_method';
const VALID_TYPES: TransactionType[] = ['income', 'expense'];
const VALID_METHODS: PaymentMethod[] = ['cash', 'card', 'transfer'];

@Injectable({ providedIn: 'root' })
export class CsvService {
  private readonly categories = inject(CategoriesService);

  /**
   * Generate CSV string from transaction rows.
   * Category names use the display name (translated for predefined).
   */
  exportToCsv(rows: TransactionRow[], getCategoryName: (id: string) => string): string {
    const lines = [HEADER];
    for (const tx of rows) {
      const cat = this.escapeCsv(getCategoryName(tx.category_id));
      const desc = this.escapeCsv(tx.description ?? '');
      lines.push(
        `${tx.transaction_date},${tx.type},${tx.amount},${cat},${desc},${tx.payment_method}`,
      );
    }
    return lines.join('\n');
  }

  /** Trigger a browser download of a CSV string. */
  downloadCsv(content: string, filename: string): void {
    const blob = new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Parse a CSV string and validate each row.
   * Returns valid rows with resolved category IDs and rows with errors.
   */
  parseImport(csvText: string): CsvImportRow[] {
    const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
    if (lines.length === 0) return [];

    // Skip header if present
    const firstLine = lines[0].toLowerCase();
    const startIdx = firstLine.includes('date') && firstLine.includes('type') ? 1 : 0;

    const categoryMap = this.buildCategoryMap();
    const results: CsvImportRow[] = [];

    for (let i = startIdx; i < lines.length; i++) {
      const fields = this.parseCsvLine(lines[i]);
      const lineNum = i + 1;

      if (fields.length < 4) {
        results.push(this.errorRow(lineNum, fields, 'Insufficient columns (min 4)'));
        continue;
      }

      const [dateStr, typeStr, amountStr, catName, desc, methodStr] = fields;

      // Validate date
      if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr ?? '')) {
        results.push(this.errorRow(lineNum, fields, `Invalid date: ${dateStr}`));
        continue;
      }

      // Validate type
      const type = (typeStr ?? '').toLowerCase() as TransactionType;
      if (!VALID_TYPES.includes(type)) {
        results.push(
          this.errorRow(lineNum, fields, `Invalid type: ${typeStr} (use income/expense)`),
        );
        continue;
      }

      // Validate amount
      const amount = parseFloat(amountStr ?? '');
      if (isNaN(amount) || amount <= 0) {
        results.push(this.errorRow(lineNum, fields, `Invalid amount: ${amountStr}`));
        continue;
      }

      // Match category
      const catId = categoryMap.get((catName ?? '').toLowerCase().trim()) ?? null;

      // Payment method (optional, default card)
      const pm = (methodStr ?? 'card').toLowerCase().trim() as PaymentMethod;
      const paymentMethod = VALID_METHODS.includes(pm) ? pm : 'card';

      results.push({
        line: lineNum,
        date: dateStr,
        type,
        amount,
        categoryName: catName ?? '',
        categoryId: catId,
        description: desc ?? '',
        paymentMethod,
        error: catId ? null : `Unknown category: "${catName}"`,
      });
    }
    return results;
  }

  /** Build a case-insensitive map of category display names → IDs. */
  private buildCategoryMap(): Map<string, string> {
    const map = new Map<string, string>();
    for (const cat of this.categories.all()) {
      map.set(cat.name.toLowerCase(), cat.id);
      // Also map the translated name for predefined
      const displayName = this.categories.displayName(cat);
      map.set(displayName.toLowerCase(), cat.id);
    }
    return map;
  }

  private errorRow(line: number, fields: string[], error: string): CsvImportRow {
    return {
      line,
      date: fields[0] ?? '',
      type: 'expense',
      amount: 0,
      categoryName: fields[3] ?? '',
      categoryId: null,
      description: fields[4] ?? '',
      paymentMethod: 'card',
      error,
    };
  }

  private escapeCsv(value: string): string {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }

  private parseCsvLine(line: string): string[] {
    const fields: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (inQuotes) {
        if (ch === '"' && line[i + 1] === '"') {
          current += '"';
          i++;
        } else if (ch === '"') {
          inQuotes = false;
        } else {
          current += ch;
        }
      } else {
        if (ch === '"') {
          inQuotes = true;
        } else if (ch === ',') {
          fields.push(current);
          current = '';
        } else {
          current += ch;
        }
      }
    }
    fields.push(current);
    return fields;
  }
}
