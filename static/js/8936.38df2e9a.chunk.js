"use strict";(self.webpackChunkgithub_liam_editor=self.webpackChunkgithub_liam_editor||[]).push([[8936],{8936:function(e,t,o){o.r(t);var n=function(e){var t=this;t.opener=e,t.events={},t.readyEvents=[],t.id=0,t.opener=e,t.post(""),t.on((function(o){var n="14B0CF90_77EE_4503_B996_EC75241E281B_";if(clearTimeout(t._heartcheckTimeoutCloseId),o===n+"CLOSE"){t.intervalId=setInterval((function(){e.closed&&t.close()}),20),setTimeout((function(){t.post(n+"CLOSE_HEARTCHECK")}),100),t._heartcheckTimeoutCloseId=setTimeout((function(){t.close()}),200)}}))};n.prototype.on=function(e){var t=this,o=this.id++,n=t.events;n[o]=function(o){"function"===typeof e&&o.source===t.opener&&e(o.data)},window.addEventListener("message",n[o],!1)},n.prototype.post=function(e){var t=this.opener;t&&!t.closed&&t.postMessage?t.postMessage(e,"*"):console.log("window.opener is closed")},n.prototype.off=function(e){var t=this.events;if(e)this._offItem(e);else for(var o in t)Object.hasOwnProperty.call(t,o)&&this._offItem(o)},n.prototype._offItem=function(e){var t=this.events;window.removeEventListener("message",t[e],!1),t[e]&&delete t[e]},n.prototype.ready=function(e){e="function"===typeof e?e:function(){},this.openerReady?e():this.readyEvents.push(e)},n.prototype.destroy=function(e){var t=this;t.off(),t=null},n.prototype.close=function(e){window.close()},t.default=n}}]);
//# sourceMappingURL=8936.38df2e9a.chunk.js.map