(this["webpackJsonpstock-app"]=this["webpackJsonpstock-app"]||[]).push([[0],{102:function(e,t,a){e.exports=a(129)},107:function(e,t,a){},129:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),c=a(10),r=a.n(c),o=(a(107),a(17)),l=a(169),s=a(170),u=a(29),d=a(165),m=function(e){var t=e.message;return i.a.createElement(d.a,{item:!0,xs:12,sm:12,md:12,lg:12},i.a.createElement("h3",{style:{textAlign:"center",marginBottom:"30px"}},t))},E=a(44),p=a(28),h={FETCH_TIME_SERIES_DAILY_ADJUSTED_SUCCESSFULLY:"FETCH_TIME_SERIES_DAILY_ADJUSTED_SUCCESSFULLY",FETCH_TIME_SERIES_DAILY_ADJUSTED_FAILED:"FETCH_TIME_SERIES_DAILY_ADJUSTED_FAILED",FETCH_SEARCH_ENDPOINT_DATA:"FETCH_SEARCH_ENDPOINT_DATA",IS_SEARCH_DATA_LOADING:"IS_SEARCH_DATA_LOADING",FETCH_OVERVIEW_DATA_SUCCESSFULLY:"FETCH_OVERVIEW_DATA_SUCCESSFULLY",FETCH_OVERVIEW_DATA_FAILED:"FETCH_OVERVIEW_DATA_FAILED",FETCH_GLOBAL_QUOTE_FAILED:"FETCH_GLOBAL_QUOTE_FAILED",FETCH_GLOBAL_QUOTE_SUCCESSFULLY:"FETCH_GLOBAL_QUOTE_SUCCESSFULLY",RESET_GLOBAL_QUOTE:"RESET_GLOBAL_QUOTE",IS_OVERVIEW_DATA_LOADING:"IS_OVERVIEW_DATA_LOADING",SAVE_OPEN_POSITIONS:"SAVE_OPEN_POSITIONS",RESET_OPEN_POSITIONS:"RESET_OPEN_POSITIONS"},f="https://www.alphavantage.co/query?function=",S=Object({NODE_ENV:"production",PUBLIC_URL:"/stock-app",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_KEY,y=function(){return function(e){e({type:h.RESET_GLOBAL_QUOTE})}},O=function(){return function(e){e({type:h.RESET_OPEN_POSITIONS,payload:[]})}},D=a(176),g={validateInput:function(e){return!!["/","<",">"].some((function(t){return e.includes(t)}))||!e},validateVolume:function(e){return!/^[0-9]{0,3}$/.test(e)},getGridCenteredProps:function(e){return{container:!0,item:!0,xs:e,justify:"center",alignItems:"center"}}},_=(a(48),{width:"100%",padding:"10px",backgroundColor:"#777",color:"#FFF"}),b=Object(u.b)((function(e){return{searchedData:e.searchedData,isSearchedDataFetchedSuccessfully:e.isSearchedDataFetchedSuccessfully}}),null)((function(e){var t=e.searchedData,a=e.isSearchedDataFetchedSuccessfully,c=e.filteredData,r=e.showTransactionWindow,u=Object(n.useState)(!1),E=Object(o.a)(u,2),p=E[0],h=E[1];Object(n.useEffect)((function(){return!t.length&&a?h(!0):t.length&&a?h(!1):void 0}),[t,a]);try{return i.a.createElement(d.a,{container:!0,item:!0,xs:12,justify:"center",className:p||t.length?"stock-list-wrapper":null,style:{marginTop:"25px"}},function(){if(c.length)return c.map((function(e,t){return i.a.createElement("div",{key:"stock-list-element-".concat(t),style:{minWidth:"100%",marginBottom:"20px"}},i.a.createElement(l.a,{style:{padding:"0",minWidth:"100%"},onClick:function(){return r(e)}},i.a.createElement(s.a,{style:_},i.a.createElement(d.a,{item:!0,container:!0,xs:12,justify:"space-between"},i.a.createElement("div",{style:{marginRight:"25px"}},e["1. symbol"]),i.a.createElement("div",{style:{textTransform:"none",textAlign:"left"}},e["2. name"]),i.a.createElement(d.a,{item:!0,container:!0,xs:12,justify:"flex-start"},i.a.createElement("div",null,e["4. region"]))))))}))}(),function(){if(p)return i.a.createElement(d.a,{container:!0,item:!0,xs:12,justify:"center"},i.a.createElement("div",null,"No result found. Try again"))}(),function(){if(!p&&!c.length)return i.a.createElement(d.a,{container:!0,item:!0,xs:12,justify:"center"},i.a.createElement("div",null,"No stocks were searched yet"))}())}catch(f){return i.a.createElement(m,{message:"Result stock list was crashed. Try refresh page"})}})),A=a(174),T=a(181),F=a(179),v=a(177),j={getSearchComponentData:function(e){return function(t){t({type:h.IS_SEARCH_DATA_LOADING,payload:!0}),fetch("".concat(f,"SYMBOL_SEARCH&keywords=").concat(e,"&apikey=").concat(S),{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){t({type:h.IS_SEARCH_DATA_LOADING,payload:!1}),t({type:h.FETCH_SEARCH_ENDPOINT_DATA,isSearchedDataFetchedSuccessfully:!0,isSearchedDataFetchedFailed:!1,payload:e.bestMatches})})).catch((function(e){t({type:h.IS_SEARCH_DATA_LOADING,payload:!1}),t({type:h.FETCH_SEARCH_ENDPOINT_DATA,isSearchedDataFetchedSuccessfully:!1,isSearchedDataFetchedFailed:!0,payload:[]})}))}},closeSearchDataNotification:function(e){return function(t){t({type:h.FETCH_SEARCH_ENDPOINT_DATA,payload:e,isSearchedDataFetchedSuccessfully:!1,isSearchedDataFetchedFailed:!1})}},setSearchDataLoading:function(e){return function(t){t({type:h.IS_SEARCH_DATA_LOADING,payload:e})}}},C=Object(u.b)((function(e){return{isSearchedDataFetchedSuccessfully:e.isSearchedDataFetchedSuccessfully,isSearchedDataFetchedFailed:e.isSearchedDataFetchedFailed,searchedData:e.searchedData,isSearchDataLoading:e.isSearchDataLoading}}),j)((function(e){var t=e.getSearchComponentData,a=e.isSearchDataLoading,c=e.isSearchedDataFetchedSuccessfully,r=e.isSearchedDataFetchedFailed,s=e.closeSearchDataNotification,u=(e.setSearchDataLoading,e.searchedData),E=e.showTransactionWindow,h=Object(n.useState)(""),f=Object(o.a)(h,2),S=f[0],y=f[1],O=Object(n.useState)(!1),_=Object(o.a)(O,2),j=_[0],C=_[1],I=Object(n.useState)(null),x=Object(o.a)(I,2),L=x[0],w=x[1],N=Object(n.useState)([]),G=Object(o.a)(N,2),k=G[0],P=G[1],R=Object(n.useState)([]),H=Object(o.a)(R,2),U=H[0],W=H[1],V=c||r||a,Q=c||r||a||!S||j,B=function(e){13!==e.keyCode||Q||(e.preventDefault(),t(S),y(""))};Object(n.useEffect)((function(){return window.addEventListener("keydown",B),function(){window.removeEventListener("keydown",B)}}),[S]),Object(n.useEffect)((function(){W(Object(p.a)(u))}),[u]),Object(n.useEffect)((function(){if(c){var e=setTimeout((function(){s(u)}),5e3);return function(){clearTimeout(e)}}}),[c]),Object(n.useEffect)((function(){if(u.length){var e=u.map((function(e){return e["4. region"]})),t=new Set(e);P(Object(p.a)(t))}}),[u]),Object(n.useEffect)((function(){var e=u.filter((function(e){return e["4. region"]===L}));return e.length?W(e):W(u)}),[L]);try{return i.a.createElement(i.a.Fragment,null,i.a.createElement(d.a,{container:!0},i.a.createElement(d.a,{item:!0,xs:12},i.a.createElement("h2",{className:"search-module-header",style:{textAlign:"center"}},"Search company")),i.a.createElement(d.a,{container:!0,item:!0,xs:12,justify:"center",alignItems:"center"},i.a.createElement(D.a,{id:"company-input",label:"Company name or symbol",variant:"outlined",value:S,disabled:V,helperText:j?S?"Incorrect value. Signs <, >, / are not allowed.":"Empty value is not allowed":"",error:j,onChange:function(e){return function(e){var t=g.validateInput(e.target.value);C(t),y(e.target.value)}(e)},style:{width:"300px",transition:"0.3s"}})),i.a.createElement(d.a,{container:!0,item:!0,xs:12,justify:"center",alignItems:"center"},i.a.createElement(l.a,{variant:"outlined",disabled:Q,style:{margin:"30px 0",transition:"0.3s"},onClick:function(){t(S),y("")}},"Search")),i.a.createElement(d.a,{container:!0,item:!0,xs:12,justify:"center",alignItems:"center"},i.a.createElement(v.a,{id:"filter-by-market-input",value:L,options:k,getOptionLabel:function(e){return e},onChange:function(e,t){return w(t||null)},style:{width:"300px"},renderInput:function(e){return i.a.createElement(D.a,Object.assign({},e,{variant:"outlined",label:"Filter result by market",margin:"normal"}))}})),i.a.createElement(d.a,{container:!0,item:!0,xs:12,justify:"center",alignItems:"center"},a?i.a.createElement(A.a,null):i.a.createElement(b,{filteredData:U,showTransactionWindow:E}))),i.a.createElement(T.a,{open:c||r,anchorOrigin:{vertical:"top",horizontal:"center"},onClose:function(){return s(u)}},i.a.createElement(F.a,{icon:!1,variant:"filled",color:u.length?"success":"error",elevation:6,onClose:function(){return s(u)}},u.length?"Data was fetch successfully":"No result found")))}catch(Y){return i.a.createElement(m,{message:"Search input was crashed. Try refresh page"})}})),I=a(84),x=a.n(I),L=a(172),w=a(87),N=a.n(w),G={border:"1px solid black",borderRadius:"5px"},k={borderTop:"1px solid black"},P={minWidth:"0",width:"100%"},R={fontSize:"12px"},H=function(e){var t=e.volumeCounter,a=e.setVolumeCounter,n=e.volumeError,c=e.setVolumeError;try{return i.a.createElement(d.a,{container:!0,style:G},i.a.createElement(d.a,{container:!0,justify:"center",alignItems:"center"},i.a.createElement(d.a,{item:!0,xs:12},i.a.createElement(D.a,{error:n,value:t,onChange:function(e){return function(e){var t=e.target.value,n=g.validateVolume(t);return t?!n&&"0"!==t&&t?(a(t),c(!1)):void 0:(a(t),c(!0))}(e)},inputProps:{className:"volume-input"},style:{backgroundColor:n?"rgba(255,0,0,0.3)":"#FFF",transition:"0.3s"}},t)),i.a.createElement(d.a,{item:!0,xs:12,style:R},"volume")),i.a.createElement(d.a,{container:!0,direction:"row"},i.a.createElement(d.a,{item:!0,xs:6,style:k},i.a.createElement(l.a,{onClick:function(){return t>1?(a(--t),c(!1)):(c(!1),a(1))},style:P},"-")),i.a.createElement(d.a,{item:!0,xs:6,style:k},i.a.createElement(l.a,{onClick:function(){return t?(a(++t),c(!1)):(c(!1),a(1))},style:P},"+"))))}catch(r){return i.a.createElement(m,{message:"Volume input was crashed. Try again"})}},U=a(4),W=a(178),V=a(85),Q=a.n(V),B=a(86),Y=a.n(B),z=a(92),M={fontSize:"14px",textAlign:"left",fontWeight:"500"},J=function(e){var t=e.showPositionInfo,a=e.allOpenPositionsFiltered,n=e.saveOpenPositions,c=e.allOpenPositions,r=e.companySymbol,o=function(){return a.map((function(e,t){return i.a.createElement(d.a,Object.assign({},g.getGridCenteredProps(12),{style:M,key:"position-element-".concat(t)}),i.a.createElement(d.a,{item:!0,xs:2},i.a.createElement(W.a,{id:"".concat(r,"-").concat(t),icon:i.a.createElement(Q.a,{fontSize:"small"}),checkedIcon:i.a.createElement(Y.a,{fontSize:"small"}),color:"default",onChange:function(e){return function(e){var t=e.target.id,a=c.find((function(e){return e.id===t})),i=a.isChecked,r=c.map((function(e){return e.id!==t&&(e.isChecked=!1),e}));a.isChecked=!i,n(Object(p.a)(r))}(e)},checked:e.isChecked,name:"".concat(t)})),i.a.createElement(d.a,{item:!0,xs:5},e.symbol),i.a.createElement(d.a,{item:!0,xs:2},e.volume),i.a.createElement(d.a,{item:!0,xs:3},e.price))}))};try{return i.a.createElement(d.a,{container:!0,justify:"flex-start",style:{transition:"0.3s",minHeight:t?"100px":"0",opacity:t?"1":"0"}},i.a.createElement(d.a,{container:!0,justify:"flex-start",style:{margin:t?"15px 0 0 0":"0",height:t?"39px":"0",fontWeight:"700",transition:"0.3s"}},"Open Positions:"),function(){var e=a.length<4?38*a.length:152;return i.a.createElement(z.a,{height:t?e:0,itemSize:a.length,itemCount:1,style:{width:"100%"}},o)}())}catch(l){return i.a.createElement(m,{message:"Position list was crashed. Try again"})}},K=Object(U.a)({root:{minWidth:"110px",color:"#FFF !important",fontWeight:"700",padding:"20px 10px",fontSize:"16px",display:"flex",width:"100%",flexDirection:"row",transition:"0.3s","& div:nth-child(2)":{fontSize:"12px",fontWeight:"500",textTransform:"none",transition:"0.3s"},"@media(min-width: 400px)":{minWidth:"140px",padding:"12px 10px",fontSize:"20px","& div:nth-child(2)":{fontSize:"16px"}}}})(l.a),q={getTimeSeriesDailyAdjusted:function(e){return function(t){fetch("".concat(f,"TIME_SERIES_DAILY_ADJUSTED&symbol=").concat(e,"&apikey=").concat(S),{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){t({type:h.FETCH_TIME_SERIES_DAILY_ADJUSTED_SUCCESSFULLY,payload:e})})).catch((function(e){t({type:h.FETCH_TIME_SERIES_DAILY_ADJUSTED_FAILED})}))}},getOverview:function(e){return function(t){t({type:h.IS_OVERVIEW_DATA_LOADING,payload:!0}),fetch("".concat(f,"OVERVIEW&symbol=").concat(e,"&apikey=").concat(S),{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){console.log("overview data ",e),t({type:h.IS_OVERVIEW_DATA_LOADING,payload:!1}),t({type:h.FETCH_OVERVIEW_DATA_SUCCESSFULLY,payload:e})})).catch((function(e){t({type:h.IS_OVERVIEW_DATA_LOADING,payload:!1}),t({type:h.FETCH_OVERVIEW_DATA_FAILED,payload:{}})}))}},getGlobalQuoteCompany:function(e){return function(t){y(),fetch("".concat(f,"GLOBAL_QUOTE&symbol=").concat(e,"&apikey=").concat(S),{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){t({type:h.FETCH_GLOBAL_QUOTE_SUCCESSFULLY,payload:e})})).catch((function(e){t({type:h.FETCH_GLOBAL_QUOTE_FAILED})}))}},setOverviewDataLoading:function(e){return function(t){t({type:h.IS_OVERVIEW_DATA_LOADING,payload:e})}},saveOpenPositions:function(e){return function(t){t({type:h.SAVE_OPEN_POSITIONS,payload:e})}},resetOpenPositions:O},$=Object(u.b)((function(e){return{isTimeSeriesDailyAdjustedFetchedSuccessfully:e.isTimeSeriesDailyAdjustedFetchedSuccessfully,isTimeSeriesDailyAdjustedFetchedFailed:e.isTimeSeriesDailyAdjustedFetchedFailed,timesSeriesDailyAdjusted:e.timesSeriesDailyAdjusted,overviewData:e.overviewData,globalQuote:e.globalQuote,isGlobalQuoteFetchSuccessfully:e.isGlobalQuoteFetchSuccessfully,isGlobalQuoteFetchFailed:e.isGlobalQuoteFetchFailed,isOverviewDataFetchedSuccessfully:e.isOverviewDataFetchedSuccessfully,isOverviewDataLoading:e.isOverviewDataLoading,allOpenPositions:e.allOpenPositions}}),q)((function(e){var t=e.companySymbol,a=e.getOverview,c=e.overviewData,r=e.title,s=(e.isTimeSeriesDailyAdjustedFetchedSuccessfully,e.isTimeSeriesDailyAdjustedFetchedFailed,e.timesSeriesDailyAdjusted,e.getTimeSeriesDailyAdjusted,e.getGlobalQuoteCompany),u=e.isGlobalQuoteFetchSuccessfully,E=(e.isGlobalQuoteFetchFailed,e.globalQuote),h=e.isOverviewDataFetchedSuccessfully,f=(e.setOverviewDataLoading,e.isOverviewDataLoading),S=e.saveOpenPositions,y=e.allOpenPositions,O=Object(n.useState)(!1),D=Object(o.a)(O,2),_=D[0],b=D[1],T=Object(n.useState)(1),F=Object(o.a)(T,2),v=F[0],j=F[1],C=Object(n.useState)(!1),I=Object(o.a)(C,2),x=I[0],w=I[1],G=Object(n.useState)(!1),k=Object(o.a)(G,2),P=k[0],R=k[1],U=Object(n.useState)(""),W=Object(o.a)(U,2),V=W[0],Q=W[1],B=Object(n.useState)(!!y.length),Y=Object(o.a)(B,2),z=Y[0],M=Y[1],q=!u||x||P,$=Object(n.useState)([]),X=Object(o.a)($,2),Z=X[0],ee=X[1];Object(n.useEffect)((function(){s(t);var e=y.map((function(e){return e.isChecked=!1,e}));S(e)}),[t]),Object(n.useEffect)((function(){var e=y.filter((function(e){return e.symbol===t}));ee(e)}),[y]),Object(n.useEffect)((function(){return E.Note||c.Note?R(!0):R(!1)}),[E,c]),Object(n.useEffect)((function(){return Z.length?M(!0):M(!1)}),[Z]),Object(n.useEffect)((function(){if(V){var e=setTimeout((function(){Q("")}),5e3);return function(){clearTimeout(e)}}}),[V]);var te=function(){t!==c.Symbol&&a(t),b(!_)};try{return i.a.createElement(d.a,{container:!0},i.a.createElement(d.a,Object.assign({},g.getGridCenteredProps(12),{style:{marginBottom:"20px"}}),i.a.createElement("h2",{className:"transaction-card-header",style:{fontWeight:"500",margin:"0"}},r),i.a.createElement(l.a,{onClick:te,disabled:P},i.a.createElement(N.a,{style:{color:"#2196f3"}}))),function(){return i.a.createElement(d.a,Object.assign({},g.getGridCenteredProps(12),{style:{height:_?"80px":"0",transition:"0.3s"}}),f?i.a.createElement(A.a,null):i.a.createElement(L.a,{rowsMax:5,value:h?c.Description:"This API is limited. Try again in one minute.",style:(e=_,{width:"300px",minWidth:"250px",minHeight:"80px",maxWidth:"300px",maxHeight:"80px",transition:"0.3s",height:e?"80px":"0",opacity:e?"1":"0"})}));var e}(),i.a.createElement(i.a.Fragment,null,P?i.a.createElement(d.a,{container:!0,justify:"center"},i.a.createElement("div",{style:{margin:"20px 0"}},"This API is limited. Try again in one minute.")):null),i.a.createElement(d.a,{container:!0,justify:"space-between",alignItems:"center",style:{marginTop:"20px"}},i.a.createElement(d.a,g.getGridCenteredProps(4),i.a.createElement(K,{disabled:q,style:{backgroundColor:q?"#777":"#F00"},onClick:function(){return function(e){var a=y.findIndex((function(e){return!0===e.isChecked})),n=y[a];if(!Z.length)return Q("No stocks to sell");if(n&&n.symbol!==t)return Q("Invalid position checked");if(-1===a)return Q("No position checked");if(n.volume<v)return Q("Not enough stocks to sell");Q("");var i=Z.map((function(e){return e.isChecked?(n.volume-=v,n):e}));if(!n.volume){var c=y.filter((function(e){return 0!==e.volume}));return S(Object(p.a)(c))}return S(Object(p.a)(i))}()}},i.a.createElement(d.a,{container:!0,direction:"row",justify:"center",alignItems:"center"},i.a.createElement(d.a,{item:!0,xs:12},"sell"),i.a.createElement(d.a,{item:!0,xs:12},u?E.Note?"---":function(e){if(e)return(parseFloat(e)-.1).toFixed(4)}(E["Global Quote"]["05. price"]):"Loading...")))),i.a.createElement(d.a,g.getGridCenteredProps(3),i.a.createElement(H,{volumeCounter:v,setVolumeCounter:j,volumeError:x,setVolumeError:w})),i.a.createElement(d.a,g.getGridCenteredProps(4),i.a.createElement(K,{style:{backgroundColor:q?"#777":"#32c972"},disabled:q,onClick:function(){return function(e){var a=parseFloat(e);S([].concat(Object(p.a)(y),[{id:"".concat(t,"-").concat(Z.length),symbol:t,price:a,volume:v,isChecked:!1}]))}(E["Global Quote"]["05. price"])}},i.a.createElement(d.a,{container:!0,direction:"row",justify:"center",alignItems:"center"},i.a.createElement(d.a,{item:!0,xs:12},"buy"),i.a.createElement(d.a,{item:!0,xs:12},u?E.Note?"---":E["Global Quote"]["05. price"]:"Loading..."))))),function(){return i.a.createElement(d.a,Object.assign({},g.getGridCenteredProps(12),{style:(e=V.length,{height:e?"24px":"0",marginTop:e?"15px":"0",transition:"0.3s",fontWeight:"600",color:"#F00"})}),V);var e}(),i.a.createElement(J,{showPositionInfo:z,allOpenPositionsFiltered:Z,saveOpenPositions:S,allOpenPositions:y,companySymbol:t}))}catch(ae){return i.a.createElement(m,{message:"Transaction card was crashed. Try again"})}})),X=a(88),Z=a.n(X),ee={padding:"20px",backgroundColor:"#BBB",boxSizing:"border-box",display:"flex",flexDirection:"column",alignItems:"center",flexGrow:"1"},te={marginBottom:"25px",opacity:"0",maxWidth:"500px",width:"100%"},ae={padding:"0 20px 40px 20px",opacity:"0",maxWidth:"500px",boxSizing:"border-box",width:"100%"},ne={resetOpenPositions:O,resetGlobalQuoteCompany:y},ie=Object(u.b)(null,ne)((function(e){var t=e.resetOpenPositions,a=e.resetGlobalQuoteCompany,c=Object(n.useState)(null),r=Object(o.a)(c,2),u=r[0],p=r[1];Object(n.useEffect)((function(){t()}),[]);try{return i.a.createElement("div",{style:ee},u,i.a.createElement(d.a,{container:!0,style:{maxWidth:"500px"}},i.a.createElement(E.b,{to:"/stock-app",style:{textDecoration:"none"}},i.a.createElement(l.a,{style:{fontSize:"16px",fontWeight:"700"}},i.a.createElement(Z.a,null),"Back"))),i.a.createElement(s.a,{className:"app-header",style:te},i.a.createElement(d.a,{container:!0},i.a.createElement(d.a,g.getGridCenteredProps(12),i.a.createElement("h1",{style:{textAlign:"center"}},"Stock App")))),i.a.createElement(s.a,{className:"search-module-card",style:ae},i.a.createElement(d.a,{container:!0},i.a.createElement(C,{showTransactionWindow:function(e){a();var t=e["1. symbol"];p(i.a.createElement(x.a,{title:"",onConfirm:function(){return p(null)},onCancel:function(){return p(null)},showConfirm:!1,style:{margin:"0 !important"}},i.a.createElement($,{companySymbol:t,title:"".concat(e["1. symbol"],", ").concat(e["2. name"])})))}}))))}catch(h){return i.a.createElement(m,{message:"Dashboard was crashed. Try refresh page"})}})),ce={boxSizing:"border-box",padding:"10px 20px",textAlign:"right",color:"#eee",backgroundColor:"#4D4D4D",fontWeight:"500"},re=function(){return i.a.createElement("div",{className:"footer",style:ce},i.a.createElement("div",{style:{margin:"0",opacity:"0"}},"Created by Marek Szczegodzi\u0144ski 2021"))},oe=a(16),le=a(175),se={padding:"40px",backgroundColor:"#BBB",boxSizing:"border-box",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",flexGrow:"1",textAlign:"center"},ue={margin:"20px",padding:"20px",opacity:"0",maxWidth:"500px",width:"100%"},de=function(){try{return i.a.createElement("div",{style:se},i.a.createElement(s.a,{className:"welcome-card",style:ue},i.a.createElement("h1",{style:{margin:"0"}},"Welcome in Stock App"),i.a.createElement(d.a,Object.assign({},g.getGridCenteredProps(12),{style:{margin:"25px 0"}}),i.a.createElement(le.a,null,"Stock App is a simple demo app which can be used to trade."),i.a.createElement(le.a,null,"Have a good time!")),i.a.createElement(d.a,Object.assign({},g.getGridCenteredProps(12),{style:{margin:"25px 0 10px 0"}}),i.a.createElement(l.a,{variant:"outlined"},i.a.createElement(E.b,{to:"/stock-app/dashboard",style:{textDecoration:"none",color:"#333",fontWeight:"700",fontSize:"20px"}},"go to app")))))}catch(e){return i.a.createElement(m,{message:"Home page was crashed. Try refresh page or come back soon"})}},me=function(){return i.a.createElement(E.a,null,i.a.createElement("div",null,i.a.createElement(oe.c,null,i.a.createElement(oe.a,{path:"/stock-app/dashboard"},i.a.createElement("div",{className:"App",style:{height:"100vh",display:"flex",flexDirection:"column"}},i.a.createElement(ie,null),i.a.createElement(re,null))),i.a.createElement(oe.a,{path:"/stock-app"},i.a.createElement("div",{className:"App",style:{height:"100vh",display:"flex",flexDirection:"column"}},i.a.createElement(de,null),i.a.createElement(re,null))))))},Ee=a(12),pe={isTimeSeriesDailyAdjustedFetchedSuccessfully:!1,isTimeSeriesDailyAdjustedFetchedFailed:!1,timesSeriesDailyAdjusted:{},isSearchedDataFetchedSuccessfully:!1,isSearchedDataFetchedFailed:!1,searchedData:[],isSearchDataLoading:!1,isIntradayDataLoading:!1,isDailyAdjustedDataLoading:!1,isOverviewDataFetchedSuccessfully:!1,isOverviewDataFetchedFailed:!1,isOverviewDataLoading:!1,overviewData:{},isGlobalQuoteFetchSuccessfully:!1,isGlobalQuoteFetchFailed:!1,globalQuote:{},allOpenPositions:[]},he=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:pe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case h.FETCH_OVERVIEW_DATA_SUCCESSFULLY:return Object(Ee.a)(Object(Ee.a)({},e),{},{isOverviewDataFetchedSuccessfully:!0,isOverviewDataFetchedFailed:!1,overviewData:t.payload});case h.FETCH_OVERVIEW_DATA_FAILED:return Object(Ee.a)(Object(Ee.a)({},e),{},{isOverviewDataFetchedSuccessfully:!1,isOverviewDataFetchedFailed:!0,overviewData:t.payload});case h.FETCH_TIME_SERIES_DAILY_ADJUSTED_SUCCESSFULLY:return Object(Ee.a)(Object(Ee.a)({},e),{},{isTimeSeriesDailyAdjustedFetchedSuccessfully:!0,isTimeSeriesDailyAdjustedFetchedFailed:!1,timesSeriesDailyAdjusted:t.payload});case h.FETCH_TIME_SERIES_DAILY_ADJUSTED_FAILED:return Object(Ee.a)(Object(Ee.a)({},e),{},{isTimeSeriesDailyAdjustedFetchedSuccessfully:!1,isTimeSeriesDailyAdjustedFetchedFailed:!0,timesSeriesDailyAdjusted:{}});case h.FETCH_SEARCH_ENDPOINT_DATA:return Object(Ee.a)(Object(Ee.a)({},e),{},{searchedData:t.payload,isSearchedDataFetchedSuccessfully:t.isSearchedDataFetchedSuccessfully,isSearchedDataFetchedFailed:t.isSearchedDataFetchedFailed});case h.IS_SEARCH_DATA_LOADING:return Object(Ee.a)(Object(Ee.a)({},e),{},{isSearchDataLoading:t.payload});case h.FETCH_GLOBAL_QUOTE_SUCCESSFULLY:return Object(Ee.a)(Object(Ee.a)({},e),{},{isGlobalQuoteFetchSuccessfully:!0,isGlobalQuoteFetchFailed:!1,globalQuote:t.payload});case h.FETCH_GLOBAL_QUOTE_FAILED:return Object(Ee.a)(Object(Ee.a)({},e),{},{isGlobalQuoteFetchSuccessfully:!1,isGlobalQuoteFetchFailed:!0,globalQuote:{}});case h.RESET_GLOBAL_QUOTE:return Object(Ee.a)(Object(Ee.a)({},e),{},{isGlobalQuoteFetchSuccessfully:!1,isGlobalQuoteFetchFailed:!1,globalQuote:{}});case h.IS_OVERVIEW_DATA_LOADING:return Object(Ee.a)(Object(Ee.a)({},e),{},{isOverviewDataLoading:t.payload});case h.SAVE_OPEN_POSITIONS:return Object(Ee.a)(Object(Ee.a)({},e),{},{allOpenPositions:Object(p.a)(t.payload)});case h.RESET_OPEN_POSITIONS:return Object(Ee.a)(Object(Ee.a)({},e),{},{allOpenPositions:[]});default:return e}},fe=a(41),Se=a(89),ye=a.n(Se),Oe=a(90),De=a(91),ge=Object(fe.createStore)(he,Object(De.composeWithDevTools)(Object(fe.applyMiddleware)(Oe.a,ye.a)));r.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(u.a,{store:ge},i.a.createElement(me,null))),document.getElementById("root"))},48:function(e,t,a){}},[[102,1,2]]]);
//# sourceMappingURL=main.dbee6008.chunk.js.map