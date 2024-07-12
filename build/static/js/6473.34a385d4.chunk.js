"use strict";(self.webpackChunkdemoecomm=self.webpackChunkdemoecomm||[]).push([[6473],{4235:(e,n,t)=>{t.d(n,{A:()=>u});var r=t(8168),o=t(5043);const i={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z"}}]},name:"ellipsis",theme:"outlined"};var l=t(2172),a=function(e,n){return o.createElement(l.A,(0,r.A)({},e,{ref:n,icon:i}))};const u=o.forwardRef(a)},5822:(e,n,t)=>{t.d(n,{A:()=>E});var r=t(8168),o=t(4467),i=t(5544),l=t(45),a=t(4106),u=t(8139),c=t.n(u),s=t(3758),f=t(5043),d=t(5001),v=t(5818),p=d.A.ESC,m=d.A.TAB;const A=(0,f.forwardRef)((function(e,n){var t=e.overlay,r=e.arrow,o=e.prefixCls,i=(0,f.useMemo)((function(){return"function"===typeof t?t():t}),[t]),l=(0,s.K4)(n,null===i||void 0===i?void 0:i.ref);return f.createElement(f.Fragment,null,r&&f.createElement("div",{className:"".concat(o,"-arrow")}),f.cloneElement(i,{ref:(0,s.f3)(i)?l:void 0}))}));var y={adjustX:1,adjustY:1},b=[0,0];const h={topLeft:{points:["bl","tl"],overflow:y,offset:[0,-4],targetOffset:b},top:{points:["bc","tc"],overflow:y,offset:[0,-4],targetOffset:b},topRight:{points:["br","tr"],overflow:y,offset:[0,-4],targetOffset:b},bottomLeft:{points:["tl","bl"],overflow:y,offset:[0,4],targetOffset:b},bottom:{points:["tc","bc"],overflow:y,offset:[0,4],targetOffset:b},bottomRight:{points:["tr","br"],overflow:y,offset:[0,4],targetOffset:b}};var g=["arrow","prefixCls","transitionName","animation","align","placement","placements","getPopupContainer","showAction","hideAction","overlayClassName","overlayStyle","visible","trigger","autoFocus","overlay","children","onVisibleChange"];function C(e,n){var t,u=e.arrow,d=void 0!==u&&u,y=e.prefixCls,b=void 0===y?"rc-dropdown":y,C=e.transitionName,E=e.animation,w=e.align,k=e.placement,R=void 0===k?"bottomLeft":k,M=e.placements,S=void 0===M?h:M,x=e.getPopupContainer,N=e.showAction,I=e.hideAction,P=e.overlayClassName,K=e.overlayStyle,O=e.visible,T=e.trigger,D=void 0===T?["hover"]:T,L=e.autoFocus,_=e.overlay,V=e.children,z=e.onVisibleChange,F=(0,l.A)(e,g),j=f.useState(),B=(0,i.A)(j,2),W=B[0],H=B[1],q="visible"in e?O:W,G=f.useRef(null),U=f.useRef(null),X=f.useRef(null);f.useImperativeHandle(n,(function(){return G.current}));var Y=function(e){H(e),null===z||void 0===z||z(e)};!function(e){var n=e.visible,t=e.triggerRef,r=e.onVisibleChange,o=e.autoFocus,i=e.overlayRef,l=f.useRef(!1),a=function(){var e,o;n&&(null===(e=t.current)||void 0===e||null===(o=e.focus)||void 0===o||o.call(e),null===r||void 0===r||r(!1))},u=function(){var e;return!(null===(e=i.current)||void 0===e||!e.focus)&&(i.current.focus(),l.current=!0,!0)},c=function(e){switch(e.keyCode){case p:a();break;case m:var n=!1;l.current||(n=u()),n?e.preventDefault():a()}};f.useEffect((function(){return n?(window.addEventListener("keydown",c),o&&(0,v.A)(u,3),function(){window.removeEventListener("keydown",c),l.current=!1}):function(){l.current=!1}}),[n])}({visible:q,triggerRef:X,onVisibleChange:Y,autoFocus:L,overlayRef:U});var J=function(){return f.createElement(A,{ref:U,overlay:_,prefixCls:b,arrow:d})},Q=f.cloneElement(V,{className:c()(null===(t=V.props)||void 0===t?void 0:t.className,q&&function(){var n=e.openClassName;return void 0!==n?n:"".concat(b,"-open")}()),ref:(0,s.f3)(V)?(0,s.K4)(X,V.ref):void 0}),Z=I;return Z||-1===D.indexOf("contextMenu")||(Z=["click"]),f.createElement(a.A,(0,r.A)({builtinPlacements:S},F,{prefixCls:b,ref:G,popupClassName:c()(P,(0,o.A)({},"".concat(b,"-show-arrow"),d)),popupStyle:K,action:D,showAction:N,hideAction:Z,popupPlacement:R,popupAlign:w,popupTransitionName:C,popupAnimation:E,popupVisible:q,stretch:function(){var n=e.minOverlayWidthMatchTrigger,t=e.alignPoint;return"minOverlayWidthMatchTrigger"in e?n:!t}()?"minWidth":"",popup:"function"===typeof _?J:J(),onPopupVisibleChange:Y,onPopupClick:function(n){var t=e.onOverlayClick;H(!1),t&&t(n)},getPopupContainer:x}),Q)}const E=f.forwardRef(C)},244:(e,n,t)=>{t.d(n,{cG:()=>Fe,q7:()=>he,te:()=>We,Dr:()=>he,g8:()=>Ve,Ay:()=>Je,Wj:()=>x});var r=t(8168),o=t(4467),i=t(9379),l=t(436),a=t(5544),u=t(45),c=t(8139),s=t.n(c),f=t(9944),d=t(8678),v=t(2231),p=t(7907),m=t(5043),A=t(7950),y=m.createContext(null);function b(e,n){return void 0===e?null:"".concat(e,"-").concat(n)}function h(e){return b(m.useContext(y),e)}var g=t(3709),C=["children","locked"],E=m.createContext(null);function w(e){var n=e.children,t=e.locked,r=(0,u.A)(e,C),o=m.useContext(E),l=(0,g.A)((function(){return function(e,n){var t=(0,i.A)({},e);return Object.keys(n).forEach((function(e){var r=n[e];void 0!==r&&(t[e]=r)})),t}(o,r)}),[o,r],(function(e,n){return!t&&(e[0]!==n[0]||!(0,v.A)(e[1],n[1],!0))}));return m.createElement(E.Provider,{value:l},n)}var k=[],R=m.createContext(null);function M(){return m.useContext(R)}var S=m.createContext(k);function x(e){var n=m.useContext(S);return m.useMemo((function(){return void 0!==e?[].concat((0,l.A)(n),[e]):n}),[n,e])}var N=m.createContext(null);const I=m.createContext({});var P=t(6590);function K(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if((0,P.A)(e)){var t=e.nodeName.toLowerCase(),r=["input","select","textarea","button"].includes(t)||e.isContentEditable||"a"===t&&!!e.getAttribute("href"),o=e.getAttribute("tabindex"),i=Number(o),l=null;return o&&!Number.isNaN(i)?l=i:r&&null===l&&(l=0),r&&e.disabled&&(l=null),null!==l&&(l>=0||n&&l<0)}return!1}function O(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],t=(0,l.A)(e.querySelectorAll("*")).filter((function(e){return K(e,n)}));return K(e,n)&&t.unshift(e),t}var T=t(5001),D=t(5818),L=T.A.LEFT,_=T.A.RIGHT,V=T.A.UP,z=T.A.DOWN,F=T.A.ENTER,j=T.A.ESC,B=T.A.HOME,W=T.A.END,H=[V,z,L,_];function q(e,n){return O(e,!0).filter((function(e){return n.has(e)}))}function G(e,n,t){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1;if(!e)return null;var o=q(e,n),i=o.length,l=o.findIndex((function(e){return t===e}));return r<0?-1===l?l=i-1:l-=1:r>0&&(l+=1),o[l=(l+i)%i]}var U=function(e,n){var t=new Set,r=new Map,o=new Map;return e.forEach((function(e){var i=document.querySelector("[data-menu-id='".concat(b(n,e),"']"));i&&(t.add(i),o.set(i,e),r.set(e,i))})),{elements:t,key2element:r,element2key:o}};function X(e,n,t,r,i,l,a,u,c,s){var f=m.useRef(),d=m.useRef();d.current=n;var v=function(){D.A.cancel(f.current)};return m.useEffect((function(){return function(){v()}}),[]),function(p){var m=p.which;if([].concat(H,[F,j,B,W]).includes(m)){var A=l(),y=U(A,r),b=y,h=b.elements,g=b.key2element,C=b.element2key,E=function(e,n){for(var t=e||document.activeElement;t;){if(n.has(t))return t;t=t.parentElement}return null}(g.get(n),h),w=C.get(E),k=function(e,n,t,r){var i,l,a,u,c="prev",s="next",f="children",d="parent";if("inline"===e&&r===F)return{inlineTrigger:!0};var v=(i={},(0,o.A)(i,V,c),(0,o.A)(i,z,s),i),p=(l={},(0,o.A)(l,L,t?s:c),(0,o.A)(l,_,t?c:s),(0,o.A)(l,z,f),(0,o.A)(l,F,f),l),m=(a={},(0,o.A)(a,V,c),(0,o.A)(a,z,s),(0,o.A)(a,F,f),(0,o.A)(a,j,d),(0,o.A)(a,L,t?f:d),(0,o.A)(a,_,t?d:f),a);switch(null===(u={inline:v,horizontal:p,vertical:m,inlineSub:v,horizontalSub:m,verticalSub:m}["".concat(e).concat(n?"":"Sub")])||void 0===u?void 0:u[r]){case c:return{offset:-1,sibling:!0};case s:return{offset:1,sibling:!0};case d:return{offset:-1,sibling:!1};case f:return{offset:1,sibling:!1};default:return null}}(e,1===a(w,!0).length,t,m);if(!k&&m!==B&&m!==W)return;(H.includes(m)||[B,W].includes(m))&&p.preventDefault();var R=function(e){if(e){var n=e,t=e.querySelector("a");null!==t&&void 0!==t&&t.getAttribute("href")&&(n=t);var r=C.get(e);u(r),v(),f.current=(0,D.A)((function(){d.current===r&&n.focus()}))}};if([B,W].includes(m)||k.sibling||!E){var M,S,x=q(M=E&&"inline"!==e?function(e){for(var n=e;n;){if(n.getAttribute("data-menu-list"))return n;n=n.parentElement}return null}(E):i.current,h);S=m===B?x[0]:m===W?x[x.length-1]:G(M,h,E,k.offset),R(S)}else if(k.inlineTrigger)c(w);else if(k.offset>0)c(w,!0),v(),f.current=(0,D.A)((function(){y=U(A,r);var e=E.getAttribute("aria-controls"),n=G(document.getElementById(e),y.elements);R(n)}),5);else if(k.offset<0){var N=a(w,!0),I=N[N.length-2],P=g.get(I);c(I,!1),R(P)}}null===s||void 0===s||s(p)}}var Y="__RC_UTIL_PATH_SPLIT__",J=function(e){return e.join(Y)},Q="rc-menu-more";function Z(){var e=m.useState({}),n=(0,a.A)(e,2)[1],t=(0,m.useRef)(new Map),r=(0,m.useRef)(new Map),o=m.useState([]),i=(0,a.A)(o,2),u=i[0],c=i[1],s=(0,m.useRef)(0),f=(0,m.useRef)(!1),d=(0,m.useCallback)((function(e,o){var i=J(o);r.current.set(i,e),t.current.set(e,i),s.current+=1;var l,a=s.current;l=function(){a===s.current&&(f.current||n({}))},Promise.resolve().then(l)}),[]),v=(0,m.useCallback)((function(e,n){var o=J(n);r.current.delete(o),t.current.delete(e)}),[]),p=(0,m.useCallback)((function(e){c(e)}),[]),A=(0,m.useCallback)((function(e,n){var r=t.current.get(e)||"",o=r.split(Y);return n&&u.includes(o[0])&&o.unshift(Q),o}),[u]),y=(0,m.useCallback)((function(e,n){return e.filter((function(e){return void 0!==e})).some((function(e){return A(e,!0).includes(n)}))}),[A]),b=(0,m.useCallback)((function(e){var n="".concat(t.current.get(e)).concat(Y),o=new Set;return(0,l.A)(r.current.keys()).forEach((function(e){e.startsWith(n)&&o.add(r.current.get(e))})),o}),[]);return m.useEffect((function(){return function(){f.current=!0}}),[]),{registerPath:d,unregisterPath:v,refreshOverflowKeys:p,isSubPathKey:y,getKeyPath:A,getKeys:function(){var e=(0,l.A)(t.current.keys());return u.length&&e.push(Q),e},getSubPathKeys:b}}function $(e){var n=m.useRef(e);n.current=e;var t=m.useCallback((function(){for(var e,t=arguments.length,r=new Array(t),o=0;o<t;o++)r[o]=arguments[o];return null===(e=n.current)||void 0===e?void 0:e.call.apply(e,[n].concat(r))}),[]);return e?t:void 0}var ee=Math.random().toFixed(5).toString().slice(2),ne=0;var te=t(3029),re=t(2901),oe=t(5501),ie=t(9426),le=t(8574),ae=t(3758);function ue(e,n,t,r){var o=m.useContext(E),i=o.activeKey,l=o.onActive,a=o.onInactive,u={active:i===e};return n||(u.onMouseEnter=function(n){null===t||void 0===t||t({key:e,domEvent:n}),l(e)},u.onMouseLeave=function(n){null===r||void 0===r||r({key:e,domEvent:n}),a(e)}),u}function ce(e){var n=m.useContext(E),t=n.mode,r=n.rtl,o=n.inlineIndent;if("inline"!==t)return null;return r?{paddingRight:e*o}:{paddingLeft:e*o}}function se(e){var n,t=e.icon,r=e.props,o=e.children;return null===t||!1===t?null:("function"===typeof t?n=m.createElement(t,(0,i.A)({},r)):"boolean"!==typeof t&&(n=t),n||o||null)}var fe=["item"];function de(e){var n=e.item,t=(0,u.A)(e,fe);return Object.defineProperty(t,"item",{get:function(){return(0,p.Ay)(!1,"`info.item` is deprecated since we will move to function component that not provides React Node instance in future."),n}}),t}var ve=["title","attribute","elementRef"],pe=["style","className","eventKey","warnKey","disabled","itemIcon","children","role","onMouseEnter","onMouseLeave","onClick","onKeyDown","onFocus"],me=["active"],Ae=function(e){(0,oe.A)(t,e);var n=(0,ie.A)(t);function t(){return(0,te.A)(this,t),n.apply(this,arguments)}return(0,re.A)(t,[{key:"render",value:function(){var e=this.props,n=e.title,t=e.attribute,o=e.elementRef,i=(0,u.A)(e,ve),l=(0,le.A)(i,["eventKey","popupClassName","popupOffset","onTitleClick"]);return(0,p.Ay)(!t,"`attribute` of Menu.Item is deprecated. Please pass attribute directly."),m.createElement(f.A.Item,(0,r.A)({},t,{title:"string"===typeof n?n:void 0},l,{ref:o}))}}]),t}(m.Component),ye=m.forwardRef((function(e,n){var t,a=e.style,c=e.className,f=e.eventKey,d=(e.warnKey,e.disabled),v=e.itemIcon,p=e.children,A=e.role,y=e.onMouseEnter,b=e.onMouseLeave,g=e.onClick,C=e.onKeyDown,w=e.onFocus,k=(0,u.A)(e,pe),R=h(f),M=m.useContext(E),S=M.prefixCls,N=M.onItemClick,P=M.disabled,K=M.overflowDisabled,O=M.itemIcon,D=M.selectedKeys,L=M.onActive,_=m.useContext(I)._internalRenderMenuItem,V="".concat(S,"-item"),z=m.useRef(),F=m.useRef(),j=P||d,B=(0,ae.xK)(n,F),W=x(f);var H=function(e){return{key:f,keyPath:(0,l.A)(W).reverse(),item:z.current,domEvent:e}},q=v||O,G=ue(f,j,y,b),U=G.active,X=(0,u.A)(G,me),Y=D.includes(f),J=ce(W.length),Q={};"option"===e.role&&(Q["aria-selected"]=Y);var Z=m.createElement(Ae,(0,r.A)({ref:z,elementRef:B,role:null===A?"none":A||"menuitem",tabIndex:d?null:-1,"data-menu-id":K&&R?null:R},k,X,Q,{component:"li","aria-disabled":d,style:(0,i.A)((0,i.A)({},J),a),className:s()(V,(t={},(0,o.A)(t,"".concat(V,"-active"),U),(0,o.A)(t,"".concat(V,"-selected"),Y),(0,o.A)(t,"".concat(V,"-disabled"),j),t),c),onClick:function(e){if(!j){var n=H(e);null===g||void 0===g||g(de(n)),N(n)}},onKeyDown:function(e){if(null===C||void 0===C||C(e),e.which===T.A.ENTER){var n=H(e);null===g||void 0===g||g(de(n)),N(n)}},onFocus:function(e){L(f),null===w||void 0===w||w(e)}}),p,m.createElement(se,{props:(0,i.A)((0,i.A)({},e),{},{isSelected:Y}),icon:q}));return _&&(Z=_(Z,e,{selected:Y})),Z}));function be(e,n){var t=e.eventKey,o=M(),i=x(t);return m.useEffect((function(){if(o)return o.registerPath(t,i),function(){o.unregisterPath(t,i)}}),[i]),o?null:m.createElement(ye,(0,r.A)({},e,{ref:n}))}const he=m.forwardRef(be);var ge=["className","children"],Ce=function(e,n){var t=e.className,o=e.children,i=(0,u.A)(e,ge),l=m.useContext(E),a=l.prefixCls,c=l.mode,f=l.rtl;return m.createElement("ul",(0,r.A)({className:s()(a,f&&"".concat(a,"-rtl"),"".concat(a,"-sub"),"".concat(a,"-").concat("inline"===c?"inline":"vertical"),t),role:"menu"},i,{"data-menu-list":!0,ref:n}),o)},Ee=m.forwardRef(Ce);Ee.displayName="SubMenuList";const we=Ee;var ke=t(2149);function Re(e,n){return(0,ke.A)(e).map((function(e,t){if(m.isValidElement(e)){var r,o,i=e.key,a=null!==(r=null===(o=e.props)||void 0===o?void 0:o.eventKey)&&void 0!==r?r:i;(null===a||void 0===a)&&(a="tmp_key-".concat([].concat((0,l.A)(n),[t]).join("-")));var u={key:a,eventKey:a};return m.cloneElement(e,u)}return e}))}var Me=t(4106),Se={adjustX:1,adjustY:1},xe={topLeft:{points:["bl","tl"],overflow:Se},topRight:{points:["br","tr"],overflow:Se},bottomLeft:{points:["tl","bl"],overflow:Se},bottomRight:{points:["tr","br"],overflow:Se},leftTop:{points:["tr","tl"],overflow:Se},leftBottom:{points:["br","bl"],overflow:Se},rightTop:{points:["tl","tr"],overflow:Se},rightBottom:{points:["bl","br"],overflow:Se}},Ne={topLeft:{points:["bl","tl"],overflow:Se},topRight:{points:["br","tr"],overflow:Se},bottomLeft:{points:["tl","bl"],overflow:Se},bottomRight:{points:["tr","br"],overflow:Se},rightTop:{points:["tr","tl"],overflow:Se},rightBottom:{points:["br","bl"],overflow:Se},leftTop:{points:["tl","tr"],overflow:Se},leftBottom:{points:["bl","br"],overflow:Se}};function Ie(e,n,t){return n||(t?t[e]||t.other:void 0)}var Pe={horizontal:"bottomLeft",vertical:"rightTop","vertical-left":"rightTop","vertical-right":"leftTop"};function Ke(e){var n=e.prefixCls,t=e.visible,r=e.children,l=e.popup,u=e.popupStyle,c=e.popupClassName,f=e.popupOffset,d=e.disabled,v=e.mode,p=e.onVisibleChange,A=m.useContext(E),y=A.getPopupContainer,b=A.rtl,h=A.subMenuOpenDelay,g=A.subMenuCloseDelay,C=A.builtinPlacements,w=A.triggerSubMenuAction,k=A.forceSubMenuRender,R=A.rootClassName,M=A.motion,S=A.defaultMotions,x=m.useState(!1),N=(0,a.A)(x,2),I=N[0],P=N[1],K=b?(0,i.A)((0,i.A)({},Ne),C):(0,i.A)((0,i.A)({},xe),C),O=Pe[v],T=Ie(v,M,S),L=m.useRef(T);"inline"!==v&&(L.current=T);var _=(0,i.A)((0,i.A)({},L.current),{},{leavedClassName:"".concat(n,"-hidden"),removeOnLeave:!1,motionAppear:!0}),V=m.useRef();return m.useEffect((function(){return V.current=(0,D.A)((function(){P(t)})),function(){D.A.cancel(V.current)}}),[t]),m.createElement(Me.A,{prefixCls:n,popupClassName:s()("".concat(n,"-popup"),(0,o.A)({},"".concat(n,"-rtl"),b),c,R),stretch:"horizontal"===v?"minWidth":null,getPopupContainer:y,builtinPlacements:K,popupPlacement:O,popupVisible:I,popup:l,popupStyle:u,popupAlign:f&&{offset:f},action:d?[]:[w],mouseEnterDelay:h,mouseLeaveDelay:g,onPopupVisibleChange:p,forceRender:k,popupMotion:_,fresh:!0},r)}var Oe=t(541);function Te(e){var n=e.id,t=e.open,o=e.keyPath,l=e.children,u="inline",c=m.useContext(E),s=c.prefixCls,f=c.forceSubMenuRender,d=c.motion,v=c.defaultMotions,p=c.mode,A=m.useRef(!1);A.current=p===u;var y=m.useState(!A.current),b=(0,a.A)(y,2),h=b[0],g=b[1],C=!!A.current&&t;m.useEffect((function(){A.current&&g(!1)}),[p]);var k=(0,i.A)({},Ie(u,d,v));o.length>1&&(k.motionAppear=!1);var R=k.onVisibleChanged;return k.onVisibleChanged=function(e){return A.current||e||g(!0),null===R||void 0===R?void 0:R(e)},h?null:m.createElement(w,{mode:u,locked:!A.current},m.createElement(Oe.Ay,(0,r.A)({visible:C},k,{forceRender:f,removeOnLeave:!1,leavedClassName:"".concat(s,"-hidden")}),(function(e){var t=e.className,r=e.style;return m.createElement(we,{id:n,className:t,style:r},l)})))}var De=["style","className","title","eventKey","warnKey","disabled","internalPopupClose","children","itemIcon","expandIcon","popupClassName","popupOffset","popupStyle","onClick","onMouseEnter","onMouseLeave","onTitleClick","onTitleMouseEnter","onTitleMouseLeave"],Le=["active"],_e=m.forwardRef((function(e,n){var t,l=e.style,c=e.className,d=e.title,v=e.eventKey,p=(e.warnKey,e.disabled),A=e.internalPopupClose,y=e.children,b=e.itemIcon,g=e.expandIcon,C=e.popupClassName,k=e.popupOffset,R=e.popupStyle,M=e.onClick,S=e.onMouseEnter,P=e.onMouseLeave,K=e.onTitleClick,O=e.onTitleMouseEnter,T=e.onTitleMouseLeave,D=(0,u.A)(e,De),L=h(v),_=m.useContext(E),V=_.prefixCls,z=_.mode,F=_.openKeys,j=_.disabled,B=_.overflowDisabled,W=_.activeKey,H=_.selectedKeys,q=_.itemIcon,G=_.expandIcon,U=_.onItemClick,X=_.onOpenChange,Y=_.onActive,J=m.useContext(I)._internalRenderSubMenuItem,Q=m.useContext(N).isSubPathKey,Z=x(),ee="".concat(V,"-submenu"),ne=j||p,te=m.useRef(),re=m.useRef();var oe=null!==b&&void 0!==b?b:q,ie=null!==g&&void 0!==g?g:G,le=F.includes(v),ae=!B&&le,fe=Q(H,v),ve=ue(v,ne,O,T),pe=ve.active,me=(0,u.A)(ve,Le),Ae=m.useState(!1),ye=(0,a.A)(Ae,2),be=ye[0],he=ye[1],ge=function(e){ne||he(e)},Ce=m.useMemo((function(){return pe||"inline"!==z&&(be||Q([W],v))}),[z,pe,W,be,v,Q]),Ee=ce(Z.length),ke=$((function(e){null===M||void 0===M||M(de(e)),U(e)})),Re=L&&"".concat(L,"-popup"),Me=m.createElement("div",(0,r.A)({role:"menuitem",style:Ee,className:"".concat(ee,"-title"),tabIndex:ne?null:-1,ref:te,title:"string"===typeof d?d:null,"data-menu-id":B&&L?null:L,"aria-expanded":ae,"aria-haspopup":!0,"aria-controls":Re,"aria-disabled":ne,onClick:function(e){ne||(null===K||void 0===K||K({key:v,domEvent:e}),"inline"===z&&X(v,!le))},onFocus:function(){Y(v)}},me),d,m.createElement(se,{icon:"horizontal"!==z?ie:void 0,props:(0,i.A)((0,i.A)({},e),{},{isOpen:ae,isSubMenu:!0})},m.createElement("i",{className:"".concat(ee,"-arrow")}))),Se=m.useRef(z);if("inline"!==z&&Z.length>1?Se.current="vertical":Se.current=z,!B){var xe=Se.current;Me=m.createElement(Ke,{mode:xe,prefixCls:ee,visible:!A&&ae&&"inline"!==z,popupClassName:C,popupOffset:k,popupStyle:R,popup:m.createElement(w,{mode:"horizontal"===xe?"vertical":xe},m.createElement(we,{id:Re,ref:re},y)),disabled:ne,onVisibleChange:function(e){"inline"!==z&&X(v,e)}},Me)}var Ne=m.createElement(f.A.Item,(0,r.A)({ref:n,role:"none"},D,{component:"li",style:l,className:s()(ee,"".concat(ee,"-").concat(z),c,(t={},(0,o.A)(t,"".concat(ee,"-open"),ae),(0,o.A)(t,"".concat(ee,"-active"),Ce),(0,o.A)(t,"".concat(ee,"-selected"),fe),(0,o.A)(t,"".concat(ee,"-disabled"),ne),t)),onMouseEnter:function(e){ge(!0),null===S||void 0===S||S({key:v,domEvent:e})},onMouseLeave:function(e){ge(!1),null===P||void 0===P||P({key:v,domEvent:e})}}),Me,!B&&m.createElement(Te,{id:Re,open:ae,keyPath:Z},y));return J&&(Ne=J(Ne,e,{selected:fe,active:Ce,open:ae,disabled:ne})),m.createElement(w,{onItemClick:ke,mode:"horizontal"===z?"vertical":z,itemIcon:oe,expandIcon:ie},Ne)}));const Ve=m.forwardRef((function(e,n){var t,o=e.eventKey,i=e.children,l=x(o),a=Re(i,l),u=M();return m.useEffect((function(){if(u)return u.registerPath(o,l),function(){u.unregisterPath(o,l)}}),[l]),t=u?a:m.createElement(_e,(0,r.A)({ref:n},e),a),m.createElement(S.Provider,{value:l},t)}));var ze=t(2284);function Fe(e){var n=e.className,t=e.style,r=m.useContext(E).prefixCls;return M()?null:m.createElement("li",{role:"separator",className:s()("".concat(r,"-item-divider"),n),style:t})}var je=["className","title","eventKey","children"],Be=m.forwardRef((function(e,n){var t=e.className,o=e.title,i=(e.eventKey,e.children),l=(0,u.A)(e,je),a=m.useContext(E).prefixCls,c="".concat(a,"-item-group");return m.createElement("li",(0,r.A)({ref:n,role:"presentation"},l,{onClick:function(e){return e.stopPropagation()},className:s()(c,t)}),m.createElement("div",{role:"presentation",className:"".concat(c,"-title"),title:"string"===typeof o?o:void 0},o),m.createElement("ul",{role:"group",className:"".concat(c,"-list")},i))}));const We=m.forwardRef((function(e,n){var t=e.eventKey,o=Re(e.children,x(t));return M()?o:m.createElement(Be,(0,r.A)({ref:n},(0,le.A)(e,["warnKey"])),o)}));var He=["label","children","key","type"];function qe(e,n){var t=n.item,o=n.group,i=n.submenu,l=n.divider;return(e||[]).map((function(e,a){if(e&&"object"===(0,ze.A)(e)){var c=e,s=c.label,f=c.children,d=c.key,v=c.type,p=(0,u.A)(c,He),A=null!==d&&void 0!==d?d:"tmp-".concat(a);return f||"group"===v?"group"===v?m.createElement(o,(0,r.A)({key:A},p,{title:s}),qe(f,n)):m.createElement(i,(0,r.A)({key:A},p,{title:s}),qe(f,n)):"divider"===v?m.createElement(l,(0,r.A)({key:A},p)):m.createElement(t,(0,r.A)({key:A},p),s)}return null})).filter((function(e){return e}))}function Ge(e,n,t,r){var o=e,l=(0,i.A)({divider:Fe,item:he,group:We,submenu:Ve},r);return n&&(o=qe(n,l)),Re(o,t)}var Ue=["prefixCls","rootClassName","style","className","tabIndex","items","children","direction","id","mode","inlineCollapsed","disabled","disabledOverflow","subMenuOpenDelay","subMenuCloseDelay","forceSubMenuRender","defaultOpenKeys","openKeys","activeKey","defaultActiveFirst","selectable","multiple","defaultSelectedKeys","selectedKeys","onSelect","onDeselect","inlineIndent","motion","defaultMotions","triggerSubMenuAction","builtinPlacements","itemIcon","expandIcon","overflowedIndicator","overflowedIndicatorPopupClassName","getPopupContainer","onClick","onOpenChange","onKeyDown","openAnimation","openTransitionName","_internalRenderMenuItem","_internalRenderSubMenuItem","_internalComponents"],Xe=[];var Ye=m.forwardRef((function(e,n){var t,c,p=e,b=p.prefixCls,h=void 0===b?"rc-menu":b,g=p.rootClassName,C=p.style,E=p.className,k=p.tabIndex,M=void 0===k?0:k,S=p.items,x=p.children,P=p.direction,K=p.id,O=p.mode,T=void 0===O?"vertical":O,D=p.inlineCollapsed,L=p.disabled,_=p.disabledOverflow,V=p.subMenuOpenDelay,z=void 0===V?.1:V,F=p.subMenuCloseDelay,j=void 0===F?.1:F,B=p.forceSubMenuRender,W=p.defaultOpenKeys,H=p.openKeys,G=p.activeKey,Y=p.defaultActiveFirst,J=p.selectable,te=void 0===J||J,re=p.multiple,oe=void 0!==re&&re,ie=p.defaultSelectedKeys,le=p.selectedKeys,ae=p.onSelect,ue=p.onDeselect,ce=p.inlineIndent,se=void 0===ce?24:ce,fe=p.motion,ve=p.defaultMotions,pe=p.triggerSubMenuAction,me=void 0===pe?"hover":pe,Ae=p.builtinPlacements,ye=p.itemIcon,be=p.expandIcon,ge=p.overflowedIndicator,Ce=void 0===ge?"...":ge,Ee=p.overflowedIndicatorPopupClassName,we=p.getPopupContainer,ke=p.onClick,Re=p.onOpenChange,Me=p.onKeyDown,Se=(p.openAnimation,p.openTransitionName,p._internalRenderMenuItem),xe=p._internalRenderSubMenuItem,Ne=p._internalComponents,Ie=(0,u.A)(p,Ue),Pe=m.useMemo((function(){return[Ge(x,S,Xe,Ne),Ge(x,S,Xe,{})]}),[x,S,Ne]),Ke=(0,a.A)(Pe,2),Oe=Ke[0],Te=Ke[1],De=m.useState(!1),Le=(0,a.A)(De,2),_e=Le[0],ze=Le[1],Fe=m.useRef(),je=function(e){var n=(0,d.A)(e,{value:e}),t=(0,a.A)(n,2),r=t[0],o=t[1];return m.useEffect((function(){ne+=1;var e="".concat(ee,"-").concat(ne);o("rc-menu-uuid-".concat(e))}),[]),r}(K),Be="rtl"===P;var We=(0,d.A)(W,{value:H,postState:function(e){return e||Xe}}),He=(0,a.A)(We,2),qe=He[0],Ye=He[1],Je=function(e){function n(){Ye(e),null===Re||void 0===Re||Re(e)}arguments.length>1&&void 0!==arguments[1]&&arguments[1]?(0,A.flushSync)(n):n()},Qe=m.useState(qe),Ze=(0,a.A)(Qe,2),$e=Ze[0],en=Ze[1],nn=m.useRef(!1),tn=m.useMemo((function(){return"inline"!==T&&"vertical"!==T||!D?[T,!1]:["vertical",D]}),[T,D]),rn=(0,a.A)(tn,2),on=rn[0],ln=rn[1],an="inline"===on,un=m.useState(on),cn=(0,a.A)(un,2),sn=cn[0],fn=cn[1],dn=m.useState(ln),vn=(0,a.A)(dn,2),pn=vn[0],mn=vn[1];m.useEffect((function(){fn(on),mn(ln),nn.current&&(an?Ye($e):Je(Xe))}),[on,ln]);var An=m.useState(0),yn=(0,a.A)(An,2),bn=yn[0],hn=yn[1],gn=bn>=Oe.length-1||"horizontal"!==sn||_;m.useEffect((function(){an&&en(qe)}),[qe]),m.useEffect((function(){return nn.current=!0,function(){nn.current=!1}}),[]);var Cn=Z(),En=Cn.registerPath,wn=Cn.unregisterPath,kn=Cn.refreshOverflowKeys,Rn=Cn.isSubPathKey,Mn=Cn.getKeyPath,Sn=Cn.getKeys,xn=Cn.getSubPathKeys,Nn=m.useMemo((function(){return{registerPath:En,unregisterPath:wn}}),[En,wn]),In=m.useMemo((function(){return{isSubPathKey:Rn}}),[Rn]);m.useEffect((function(){kn(gn?Xe:Oe.slice(bn+1).map((function(e){return e.key})))}),[bn,gn]);var Pn=(0,d.A)(G||Y&&(null===(t=Oe[0])||void 0===t?void 0:t.key),{value:G}),Kn=(0,a.A)(Pn,2),On=Kn[0],Tn=Kn[1],Dn=$((function(e){Tn(e)})),Ln=$((function(){Tn(void 0)}));(0,m.useImperativeHandle)(n,(function(){return{list:Fe.current,focus:function(e){var n,t,r=Sn(),o=U(r,je),i=o.elements,l=o.key2element,a=o.element2key,u=q(Fe.current,i),c=null!==On&&void 0!==On?On:u[0]?a.get(u[0]):null===(n=Oe.find((function(e){return!e.props.disabled})))||void 0===n?void 0:n.key,s=l.get(c);c&&s&&(null===s||void 0===s||null===(t=s.focus)||void 0===t||t.call(s,e))}}}));var _n=(0,d.A)(ie||[],{value:le,postState:function(e){return Array.isArray(e)?e:null===e||void 0===e?Xe:[e]}}),Vn=(0,a.A)(_n,2),zn=Vn[0],Fn=Vn[1],jn=$((function(e){null===ke||void 0===ke||ke(de(e)),function(e){if(te){var n,t=e.key,r=zn.includes(t);n=oe?r?zn.filter((function(e){return e!==t})):[].concat((0,l.A)(zn),[t]):[t],Fn(n);var o=(0,i.A)((0,i.A)({},e),{},{selectedKeys:n});r?null===ue||void 0===ue||ue(o):null===ae||void 0===ae||ae(o)}!oe&&qe.length&&"inline"!==sn&&Je(Xe)}(e)})),Bn=$((function(e,n){var t=qe.filter((function(n){return n!==e}));if(n)t.push(e);else if("inline"!==sn){var r=xn(e);t=t.filter((function(e){return!r.has(e)}))}(0,v.A)(qe,t,!0)||Je(t,!0)})),Wn=X(sn,On,Be,je,Fe,Sn,Mn,Tn,(function(e,n){var t=null!==n&&void 0!==n?n:!qe.includes(e);Bn(e,t)}),Me);m.useEffect((function(){ze(!0)}),[]);var Hn=m.useMemo((function(){return{_internalRenderMenuItem:Se,_internalRenderSubMenuItem:xe}}),[Se,xe]),qn="horizontal"!==sn||_?Oe:Oe.map((function(e,n){return m.createElement(w,{key:e.key,overflowDisabled:n>bn},e)})),Gn=m.createElement(f.A,(0,r.A)({id:K,ref:Fe,prefixCls:"".concat(h,"-overflow"),component:"ul",itemComponent:he,className:s()(h,"".concat(h,"-root"),"".concat(h,"-").concat(sn),E,(c={},(0,o.A)(c,"".concat(h,"-inline-collapsed"),pn),(0,o.A)(c,"".concat(h,"-rtl"),Be),c),g),dir:P,style:C,role:"menu",tabIndex:M,data:qn,renderRawItem:function(e){return e},renderRawRest:function(e){var n=e.length,t=n?Oe.slice(-n):null;return m.createElement(Ve,{eventKey:Q,title:Ce,disabled:gn,internalPopupClose:0===n,popupClassName:Ee},t)},maxCount:"horizontal"!==sn||_?f.A.INVALIDATE:f.A.RESPONSIVE,ssr:"full","data-menu-list":!0,onVisibleChange:function(e){hn(e)},onKeyDown:Wn},Ie));return m.createElement(I.Provider,{value:Hn},m.createElement(y.Provider,{value:je},m.createElement(w,{prefixCls:h,rootClassName:g,mode:sn,openKeys:qe,rtl:Be,disabled:L,motion:_e?fe:null,defaultMotions:_e?ve:null,activeKey:On,onActive:Dn,onInactive:Ln,selectedKeys:zn,inlineIndent:se,subMenuOpenDelay:z,subMenuCloseDelay:j,forceSubMenuRender:B,builtinPlacements:Ae,triggerSubMenuAction:me,getPopupContainer:we,itemIcon:ye,expandIcon:be,onItemClick:jn,onOpenChange:Bn},m.createElement(N.Provider,{value:In},Gn),m.createElement("div",{style:{display:"none"},"aria-hidden":!0},m.createElement(R.Provider,{value:Nn},Te)))))}));Ye.Item=he,Ye.SubMenu=Ve,Ye.ItemGroup=We,Ye.Divider=Fe;const Je=Ye}}]);
//# sourceMappingURL=6473.34a385d4.chunk.js.map