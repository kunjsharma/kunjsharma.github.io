(function(){"use strict";var t={5034:function(t,e,s){var n=s(3751),o=s(641);function r(t,e,s,n,r,i){const a=(0,o.g2)("XHeader"),l=(0,o.g2)("XPost");return(0,o.uX)(),(0,o.CE)(o.FK,null,[(0,o.bF)(a),(0,o.bF)(l)],64)}var i=s(33);const a={class:"xpost-container"},l={class:"xpost-container_row"},c={class:"xpost-container_row"},u=["disabled"],d={class:"xposts-container"},f=["id"],p=["id"],h=["id"];function v(t,e,s,n,r,v){return(0,o.uX)(),(0,o.CE)(o.FK,null,[(0,o.Lk)("div",a,[(0,o.Lk)("div",l,[(0,o.Lk)("textarea",{ref:"xpost",placeholder:"What is happening?!",onInput:e[0]||(e[0]=(...t)=>v.onPost&&v.onPost(...t))},null,544)]),(0,o.Lk)("div",c,[(0,o.Lk)("button",{ref:"postButton",class:(0,i.C4)({disabled:!this.isPost}),onClick:e[1]||(e[1]=(...t)=>v.createPost&&v.createPost(...t)),disabled:!this.isPost},"Post",10,u)])]),(0,o.Lk)("div",d,[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(this.items,((t,s)=>((0,o.uX)(),(0,o.CE)("div",{class:"xposts-container_row",key:t.index},[(0,o.Lk)("div",{ref_for:!0,ref:"row-"+s,id:["row-"+s]},(0,i.v_)(t),9,f),(0,o.Lk)("textarea",{ref_for:!0,ref:"xpost-"+s,id:["xpost-"+s],placeholder:""},null,8,p),(0,o.Lk)("div",{id:[s],class:"xposts-container_buttons"},[(0,o.Lk)("button",{onClick:e[2]||(e[2]=(...t)=>v.likePost&&v.likePost(...t))},"Like"),(0,o.Lk)("button",{onClick:e[3]||(e[3]=(...t)=>v.editPost&&v.editPost(...t))},"Edit"),(0,o.Lk)("button",{onClick:e[4]||(e[4]=(...t)=>v.deletePost&&v.deletePost(...t))},"Delete")],8,h)])))),128))])],64)}s(4114);var k={name:"XPost",props:{msg:String},data(){return{items:[],isPost:!1}},methods:{onPost(){this.$refs.xpost.value.length>0?this.isPost=!0:this.isPost=!1},createPost(){let t=this.$refs.xpost.value;this.items.push(t),this.$refs.xpost.value="",this.isPost=!1,console.log(this.items)},likePost(t){let e=t.target;e.classList.contains("liked")?e.className="":e.className="liked"},editPost(t){let e=t.target.parentElement.id,s=this.$refs["row-"+e][0],n=this.$refs["xpost-"+e][0],o=this.$refs["row-"+e][0].innerHTML;"Save"==t.target.innerHTML?(t.target.innerHTML="Edit",s.className="visible",n.className="hidden",this.$refs["row-"+e][0].innerHTML=this.$refs["xpost-"+e][0].value):(t.target.innerHTML="Save",s.className="hidden",n.className="visible",this.$refs["xpost-"+e][0].value=o)},deletePost(t){let e=t.target.parentElement.id;this.items.splice(e,1)}},mounted(){this.isPost=""!=this.$refs.xpost.value}},P=s(6262);const m=(0,P.A)(k,[["render",v]]);var b=m;const x={class:"hello"};function g(t,e,s,n,r,i){return(0,o.uX)(),(0,o.CE)("div",x,e[0]||(e[0]=[(0,o.Lk)("h1",null,"X",-1)]))}var L={name:"XPost"};const w=(0,P.A)(L,[["render",g],["__scopeId","data-v-2a1c9fb6"]]);var C=w,X={name:"App",components:{XHeader:C,XPost:b}};const E=(0,P.A)(X,[["render",r]]);var O=E;(0,n.Ef)(O).mount("#app")}},e={};function s(n){var o=e[n];if(void 0!==o)return o.exports;var r=e[n]={exports:{}};return t[n].call(r.exports,r,r.exports,s),r.exports}s.m=t,function(){var t=[];s.O=function(e,n,o,r){if(!n){var i=1/0;for(u=0;u<t.length;u++){n=t[u][0],o=t[u][1],r=t[u][2];for(var a=!0,l=0;l<n.length;l++)(!1&r||i>=r)&&Object.keys(s.O).every((function(t){return s.O[t](n[l])}))?n.splice(l--,1):(a=!1,r<i&&(i=r));if(a){t.splice(u--,1);var c=o();void 0!==c&&(e=c)}}return e}r=r||0;for(var u=t.length;u>0&&t[u-1][2]>r;u--)t[u]=t[u-1];t[u]=[n,o,r]}}(),function(){s.d=function(t,e){for(var n in e)s.o(e,n)&&!s.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={524:0};s.O.j=function(e){return 0===t[e]};var e=function(e,n){var o,r,i=n[0],a=n[1],l=n[2],c=0;if(i.some((function(e){return 0!==t[e]}))){for(o in a)s.o(a,o)&&(s.m[o]=a[o]);if(l)var u=l(s)}for(e&&e(n);c<i.length;c++)r=i[c],s.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return s.O(u)},n=self["webpackChunkzenart_assessment"]=self["webpackChunkzenart_assessment"]||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))}();var n=s.O(void 0,[504],(function(){return s(5034)}));n=s.O(n)})();
//# sourceMappingURL=app.ce33dbf5.js.map