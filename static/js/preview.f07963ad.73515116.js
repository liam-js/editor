!function(){"use strict";var e=[];window.addEventListener("error",(function(n){var t=n.message;n.filename&&(t+="\n"+n.filename.replace(window.location.origin,"")),(n.lineno||n.colno)&&(t+=":"+n.lineno+":"+n.colno);var o=!!n.error&&!!n.error.stack&&n.error.stack.toString()||"";e.push({message:t,stack:o})})),window.addEventListener("error",(function(n){var t=n.target;if(["link","video","script","img","audio"].indexOf(t.localName)>-1){var o=t.href||t.src||t.currentSrc;e.push({message:"GET <".concat(t.localName,"> error: ").concat(o),stack:""})}}),!0),window.addEventListener("unhandledrejection",(function(n){var t=n&&n.reason,o="Uncaught (in promise) ",r={message:o,stack:t};t instanceof Error&&(r={message:o,stack:{name:t.name,message:t.message,stack:t.stack}}),e.push(r)}));var n=function(e){var n=window.location.search.split("?")[1];if(n)for(var t=n.split("&"),o=0;o<t.length;o++){var r=t[o].split("=");if(r[0]===e)return r[1]}}("url");function t(e,n,t,o){var r,i=!1,a=0;function c(){r&&clearTimeout(r)}function s(){for(var s=arguments.length,u=new Array(s),l=0;l<s;l++)u[l]=arguments[l];var d=this,f=Date.now()-a;function p(){a=Date.now(),t.apply(d,u)}function w(){r=void 0}i||(o&&!r&&p(),c(),void 0===o&&f>e?p():!0!==n&&(r=setTimeout(o?w:p,void 0===o?e-f:e)))}return"boolean"!==typeof n&&(o=t,t=n,n=void 0),s.cancel=function(){c(),i=!0},s}n=decodeURIComponent(n);var o=window.self!==window.top,r=!!window.opener,i=[];o||r?i.push("//e.sinaimg.cn/ssfe/liam/js/editor/popupWindowMessageManager.js"):(i.push("text!"+n),i.push("text!https://e.sinaimg.cn/ssfe/liam/js/editor/float-action-button.js")),window.t2=window.liamRequire,console.log("\u6267\u884c2"),window.liamRequire(["liam"],(function(n){window.liamRequire(i,(function(i,a){n.config({wrapText:!0});var c=function(e,n){Array.isArray(e)&&(e=e.join("-"));var t=document.querySelector(".pe-focus"),o=document.querySelector('[__loc="'+e+'"]');t&&t.classList.remove("pe-focus"),o&&(o.classList.add("pe-focus"),n&&o.scrollIntoView({block:"center",inline:"center"}))},s=t(200,(function(e){try{var t=n.toJs(e?e.trim():"");o&&!r||(t=[n.toJs(a,{text:e}),t]),n.render(t,document.querySelector("#root"))}catch(i){console.log(i)}}));if(o||r){var u=t(1e3,(function(){setTimeout((function(){0!==e.length&&(l.post({type:"preview-error",value:e}),e=[])}),0)}));window.addEventListener("error",(function(){u()})),window.addEventListener("unhandledrejection",(function(){u()}));var l=new i(r?window.opener:window.parent);l.on((function(e){e.type&&"change"===e.type&&(s(e.value),u()),e.type&&"cursor"===e.type&&c(e.value,!0)})),l.post({type:"preview-loaded"}),document.querySelector("body").addEventListener("click",(function(e){for(var n=e.target;n&&n.getAttribute&&!n.getAttribute("__loc");)n=n.parentNode;if(n&&n.getAttribute){var t=n.getAttribute("__loc");t&&(l.post({type:"preview-click",value:t}),c(t))}}))}else s(i)}))}))}();
//# sourceMappingURL=preview.f07963ad.73515116.js.map