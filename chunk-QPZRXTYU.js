import{a as ee,b as Pt,c as $,d as I,e as E,f as bt}from"./chunk-C5WUBOVC.js";import{A as ae,B as le,D as Bt,G as de,I as pt,J as ue,N as Dt,O as ce,R as pe,b as Z,ba as Tt,c as ne,d as z,e as oe,f as ie,g as re,la as be,m as se,ma as U,qa as Nt,ta as T,x as kt}from"./chunk-M4T36MQF.js";import{i as Jt,j as Kt,k as te,l as O,m as nt}from"./chunk-OCPLLTZX.js";import{$ as st,$a as Q,Ab as P,Bb as V,Cb as R,Db as Zt,Fb as tt,Gb as et,Ha as x,K as D,Kb as Xt,L as F,N as A,Nb as k,Ob as dt,P as h,Pb as ut,Va as M,W as X,Wa as _,Wb as B,Xa as j,Y as $t,Za as W,Zb as St,_a as y,aa as Ht,ea as jt,fb as L,ha as H,ib as Rt,ic as It,ja as g,jb as Ut,jc as ct,la as Wt,mc as w,nb as v,nc as d,ob as Ct,pa as Vt,pb as wt,qb as J,rb as Et,sb as xt,tb as K,ub as at,uc as S,vb as lt,vc as Yt,wb as qt,wc as Mt,yb as Gt,zb as Qt}from"./chunk-6Q4WZWJD.js";import{a as yt}from"./chunk-7CGTOI24.js";var Lt=(()=>{class e{static zindex=1e3;static calculatedScrollbarWidth=null;static calculatedScrollbarHeight=null;static browser;static addClass(t,n){t&&n&&(t.classList?t.classList.add(n):t.className+=" "+n)}static addMultipleClasses(t,n){if(t&&n)if(t.classList){let o=n.trim().split(" ");for(let i=0;i<o.length;i++)t.classList.add(o[i])}else{let o=n.split(" ");for(let i=0;i<o.length;i++)t.className+=" "+o[i]}}static removeClass(t,n){t&&n&&(t.classList?t.classList.remove(n):t.className=t.className.replace(new RegExp("(^|\\b)"+n.split(" ").join("|")+"(\\b|$)","gi")," "))}static removeMultipleClasses(t,n){t&&n&&[n].flat().filter(Boolean).forEach(o=>o.split(" ").forEach(i=>this.removeClass(t,i)))}static hasClass(t,n){return t&&n?t.classList?t.classList.contains(n):new RegExp("(^| )"+n+"( |$)","gi").test(t.className):!1}static siblings(t){return Array.prototype.filter.call(t.parentNode.children,function(n){return n!==t})}static find(t,n){return Array.from(t.querySelectorAll(n))}static findSingle(t,n){return this.isElement(t)?t.querySelector(n):null}static index(t){let n=t.parentNode.childNodes,o=0;for(var i=0;i<n.length;i++){if(n[i]==t)return o;n[i].nodeType==1&&o++}return-1}static indexWithinGroup(t,n){let o=t.parentNode?t.parentNode.childNodes:[],i=0;for(var r=0;r<o.length;r++){if(o[r]==t)return i;o[r].attributes&&o[r].attributes[n]&&o[r].nodeType==1&&i++}return-1}static appendOverlay(t,n,o="self"){o!=="self"&&t&&n&&this.appendChild(t,n)}static alignOverlay(t,n,o="self",i=!0){t&&n&&(i&&(t.style.minWidth=`${e.getOuterWidth(n)}px`),o==="self"?this.relativePosition(t,n):this.absolutePosition(t,n))}static relativePosition(t,n,o=!0){let i=N=>{if(N)return getComputedStyle(N).getPropertyValue("position")==="relative"?N:i(N.parentElement)},r=t.offsetParent?{width:t.offsetWidth,height:t.offsetHeight}:this.getHiddenElementDimensions(t),a=n.offsetHeight,l=n.getBoundingClientRect(),p=this.getWindowScrollTop(),u=this.getWindowScrollLeft(),c=this.getViewport(),b=i(t)?.getBoundingClientRect()||{top:-1*p,left:-1*u},m,C,G="top";l.top+a+r.height>c.height?(m=l.top-b.top-r.height,G="bottom",l.top+m<0&&(m=-1*l.top)):(m=a+l.top-b.top,G="top");let Y=l.left+r.width-c.width,rt=l.left-b.left;if(r.width>c.width?C=(l.left-b.left)*-1:Y>0?C=rt-Y:C=l.left-b.left,t.style.top=m+"px",t.style.left=C+"px",t.style.transformOrigin=G,o){let N=ie(/-anchor-gutter$/)?.value;t.style.marginTop=G==="bottom"?`calc(${N??"2px"} * -1)`:N??""}}static absolutePosition(t,n,o=!0){let i=t.offsetParent?{width:t.offsetWidth,height:t.offsetHeight}:this.getHiddenElementDimensions(t),r=i.height,a=i.width,l=n.offsetHeight,p=n.offsetWidth,u=n.getBoundingClientRect(),c=this.getWindowScrollTop(),f=this.getWindowScrollLeft(),b=this.getViewport(),m,C;u.top+l+r>b.height?(m=u.top+c-r,t.style.transformOrigin="bottom",m<0&&(m=c)):(m=l+u.top+c,t.style.transformOrigin="top"),u.left+a>b.width?C=Math.max(0,u.left+f+p-a):C=u.left+f,t.style.top=m+"px",t.style.left=C+"px",o&&(t.style.marginTop=origin==="bottom"?"calc(var(--p-anchor-gutter) * -1)":"calc(var(--p-anchor-gutter))")}static getParents(t,n=[]){return t.parentNode===null?n:this.getParents(t.parentNode,n.concat([t.parentNode]))}static getScrollableParents(t){let n=[];if(t){let o=this.getParents(t),i=/(auto|scroll)/,r=a=>{let l=window.getComputedStyle(a,null);return i.test(l.getPropertyValue("overflow"))||i.test(l.getPropertyValue("overflowX"))||i.test(l.getPropertyValue("overflowY"))};for(let a of o){let l=a.nodeType===1&&a.dataset.scrollselectors;if(l){let p=l.split(",");for(let u of p){let c=this.findSingle(a,u);c&&r(c)&&n.push(c)}}a.nodeType!==9&&r(a)&&n.push(a)}}return n}static getHiddenElementOuterHeight(t){t.style.visibility="hidden",t.style.display="block";let n=t.offsetHeight;return t.style.display="none",t.style.visibility="visible",n}static getHiddenElementOuterWidth(t){t.style.visibility="hidden",t.style.display="block";let n=t.offsetWidth;return t.style.display="none",t.style.visibility="visible",n}static getHiddenElementDimensions(t){let n={};return t.style.visibility="hidden",t.style.display="block",n.width=t.offsetWidth,n.height=t.offsetHeight,t.style.display="none",t.style.visibility="visible",n}static scrollInView(t,n){let o=getComputedStyle(t).getPropertyValue("borderTopWidth"),i=o?parseFloat(o):0,r=getComputedStyle(t).getPropertyValue("paddingTop"),a=r?parseFloat(r):0,l=t.getBoundingClientRect(),u=n.getBoundingClientRect().top+document.body.scrollTop-(l.top+document.body.scrollTop)-i-a,c=t.scrollTop,f=t.clientHeight,b=this.getOuterHeight(n);u<0?t.scrollTop=c+u:u+b>f&&(t.scrollTop=c+u-f+b)}static fadeIn(t,n){t.style.opacity=0;let o=+new Date,i=0,r=function(){i=+t.style.opacity.replace(",",".")+(new Date().getTime()-o)/n,t.style.opacity=i,o=+new Date,+i<1&&(window.requestAnimationFrame?window.requestAnimationFrame(r):setTimeout(r,16))};r()}static fadeOut(t,n){var o=1,i=50,r=n,a=i/r;let l=setInterval(()=>{o=o-a,o<=0&&(o=0,clearInterval(l)),t.style.opacity=o},i)}static getWindowScrollTop(){let t=document.documentElement;return(window.pageYOffset||t.scrollTop)-(t.clientTop||0)}static getWindowScrollLeft(){let t=document.documentElement;return(window.pageXOffset||t.scrollLeft)-(t.clientLeft||0)}static matches(t,n){var o=Element.prototype,i=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.msMatchesSelector||function(r){return[].indexOf.call(document.querySelectorAll(r),this)!==-1};return i.call(t,n)}static getOuterWidth(t,n){let o=t.offsetWidth;if(n){let i=getComputedStyle(t);o+=parseFloat(i.marginLeft)+parseFloat(i.marginRight)}return o}static getHorizontalPadding(t){let n=getComputedStyle(t);return parseFloat(n.paddingLeft)+parseFloat(n.paddingRight)}static getHorizontalMargin(t){let n=getComputedStyle(t);return parseFloat(n.marginLeft)+parseFloat(n.marginRight)}static innerWidth(t){let n=t.offsetWidth,o=getComputedStyle(t);return n+=parseFloat(o.paddingLeft)+parseFloat(o.paddingRight),n}static width(t){let n=t.offsetWidth,o=getComputedStyle(t);return n-=parseFloat(o.paddingLeft)+parseFloat(o.paddingRight),n}static getInnerHeight(t){let n=t.offsetHeight,o=getComputedStyle(t);return n+=parseFloat(o.paddingTop)+parseFloat(o.paddingBottom),n}static getOuterHeight(t,n){let o=t.offsetHeight;if(n){let i=getComputedStyle(t);o+=parseFloat(i.marginTop)+parseFloat(i.marginBottom)}return o}static getHeight(t){let n=t.offsetHeight,o=getComputedStyle(t);return n-=parseFloat(o.paddingTop)+parseFloat(o.paddingBottom)+parseFloat(o.borderTopWidth)+parseFloat(o.borderBottomWidth),n}static getWidth(t){let n=t.offsetWidth,o=getComputedStyle(t);return n-=parseFloat(o.paddingLeft)+parseFloat(o.paddingRight)+parseFloat(o.borderLeftWidth)+parseFloat(o.borderRightWidth),n}static getViewport(){let t=window,n=document,o=n.documentElement,i=n.getElementsByTagName("body")[0],r=t.innerWidth||o.clientWidth||i.clientWidth,a=t.innerHeight||o.clientHeight||i.clientHeight;return{width:r,height:a}}static getOffset(t){var n=t.getBoundingClientRect();return{top:n.top+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0),left:n.left+(window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0)}}static replaceElementWith(t,n){let o=t.parentNode;if(!o)throw"Can't replace element";return o.replaceChild(n,t)}static getUserAgent(){if(navigator&&this.isClient())return navigator.userAgent}static isIE(){var t=window.navigator.userAgent,n=t.indexOf("MSIE ");if(n>0)return!0;var o=t.indexOf("Trident/");if(o>0){var i=t.indexOf("rv:");return!0}var r=t.indexOf("Edge/");return r>0}static isIOS(){return/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream}static isAndroid(){return/(android)/i.test(navigator.userAgent)}static isTouchDevice(){return"ontouchstart"in window||navigator.maxTouchPoints>0}static appendChild(t,n){if(this.isElement(n))n.appendChild(t);else if(n&&n.el&&n.el.nativeElement)n.el.nativeElement.appendChild(t);else throw"Cannot append "+n+" to "+t}static removeChild(t,n){if(this.isElement(n))n.removeChild(t);else if(n.el&&n.el.nativeElement)n.el.nativeElement.removeChild(t);else throw"Cannot remove "+t+" from "+n}static removeElement(t){"remove"in Element.prototype?t.remove():t.parentNode?.removeChild(t)}static isElement(t){return typeof HTMLElement=="object"?t instanceof HTMLElement:t&&typeof t=="object"&&t!==null&&t.nodeType===1&&typeof t.nodeName=="string"}static calculateScrollbarWidth(t){if(t){let n=getComputedStyle(t);return t.offsetWidth-t.clientWidth-parseFloat(n.borderLeftWidth)-parseFloat(n.borderRightWidth)}else{if(this.calculatedScrollbarWidth!==null)return this.calculatedScrollbarWidth;let n=document.createElement("div");n.className="p-scrollbar-measure",document.body.appendChild(n);let o=n.offsetWidth-n.clientWidth;return document.body.removeChild(n),this.calculatedScrollbarWidth=o,o}}static calculateScrollbarHeight(){if(this.calculatedScrollbarHeight!==null)return this.calculatedScrollbarHeight;let t=document.createElement("div");t.className="p-scrollbar-measure",document.body.appendChild(t);let n=t.offsetHeight-t.clientHeight;return document.body.removeChild(t),this.calculatedScrollbarWidth=n,n}static invokeElementMethod(t,n,o){t[n].apply(t,o)}static clearSelection(){if(window.getSelection&&window.getSelection())window.getSelection()?.empty?window.getSelection()?.empty():window.getSelection()?.removeAllRanges&&(window.getSelection()?.rangeCount||0)>0&&(window.getSelection()?.getRangeAt(0)?.getClientRects()?.length||0)>0&&window.getSelection()?.removeAllRanges();else if(document.selection&&document.selection.empty)try{document.selection.empty()}catch{}}static getBrowser(){if(!this.browser){let t=this.resolveUserAgent();this.browser={},t.browser&&(this.browser[t.browser]=!0,this.browser.version=t.version),this.browser.chrome?this.browser.webkit=!0:this.browser.webkit&&(this.browser.safari=!0)}return this.browser}static resolveUserAgent(){let t=navigator.userAgent.toLowerCase(),n=/(chrome)[ \/]([\w.]+)/.exec(t)||/(webkit)[ \/]([\w.]+)/.exec(t)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t)||/(msie) ([\w.]+)/.exec(t)||t.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t)||[];return{browser:n[1]||"",version:n[2]||"0"}}static isInteger(t){return Number.isInteger?Number.isInteger(t):typeof t=="number"&&isFinite(t)&&Math.floor(t)===t}static isHidden(t){return!t||t.offsetParent===null}static isVisible(t){return t&&t.offsetParent!=null}static isExist(t){return t!==null&&typeof t<"u"&&t.nodeName&&t.parentNode}static focus(t,n){t&&document.activeElement!==t&&t.focus(n)}static getFocusableSelectorString(t=""){return`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        .p-inputtext:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        .p-button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t}`}static getFocusableElements(t,n=""){let o=this.find(t,this.getFocusableSelectorString(n)),i=[];for(let r of o){let a=getComputedStyle(r);this.isVisible(r)&&a.display!="none"&&a.visibility!="hidden"&&i.push(r)}return i}static getFocusableElement(t,n=""){let o=this.findSingle(t,this.getFocusableSelectorString(n));if(o){let i=getComputedStyle(o);if(this.isVisible(o)&&i.display!="none"&&i.visibility!="hidden")return o}return null}static getFirstFocusableElement(t,n=""){let o=this.getFocusableElements(t,n);return o.length>0?o[0]:null}static getLastFocusableElement(t,n){let o=this.getFocusableElements(t,n);return o.length>0?o[o.length-1]:null}static getNextFocusableElement(t,n=!1){let o=e.getFocusableElements(t),i=0;if(o&&o.length>0){let r=o.indexOf(o[0].ownerDocument.activeElement);n?r==-1||r===0?i=o.length-1:i=r-1:r!=-1&&r!==o.length-1&&(i=r+1)}return o[i]}static generateZIndex(){return this.zindex=this.zindex||999,++this.zindex}static getSelection(){return window.getSelection?window.getSelection()?.toString():document.getSelection?document.getSelection()?.toString():document.selection?document.selection.createRange().text:null}static getTargetElement(t,n){if(!t)return null;switch(t){case"document":return document;case"window":return window;case"@next":return n?.nextElementSibling;case"@prev":return n?.previousElementSibling;case"@parent":return n?.parentElement;case"@grandparent":return n?.parentElement?.parentElement;default:let o=typeof t;if(o==="string")return document.querySelector(t);if(o==="object"&&t.hasOwnProperty("nativeElement"))return this.isExist(t.nativeElement)?t.nativeElement:void 0;let r=(a=>!!(a&&a.constructor&&a.call&&a.apply))(t)?t():t;return r&&r.nodeType===9||this.isExist(r)?r:null}}static isClient(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}static getAttribute(t,n){if(t){let o=t.getAttribute(n);return isNaN(o)?o==="true"||o==="false"?o==="true":o:+o}}static calculateBodyScrollbarWidth(){return window.innerWidth-document.documentElement.offsetWidth}static blockBodyScroll(t="p-overflow-hidden"){document.body.style.setProperty("--scrollbar-width",this.calculateBodyScrollbarWidth()+"px"),this.addClass(document.body,t)}static unblockBodyScroll(t="p-overflow-hidden"){document.body.style.removeProperty("--scrollbar-width"),this.removeClass(document.body,t)}static createElement(t,n={},...o){if(t){let i=document.createElement(t);return this.setAttributes(i,n),i.append(...o),i}}static setAttribute(t,n="",o){this.isElement(t)&&o!==null&&o!==void 0&&t.setAttribute(n,o)}static setAttributes(t,n={}){if(this.isElement(t)){let o=(i,r)=>{let a=t?.$attrs?.[i]?[t?.$attrs?.[i]]:[];return[r].flat().reduce((l,p)=>{if(p!=null){let u=typeof p;if(u==="string"||u==="number")l.push(p);else if(u==="object"){let c=Array.isArray(p)?o(i,p):Object.entries(p).map(([f,b])=>i==="style"&&(b||b===0)?`${f.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}:${b}`:b?f:void 0);l=c.length?l.concat(c.filter(f=>!!f)):l}}return l},a)};Object.entries(n).forEach(([i,r])=>{if(r!=null){let a=i.match(/^on(.+)/);a?t.addEventListener(a[1].toLowerCase(),r):i==="pBind"?this.setAttributes(t,r):(r=i==="class"?[...new Set(o("class",r))].join(" ").trim():i==="style"?o("style",r).join(";").trim():r,(t.$attrs=t.$attrs||{})&&(t.$attrs[i]=r),t.setAttribute(i,r))}})}}static isFocusableElement(t,n=""){return this.isElement(t)?t.matches(`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n}`):!1}}return e})();function On(){ne({variableName:Nt("scrollbar.width").name})}function zn(){oe({variableName:Nt("scrollbar.width").name})}var he=class{element;listener;scrollableParents;constructor(s,t=()=>{}){this.element=s,this.listener=t}bindScrollListener(){this.scrollableParents=Lt.getScrollableParents(this.element);for(let s=0;s<this.scrollableParents.length;s++)this.scrollableParents[s].addEventListener("scroll",this.listener)}unbindScrollListener(){if(this.scrollableParents)for(let s=0;s<this.scrollableParents.length;s++)this.scrollableParents[s].removeEventListener("scroll",this.listener)}destroy(){this.unbindScrollListener(),this.element=null,this.listener=null,this.scrollableParents=null}};var fe=(()=>{class e extends I{autofocus=!1;focused=!1;platformId=h(Vt);document=h($t);host=h(Wt);onAfterContentChecked(){this.autofocus===!1?this.host.nativeElement.removeAttribute("autofocus"):this.host.nativeElement.setAttribute("autofocus",!0),this.focused||this.autoFocus()}onAfterViewChecked(){this.focused||this.autoFocus()}autoFocus(){nt(this.platformId)&&this.autofocus&&setTimeout(()=>{let t=Lt.getFocusableElements(this.host?.nativeElement);t.length===0&&this.host.nativeElement.focus(),t.length>0&&t[0].focus(),this.focused=!0})}static \u0275fac=(()=>{let t;return function(o){return(t||(t=g(e)))(o||e)}})();static \u0275dir=j({type:e,selectors:[["","pAutoFocus",""]],inputs:{autofocus:[0,"pAutoFocus","autofocus"]},features:[y]})}return e})();var ge=`
    .p-badge {
        display: inline-flex;
        border-radius: dt('badge.border.radius');
        align-items: center;
        justify-content: center;
        padding: dt('badge.padding');
        background: dt('badge.primary.background');
        color: dt('badge.primary.color');
        font-size: dt('badge.font.size');
        font-weight: dt('badge.font.weight');
        min-width: dt('badge.min.width');
        height: dt('badge.height');
    }

    .p-badge-dot {
        width: dt('badge.dot.size');
        min-width: dt('badge.dot.size');
        height: dt('badge.dot.size');
        border-radius: 50%;
        padding: 0;
    }

    .p-badge-circle {
        padding: 0;
        border-radius: 50%;
    }

    .p-badge-secondary {
        background: dt('badge.secondary.background');
        color: dt('badge.secondary.color');
    }

    .p-badge-success {
        background: dt('badge.success.background');
        color: dt('badge.success.color');
    }

    .p-badge-info {
        background: dt('badge.info.background');
        color: dt('badge.info.color');
    }

    .p-badge-warn {
        background: dt('badge.warn.background');
        color: dt('badge.warn.color');
    }

    .p-badge-danger {
        background: dt('badge.danger.background');
        color: dt('badge.danger.color');
    }

    .p-badge-contrast {
        background: dt('badge.contrast.background');
        color: dt('badge.contrast.color');
    }

    .p-badge-sm {
        font-size: dt('badge.sm.font.size');
        min-width: dt('badge.sm.min.width');
        height: dt('badge.sm.height');
    }

    .p-badge-lg {
        font-size: dt('badge.lg.font.size');
        min-width: dt('badge.lg.min.width');
        height: dt('badge.lg.height');
    }

    .p-badge-xl {
        font-size: dt('badge.xl.font.size');
        min-width: dt('badge.xl.min.width');
        height: dt('badge.xl.height');
    }
`;var $e=`
    ${ge}

    /* For PrimeNG (directive)*/
    .p-overlay-badge {
        position: relative;
    }

    .p-overlay-badge > .p-badge {
        position: absolute;
        top: 0;
        inset-inline-end: 0;
        transform: translate(50%, -50%);
        transform-origin: 100% 0;
        margin: 0;
    }
`,He={root:({instance:e})=>{let s=typeof e.value=="function"?e.value():e.value,t=typeof e.size=="function"?e.size():e.size,n=typeof e.badgeSize=="function"?e.badgeSize():e.badgeSize,o=typeof e.severity=="function"?e.severity():e.severity;return["p-badge p-component",{"p-badge-circle":pe(s)&&String(s).length===1,"p-badge-dot":ce(s),"p-badge-sm":t==="small"||n==="small","p-badge-lg":t==="large"||n==="large","p-badge-xl":t==="xlarge"||n==="xlarge","p-badge-info":o==="info","p-badge-success":o==="success","p-badge-warn":o==="warn","p-badge-danger":o==="danger","p-badge-secondary":o==="secondary","p-badge-contrast":o==="contrast"}]}},me=(()=>{class e extends T{name="badge";style=$e;classes=He;static \u0275fac=(()=>{let t;return function(o){return(t||(t=g(e)))(o||e)}})();static \u0275prov=D({token:e,factory:e.\u0275fac})}return e})();var ve=new A("BADGE_INSTANCE");var At=(()=>{class e extends I{componentName="Badge";$pcBadge=h(ve,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=h(E,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass=d();badgeSize=d();size=d();severity=d();value=d();badgeDisabled=d(!1,{transform:S});_componentStyle=h(me);get dataP(){return this.cn({circle:this.value()!=null&&String(this.value()).length===1,empty:this.value()==null,disabled:this.badgeDisabled(),[this.severity()]:this.severity(),[this.size()]:this.size()})}static \u0275fac=(()=>{let t;return function(o){return(t||(t=g(e)))(o||e)}})();static \u0275cmp=M({type:e,selectors:[["p-badge"]],hostVars:5,hostBindings:function(n,o){n&2&&(L("data-p",o.dataP),k(o.cn(o.cx("root"),o.styleClass())),Xt("display",o.badgeDisabled()?"none":null))},inputs:{styleClass:[1,"styleClass"],badgeSize:[1,"badgeSize"],size:[1,"size"],severity:[1,"severity"],value:[1,"value"],badgeDisabled:[1,"badgeDisabled"]},features:[B([me,{provide:ve,useExisting:e},{provide:$,useExisting:e}]),W([E]),y],decls:1,vars:1,template:function(n,o){n&1&&dt(0),n&2&&ut(o.value())},dependencies:[O,U,bt],encapsulation:2,changeDetection:0})}return e})(),ye=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=_({type:e});static \u0275inj=F({imports:[At,U,U]})}return e})();var We=["*"],Ve={root:"p-fluid"},Ce=(()=>{class e extends T{name="fluid";classes=Ve;static \u0275fac=(()=>{let t;return function(o){return(t||(t=g(e)))(o||e)}})();static \u0275prov=D({token:e,factory:e.\u0275fac})}return e})();var we=new A("FLUID_INSTANCE"),Ee=(()=>{class e extends I{componentName="Fluid";$pcFluid=h(we,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=h(E,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}_componentStyle=h(Ce);static \u0275fac=(()=>{let t;return function(o){return(t||(t=g(e)))(o||e)}})();static \u0275cmp=M({type:e,selectors:[["p-fluid"]],hostVars:2,hostBindings:function(n,o){n&2&&k(o.cx("root"))},features:[B([Ce,{provide:we,useExisting:e},{provide:$,useExisting:e}]),W([E]),y],ngContentSelectors:We,decls:1,vars:0,template:function(n,o){n&1&&(V(),R(0))},dependencies:[O],encapsulation:2,changeDetection:0})}return e})();var Re=["*"],Ue=`
.p-icon {
    display: inline-block;
    vertical-align: baseline;
    flex-shrink: 0;
}

.p-icon-spin {
    -webkit-animation: p-icon-spin 2s infinite linear;
    animation: p-icon-spin 2s infinite linear;
}

@-webkit-keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}

@keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
`,xe=(()=>{class e extends T{name="baseicon";css=Ue;static \u0275fac=(()=>{let t;return function(o){return(t||(t=g(e)))(o||e)}})();static \u0275prov=D({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var ht=(()=>{class e extends I{spin=!1;_componentStyle=h(xe);getClassNames(){return ee("p-icon",{"p-icon-spin":this.spin})}static \u0275fac=(()=>{let t;return function(o){return(t||(t=g(e)))(o||e)}})();static \u0275cmp=M({type:e,selectors:[["ng-component"]],hostAttrs:["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],hostVars:2,hostBindings:function(n,o){n&2&&k(o.getClassNames())},inputs:{spin:[2,"spin","spin",S]},features:[B([xe]),y],ngContentSelectors:Re,decls:1,vars:0,template:function(n,o){n&1&&(V(),R(0))},encapsulation:2,changeDetection:0})}return e})();var qe=["data-p-icon","spinner"],Se=(()=>{class e extends ht{pathId;onInit(){this.pathId="url(#"+Pt()+")"}static \u0275fac=(()=>{let t;return function(o){return(t||(t=g(e)))(o||e)}})();static \u0275cmp=M({type:e,selectors:[["","data-p-icon","spinner"]],features:[y],attrs:qe,decls:5,vars:2,consts:[["d","M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(n,o){n&1&&(X(),Et(0,"g"),K(1,"path",0),xt(),Et(2,"defs")(3,"clipPath",1),K(4,"rect",2),xt()()),n&2&&(L("clip-path",o.pathId),x(3),Gt("id",o.pathId))},encapsulation:2})}return e})();var Ge=["data-p-icon","times"],$o=(()=>{class e extends ht{static \u0275fac=(()=>{let t;return function(o){return(t||(t=g(e)))(o||e)}})();static \u0275cmp=M({type:e,selectors:[["","data-p-icon","times"]],features:[y],attrs:Ge,decls:1,vars:0,consts:[["d","M8.01186 7.00933L12.27 2.75116C12.341 2.68501 12.398 2.60524 12.4375 2.51661C12.4769 2.42798 12.4982 2.3323 12.4999 2.23529C12.5016 2.13827 12.4838 2.0419 12.4474 1.95194C12.4111 1.86197 12.357 1.78024 12.2884 1.71163C12.2198 1.64302 12.138 1.58893 12.0481 1.55259C11.9581 1.51625 11.8617 1.4984 11.7647 1.50011C11.6677 1.50182 11.572 1.52306 11.4834 1.56255C11.3948 1.60204 11.315 1.65898 11.2488 1.72997L6.99067 5.98814L2.7325 1.72997C2.59553 1.60234 2.41437 1.53286 2.22718 1.53616C2.03999 1.53946 1.8614 1.61529 1.72901 1.74767C1.59663 1.88006 1.5208 2.05865 1.5175 2.24584C1.5142 2.43303 1.58368 2.61419 1.71131 2.75116L5.96948 7.00933L1.71131 11.2675C1.576 11.403 1.5 11.5866 1.5 11.7781C1.5 11.9696 1.576 12.1532 1.71131 12.2887C1.84679 12.424 2.03043 12.5 2.2219 12.5C2.41338 12.5 2.59702 12.424 2.7325 12.2887L6.99067 8.03052L11.2488 12.2887C11.3843 12.424 11.568 12.5 11.7594 12.5C11.9509 12.5 12.1346 12.424 12.27 12.2887C12.4053 12.1532 12.4813 11.9696 12.4813 11.7781C12.4813 11.5866 12.4053 11.403 12.27 11.2675L8.01186 7.00933Z","fill","currentColor"]],template:function(n,o){n&1&&(X(),K(0,"path",0))},encapsulation:2})}return e})();var Ie=`
    .p-ink {
        display: block;
        position: absolute;
        background: dt('ripple.background');
        border-radius: 100%;
        transform: scale(0);
        pointer-events: none;
    }

    .p-ink-active {
        animation: ripple 0.4s linear;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
`;var Qe=`
    ${Ie}

    /* For PrimeNG */
    .p-ripple {
        overflow: hidden;
        position: relative;
    }

    .p-ripple-disabled .p-ink {
        display: none !important;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
`,Ze={root:"p-ink"},Me=(()=>{class e extends T{name="ripple";style=Qe;classes=Ze;static \u0275fac=(()=>{let t;return function(o){return(t||(t=g(e)))(o||e)}})();static \u0275prov=D({token:e,factory:e.\u0275fac})}return e})();var ke=(()=>{class e extends I{componentName="Ripple";zone=h(Ht);_componentStyle=h(Me);animationListener;mouseDownListener;timeout;constructor(){super(),H(()=>{nt(this.platformId)&&(this.config.ripple()?this.zone.runOutsideAngular(()=>{this.create(),this.mouseDownListener=this.renderer.listen(this.el.nativeElement,"mousedown",this.onMouseDown.bind(this))}):this.remove())})}onAfterViewInit(){}onMouseDown(t){let n=this.getInk();if(!n||this.document.defaultView?.getComputedStyle(n,null).display==="none")return;if(!this.$unstyled()&&z(n,"p-ink-active"),n.setAttribute("data-p-ink-active","false"),!kt(n)&&!Bt(n)){let a=Math.max(se(this.el.nativeElement),le(this.el.nativeElement));n.style.height=a+"px",n.style.width=a+"px"}let o=ae(this.el.nativeElement),i=t.pageX-o.left+this.document.body.scrollTop-Bt(n)/2,r=t.pageY-o.top+this.document.body.scrollLeft-kt(n)/2;this.renderer.setStyle(n,"top",r+"px"),this.renderer.setStyle(n,"left",i+"px"),!this.$unstyled()&&Z(n,"p-ink-active"),n.setAttribute("data-p-ink-active","true"),this.timeout=setTimeout(()=>{let a=this.getInk();a&&(!this.$unstyled()&&z(a,"p-ink-active"),a.setAttribute("data-p-ink-active","false"))},401)}getInk(){let t=this.el.nativeElement.children;for(let n=0;n<t.length;n++)if(typeof t[n].className=="string"&&t[n].className.indexOf("p-ink")!==-1)return t[n];return null}resetInk(){let t=this.getInk();t&&(!this.$unstyled()&&z(t,"p-ink-active"),t.setAttribute("data-p-ink-active","false"))}onAnimationEnd(t){this.timeout&&clearTimeout(this.timeout),!this.$unstyled()&&z(t.currentTarget,"p-ink-active"),t.currentTarget.setAttribute("data-p-ink-active","false")}create(){let t=this.renderer.createElement("span");this.renderer.addClass(t,"p-ink"),this.renderer.appendChild(this.el.nativeElement,t),this.renderer.setAttribute(t,"data-p-ink","true"),this.renderer.setAttribute(t,"data-p-ink-active","false"),this.renderer.setAttribute(t,"aria-hidden","true"),this.renderer.setAttribute(t,"role","presentation"),this.animationListener||(this.animationListener=this.renderer.listen(t,"animationend",this.onAnimationEnd.bind(this)))}remove(){let t=this.getInk();t&&(this.mouseDownListener&&this.mouseDownListener(),this.animationListener&&this.animationListener(),this.mouseDownListener=null,this.animationListener=null,ue(t))}onDestroy(){this.config&&this.config.ripple()&&this.remove()}static \u0275fac=function(n){return new(n||e)};static \u0275dir=j({type:e,selectors:[["","pRipple",""]],hostAttrs:[1,"p-ripple"],features:[B([Me]),y]})}return e})();var Be=`
    .p-button {
        display: inline-flex;
        cursor: pointer;
        user-select: none;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        color: dt('button.primary.color');
        background: dt('button.primary.background');
        border: 1px solid dt('button.primary.border.color');
        padding: dt('button.padding.y') dt('button.padding.x');
        font-size: 1rem;
        font-family: inherit;
        font-feature-settings: inherit;
        transition:
            background dt('button.transition.duration'),
            color dt('button.transition.duration'),
            border-color dt('button.transition.duration'),
            outline-color dt('button.transition.duration'),
            box-shadow dt('button.transition.duration');
        border-radius: dt('button.border.radius');
        outline-color: transparent;
        gap: dt('button.gap');
    }

    .p-button:disabled {
        cursor: default;
    }

    .p-button-icon-right {
        order: 1;
    }

    .p-button-icon-right:dir(rtl) {
        order: -1;
    }

    .p-button:not(.p-button-vertical) .p-button-icon:not(.p-button-icon-right):dir(rtl) {
        order: 1;
    }

    .p-button-icon-bottom {
        order: 2;
    }

    .p-button-icon-only {
        width: dt('button.icon.only.width');
        padding-inline-start: 0;
        padding-inline-end: 0;
        gap: 0;
    }

    .p-button-icon-only.p-button-rounded {
        border-radius: 50%;
        height: dt('button.icon.only.width');
    }

    .p-button-icon-only .p-button-label {
        visibility: hidden;
        width: 0;
    }

    .p-button-icon-only::after {
        content: "\xA0";
        visibility: hidden;
        width: 0;
    }

    .p-button-sm {
        font-size: dt('button.sm.font.size');
        padding: dt('button.sm.padding.y') dt('button.sm.padding.x');
    }

    .p-button-sm .p-button-icon {
        font-size: dt('button.sm.font.size');
    }

    .p-button-sm.p-button-icon-only {
        width: dt('button.sm.icon.only.width');
    }

    .p-button-sm.p-button-icon-only.p-button-rounded {
        height: dt('button.sm.icon.only.width');
    }

    .p-button-lg {
        font-size: dt('button.lg.font.size');
        padding: dt('button.lg.padding.y') dt('button.lg.padding.x');
    }

    .p-button-lg .p-button-icon {
        font-size: dt('button.lg.font.size');
    }

    .p-button-lg.p-button-icon-only {
        width: dt('button.lg.icon.only.width');
    }

    .p-button-lg.p-button-icon-only.p-button-rounded {
        height: dt('button.lg.icon.only.width');
    }

    .p-button-vertical {
        flex-direction: column;
    }

    .p-button-label {
        font-weight: dt('button.label.font.weight');
    }

    .p-button-fluid {
        width: 100%;
    }

    .p-button-fluid.p-button-icon-only {
        width: dt('button.icon.only.width');
    }

    .p-button:not(:disabled):hover {
        background: dt('button.primary.hover.background');
        border: 1px solid dt('button.primary.hover.border.color');
        color: dt('button.primary.hover.color');
    }

    .p-button:not(:disabled):active {
        background: dt('button.primary.active.background');
        border: 1px solid dt('button.primary.active.border.color');
        color: dt('button.primary.active.color');
    }

    .p-button:focus-visible {
        box-shadow: dt('button.primary.focus.ring.shadow');
        outline: dt('button.focus.ring.width') dt('button.focus.ring.style') dt('button.primary.focus.ring.color');
        outline-offset: dt('button.focus.ring.offset');
    }

    .p-button .p-badge {
        min-width: dt('button.badge.size');
        height: dt('button.badge.size');
        line-height: dt('button.badge.size');
    }

    .p-button-raised {
        box-shadow: dt('button.raised.shadow');
    }

    .p-button-rounded {
        border-radius: dt('button.rounded.border.radius');
    }

    .p-button-secondary {
        background: dt('button.secondary.background');
        border: 1px solid dt('button.secondary.border.color');
        color: dt('button.secondary.color');
    }

    .p-button-secondary:not(:disabled):hover {
        background: dt('button.secondary.hover.background');
        border: 1px solid dt('button.secondary.hover.border.color');
        color: dt('button.secondary.hover.color');
    }

    .p-button-secondary:not(:disabled):active {
        background: dt('button.secondary.active.background');
        border: 1px solid dt('button.secondary.active.border.color');
        color: dt('button.secondary.active.color');
    }

    .p-button-secondary:focus-visible {
        outline-color: dt('button.secondary.focus.ring.color');
        box-shadow: dt('button.secondary.focus.ring.shadow');
    }

    .p-button-success {
        background: dt('button.success.background');
        border: 1px solid dt('button.success.border.color');
        color: dt('button.success.color');
    }

    .p-button-success:not(:disabled):hover {
        background: dt('button.success.hover.background');
        border: 1px solid dt('button.success.hover.border.color');
        color: dt('button.success.hover.color');
    }

    .p-button-success:not(:disabled):active {
        background: dt('button.success.active.background');
        border: 1px solid dt('button.success.active.border.color');
        color: dt('button.success.active.color');
    }

    .p-button-success:focus-visible {
        outline-color: dt('button.success.focus.ring.color');
        box-shadow: dt('button.success.focus.ring.shadow');
    }

    .p-button-info {
        background: dt('button.info.background');
        border: 1px solid dt('button.info.border.color');
        color: dt('button.info.color');
    }

    .p-button-info:not(:disabled):hover {
        background: dt('button.info.hover.background');
        border: 1px solid dt('button.info.hover.border.color');
        color: dt('button.info.hover.color');
    }

    .p-button-info:not(:disabled):active {
        background: dt('button.info.active.background');
        border: 1px solid dt('button.info.active.border.color');
        color: dt('button.info.active.color');
    }

    .p-button-info:focus-visible {
        outline-color: dt('button.info.focus.ring.color');
        box-shadow: dt('button.info.focus.ring.shadow');
    }

    .p-button-warn {
        background: dt('button.warn.background');
        border: 1px solid dt('button.warn.border.color');
        color: dt('button.warn.color');
    }

    .p-button-warn:not(:disabled):hover {
        background: dt('button.warn.hover.background');
        border: 1px solid dt('button.warn.hover.border.color');
        color: dt('button.warn.hover.color');
    }

    .p-button-warn:not(:disabled):active {
        background: dt('button.warn.active.background');
        border: 1px solid dt('button.warn.active.border.color');
        color: dt('button.warn.active.color');
    }

    .p-button-warn:focus-visible {
        outline-color: dt('button.warn.focus.ring.color');
        box-shadow: dt('button.warn.focus.ring.shadow');
    }

    .p-button-help {
        background: dt('button.help.background');
        border: 1px solid dt('button.help.border.color');
        color: dt('button.help.color');
    }

    .p-button-help:not(:disabled):hover {
        background: dt('button.help.hover.background');
        border: 1px solid dt('button.help.hover.border.color');
        color: dt('button.help.hover.color');
    }

    .p-button-help:not(:disabled):active {
        background: dt('button.help.active.background');
        border: 1px solid dt('button.help.active.border.color');
        color: dt('button.help.active.color');
    }

    .p-button-help:focus-visible {
        outline-color: dt('button.help.focus.ring.color');
        box-shadow: dt('button.help.focus.ring.shadow');
    }

    .p-button-danger {
        background: dt('button.danger.background');
        border: 1px solid dt('button.danger.border.color');
        color: dt('button.danger.color');
    }

    .p-button-danger:not(:disabled):hover {
        background: dt('button.danger.hover.background');
        border: 1px solid dt('button.danger.hover.border.color');
        color: dt('button.danger.hover.color');
    }

    .p-button-danger:not(:disabled):active {
        background: dt('button.danger.active.background');
        border: 1px solid dt('button.danger.active.border.color');
        color: dt('button.danger.active.color');
    }

    .p-button-danger:focus-visible {
        outline-color: dt('button.danger.focus.ring.color');
        box-shadow: dt('button.danger.focus.ring.shadow');
    }

    .p-button-contrast {
        background: dt('button.contrast.background');
        border: 1px solid dt('button.contrast.border.color');
        color: dt('button.contrast.color');
    }

    .p-button-contrast:not(:disabled):hover {
        background: dt('button.contrast.hover.background');
        border: 1px solid dt('button.contrast.hover.border.color');
        color: dt('button.contrast.hover.color');
    }

    .p-button-contrast:not(:disabled):active {
        background: dt('button.contrast.active.background');
        border: 1px solid dt('button.contrast.active.border.color');
        color: dt('button.contrast.active.color');
    }

    .p-button-contrast:focus-visible {
        outline-color: dt('button.contrast.focus.ring.color');
        box-shadow: dt('button.contrast.focus.ring.shadow');
    }

    .p-button-outlined {
        background: transparent;
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined:not(:disabled):hover {
        background: dt('button.outlined.primary.hover.background');
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined:not(:disabled):active {
        background: dt('button.outlined.primary.active.background');
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined.p-button-secondary {
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-secondary:not(:disabled):hover {
        background: dt('button.outlined.secondary.hover.background');
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-secondary:not(:disabled):active {
        background: dt('button.outlined.secondary.active.background');
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-success {
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-success:not(:disabled):hover {
        background: dt('button.outlined.success.hover.background');
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-success:not(:disabled):active {
        background: dt('button.outlined.success.active.background');
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-info {
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-info:not(:disabled):hover {
        background: dt('button.outlined.info.hover.background');
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-info:not(:disabled):active {
        background: dt('button.outlined.info.active.background');
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-warn {
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-warn:not(:disabled):hover {
        background: dt('button.outlined.warn.hover.background');
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-warn:not(:disabled):active {
        background: dt('button.outlined.warn.active.background');
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-help {
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-help:not(:disabled):hover {
        background: dt('button.outlined.help.hover.background');
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-help:not(:disabled):active {
        background: dt('button.outlined.help.active.background');
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-danger {
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-danger:not(:disabled):hover {
        background: dt('button.outlined.danger.hover.background');
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-danger:not(:disabled):active {
        background: dt('button.outlined.danger.active.background');
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-contrast {
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-contrast:not(:disabled):hover {
        background: dt('button.outlined.contrast.hover.background');
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-contrast:not(:disabled):active {
        background: dt('button.outlined.contrast.active.background');
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-plain {
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-outlined.p-button-plain:not(:disabled):hover {
        background: dt('button.outlined.plain.hover.background');
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-outlined.p-button-plain:not(:disabled):active {
        background: dt('button.outlined.plain.active.background');
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-text {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text:not(:disabled):hover {
        background: dt('button.text.primary.hover.background');
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text:not(:disabled):active {
        background: dt('button.text.primary.active.background');
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text.p-button-secondary {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-secondary:not(:disabled):hover {
        background: dt('button.text.secondary.hover.background');
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-secondary:not(:disabled):active {
        background: dt('button.text.secondary.active.background');
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-success {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-success:not(:disabled):hover {
        background: dt('button.text.success.hover.background');
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-success:not(:disabled):active {
        background: dt('button.text.success.active.background');
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-info {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-info:not(:disabled):hover {
        background: dt('button.text.info.hover.background');
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-info:not(:disabled):active {
        background: dt('button.text.info.active.background');
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-warn {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-warn:not(:disabled):hover {
        background: dt('button.text.warn.hover.background');
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-warn:not(:disabled):active {
        background: dt('button.text.warn.active.background');
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-help {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-help:not(:disabled):hover {
        background: dt('button.text.help.hover.background');
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-help:not(:disabled):active {
        background: dt('button.text.help.active.background');
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-danger {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-danger:not(:disabled):hover {
        background: dt('button.text.danger.hover.background');
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-danger:not(:disabled):active {
        background: dt('button.text.danger.active.background');
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-contrast {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-contrast:not(:disabled):hover {
        background: dt('button.text.contrast.hover.background');
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-contrast:not(:disabled):active {
        background: dt('button.text.contrast.active.background');
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-plain {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-text.p-button-plain:not(:disabled):hover {
        background: dt('button.text.plain.hover.background');
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-text.p-button-plain:not(:disabled):active {
        background: dt('button.text.plain.active.background');
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-link {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.color');
    }

    .p-button-link:not(:disabled):hover {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.hover.color');
    }

    .p-button-link:not(:disabled):hover .p-button-label {
        text-decoration: underline;
    }

    .p-button-link:not(:disabled):active {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.active.color');
    }
`;var Xe=["content"],Ye=["loadingicon"],Je=["icon"],Ke=["*"],Pe=(e,s)=>({class:e,pt:s});function tn(e,s){e&1&&qt(0)}function en(e,s){if(e&1&&J(0,"span",7),e&2){let t=P(3);k(t.cn(t.cx("loadingIcon"),"pi-spin",t.loadingIcon||(t.buttonProps==null?null:t.buttonProps.loadingIcon))),v("pBind",t.ptm("loadingIcon")),L("aria-hidden",!0)}}function nn(e,s){if(e&1&&(X(),J(0,"svg",8)),e&2){let t=P(3);k(t.cn(t.cx("loadingIcon"),t.cx("spinnerIcon"))),v("pBind",t.ptm("loadingIcon"))("spin",!0),L("aria-hidden",!0)}}function on(e,s){if(e&1&&(at(0),Q(1,en,1,4,"span",3)(2,nn,1,5,"svg",6),lt()),e&2){let t=P(2);x(),v("ngIf",t.loadingIcon||(t.buttonProps==null?null:t.buttonProps.loadingIcon)),x(),v("ngIf",!(t.loadingIcon||t.buttonProps!=null&&t.buttonProps.loadingIcon))}}function rn(e,s){}function sn(e,s){if(e&1&&Q(0,rn,0,0,"ng-template",9),e&2){let t=P(2);v("ngIf",t.loadingIconTemplate||t._loadingIconTemplate)}}function an(e,s){if(e&1&&(at(0),Q(1,on,3,2,"ng-container",2)(2,sn,1,1,null,5),lt()),e&2){let t=P();x(),v("ngIf",!t.loadingIconTemplate&&!t._loadingIconTemplate),x(),v("ngTemplateOutlet",t.loadingIconTemplate||t._loadingIconTemplate)("ngTemplateOutletContext",St(3,Pe,t.cx("loadingIcon"),t.ptm("loadingIcon")))}}function ln(e,s){if(e&1&&J(0,"span",7),e&2){let t=P(2);k(t.cn(t.cx("icon"),t.icon||(t.buttonProps==null?null:t.buttonProps.icon))),v("pBind",t.ptm("icon")),L("data-p",t.dataIconP)}}function dn(e,s){}function un(e,s){if(e&1&&Q(0,dn,0,0,"ng-template",9),e&2){let t=P(2);v("ngIf",!t.icon&&(t.iconTemplate||t._iconTemplate))}}function cn(e,s){if(e&1&&(at(0),Q(1,ln,1,4,"span",3)(2,un,1,1,null,5),lt()),e&2){let t=P();x(),v("ngIf",(t.icon||(t.buttonProps==null?null:t.buttonProps.icon))&&!t.iconTemplate&&!t._iconTemplate),x(),v("ngTemplateOutlet",t.iconTemplate||t._iconTemplate)("ngTemplateOutletContext",St(3,Pe,t.cx("icon"),t.ptm("icon")))}}function pn(e,s){if(e&1&&(Ct(0,"span",7),dt(1),wt()),e&2){let t=P();k(t.cx("label")),v("pBind",t.ptm("label")),L("aria-hidden",(t.icon||(t.buttonProps==null?null:t.buttonProps.icon))&&!(t.label||t.buttonProps!=null&&t.buttonProps.label))("data-p",t.dataLabelP),x(),ut(t.label||(t.buttonProps==null?null:t.buttonProps.label))}}function bn(e,s){if(e&1&&J(0,"p-badge",10),e&2){let t=P();v("value",t.badge||(t.buttonProps==null?null:t.buttonProps.badge))("severity",t.badgeSeverity||(t.buttonProps==null?null:t.buttonProps.badgeSeverity))("pt",t.ptm("pcBadge"))("unstyled",t.unstyled())}}var hn={root:({instance:e})=>["p-button p-component",{"p-button-icon-only":e.hasIcon&&!e.label&&!e.buttonProps?.label&&!e.badge,"p-button-vertical":(e.iconPos==="top"||e.iconPos==="bottom")&&e.label,"p-button-loading":e.loading||e.buttonProps?.loading,"p-button-link":e.link||e.buttonProps?.link,[`p-button-${e.severity||e.buttonProps?.severity}`]:e.severity||e.buttonProps?.severity,"p-button-raised":e.raised||e.buttonProps?.raised,"p-button-rounded":e.rounded||e.buttonProps?.rounded,"p-button-text":e.text||e.variant==="text"||e.buttonProps?.text||e.buttonProps?.variant==="text","p-button-outlined":e.outlined||e.variant==="outlined"||e.buttonProps?.outlined||e.buttonProps?.variant==="outlined","p-button-sm":e.size==="small"||e.buttonProps?.size==="small","p-button-lg":e.size==="large"||e.buttonProps?.size==="large","p-button-plain":e.plain||e.buttonProps?.plain,"p-button-fluid":e.hasFluid}],loadingIcon:"p-button-loading-icon",icon:({instance:e})=>["p-button-icon",{[`p-button-icon-${e.iconPos||e.buttonProps?.iconPos}`]:e.label||e.buttonProps?.label,"p-button-icon-left":(e.iconPos==="left"||e.buttonProps?.iconPos==="left")&&e.label||e.buttonProps?.label,"p-button-icon-right":(e.iconPos==="right"||e.buttonProps?.iconPos==="right")&&e.label||e.buttonProps?.label,"p-button-icon-top":(e.iconPos==="top"||e.buttonProps?.iconPos==="top")&&e.label||e.buttonProps?.label,"p-button-icon-bottom":(e.iconPos==="bottom"||e.buttonProps?.iconPos==="bottom")&&e.label||e.buttonProps?.label},e.icon,e.buttonProps?.icon],spinnerIcon:({instance:e})=>Object.entries(e.cx("icon")).filter(([,s])=>!!s).reduce((s,[t])=>s+` ${t}`,"p-button-loading-icon"),label:"p-button-label"},De=(()=>{class e extends T{name="button";style=Be;classes=hn;static \u0275fac=(()=>{let t;return function(o){return(t||(t=g(e)))(o||e)}})();static \u0275prov=D({token:e,factory:e.\u0275fac})}return e})();var Te=new A("BUTTON_INSTANCE");var fn=(()=>{class e extends I{componentName="Button";hostName="";$pcButton=h(Te,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=h(E,{self:!0});_componentStyle=h(De);onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("host"))}type="button";badge;disabled;raised=!1;rounded=!1;text=!1;plain=!1;outlined=!1;link=!1;tabindex;size;variant;style;styleClass;badgeClass;badgeSeverity="secondary";ariaLabel;autofocus;iconPos="left";icon;label;loading=!1;loadingIcon;severity;buttonProps;fluid=d(void 0,{transform:S});onClick=new st;onFocus=new st;onBlur=new st;contentTemplate;loadingIconTemplate;iconTemplate;templates;pcFluid=h(Ee,{optional:!0,host:!0,skipSelf:!0});get hasFluid(){return this.fluid()??!!this.pcFluid}get hasIcon(){return this.icon||this.buttonProps?.icon||this.iconTemplate||this._iconTemplate||this.loadingIcon||this.loadingIconTemplate||this._loadingIconTemplate}_contentTemplate;_iconTemplate;_loadingIconTemplate;onAfterContentInit(){this.templates?.forEach(t=>{switch(t.getType()){case"content":this._contentTemplate=t.template;break;case"icon":this._iconTemplate=t.template;break;case"loadingicon":this._loadingIconTemplate=t.template;break;default:this._contentTemplate=t.template;break}})}get dataP(){return this.cn({[this.size]:this.size,"icon-only":this.hasIcon&&!this.label&&!this.badge,loading:this.loading,fluid:this.hasFluid,rounded:this.rounded,raised:this.raised,outlined:this.outlined||this.variant==="outlined",text:this.text||this.variant==="text",link:this.link,vertical:(this.iconPos==="top"||this.iconPos==="bottom")&&this.label})}get dataIconP(){return this.cn({[this.iconPos]:this.iconPos,[this.size]:this.size})}get dataLabelP(){return this.cn({[this.size]:this.size,"icon-only":this.hasIcon&&!this.label&&!this.badge})}static \u0275fac=(()=>{let t;return function(o){return(t||(t=g(e)))(o||e)}})();static \u0275cmp=M({type:e,selectors:[["p-button"]],contentQueries:function(n,o,i){if(n&1&&Zt(i,Xe,5)(i,Ye,5)(i,Je,5)(i,be,4),n&2){let r;tt(r=et())&&(o.contentTemplate=r.first),tt(r=et())&&(o.loadingIconTemplate=r.first),tt(r=et())&&(o.iconTemplate=r.first),tt(r=et())&&(o.templates=r)}},inputs:{hostName:"hostName",type:"type",badge:"badge",disabled:[2,"disabled","disabled",S],raised:[2,"raised","raised",S],rounded:[2,"rounded","rounded",S],text:[2,"text","text",S],plain:[2,"plain","plain",S],outlined:[2,"outlined","outlined",S],link:[2,"link","link",S],tabindex:[2,"tabindex","tabindex",Yt],size:"size",variant:"variant",style:"style",styleClass:"styleClass",badgeClass:"badgeClass",badgeSeverity:"badgeSeverity",ariaLabel:"ariaLabel",autofocus:[2,"autofocus","autofocus",S],iconPos:"iconPos",icon:"icon",label:"label",loading:[2,"loading","loading",S],loadingIcon:"loadingIcon",severity:"severity",buttonProps:"buttonProps",fluid:[1,"fluid"]},outputs:{onClick:"onClick",onFocus:"onFocus",onBlur:"onBlur"},features:[B([De,{provide:Te,useExisting:e},{provide:$,useExisting:e}]),W([E]),y],ngContentSelectors:Ke,decls:7,vars:17,consts:[["pRipple","",3,"click","focus","blur","ngStyle","disabled","pAutoFocus","pBind"],[4,"ngTemplateOutlet"],[4,"ngIf"],[3,"class","pBind",4,"ngIf"],[3,"value","severity","pt","unstyled",4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["data-p-icon","spinner",3,"class","pBind","spin",4,"ngIf"],[3,"pBind"],["data-p-icon","spinner",3,"pBind","spin"],[3,"ngIf"],[3,"value","severity","pt","unstyled"]],template:function(n,o){n&1&&(V(),Ct(0,"button",0),Qt("click",function(r){return o.onClick.emit(r)})("focus",function(r){return o.onFocus.emit(r)})("blur",function(r){return o.onBlur.emit(r)}),R(1),Q(2,tn,1,0,"ng-container",1)(3,an,3,6,"ng-container",2)(4,cn,3,6,"ng-container",2)(5,pn,2,6,"span",3)(6,bn,1,4,"p-badge",4),wt()),n&2&&(k(o.cn(o.cx("root"),o.styleClass,o.buttonProps==null?null:o.buttonProps.styleClass)),v("ngStyle",o.style||(o.buttonProps==null?null:o.buttonProps.style))("disabled",o.disabled||o.loading||(o.buttonProps==null?null:o.buttonProps.disabled))("pAutoFocus",o.autofocus||(o.buttonProps==null?null:o.buttonProps.autofocus))("pBind",o.ptm("root")),L("type",o.type||(o.buttonProps==null?null:o.buttonProps.type))("aria-label",o.ariaLabel||(o.buttonProps==null?null:o.buttonProps.ariaLabel))("tabindex",o.tabindex||(o.buttonProps==null?null:o.buttonProps.tabindex))("data-p",o.dataP)("data-p-disabled",o.disabled||o.loading||(o.buttonProps==null?null:o.buttonProps.disabled))("data-p-severity",o.severity||(o.buttonProps==null?null:o.buttonProps.severity)),x(2),v("ngTemplateOutlet",o.contentTemplate||o._contentTemplate),x(),v("ngIf",o.loading||(o.buttonProps==null?null:o.buttonProps.loading)),x(),v("ngIf",!(o.loading||o.buttonProps!=null&&o.buttonProps.loading)),x(),v("ngIf",!o.contentTemplate&&!o._contentTemplate&&(o.label||(o.buttonProps==null?null:o.buttonProps.label))),x(),v("ngIf",!o.contentTemplate&&!o._contentTemplate&&(o.badge||(o.buttonProps==null?null:o.buttonProps.badge))))},dependencies:[O,Jt,te,Kt,ke,fe,Se,ye,At,U,E],encapsulation:2,changeDetection:0})}return e})(),Mi=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=_({type:e});static \u0275inj=F({imports:[O,fn,U,U]})}return e})();var gn=Object.defineProperty,Ne=Object.getOwnPropertySymbols,mn=Object.prototype.hasOwnProperty,vn=Object.prototype.propertyIsEnumerable,Le=(e,s,t)=>s in e?gn(e,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[s]=t,Fe=(e,s)=>{for(var t in s||(s={}))mn.call(s,t)&&Le(e,t,s[t]);if(Ne)for(var t of Ne(s))vn.call(s,t)&&Le(e,t,s[t]);return e},yn=(e,s,t)=>new Promise((n,o)=>{var i=l=>{try{a(t.next(l))}catch(p){o(p)}},r=l=>{try{a(t.throw(l))}catch(p){o(p)}},a=l=>l.done?n(l.value):Promise.resolve(l.value).then(i,r);a((t=t.apply(e,s)).next())}),ft="animation",ot="transition";function Cn(e){return e?e.disabled||!!(e.safe&&de()):!1}function wn(e,s){return e?Fe(Fe({},e),Object.entries(s).reduce((t,[n,o])=>{var i;return t[n]=(i=e[n])!=null?i:o,t},{})):s}function En(e){let{name:s,enterClass:t,leaveClass:n}=e||{};return{enter:{from:t?.from||`${s}-enter-from`,to:t?.to||`${s}-enter-to`,active:t?.active||`${s}-enter-active`},leave:{from:n?.from||`${s}-leave-from`,to:n?.to||`${s}-leave-to`,active:n?.active||`${s}-leave-active`}}}function xn(e){return{enter:{onBefore:e?.onBeforeEnter,onStart:e?.onEnter,onAfter:e?.onAfterEnter,onCancelled:e?.onEnterCancelled},leave:{onBefore:e?.onBeforeLeave,onStart:e?.onLeave,onAfter:e?.onAfterLeave,onCancelled:e?.onLeaveCancelled}}}function Sn(e,s){let t=window.getComputedStyle(e),n=b=>{let m=t[`${b}Delay`],C=t[`${b}Duration`];return[m.split(", ").map(Tt),C.split(", ").map(Tt)]},[o,i]=n(ot),[r,a]=n(ft),l=Math.max(...i.map((b,m)=>b+o[m])),p=Math.max(...a.map((b,m)=>b+r[m])),u,c=0,f=0;return s===ot?l>0&&(u=ot,c=l,f=i.length):s===ft?p>0&&(u=ft,c=p,f=a.length):(c=Math.max(l,p),u=c>0?l>p?ot:ft:void 0,f=u?u===ot?i.length:a.length:0),{type:u,timeout:c,count:f}}function gt(e,s){return typeof e=="number"?e:typeof e=="object"&&e[s]!=null?e[s]:null}function In(e,s=!0,t=!1){if(!s&&!t)return;let n=re(e);s&&Dt(e,"--pui-motion-height",n.height+"px"),t&&Dt(e,"--pui-motion-width",n.width+"px")}var Mn={name:"p",safe:!0,disabled:!1,enter:!0,leave:!0,autoHeight:!0,autoWidth:!1};function _t(e,s){if(!e)throw new Error("Element is required.");let t={},n=!1,o={},i=null,r={},a=u=>{if(Object.assign(t,wn(u,Mn)),!t.enter&&!t.leave)throw new Error("Enter or leave must be true.");r=xn(t),n=Cn(t),o=En(t),i=null},l=u=>yn(null,null,function*(){i?.();let{onBefore:c,onStart:f,onAfter:b,onCancelled:m}=r[u]||{},C={element:e};if(n){c?.(C),f?.(C),b?.(C);return}let{from:G,active:Y,to:rt}=o[u]||{};return In(e,t.autoHeight,t.autoWidth),c?.(C),Z(e,G),Z(e,Y),e.offsetHeight,z(e,G),Z(e,rt),f?.(C),new Promise(N=>{let Oe=gt(t.duration,u),zt=()=>{z(e,[rt,Y]),i=null},ze=()=>{zt(),b?.(C),N()};i=()=>{zt(),m?.(C),N()},Bn(e,t.type,Oe,ze)})});a(s);let p={enter:()=>t.enter?l("enter"):Promise.resolve(),leave:()=>t.leave?l("leave"):Promise.resolve(),cancel:()=>{i?.(),i=null},update:(u,c)=>{if(!u)throw new Error("Element is required.");e=u,p.cancel(),a(c)}};return t.appear&&p.enter(),p}var kn=0;function Bn(e,s,t,n){let o=e._motionEndId=++kn,i=()=>{o===e._motionEndId&&n()};if(t!=null)return setTimeout(i,t);let{type:r,timeout:a,count:l}=Sn(e,s);if(!r){n();return}let p=r+"end",u=0,c=()=>{e.removeEventListener(p,f,!0),i()},f=b=>{b.target===e&&++u>=l&&c()};e.addEventListener(p,f,{capture:!0,once:!0}),setTimeout(()=>{u<l&&c()},a+1)}var Dn=["*"];function Tn(e,s){e&1&&R(0)}var mt=new WeakMap;function it(e,s){if(e)switch(mt.has(e)||mt.set(e,{display:e.style.display,visibility:e.style.visibility,maxHeight:e.style.maxHeight,overflow:e.style.overflow}),s){case"display":e.style.display="none";break;case"visibility":e.style.visibility="hidden",e.style.maxHeight="0",e.style.overflow="hidden";break}}function vt(e,s){if(!e)return;let t=mt.get(e)??e.style;switch(s){case"display":e.style.display=t?.display||"";break;case"visibility":e.style.visibility=t?.visibility||"",e.style.maxHeight=t?.maxHeight||"",e.style.overflow=t?.overflow||"";break}mt.delete(e)}var Pn=`
    .p-motion {
        display: block;
    }
`,Nn={root:"p-motion"},Ot=(()=>{class e extends T{name="motion";style=Pn;classes=Nn;static \u0275fac=(()=>{let t;return function(o){return(t||(t=g(e)))(o||e)}})();static \u0275prov=D({token:e,factory:e.\u0275fac})}return e})();var Ae=new A("MOTION_INSTANCE"),Ln=(()=>{class e extends I{$pcMotion=h(Ae,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=h(E,{self:!0});onAfterViewChecked(){let n=this.options()?.root||{};this.bindDirectiveInstance.setAttrs(yt(yt({},this.ptms(["host","root"])),n))}_componentStyle=h(Ot);visible=d(!1);mountOnEnter=d(!0);unmountOnLeave=d(!0);name=d(void 0);type=d(void 0);safe=d(void 0);disabled=d(!1);appear=d(!1);enter=d(!0);leave=d(!0);duration=d(void 0);hideStrategy=d("display");enterFromClass=d(void 0);enterToClass=d(void 0);enterActiveClass=d(void 0);leaveFromClass=d(void 0);leaveToClass=d(void 0);leaveActiveClass=d(void 0);options=d({});onBeforeEnter=w();onEnter=w();onAfterEnter=w();onEnterCancelled=w();onBeforeLeave=w();onLeave=w();onAfterLeave=w();onLeaveCancelled=w();motionOptions=ct(()=>{let t=this.options();return{name:t.name??this.name(),type:t.type??this.type(),safe:t.safe??this.safe(),disabled:t.disabled??this.disabled(),appear:!1,enter:t.enter??this.enter(),leave:t.leave??this.leave(),duration:t.duration??this.duration(),enterClass:{from:t.enterClass?.from??(t.name?void 0:this.enterFromClass()),to:t.enterClass?.to??(t.name?void 0:this.enterToClass()),active:t.enterClass?.active??(t.name?void 0:this.enterActiveClass())},leaveClass:{from:t.leaveClass?.from??(t.name?void 0:this.leaveFromClass()),to:t.leaveClass?.to??(t.name?void 0:this.leaveToClass()),active:t.leaveClass?.active??(t.name?void 0:this.leaveActiveClass())},onBeforeEnter:t.onBeforeEnter??this.handleBeforeEnter,onEnter:t.onEnter??this.handleEnter,onAfterEnter:t.onAfterEnter??this.handleAfterEnter,onEnterCancelled:t.onEnterCancelled??this.handleEnterCancelled,onBeforeLeave:t.onBeforeLeave??this.handleBeforeLeave,onLeave:t.onLeave??this.handleLeave,onAfterLeave:t.onAfterLeave??this.handleAfterLeave,onLeaveCancelled:t.onLeaveCancelled??this.handleLeaveCancelled}});motion;isInitialMount=!0;cancelled=!1;destroyed=!1;rendered=jt(!1);handleBeforeEnter=t=>!this.destroyed&&this.onBeforeEnter.emit(t);handleEnter=t=>!this.destroyed&&this.onEnter.emit(t);handleAfterEnter=t=>!this.destroyed&&this.onAfterEnter.emit(t);handleEnterCancelled=t=>!this.destroyed&&this.onEnterCancelled.emit(t);handleBeforeLeave=t=>!this.destroyed&&this.onBeforeLeave.emit(t);handleLeave=t=>!this.destroyed&&this.onLeave.emit(t);handleAfterLeave=t=>!this.destroyed&&this.onAfterLeave.emit(t);handleLeaveCancelled=t=>!this.destroyed&&this.onLeaveCancelled.emit(t);constructor(){super(),H(()=>{let t=this.hideStrategy();this.isInitialMount?(it(this.$el,t),this.rendered.set(this.visible()&&this.mountOnEnter()||!this.mountOnEnter())):this.visible()&&!this.rendered()&&(it(this.$el,t),this.rendered.set(!0))}),H(()=>{this.motion||(this.motion=_t(this.$el,this.motionOptions()))}),Mt(async()=>{if(!this.$el)return;let t=this.isInitialMount&&this.visible()&&this.appear(),n=this.hideStrategy();this.visible()?(await pt(),vt(this.$el,n),(t||!this.isInitialMount)&&(this.applyMotionDuration("enter"),this.motion?.enter())):this.isInitialMount||(await pt(),this.applyMotionDuration("leave"),this.motion?.leave()?.then(async()=>{this.$el&&!this.cancelled&&!this.visible()&&(it(this.$el,n),this.unmountOnLeave()&&(await pt(),this.cancelled||this.rendered.set(!1)))})),this.isInitialMount=!1})}applyMotionDuration(t){let n=It(this.motionOptions),o=gt(n.duration,t);if(o==null||!this.$el)return;let i=this.$el,r=`${o}ms`;n.type==="transition"?i.style.transitionDuration=r:i.style.animationDuration=r}onDestroy(){this.destroyed=!0,this.cancelled=!0,this.motion?.cancel(),this.motion=void 0,vt(this.$el,this.hideStrategy()),this.$el?.remove(),this.isInitialMount=!0}static \u0275fac=function(n){return new(n||e)};static \u0275cmp=M({type:e,selectors:[["p-motion"]],hostVars:2,hostBindings:function(n,o){n&2&&k(o.cx("root"))},inputs:{visible:[1,"visible"],mountOnEnter:[1,"mountOnEnter"],unmountOnLeave:[1,"unmountOnLeave"],name:[1,"name"],type:[1,"type"],safe:[1,"safe"],disabled:[1,"disabled"],appear:[1,"appear"],enter:[1,"enter"],leave:[1,"leave"],duration:[1,"duration"],hideStrategy:[1,"hideStrategy"],enterFromClass:[1,"enterFromClass"],enterToClass:[1,"enterToClass"],enterActiveClass:[1,"enterActiveClass"],leaveFromClass:[1,"leaveFromClass"],leaveToClass:[1,"leaveToClass"],leaveActiveClass:[1,"leaveActiveClass"],options:[1,"options"]},outputs:{onBeforeEnter:"onBeforeEnter",onEnter:"onEnter",onAfterEnter:"onAfterEnter",onEnterCancelled:"onEnterCancelled",onBeforeLeave:"onBeforeLeave",onLeave:"onLeave",onAfterLeave:"onAfterLeave",onLeaveCancelled:"onLeaveCancelled"},features:[B([Ot,{provide:Ae,useExisting:e},{provide:$,useExisting:e}]),W([E]),y],ngContentSelectors:Dn,decls:1,vars:1,template:function(n,o){n&1&&(V(),Rt(0,Tn,1,0)),n&2&&Ut(o.rendered()?0:-1)},dependencies:[O,bt],encapsulation:2})}return e})(),_e=new A("MOTION_DIRECTIVE_INSTANCE"),Vi=(()=>{class e extends I{$pcMotionDirective=h(_e,{optional:!0,skipSelf:!0})??void 0;visible=d(!1,{alias:"pMotion"});name=d(void 0,{alias:"pMotionName"});type=d(void 0,{alias:"pMotionType"});safe=d(void 0,{alias:"pMotionSafe"});disabled=d(!1,{alias:"pMotionDisabled"});appear=d(!1,{alias:"pMotionAppear"});enter=d(!0,{alias:"pMotionEnter"});leave=d(!0,{alias:"pMotionLeave"});duration=d(void 0,{alias:"pMotionDuration"});hideStrategy=d("display",{alias:"pMotionHideStrategy"});enterFromClass=d(void 0,{alias:"pMotionEnterFromClass"});enterToClass=d(void 0,{alias:"pMotionEnterToClass"});enterActiveClass=d(void 0,{alias:"pMotionEnterActiveClass"});leaveFromClass=d(void 0,{alias:"pMotionLeaveFromClass"});leaveToClass=d(void 0,{alias:"pMotionLeaveToClass"});leaveActiveClass=d(void 0,{alias:"pMotionLeaveActiveClass"});options=d({},{alias:"pMotionOptions"});onBeforeEnter=w({alias:"pMotionOnBeforeEnter"});onEnter=w({alias:"pMotionOnEnter"});onAfterEnter=w({alias:"pMotionOnAfterEnter"});onEnterCancelled=w({alias:"pMotionOnEnterCancelled"});onBeforeLeave=w({alias:"pMotionOnBeforeLeave"});onLeave=w({alias:"pMotionOnLeave"});onAfterLeave=w({alias:"pMotionOnAfterLeave"});onLeaveCancelled=w({alias:"pMotionOnLeaveCancelled"});motionOptions=ct(()=>{let t=this.options()??{};return{name:t.name??this.name(),type:t.type??this.type(),safe:t.safe??this.safe(),disabled:t.disabled??this.disabled(),appear:!1,enter:t.enter??this.enter(),leave:t.leave??this.leave(),duration:t.duration??this.duration(),enterClass:{from:t.enterClass?.from??(t.name?void 0:this.enterFromClass()),to:t.enterClass?.to??(t.name?void 0:this.enterToClass()),active:t.enterClass?.active??(t.name?void 0:this.enterActiveClass())},leaveClass:{from:t.leaveClass?.from??(t.name?void 0:this.leaveFromClass()),to:t.leaveClass?.to??(t.name?void 0:this.leaveToClass()),active:t.leaveClass?.active??(t.name?void 0:this.leaveActiveClass())},onBeforeEnter:t.onBeforeEnter??this.handleBeforeEnter,onEnter:t.onEnter??this.handleEnter,onAfterEnter:t.onAfterEnter??this.handleAfterEnter,onEnterCancelled:t.onEnterCancelled??this.handleEnterCancelled,onBeforeLeave:t.onBeforeLeave??this.handleBeforeLeave,onLeave:t.onLeave??this.handleLeave,onAfterLeave:t.onAfterLeave??this.handleAfterLeave,onLeaveCancelled:t.onLeaveCancelled??this.handleLeaveCancelled}});motion;isInitialMount=!0;cancelled=!1;destroyed=!1;handleBeforeEnter=t=>!this.destroyed&&this.onBeforeEnter.emit(t);handleEnter=t=>!this.destroyed&&this.onEnter.emit(t);handleAfterEnter=t=>!this.destroyed&&this.onAfterEnter.emit(t);handleEnterCancelled=t=>!this.destroyed&&this.onEnterCancelled.emit(t);handleBeforeLeave=t=>!this.destroyed&&this.onBeforeLeave.emit(t);handleLeave=t=>!this.destroyed&&this.onLeave.emit(t);handleAfterLeave=t=>!this.destroyed&&this.onAfterLeave.emit(t);handleLeaveCancelled=t=>!this.destroyed&&this.onLeaveCancelled.emit(t);constructor(){super(),H(()=>{this.motion||(this.motion=_t(this.$el,this.motionOptions()))}),Mt(()=>{if(!this.$el)return;let t=this.isInitialMount&&this.visible()&&this.appear(),n=this.hideStrategy();this.visible()?(vt(this.$el,n),(t||!this.isInitialMount)&&(this.applyMotionDuration("enter"),this.motion?.enter())):this.isInitialMount?it(this.$el,n):(this.applyMotionDuration("leave"),this.motion?.leave()?.then(()=>{this.$el&&!this.cancelled&&!this.visible()&&it(this.$el,n)})),this.isInitialMount=!1})}applyMotionDuration(t){let n=It(this.motionOptions),o=gt(n.duration,t);if(o==null||!this.$el)return;let i=this.$el,r=`${o}ms`;n.type==="transition"?i.style.transitionDuration=r:i.style.animationDuration=r}onDestroy(){this.destroyed=!0,this.cancelled=!0,this.motion?.cancel(),this.motion=void 0,vt(this.$el,this.hideStrategy()),this.$el?.remove(),this.isInitialMount=!0}static \u0275fac=function(n){return new(n||e)};static \u0275dir=j({type:e,selectors:[["","pMotion",""]],inputs:{visible:[1,"pMotion","visible"],name:[1,"pMotionName","name"],type:[1,"pMotionType","type"],safe:[1,"pMotionSafe","safe"],disabled:[1,"pMotionDisabled","disabled"],appear:[1,"pMotionAppear","appear"],enter:[1,"pMotionEnter","enter"],leave:[1,"pMotionLeave","leave"],duration:[1,"pMotionDuration","duration"],hideStrategy:[1,"pMotionHideStrategy","hideStrategy"],enterFromClass:[1,"pMotionEnterFromClass","enterFromClass"],enterToClass:[1,"pMotionEnterToClass","enterToClass"],enterActiveClass:[1,"pMotionEnterActiveClass","enterActiveClass"],leaveFromClass:[1,"pMotionLeaveFromClass","leaveFromClass"],leaveToClass:[1,"pMotionLeaveToClass","leaveToClass"],leaveActiveClass:[1,"pMotionLeaveActiveClass","leaveActiveClass"],options:[1,"pMotionOptions","options"]},outputs:{onBeforeEnter:"pMotionOnBeforeEnter",onEnter:"pMotionOnEnter",onAfterEnter:"pMotionOnAfterEnter",onEnterCancelled:"pMotionOnEnterCancelled",onBeforeLeave:"pMotionOnBeforeLeave",onLeave:"pMotionOnLeave",onAfterLeave:"pMotionOnAfterLeave",onLeaveCancelled:"pMotionOnLeaveCancelled"},features:[B([Ot,{provide:_e,useExisting:e},{provide:$,useExisting:e}]),y]})}return e})(),Ri=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=_({type:e});static \u0275inj=F({imports:[Ln]})}return e})();export{Lt as a,On as b,zn as c,he as d,fe as e,At as f,ye as g,Ee as h,ht as i,Se as j,$o as k,ke as l,fn as m,Mi as n,Ln as o,Vi as p,Ri as q};
