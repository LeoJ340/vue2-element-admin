(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-398334ea"],{3070:function(e,t,n){},"31c1":function(e,t,n){},"337f":function(e,t,n){"use strict";n("31c1")},"371d":function(e,t,n){"use strict";n.r(t);var i,o,u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("From",{attrs:{inputs:e.inputs,buttons:e.buttons},on:{onClick:e.onClick,onChange:e.onChange}})],1)},a=[],l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:["v-from",e.inline?"inline":""]},[n("div",{staticClass:"input-items"},e._l(e.inputs,(function(t){return n("InputItem",{key:t.label,attrs:{"input-item":t,value:e.value},on:{change:e.onChange}})})),1),n("BtnGroup",{attrs:{configs:e.buttons},on:{onClick:e.onClick}})],1)},r=[],c=(n("d81d"),n("b0c0"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"btn-group"},e._l(e.buttons,(function(t){return n("el-button",{key:t.name,attrs:{size:t.size,type:t.type,icon:t.icon},on:{click:function(n){return e.onClick(t.name)}}},[e._v(" "+e._s(t.text)+" ")])})),1)}),s=[],p=(n("d3b7"),n("159b"),n("4de4"),{reset:{name:"reset",icon:"el-icon-refresh-left",text:"重置"},query:{name:"query",type:"primary",icon:"el-icon-search",text:"查询"},download:{name:"download",type:"primary",icon:"el-icon-download",text:"下载"},delete:{name:"delete",type:"danger",icon:"el-icon-delete",text:"删除"}}),f={inject:["globalSize"],props:{configs:{type:Array,default:function(){return[]},validator:function(e){return e.forEach((function(e){if(!e.name)throw Error("button config need name");if(!e.text)throw Error("button config need text")})),!0}}},computed:{buttons:function(){var e=this;return this.configs.filter((function(e){return e.name})).map((function(t){return t.type=t.type||(p[t.name]?p[t.name].type:"default"),t.icon=t.icon||(p[t.name]?p[t.name].icon:""),t.size=t.size||e.globalSize,t}))}},methods:{onClick:function(e){this.$emit("onClick",e)}}},d=f,m=(n("337f"),n("2877")),b=Object(m["a"])(d,c,s,!1,null,"2cfb2c9e",null),h=b.exports,v=(n("b64b"),n("a630"),n("3ca3"),{inject:["globalSize"],props:{inputItem:{required:!0,type:Object},value:{type:Object,default:function(){}}},data:function(){return{inputValue:""}},computed:{size:function(){return this.inputItem.size||this.globalSize}},watch:{value:function(e){var t=this;Object.keys(e).forEach((function(n){t.inputItem.name===n&&(t.inputValue=e[n])}))}},render:function(e){var t=this,n=[];return"select"===t.inputItem.type&&(n=Array.isArray(Array.from(t.inputItem.options))?t.inputItem.options.map((function(t){return e("el-option",{props:{label:t.label,value:t.value}})})):[]),e("div",{class:"input-item"},[e("label",t.inputItem.label),e("el-".concat(t.inputItem.type),{style:{width:"auto"},props:{value:t.inputValue,size:t.size,clearable:!0,filterable:!0,disabled:t.inputItem.disabled},attrs:{placeholder:t.inputItem.placeholder},on:{input:function(e){t.inputValue=e,t.$emit("change",t.inputItem.name,e)}},nativeOn:{keyup:function(e){13===e.keyCode&&t.$emit("enter",t.inputItem.name)}}},n.length?n:void 0)])}}),y=v,g=(n("7b7d"),Object(m["a"])(y,i,o,!1,null,"67420fe4",null)),C=g.exports,z={name:"From",components:{BtnGroup:h,InputItem:C},provide:function(){return{globalSize:this.size}},props:{size:{type:String,default:"small"},inline:{type:Boolean,default:!1},inputs:{type:Array,default:function(){return[]}},buttons:{type:Array,default:function(){return[]}}},data:function(){return{value:{}}},methods:{onChange:function(e,t){this.value[e]=t,this.$emit("onChange",this.value)},onClick:function(e){if("reset"===e)return this.reset(),void this.$emit("onChange",this.value);this.$emit("onClick",e,this.value)},reset:function(){var e=this.inputs,t={};e.map((function(e){t[e.name]=""})),this.value=t}}},k=z,I=(n("6165"),Object(m["a"])(k,l,r,!1,null,"64be546e",null)),x=I.exports;function w(e){var t=e.name,n=e.label,i=e.size,o=e.placeholder,u=void 0===o?"请输入":o,a=e.disabled,l=e.enterButton;return{type:"input",name:t,label:n,size:i,placeholder:u,disabled:a,enterButton:l}}function O(e){var t=e.name,n=e.label,i=e.size,o=e.options,u=e.type,a=void 0===u?"select":u,l=e.placeholder,r=void 0===l?"请选择":l,c=e.disabled;return{type:a,name:t,label:n,size:i,options:o,placeholder:r,disabled:c}}function S(e){var t=e.name,n=e.type,i=e.text,o=e.icon,u=e.size,a=void 0===u?"small":u;return{name:t,type:n,text:i,icon:o,size:a}}var _={input:w,select:O,button:S},j={builder:_,BUTTONS:p},B={components:{From:x},data:function(){return{}},computed:{inputs:function(){return[j.builder.input({name:"name",label:"姓名"}),j.builder.select({name:"sex",label:"性别",options:[{label:"男",value:"1"},{label:"女",value:"2"}]})]},buttons:function(){return[j.BUTTONS.reset,j.BUTTONS.query,j.BUTTONS.delete]}},methods:{onClick:function(e,t){console.log(e,t)},onChange:function(e){console.log("onChange",e)}}},$=B,T=(n("c9c3"),Object(m["a"])($,u,a,!1,null,"76788e77",null));t["default"]=T.exports},6165:function(e,t,n){"use strict";n("6c6f")},"6c6f":function(e,t,n){},"7b7d":function(e,t,n){"use strict";n("3070")},c9c3:function(e,t,n){"use strict";n("d0a8")},d0a8:function(e,t,n){}}]);