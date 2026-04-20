export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.5';
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      accounts: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          id: string;
          is_default: boolean;
          name: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          is_default?: boolean;
          name: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          is_default?: boolean;
          name?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      budgets: {
        Row: {
          amount: number;
          category_id: string;
          created_at: string;
          id: string;
          period: Database['public']['Enums']['budget_period'];
          updated_at: string;
          user_id: string;
        };
        Insert: {
          amount: number;
          category_id: string;
          created_at?: string;
          id?: string;
          period?: Database['public']['Enums']['budget_period'];
          updated_at?: string;
          user_id: string;
        };
        Update: {
          amount?: number;
          category_id?: string;
          created_at?: string;
          id?: string;
          period?: Database['public']['Enums']['budget_period'];
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'budgets_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
        ];
      };
      transfers: {
        Row: {
          id: string;
          user_id: string;
          from_account_id: string;
          to_account_id: string;
          amount: number;
          transfer_date: string;
          description: string | null;
          from_transaction_id: string | null;
          to_transaction_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          from_account_id: string;
          to_account_id: string;
          amount: number;
          transfer_date?: string;
          description?: string | null;
          from_transaction_id?: string | null;
          to_transaction_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          from_account_id?: string;
          to_account_id?: string;
          amount?: number;
          transfer_date?: string;
          description?: string | null;
          from_transaction_id?: string | null;
          to_transaction_id?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'transfers_from_account_id_fkey';
            columns: ['from_account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'transfers_to_account_id_fkey';
            columns: ['to_account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
        ];
      };
      categories: {
        Row: {
          color: string | null;
          created_at: string;
          deleted_at: string | null;
          i18n_key: string | null;
          icon: string | null;
          id: string;
          is_predefined: boolean;
          name: string;
          type: Database['public']['Enums']['category_type'];
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          color?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          i18n_key?: string | null;
          icon?: string | null;
          id?: string;
          is_predefined?: boolean;
          name: string;
          type: Database['public']['Enums']['category_type'];
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          color?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          i18n_key?: string | null;
          icon?: string | null;
          id?: string;
          is_predefined?: boolean;
          name?: string;
          type?: Database['public']['Enums']['category_type'];
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          created_at: string;
          currency: string;
          date_format: string;
          id: string;
          language: string;
          theme: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          currency?: string;
          date_format?: string;
          id: string;
          language?: string;
          theme?: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          currency?: string;
          date_format?: string;
          id?: string;
          language?: string;
          theme?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      recurrence_exceptions: {
        Row: {
          action: Database['public']['Enums']['recurrence_exception_action'];
          created_at: string;
          id: string;
          original_date: string;
          recurrence_id: string;
          transaction_id: string | null;
        };
        Insert: {
          action: Database['public']['Enums']['recurrence_exception_action'];
          created_at?: string;
          id?: string;
          original_date: string;
          recurrence_id: string;
          transaction_id?: string | null;
        };
        Update: {
          action?: Database['public']['Enums']['recurrence_exception_action'];
          created_at?: string;
          id?: string;
          original_date?: string;
          recurrence_id?: string;
          transaction_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'recurrence_exceptions_recurrence_id_fkey';
            columns: ['recurrence_id'];
            isOneToOne: false;
            referencedRelation: 'recurrences';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'recurrence_exceptions_transaction_fk';
            columns: ['transaction_id'];
            isOneToOne: false;
            referencedRelation: 'transactions';
            referencedColumns: ['id'];
          },
        ];
      };
      recurrences: {
        Row: {
          account_id: string;
          amount: number;
          category_id: string;
          created_at: string;
          deleted_at: string | null;
          description: string | null;
          end_date: string;
          frequency: Database['public']['Enums']['recurrence_frequency'];
          id: string;
          payment_method: Database['public']['Enums']['payment_method'];
          start_date: string;
          type: Database['public']['Enums']['transaction_type'];
          updated_at: string;
          user_id: string;
        };
        Insert: {
          account_id: string;
          amount: number;
          category_id: string;
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          end_date: string;
          frequency: Database['public']['Enums']['recurrence_frequency'];
          id?: string;
          payment_method: Database['public']['Enums']['payment_method'];
          start_date: string;
          type: Database['public']['Enums']['transaction_type'];
          updated_at?: string;
          user_id: string;
        };
        Update: {
          account_id?: string;
          amount?: number;
          category_id?: string;
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          end_date?: string;
          frequency?: Database['public']['Enums']['recurrence_frequency'];
          id?: string;
          payment_method?: Database['public']['Enums']['payment_method'];
          start_date?: string;
          type?: Database['public']['Enums']['transaction_type'];
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'recurrences_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'recurrences_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
        ];
      };
      transactions: {
        Row: {
          account_id: string;
          amount: number;
          category_id: string;
          created_at: string;
          deleted_at: string | null;
          description: string | null;
          id: string;
          payment_method: Database['public']['Enums']['payment_method'];
          receipt_url: string | null;
          recurrence_id: string | null;
          recurrence_original_date: string | null;
          transaction_date: string;
          type: Database['public']['Enums']['transaction_type'];
          updated_at: string;
          user_id: string;
        };
        Insert: {
          account_id: string;
          amount: number;
          category_id: string;
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          payment_method: Database['public']['Enums']['payment_method'];
          receipt_url?: string | null;
          recurrence_id?: string | null;
          recurrence_original_date?: string | null;
          transaction_date: string;
          type: Database['public']['Enums']['transaction_type'];
          updated_at?: string;
          user_id: string;
        };
        Update: {
          account_id?: string;
          amount?: number;
          category_id?: string;
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          payment_method?: Database['public']['Enums']['payment_method'];
          receipt_url?: string | null;
          recurrence_id?: string | null;
          recurrence_original_date?: string | null;
          transaction_date?: string;
          type?: Database['public']['Enums']['transaction_type'];
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'transactions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'transactions_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'transactions_recurrence_id_fkey';
            columns: ['recurrence_id'];
            isOneToOne: false;
            referencedRelation: 'recurrences';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_accumulated_balances: {
        Args: { p_end: string };
        Returns: {
          account_id: string;
          income: number;
          expenses: number;
          balance: number;
        }[];
      };
      expand_recurrences: {
        Args: { p_end: string; p_start: string };
        Returns: {
          account_id: string;
          amount: number;
          category_id: string;
          description: string;
          id: string;
          is_virtual: boolean;
          payment_method: Database['public']['Enums']['payment_method'];
          receipt_url: string | null;
          recurrence_id: string;
          transaction_date: string;
          type: Database['public']['Enums']['transaction_type'];
          user_id: string;
        }[];
      };
      get_transactions: {
        Args: { p_end: string; p_start: string };
        Returns: {
          account_id: string;
          amount: number;
          category_id: string;
          description: string;
          id: string;
          is_virtual: boolean;
          payment_method: Database['public']['Enums']['payment_method'];
          receipt_url: string | null;
          recurrence_id: string;
          transaction_date: string;
          type: Database['public']['Enums']['transaction_type'];
          user_id: string;
        }[];
      };
    };
    Enums: {
      budget_period: 'monthly' | 'quarterly' | 'semiannual' | 'annual';
      category_type: 'income' | 'expense' | 'both';
      payment_method: 'cash' | 'card' | 'transfer';
      recurrence_exception_action: 'deleted' | 'modified';
      recurrence_frequency: 'monthly' | 'quarterly' | 'semiannual' | 'annual';
      transaction_type: 'income' | 'expense';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      budget_period: ['monthly', 'quarterly', 'semiannual', 'annual'],
      category_type: ['income', 'expense', 'both'],
      payment_method: ['cash', 'card', 'transfer'],
      recurrence_exception_action: ['deleted', 'modified'],
      recurrence_frequency: ['monthly', 'quarterly', 'semiannual', 'annual'],
      transaction_type: ['income', 'expense'],
    },
  },
} as const;
