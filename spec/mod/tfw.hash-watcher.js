require("tfw.hash-watcher",function(t,n){var r="?"+Date.now(),o=0,e=null,i="",a=[];n.exports=function(t){e=t,o||(o=window.setInterval(function(){var t=window.location.hash;if(r!=t)if(r=t,"function"==typeof e){for("#"==t.charAt(0)&&(t=t.substr(1)),i=t;"/"==t.charAt(0);)t=t.substr(1);a=t.split("/"),e.apply(e,a)}else window.clearTimeout(o),o=0},50))},n.exports.args=function(){return a},n.exports.hash=function(){return i}});
//# sourceMappingURL=tfw.hash-watcher.js.map