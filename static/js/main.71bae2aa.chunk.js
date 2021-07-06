(this["webpackJsonptools-reactjs"]=this["webpackJsonptools-reactjs"]||[]).push([[0],{29:function(e,t,c){},36:function(e,t,c){"use strict";c.r(t);var a=c(1),n=c.n(a),s=c(18),l=c.n(s),r=(c(28),c(29),c(8)),i=c(0);function j(e){var t=e.text,c=e.url;return Object(i.jsx)(r.c,{to:c,activeClassName:"active",className:"nav-link",children:t})}function d(){return Object(i.jsx)("nav",{className:"navbar navbar-expand-lg navbar-light bg-light",children:Object(i.jsxs)("div",{className:"container",children:[Object(i.jsx)(r.b,{className:"navbar-brand",to:"/",children:"Tools"}),Object(i.jsx)("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(i.jsx)("span",{className:"navbar-toggler-icon"})}),Object(i.jsxs)("div",{className:"collapse navbar-collapse",id:"navbarNav",children:[Object(i.jsxs)("ul",{className:"navbar-nav",children:[Object(i.jsx)(j,{url:"/sip-calculator",text:"SIP Calculator"}),Object(i.jsx)(j,{url:"/multi-line-to-single-line",text:"Multi Line To Single Line"}),Object(i.jsx)(j,{url:"/salary-hike-calculator",text:"Salary Hike Calculator"})]}),Object(i.jsx)("ul",{className:"navbar-nav ml-auto",children:Object(i.jsx)("li",{className:"nav-item dropdown",children:Object(i.jsx)("a",{className:"nav-link",target:"_new",href:"https://github.com/71anshuman",children:"Dev"})})})]})]})})}var o=c(2),b=c(4),u=c(20),m=c(21),h=function(e){return Object(i.jsx)(m.a,{value:Math.round(e,2),displayType:"text",thousandsGroupStyle:"lakh",thousandSeparator:!0,prefix:"\u20b9"})},x=function(e,t){var c=t?"":" ";return e.replace(/\s\s+/g,c).replace(/(?:\r\n|\r|\n)/g," ")};function O(e){var t=e.data,c=Object(a.useState)(!1),n=Object(b.a)(c,2),s=n[0],l=n[1];return Object(i.jsx)("div",{className:"row",children:Object(i.jsxs)("div",{className:"col-md-12",children:[t.length>0&&Object(i.jsxs)("button",{className:"btn btn-light text-uppercase",onClick:function(){return l((function(e){return!e}))},children:[" ",s?"hide table":"Show Detail"]}),s&&Object(i.jsxs)("table",{className:"table table-striped table-hover table-sm scroll",children:[Object(i.jsx)("caption",{className:"text-uppercase text-muted text-center",children:"Investment and Wealth gain Breakup"}),Object(i.jsx)("thead",{children:Object(i.jsxs)("tr",{children:[Object(i.jsx)("th",{children:"Year"}),Object(i.jsx)("th",{children:"Month"}),Object(i.jsx)("th",{children:"Balance@Bigin"}),Object(i.jsx)("th",{children:"Investment"}),Object(i.jsx)("th",{children:"Interest"}),Object(i.jsx)("th",{children:"Balance@End"})]})}),Object(i.jsx)("tbody",{children:t.map((function(e,t){var c=e.year,a=e.month,n=e.initialBalance,s=e.investment,l=e.interest,r=e.balanceAtEndOfMonth;return Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:c}),Object(i.jsx)("td",{children:a}),Object(i.jsx)("td",{children:h(n)}),Object(i.jsx)("td",{children:h(s)}),Object(i.jsx)("td",{children:h(l)}),Object(i.jsx)("td",{children:h(r)})]},t)}))})]})]})})}var p=c(22);function v(e){var t=e.meta,c=t.investmentAmount,a=t.interestAmount;return Object(i.jsx)("div",{children:0!==c&&Object(i.jsx)(p.a,{width:"100%",height:"400px",chartType:"PieChart",loader:Object(i.jsx)("div",{children:"Loading Chart"}),data:[["Amount","INR"],["Invested",c],["Gain",a]],options:{title:"Gain VS Invested",is3D:!0,titleTextStyle:{fontSize:"24px"}},rootProps:{"data-testid":"2"}})})}function N(e){var t=e.meta,c=t.investmentAmount,a=t.interestAmount,n=t.finalBalance;return Object(i.jsx)("div",{className:"col-md-12",children:Object(i.jsx)("div",{className:"jumbotron jumbotron-fluid bg-white border-bottom border-grey",children:Object(i.jsx)("div",{className:"container",children:Object(i.jsxs)("div",{className:"row",children:[Object(i.jsx)("div",{className:"col-md-4",children:Object(i.jsxs)("h4",{children:[Object(i.jsx)("i",{className:"fa fa-bars"}),h(c),Object(i.jsx)("br",{}),Object(i.jsx)("small",{className:"text-muted",children:"INVESTED"})]})}),Object(i.jsx)("div",{className:"col-md-4",children:Object(i.jsxs)("h4",{children:[h(a),Object(i.jsx)("br",{}),Object(i.jsx)("small",{className:"text-muted",children:"GAIN"})]})}),Object(i.jsx)("div",{className:"col-md-4",children:Object(i.jsxs)("h4",{children:[h(n),Object(i.jsx)("br",{}),Object(i.jsx)("small",{className:"text-muted text-uppercase",children:"maturity value"})]})})]})})})})}var g=c(12),f=c(11),y=function(e){var t=Object(a.useState)(e),c=Object(b.a)(t,2),n=c[0],s=c[1];return[n,function(e){var t=e.target,c=t.name,a=t.value;s(Object(f.a)(Object(f.a)({},n),{},Object(g.a)({},c,parseFloat(a))))}]};function S(e){var t=e.name;return Object(i.jsx)("input",Object(f.a)({max:"100",autoComplete:"off",name:t,className:"form-control",type:"number"},e))}var C=new u.Finance;function w(){Object(a.useEffect)((function(){document.title="SIP Calculator"}),[]);var e=y({sipAmount:"",rateOfReturn:"",period:""}),t=Object(b.a)(e,2),c=t[0],n=c.sipAmount,s=c.period,l=c.rateOfReturn,r=t[1],j=Object(a.useState)({investmentAmount:0,interestAmount:0,finalBalance:0}),d=Object(b.a)(j,2),o=d[0],u=d[1],m=Object(a.useState)([]),h=Object(b.a)(m,2),x=h[0],p=h[1];return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("div",{className:"jumbotron jumbotron-fluid",children:Object(i.jsx)("div",{className:"container",children:Object(i.jsxs)("div",{className:"row",children:[Object(i.jsxs)("div",{className:"col-md-8",children:[Object(i.jsx)("h1",{className:"display-6",children:"SIP Calculator"}),Object(i.jsx)("p",{className:"lead",children:"SIP is the best way to accumulate long term wealth."}),Object(i.jsx)("div",{className:"row",children:Object(i.jsx)(N,{meta:o})})]}),Object(i.jsx)("div",{className:"col-md-4",style:{margin:"auto 0",paddingTop:"5rem"},children:Object(i.jsxs)("form",{children:[Object(i.jsx)("div",{className:"form-group",children:Object(i.jsxs)("div",{className:"input-group",children:[Object(i.jsx)("div",{className:"input-group-prepend",children:Object(i.jsx)("span",{className:"input-group-text",children:"\u20b9"})}),Object(i.jsx)(S,{name:"sipAmount",value:n,onChange:r,placeholder:"How much would invest monthly?"})]})}),Object(i.jsx)("div",{className:"form-group",children:Object(i.jsxs)("div",{className:"input-group mb-3",children:[Object(i.jsx)(S,{name:"period",value:s,onChange:r,placeholder:"Investment Period"}),Object(i.jsx)("div",{className:"input-group-append",children:Object(i.jsx)("span",{className:"input-group-text",children:"Years"})})]})}),Object(i.jsx)("div",{className:"form-group",children:Object(i.jsxs)("div",{className:"input-group mb-3",children:[Object(i.jsx)(S,{name:"rateOfReturn",value:l,onChange:r,placeholder:"Expected Annual Returns (%)"}),Object(i.jsx)("div",{className:"input-group-append",children:Object(i.jsx)("span",{className:"input-group-text",children:"%"})})]})}),Object(i.jsx)("div",{className:"form-group",children:Object(i.jsx)("button",{className:"btn btn-block btn-light btn-outline",onClick:function(e){e.preventDefault(),function(){for(var e,t=0,c=0,a=0,r=[],i=1,j=1;j<=12*s;j++){var d=parseInt(j%12);e=0===d?12:d;var o=t+n;a=o*(1+l/100/12);var b=Math.round(C.CI(l/12,1,o,1)-o);c+=b,r.push({year:i,month:e,initialBalance:Math.round(t),investment:n,interest:b,balanceAtEndOfMonth:Math.round(a),totalInterest:c}),t=a,0===d&&i++}p(r);var m=12*s*n;u({investmentAmount:null!==m&&void 0!==m?m:0,period:s,rateOfReturn:l,finalBalance:t,interestAmount:parseInt(t-m)})}()},children:"Calculate"})})]})})]})})}),Object(i.jsxs)("div",{className:"row",children:[Object(i.jsx)("div",{className:"col-md-4",children:Object(i.jsx)(v,{meta:o})}),Object(i.jsx)("div",{className:"col-md-8",children:x&&Object(i.jsx)(O,{data:x})})]})]})}function I(){Object(a.useEffect)((function(){document.title="Multi Line To Single Line text converter"}),[]);var e=Object(a.useState)(""),t=Object(b.a)(e,2),c=t[0],n=t[1];return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("div",{className:"jumbotron jumbotron-fluid",children:Object(i.jsx)("div",{className:"container",children:Object(i.jsx)("div",{className:"row",children:Object(i.jsxs)("div",{className:"col-md-8",children:[Object(i.jsx)("h1",{className:"display-6",children:"Multi Line To Single Line text conveter"}),Object(i.jsx)("p",{className:"lead",children:"You can convert multiner text to single line."})]})})})}),Object(i.jsxs)("div",{className:"row",children:[Object(i.jsx)("div",{className:"col-md-6",children:Object(i.jsx)("form",{children:Object(i.jsxs)("div",{className:"form-group",children:[Object(i.jsx)("label",{for:"multiLineText",children:"Type/Paste multiliner text"}),Object(i.jsx)("textarea",{rows:"16",className:"form-control","aria-label":"With textarea",name:"multiLineText",onChange:function(e){return n(e.target.value)}})]})})}),Object(i.jsx)("div",{className:"col-md-6",children:Object(i.jsxs)("div",{className:"form-group",children:[Object(i.jsx)("label",{className:"",children:"Converted text"}),Object(i.jsx)("textarea",{rows:"16",className:"form-control",value:x(c,!0)})]})})]})]})}function k(){Object(a.useEffect)((function(){document.title="Salary Hike Percentage Calculator"}),[]);var e=y({currentSalary:0,perIncrement:0}),t=Object(b.a)(e,2),c=t[0],n=c.currentSalary,s=c.perIncrement,l=t[1],r=Object(a.useState)(void 0),j=Object(b.a)(r,2),d=j[0],o=j[1];return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("div",{className:"jumbotron jumbotron-fluid",children:Object(i.jsx)("div",{className:"container",children:Object(i.jsxs)("div",{className:"row",children:[Object(i.jsxs)("div",{className:"col-md-8",children:[Object(i.jsx)("h1",{className:"display-6",children:"Salary Hike Calculator"}),Object(i.jsx)("hr",{}),Object(i.jsx)("div",{className:"row",children:Object(i.jsx)("div",{className:"col-12",children:d&&Object(i.jsxs)("h2",{children:[Object(i.jsx)("small",{children:Object(i.jsx)("em",{children:"Your new Salary is:"})}),Object(i.jsx)("span",{className:"text-muted",children:h(d)})]})})})]}),Object(i.jsx)("div",{className:"col-md-4 bg-white",style:{margin:"auto 0",paddingTop:"1rem"},children:Object(i.jsxs)("form",{children:[Object(i.jsx)("div",{className:"form-group",children:Object(i.jsxs)("div",{className:"input-group",children:[Object(i.jsx)("div",{className:"input-group-prepend",children:Object(i.jsx)("span",{className:"input-group-text",children:"\u20b9"})}),Object(i.jsx)(S,{name:"currentSalary",value:n,onChange:l,placeholder:"Current Salary"})]})}),Object(i.jsx)("div",{className:"form-group",children:Object(i.jsxs)("div",{className:"input-group mb-3",children:[Object(i.jsx)(S,{name:"perIncrement",value:s.toFixed(2),onChange:l,placeholder:"Percentage incremented"}),Object(i.jsx)("div",{className:"input-group-append",children:Object(i.jsx)("span",{className:"input-group-text",children:"%"})})]})}),Object(i.jsx)("div",{className:"form-group",children:Object(i.jsx)("button",{className:"btn btn-block btn-light btn-outline",onClick:function(e){e.preventDefault(),o(n*s/100+n)},children:"Calculate"})})]})})]})})}),Object(i.jsx)("div",{className:"jumbotron jumbotron-fluid",children:Object(i.jsx)("div",{className:"container",children:Object(i.jsxs)("div",{className:"row",children:[Object(i.jsxs)("div",{className:"col-md-8",children:[Object(i.jsx)("h1",{className:"display-6",children:"Salary Percentage Hike Calculator"}),Object(i.jsx)("hr",{}),Object(i.jsx)("div",{className:"row",children:Object(i.jsx)("div",{className:"col-12",children:s&&Object(i.jsxs)("h2",{children:[Object(i.jsx)("small",{children:Object(i.jsx)("em",{children:"Your salary hike percentage is:"})}),Object(i.jsxs)("span",{className:"text-muted",children:[s.toFixed(2),"%"]})]})})})]}),Object(i.jsx)("div",{className:"col-md-4 bg-white",style:{margin:"auto 0",paddingTop:"1rem"},children:Object(i.jsxs)("form",{children:[Object(i.jsx)("div",{className:"form-group",children:Object(i.jsxs)("div",{className:"input-group",children:[Object(i.jsx)("div",{className:"input-group-prepend",children:Object(i.jsx)("span",{className:"input-group-text",children:"\u20b9"})}),Object(i.jsx)(S,{name:"currentSalary",value:n,onChange:l,placeholder:"Current Salary"})]})}),Object(i.jsx)("div",{className:"form-group",children:Object(i.jsxs)("div",{className:"input-group mb-3",children:[Object(i.jsx)("div",{className:"input-group-prepend",children:Object(i.jsx)("span",{className:"input-group-text",children:"\u20b9"})}),Object(i.jsx)(S,{name:"newSalary",value:d,onChange:function(e){return o(e.target.value)},placeholder:"New salary"})]})}),Object(i.jsx)("div",{className:"form-group",children:Object(i.jsx)("button",{className:"btn btn-block btn-light btn-outline",onClick:function(e){e.preventDefault(),l({target:{name:"perIncrement",value:(d-n)/n*100}})},children:"Calculate"})})]})})]})})})]})}var T=function(){return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(d,{}),Object(i.jsx)("div",{className:"container-fluid",children:Object(i.jsxs)(o.c,{children:[Object(i.jsx)(o.a,{exact:!0,path:"/",children:Object(i.jsx)(w,{})}),Object(i.jsx)(o.a,{path:"/sip-calculator",children:Object(i.jsx)(w,{})}),Object(i.jsx)(o.a,{path:"/multi-line-to-single-line",children:Object(i.jsx)(I,{})}),Object(i.jsx)(o.a,{path:"/salary-hike-calculator",children:Object(i.jsx)(k,{})})]})})]})},A=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,37)).then((function(t){var c=t.getCLS,a=t.getFID,n=t.getFCP,s=t.getLCP,l=t.getTTFB;c(e),a(e),n(e),s(e),l(e)}))};l.a.render(Object(i.jsx)(n.a.StrictMode,{children:Object(i.jsx)(r.a,{children:Object(i.jsx)(T,{})})}),document.getElementById("root")),A()}},[[36,1,2]]]);
//# sourceMappingURL=main.71bae2aa.chunk.js.map