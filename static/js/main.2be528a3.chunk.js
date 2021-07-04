(this["webpackJsonptools-reactjs"]=this["webpackJsonptools-reactjs"]||[]).push([[0],{29:function(e,t,a){},36:function(e,t,a){"use strict";a.r(t);var c=a(1),n=a.n(c),s=a(18),r=a.n(s),l=(a(28),a(29),a(8)),i=a(0);function j(){return Object(i.jsx)("nav",{className:"navbar navbar-expand-lg navbar-light bg-light",children:Object(i.jsxs)("div",{className:"container",children:[Object(i.jsx)(l.b,{className:"navbar-brand",to:"/",children:"Tools"}),Object(i.jsx)("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(i.jsx)("span",{className:"navbar-toggler-icon"})}),Object(i.jsx)("div",{className:"collapse navbar-collapse",id:"navbarNav",children:Object(i.jsxs)("ul",{className:"navbar-nav",children:[Object(i.jsx)(l.b,{to:"/sip-calculator",className:"nav-link",children:"SIP Calculator"}),Object(i.jsx)(l.b,{to:"/multi-line-to-single-line",className:"nav-link",children:"Multi Line To Single Line"}),Object(i.jsx)("li",{className:"nav-item",children:Object(i.jsx)("a",{className:"nav-link",href:"http://71anshuman.com",children:"Dev"})})]})})]})})}var d=a(2),o=a(7),b=a(20),m=a(21),h=function(e){return Object(i.jsx)(m.a,{value:Math.round(e,2),displayType:"text",thousandsGroupStyle:"lakh",thousandSeparator:!0,prefix:"\u20b9"})},u=function(e,t){var a=t?"":" ";return e.replace(/\s\s+/g,a).replace(/(?:\r\n|\r|\n)/g," ")};function x(e){var t=e.data,a=Object(c.useState)(!1),n=Object(o.a)(a,2),s=n[0],r=n[1];return Object(i.jsx)("div",{className:"row",children:Object(i.jsxs)("div",{className:"col-md-12",children:[t.length>0&&Object(i.jsxs)("button",{className:"btn btn-light text-uppercase",onClick:function(){return r((function(e){return!e}))},children:[" ",s?"hide table":"Show Detail"]}),s&&Object(i.jsxs)("table",{className:"table table-striped table-hover table-sm scroll",children:[Object(i.jsx)("caption",{className:"text-uppercase text-muted text-center",children:"Investment and Wealth gain Breakup"}),Object(i.jsx)("thead",{children:Object(i.jsxs)("tr",{children:[Object(i.jsx)("th",{children:"Year"}),Object(i.jsx)("th",{children:"Month"}),Object(i.jsx)("th",{children:"Balance@Bigin"}),Object(i.jsx)("th",{children:"Investment"}),Object(i.jsx)("th",{children:"Interest"}),Object(i.jsx)("th",{children:"Balance@End"})]})}),Object(i.jsx)("tbody",{children:t.map((function(e,t){var a=e.year,c=e.month,n=e.initialBalance,s=e.investment,r=e.interest,l=e.balanceAtEndOfMonth;return Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:a}),Object(i.jsx)("td",{children:c}),Object(i.jsx)("td",{children:h(n)}),Object(i.jsx)("td",{children:h(s)}),Object(i.jsx)("td",{children:h(r)}),Object(i.jsx)("td",{children:h(l)})]},t)}))})]})]})})}var O=a(22);function v(e){var t=e.meta,a=t.investmentAmount,c=t.interestAmount;return Object(i.jsx)("div",{children:0!==a&&Object(i.jsx)(O.a,{width:"100%",height:"400px",chartType:"PieChart",loader:Object(i.jsx)("div",{children:"Loading Chart"}),data:[["Amount","INR"],["Invested",a],["Gain",c]],options:{title:"Gain VS Invested",is3D:!0,titleTextStyle:{fontSize:"24px"}},rootProps:{"data-testid":"2"}})})}function p(e){var t=e.meta,a=t.investmentAmount,c=t.interestAmount,n=t.finalBalance;return Object(i.jsx)("div",{className:"col-md-12",children:Object(i.jsx)("div",{className:"jumbotron jumbotron-fluid bg-white border-bottom border-grey",children:Object(i.jsx)("div",{className:"container",children:Object(i.jsxs)("div",{className:"row",children:[Object(i.jsx)("div",{className:"col-md-4",children:Object(i.jsxs)("h4",{children:[Object(i.jsx)("i",{className:"fa fa-bars"}),h(a),Object(i.jsx)("br",{}),Object(i.jsx)("small",{className:"text-muted",children:"INVESTED"})]})}),Object(i.jsx)("div",{className:"col-md-4",children:Object(i.jsxs)("h4",{children:[h(c),Object(i.jsx)("br",{}),Object(i.jsx)("small",{className:"text-muted",children:"GAIN"})]})}),Object(i.jsx)("div",{className:"col-md-4",children:Object(i.jsxs)("h4",{children:[h(n),Object(i.jsx)("br",{}),Object(i.jsx)("small",{className:"text-muted text-uppercase",children:"maturity value"})]})})]})})})})}var N=a(12),g=a(11);function f(e){var t=e.name;return Object(i.jsx)("input",Object(g.a)({max:"100",autoComplete:"off",name:t,className:"form-control",type:"number"},e))}var w=new b.Finance;function S(){var e=function(e){var t=Object(c.useState)(e),a=Object(o.a)(t,2),n=a[0],s=a[1];return[n,function(e){s(Object(g.a)(Object(g.a)({},n),{},Object(N.a)({},e.target.name,parseInt(e.target.value))))}]}({sipAmount:"",rateOfReturn:"",period:""}),t=Object(o.a)(e,2),a=t[0],n=a.sipAmount,s=a.period,r=a.rateOfReturn,l=t[1],j=Object(c.useState)({investmentAmount:0,interestAmount:0,finalBalance:0}),d=Object(o.a)(j,2),b=d[0],m=d[1],h=Object(c.useState)([]),u=Object(o.a)(h,2),O=u[0],S=u[1];return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("div",{className:"jumbotron jumbotron-fluid",children:Object(i.jsx)("div",{className:"container",children:Object(i.jsxs)("div",{className:"row",children:[Object(i.jsxs)("div",{className:"col-md-8",children:[Object(i.jsx)("h1",{className:"display-6",children:"SIP Calculator"}),Object(i.jsx)("p",{className:"lead",children:"SIP is the best way to accumulate long term wealth."}),Object(i.jsx)("div",{className:"row",children:Object(i.jsx)(p,{meta:b})})]}),Object(i.jsx)("div",{className:"col-md-4",style:{margin:"auto 0",paddingTop:"5rem"},children:Object(i.jsxs)("form",{children:[Object(i.jsx)("div",{className:"form-group",children:Object(i.jsxs)("div",{className:"input-group",children:[Object(i.jsx)("div",{class:"input-group-prepend",children:Object(i.jsx)("span",{className:"input-group-text",children:"\u20b9"})}),Object(i.jsx)(f,{name:"sipAmount",value:n,onChange:l,placeholder:"How much would invest monthly?"})]})}),Object(i.jsx)("div",{className:"form-group",children:Object(i.jsxs)("div",{className:"input-group mb-3",children:[Object(i.jsx)(f,{name:"period",value:s,onChange:l,placeholder:"Investment Period"}),Object(i.jsx)("div",{className:"input-group-append",children:Object(i.jsx)("span",{className:"input-group-text",children:"Years"})})]})}),Object(i.jsx)("div",{className:"form-group",children:Object(i.jsxs)("div",{className:"input-group mb-3",children:[Object(i.jsx)(f,{name:"rateOfReturn",value:r,onChange:l,placeholder:"Expected Annual Returns (%)"}),Object(i.jsx)("div",{className:"input-group-append",children:Object(i.jsx)("span",{className:"input-group-text",children:"%"})})]})}),Object(i.jsx)("div",{className:"form-group",children:Object(i.jsx)("button",{className:"btn btn-block btn-light btn-outline",onClick:function(e){e.preventDefault(),function(){for(var e,t=0,a=0,c=0,l=[],i=1,j=1;j<=12*s;j++){var d=parseInt(j%12);e=0===d?12:d;var o=t+n;c=o*(1+r/100/12);var b=Math.round(w.CI(r/12,1,o,1)-o);a+=b,l.push({year:i,month:e,initialBalance:Math.round(t),investment:n,interest:b,balanceAtEndOfMonth:Math.round(c),totalInterest:a}),t=c,0===d&&i++}S(l);var h=12*s*n;m({investmentAmount:null!==h&&void 0!==h?h:0,period:s,rateOfReturn:r,finalBalance:t,interestAmount:parseInt(t-h)})}()},children:"Calculate"})})]})})]})})}),Object(i.jsxs)("div",{className:"row",children:[Object(i.jsx)("div",{className:"col-md-4",children:Object(i.jsx)(v,{meta:b})}),Object(i.jsx)("div",{className:"col-md-8",children:O&&Object(i.jsx)(x,{data:O})})]})]})}function I(){Object(c.useEffect)((function(){document.title="Multi Line To Single Line text converter"}),[]);var e=Object(c.useState)(""),t=Object(o.a)(e,2),a=t[0],n=t[1];return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("div",{className:"jumbotron jumbotron-fluid",children:Object(i.jsx)("div",{className:"container",children:Object(i.jsx)("div",{className:"row",children:Object(i.jsxs)("div",{className:"col-md-8",children:[Object(i.jsx)("h1",{className:"display-6",children:"Multi Line To Single Line text conveter"}),Object(i.jsx)("p",{className:"lead",children:"SIP is the best way to accumulate long term wealth."})]})})})}),Object(i.jsxs)("div",{className:"row",children:[Object(i.jsx)("div",{className:"col-md-6",children:Object(i.jsx)("form",{children:Object(i.jsx)("div",{className:"form-group",children:Object(i.jsx)("textarea",{rows:"16",className:"form-control","aria-label":"With textarea",name:"multiLineText",onChange:function(e){return n(e.target.value)}})})})}),Object(i.jsx)("div",{className:"col-md-6",children:Object(i.jsx)("div",{className:"form-group",children:Object(i.jsx)("textarea",{rows:"16",className:"form-control",value:u(a,!0)})})})]})]})}var y=function(){return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(j,{}),Object(i.jsx)("div",{className:"container-fluid",children:Object(i.jsxs)(d.c,{children:[Object(i.jsx)(d.a,{exact:!0,path:"/",children:Object(i.jsx)(S,{})}),Object(i.jsx)(d.a,{path:"/sip-calculator",children:Object(i.jsx)(S,{})}),Object(i.jsx)(d.a,{path:"/multi-line-to-single-line",children:Object(i.jsx)(I,{})})]})})]})},A=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,37)).then((function(t){var a=t.getCLS,c=t.getFID,n=t.getFCP,s=t.getLCP,r=t.getTTFB;a(e),c(e),n(e),s(e),r(e)}))};r.a.render(Object(i.jsx)(n.a.StrictMode,{children:Object(i.jsx)(l.a,{children:Object(i.jsx)(y,{})})}),document.getElementById("root")),A()}},[[36,1,2]]]);
//# sourceMappingURL=main.2be528a3.chunk.js.map