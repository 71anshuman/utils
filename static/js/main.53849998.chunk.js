(this["webpackJsonptools-reactjs"]=this["webpackJsonptools-reactjs"]||[]).push([[0],{30:function(e,t,a){},40:function(e,t,a){"use strict";a.r(t);var c=a(1),s=a.n(c),n=a(18),r=a.n(n),l=(a(29),a(30),a(8)),i=a(0);function j(e){var t=e.text,a=e.url;return Object(i.jsx)(l.c,{to:a,activeClassName:"active",className:"nav-link",children:t})}function d(){return Object(i.jsx)("nav",{className:"navbar navbar-expand-lg navbar-light bg-light",children:Object(i.jsxs)("div",{className:"container",children:[Object(i.jsx)(l.b,{className:"navbar-brand",to:"/",children:"Tools"}),Object(i.jsx)("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(i.jsx)("span",{className:"navbar-toggler-icon"})}),Object(i.jsxs)("div",{className:"collapse navbar-collapse",id:"navbarNav",children:[Object(i.jsxs)("ul",{className:"navbar-nav",children:[Object(i.jsx)(j,{url:"/sip-calculator",text:"SIP Calculator"}),Object(i.jsx)(j,{url:"/multi-line-to-single-line",text:"Multi Line To Single Line"}),Object(i.jsx)(j,{url:"/salary-hike-calculator",text:"Salary Hike Calculator"}),Object(i.jsx)(j,{url:"/password-generator",text:"Password Generator"})]}),Object(i.jsx)("ul",{className:"navbar-nav ml-auto",children:Object(i.jsx)("li",{className:"nav-item dropdown",children:Object(i.jsx)("a",{className:"nav-link",target:"_new",href:"https://github.com/71anshuman",children:"Dev"})})})]})]})})}var o=a(2),b=a(4),u=a(20),m=a(21),h=function(e){return Object(i.jsx)(m.a,{value:Math.round(e,2),displayType:"text",thousandsGroupStyle:"lakh",thousandSeparator:!0,prefix:"\u20b9"})},x=function(e,t){var a=t?"":" ";return e.replace(/\s\s+/g,a).replace(/(?:\r\n|\r|\n)/g," ")},O="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",p="0123456789",v="!@#$%^&*_-+=",N=function(e,t){for(var a="",c=0;c<e;c++)a+=t.charAt(Math.floor(Math.random()*t.length));return a};function g(e){var t=e.data,a=Object(c.useState)(!1),s=Object(b.a)(a,2),n=s[0],r=s[1];return Object(i.jsx)("div",{className:"row",children:Object(i.jsxs)("div",{className:"col-md-12",children:[t.length>0&&Object(i.jsxs)("button",{className:"btn btn-light text-uppercase",onClick:function(){return r((function(e){return!e}))},children:[" ",n?"hide table":"Show Detail"]}),n&&Object(i.jsxs)("table",{className:"table table-striped table-hover table-sm scroll",children:[Object(i.jsx)("caption",{className:"text-uppercase text-muted text-center",children:"Investment and Wealth gain Breakup"}),Object(i.jsx)("thead",{children:Object(i.jsxs)("tr",{children:[Object(i.jsx)("th",{children:"Year"}),Object(i.jsx)("th",{children:"Month"}),Object(i.jsx)("th",{children:"Balance@Bigin"}),Object(i.jsx)("th",{children:"Investment"}),Object(i.jsx)("th",{children:"Interest"}),Object(i.jsx)("th",{children:"Balance@End"})]})}),Object(i.jsx)("tbody",{children:t.map((function(e,t){var a=e.year,c=e.month,s=e.initialBalance,n=e.investment,r=e.interest,l=e.balanceAtEndOfMonth;return Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:a}),Object(i.jsx)("td",{children:c}),Object(i.jsx)("td",{children:h(s)}),Object(i.jsx)("td",{children:h(n)}),Object(i.jsx)("td",{children:h(r)}),Object(i.jsx)("td",{children:h(l)})]},t)}))})]})]})})}var f=a(22);function y(e){var t=e.meta,a=t.investmentAmount,c=t.interestAmount;return Object(i.jsx)("div",{children:0!==a&&Object(i.jsx)(f.a,{width:"100%",height:"400px",chartType:"PieChart",loader:Object(i.jsx)("div",{children:"Loading Chart"}),data:[["Amount","INR"],["Invested",a],["Gain",c]],options:{title:"Gain VS Invested",is3D:!0,titleTextStyle:{fontSize:"24px"}},rootProps:{"data-testid":"2"}})})}function w(e){var t=e.meta,a=t.investmentAmount,c=t.interestAmount,s=t.finalBalance;return Object(i.jsx)("div",{className:"col-md-12",children:Object(i.jsx)("div",{className:"jumbotron jumbotron-fluid bg-white border-bottom border-grey",children:Object(i.jsx)("div",{className:"container",children:Object(i.jsxs)("div",{className:"row",children:[Object(i.jsx)("div",{className:"col-md-4",children:Object(i.jsxs)("h4",{children:[Object(i.jsx)("i",{className:"fa fa-bars"}),h(a),Object(i.jsx)("br",{}),Object(i.jsx)("small",{className:"text-muted",children:"INVESTED"})]})}),Object(i.jsx)("div",{className:"col-md-4",children:Object(i.jsxs)("h4",{children:[h(c),Object(i.jsx)("br",{}),Object(i.jsx)("small",{className:"text-muted",children:"GAIN"})]})}),Object(i.jsx)("div",{className:"col-md-4",children:Object(i.jsxs)("h4",{children:[h(s),Object(i.jsx)("br",{}),Object(i.jsx)("small",{className:"text-muted text-uppercase",children:"maturity value"})]})})]})})})})}var C=a(12),S=a(11),k=function(e){var t=Object(c.useState)(e),a=Object(b.a)(t,2),s=a[0],n=a[1];return[s,function(e){var t=e.target,a=t.name,c=t.value;n(Object(S.a)(Object(S.a)({},s),{},Object(C.a)({},a,parseFloat(c))))}]};function I(e){var t=e.name;return Object(i.jsx)("input",Object(S.a)({max:"100",autoComplete:"off",name:t,className:"form-control",type:"number"},e))}var P=new u.Finance;function T(){Object(c.useEffect)((function(){document.title="SIP Calculator"}),[]);var e=k({sipAmount:"",rateOfReturn:"",period:""}),t=Object(b.a)(e,2),a=t[0],s=a.sipAmount,n=a.period,r=a.rateOfReturn,l=t[1],j=Object(c.useState)({investmentAmount:0,interestAmount:0,finalBalance:0}),d=Object(b.a)(j,2),o=d[0],u=d[1],m=Object(c.useState)([]),h=Object(b.a)(m,2),x=h[0],O=h[1];return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("div",{className:"jumbotron jumbotron-fluid",children:Object(i.jsx)("div",{className:"container",children:Object(i.jsxs)("div",{className:"row",children:[Object(i.jsxs)("div",{className:"col-md-8",children:[Object(i.jsx)("h1",{className:"display-6",children:"SIP Calculator"}),Object(i.jsx)("p",{className:"lead",children:"SIP is the best way to accumulate long term wealth."}),Object(i.jsx)("div",{className:"row",children:Object(i.jsx)(w,{meta:o})})]}),Object(i.jsx)("div",{className:"col-md-4",style:{margin:"auto 0",paddingTop:"5rem"},children:Object(i.jsxs)("form",{children:[Object(i.jsx)("div",{className:"form-group",children:Object(i.jsxs)("div",{className:"input-group",children:[Object(i.jsx)("div",{className:"input-group-prepend",children:Object(i.jsx)("span",{className:"input-group-text",children:"\u20b9"})}),Object(i.jsx)(I,{name:"sipAmount",value:s,onChange:l,placeholder:"How much would invest monthly?"})]})}),Object(i.jsx)("div",{className:"form-group",children:Object(i.jsxs)("div",{className:"input-group mb-3",children:[Object(i.jsx)(I,{name:"period",value:n,onChange:l,placeholder:"Investment Period"}),Object(i.jsx)("div",{className:"input-group-append",children:Object(i.jsx)("span",{className:"input-group-text",children:"Years"})})]})}),Object(i.jsx)("div",{className:"form-group",children:Object(i.jsxs)("div",{className:"input-group mb-3",children:[Object(i.jsx)(I,{name:"rateOfReturn",value:r,onChange:l,placeholder:"Expected Annual Returns (%)"}),Object(i.jsx)("div",{className:"input-group-append",children:Object(i.jsx)("span",{className:"input-group-text",children:"%"})})]})}),Object(i.jsx)("div",{className:"form-group",children:Object(i.jsx)("button",{className:"btn btn-block btn-light btn-outline",onClick:function(e){e.preventDefault(),function(){for(var e,t=0,a=0,c=0,l=[],i=1,j=1;j<=12*n;j++){var d=parseInt(j%12);e=0===d?12:d;var o=t+s;c=o*(1+r/100/12);var b=Math.round(P.CI(r/12,1,o,1)-o);a+=b,l.push({year:i,month:e,initialBalance:Math.round(t),investment:s,interest:b,balanceAtEndOfMonth:Math.round(c),totalInterest:a}),t=c,0===d&&i++}O(l);var m=12*n*s;u({investmentAmount:null!==m&&void 0!==m?m:0,period:n,rateOfReturn:r,finalBalance:t,interestAmount:parseInt(t-m)})}()},children:"Calculate"})})]})})]})})}),Object(i.jsxs)("div",{className:"row",children:[Object(i.jsx)("div",{className:"col-md-4",children:Object(i.jsx)(y,{meta:o})}),Object(i.jsx)("div",{className:"col-md-8",children:x&&Object(i.jsx)(g,{data:x})})]})]})}function A(){Object(c.useEffect)((function(){document.title="Multi Line To Single Line text converter"}),[]);var e=Object(c.useState)(""),t=Object(b.a)(e,2),a=t[0],s=t[1];return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("div",{className:"jumbotron jumbotron-fluid",children:Object(i.jsx)("div",{className:"container",children:Object(i.jsx)("div",{className:"row",children:Object(i.jsxs)("div",{className:"col-md-8",children:[Object(i.jsx)("h1",{className:"display-6",children:"Multi Line To Single Line text conveter"}),Object(i.jsx)("p",{className:"lead",children:"You can convert multiner text to single line."})]})})})}),Object(i.jsxs)("div",{className:"row",children:[Object(i.jsx)("div",{className:"col-md-6",children:Object(i.jsx)("form",{children:Object(i.jsxs)("div",{className:"form-group",children:[Object(i.jsx)("label",{for:"multiLineText",children:"Type/Paste multiliner text"}),Object(i.jsx)("textarea",{rows:"16",className:"form-control","aria-label":"With textarea",name:"multiLineText",onChange:function(e){return s(e.target.value)}})]})})}),Object(i.jsx)("div",{className:"col-md-6",children:Object(i.jsxs)("div",{className:"form-group",children:[Object(i.jsx)("label",{className:"",children:"Converted text"}),Object(i.jsx)("textarea",{rows:"16",className:"form-control",value:x(a,!0)})]})})]})]})}function L(){Object(c.useEffect)((function(){document.title="Salary Hike Percentage Calculator"}),[]);var e=k({currentSalary:0,perIncrement:0}),t=Object(b.a)(e,2),a=t[0],s=a.currentSalary,n=a.perIncrement,r=t[1],l=Object(c.useState)(0),j=Object(b.a)(l,2),d=j[0],o=j[1];return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("div",{className:"jumbotron jumbotron-fluid",children:Object(i.jsx)("div",{className:"container",children:Object(i.jsxs)("div",{className:"row",children:[Object(i.jsxs)("div",{className:"col-md-8",children:[Object(i.jsx)("h1",{className:"display-6",children:"Salary Hike Calculator"}),Object(i.jsx)("hr",{}),Object(i.jsx)("div",{className:"row",children:Object(i.jsx)("div",{className:"col-12",children:d>0&&Object(i.jsxs)("h2",{children:[Object(i.jsx)("small",{children:Object(i.jsx)("em",{children:"Your new Salary is:"})}),Object(i.jsx)("span",{className:"text-muted",children:h(d)})]})})})]}),Object(i.jsx)("div",{className:"col-md-4 bg-white",style:{margin:"auto 0",paddingTop:"1rem"},children:Object(i.jsxs)("form",{children:[Object(i.jsxs)("div",{className:"form-group",children:[Object(i.jsx)("label",{children:"Current Salary"}),Object(i.jsxs)("div",{className:"input-group",children:[Object(i.jsx)("div",{className:"input-group-prepend",children:Object(i.jsx)("span",{className:"input-group-text",children:"\u20b9"})}),Object(i.jsx)(I,{name:"currentSalary",value:s,onChange:r,placeholder:"Current Salary"})]})]}),Object(i.jsxs)("div",{className:"form-group",children:[Object(i.jsx)("label",{children:"Hike Percentage"}),Object(i.jsxs)("div",{className:"input-group mb-3",children:[Object(i.jsx)(I,{name:"perIncrement",value:n.toFixed(2),onChange:r,placeholder:"Percentage incremented"}),Object(i.jsx)("div",{className:"input-group-append",children:Object(i.jsx)("span",{className:"input-group-text",children:"%"})})]})]}),Object(i.jsx)("div",{className:"form-group",children:Object(i.jsx)("button",{className:"btn btn-block btn-dark btn-outline",onClick:function(e){e.preventDefault(),o(s*n/100+s)},children:"Calculate"})})]})})]})})}),Object(i.jsx)("div",{className:"jumbotron jumbotron-fluid",children:Object(i.jsx)("div",{className:"container",children:Object(i.jsxs)("div",{className:"row",children:[Object(i.jsxs)("div",{className:"col-md-8",children:[Object(i.jsx)("h1",{className:"display-6",children:"Salary Percentage Hike Calculator"}),Object(i.jsx)("hr",{}),Object(i.jsx)("div",{className:"row",children:Object(i.jsx)("div",{className:"col-12",children:n>0&&Object(i.jsxs)("h2",{children:[Object(i.jsx)("small",{children:Object(i.jsx)("em",{children:"Your salary hike percentage is:"})}),Object(i.jsxs)("span",{className:"text-muted",children:[n.toFixed(2),"%"]})]})})})]}),Object(i.jsx)("div",{className:"col-md-4 bg-white",style:{margin:"auto 0",paddingTop:"1rem"},children:Object(i.jsxs)("form",{children:[Object(i.jsxs)("div",{className:"form-group",children:[Object(i.jsx)("label",{children:"Current Salary"}),Object(i.jsxs)("div",{className:"input-group",children:[Object(i.jsx)("div",{className:"input-group-prepend",children:Object(i.jsx)("span",{className:"input-group-text",children:"\u20b9"})}),Object(i.jsx)(I,{name:"currentSalary",value:s,onChange:r,placeholder:"Current Salary"})]})]}),Object(i.jsxs)("div",{className:"form-group",children:[Object(i.jsx)("label",{children:"New Salary"}),Object(i.jsxs)("div",{className:"input-group mb-3",children:[Object(i.jsx)("div",{className:"input-group-prepend",children:Object(i.jsx)("span",{className:"input-group-text",children:"\u20b9"})}),Object(i.jsx)(I,{name:"newSalary",value:d,onChange:function(e){return o(e.target.value)},placeholder:"New salary"})]})]}),Object(i.jsx)("div",{className:"form-group",children:Object(i.jsx)("button",{className:"btn btn-block btn-dark btn-outline",onClick:function(e){e.preventDefault(),r({target:{name:"perIncrement",value:(d-s)/s*100}})},children:"Calculate"})})]})})]})})})]})}var M=a(24);function F(){var e=Object(c.useState)(8),t=Object(b.a)(e,2),a=t[0],s=t[1],n=Object(c.useState)(""),r=Object(b.a)(n,2),l=r[0],j=r[1];function d(){j(function(){var e=O;return e+=arguments.length>1&&void 0!==arguments[1]&&!arguments[1]?"":p,N(arguments.length>0&&void 0!==arguments[0]?arguments[0]:8,e+=arguments.length>2&&void 0!==arguments[2]&&!arguments[2]?"":v)}(a))}return Object(i.jsx)("div",{className:"jumbotron jumbotron-fluid",children:Object(i.jsx)("div",{className:"container",children:Object(i.jsxs)("div",{className:"row",children:[Object(i.jsxs)("div",{className:"col-md-8",children:[Object(i.jsx)("h1",{className:"display-6",children:"Password Generator"}),Object(i.jsx)("hr",{}),Object(i.jsx)("div",{className:"row",children:Object(i.jsx)("div",{className:"col-12",children:Object(i.jsx)("div",{className:"form-group",children:Object(i.jsxs)("div",{class:"input-group",children:[Object(i.jsx)("input",{type:"text",className:"form-control disabled",value:l,placeholder:"Generated Password"}),Object(i.jsx)("div",{class:"input-group-append",children:Object(i.jsx)(M.CopyToClipboard,{text:l,children:Object(i.jsx)("button",{className:"btn btn-dark",children:"Copy to clipboard"})})})]})})})})]}),Object(i.jsx)("div",{className:"col-md-4 bg-white",style:{margin:"auto 0",paddingTop:"1rem"},children:Object(i.jsxs)("form",{children:[Object(i.jsxs)("div",{className:"form-group",children:[Object(i.jsx)("label",{children:"Password Length"}),Object(i.jsx)("div",{className:"input-group",children:Object(i.jsx)(I,{name:"currentSalary",value:a,onChange:function(e){return s(e.target.value)},placeholder:"Password Length"})})]}),Object(i.jsx)("div",{className:"form-group",children:Object(i.jsx)("button",{className:"btn btn-block btn-dark btn-outline",onClick:function(e){e.preventDefault(),d()},children:"Generate Password"})})]})})]})})})}var B=function(){return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(d,{}),Object(i.jsx)("div",{className:"container-fluid",children:Object(i.jsxs)(o.c,{children:[Object(i.jsx)(o.a,{exact:!0,path:"/",children:Object(i.jsx)(T,{})}),Object(i.jsx)(o.a,{path:"/sip-calculator",children:Object(i.jsx)(T,{})}),Object(i.jsx)(o.a,{path:"/multi-line-to-single-line",children:Object(i.jsx)(A,{})}),Object(i.jsx)(o.a,{path:"/salary-hike-calculator",children:Object(i.jsx)(L,{})}),Object(i.jsx)(o.a,{path:"/password-generator",children:Object(i.jsx)(F,{})})]})})]})},E=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,41)).then((function(t){var a=t.getCLS,c=t.getFID,s=t.getFCP,n=t.getLCP,r=t.getTTFB;a(e),c(e),s(e),n(e),r(e)}))};r.a.render(Object(i.jsx)(s.a.StrictMode,{children:Object(i.jsx)(l.a,{children:Object(i.jsx)(B,{})})}),document.getElementById("root")),E()}},[[40,1,2]]]);
//# sourceMappingURL=main.53849998.chunk.js.map