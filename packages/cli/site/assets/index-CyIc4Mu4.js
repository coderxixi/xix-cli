import{d as G,r as u,c as l,w as I,o as i,a as c,b as m,e,u as R,t as o,f as h,F as g,g as k,h as r,i as p,j as w,k as y}from"./index-DsLLHNOG.js";import{s as C,A as j,u as D,a as E}from"./AppHeader-Bzt0aRGn.js";import{get as d}from"lodash-es";import{getBrowserTheme as H,watchTheme as K,getPCLocationInfo as T}from"@varlet/cli/client";import"@varlet/touch-emulator";const O={class:"varlet-doc-index"},q={class:"varlet-doc-index__layout"},J={class:"varlet-doc-index__main-container"},Q={class:"varlet-doc-index__logo-container"},U=["src"],W={class:"varlet-doc-index__info-container"},X={class:"varlet-doc-index__title"},Y={class:"varlet-doc-index__description"},Z={key:0,class:"varlet-doc-index__features"},ee={class:"varlet-doc-index__feature"},te={class:"varlet-doc-index__feature-name"},se={class:"varlet-doc-index__feature-description"},oe={key:1,class:"varlet-doc-index__team-members"},ae={class:"varlet-doc-index__team-members-title"},ie={class:"varlet-doc-index__team-members-container"},ne={class:"varlet-doc-index__team-member"},le=["src"],ce={class:"varlet-doc-index__team-member-name"},re={class:"varlet-doc-index__team-member-title"},de={class:"varlet-doc-index__team-member-description"},_e={class:"varlet-doc-index__team-member-social"},ve={key:2,class:"varlet-doc-index__contributors"},ue={class:"varlet-doc-index__contributors-title"},me=["href"],he=["src"],ge={key:3,class:"varlet-doc-index__sponsors"},pe={class:"varlet-doc-index__sponsors-title"},xe=["href"],fe=["src"],be={class:"varlet-doc-index__footer"},ke={class:"varlet-doc-index__license"},we={class:"varlet-doc-index__copyright"},Ne=G({__name:"index",setup(ye){const B=D(),M=E(),_=u(H()),L=d(l,"pc.header.github"),N=u(d(l,"title")),s=u(d(l,"defaultLanguage")),t=u(d(l,"pc.indexPage")),V=()=>{M.push(`/${s.value}/home`)},z=()=>{window.open(L)},P=()=>({action:"theme-change",from:"pc",data:_.value}),S=n=>{_.value=n,C(l,_.value),window.localStorage.setItem(d(l,"themeKey"),_.value)},$=()=>{const{language:n}=T();n&&(s.value=n,document.title=d(l,"pc.title")[n])},x=n=>{window.open(n)};return C(l,_.value),window.postMessage(P(),"*"),K((n,v)=>{v==="mobile"&&S(n)}),I(()=>B.path,()=>{s.value=T().language,$()},{immediate:!0}),(n,v)=>{const f=p("var-button"),A=p("var-space"),b=p("var-icon");return i(),c(g,null,[m(j,{language:s.value},null,8,["language"]),e("div",O,[e("div",q,[e("div",J,[e("div",Q,[v[0]||(v[0]=e("div",{class:"varlet-doc-index__logo-background-mask"},null,-1)),e("img",{class:"varlet-doc-index__logo",src:R(l).logo,alt:""},null,8,U)]),e("div",W,[e("div",X,o(N.value),1),e("div",Y,o(t.value.description[s.value]),1),m(A,{size:"large"},{default:h(()=>[m(f,{class:"varlet-doc-index__link-button",type:"primary",style:{"line-height":"1.2"},onClick:V},{default:h(()=>[w(o(t.value.started[s.value]),1)]),_:1}),m(f,{class:"varlet-doc-index__github-button",type:"primary",style:{"line-height":"1.2"},onClick:z},{default:h(()=>[w(o(t.value.viewOnGithub[s.value]),1)]),_:1})]),_:1})])]),t.value.features?(i(),c("div",Z,[(i(!0),c(g,null,k(t.value.features,a=>(i(),c("div",ee,[e("div",te,o(a.name[s.value]),1),e("div",se,o(a.description[s.value]),1)]))),256))])):r("v-if",!0),t.value.teamMembers?(i(),c("div",oe,[e("div",ae,o(t.value.teamMembers.label[s.value]),1),e("div",ie,[(i(!0),c(g,null,k(t.value.teamMembers.members,a=>(i(),c("div",ne,[e("img",{class:"varlet-doc-index__team-member-avatar",src:a.avatar},null,8,le),e("div",ce,o(a.name[s.value]),1),e("div",re,o(a.title[s.value]),1),e("div",de,o(a.description[s.value]),1),e("div",_e,[a.github?(i(),y(b,{key:0,class:"varlet-doc-index__team-member-social-icon",name:"github",size:24,onClick:F=>x(a.github)},null,8,["onClick"])):r("v-if",!0),a.twitter?(i(),y(b,{key:1,class:"varlet-doc-index__team-member-social-icon",name:"twitter",size:24,onClick:F=>x(a.twitter)},null,8,["onClick"])):r("v-if",!0)])]))),256))])])):r("v-if",!0),t.value.contributors?(i(),c("div",ve,[e("div",ue,o(t.value.contributors.label[s.value]),1),e("a",{class:"varlet-doc-index__contributors-link",href:t.value.contributors.link},[e("img",{class:"varlet-doc-index__contributors-image",src:t.value.contributors.image},null,8,he)],8,me)])):r("v-if",!0),t.value.sponsors?(i(),c("div",ge,[e("div",pe,o(t.value.sponsors.label[s.value]),1),e("a",{class:"varlet-doc-index__sponsors-link",href:t.value.sponsors.link},[e("img",{class:"varlet-doc-index__sponsors-image",src:t.value.sponsors.image},null,8,fe)],8,xe)])):r("v-if",!0),e("div",be,[e("div",ke,o(t.value.license[s.value]),1),e("div",we,o(t.value.copyright[s.value]),1)])])])],64)}}});export{Ne as default};