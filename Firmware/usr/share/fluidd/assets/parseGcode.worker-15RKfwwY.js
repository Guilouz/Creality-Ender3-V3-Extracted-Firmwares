(function(){"use strict";const te=(e,t)=>e in t;var ne=typeof global=="object"&&global&&global.Object===Object&&global,re=ne,ie=typeof self=="object"&&self&&self.Object===Object&&self,oe=re||ie||Function("return this")(),z=oe,ae=z.Symbol,p=ae,R=Object.prototype,se=R.hasOwnProperty,ce=R.toString,v=p?p.toStringTag:void 0;function le(e){var t=se.call(e,v),n=e[v];try{e[v]=void 0;var r=!0}catch{}var o=ce.call(e);return r&&(t?e[v]=n:delete e[v]),o}var ue=Object.prototype,fe=ue.toString;function he(e){return fe.call(e)}var pe="[object Null]",de="[object Undefined]",H=p?p.toStringTag:void 0;function I(e){return e==null?e===void 0?de:pe:H&&H in Object(e)?le(e):he(e)}function A(e){return e!=null&&typeof e=="object"}var ge="[object Symbol]";function F(e){return typeof e=="symbol"||A(e)&&I(e)==ge}function ye(e,t){for(var n=-1,r=e==null?0:e.length,o=Array(r);++n<r;)o[n]=t(e[n],n,e);return o}var _e=Array.isArray,w=_e,me=1/0,L=p?p.prototype:void 0,U=L?L.toString:void 0;function Q(e){if(typeof e=="string")return e;if(w(e))return ye(e,Q)+"";if(F(e))return U?U.call(e):"";var t=e+"";return t=="0"&&1/e==-me?"-0":t}function C(e){var t=typeof e;return e!=null&&(t=="object"||t=="function")}function be(e){return e}var ve="[object AsyncFunction]",we="[object Function]",xe="[object GeneratorFunction]",Oe="[object Proxy]";function Se(e){if(!C(e))return!1;var t=I(e);return t==we||t==xe||t==ve||t==Oe}var Ce=z["__core-js_shared__"],N=Ce,q=function(){var e=/[^.]+$/.exec(N&&N.keys&&N.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}();function Pe(e){return!!q&&q in e}var Ee=Function.prototype,Te=Ee.toString;function $e(e){if(e!=null){try{return Te.call(e)}catch{}try{return e+""}catch{}}return""}var ze=/[\\^$.*+?()[\]{}|]/g,Ie=/^\[object .+?Constructor\]$/,Ae=Function.prototype,Fe=Object.prototype,Ne=Ae.toString,Me=Fe.hasOwnProperty,je=RegExp("^"+Ne.call(Me).replace(ze,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function Ge(e){if(!C(e)||Pe(e))return!1;var t=Se(e)?je:Ie;return t.test($e(e))}function De(e,t){return e==null?void 0:e[t]}function M(e,t){var n=De(e,t);return Ge(n)?n:void 0}function Re(e,t,n){switch(n.length){case 0:return e.call(t);case 1:return e.call(t,n[0]);case 2:return e.call(t,n[0],n[1]);case 3:return e.call(t,n[0],n[1],n[2])}return e.apply(t,n)}var He=800,Le=16,Ue=Date.now;function Qe(e){var t=0,n=0;return function(){var r=Ue(),o=Le-(r-n);if(n=r,o>0){if(++t>=He)return arguments[0]}else t=0;return e.apply(void 0,arguments)}}function qe(e){return function(){return e}}var Xe=function(){try{var e=M(Object,"defineProperty");return e({},"",{}),e}catch{}}(),P=Xe,ke=P?function(e,t){return P(e,"toString",{configurable:!0,enumerable:!1,value:qe(t),writable:!0})}:be,Je=ke,Ke=Qe(Je),Be=Ke,Ye=9007199254740991,Ze=/^(?:0|[1-9]\d*)$/;function X(e,t){var n=typeof e;return t=t??Ye,!!t&&(n=="number"||n!="symbol"&&Ze.test(e))&&e>-1&&e%1==0&&e<t}function We(e,t,n){t=="__proto__"&&P?P(e,t,{configurable:!0,enumerable:!0,value:n,writable:!0}):e[t]=n}function k(e,t){return e===t||e!==e&&t!==t}var Ve=Object.prototype,et=Ve.hasOwnProperty;function tt(e,t,n){var r=e[t];(!(et.call(e,t)&&k(r,n))||n===void 0&&!(t in e))&&We(e,t,n)}var J=Math.max;function nt(e,t,n){return t=J(t===void 0?e.length-1:t,0),function(){for(var r=arguments,o=-1,s=J(r.length-t,0),c=Array(s);++o<s;)c[o]=r[t+o];o=-1;for(var a=Array(t+1);++o<t;)a[o]=r[o];return a[t]=n(c),Re(e,this,a)}}var rt=9007199254740991;function it(e){return typeof e=="number"&&e>-1&&e%1==0&&e<=rt}var ot="[object Arguments]";function K(e){return A(e)&&I(e)==ot}var B=Object.prototype,at=B.hasOwnProperty,st=B.propertyIsEnumerable,ct=K(function(){return arguments}())?K:function(e){return A(e)&&at.call(e,"callee")&&!st.call(e,"callee")},Y=ct,lt=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,ut=/^\w*$/;function ft(e,t){if(w(e))return!1;var n=typeof e;return n=="number"||n=="symbol"||n=="boolean"||e==null||F(e)?!0:ut.test(e)||!lt.test(e)||t!=null&&e in Object(t)}var ht=M(Object,"create"),x=ht;function pt(){this.__data__=x?x(null):{},this.size=0}function dt(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t}var gt="__lodash_hash_undefined__",yt=Object.prototype,_t=yt.hasOwnProperty;function mt(e){var t=this.__data__;if(x){var n=t[e];return n===gt?void 0:n}return _t.call(t,e)?t[e]:void 0}var bt=Object.prototype,vt=bt.hasOwnProperty;function wt(e){var t=this.__data__;return x?t[e]!==void 0:vt.call(t,e)}var xt="__lodash_hash_undefined__";function Ot(e,t){var n=this.__data__;return this.size+=this.has(e)?0:1,n[e]=x&&t===void 0?xt:t,this}function g(e){var t=-1,n=e==null?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}g.prototype.clear=pt,g.prototype.delete=dt,g.prototype.get=mt,g.prototype.has=wt,g.prototype.set=Ot;function St(){this.__data__=[],this.size=0}function E(e,t){for(var n=e.length;n--;)if(k(e[n][0],t))return n;return-1}var Ct=Array.prototype,Pt=Ct.splice;function Et(e){var t=this.__data__,n=E(t,e);if(n<0)return!1;var r=t.length-1;return n==r?t.pop():Pt.call(t,n,1),--this.size,!0}function Tt(e){var t=this.__data__,n=E(t,e);return n<0?void 0:t[n][1]}function $t(e){return E(this.__data__,e)>-1}function zt(e,t){var n=this.__data__,r=E(n,e);return r<0?(++this.size,n.push([e,t])):n[r][1]=t,this}function m(e){var t=-1,n=e==null?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}m.prototype.clear=St,m.prototype.delete=Et,m.prototype.get=Tt,m.prototype.has=$t,m.prototype.set=zt;var It=M(z,"Map"),At=It;function Ft(){this.size=0,this.__data__={hash:new g,map:new(At||m),string:new g}}function Nt(e){var t=typeof e;return t=="string"||t=="number"||t=="symbol"||t=="boolean"?e!=="__proto__":e===null}function T(e,t){var n=e.__data__;return Nt(t)?n[typeof t=="string"?"string":"hash"]:n.map}function Mt(e){var t=T(this,e).delete(e);return this.size-=t?1:0,t}function jt(e){return T(this,e).get(e)}function Gt(e){return T(this,e).has(e)}function Dt(e,t){var n=T(this,e),r=n.size;return n.set(e,t),this.size+=n.size==r?0:1,this}function y(e){var t=-1,n=e==null?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}y.prototype.clear=Ft,y.prototype.delete=Mt,y.prototype.get=jt,y.prototype.has=Gt,y.prototype.set=Dt;var Rt="Expected a function";function j(e,t){if(typeof e!="function"||t!=null&&typeof t!="function")throw new TypeError(Rt);var n=function(){var r=arguments,o=t?t.apply(this,r):r[0],s=n.cache;if(s.has(o))return s.get(o);var c=e.apply(this,r);return n.cache=s.set(o,c)||s,c};return n.cache=new(j.Cache||y),n}j.Cache=y;var Ht=500;function Lt(e){var t=j(e,function(r){return n.size===Ht&&n.clear(),r}),n=t.cache;return t}var Ut=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Qt=/\\(\\)?/g,qt=Lt(function(e){var t=[];return e.charCodeAt(0)===46&&t.push(""),e.replace(Ut,function(n,r,o,s){t.push(o?s.replace(Qt,"$1"):r||n)}),t}),Xt=qt;function kt(e){return e==null?"":Q(e)}function $(e,t){return w(e)?e:ft(e,t)?[e]:Xt(kt(e))}var Jt=1/0;function G(e){if(typeof e=="string"||F(e))return e;var t=e+"";return t=="0"&&1/e==-Jt?"-0":t}function Kt(e,t){t=$(t,e);for(var n=0,r=t.length;e!=null&&n<r;)e=e[G(t[n++])];return n&&n==r?e:void 0}function Bt(e,t){for(var n=-1,r=t.length,o=e.length;++n<r;)e[o+n]=t[n];return e}var Z=p?p.isConcatSpreadable:void 0;function Yt(e){return w(e)||Y(e)||!!(Z&&e&&e[Z])}function W(e,t,n,r,o){var s=-1,c=e.length;for(n||(n=Yt),o||(o=[]);++s<c;){var a=e[s];t>0&&n(a)?t>1?W(a,t-1,n,r,o):Bt(o,a):r||(o[o.length]=a)}return o}function Zt(e){var t=e==null?0:e.length;return t?W(e,1):[]}function Wt(e){return Be(nt(e,void 0,Zt),e+"")}function Vt(e,t){return e!=null&&t in Object(e)}function en(e,t,n){t=$(t,e);for(var r=-1,o=t.length,s=!1;++r<o;){var c=G(t[r]);if(!(s=e!=null&&n(e,c)))break;e=e[c]}return s||++r!=o?s:(o=e==null?0:e.length,!!o&&it(o)&&X(c,o)&&(w(e)||Y(e)))}function tn(e,t){return e!=null&&en(e,t,Vt)}function nn(e,t,n,r){if(!C(e))return e;t=$(t,e);for(var o=-1,s=t.length,c=s-1,a=e;a!=null&&++o<s;){var f=G(t[o]),i=n;if(f==="__proto__"||f==="constructor"||f==="prototype")return e;if(o!=c){var u=a[f];i=r?r(u,f,a):void 0,i===void 0&&(i=C(u)?u:X(t[o+1])?[]:{})}tt(a,f,i),a=a[f]}return e}function rn(e,t,n){for(var r=-1,o=t.length,s={};++r<o;){var c=t[r],a=Kt(e,c);n(a,c)&&nn(s,$(c,e),a)}return s}function on(e,t){return rn(e,t,function(n,r){return tn(e,r)})}var an=Wt(function(e,t){return e==null?{}:on(e,t)}),V=an;function sn(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ee={};(function(e){class t{constructor(r){this.i=0,this.string=r,this.whitespace=` 	\r
`,this.quotes=`'"`,this.escapes="\\",this.escapedQuotes='"',this.ansiCQuotes=!0,this.localeQuotes=!0,this.debug=!1}readChar(){return this.string.charAt(this.i++)}processEscapes(r,o,s){if(!s&&!this.escapedQuotes.includes(o))return r;const c="["+this.escapes.replace(/(.)/g,"\\$1")+"]";if(!s&&this.escapedQuotes.includes(o)){const a=new RegExp(c+"("+c+"|\\"+o+")","g");return r.replace(a,"$1")}if(s){const a={"([\\\\'\"?])":i=>i,a:()=>"\x07",b:()=>"\b","e|E":()=>"\x1B",f:()=>"\f",n:()=>`
`,r:()=>"\r",t:()=>"	",v:()=>"\v","([0-7]{1,3})":i=>String.fromCharCode(parseInt(i,8)),"x([0-9a-fA-F]{1,2})":i=>String.fromCharCode(parseInt(i,16)),"u([0-9a-fA-F]{1,4})":i=>String.fromCharCode(parseInt(i,16)),"U([0-9a-fA-F]{1,8})":i=>String.fromCharCode(parseInt(i,16)),"c(.)":i=>i==="?"?"":i==="@"?"\0":String.fromCharCode(i.charCodeAt(0)&31)},f=new RegExp(c+"("+Object.keys(a).join("|")+")","g");return r.replace(f,function(i,u){for(const d in a){const O=new RegExp("^"+d+"$").exec(u);if(O!==null)return a[d].apply(null,O.slice(1))}})}}*[Symbol.iterator](){let r=!1,o=!1,s=!1,c=-2,a;for(this.debug&&console.log("full input:",">"+this.string+"<");;){const f=this.i,i=this.readChar();if(this.debug&&console.log("position:",f,"input:",">"+i+"<","accumulated:",a,"inQuote:",r,"inDollarQuote:",o,"lastDollar:",c,"escaped:",s),i===""){if(r)throw new Error("Got EOF while in a quoted string");if(s)throw new Error("Got EOF while in an escape sequence");a!==void 0&&(yield a);return}if(s){i===`
`||(r?a=(a||"")+s+i:a=(a||"")+i),s=!1;continue}if(this.escapes.includes(i)&&(!r||o!==!1||this.escapedQuotes.includes(r))){s=i;continue}if(r!==!1){if(i===r){a=this.processEscapes(a,r,o==="'"),r=!1,o=!1;continue}a=(a||"")+i;continue}if(this.quotes.includes(i)){r=i,c===f-1&&(i==="'"&&!this.ansiCQuotes||i==='"'&&!this.localeQuotes||(o=i)),a=a||"",o!==!1&&(a=a.slice(0,-1));continue}if(r===!1&&i==="$"&&(c=f),this.whitespace.includes(i)){a!==void 0&&(yield a),a=void 0;continue}a=(a||"")+i}}}e.split=function(n){return Array.from(new t(n))},e.quote=function(n){return n===""?"''":/[^\w@%\-+=:,./]/.test(n)?("'"+n.replace(/('+)/g,`'"$1"'`)+"'").replace(/^''|''$/g,""):n},e.join=function(n){if(!Array.isArray(n))throw new TypeError("args should be an array");return n.map(e.quote).join(" ")}})(ee);var cn=sn(ee);const ln=e=>{const t={};for(const[,n,r]of e.matchAll(/([a-z])[ \t]*(-?(?:\d+(?:\.\d+)?|\.\d+))/ig))t[n.toLowerCase()]=+r;return t},un=e=>{const t={};for(const n of cn.split(e)){const r=n.indexOf("="),o=n.substring(0,r),s=n.substring(r+1);t[o.toLowerCase()]=s}return t},fn=e=>{const t=e.trim().split(";",2)[0],[,n,r=""]=t.split(/^([gm][0-9]+)\s*/i);if(n)return{type:"gcode",command:n.toUpperCase(),args:ln(r)};const[,o,s=""]=t.split(/^(SET_PRINT_STATS_INFO|EXCLUDE_OBJECT_DEFINE)\s+/i);return o?{type:"macro",command:o.toUpperCase(),args:un(s)}:{type:"other"}},_=e=>Math.round(e*1e4)/1e4,hn=(e,t)=>{const n=[],r=[],o=[],s=e.split(`
`);let c=!1,a="relative",f="absolute";const i={x:0,y:0,z:0,e:0,filePosition:0},u={length:1,extrudeExtra:0,z:0};for(let d=0;d<s.length;d++){const{type:O,command:D,args:h}=fn(s[d])??{};let l=null;if(O==="macro")switch(D){case"SET_PRINT_STATS_INFO":"current_layer"in h&&(c=!0);break;case"EXCLUDE_OBJECT_DEFINE":if("polygon"in h&&h.polygon){const b={polygon:JSON.parse(h.polygon).map(([gn,yn])=>({x:gn,y:yn}))};o.push(Object.freeze(b))}break}else if(O==="gcode"){switch(D){case"G0":case"G1":l={...V(h,["x","y","z","e"]),filePosition:i.filePosition};break;case"G2":case"G3":l={...V(h,["x","y","z","e","i","j","k","r"]),direction:D==="G2"?"clockwise":"counter-clockwise",filePosition:i.filePosition};break;case"G10":l={e:-u.length,filePosition:0},u.z!==0&&(l.z=_(i.z+u.z));break;case"G11":l={e:_(u.length+u.extrudeExtra),filePosition:i.filePosition},u.z!==0&&(l.z=_(i.z-u.z));break;case"G90":f="absolute";case"M82":a="absolute",i.e=0;break;case"G91":f="relative";case"M83":a="relative";break;case"G92":a==="absolute"&&(i.e=h.e??i.e),f==="absolute"&&(i.x=h.x??i.x,i.y=h.y??i.y,i.z=h.z??i.z);break;case"M207":u.length=h.s??u.length,u.extrudeExtra=h.s??u.extrudeExtra,u.z=h.z??u.z;break}if(l){if(a==="absolute"&&l.e!==void 0){const S=_(l.e-i.e);i.e=l.e,l.e=S}if(f==="relative"&&(l.x!==void 0&&(l.x=_(l.x+i.x)),l.y!==void 0&&(l.y=_(l.y+i.y)),l.z!==void 0&&(l.z=_(l.z+i.z))),c&&l.e&&l.e>0){const S=l;if(["x","y","i","j"].some(b=>te(b,S)&&S[b]!==0)){const b={z:i.z,move:n.length-1,filePosition:i.filePosition};r.push(Object.freeze(b)),c=!1}}i.x=l.x??i.x,i.y=l.y??i.y,i.z=l.z??i.z,n.push(Object.freeze(l))}}d%Math.floor(s.length/100)===0&&t(i.filePosition),i.filePosition+=s[d].length+1}return t(i.filePosition),{moves:n,layers:r,parts:o}},pn=e=>{const t={action:"progress",filePosition:e};self.postMessage(t)},dn=(e,t,n)=>{const r={action:"result",moves:e,layers:t,parts:n};self.postMessage(r)};self.onmessage=e=>{const t=e.data;switch(t.action){case"parse":{const{moves:n,layers:r,parts:o}=hn(t.gcode,pn);dn(n,r,o);break}}}})();