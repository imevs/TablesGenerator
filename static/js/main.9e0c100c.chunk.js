(this.webpackJsonpTableGenerator=this.webpackJsonpTableGenerator||[]).push([[0],{21:function(e,t,a){},23:function(e,t,a){"use strict";a.r(t);var n=a(3),o=a.n(n),l=a(13),c=a.n(l),i=(a(21),a(15)),s=a(10),r=a(11),b=a(16),d=a(14),u=a(1),m=a(6),j=a(5),v=a.n(j),_=a(0),O=["Riga","Cesis","Daugavpils"];function p(e,t){var a=Object(n.useState)(e),o=Object(m.a)(a,2),l=o[0],c=o[1],i=Object(n.useCallback)((function(e){c(e.target.value)}),[]),s=Object(n.useCallback)((function(){j("")}),[]),r=Object(n.useCallback)((function(){j(t+" (is required field)")}),[t]),b=Object(n.useState)(t),d=Object(m.a)(b,2),u=d[0],j=d[1];return[l,i,Object(n.useCallback)((function(){j(t),c(e)}),[t,e]),u,s,r]}function h(e){var t,a,o,l,c,i,s,r,b=p(null!==(t=null===(a=e.data)||void 0===a?void 0:a.name)&&void 0!==t?t:"","Name"),d=Object(m.a)(b,6),u=d[0],j=d[1],h=d[2],f=d[3],g=d[4],T=d[5],x=p(null!==(o=null===(l=e.data)||void 0===l?void 0:l.surname)&&void 0!==o?o:"","Surname"),R=Object(m.a)(x,6),y=R[0],C=R[1],k=R[2],w=R[3],I=R[4],S=R[5],N=p(null!==(c=null===(i=e.data)||void 0===i?void 0:i.age)&&void 0!==c?c:"","Age"),A=Object(m.a)(N,6),D=A[0],P=A[1],E=A[2],F=A[3],q=A[4],B=A[5],J=p(null!==(s=null===(r=e.data)||void 0===r?void 0:r.city)&&void 0!==s?s:"","City"),G=Object(m.a)(J,6),H=G[0],L=G[1],W=G[2],M=G[3],U=G[4],K=G[5],Y=[u,y,D,H].every((function(e){return""!==e})),z=Object(n.useState)(!1),Q=Object(m.a)(z,2),X=Q[0],Z=Q[1],V=Object(n.useCallback)((function(t){e.needConfirmation&&!X?Z(!0):(Z(!1),e.onSave({name:u.trim(),surname:y.trim(),age:"string"===typeof D?""===D?0:parseFloat(D):D,city:H.trim(),isRemoved:!1}),h(),k(),E(),W()),t.preventDefault()}),[u,y,D,H,X,E,W,h,k,e]);return Object(_.jsxs)("form",{className:v.a.fillingForm,onSubmit:V,children:[Object(_.jsx)("p",{children:Object(_.jsx)("input",{className:v.a.formElement,placeholder:f,type:"text",value:u,minLength:1,required:!0,onChange:j,onFocus:g,onBlur:T})}),Object(_.jsx)("p",{children:Object(_.jsx)("input",{className:v.a.formElement,placeholder:w,type:"text",value:y,minLength:1,required:!0,onChange:C,onFocus:I,onBlur:S})}),Object(_.jsx)("p",{children:Object(_.jsx)("input",{className:v.a.formElement,placeholder:F,type:"number",value:D,required:!0,min:0,onChange:P,onFocus:q,onBlur:B})}),Object(_.jsxs)("p",{children:[Object(_.jsx)("input",{className:v.a.formElement,required:!0,value:H,onChange:L,placeholder:M,list:"citiesList",onFocus:U,onBlur:K}),Object(_.jsx)("datalist",{id:"citiesList",children:O.map((function(e){return Object(_.jsx)("option",{value:e,children:e},e)}))})]}),X?Object(_.jsx)("button",{className:v.a.confirmButton,type:"submit",disabled:!Y,children:"Agree"}):Object(_.jsx)("button",{className:v.a.submitButton,type:"submit",disabled:!Y,children:e.data?"Update":"Add"})]})}function f(e){return e.data?Object(_.jsx)("div",{className:v.a.popup,children:Object(_.jsx)(h,Object(u.a)(Object(u.a)({},e),{},{needConfirmation:!0}))}):null}var g,T=a(2),x=a(4),R=a.n(x),y="0";function C(e){var t=Object.keys(e.data),a=Math.abs(10-t.length),n=new Array(a).fill(0).map((function(e,t){return String(t)}));return Object(_.jsxs)("div",{className:R.a.tableContainer,children:[Object(_.jsxs)("div",{className:R.a.tableHeader,children:[Object(_.jsx)("button",{className:R.a.tableHeader__button_copy,onClick:function(){return e.copyTable(e.tableIndex)},children:"Copy table"}),e.tableIndex!==y&&Object(_.jsx)("button",{title:"Remove table",className:R.a.tableHeader__button_remove,onClick:function(){return e.removeTable(e.tableIndex)},children:"X"})]}),Object(_.jsxs)("table",{className:R.a.tableContent,children:[Object(_.jsx)("thead",{children:Object(_.jsxs)("tr",{className:R.a.tableContent__header,children:[Object(_.jsx)("th",{children:"Name"}),Object(_.jsx)("th",{children:"Surname"}),Object(_.jsx)("th",{children:"Age"}),Object(_.jsx)("th",{children:"City"}),Object(_.jsx)("th",{})]})}),Object(_.jsxs)("tbody",{children:[t.map((function(t){var a,n,o,l,c;return Object(_.jsxs)("tr",{className:(e.activeRecord===t?R.a.tableContent__row_selected:"")+(null!==(a=e.data[t])&&void 0!==a&&a.isRemoved?R.a.tableContent__row_removed:""),children:[Object(_.jsx)("td",{children:null===(n=e.data[t])||void 0===n?void 0:n.name}),Object(_.jsx)("td",{children:null===(o=e.data[t])||void 0===o?void 0:o.surname}),Object(_.jsx)("td",{children:null===(l=e.data[t])||void 0===l?void 0:l.age}),Object(_.jsx)("td",{children:null===(c=e.data[t])||void 0===c?void 0:c.city}),Object(_.jsxs)("td",{children:[e.data[t]&&e.data[t].isRemoved&&Object(_.jsx)("button",{className:R.a.tableContent__link+" "+R.a.tableContent__link_blue,onClick:function(){return e.cancelRemovingRow(e.tableIndex,t)},children:"Restore (item will be removed in 5s)"}),e.data[t]&&!e.data[t].isRemoved&&Object(_.jsxs)(_.Fragment,{children:[Object(_.jsx)("button",{className:R.a.tableContent__link+" "+R.a.tableContent__link_blue,onClick:function(){return e.editRow(e.tableIndex,t)},children:"Edit"}),Object(_.jsx)("button",{className:R.a.tableContent__link+" "+R.a.tableContent__link_red,onClick:function(){return e.removeRow(e.tableIndex,t)},children:"Delete"})]})]})]},t)})),n.map((function(e){return Object(_.jsxs)("tr",{children:[Object(_.jsx)("td",{}),Object(_.jsx)("td",{}),Object(_.jsx)("td",{}),Object(_.jsx)("td",{}),Object(_.jsx)("td",{})]},"empty"+e)}))]})]})]})}var k=[y,"1637496942500","1637496971989","1637496924975"],w=(g={},Object(T.a)(g,y,{0:{name:"Michael",surname:"Galeota",age:30,city:"Riga"},2:{name:"Jacques",surname:"Galipeau",age:50,city:"Riga"}}),Object(T.a)(g,"1637496942500",{0:{name:"Michael",surname:"Galeota",age:30,city:"Riga"},2:{name:"Jacques",surname:"Galipeau",age:50,city:"Riga"}}),Object(T.a)(g,"1637496971989",{0:{name:"Michael",surname:"Galeota",age:30,city:"Riga"}}),Object(T.a)(g,"1637496924975",{1:{name:"Michael",surname:"Galeota",age:30,city:"Riga"},2:{name:"Don",surname:"Gallagher",age:54,city:"Riga"}}),g),I=function(){function e(){var t=this;Object(s.a)(this,e),this.tables={},this.tableIds=[y],this.copyTable=function(e){var a=t.tables[e];t.updateTablesData(Object(u.a)(Object(u.a)({},t.tables),{},Object(T.a)({},t.genTableId(e),a)))},this.removeTable=function(e){var a=Object(u.a)({},t.tables);delete a[e],t.updateTablesData(a)},this.markAsRemovedRow=function(e,a){var n=t.tables,o=Object(u.a)({},n[e][a]);o.isRemoved=!0,t.updateTablesData(Object(u.a)(Object(u.a)({},n),{},Object(T.a)({},e,Object(u.a)(Object(u.a)({},n[e]),{},Object(T.a)({},a,o)))))},this.removeRow=function(e,a){var n=t.tables,o=Object(u.a)({},n[e]);delete o[a],t.updateTablesData(Object(u.a)(Object(u.a)({},n),{},Object(T.a)({},e,Object(u.a)({},o))))},this.cancelRemovingRow=function(e,a){var n=t.tables,o=Object(u.a)({},n[e][a]);o.isRemoved=!1,t.updateTablesData(Object(u.a)(Object(u.a)({},n),{},Object(T.a)({},e,Object(u.a)(Object(u.a)({},n[e]),{},Object(T.a)({},a,o)))))},this.updatePersonInfo=function(e,a,n){var o=t.tables;a&&n&&t.updateTablesData(Object(u.a)(Object(u.a)({},o),{},Object(T.a)({},a,Object(u.a)(Object(u.a)({},o[a]),{},Object(T.a)({},n,e)))))},this.addPerson=function(e){var a=t.tables;t.updateTablesData(Object(u.a)(Object(u.a)({},a),{},Object(T.a)({},"0",Object(u.a)(Object(u.a)({},a[0]),{},Object(T.a)({},t.getUniqueString(),e)))))}}return Object(r.a)(e,[{key:"subscriber",value:function(e,t){}},{key:"getUniqueString",value:function(){return Date.now().toString()}},{key:"genTableId",value:function(e){var t=this.getUniqueString(),a=this.tableIds.indexOf(e);return this.tableIds.splice(a+1,0,t),t}},{key:"getTableIds",value:function(){var e=this;return this.tableIds.filter((function(t){return void 0!==e.tables[t]}))}},{key:"updateTablesData",value:function(e){this.tables=e,this.subscriber(e,this.tableIds)}},{key:"subscribe",value:function(e){this.subscriber=e}}]),e}(),S=a(7),N=a.n(S),A=function(e){Object(b.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,l=new Array(n),c=0;c<n;c++)l[c]=arguments[c];return(e=t.call.apply(t,[this].concat(l))).state={tables:{},selectedPerson:void 0,selectedRow:void 0,selectedTable:void 0,removedTable:void 0,removingTable:void 0},e.removeTimeoutIds={},e.popupRef=o.a.createRef(),e.store=new I,e.copyTable=function(t){e.store.copyTable(t)},e.removeTable=function(t){e.setState({removingTable:t}),setTimeout((function(){window.confirm("You pressed 'remove' for table. Are you sure?")?(e.setState({removedTable:t}),setTimeout((function(){e.store.removeTable(t),e.setState({removingTable:void 0,removedTable:void 0})}),1e3)):e.setState({removingTable:void 0})}),100)},e.editRow=function(t,a){e.setState({selectedPerson:e.state.tables[t][a],selectedRow:a,selectedTable:t})},e.removeRow=function(t,a){e.store.markAsRemovedRow(t,a),e.removeTimeoutIds[t+"_"+a]=window.setTimeout((function(){e.store.removeRow(t,a)}),5e3)},e.cancelRemovingRow=function(t,a){window.clearInterval(e.removeTimeoutIds[t+"_"+a]),delete e.removeTimeoutIds[t+"_"+a],e.store.cancelRemovingRow(t,a)},e.updatePersonInfo=function(t){e.state.selectedTable&&e.state.selectedRow&&(e.store.updatePersonInfo(t,e.state.selectedTable,e.state.selectedRow),e.clearCurrent())},e.addPerson=function(t){e.store.addPerson(t)},e.handleClickOutsideOfPopup=function(t){e.popupRef.current&&!e.popupRef.current.contains(t.target)&&e.clearCurrent()},e.handleEscape=function(t){"Escape"===t.key&&e.clearCurrent()},e}return Object(r.a)(a,[{key:"updateTablesData",value:function(e,t){this.setState({tables:e}),localStorage.setItem("tablesData",JSON.stringify(e)),localStorage.setItem("tablesPositions",JSON.stringify(t))}},{key:"clearCurrent",value:function(){this.setState({selectedPerson:void 0,selectedRow:void 0,selectedTable:void 0})}},{key:"componentDidMount",value:function(){var e=this;document.addEventListener("click",this.handleClickOutsideOfPopup,!0),document.addEventListener("keyup",this.handleEscape,!0),this.store.subscribe((function(t,a){e.updateTablesData(t,a)}));var t=localStorage.getItem("tablesPositions");try{this.store.tableIds=null!==t?JSON.parse(t):Object(i.a)(k)}catch(n){console.error(n,t)}var a=localStorage.getItem("tablesData");try{null!==a?this.store.updateTablesData(JSON.parse(a)):this.store.updateTablesData(w)}catch(n){console.error(n,a)}}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keyup",this.handleEscape,!0),document.removeEventListener("click",this.handleClickOutsideOfPopup,!0)}},{key:"render",value:function(){var e=this;return Object(_.jsxs)("div",{className:N.a.App,children:[Object(_.jsx)("div",{className:N.a.InputWidget,children:Object(_.jsx)(h,{onSave:this.addPerson})}),this.store.getTableIds().map((function(t){return Object(_.jsx)("div",{className:N.a.TableWidget+(t===e.state.removedTable?" "+N.a.RemovedTable:"")+(t===e.state.removingTable?" "+N.a.RemovingTable:""),children:Object(_.jsx)(C,{activeRecord:t===e.state.selectedTable?e.state.selectedRow:void 0,tableIndex:t,data:e.state.tables[t],copyTable:e.copyTable,removeTable:e.removeTable,editRow:e.editRow,removeRow:e.removeRow,cancelRemovingRow:e.cancelRemovingRow})},t)})),Object(_.jsx)("div",{ref:this.popupRef,children:Object(_.jsx)(f,{onSave:this.updatePersonInfo,data:this.state.selectedPerson})})]})}}]),a}(o.a.Component);c.a.render(Object(_.jsx)(o.a.StrictMode,{children:Object(_.jsx)(A,{})}),document.getElementById("root"))},4:function(e,t,a){e.exports={tableContainer:"Table_tableContainer__2W1O8",tableHeader:"Table_tableHeader__13qib",tableHeader__button_copy:"Table_tableHeader__button_copy__3y7Yx",tableHeader__button_remove:"Table_tableHeader__button_remove__1tjks",tableContent:"Table_tableContent__1SkAc",tableContent__header:"Table_tableContent__header__3ttZ7",tableContent__link:"Table_tableContent__link__3k6Xe",tableContent__row_selected:"Table_tableContent__row_selected__-shi1",tableContent__row_removed:"Table_tableContent__row_removed__2QJBw",rowRemovingKeyframes:"Table_rowRemovingKeyframes__3zaqY",tableContent__link_blue:"Table_tableContent__link_blue__39JwF",tableContent__link_red:"Table_tableContent__link_red__2ROtg"}},5:function(e,t,a){e.exports={fillingForm:"Form_fillingForm__17S72",popup:"Form_popup__k_6JJ",formElement:"Form_formElement__3zCLx",confirmButton:"Form_confirmButton__31o8Y",submitButton:"Form_submitButton__SwjOS"}},7:function(e,t,a){e.exports={App:"App_App__16ZpL",TableWidget:"App_TableWidget__27GmQ",InputWidget:"App_InputWidget__3AHhj",RemovingTable:"App_RemovingTable__1Ayl1",RemovedTable:"App_RemovedTable__3F77U",removeTableKeyframe:"App_removeTableKeyframe__3vImm"}}},[[23,1,2]]]);
//# sourceMappingURL=main.9e0c100c.chunk.js.map