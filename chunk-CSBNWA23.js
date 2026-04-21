import{a as ut,b as ht,c as bt}from"./chunk-5VTPQJRB.js";import{a as mt,b as ft,c as _t,d as gt}from"./chunk-AFBSSPBX.js";import{a as vt}from"./chunk-S7XZYYUR.js";import{a as Ct}from"./chunk-KJFLUHC3.js";import{c as H}from"./chunk-HWJEREV2.js";import{b as pt,c as dt,i as Ie,k as ke,m as Ee,p as Me,q as Se}from"./chunk-QPZRXTYU.js";import{b as Z,c as ee,d as Q,e as x}from"./chunk-C5WUBOVC.js";import{Aa as lt,M as $,O as nt,b as Le,ca as me,d as tt,da as it,ha as ot,ka as at,la as ue,ma as k,na as Ve,p as je,t as be,ta as X,xa as st,ya as rt}from"./chunk-M4T36MQF.js";import{b as ct}from"./chunk-MUS4WCB5.js";import{a as We,b as Ye,c as Xe,d as et}from"./chunk-GPANOKNG.js";import{g as W,h as Je,i as Y,k as de,l as R}from"./chunk-OCPLLTZX.js";import{$ as A,$a as p,Ab as r,Bb as re,Cb as le,Db as ce,Ea as He,Eb as Ge,Fa as qe,Fb as b,Gb as C,Ha as c,Jb as he,K as q,L as G,Mb as pe,N as K,Nb as f,Ob as L,P as g,Pb as z,Qa as ge,Qb as Te,U as v,V as y,Va as E,W as D,Wa as U,Wb as F,Yb as we,Za as J,Zb as Ke,_a as B,_b as Ue,aa as Ce,dc as te,ea as _e,ec as ne,fb as u,gc as j,ha as Qe,ib as T,ja as M,jb as w,jc as V,lb as Ae,mb as Be,mc as Oe,nb as s,nc as N,ob as d,pb as m,qb as _,rb as oe,sb as ae,tb as se,ub as ve,uc as h,vb as ye,vc as P,wb as O,xb as S,yb as xe,zb as I}from"./chunk-6Q4WZWJD.js";import{a as ie}from"./chunk-7CGTOI24.js";var yt=`
    .p-avatar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: dt('avatar.width');
        height: dt('avatar.height');
        font-size: dt('avatar.font.size');
        background: dt('avatar.background');
        color: dt('avatar.color');
        border-radius: dt('avatar.border.radius');
    }

    .p-avatar-image {
        background: transparent;
    }

    .p-avatar-circle {
        border-radius: 50%;
    }

    .p-avatar-circle img {
        border-radius: 50%;
    }

    .p-avatar-icon {
        font-size: dt('avatar.icon.size');
        width: dt('avatar.icon.size');
        height: dt('avatar.icon.size');
    }

    .p-avatar img {
        width: 100%;
        height: 100%;
    }

    .p-avatar-lg {
        width: dt('avatar.lg.width');
        height: dt('avatar.lg.width');
        font-size: dt('avatar.lg.font.size');
    }

    .p-avatar-lg .p-avatar-icon {
        font-size: dt('avatar.lg.icon.size');
        width: dt('avatar.lg.icon.size');
        height: dt('avatar.lg.icon.size');
    }

    .p-avatar-xl {
        width: dt('avatar.xl.width');
        height: dt('avatar.xl.width');
        font-size: dt('avatar.xl.font.size');
    }

    .p-avatar-xl .p-avatar-icon {
        font-size: dt('avatar.xl.icon.size');
        width: dt('avatar.xl.icon.size');
        height: dt('avatar.xl.icon.size');
    }

    .p-avatar-group {
        display: flex;
        align-items: center;
    }

    .p-avatar-group .p-avatar + .p-avatar {
        margin-inline-start: dt('avatar.group.offset');
    }

    .p-avatar-group .p-avatar {
        border: 2px solid dt('avatar.group.border.color');
    }

    .p-avatar-group .p-avatar-lg + .p-avatar-lg {
        margin-inline-start: dt('avatar.lg.group.offset');
    }

    .p-avatar-group .p-avatar-xl + .p-avatar-xl {
        margin-inline-start: dt('avatar.xl.group.offset');
    }
`;var Pt=["*"];function Rt(t,o){if(t&1&&(d(0,"span",3),L(1),m()),t&2){let e=r();f(e.cx("label")),s("pBind",e.ptm("label")),u("data-p",e.dataP),c(),z(e.label)}}function $t(t,o){if(t&1&&_(0,"span",5),t&2){let e=r(2);f(e.icon),s("pBind",e.ptm("icon"))("ngClass",e.cx("icon")),u("data-p",e.dataP)}}function Zt(t,o){if(t&1&&p(0,$t,1,5,"span",4),t&2){let e=r(),i=he(5);s("ngIf",e.icon)("ngIfElse",i)}}function Qt(t,o){if(t&1){let e=S();d(0,"img",7),I("error",function(n){v(e);let a=r(2);return y(a.imageError(n))}),m()}if(t&2){let e=r(2);s("pBind",e.ptm("image"))("src",e.image,qe),u("aria-label",e.ariaLabel)("data-p",e.dataP)}}function Ht(t,o){if(t&1&&p(0,Qt,1,4,"img",6),t&2){let e=r();s("ngIf",e.image)}}var qt={root:({instance:t})=>["p-avatar p-component",{"p-avatar-image":t.image!=null,"p-avatar-circle":t.shape==="circle","p-avatar-lg":t.size==="large","p-avatar-xl":t.size==="xlarge"}],label:"p-avatar-label",icon:"p-avatar-icon"},xt=(()=>{class t extends X{name="avatar";style=yt;classes=qt;static \u0275fac=(()=>{let e;return function(n){return(e||(e=M(t)))(n||t)}})();static \u0275prov=q({token:t,factory:t.\u0275fac})}return t})();var Tt=new K("AVATAR_INSTANCE"),Fe=(()=>{class t extends Q{componentName="Avatar";$pcAvatar=g(Tt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=g(x,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}label;icon;image;size="normal";shape="square";styleClass;ariaLabel;ariaLabelledBy;onImageError=new A;_componentStyle=g(xt);imageError(e){this.onImageError.emit(e)}get dataP(){return this.cn({[this.shape]:this.shape,[this.size]:this.size})}static \u0275fac=(()=>{let e;return function(n){return(e||(e=M(t)))(n||t)}})();static \u0275cmp=E({type:t,selectors:[["p-avatar"]],hostVars:5,hostBindings:function(i,n){i&2&&(u("aria-label",n.ariaLabel)("aria-labelledby",n.ariaLabelledBy)("data-p",n.dataP),f(n.cn(n.cx("root"),n.styleClass)))},inputs:{label:"label",icon:"icon",image:"image",size:"size",shape:"shape",styleClass:"styleClass",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy"},outputs:{onImageError:"onImageError"},features:[F([xt,{provide:Tt,useExisting:t},{provide:ee,useExisting:t}]),J([x]),B],ngContentSelectors:Pt,decls:6,vars:2,consts:[["iconTemplate",""],["imageTemplate",""],[3,"pBind","class",4,"ngIf","ngIfElse"],[3,"pBind"],[3,"pBind","class","ngClass",4,"ngIf","ngIfElse"],[3,"pBind","ngClass"],[3,"pBind","src","error",4,"ngIf"],[3,"error","pBind","src"]],template:function(i,n){if(i&1&&(re(),le(0),p(1,Rt,2,5,"span",2)(2,Zt,1,2,"ng-template",null,0,j)(4,Ht,1,1,"ng-template",null,1,j)),i&2){let a=he(3);c(),s("ngIf",n.label)("ngIfElse",a)}},dependencies:[R,W,Y,k,x],encapsulation:2,changeDetection:0})}return t})(),wt=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=U({type:t});static \u0275inj=G({imports:[Fe,k,k]})}return t})();var Kt=["data-p-icon","exclamation-triangle"],It=(()=>{class t extends Ie{pathId;onInit(){this.pathId="url(#"+Z()+")"}static \u0275fac=(()=>{let e;return function(n){return(e||(e=M(t)))(n||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","exclamation-triangle"]],features:[B],attrs:Kt,decls:7,vars:2,consts:[["d","M13.4018 13.1893H0.598161C0.49329 13.189 0.390283 13.1615 0.299143 13.1097C0.208003 13.0578 0.131826 12.9832 0.0780112 12.8932C0.0268539 12.8015 0 12.6982 0 12.5931C0 12.4881 0.0268539 12.3848 0.0780112 12.293L6.47985 1.08982C6.53679 1.00399 6.61408 0.933574 6.70484 0.884867C6.7956 0.836159 6.897 0.810669 7 0.810669C7.103 0.810669 7.2044 0.836159 7.29516 0.884867C7.38592 0.933574 7.46321 1.00399 7.52015 1.08982L13.922 12.293C13.9731 12.3848 14 12.4881 14 12.5931C14 12.6982 13.9731 12.8015 13.922 12.8932C13.8682 12.9832 13.792 13.0578 13.7009 13.1097C13.6097 13.1615 13.5067 13.189 13.4018 13.1893ZM1.63046 11.989H12.3695L7 2.59425L1.63046 11.989Z","fill","currentColor"],["d","M6.99996 8.78801C6.84143 8.78594 6.68997 8.72204 6.57787 8.60993C6.46576 8.49782 6.40186 8.34637 6.39979 8.18784V5.38703C6.39979 5.22786 6.46302 5.0752 6.57557 4.96265C6.68813 4.85009 6.84078 4.78686 6.99996 4.78686C7.15914 4.78686 7.31179 4.85009 7.42435 4.96265C7.5369 5.0752 7.60013 5.22786 7.60013 5.38703V8.18784C7.59806 8.34637 7.53416 8.49782 7.42205 8.60993C7.30995 8.72204 7.15849 8.78594 6.99996 8.78801Z","fill","currentColor"],["d","M6.99996 11.1887C6.84143 11.1866 6.68997 11.1227 6.57787 11.0106C6.46576 10.8985 6.40186 10.7471 6.39979 10.5885V10.1884C6.39979 10.0292 6.46302 9.87658 6.57557 9.76403C6.68813 9.65147 6.84078 9.58824 6.99996 9.58824C7.15914 9.58824 7.31179 9.65147 7.42435 9.76403C7.5369 9.87658 7.60013 10.0292 7.60013 10.1884V10.5885C7.59806 10.7471 7.53416 10.8985 7.42205 11.0106C7.30995 11.1227 7.15849 11.1866 6.99996 11.1887Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(i,n){i&1&&(D(),oe(0,"g"),se(1,"path",0)(2,"path",1)(3,"path",2),ae(),oe(4,"defs")(5,"clipPath",3),se(6,"rect",4),ae()()),i&2&&(u("clip-path",n.pathId),c(5),xe("id",n.pathId))},encapsulation:2})}return t})();var Ut=["data-p-icon","info-circle"],kt=(()=>{class t extends Ie{pathId;onInit(){this.pathId="url(#"+Z()+")"}static \u0275fac=(()=>{let e;return function(n){return(e||(e=M(t)))(n||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","info-circle"]],features:[B],attrs:Ut,decls:5,vars:2,consts:[["fill-rule","evenodd","clip-rule","evenodd","d","M3.11101 12.8203C4.26215 13.5895 5.61553 14 7 14C8.85652 14 10.637 13.2625 11.9497 11.9497C13.2625 10.637 14 8.85652 14 7C14 5.61553 13.5895 4.26215 12.8203 3.11101C12.0511 1.95987 10.9579 1.06266 9.67879 0.532846C8.3997 0.00303296 6.99224 -0.13559 5.63437 0.134506C4.2765 0.404603 3.02922 1.07129 2.05026 2.05026C1.07129 3.02922 0.404603 4.2765 0.134506 5.63437C-0.13559 6.99224 0.00303296 8.3997 0.532846 9.67879C1.06266 10.9579 1.95987 12.0511 3.11101 12.8203ZM3.75918 2.14976C4.71846 1.50879 5.84628 1.16667 7 1.16667C8.5471 1.16667 10.0308 1.78125 11.1248 2.87521C12.2188 3.96918 12.8333 5.45291 12.8333 7C12.8333 8.15373 12.4912 9.28154 11.8502 10.2408C11.2093 11.2001 10.2982 11.9478 9.23232 12.3893C8.16642 12.8308 6.99353 12.9463 5.86198 12.7212C4.73042 12.4962 3.69102 11.9406 2.87521 11.1248C2.05941 10.309 1.50384 9.26958 1.27876 8.13803C1.05367 7.00647 1.16919 5.83358 1.61071 4.76768C2.05222 3.70178 2.79989 2.79074 3.75918 2.14976ZM7.00002 4.8611C6.84594 4.85908 6.69873 4.79698 6.58977 4.68801C6.48081 4.57905 6.4187 4.43185 6.41669 4.27776V3.88888C6.41669 3.73417 6.47815 3.58579 6.58754 3.4764C6.69694 3.367 6.84531 3.30554 7.00002 3.30554C7.15473 3.30554 7.3031 3.367 7.4125 3.4764C7.52189 3.58579 7.58335 3.73417 7.58335 3.88888V4.27776C7.58134 4.43185 7.51923 4.57905 7.41027 4.68801C7.30131 4.79698 7.1541 4.85908 7.00002 4.8611ZM7.00002 10.6945C6.84594 10.6925 6.69873 10.6304 6.58977 10.5214C6.48081 10.4124 6.4187 10.2652 6.41669 10.1111V6.22225C6.41669 6.06754 6.47815 5.91917 6.58754 5.80977C6.69694 5.70037 6.84531 5.63892 7.00002 5.63892C7.15473 5.63892 7.3031 5.70037 7.4125 5.80977C7.52189 5.91917 7.58335 6.06754 7.58335 6.22225V10.1111C7.58134 10.2652 7.51923 10.4124 7.41027 10.5214C7.30131 10.6304 7.1541 10.6925 7.00002 10.6945Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(i,n){i&1&&(D(),oe(0,"g"),se(1,"path",0),ae(),oe(2,"defs")(3,"clipPath",1),se(4,"rect",2),ae()()),i&2&&(u("clip-path",n.pathId),c(3),xe("id",n.pathId))},encapsulation:2})}return t})();var Et=`
    .p-confirmdialog .p-dialog-content {
        display: flex;
        align-items: center;
        gap: dt('confirmdialog.content.gap');
    }

    .p-confirmdialog-icon {
        color: dt('confirmdialog.icon.color');
        font-size: dt('confirmdialog.icon.size');
        width: dt('confirmdialog.icon.size');
        height: dt('confirmdialog.icon.size');
    }
`;var Jt=["header"],Wt=["footer"],Yt=["rejecticon"],Xt=["accepticon"],en=["message"],tn=["icon"],nn=["headless"],on=[[["p-footer"]]],an=["p-footer"],sn=(t,o,e)=>({$implicit:t,onAccept:o,onReject:e}),rn=t=>({$implicit:t});function ln(t,o){t&1&&O(0)}function cn(t,o){if(t&1&&p(0,ln,1,0,"ng-container",7),t&2){let e=r(2);s("ngTemplateOutlet",e.headlessTemplate||e._headlessTemplate)("ngTemplateOutletContext",Ue(2,sn,e.confirmation,e.onAccept.bind(e),e.onReject.bind(e)))}}function pn(t,o){t&1&&p(0,cn,1,6,"ng-template",null,2,j)}function dn(t,o){t&1&&O(0)}function mn(t,o){if(t&1&&p(0,dn,1,0,"ng-container",8),t&2){let e=r(3);s("ngTemplateOutlet",e.headerTemplate||e._headerTemplate)}}function un(t,o){t&1&&p(0,mn,1,1,"ng-template",null,4,j)}function fn(t,o){}function _n(t,o){t&1&&p(0,fn,0,0,"ng-template")}function gn(t,o){if(t&1&&p(0,_n,1,0,null,8),t&2){let e=r(3);s("ngTemplateOutlet",e.iconTemplate||e._iconTemplate)}}function hn(t,o){if(t&1&&_(0,"i",12),t&2){let e=r(4);f(e.option("icon")),s("ngClass",e.cx("icon"))("pBind",e.ptm("icon"))}}function bn(t,o){if(t&1&&p(0,hn,1,4,"i",11),t&2){let e=r(3);s("ngIf",e.option("icon"))}}function Cn(t,o){}function vn(t,o){t&1&&p(0,Cn,0,0,"ng-template")}function yn(t,o){if(t&1&&p(0,vn,1,0,null,7),t&2){let e=r(3);s("ngTemplateOutlet",e.messageTemplate||e._messageTemplate)("ngTemplateOutletContext",we(2,rn,e.confirmation))}}function xn(t,o){if(t&1&&_(0,"span",13),t&2){let e=r(3);f(e.cx("message")),s("pBind",e.ptm("message"))("innerHTML",e.option("message"),He)}}function Tn(t,o){if(t&1&&(T(0,gn,1,1)(1,bn,1,1,"i",9),T(2,yn,1,4)(3,xn,1,4,"span",10)),t&2){let e=r(2);w(e.iconTemplate||e._iconTemplate?0:!e.iconTemplate&&!e._iconTemplate&&!e._messageTemplate&&!e.messageTemplate?1:-1),c(2),w(e.messageTemplate||e._messageTemplate?2:3)}}function wn(t,o){if(t&1&&(T(0,un,2,0),p(1,Tn,4,2,"ng-template",null,3,j)),t&2){let e=r();w(e.headerTemplate||e._headerTemplate?0:-1)}}function In(t,o){t&1&&O(0)}function kn(t,o){if(t&1&&(le(0),p(1,In,1,0,"ng-container",8)),t&2){let e=r(2);c(),s("ngTemplateOutlet",e.footerTemplate||e._footerTemplate)}}function En(t,o){if(t&1&&_(0,"i",18),t&2){let e=r(6);f(e.option("rejectIcon")),s("pBind",e.ptm("pcRejectButton").icon)}}function Mn(t,o){if(t&1&&p(0,En,1,3,"i",17),t&2){let e=r(5);s("ngIf",e.option("rejectIcon"))}}function Sn(t,o){}function Dn(t,o){t&1&&p(0,Sn,0,0,"ng-template")}function An(t,o){if(t&1&&(T(0,Mn,1,1,"i",16),p(1,Dn,1,0,null,8)),t&2){let e=r(4);w(e.rejectIcon&&!e.rejectIconTemplate&&!e._rejectIconTemplate?0:-1),c(),s("ngTemplateOutlet",e.rejectIconTemplate||e._rejectIconTemplate)}}function Bn(t,o){if(t&1){let e=S();d(0,"p-button",15),I("onClick",function(){v(e);let n=r(3);return y(n.onReject())}),p(1,An,2,2,"ng-template",null,5,j),m()}if(t&2){let e=r(3);s("pt",e.ptm("pcRejectButton"))("label",e.rejectButtonLabel)("styleClass",e.getButtonStyleClass("pcRejectButton","rejectButtonStyleClass"))("ariaLabel",e.option("rejectButtonProps","ariaLabel"))("buttonProps",e.getRejectButtonProps())("unstyled",e.unstyled())}}function On(t,o){if(t&1&&_(0,"i",18),t&2){let e=r(6);f(e.option("acceptIcon")),s("pBind",e.ptm("pcAcceptButton").icon)}}function Ln(t,o){if(t&1&&p(0,On,1,3,"i",17),t&2){let e=r(5);s("ngIf",e.option("acceptIcon"))}}function jn(t,o){}function Vn(t,o){t&1&&p(0,jn,0,0,"ng-template")}function Nn(t,o){if(t&1&&(T(0,Ln,1,1,"i",16),p(1,Vn,1,0,null,8)),t&2){let e=r(4);w(e.acceptIcon&&!e._acceptIconTemplate&&!e.acceptIconTemplate?0:-1),c(),s("ngTemplateOutlet",e.acceptIconTemplate||e._acceptIconTemplate)}}function zn(t,o){if(t&1){let e=S();d(0,"p-button",15),I("onClick",function(){v(e);let n=r(3);return y(n.onAccept())}),p(1,Nn,2,2,"ng-template",null,5,j),m()}if(t&2){let e=r(3);s("pt",e.ptm("pcAcceptButton"))("label",e.acceptButtonLabel)("styleClass",e.getButtonStyleClass("pcAcceptButton","acceptButtonStyleClass"))("ariaLabel",e.option("acceptButtonProps","ariaLabel"))("buttonProps",e.getAcceptButtonProps())("unstyled",e.unstyled())}}function Fn(t,o){if(t&1&&p(0,Bn,3,6,"p-button",14)(1,zn,3,6,"p-button",14),t&2){let e=r(2);s("ngIf",e.option("rejectVisible")),c(),s("ngIf",e.option("acceptVisible"))}}function Pn(t,o){if(t&1&&(T(0,kn,2,1),T(1,Fn,2,2)),t&2){let e=r();w(e.footerTemplate||e._footerTemplate?0:-1),c(),w(!e.footerTemplate&&!e._footerTemplate?1:-1)}}var Rn={root:"p-confirmdialog",icon:"p-confirmdialog-icon",message:"p-confirmdialog-message",pcRejectButton:"p-confirmdialog-reject-button",pcAcceptButton:"p-confirmdialog-accept-button"},Mt=(()=>{class t extends X{name="confirmdialog";style=Et;classes=Rn;static \u0275fac=(()=>{let e;return function(n){return(e||(e=M(t)))(n||t)}})();static \u0275prov=q({token:t,factory:t.\u0275fac})}return t})();var St=new K("CONFIRMDIALOG_INSTANCE"),Pe=(()=>{class t extends Q{confirmationService;zone;componentName="ConfirmDialog";$pcConfirmDialog=g(St,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=g(x,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("host"))}header;icon;message;get style(){return this._style}set style(e){this._style=e,this.cd.markForCheck()}styleClass;maskStyleClass;acceptIcon;acceptLabel;closeAriaLabel;acceptAriaLabel;acceptVisible=!0;rejectIcon;rejectLabel;rejectAriaLabel;rejectVisible=!0;acceptButtonStyleClass;rejectButtonStyleClass;closeOnEscape=!0;dismissableMask;blockScroll=!0;rtl=!1;closable=!0;appendTo=N("body");key;autoZIndex=!0;baseZIndex=0;transitionOptions="150ms cubic-bezier(0, 0, 0.2, 1)";focusTrap=!0;defaultFocus="accept";breakpoints;modal=!0;get visible(){return this._visible}set visible(e){this._visible=e,this._visible&&!this.maskVisible&&(this.maskVisible=!0),this.cd.markForCheck()}position="center";draggable=!0;onHide=new A;footer;_componentStyle=g(Mt);headerTemplate;footerTemplate;rejectIconTemplate;acceptIconTemplate;messageTemplate;iconTemplate;headlessTemplate;templates;$appendTo=V(()=>this.appendTo()||this.config.overlayAppendTo());_headerTemplate;_footerTemplate;_rejectIconTemplate;_acceptIconTemplate;_messageTemplate;_iconTemplate;_headlessTemplate;confirmation;_visible;_style;maskVisible;dialog;wrapper;contentContainer;subscription;preWidth;styleElement;id=Z("pn_id_");ariaLabelledBy=this.getAriaLabelledBy();translationSubscription;constructor(e,i){super(),this.confirmationService=e,this.zone=i,this.subscription=this.confirmationService.requireConfirmation$.subscribe(n=>{if(!n){this.hide();return}n.key===this.key&&(this.confirmation=n,Object.keys(n).forEach(l=>{this[l]=n[l]}),this.confirmation.accept&&(this.confirmation.acceptEvent=new A,this.confirmation.acceptEvent.subscribe(this.confirmation.accept)),this.confirmation.reject&&(this.confirmation.rejectEvent=new A,this.confirmation.rejectEvent.subscribe(this.confirmation.reject)),this.visible=!0)})}onInit(){this.breakpoints&&this.createStyle(),this.translationSubscription=this.config.translationObserver.subscribe(()=>{this.visible&&this.cd.markForCheck()})}onAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"header":this._headerTemplate=e.template;break;case"footer":this._footerTemplate=e.template;break;case"message":this._messageTemplate=e.template;break;case"icon":this._iconTemplate=e.template;break;case"rejecticon":this._rejectIconTemplate=e.template;break;case"accepticon":this._acceptIconTemplate=e.template;break;case"headless":this._headlessTemplate=e.template;break}})}getAriaLabelledBy(){return this.header!==null?Z("pn_id_")+"_header":null}option(e,i){let n=this;if(n.hasOwnProperty(e)){let a=i?n[i]:n[e];return typeof a=="function"?a():a}}getButtonStyleClass(e,i){let n=this.cx(e),a=this.option(i);return[n,a].filter(Boolean).join(" ")}getElementToFocus(){if(this.dialog?.el?.nativeElement)switch(this.option("defaultFocus")){case"accept":return be(this.dialog.el.nativeElement,".p-confirm-dialog-accept");case"reject":return be(this.dialog.el.nativeElement,".p-confirm-dialog-reject");case"close":return be(this.dialog.el.nativeElement,".p-dialog-header-close");case"none":return null;default:return be(this.dialog.el.nativeElement,".p-confirm-dialog-accept")}}createStyle(){if(!this.styleElement){this.styleElement=this.document.createElement("style"),this.styleElement.type="text/css",$(this.styleElement,"nonce",this.config?.csp()?.nonce),this.document.head.appendChild(this.styleElement);let e="";for(let i in this.breakpoints)e+=`
                    @media screen and (max-width: ${i}) {
                        .p-dialog[${this.id}] {
                            width: ${this.breakpoints[i]} !important;
                        }
                    }
                `;this.styleElement.innerHTML=e,$(this.styleElement,"nonce",this.config?.csp()?.nonce)}}close(){this.confirmation?.rejectEvent&&this.confirmation.rejectEvent.emit(me.CANCEL),this.hide(me.CANCEL)}hide(e){this.onHide.emit(e),this.visible=!1,this.unsubscribeConfirmationEvents()}onDialogHide(){this.confirmation=null}destroyStyle(){this.styleElement&&(this.document.head.removeChild(this.styleElement),this.styleElement=null)}onDestroy(){this.subscription.unsubscribe(),this.unsubscribeConfirmationEvents(),this.translationSubscription&&this.translationSubscription.unsubscribe(),this.destroyStyle()}onVisibleChange(e){e?this.visible=e:this.close()}onAccept(){this.confirmation&&this.confirmation.acceptEvent&&this.confirmation.acceptEvent.emit(),this.hide(me.ACCEPT)}onReject(){this.confirmation&&this.confirmation.rejectEvent&&this.confirmation.rejectEvent.emit(me.REJECT),this.hide(me.REJECT)}unsubscribeConfirmationEvents(){this.confirmation&&(this.confirmation.acceptEvent?.unsubscribe(),this.confirmation.rejectEvent?.unsubscribe())}get acceptButtonLabel(){return this.option("acceptLabel")||this.getAcceptButtonProps()?.label||this.config.getTranslation(Ve.ACCEPT)}get rejectButtonLabel(){return this.option("rejectLabel")||this.getRejectButtonProps()?.label||this.config.getTranslation(Ve.REJECT)}getAcceptButtonProps(){return this.option("acceptButtonProps")}getRejectButtonProps(){return this.option("rejectButtonProps")}static \u0275fac=function(i){return new(i||t)(ge(it),ge(Ce))};static \u0275cmp=E({type:t,selectors:[["p-confirmDialog"],["p-confirmdialog"],["p-confirm-dialog"]],contentQueries:function(i,n,a){if(i&1&&ce(a,at,5)(a,Jt,4)(a,Wt,4)(a,Yt,4)(a,Xt,4)(a,en,4)(a,tn,4)(a,nn,4)(a,ue,4),i&2){let l;b(l=C())&&(n.footer=l.first),b(l=C())&&(n.headerTemplate=l.first),b(l=C())&&(n.footerTemplate=l.first),b(l=C())&&(n.rejectIconTemplate=l.first),b(l=C())&&(n.acceptIconTemplate=l.first),b(l=C())&&(n.messageTemplate=l.first),b(l=C())&&(n.iconTemplate=l.first),b(l=C())&&(n.headlessTemplate=l.first),b(l=C())&&(n.templates=l)}},inputs:{header:"header",icon:"icon",message:"message",style:"style",styleClass:"styleClass",maskStyleClass:"maskStyleClass",acceptIcon:"acceptIcon",acceptLabel:"acceptLabel",closeAriaLabel:"closeAriaLabel",acceptAriaLabel:"acceptAriaLabel",acceptVisible:[2,"acceptVisible","acceptVisible",h],rejectIcon:"rejectIcon",rejectLabel:"rejectLabel",rejectAriaLabel:"rejectAriaLabel",rejectVisible:[2,"rejectVisible","rejectVisible",h],acceptButtonStyleClass:"acceptButtonStyleClass",rejectButtonStyleClass:"rejectButtonStyleClass",closeOnEscape:[2,"closeOnEscape","closeOnEscape",h],dismissableMask:[2,"dismissableMask","dismissableMask",h],blockScroll:[2,"blockScroll","blockScroll",h],rtl:[2,"rtl","rtl",h],closable:[2,"closable","closable",h],appendTo:[1,"appendTo"],key:"key",autoZIndex:[2,"autoZIndex","autoZIndex",h],baseZIndex:[2,"baseZIndex","baseZIndex",P],transitionOptions:"transitionOptions",focusTrap:[2,"focusTrap","focusTrap",h],defaultFocus:"defaultFocus",breakpoints:"breakpoints",modal:[2,"modal","modal",h],visible:"visible",position:"position",draggable:[2,"draggable","draggable",h]},outputs:{onHide:"onHide"},features:[F([Mt,{provide:St,useExisting:t},{provide:ee,useExisting:t}]),J([x]),B],ngContentSelectors:an,decls:6,vars:19,consts:[["dialog",""],["footer",""],["headless",""],["content",""],["header",""],["icon",""],["role","alertdialog",3,"visibleChange","onHide","pt","visible","closable","styleClass","modal","header","closeOnEscape","blockScroll","appendTo","position","dismissableMask","draggable","baseZIndex","autoZIndex","maskStyleClass","unstyled"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[4,"ngTemplateOutlet"],[3,"ngClass","class","pBind"],[3,"class","pBind","innerHTML"],[3,"ngClass","class","pBind",4,"ngIf"],[3,"ngClass","pBind"],[3,"pBind","innerHTML"],[3,"pt","label","styleClass","ariaLabel","buttonProps","unstyled","onClick",4,"ngIf"],[3,"onClick","pt","label","styleClass","ariaLabel","buttonProps","unstyled"],[3,"class","pBind"],[3,"class","pBind",4,"ngIf"],[3,"pBind"]],template:function(i,n){i&1&&(re(on),d(0,"p-dialog",6,0),I("visibleChange",function(l){return n.onVisibleChange(l)})("onHide",function(){return n.onDialogHide()}),T(2,pn,2,0)(3,wn,3,1),p(4,Pn,2,2,"ng-template",null,1,j),m()),i&2&&(pe(n.style),s("pt",n.pt)("visible",n.visible)("closable",n.option("closable"))("styleClass",n.cn(n.cx("root"),n.styleClass))("modal",n.option("modal"))("header",n.option("header"))("closeOnEscape",n.option("closeOnEscape"))("blockScroll",n.option("blockScroll"))("appendTo",n.$appendTo())("position",n.position)("dismissableMask",n.dismissableMask)("draggable",n.draggable)("baseZIndex",n.baseZIndex)("autoZIndex",n.autoZIndex)("maskStyleClass",n.cn(n.cx("mask"),n.maskStyleClass))("unstyled",n.unstyled()),c(2),w(n.headlessTemplate||n._headlessTemplate?2:3))},dependencies:[R,W,Y,de,Ee,gt,k,x],encapsulation:2,changeDetection:0})}return t})(),Dt=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=U({type:t});static \u0275inj=G({imports:[Pe,k,k]})}return t})();var At=`
    .p-drawer {
        display: flex;
        flex-direction: column;
        transform: translate3d(0px, 0px, 0px);
        position: relative;
        transition: transform 0.3s;
        background: dt('drawer.background');
        color: dt('drawer.color');
        border-style: solid;
        border-color: dt('drawer.border.color');
        box-shadow: dt('drawer.shadow');
    }

    .p-drawer-content {
        overflow-y: auto;
        flex-grow: 1;
        padding: dt('drawer.content.padding');
    }

    .p-drawer-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
        padding: dt('drawer.header.padding');
    }

    .p-drawer-footer {
        padding: dt('drawer.footer.padding');
    }

    .p-drawer-title {
        font-weight: dt('drawer.title.font.weight');
        font-size: dt('drawer.title.font.size');
    }

    .p-drawer-full .p-drawer {
        transition: none;
        transform: none;
        width: 100vw !important;
        height: 100vh !important;
        max-height: 100%;
        top: 0px !important;
        left: 0px !important;
        border-width: 1px;
    }

    .p-drawer-left .p-drawer-enter-active {
        animation: p-animate-drawer-enter-left 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .p-drawer-left .p-drawer-leave-active {
        animation: p-animate-drawer-leave-left 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }

    .p-drawer-right .p-drawer-enter-active {
        animation: p-animate-drawer-enter-right 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .p-drawer-right .p-drawer-leave-active {
        animation: p-animate-drawer-leave-right 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }

    .p-drawer-top .p-drawer-enter-active {
        animation: p-animate-drawer-enter-top 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .p-drawer-top .p-drawer-leave-active {
        animation: p-animate-drawer-leave-top 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }

    .p-drawer-bottom .p-drawer-enter-active {
        animation: p-animate-drawer-enter-bottom 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .p-drawer-bottom .p-drawer-leave-active {
        animation: p-animate-drawer-leave-bottom 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }

    .p-drawer-full .p-drawer-enter-active {
        animation: p-animate-drawer-enter-full 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .p-drawer-full .p-drawer-leave-active {
        animation: p-animate-drawer-leave-full 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    
    .p-drawer-left .p-drawer {
        width: 20rem;
        height: 100%;
        border-inline-end-width: 1px;
    }

    .p-drawer-right .p-drawer {
        width: 20rem;
        height: 100%;
        border-inline-start-width: 1px;
    }

    .p-drawer-top .p-drawer {
        height: 10rem;
        width: 100%;
        border-block-end-width: 1px;
    }

    .p-drawer-bottom .p-drawer {
        height: 10rem;
        width: 100%;
        border-block-start-width: 1px;
    }

    .p-drawer-left .p-drawer-content,
    .p-drawer-right .p-drawer-content,
    .p-drawer-top .p-drawer-content,
    .p-drawer-bottom .p-drawer-content {
        width: 100%;
        height: 100%;
    }

    .p-drawer-open {
        display: flex;
    }

    .p-drawer-mask:dir(rtl) {
        flex-direction: row-reverse;
    }

    @keyframes p-animate-drawer-enter-left {
        from {
            transform: translate3d(-100%, 0px, 0px);
        }
    }

    @keyframes p-animate-drawer-leave-left {
        to {
            transform: translate3d(-100%, 0px, 0px);
        }
    }

    @keyframes p-animate-drawer-enter-right {
        from {
            transform: translate3d(100%, 0px, 0px);
        }
    }

    @keyframes p-animate-drawer-leave-right {
        to {
            transform: translate3d(100%, 0px, 0px);
        }
    }

    @keyframes p-animate-drawer-enter-top {
        from {
            transform: translate3d(0px, -100%, 0px);
        }
    }

    @keyframes p-animate-drawer-leave-top {
        to {
            transform: translate3d(0px, -100%, 0px);
        }
    }

    @keyframes p-animate-drawer-enter-bottom {
        from {
            transform: translate3d(0px, 100%, 0px);
        }
    }

    @keyframes p-animate-drawer-leave-bottom {
        to {
            transform: translate3d(0px, 100%, 0px);
        }
    }

    @keyframes p-animate-drawer-enter-full {
        from {
            opacity: 0;
            transform: scale(0.93);
        }
    }

    @keyframes p-animate-drawer-leave-full {
        to {
            opacity: 0;
            transform: scale(0.93);
        }
    }
`;var Qn=["header"],Hn=["footer"],qn=["content"],Gn=["closeicon"],Kn=["headless"],Un=["container"],Jn=["closeButton"],Wn=["*"];function Yn(t,o){t&1&&O(0)}function Xn(t,o){if(t&1&&p(0,Yn,1,0,"ng-container",4),t&2){let e=r(2);s("ngTemplateOutlet",e.headlessTemplate||e._headlessTemplate)}}function ei(t,o){t&1&&O(0)}function ti(t,o){if(t&1&&(d(0,"div",9),L(1),m()),t&2){let e=r(3);f(e.cx("title")),s("pBind",e.ptm("title")),c(),z(e.header)}}function ni(t,o){t&1&&(D(),_(0,"svg",12)),t&2&&u("data-pc-section","closeicon")}function ii(t,o){}function oi(t,o){t&1&&p(0,ii,0,0,"ng-template")}function ai(t,o){if(t&1&&p(0,ni,1,1,"svg",11)(1,oi,1,0,null,4),t&2){let e=r(4);s("ngIf",!e.closeIconTemplate&&!e._closeIconTemplate),c(),s("ngTemplateOutlet",e.closeIconTemplate||e._closeIconTemplate)}}function si(t,o){if(t&1){let e=S();d(0,"p-button",10),I("onClick",function(n){v(e);let a=r(3);return y(a.close(n))})("keydown.enter",function(n){v(e);let a=r(3);return y(a.close(n))}),p(1,ai,2,2,"ng-template",null,1,j),m()}if(t&2){let e=r(3);s("pt",e.ptm("pcCloseButton"))("ngClass",e.cx("pcCloseButton"))("buttonProps",e.closeButtonProps)("ariaLabel",e.ariaCloseLabel)("unstyled",e.unstyled()),u("data-pc-group-section","iconcontainer")}}function ri(t,o){t&1&&O(0)}function li(t,o){t&1&&O(0)}function ci(t,o){if(t&1&&(ve(0),d(1,"div",5),p(2,li,1,0,"ng-container",4),m(),ye()),t&2){let e=r(3);c(),s("pBind",e.ptm("footer"))("ngClass",e.cx("footer")),u("data-pc-section","footer"),c(),s("ngTemplateOutlet",e.footerTemplate||e._footerTemplate)}}function pi(t,o){if(t&1&&(d(0,"div",5),p(1,ei,1,0,"ng-container",4)(2,ti,2,4,"div",6)(3,si,3,6,"p-button",7),m(),d(4,"div",5),le(5),p(6,ri,1,0,"ng-container",4),m(),p(7,ci,3,4,"ng-container",8)),t&2){let e=r(2);s("pBind",e.ptm("header"))("ngClass",e.cx("header")),u("data-pc-section","header"),c(),s("ngTemplateOutlet",e.headerTemplate||e._headerTemplate),c(),s("ngIf",e.header),c(),s("ngIf",e.showCloseIcon&&e.closable),c(),s("pBind",e.ptm("content"))("ngClass",e.cx("content")),u("data-pc-section","content"),c(2),s("ngTemplateOutlet",e.contentTemplate||e._contentTemplate),c(),s("ngIf",e.footerTemplate||e._footerTemplate)}}function di(t,o){if(t&1){let e=S();d(0,"div",3,0),I("pMotionOnBeforeEnter",function(n){v(e);let a=r();return y(a.onBeforeEnter(n))})("pMotionOnAfterLeave",function(n){v(e);let a=r();return y(a.onAfterLeave(n))})("keydown",function(n){v(e);let a=r();return y(a.onKeyDown(n))}),T(2,Xn,1,1,"ng-container")(3,pi,8,11),m()}if(t&2){let e=r();pe(e.style),f(e.cn(e.cx("root"),e.styleClass)),s("pBind",e.ptm("root"))("pMotion",e.visible)("pMotionAppear",!0)("pMotionEnterActiveClass",e.$enterAnimation())("pMotionLeaveActiveClass",e.$leaveAnimation())("pMotionOptions",e.computedMotionOptions()),u("data-p",e.dataP)("data-p-open",e.visible),c(2),w(e.headlessTemplate||e._headlessTemplate?2:3)}}var mi=`
${At}

/** For PrimeNG **/
.p-drawer {
    position: fixed;
}

.p-drawer-left {
    top: 0;
    left: 0;
    width: 20rem;
    height: 100%;
    border-inline-end-width: 1px;
}

.p-drawer-right {
    top: 0;
    right: 0;
    width: 20rem;
    height: 100%;
    border-inline-start-width: 1px;
}

.p-drawer-top {
    top: 0;
    left: 0;
    width: 100%;
    height: 10rem;
    border-block-end-width: 1px;
}

.p-drawer-bottom {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 10rem;
    border-block-start-width: 1px;
}

.p-drawer-full {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    -webkit-transition: none;
    transition: none;
}

/* Animations */
.p-drawer-enter-left {
    animation: p-animate-drawer-enter-left 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-leave-left {
    animation: p-animate-drawer-leave-left 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-enter-right {
    animation: p-animate-drawer-enter-right 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-leave-right {
    animation: p-animate-drawer-leave-right 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-enter-top {
    animation: p-animate-drawer-enter-top 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-leave-top {
    animation: p-animate-drawer-leave-top 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-enter-bottom {
    animation: p-animate-drawer-enter-bottom 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-leave-bottom {
    animation: p-animate-drawer-leave-bottom 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-enter-full {
    animation: p-animate-drawer-enter-full 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-leave-full {
    animation: p-animate-drawer-leave-full 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}
`,ui={mask:({instance:t})=>["p-drawer-mask",{"p-overlay-mask p-overlay-mask-enter-active":t.modal},{"p-drawer-full":t.fullScreen()}],root:({instance:t})=>["p-drawer p-component",{"p-drawer-full":t.fullScreen(),"p-drawer-open":t.visible},`p-drawer-${t.position()}`],header:"p-drawer-header",title:"p-drawer-title",pcCloseButton:"p-drawer-close-button",content:"p-drawer-content",footer:"p-drawer-footer"},Bt=(()=>{class t extends X{name="drawer";style=mi;classes=ui;static \u0275fac=(()=>{let e;return function(n){return(e||(e=M(t)))(n||t)}})();static \u0275prov=q({token:t,factory:t.\u0275fac})}return t})();var Ot=new K("DRAWER_INSTANCE"),Re=(()=>{class t extends Q{componentName="Drawer";$pcDrawer=g(Ot,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=g(x,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("host"))}appendTo=N(void 0);motionOptions=N(void 0);computedMotionOptions=V(()=>ie(ie({},this.ptm("motion")),this.motionOptions()));blockScroll=!1;style;styleClass;ariaCloseLabel;autoZIndex=!0;baseZIndex=0;modal=!0;closeButtonProps={severity:"secondary",text:!0,rounded:!0};dismissible=!0;showCloseIcon=!0;closeOnEscape=!0;transitionOptions="150ms cubic-bezier(0, 0, 0.2, 1)";get visible(){return this._visible??!1}set visible(e){this._visible=e,this._visible&&!this.modalVisible&&(this.modalVisible=!0)}position=N("left");fullScreen=N(!1);$enterAnimation=V(()=>this.fullScreen()?"p-drawer-enter-full":`p-drawer-enter-${this.position()}`);$leaveAnimation=V(()=>this.fullScreen()?"p-drawer-leave-full":`p-drawer-leave-${this.position()}`);header;maskStyle;closable=!0;onShow=new A;onHide=new A;visibleChange=new A;containerViewChild;closeButtonViewChild;initialized;_visible;_position="left";_fullScreen=!1;modalVisible=!1;container;mask;maskClickListener;documentEscapeListener;animationEndListener;_componentStyle=g(Bt);onAfterViewInit(){this.initialized=!0}headerTemplate;footerTemplate;contentTemplate;closeIconTemplate;headlessTemplate;$appendTo=V(()=>this.appendTo()||this.config.overlayAppendTo());_headerTemplate;_footerTemplate;_contentTemplate;_closeIconTemplate;_headlessTemplate;templates;onAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"content":this._contentTemplate=e.template;break;case"header":this._headerTemplate=e.template;break;case"footer":this._footerTemplate=e.template;break;case"closeicon":this._closeIconTemplate=e.template;break;case"headless":this._headlessTemplate=e.template;break;default:this._contentTemplate=e.template;break}})}onKeyDown(e){e.code==="Escape"&&this.hide(!1)}show(){this.container?.setAttribute(this.$attrSelector,""),this.autoZIndex&&H.set("modal",this.container,this.baseZIndex||this.config.zIndex.modal),this.modal&&this.enableModality(),this.onShow.emit({}),this.visibleChange.emit(!0)}hide(e=!0){e&&this.onHide.emit({}),this.modal&&this.disableModality()}close(e){this.hide(),this.visibleChange.emit(!1),this.cd.markForCheck(),e.preventDefault()}enableModality(){let e=this.document.querySelectorAll('[data-p-open="true"]'),i=e.length,n=i==1?String(parseInt(this.container.style.zIndex)-1):String(parseInt(e[i-1].style.zIndex)-1);if(!this.mask){if(this.mask=this.renderer.createElement("div"),this.mask){let a=`z-index: ${n};${this.getMaskStyle()}`;$(this.mask,"style",a),$(this.mask,"data-p",this.dataP),Le(this.mask,this.cx("mask"))}this.dismissible&&(this.maskClickListener=this.renderer.listen(this.mask,"click",a=>{this.dismissible&&this.close(a)})),this.renderer.appendChild(this.document.body,this.mask),this.blockScroll&&pt()}}getMaskStyle(){return this.maskStyle?Object.entries(this.maskStyle).map(([e,i])=>`${e}: ${i}`).join("; "):""}disableModality(){this.mask&&(!this.$unstyled()&&tt(this.mask,"p-overlay-mask-enter-active"),!this.$unstyled()&&Le(this.mask,"p-overlay-mask-leave-active"),this.animationEndListener=this.renderer.listen(this.mask,"animationend",this.destroyModal.bind(this)))}destroyModal(){this.unbindMaskClickListener(),this.mask&&this.renderer.removeChild(this.document.body,this.mask),this.blockScroll&&dt(),this.unbindAnimationEndListener(),this.mask=null}onBeforeEnter(e){this.container=e.element,this.appendContainer(),this.show(),this.closeOnEscape&&this.bindDocumentEscapeListener()}onAfterLeave(){this.hide(!1),H.clear(this.container),this.unbindGlobalListeners(),this.modalVisible=!1,this.container=null}appendContainer(){this.$appendTo()&&this.$appendTo()!=="self"&&(this.$appendTo()==="body"?je(this.document.body,this.container):je(this.$appendTo(),this.container))}bindDocumentEscapeListener(){let e=this.el?this.el.nativeElement.ownerDocument:this.document;this.documentEscapeListener=this.renderer.listen(e,"keydown",i=>{i.which==27&&parseInt(this.container?.style.zIndex)===H.get(this.container)&&this.close(i)})}unbindDocumentEscapeListener(){this.documentEscapeListener&&(this.documentEscapeListener(),this.documentEscapeListener=null)}unbindMaskClickListener(){this.maskClickListener&&(this.maskClickListener(),this.maskClickListener=null)}unbindGlobalListeners(){this.unbindMaskClickListener(),this.unbindDocumentEscapeListener()}unbindAnimationEndListener(){this.animationEndListener&&this.mask&&(this.animationEndListener(),this.animationEndListener=null)}onDestroy(){this.initialized=!1,this.visible&&this.modal&&this.destroyModal(),this.$appendTo()&&this.container&&this.renderer.appendChild(this.el.nativeElement,this.container),this.container&&this.autoZIndex&&H.clear(this.container),this.container=null,this.unbindGlobalListeners(),this.unbindAnimationEndListener()}get dataP(){return this.cn({"full-screen":this.position()==="full",[this.position()]:this.position(),open:this.visible,modal:this.modal})}static \u0275fac=(()=>{let e;return function(n){return(e||(e=M(t)))(n||t)}})();static \u0275cmp=E({type:t,selectors:[["p-drawer"]],contentQueries:function(i,n,a){if(i&1&&ce(a,Qn,4)(a,Hn,4)(a,qn,4)(a,Gn,4)(a,Kn,4)(a,ue,4),i&2){let l;b(l=C())&&(n.headerTemplate=l.first),b(l=C())&&(n.footerTemplate=l.first),b(l=C())&&(n.contentTemplate=l.first),b(l=C())&&(n.closeIconTemplate=l.first),b(l=C())&&(n.headlessTemplate=l.first),b(l=C())&&(n.templates=l)}},viewQuery:function(i,n){if(i&1&&Ge(Un,5)(Jn,5),i&2){let a;b(a=C())&&(n.containerViewChild=a.first),b(a=C())&&(n.closeButtonViewChild=a.first)}},inputs:{appendTo:[1,"appendTo"],motionOptions:[1,"motionOptions"],blockScroll:[2,"blockScroll","blockScroll",h],style:"style",styleClass:"styleClass",ariaCloseLabel:"ariaCloseLabel",autoZIndex:[2,"autoZIndex","autoZIndex",h],baseZIndex:[2,"baseZIndex","baseZIndex",P],modal:[2,"modal","modal",h],closeButtonProps:"closeButtonProps",dismissible:[2,"dismissible","dismissible",h],showCloseIcon:[2,"showCloseIcon","showCloseIcon",h],closeOnEscape:[2,"closeOnEscape","closeOnEscape",h],transitionOptions:"transitionOptions",visible:"visible",position:[1,"position"],fullScreen:[1,"fullScreen"],header:"header",maskStyle:"maskStyle",closable:[2,"closable","closable",h]},outputs:{onShow:"onShow",onHide:"onHide",visibleChange:"visibleChange"},features:[F([Bt,{provide:Ot,useExisting:t},{provide:ee,useExisting:t}]),J([x]),B],ngContentSelectors:Wn,decls:1,vars:1,consts:[["container",""],["icon",""],["role","complementary","pFocusTrap","",3,"pBind","pMotion","pMotionAppear","pMotionEnterActiveClass","pMotionLeaveActiveClass","pMotionOptions","class","style"],["role","complementary","pFocusTrap","",3,"pMotionOnBeforeEnter","pMotionOnAfterLeave","keydown","pBind","pMotion","pMotionAppear","pMotionEnterActiveClass","pMotionLeaveActiveClass","pMotionOptions"],[4,"ngTemplateOutlet"],[3,"pBind","ngClass"],[3,"pBind","class",4,"ngIf"],[3,"pt","ngClass","buttonProps","ariaLabel","unstyled","onClick","keydown.enter",4,"ngIf"],[4,"ngIf"],[3,"pBind"],[3,"onClick","keydown.enter","pt","ngClass","buttonProps","ariaLabel","unstyled"],["data-p-icon","times",4,"ngIf"],["data-p-icon","times"]],template:function(i,n){i&1&&(re(),T(0,di,4,13,"div",2)),i&2&&w(n.modalVisible?0:-1)},dependencies:[R,W,Y,de,Ee,ke,k,x,_t,ft,Se,Me],encapsulation:2,changeDetection:0})}return t})(),Lt=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=U({type:t});static \u0275inj=G({imports:[Re,k,k]})}return t})();var jt=`
    .p-toast {
        width: dt('toast.width');
        white-space: pre-line;
        word-break: break-word;
    }

    .p-toast-message {
        margin: 0 0 1rem 0;
        display: grid;
        grid-template-rows: 1fr;
    }

    .p-toast-message-icon {
        flex-shrink: 0;
        font-size: dt('toast.icon.size');
        width: dt('toast.icon.size');
        height: dt('toast.icon.size');
    }

    .p-toast-message-content {
        display: flex;
        align-items: flex-start;
        padding: dt('toast.content.padding');
        gap: dt('toast.content.gap');
        min-height: 0;
        overflow: hidden;
        transition: padding 250ms ease-in;
    }

    .p-toast-message-text {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        gap: dt('toast.text.gap');
    }

    .p-toast-summary {
        font-weight: dt('toast.summary.font.weight');
        font-size: dt('toast.summary.font.size');
    }

    .p-toast-detail {
        font-weight: dt('toast.detail.font.weight');
        font-size: dt('toast.detail.font.size');
    }

    .p-toast-close-button {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        cursor: pointer;
        background: transparent;
        transition:
            background dt('toast.transition.duration'),
            color dt('toast.transition.duration'),
            outline-color dt('toast.transition.duration'),
            box-shadow dt('toast.transition.duration');
        outline-color: transparent;
        color: inherit;
        width: dt('toast.close.button.width');
        height: dt('toast.close.button.height');
        border-radius: dt('toast.close.button.border.radius');
        margin: -25% 0 0 0;
        right: -25%;
        padding: 0;
        border: none;
        user-select: none;
    }

    .p-toast-close-button:dir(rtl) {
        margin: -25% 0 0 auto;
        left: -25%;
        right: auto;
    }

    .p-toast-message-info,
    .p-toast-message-success,
    .p-toast-message-warn,
    .p-toast-message-error,
    .p-toast-message-secondary,
    .p-toast-message-contrast {
        border-width: dt('toast.border.width');
        border-style: solid;
        backdrop-filter: blur(dt('toast.blur'));
        border-radius: dt('toast.border.radius');
    }

    .p-toast-close-icon {
        font-size: dt('toast.close.icon.size');
        width: dt('toast.close.icon.size');
        height: dt('toast.close.icon.size');
    }

    .p-toast-close-button:focus-visible {
        outline-width: dt('focus.ring.width');
        outline-style: dt('focus.ring.style');
        outline-offset: dt('focus.ring.offset');
    }

    .p-toast-message-info {
        background: dt('toast.info.background');
        border-color: dt('toast.info.border.color');
        color: dt('toast.info.color');
        box-shadow: dt('toast.info.shadow');
    }

    .p-toast-message-info .p-toast-detail {
        color: dt('toast.info.detail.color');
    }

    .p-toast-message-info .p-toast-close-button:focus-visible {
        outline-color: dt('toast.info.close.button.focus.ring.color');
        box-shadow: dt('toast.info.close.button.focus.ring.shadow');
    }

    .p-toast-message-info .p-toast-close-button:hover {
        background: dt('toast.info.close.button.hover.background');
    }

    .p-toast-message-success {
        background: dt('toast.success.background');
        border-color: dt('toast.success.border.color');
        color: dt('toast.success.color');
        box-shadow: dt('toast.success.shadow');
    }

    .p-toast-message-success .p-toast-detail {
        color: dt('toast.success.detail.color');
    }

    .p-toast-message-success .p-toast-close-button:focus-visible {
        outline-color: dt('toast.success.close.button.focus.ring.color');
        box-shadow: dt('toast.success.close.button.focus.ring.shadow');
    }

    .p-toast-message-success .p-toast-close-button:hover {
        background: dt('toast.success.close.button.hover.background');
    }

    .p-toast-message-warn {
        background: dt('toast.warn.background');
        border-color: dt('toast.warn.border.color');
        color: dt('toast.warn.color');
        box-shadow: dt('toast.warn.shadow');
    }

    .p-toast-message-warn .p-toast-detail {
        color: dt('toast.warn.detail.color');
    }

    .p-toast-message-warn .p-toast-close-button:focus-visible {
        outline-color: dt('toast.warn.close.button.focus.ring.color');
        box-shadow: dt('toast.warn.close.button.focus.ring.shadow');
    }

    .p-toast-message-warn .p-toast-close-button:hover {
        background: dt('toast.warn.close.button.hover.background');
    }

    .p-toast-message-error {
        background: dt('toast.error.background');
        border-color: dt('toast.error.border.color');
        color: dt('toast.error.color');
        box-shadow: dt('toast.error.shadow');
    }

    .p-toast-message-error .p-toast-detail {
        color: dt('toast.error.detail.color');
    }

    .p-toast-message-error .p-toast-close-button:focus-visible {
        outline-color: dt('toast.error.close.button.focus.ring.color');
        box-shadow: dt('toast.error.close.button.focus.ring.shadow');
    }

    .p-toast-message-error .p-toast-close-button:hover {
        background: dt('toast.error.close.button.hover.background');
    }

    .p-toast-message-secondary {
        background: dt('toast.secondary.background');
        border-color: dt('toast.secondary.border.color');
        color: dt('toast.secondary.color');
        box-shadow: dt('toast.secondary.shadow');
    }

    .p-toast-message-secondary .p-toast-detail {
        color: dt('toast.secondary.detail.color');
    }

    .p-toast-message-secondary .p-toast-close-button:focus-visible {
        outline-color: dt('toast.secondary.close.button.focus.ring.color');
        box-shadow: dt('toast.secondary.close.button.focus.ring.shadow');
    }

    .p-toast-message-secondary .p-toast-close-button:hover {
        background: dt('toast.secondary.close.button.hover.background');
    }

    .p-toast-message-contrast {
        background: dt('toast.contrast.background');
        border-color: dt('toast.contrast.border.color');
        color: dt('toast.contrast.color');
        box-shadow: dt('toast.contrast.shadow');
    }
    
    .p-toast-message-contrast .p-toast-detail {
        color: dt('toast.contrast.detail.color');
    }

    .p-toast-message-contrast .p-toast-close-button:focus-visible {
        outline-color: dt('toast.contrast.close.button.focus.ring.color');
        box-shadow: dt('toast.contrast.close.button.focus.ring.shadow');
    }

    .p-toast-message-contrast .p-toast-close-button:hover {
        background: dt('toast.contrast.close.button.hover.background');
    }

    .p-toast-top-center {
        transform: translateX(-50%);
    }

    .p-toast-bottom-center {
        transform: translateX(-50%);
    }

    .p-toast-center {
        min-width: 20vw;
        transform: translate(-50%, -50%);
    }

    .p-toast-message-enter-active {
        animation: p-animate-toast-enter 300ms ease-out;
    }

    .p-toast-message-leave-active {
        animation: p-animate-toast-leave 250ms ease-in;
    }

    .p-toast-message-leave-to .p-toast-message-content {
        padding-top: 0;
        padding-bottom: 0;
    }

    @keyframes p-animate-toast-enter {
        from {
            opacity: 0;
            transform: scale(0.6);
        }
        to {
            opacity: 1;
            grid-template-rows: 1fr;
        }
    }

     @keyframes p-animate-toast-leave {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
            margin-bottom: 0;
            grid-template-rows: 0fr;
            transform: translateY(-100%) scale(0.6);
        }
    }
`;var _i=(t,o)=>({$implicit:t,closeFn:o}),gi=t=>({$implicit:t});function hi(t,o){t&1&&O(0)}function bi(t,o){if(t&1&&p(0,hi,1,0,"ng-container",3),t&2){let e=r();s("ngTemplateOutlet",e.headlessTemplate)("ngTemplateOutletContext",Ke(2,_i,e.message,e.onCloseIconClick))}}function Ci(t,o){if(t&1&&_(0,"span",4),t&2){let e=r(3);f(e.cn(e.cx("messageIcon"),e.message==null?null:e.message.icon)),s("pBind",e.ptm("messageIcon"))}}function vi(t,o){if(t&1&&(D(),_(0,"svg",11)),t&2){let e=r(4);f(e.cx("messageIcon")),s("pBind",e.ptm("messageIcon")),u("aria-hidden",!0)}}function yi(t,o){if(t&1&&(D(),_(0,"svg",12)),t&2){let e=r(4);f(e.cx("messageIcon")),s("pBind",e.ptm("messageIcon")),u("aria-hidden",!0)}}function xi(t,o){if(t&1&&(D(),_(0,"svg",13)),t&2){let e=r(4);f(e.cx("messageIcon")),s("pBind",e.ptm("messageIcon")),u("aria-hidden",!0)}}function Ti(t,o){if(t&1&&(D(),_(0,"svg",14)),t&2){let e=r(4);f(e.cx("messageIcon")),s("pBind",e.ptm("messageIcon")),u("aria-hidden",!0)}}function wi(t,o){if(t&1&&(D(),_(0,"svg",12)),t&2){let e=r(4);f(e.cx("messageIcon")),s("pBind",e.ptm("messageIcon")),u("aria-hidden",!0)}}function Ii(t,o){if(t&1&&T(0,vi,1,4,":svg:svg",7)(1,yi,1,4,":svg:svg",8)(2,xi,1,4,":svg:svg",9)(3,Ti,1,4,":svg:svg",10)(4,wi,1,4,":svg:svg",8),t&2){let e,i=r(3);w((e=i.message.severity)==="success"?0:e==="info"?1:e==="error"?2:e==="warn"?3:4)}}function ki(t,o){if(t&1&&(ve(0),T(1,Ci,1,3,"span",2)(2,Ii,5,1),d(3,"div",6)(4,"div",6),L(5),m(),d(6,"div",6),L(7),m()(),ye()),t&2){let e=r(2);c(),w(e.message.icon?1:2),c(2),s("pBind",e.ptm("messageText"))("ngClass",e.cx("messageText")),u("data-p",e.dataP),c(),s("pBind",e.ptm("summary"))("ngClass",e.cx("summary")),u("data-p",e.dataP),c(),Te(" ",e.message.summary," "),c(),s("pBind",e.ptm("detail"))("ngClass",e.cx("detail")),u("data-p",e.dataP),c(),z(e.message.detail)}}function Ei(t,o){t&1&&O(0)}function Mi(t,o){if(t&1&&_(0,"span",4),t&2){let e=r(4);f(e.cn(e.cx("closeIcon"),e.message==null?null:e.message.closeIcon)),s("pBind",e.ptm("closeIcon"))}}function Si(t,o){if(t&1&&p(0,Mi,1,3,"span",17),t&2){let e=r(3);s("ngIf",e.message.closeIcon)}}function Di(t,o){if(t&1&&(D(),_(0,"svg",18)),t&2){let e=r(3);f(e.cx("closeIcon")),s("pBind",e.ptm("closeIcon")),u("aria-hidden",!0)}}function Ai(t,o){if(t&1){let e=S();d(0,"div")(1,"button",15),I("click",function(n){v(e);let a=r(2);return y(a.onCloseIconClick(n))})("keydown.enter",function(n){v(e);let a=r(2);return y(a.onCloseIconClick(n))}),T(2,Si,1,1,"span",2)(3,Di,1,4,":svg:svg",16),m()()}if(t&2){let e=r(2);c(),s("pBind",e.ptm("closeButton")),u("class",e.cx("closeButton"))("aria-label",e.closeAriaLabel)("data-p",e.dataP),c(),w(e.message.closeIcon?2:3)}}function Bi(t,o){if(t&1&&(d(0,"div",4),p(1,ki,8,12,"ng-container",5)(2,Ei,1,0,"ng-container",3),T(3,Ai,4,5,"div"),m()),t&2){let e=r();f(e.cn(e.cx("messageContent"),e.message==null?null:e.message.contentStyleClass)),s("pBind",e.ptm("messageContent")),c(),s("ngIf",!e.template),c(),s("ngTemplateOutlet",e.template)("ngTemplateOutletContext",we(7,gi,e.message)),c(),w((e.message==null?null:e.message.closable)!==!1?3:-1)}}var Oi=["message"],Li=["headless"];function ji(t,o){if(t&1){let e=S();d(0,"p-toastItem",1),I("onClose",function(n){v(e);let a=r();return y(a.onMessageClose(n))})("onAnimationEnd",function(){v(e);let n=r();return y(n.onAnimationEnd())})("onAnimationStart",function(){v(e);let n=r();return y(n.onAnimationStart())}),m()}if(t&2){let e=o.$implicit,i=o.index,n=r();s("message",e)("index",i)("life",n.life)("clearAll",n.clearAllTrigger())("template",n.template||n._template)("headlessTemplate",n.headlessTemplate||n._headlessTemplate)("pt",n.pt)("unstyled",n.unstyled())("motionOptions",n.computedMotionOptions())}}var Vi={root:({instance:t})=>{let{_position:o}=t;return{position:"fixed",top:o==="top-right"||o==="top-left"||o==="top-center"?"20px":o==="center"?"50%":null,right:(o==="top-right"||o==="bottom-right")&&"20px",bottom:(o==="bottom-left"||o==="bottom-right"||o==="bottom-center")&&"20px",left:o==="top-left"||o==="bottom-left"?"20px":o==="center"||o==="top-center"||o==="bottom-center"?"50%":null}}},Ni={root:({instance:t})=>["p-toast p-component",`p-toast-${t._position}`],message:({instance:t})=>({"p-toast-message":!0,"p-toast-message-info":t.message.severity==="info"||t.message.severity===void 0,"p-toast-message-warn":t.message.severity==="warn","p-toast-message-error":t.message.severity==="error","p-toast-message-success":t.message.severity==="success","p-toast-message-secondary":t.message.severity==="secondary","p-toast-message-contrast":t.message.severity==="contrast"}),messageContent:"p-toast-message-content",messageIcon:({instance:t})=>({"p-toast-message-icon":!0,[`pi ${t.message.icon}`]:!!t.message.icon}),messageText:"p-toast-message-text",summary:"p-toast-summary",detail:"p-toast-detail",closeButton:"p-toast-close-button",closeIcon:({instance:t})=>({"p-toast-close-icon":!0,[`pi ${t.message.closeIcon}`]:!!t.message.closeIcon})},De=(()=>{class t extends X{name="toast";style=jt;classes=Ni;inlineStyles=Vi;static \u0275fac=(()=>{let e;return function(n){return(e||(e=M(t)))(n||t)}})();static \u0275prov=q({token:t,factory:t.\u0275fac})}return t})();var Vt=new K("TOAST_INSTANCE"),zi=(()=>{class t extends Q{zone;message;index;life;template;headlessTemplate;showTransformOptions;hideTransformOptions;showTransitionOptions;hideTransitionOptions;motionOptions=N();clearAll=N(null);onAnimationStart=Oe();onAnimationEnd=Oe();onBeforeEnter(e){this.onAnimationStart.emit(e.element)}onAfterLeave(e){!this.visible()&&!this.isDestroyed&&(this.onClose.emit({index:this.index,message:this.message}),this.isDestroyed||this.onAnimationEnd.emit(e.element))}onClose=new A;_componentStyle=g(De);timeout;visible=_e(void 0);isDestroyed=!1;isClosing=!1;constructor(e){super(),this.zone=e,Qe(()=>{this.clearAll()&&this.visible.set(!1)})}onAfterViewInit(){this.message?.sticky&&this.visible.set(!0),this.initTimeout()}initTimeout(){this.message?.sticky||(this.clearTimeout(),this.zone.runOutsideAngular(()=>{this.visible.set(!0),this.timeout=setTimeout(()=>{this.visible.set(!1)},this.message?.life||this.life||3e3)}))}clearTimeout(){this.timeout&&(clearTimeout(this.timeout),this.timeout=null)}onMouseEnter(){this.clearTimeout()}onMouseLeave(){this.isClosing||this.initTimeout()}onCloseIconClick=e=>{this.isClosing=!0,this.clearTimeout(),this.visible.set(!1),e.preventDefault()};get closeAriaLabel(){return this.config.translation.aria?this.config.translation.aria.close:void 0}onDestroy(){this.isDestroyed=!0,this.clearTimeout(),this.visible.set(!1)}get dataP(){return this.cn({[this.message?.severity]:this.message?.severity})}static \u0275fac=function(i){return new(i||t)(ge(Ce))};static \u0275cmp=E({type:t,selectors:[["p-toastItem"]],inputs:{message:"message",index:[2,"index","index",P],life:[2,"life","life",P],template:"template",headlessTemplate:"headlessTemplate",showTransformOptions:"showTransformOptions",hideTransformOptions:"hideTransformOptions",showTransitionOptions:"showTransitionOptions",hideTransitionOptions:"hideTransitionOptions",motionOptions:[1,"motionOptions"],clearAll:[1,"clearAll"]},outputs:{onAnimationStart:"onAnimationStart",onAnimationEnd:"onAnimationEnd",onClose:"onClose"},features:[F([De]),B],decls:4,vars:10,consts:[["container",""],["role","alert","aria-live","assertive","aria-atomic","true",3,"pMotionOnBeforeEnter","pMotionOnAfterLeave","mouseenter","mouseleave","pMotion","pMotionAppear","pMotionName","pMotionOptions","pBind"],[3,"pBind","class"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[3,"pBind"],[4,"ngIf"],[3,"pBind","ngClass"],["data-p-icon","check",3,"pBind","class"],["data-p-icon","info-circle",3,"pBind","class"],["data-p-icon","times-circle",3,"pBind","class"],["data-p-icon","exclamation-triangle",3,"pBind","class"],["data-p-icon","check",3,"pBind"],["data-p-icon","info-circle",3,"pBind"],["data-p-icon","times-circle",3,"pBind"],["data-p-icon","exclamation-triangle",3,"pBind"],["type","button","autofocus","",3,"click","keydown.enter","pBind"],["data-p-icon","times",3,"pBind","class"],[3,"pBind","class",4,"ngIf"],["data-p-icon","times",3,"pBind"]],template:function(i,n){i&1&&(d(0,"div",1,0),I("pMotionOnBeforeEnter",function(l){return n.onBeforeEnter(l)})("pMotionOnAfterLeave",function(l){return n.onAfterLeave(l)})("mouseenter",function(){return n.onMouseEnter()})("mouseleave",function(){return n.onMouseLeave()}),T(2,bi,1,5,"ng-container")(3,Bi,4,9,"div",2),m()),i&2&&(f(n.cn(n.cx("message"),n.message==null?null:n.message.styleClass)),s("pMotion",n.visible())("pMotionAppear",!0)("pMotionName","p-toast-message")("pMotionOptions",n.motionOptions())("pBind",n.ptm("message")),u("id",n.message==null?null:n.message.id)("data-p",n.dataP),c(2),w(n.headlessTemplate?2:3))},dependencies:[R,W,Y,de,mt,It,kt,ke,ut,k,x,Se,Me],encapsulation:2,changeDetection:0})}return t})(),$e=(()=>{class t extends Q{componentName="Toast";$pcToast=g(Vt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=g(x,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}key;autoZIndex=!0;baseZIndex=0;life=3e3;styleClass;get position(){return this._position}set position(e){this._position=e,this.cd.markForCheck()}preventOpenDuplicates=!1;preventDuplicates=!1;showTransformOptions="translateY(100%)";hideTransformOptions="translateY(-100%)";showTransitionOptions="300ms ease-out";hideTransitionOptions="250ms ease-in";motionOptions=N(void 0);computedMotionOptions=V(()=>ie(ie({},this.ptm("motion")),this.motionOptions()));breakpoints;onClose=new A;template;headlessTemplate;messageSubscription;clearSubscription;messages;messagesArchieve;_position="top-right";messageService=g(ot);_componentStyle=g(De);styleElement;id=Z("pn_id_");templates;clearAllTrigger=_e(null);constructor(){super()}onInit(){this.messageSubscription=this.messageService.messageObserver.subscribe(e=>{if(e)if(Array.isArray(e)){let i=e.filter(n=>this.canAdd(n));this.add(i)}else this.canAdd(e)&&this.add([e])}),this.clearSubscription=this.messageService.clearObserver.subscribe(e=>{e?this.key===e&&this.clearAll():this.clearAll(),this.cd.markForCheck()})}clearAll(){this.clearAllTrigger.set({})}_template;_headlessTemplate;onAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"message":this._template=e.template;break;case"headless":this._headlessTemplate=e.template;break;default:this._template=e.template;break}})}onAfterViewInit(){this.breakpoints&&this.createStyle()}add(e){this.messages=this.messages?[...this.messages,...e]:[...e],this.preventDuplicates&&(this.messagesArchieve=this.messagesArchieve?[...this.messagesArchieve,...e]:[...e]),this.cd.markForCheck()}canAdd(e){let i=this.key===e.key;return i&&this.preventOpenDuplicates&&(i=!this.containsMessage(this.messages,e)),i&&this.preventDuplicates&&(i=!this.containsMessage(this.messagesArchieve,e)),i}containsMessage(e,i){return e?e.find(n=>n.summary===i.summary&&n.detail==i.detail&&n.severity===i.severity)!=null:!1}onMessageClose(e){this.messages?.splice(e.index,1),this.onClose.emit({message:e.message}),this.onAnimationEnd(),this.cd.detectChanges()}onAnimationStart(){this.renderer.setAttribute(this.el?.nativeElement,this.id,""),this.autoZIndex&&this.el?.nativeElement.style.zIndex===""&&H.set("modal",this.el?.nativeElement,this.baseZIndex||this.config.zIndex.modal)}onAnimationEnd(){this.autoZIndex&&nt(this.messages)&&H.clear(this.el?.nativeElement)}createStyle(){if(!this.styleElement){this.styleElement=this.renderer.createElement("style"),this.styleElement.type="text/css",$(this.styleElement,"nonce",this.config?.csp()?.nonce),this.renderer.appendChild(this.document.head,this.styleElement);let e="";for(let i in this.breakpoints){let n="";for(let a in this.breakpoints[i])n+=a+":"+this.breakpoints[i][a]+" !important;";e+=`
                    @media screen and (max-width: ${i}) {
                        .p-toast[${this.id}] {
                           ${n}
                        }
                    }
                `}this.renderer.setProperty(this.styleElement,"innerHTML",e),$(this.styleElement,"nonce",this.config?.csp()?.nonce)}}destroyStyle(){this.styleElement&&(this.renderer.removeChild(this.document.head,this.styleElement),this.styleElement=null)}onDestroy(){this.messageSubscription&&this.messageSubscription.unsubscribe(),this.el&&this.autoZIndex&&H.clear(this.el.nativeElement),this.clearSubscription&&this.clearSubscription.unsubscribe(),this.destroyStyle()}get dataP(){return this.cn({[this.position]:this.position})}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=E({type:t,selectors:[["p-toast"]],contentQueries:function(i,n,a){if(i&1&&ce(a,Oi,5)(a,Li,5)(a,ue,4),i&2){let l;b(l=C())&&(n.template=l.first),b(l=C())&&(n.headlessTemplate=l.first),b(l=C())&&(n.templates=l)}},hostVars:5,hostBindings:function(i,n){i&2&&(u("data-p",n.dataP),pe(n.sx("root")),f(n.cn(n.cx("root"),n.styleClass)))},inputs:{key:"key",autoZIndex:[2,"autoZIndex","autoZIndex",h],baseZIndex:[2,"baseZIndex","baseZIndex",P],life:[2,"life","life",P],styleClass:"styleClass",position:"position",preventOpenDuplicates:[2,"preventOpenDuplicates","preventOpenDuplicates",h],preventDuplicates:[2,"preventDuplicates","preventDuplicates",h],showTransformOptions:"showTransformOptions",hideTransformOptions:"hideTransformOptions",showTransitionOptions:"showTransitionOptions",hideTransitionOptions:"hideTransitionOptions",motionOptions:[1,"motionOptions"],breakpoints:"breakpoints"},outputs:{onClose:"onClose"},features:[F([De,{provide:Vt,useExisting:t},{provide:ee,useExisting:t}]),J([x]),B],decls:1,vars:1,consts:[[3,"message","index","life","clearAll","template","headlessTemplate","pt","unstyled","motionOptions","onClose","onAnimationEnd","onAnimationStart",4,"ngFor","ngForOf"],[3,"onClose","onAnimationEnd","onAnimationStart","message","index","life","clearAll","template","headlessTemplate","pt","unstyled","motionOptions"]],template:function(i,n){i&1&&p(0,ji,1,9,"p-toastItem",0),i&2&&s("ngForOf",n.messages)},dependencies:[R,Je,zi,k],encapsulation:2,changeDetection:0})}return t})(),Nt=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=U({type:t});static \u0275inj=G({imports:[$e,k,k]})}return t})();var zt=(t,o)=>o.path;function Pi(t,o){if(t&1&&(d(0,"a",14),_(1,"i"),d(2,"span"),L(3),te(4,"translate"),m()()),t&2){let e=o.$implicit;s("routerLink",e.path),c(),f(e.icon),c(2),z(ne(4,4,e.labelKey))}}function Ri(t,o){if(t&1){let e=S();d(0,"a",20),I("click",function(){v(e);let n=r();return y(n.closeMobileSidebar())}),_(1,"i"),d(2,"span"),L(3),te(4,"translate"),m()()}if(t&2){let e=o.$implicit;s("routerLink",e.path),c(),f(e.icon),c(2),z(ne(4,4,e.labelKey))}}var $i=[{path:"/app/dashboard",icon:"pi pi-chart-line",labelKey:"shell.nav.dashboard"},{path:"/app/transactions",icon:"pi pi-list",labelKey:"shell.nav.transactions"},{path:"/app/budgets",icon:"pi pi-wallet",labelKey:"shell.nav.budgets"},{path:"/app/categories",icon:"pi pi-tag",labelKey:"shell.nav.categories"},{path:"/app/settings",icon:"pi pi-cog",labelKey:"shell.nav.settings"}],Ft=class t{auth=g(ct);router=g(Ye);lang=g(Ct);prefs=g(vt);translate=g(st);user=this.auth.user;navItems=$i;mobileSidebarOpen=_e(!1);userInitial=V(()=>{let o=this.user()?.email;return o?o[0].toUpperCase():"?"});userMenuItems=V(()=>{let o=this.lang.current(),e=a=>this.translate.instant(a),i=a=>`<img src="/flags/${a}.svg" alt="" class="inline-block h-4 w-auto mr-2 align-middle" />`,n=(a,l)=>`<span class="${o===a?"font-semibold text-primary-600":""}">${i(a)}${l}</span>`;return[{label:this.user()?.email??"",items:[{label:n("es","Espa\xF1ol"),escape:!1,command:()=>{this.lang.setLanguage("es")}},{label:n("en","English"),escape:!1,command:()=>{this.lang.setLanguage("en")}},{separator:!0},{label:this.prefs.isDark()?e("shell.userMenu.lightMode"):e("shell.userMenu.darkMode"),icon:this.prefs.isDark()?"pi pi-sun":"pi pi-moon",command:()=>this.prefs.toggleTheme()},{separator:!0},{label:e("shell.userMenu.signOut"),icon:"pi pi-sign-out",command:()=>{this.signOut()}}]}]});toggleMobileSidebar(){this.mobileSidebarOpen.update(o=>!o)}closeMobileSidebar(){this.mobileSidebarOpen.set(!1)}setLanguage(o){this.lang.setLanguage(o)}async signOut(){await this.auth.signOut(),await this.router.navigateByUrl("/auth/login")}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=E({type:t,selectors:[["app-layout"]],decls:31,vars:18,consts:[["userMenu",""],[1,"min-h-screen","flex","flex-col","bg-surface-50","dark:bg-surface-950"],[1,"flex","items-center","justify-between","px-4","h-14","bg-primary-500","dark:bg-primary-900","shadow-md"],[1,"flex","items-center","gap-3"],["type","button","data-testid","mobile-menu-trigger",1,"md:hidden","p-2","rounded","hover:bg-white/10",3,"click"],[1,"pi","pi-bars","text-xl","text-white"],["routerLink","/app/dashboard",1,"flex","items-center","gap-2","no-underline"],[1,"flex","items-center","justify-center","w-8","h-8","rounded-lg","font-black","text-base",2,"background-color","var(--exes-gold)","color","#003399"],[1,"text-xl","font-bold","text-white","tracking-wide"],["type","button","data-testid","user-menu-trigger",1,"flex","items-center","gap-2","p-1","rounded","hover:bg-white/10",3,"click"],["shape","circle",3,"label"],["appendTo","body",3,"model","popup"],[1,"flex","flex-1","overflow-hidden"],["data-testid","sidebar-desktop",1,"hidden","md:flex","flex-col","w-60","border-r","border-surface-200","dark:border-surface-800","bg-white","dark:bg-surface-900","p-3","gap-1"],["routerLinkActive","bg-primary-50 text-primary-600 font-semibold dark:bg-primary-950 dark:text-primary-300",1,"flex","items-center","gap-3","px-3","py-2","rounded-lg","text-surface-700","dark:text-surface-300","hover:bg-surface-100","dark:hover:bg-surface-800","transition-colors",3,"routerLink"],["position","left","styleClass","w-72",3,"visibleChange","visible","modal","showCloseIcon","header"],[1,"flex","flex-col","gap-1"],["routerLinkActive","bg-primary-50 text-primary-600 font-semibold",1,"flex","items-center","gap-3","px-3","py-2","rounded-lg","text-surface-700","hover:bg-surface-100","transition-colors",3,"routerLink"],[1,"flex-1","overflow-y-auto","p-4","md:p-6"],["position","bottom-right"],["routerLinkActive","bg-primary-50 text-primary-600 font-semibold",1,"flex","items-center","gap-3","px-3","py-2","rounded-lg","text-surface-700","hover:bg-surface-100","transition-colors",3,"click","routerLink"]],template:function(e,i){if(e&1){let n=S();d(0,"div",1)(1,"header",2)(2,"div",3)(3,"button",4),te(4,"translate"),I("click",function(){return i.toggleMobileSidebar()}),_(5,"i",5),m(),d(6,"a",6)(7,"span",7),L(8,"\u20AC"),m(),d(9,"span",8),L(10),te(11,"translate"),m()()(),d(12,"div")(13,"button",9),te(14,"translate"),I("click",function(l){v(n);let Ze=he(17);return y(Ze.toggle(l))}),_(15,"p-avatar",10),m(),_(16,"p-menu",11,0),m()(),d(18,"div",12)(19,"aside",13),Ae(20,Pi,5,6,"a",14,zt),m(),d(22,"p-drawer",15),te(23,"translate"),I("visibleChange",function(l){return i.mobileSidebarOpen.set(l)}),d(24,"div",16),Ae(25,Ri,5,6,"a",17,zt),m()(),d(27,"main",18),_(28,"router-outlet"),m()(),_(29,"p-toast",19)(30,"p-confirmdialog"),m()}e&2&&(c(3),u("aria-label",ne(4,10,"shell.openMenu")),c(7),Te(" ",ne(11,12,"app.title")," "),c(3),u("aria-label",ne(14,14,"shell.userMenu.label")),c(2),s("label",i.userInitial()),c(),s("model",i.userMenuItems())("popup",!0),c(4),Be(i.navItems),c(2),s("visible",i.mobileSidebarOpen())("modal",!0)("showCloseIcon",!0)("header",ne(23,16,"app.title")),c(3),Be(i.navItems))},dependencies:[We,Xe,et,lt,wt,Fe,Dt,Pe,Lt,Re,bt,ht,Nt,$e,rt],encapsulation:2,changeDetection:0})};export{Ft as AppLayout};
