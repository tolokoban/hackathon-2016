require("$",function(n,a){n.config={name:"hackathon-2016",description:"Stuff for the Open Geneva Hackathon in 2016",author:"Tolokoban",version:"0.0.1",major:0,minor:0,revision:1,date:new Date(2016,3,1,19,54,30)};var r=null;n.lang=function(n){return void 0===n&&(n=window.localStorage.getItem("Language"),n||(n=window.navigator.language,n||(n=window.navigator.browserLanguage,n||(n="fr"))),n=n.substr(0,2).toLowerCase()),r=n,window.localStorage.setItem("Language",n),n},n.intl=function(a,r){var t,e,o,i,g,u,l=a[n.lang()],s=r[0];if(!l)return s;if(t=l[s],!t)return s;if(r.length>1){for(e="",g=0,o=0;o<t.length;o++)i=t.charAt(o),"$"===i?(e+=t.substring(g,o),o++,u=t.charCodeAt(o)-48,e+=0>u||u>=r.length?"$"+t.charAt(o):r[u],g=o+1):"\\"===i&&(e+=t.substring(g,o),o++,e+=t.charAt(o),g=o+1);e+=t.substr(g),t=e}return t}});
//# sourceMappingURL=$.js.map