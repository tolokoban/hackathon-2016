require("tfw.wdg.book",function(t,e){"use strict";function a(t){var e=t.element().querySelector("input[autofocus]");e&&window.setTimeout(e.focus.bind(e),300);var a=t.attr("data-activate");if(a){var r=window.APP[a];"function"==typeof r&&r(this)}}var r=require("tfw.hash-watcher"),s=require("wdg"),o=function(t,e){"string"==typeof t&&(t=document.getElementById(t)),s.call(this,{element:t}),t.$ctrl=this,this.addClass("tfw-wdg-book","fullscreen");var o,i,n,d,l=this,h={},c=0;for(o=0;o<t.childNodes.length;o++)i=t.childNodes[o],1==i.nodeType&&(i=new s({element:i}),n=i.attr("data-page"),n&&n.length>0?(i.addClass("page"),i.attr("data-index")?c=parseInt(i.attr("data-index"))||0:i.attr("data-index",c),h[n]=i,d?i.addClass("hide"):(d=i,a.call(this,i))):i.addClass("overlay"),c++);this._pages=h,this._current=d,d||(console.error("[tfw.wdg.book] Book without pages!"),console.error('[tfw.wdg.book] Pages must have the "data-page" attribute!')),"undefined"!=typeof e&&r(function(){var t=r.hash().split(";");t.forEach(function(t){t=t.trim();var a;t.substr(0,e.length+2)=="/"+e+"/"&&(a=t.substr(e.length+2).trim(),l.show(a))})})};o.prototype=Object.create(s.prototype),o.prototype.constructor=o,o.prototype.show=function(t){var e,r=this._pages,s=r[t];if("undefined"==typeof s)return console.error("[tfw.wdg.book.show] Unknown page `"+t+"`!"),!1;var o=this._current,i=parseInt(s.attr("data-index"))||0,n=parseInt(o.attr("data-index"))||0;s&&s!=o&&(o.removeClass("transition"),o.removeClass("right"),o.removeClass("hide"),s.removeClass("transition"),s.removeClass("right"),s.removeClass("hide"),i>n?(s.addClass("right"),e=s.rect(),o.addClass("hide"),s.removeClass("right")):(s.addClass("hide"),e=s.rect(),o.addClass("right"),s.removeClass("hide")),o.addClass("transition"),s.addClass("transition"),this._current=s,a.call(this,s))},o.create=function(t,e){return new o(t,e)},e.exports=o});
//# sourceMappingURL=tfw.wdg.book.js.map