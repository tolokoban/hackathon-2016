/**********************************************************************
 require( 'require' )
 -----------------------------------------------------------------------
 @example

 var Path = require("node://path");  // Only in NodeJS/NW.js environment.
 var Button = require("tfw.button");

 **********************************************************************/

var require = function() {
    var modules = {};
    var definitions = {};
    var nodejs_require = typeof window.require === 'function' ? window.require : null;

    var f = function(id, body) {
        if( id.substr( 0, 7 ) == 'node://' ) {
            // Calling for a NodeJS module.
            if( !nodejs_require ) {
                throw Error( "[require] NodeJS is not available to load module `" + id + "`!" );
            }
            return nodejs_require( id.substr( 7 ) );
        }

        if( typeof body === 'function' ) {
            definitions[id] = body;
            return;
        }
        var mod;
        body = definitions[id];
        if (typeof body === 'undefined') {
            var err = new Error("Required module is missing: " + id);   
            console.error(err.stack);
            throw err;
        }
        mod = modules[id];
        if (typeof mod === 'undefined') {
            mod = {exports: {}};
            var exports = mod.exports;
            body(exports, mod);
            modules[id] = mod.exports;
            mod = mod.exports;
            //console.log("Module initialized: " + id);
        }
        return mod;
    };
    return f;
}();
function addListener(e,l) {
    if (window.addEventListener) {
        window.addEventListener(e,l,false);
    } else {
        window.attachEvent('on' + e, l);
    }
};

addListener(
    'DOMContentLoaded',
    function() {
        document.body.parentNode.$data = {};
        // Attach controllers.
        require('actions', function(exports, module) {
exports['appointment'] = ['app', [
    ['text', '<h1>Appointment</h1>'],
    ['text', '<code>arg0 = "{{arg0}}"</code>'],
    ['text', '<code>arg1 = "{{arg1}}"</code>'],
    ['text', '<b>{{appointments[arg1].date|datetime}}</b>'],
    ['text', '{{appointments[arg1].text}}'],
    ['button', { text: "Back", action: "s1-app1" }]
]]

exports['appointments'] = ['app', [
    ['set', {
        appointments: [
            { date: 201605031500, text: "See my GP for pain." },
            { date: 201605131700, text: "Surgery." },
            { date: 201605080800, text: "X-Ray." }
        ]
    }],
    ['button', { text: 'Record a new one', action: "new-appointment" }],
    ['loop', {
        list: "appointments",
        item: "tmp.appointment",
        sort: "date",
        filter: function( item ) {
            return item.text.indexOf( 'Ray' ) == -1;
        }
    }, [
        ['text', "<b>{{tmp.appointment.date}}</b>: {{tmp.appointment.text}}"]
    ]]
]]

exports['main'] = ["demo", [
    ["reset", { 
        today: 20160501,
        firstname: "Homer",
        lastname: "Broken"
    }],
    ["text", "Welcome! Please select a scenario:"],
    ["button", { text: "Mr {{lastname}} limbs a bit", action: "scenario1" }],
    ["button", { text: "Miss <i>blabla</i> has <i>blabla</i>", action: "scenario2" }],
]]

exports['new-appointment'] = ['app', [
    ['input-text', { data: 'tmp.date', text: 'Date' }],
    ['input-text', { data: 'tmp.text', text: 'Subject' }],
    ['button', { text: "Add", action: [
        function() {
            this.push(
                "appointments",
                {
                    date: this.get('tmp.date'),
                    text: this.get('tmp.text')
                }
            );
        },
        "s1-app1"
    ]}],
    ['button', { text: "Cancel", action: "s1-app" }]
]]

exports['personal-data'] = ['app', [
    ['input-text', { data: 'firstname', text: "Firstname" }],
    ['input-text', { data: 'lastname', text: "Lastname" }],
    ['button', { text: "Back", action: "s1-app1" }]
]]

exports['s1-app1'] = ['app', [
    ['set', {
        appointments: [
            { date: 201605031500, text: "See my GP for pain." },
            { date: 201605131700, text: "Surgery." },
            { date: 201605080800, text: "X-Ray." }
        ]
    }],
    ['nurse', "Hi {{firstname}},<br/>how can I help you?"],
    ['button', { text: "I limb a bit!", action: "s1-app2" }],
    ['button', { text: "Edit personal data", action: "personal-data" }],
    ['button', { text: "New Appointment", action: "new-appointment" }],
    ['loop', {
        list: "appointments",
        item: "tmp.apt",
        sort: "date",
        filter: function( item ) {
            return true; //item.text.indexOf( 'Ray' ) == -1;
        }
    }, [
        ['button', {
            style: 'box',            
            text: "<div><b>{{tmp.apt.date|datetime}}</b><br/>{{tmp.apt.text}}</div>",
            freeze: "tmp.apt.$key",
            action: "appointment/{{tmp.apt.$key}}"
        }]
    ]]
]]

exports['s1-app2'] = ['app', [
    ['nurse', "Ho! I'm sorry.<br/>I think you should call your GP."],
    ['button', { text: "{{gp.name}} <i>{{gp.phone}}</i>", action: "s1-app2" }],
    ['button', { text: "Find another one", action: "" }],
    ['input-bool', { data: "vaccination.ror.done", text: "Vaccination againts turtles" }],
    ['input-text', { data: "firstname", text: "Firstname" }],
    ['input-file', { data: "x-ray", text: "X-Ray scan" }]
]]

exports['scenario1'] = ['demo', [
    ['reset', {
        today: 20160501,
        "gp.name": "Dr Frankenstein",
        "gp.phone": "+4122666000",
        appointments: [
            { date: 201605031500, text: "See my GP for pain." },
            { date: 201605131700, text: "Surgery." },
            { date: 201605080800, text: "X-Ray." }
        ]
    }],
    ['text', "{{today|date}} - Mr {{lastname}} limps a lot."],
    ['button', { text: "He looks at his pHM&trade; app", action: "s1-app1" }]
]]

});
APP = require('app');
setTimeout(function (){if(typeof APP.start==='function')APP.start()});
/****************************************
<x-template name="nurse">
        <div class="hint">
            <div class="nurse-question">
                <div $tpl="text"/>
            </div>
        </div>
    </x-template>
****************************************/
require('x-template').register("nurse", function( root ) {
    var $ = require( 'dom' );
    var elem1 = $.div( "hint" );
    root.appendChild( elem1 );
    var elem2 = $.div( "nurse-question" );
    elem1.appendChild( elem2 );
    var elem3 = $.div();
    elem2.appendChild( elem3 );
    return { "text": elem3 };
});

    }
);
require("$",function(n,a){n.config={name:"hackathon-2016",description:"Stuff for the Open Geneva Hackathon in 2016",author:"Tolokoban",version:"0.0.2",major:0,minor:0,revision:2,date:new Date(2016,3,14,15,11,33)};var r=null;n.lang=function(n){return void 0===n&&(n=window.localStorage.getItem("Language"),n||(n=window.navigator.language,n||(n=window.navigator.browserLanguage,n||(n="fr"))),n=n.substr(0,2).toLowerCase()),r=n,window.localStorage.setItem("Language",n),n},n.intl=function(a,r){var t,e,o,i,g,u,l=a[n.lang()],s=r[0];if(!l)return s;if(t=l[s],!t)return s;if(r.length>1){for(e="",g=0,o=0;o<t.length;o++)i=t.charAt(o),"$"===i?(e+=t.substring(g,o),o++,u=t.charCodeAt(o)-48,e+=0>u||u>=r.length?"$"+t.charAt(o):r[u],g=o+1):"\\"===i&&(e+=t.substring(g,o),o++,e+=t.charAt(o),g=o+1);e+=t.substr(g),t=e}return t}});
//# sourceMappingURL=$.js.map
require("x-template",function(e,t){var r={};e.register=function(e,t){r[e]=t},e.appendTo=function(e,t){var n=r[e];if("undefined"==typeof n)throw Error("[x-template.create] Template not found: "+e+"!");if("function"!=typeof n)throw Error("[x-template.create] Template is not a function: "+e+"!");return n(t)}});
//# sourceMappingURL=x-template.js.map
require("app",function(e,a){function r(e){n.clear(p.demo,d(e))}function o(e){var a=d(e);n.addClass(a,"app","hide"),n.clear(p.appBody,a),window.setTimeout(function(){n.removeClass(a,"hide")})}function t(e){var a=d(e);n.addClass(a,"msg","hide"),n.clear(p.appBody,a),window.setTimeout(function(){n.removeClass(a,"hide")})}var n=require("dom"),i=require("data"),s=require("tfw.hash-watcher"),c=require("actions"),d=require("app.perform-actions"),p={demo:n.get("#DEMO"),app:n.get("#APP"),appBody:n.get("#APP-BODY")};s(function(e,a,s,d){i.set("arg1",a),i.set("arg2",s),i.set("arg3",d);var p=c[e];if("undefined"==typeof p)return console.error('Unknown action: "'+e+'"'),console.error(Object.keys(c)),void(location.hash="#main");var u=p[0].trim().toLowerCase(),m=p[1];switch(document.body.className=u,u){case"demo":r(m);break;case"app":o(m);break;case"msg":t(m)}n.get("#HEADER").innerHTML=i.parse("Open Hackathon 2016 - Team 3 - <b>{{today|date}}</b>")})});
//# sourceMappingURL=app.js.map
require("app.perform-actions",function(r,e){function n(r,e){return i.parse(r,e)}var t=require("dom"),i=require("data"),o=require("x-template"),u=require("input-boolean"),a=require("input-text"),f=require("input-file"),p=require("input-date");e.exports=function(r){var e=t.div();return r.forEach(function(n,t){Array.isArray(n)||(console.error("Element #"+t+" should be an array!"),console.info("[app.perform-actions] child=...",n),console.info("[app.perform-actions] children=...",r));var i=n[0],o=c[i];if(!o)throw"Unknonw type `"+i+"`!";var u=o.apply(e,n.slice(1));return"string"==typeof u?void(location.hash="#"+u):void(u&&e.appendChild(u))}),e};var c={text:function(r){var e=t.tag("p");return e.innerHTML=n(r),e},button:function(r){var e=t.tag("a",r.style||"button"),o={};return r.freeze&&(Array.isArray(r.freeze)||(r.freeze=[r.freeze]),r.freeze.forEach(function(r){o[r]=i.get(r)})),t.on(e,function(){var e=n(r.action,o);"string"==typeof e&&e.length>0&&(location.hash="#"+e)}),e.innerHTML=n(r.text),e},nurse:function(r){var e=t.div(),i=o.appendTo("nurse",e);return i.text.innerHTML=n(r),e},reset:function(r){i.reset();var e,n;for(e in r)n=r[e],i.set(e,n)},set:function(r){var e,n;for(e in r)n=r[e],i.set(e,n)},"input-bool":function(r){return u(r)},"input-text":function(r){return a(r)},"input-file":function(r){return f(r)},"input-date":function(r){return p(r)},loop:function(r,o){var u=n(r.list),a=n(r.item),f=n(r.sort),p=i.get(u);Array.isArray(p)||(p=[p]),"string"==typeof f&&f.trim().length>0&&(f=[f]),Array.isArray(f)&&p.sort(function(r,e){var n,t;for(n=0;n<f.length;n++){if(t=f[n],r[t]<e[t])return-1;if(r[t]>e[t])return 1}return 0}),"function"==typeof r.filter&&(p=p.filter(r.filter));var c=t.div();return p.forEach(function(r){i.set(a,r),c.appendChild(e.exports(o))}),c}}});
//# sourceMappingURL=app.perform-actions.js.map
require("input-date",function(e,t){var a=require("dom"),n=require("data");t.exports=function(e){var t=a.tag("input",{type:"datetime"}),r=a.tag("label","text",[a.div([e.text]),t]);return"undefined"!=typeof n.get(e.data)&&(t.value=n.get(e.data)),t.addEventListener("blur",function(){n.set(e.data,t.value),n.save()}),r}});
//# sourceMappingURL=input-date.js.map
require("data",function(e,r){function t(e){if(Array.isArray(e))"number"!=typeof e.$key&&(e.$key=1),e.forEach(function(r){"number"!=typeof r.$key&&(r.$key=e.$key++),t(r)});else if("object"==typeof e){var r;for(r in e)t(e[r])}}function n(r,t){switch(t){case"date":return r=e.num2dat(r),s[r.getMonth()]+" "+r.getDate()+", "+r.getFullYear();case"time":return r=e.num2dat(r),r.getHours()+":"+e.pad(r.getMinutes());case"datetime":return r=e.num2dat(r),s[r.getMonth()]+" "+r.getDate()+", "+r.getFullYear()+"  "+r.getHours()+":"+e.pad(r.getMinutes())}return r}function a(e){var r,t,n=0,a=0,u=0,o=[];for(a=0;a<e.length;a++)t=e.charAt(a),0==u?"["!=t&&"."!=t||(r={name:e.substr(n,a-n)},o.push(r),n=a+1,"["==t&&(u=1)):-1==u?"."==t?(n=a+1,u=0):console.error("Bad var name!\n"+e+"\nPos: "+a):"["==t?u++:"]"==t&&(u--,0==u&&(r.index=e.substr(n,a-n),n=a+1,u=-1));return 0==u?o.push({name:e.substr(n)}):console.error("Bad ending for var name!\n"+e),o}var u=(require("tfw.web-service"),require("tfw.storage").local),o=u.get("data",{})||{},s=["January","February","March","April","May","June","July","August","September","October","November","December"];e.get=function(r){var t,n,u,s=o,f=a(r);for(u=0;u<f.length;u++){if(t=f[u],s=s[t.name],"undefined"==typeof s)return;if(Array.isArray(s)&&t.index&&(n=e.get(t.index),s=s.find(function(e){return e.$key==n}),"undefined"==typeof s))return void console.error("Key `"+n+"` not found in `"+r+"` at level "+u+"!")}return s},e.set=function(e,r){t(r);var n,u=o,s=a(e);for(n=0;n<s.length-1;n++)"undefined"==typeof u[s[n].name]&&(u[s[n].name]={}),u=u[s[n].name];u[s.pop().name]=r},e.reset=function(){data={},e.save()},e.save=function(){u.set("data",o)},e.parse=function(r,t){if("undefined"==typeof t&&(t={}),Array.isArray(r)){var a,u,o;for(a=0;a<r.length;a++)if(u=r[a],o=e.parse(u),"undefined"!=typeof o&&"null"!==o)return o}else{if("function"==typeof r)return e.parse(r.call(e));if("string"==typeof r){for(var s,f,i,d=0,y="";;){if(s=r.indexOf("{{",d),-1==s)break;if(y+=r.substr(d,s-d),d=s+2,f=r.indexOf("}}",d),-1==f)break;for(i=r.substr(d,f-d).trim().split("|"),"undefined"!=typeof t[i[0]]?i[0]=t[i[0]]:i[0]=e.get(i[0])||"",a=1;a<i.length;a++)i[0]=n(i[0],i[a]);y+=i[0],d=f+2}return y+r.substr(d)}}},e.num2dat=function(e){for(var r=""+e;r.length<12;)r+="0";return new Date(parseInt(r.substr(0,4)),parseInt(r.substr(4,2))-1,parseInt(r.substr(6,2)),parseInt(r.substr(8,2)),parseInt(r.substr(10,2)),0)},e.pad=function(e,r,t){for("undefined"==typeof r&&(r=2),"undefined"==typeof t&&(t="0"),e=""+e;e.length<r;)e=t+e;return e},e.push=function(r,n){var a=e.get(r);return Array.isArray(a)?(t(a),n.$key=a.$key++,n.$key):(console.error("[Data.push] `"+r+"` is not an array!"),0)}});
//# sourceMappingURL=data.js.map
require("tfw.storage",function(t,e){function n(t){return function(e,n){var o=t.getItem(e);if(null===o)return n;try{o=JSON.parse(o)}catch(r){}return o}}function o(t){return function(e,n){t.setItem(e,JSON.stringify(n))}}t.local={get:n(window.localStorage),set:o(window.localStorage)},t.session={get:n(window.sessionStorage),set:o(window.sessionStorage)}});
//# sourceMappingURL=tfw.storage.js.map
require("tfw.web-service",function(e,n){function t(n,t,r){return console.info("[tfw.web-service]",n,t),new Promise(function(o,i){"undefined"==typeof r&&(r=s.url);var u=new XMLHttpRequest({mozSystem:!0});"withCredentials"in u?(u.open("POST",r+"/svc.php",!0),u.withCredentials=!0):(u=new XDomainRequest,u.open("POST",r+"/svc.php")),u.onload=function(){200!=u.status&&i({id:e.HTTP_ERROR,msg:"("+u.status+") "+u.statusText,status:u.status});var t=u.responseText;if("string"==typeof t){"!"==t.substr(0,1)&&i({id:e.BAD_ROLE,msg:Error('Service "'+n+'" needs role "'+t.substr(1)+'"!')});var r;try{r=JSON.parse(t)}catch(s){i({id:e.BAD_TYPE,msg:Error('Service "'+n+'" should return a valid JSON!\n'+s)})}o(r)}else i({id:e.BAD_TYPE,msg:Error('Service "'+n+'" should return a string!')})},u.onerror=function(){i({id:e.HTTP_ERROR,msg:"("+u.status+") "+u.statusText,status:u.status})};var l="s="+encodeURIComponent(n)+"&i="+encodeURIComponent(JSON.stringify(t));u.setRequestHeader("Content-type","application/x-www-form-urlencoded"),u.send(l)})}require("tfw.promise");var r=require("tfw.storage"),o=require("tfw.listeners"),i=null,u=new o,s={url:"tfw"},l=r.local.get("nigolotua");Array.isArray(l)&&(s.usr=l[0],s.pwd=l[1]),e.BAD_ROLE=-1,e.BAD_TYPE=-2,e.CONNECTION_FAILURE=-3,e.MISSING_AUTOLOGIN=-4,e.UNKNOWN_USER=-5,e.HTTP_ERROR=-6,e.changeEvent=u,e.logout=function(){return i=null,u.fire(),r.local.set("nigolotua",null),t("tfw.login.Logout")},e.login=function(n,o){return"undefined"==typeof n&&(n=s.usr),"undefined"==typeof o&&(o=s.pwd),new Promise(function(s,l){if("undefined"==typeof n){var f=r.local.get("nigolotua");if(!Array.isArray(f))return l({id:e.MISSING_AUTOLOGIN});n=f[0],o=f[1]}r.local.set("nigolotua",null),t("tfw.login.Challenge",n).then(function(e){var n,r,i,u,s=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],l=0,f=[];for(n=0;n<o.length;n++)f.push(o.charCodeAt(n));for(256%f.length==0&&f.push(0),n=0;256>n;n++)s[n%16]^=n+f[n%f.length],r=e[l++%e.length]%16,i=e[l++%e.length]%16,u=e[l++%e.length]%16,s[u]^=(s[u]+16*i+u)%256,s[i]^=(s[r]+s[u])%256;return t("tfw.login.Response",s)},l).then(function(t){"object"==typeof t?(i={data:t,hasRole:function(e){for(var n=0;n<t.roles.length;n++){var r=t.roles[n];if(r==e)return!0}return!1}},r.local.set("nigolotua",[n,o]),u.fire(),s(t)):(i=null,l({id:e.UNKNOWN_USER}))},l)})},e.get=function(n,r,o){return new Promise(function(i,u){t(n,r,o).then(i,function(s){"object"==typeof s&&s.id==e.BAD_ROLE?e.login().then(function(){t(n,r,o).then(i,u)},u):u(s)})})},e.user=function(){return i},e.config=function(e,n){return"undefined"==typeof n?s[e]:(s[e]=n,n)},window.$$&&(window.$$.service=function(n,t,r,o,i){var u=e.get(n,t);u.then(function(e){return o?r[o].call(r,e):e},function(e){return i?r[i].call(r,e):e})})});
//# sourceMappingURL=tfw.web-service.js.map
require("tfw.listeners",function(t,i){var r=function(){this._list=[]};r.prototype.add=function(t,i){if("function"!=typeof t)return!1;this.remove(t);for(var r=0;r<this._list.length;r++)if(t===this._list[r])return!1;return this._list.push([t,i]),!0},r.prototype.remove=function(t,i){if("function"!=typeof t)return!1;for(var r=0;r<this._list.length;r++){var e=this._list[r];if(t===e[0]&&i===e[1])return this._list.splice(r,1),!0}return!1},r.prototype.clear=function(){this._list=[]},r.prototype.fire=function(){var t,i,r,e,n=[].slice.call(arguments);for(t=0;t<this._list.length;t++)if(e=this._list[t],i=e[0],r=e[1],!1===i.apply(r,n))return!1;return!0},i.exports=r});
//# sourceMappingURL=tfw.listeners.js.map
require("tfw.promise",function(t,n){window.Promise||function(){"use strict";function t(t){return"function"==typeof t||"object"==typeof t&&null!==t}function n(t){return"function"==typeof t}function e(t){return"object"==typeof t&&null!==t}function r(){}function o(){return function(){process.nextTick(c)}}function i(){var t=0,n=new q(c),e=document.createTextNode("");return n.observe(e,{characterData:!0}),function(){e.data=t=++t%2}}function s(){var t=new MessageChannel;return t.port1.onmessage=c,function(){t.port2.postMessage(0)}}function u(){return function(){setTimeout(c,1)}}function c(){for(var t=0;Y>t;t+=2){var n=K[t],e=K[t+1];n(e),K[t]=void 0,K[t+1]=void 0}Y=0}function a(){}function f(){return new TypeError("You cannot resolve a promise with itself")}function l(){return new TypeError("A promises callback cannot return that same promise.")}function h(t){try{return t.then}catch(n){return z.error=n,z}}function p(t,n,e,r){try{t.call(n,e,r)}catch(o){return o}}function _(t,n,e){x(function(t){var r=!1,o=p(e,n,function(e){r||(r=!0,n!==e?m(t,e):w(t,e))},function(n){r||(r=!0,b(t,n))},"Settle: "+(t._label||" unknown promise"));!r&&o&&(r=!0,b(t,o))},t)}function v(t,n){n._state===U?w(t,n._result):t._state===W?b(t,n._result):g(n,void 0,function(n){m(t,n)},function(n){b(t,n)})}function d(t,e){if(e.constructor===t.constructor)v(t,e);else{var r=h(e);r===z?b(t,z.error):void 0===r?w(t,e):n(r)?_(t,e,r):w(t,e)}}function m(n,e){n===e?b(n,f()):t(e)?d(n,e):w(n,e)}function y(t){t._onerror&&t._onerror(t._result),A(t)}function w(t,n){t._state===N&&(t._result=n,t._state=U,0===t._subscribers.length||x(A,t))}function b(t,n){t._state===N&&(t._state=W,t._result=n,x(y,t))}function g(t,n,e,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=n,o[i+U]=e,o[i+W]=r,0===i&&t._state&&x(A,t)}function A(t){var n=t._subscribers,e=t._state;if(0!==n.length){for(var r,o,i=t._result,s=0;s<n.length;s+=3)r=n[s],o=n[s+e],r?P(e,r,o,i):o(i);t._subscribers.length=0}}function j(){this.error=null}function E(t,n){try{return t(n)}catch(e){return B.error=e,B}}function P(t,e,r,o){var i,s,u,c,a=n(r);if(a){if(i=E(r,o),i===B?(c=!0,s=i.error,i=null):u=!0,e===i)return void b(e,l())}else i=o,u=!0;e._state!==N||(a&&u?m(e,i):c?b(e,s):t===U?w(e,i):t===W&&b(e,i))}function T(t,n){try{n(function(n){m(t,n)},function(n){b(t,n)})}catch(e){b(t,e)}}function S(t,n,e,r){this._instanceConstructor=t,this.promise=new t(a,r),this._abortOnReject=e,this._validateInput(n)?(this._input=n,this.length=n.length,this._remaining=n.length,this._init(),0===this.length?w(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&w(this.promise,this._result))):b(this.promise,this._validationError())}function k(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function M(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function O(t,e){this._id=V++,this._label=e,this._state=void 0,this._result=void 0,this._subscribers=[],a!==t&&(n(t)||k(),this instanceof O||M(),T(this,t))}var C;C=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var R,D=C,Y=(Date.now||function(){return(new Date).getTime()},Object.create||function(t){if(arguments.length>1)throw new Error("Second argument not supported");if("object"!=typeof t)throw new TypeError("Argument must be an object");return r.prototype=t,new r},0),x=function(t,n){K[Y]=t,K[Y+1]=n,Y+=2,2===Y&&R()},I="undefined"!=typeof window?window:{},q=I.MutationObserver||I.WebKitMutationObserver,F="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,K=new Array(1e3);R="undefined"!=typeof process&&"[object process]"==={}.toString.call(process)?o():q?i():F?s():u();var N=void 0,U=1,W=2,z=new j,B=new j;S.prototype._validateInput=function(t){return D(t)},S.prototype._validationError=function(){return new Error("Array Methods must be provided an Array")},S.prototype._init=function(){this._result=new Array(this.length)};var G=S;S.prototype._enumerate=function(){for(var t=this.length,n=this.promise,e=this._input,r=0;n._state===N&&t>r;r++)this._eachEntry(e[r],r)},S.prototype._eachEntry=function(t,n){var r=this._instanceConstructor;e(t)?t.constructor===r&&t._state!==N?(t._onerror=null,this._settledAt(t._state,n,t._result)):this._willSettleAt(r.resolve(t),n):(this._remaining--,this._result[n]=this._makeResult(U,n,t))},S.prototype._settledAt=function(t,n,e){var r=this.promise;r._state===N&&(this._remaining--,this._abortOnReject&&t===W?b(r,e):this._result[n]=this._makeResult(t,n,e)),0===this._remaining&&w(r,this._result)},S.prototype._makeResult=function(t,n,e){return e},S.prototype._willSettleAt=function(t,n){var e=this;g(t,void 0,function(t){e._settledAt(U,n,t)},function(t){e._settledAt(W,n,t)})};var H=function(t,n){return new G(this,t,!0,n).promise},J=function(t,n){function e(t){m(i,t)}function r(t){b(i,t)}var o=this,i=new o(a,n);if(!D(t))return b(i,new TypeError("You must pass an array to race.")),i;for(var s=t.length,u=0;i._state===N&&s>u;u++)g(o.resolve(t[u]),void 0,e,r);return i},L=function(t,n){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var r=new e(a,n);return m(r,t),r},Q=function(t,n){var e=this,r=new e(a,n);return b(r,t),r},V=0,X=O;O.all=H,O.race=J,O.resolve=L,O.reject=Q,O.prototype={constructor:O,then:function(t,n,e){var r=this,o=r._state;if(o===U&&!t||o===W&&!n)return this;r._onerror=null;var i=new this.constructor(a,e),s=r._result;if(o){var u=arguments[o-1];x(function(){P(o,i,u,s)})}else g(r,i,t,n);return i},"catch":function(t,n){return this.then(null,t,n)}};var Z=function(){var t;t="undefined"!=typeof global?global:"undefined"!=typeof window&&window.document?window:self;var e="Promise"in t&&"resolve"in t.Promise&&"reject"in t.Promise&&"all"in t.Promise&&"race"in t.Promise&&function(){var e;return new t.Promise(function(t){e=t}),n(e)}();e||(t.Promise=X)};Z()}.call(this)});
//# sourceMappingURL=tfw.promise.js.map
require("dom",function(t,r){function n(t,r,n){return Object.defineProperty(t,"element",{value:r,writable:!1,configurable:!1,enumerable:!0}),n?t:(t.on=l.bind(t,r),t.css=o.bind(t,r),t.add=a.bind(t,r),t.att=i.bind(t,r),t.addClass=c.bind(t,r),t.hasClass=d.bind(t,r),t.removeClass=u.bind(t,r),t.toggleClass=f.bind(t,r),t)}function e(t,r){return r.parentNode.replaceChild(t,r),t}function o(t,r){var n,e;for(n in r)e=r[n],t.style[n]=e;return t}function i(t,r){var n,e;for(n in r)e=r[n],t.setAttribute(n,e);return t}function a(t){try{var r,n;for(r=1;r<arguments.length;r++)n=arguments[r],"string"==typeof n||"number"==typeof n?n=document.createTextNode(n):"function"==typeof n.element&&(n=n.element()),t.appendChild(n);return t}catch(e){throw console.error("[DOM.add] arguments=",[].slice.call(arguments)),Error("[DOM.add] "+e)}}function l(t,r,n){if("function"!=typeof r&&null!==r||(r={tap:r}),Array.isArray(t))return t.forEach(function(t){l(t,r)}),t;return t.addEventListener("click",function(n){var e=r.tap;"function"!=typeof e&&null!==e||(n.stopPropagation(),null!==e&&e(t))},n),t}function s(t,r){var n,e,o,i,l=document.createElementNS(t,r);for(n=2;n<arguments.length;n++)if(e=arguments[n],Array.isArray(e))e.forEach(function(t){switch(typeof t){case"string":case"number":case"boolean":t=document.createTextNode(""+t)}a(l,t)});else switch(typeof e){case"string":e.split(" ").forEach(function(t){t.length>0&&c(l,t)});break;case"object":for(o in e)i=e[o],l.setAttribute(o,i);break;default:throw Error("[dom.tag] Error creating <"+r+">: Invalid argument #"+n+"!")}return l}function c(t){var r=[].slice.call(arguments,1);return Array.isArray(t)?(r.unshift(null),t.forEach(function(t){r[0]=t,c.apply(void 0,r)}),t):(r.forEach(function(r){if("string"==typeof r){if(r=r.trim(),0==r.length)return;try{t.classList.add(r)}catch(n){console.error("[dom.addClass] Invalid class name: ",r),console.error(n)}}}),t)}function d(t,r){return t.classList.contains(r)}function u(t){var r=[].slice.call(arguments,1);return Array.isArray(t)?(r.unshift(null),t.forEach(function(t){r[0]=t,u.apply(void 0,r)}),t):(r.forEach(function(r){try{t.classList.remove(r)}catch(n){console.error("[dom.removeClass] Invalid class name: ",r),console.error(n)}}),t)}function f(t){var r=[].slice.call(arguments,1);return r.forEach(function(r){t.classList.toggle(r)}),t}function h(t){for(var r=t;r.firstChild;)r.removeChild(r.firstChild);var n=[].slice.call(arguments);return n.length>1&&a.apply(this,n),t}function w(t,r){return"undefined"==typeof r&&(r=t,t=window.document),t.querySelector(r)}function g(t){var r=t.parentElement;return r?(r.removeChild(t),r):r}require("polyfill.classList");"$"+Date.now();t.tagNS=s,t.svgRoot=s.bind(void 0,"http://www.w3.org/2000/svg","svg",{version:"1.1","xmlns:svg":"http://www.w3.org/2000/svg",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}),t.svg=s.bind(void 0,"http://www.w3.org/2000/svg"),t.tag=s.bind(void 0,"http://www.w3.org/1999/xhtml"),t.div=s.bind(void 0,"http://www.w3.org/1999/xhtml","div"),t.txt=window.document.createTextNode.bind(window.document),t.get=w,t.css=o,t.att=i,t.addClass=c,t.hasClass=d,t.removeClass=u,t.toggleClass=f,t.replace=e,t.detach=g,t.on=l,t.add=a,t.wrap=n,t.clear=h});
//# sourceMappingURL=dom.js.map
require("polyfill.classList",function(t,e){"document"in self&&("classList"in document.createElement("_")&&(!document.createElementNS||"classList"in document.createElementNS("http://www.w3.org/2000/svg","g"))?!function(){"use strict";var t=document.createElement("_");if(t.classList.add("c1","c2"),!t.classList.contains("c2")){var e=function(t){var e=DOMTokenList.prototype[t];DOMTokenList.prototype[t]=function(t){var n,i=arguments.length;for(n=0;i>n;n++)t=arguments[n],e.call(this,t)}};e("add"),e("remove")}if(t.classList.toggle("c3",!1),t.classList.contains("c3")){var n=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(t,e){return 1 in arguments&&!this.contains(t)==!e?e:n.call(this,t)}}t=null}():!function(t){"use strict";if("Element"in t){var e="classList",n="prototype",i=t.Element[n],s=Object,r=String[n].trim||function(){return this.replace(/^\s+|\s+$/g,"")},o=Array[n].indexOf||function(t){for(var e=0,n=this.length;n>e;e++)if(e in this&&this[e]===t)return e;return-1},c=function(t,e){this.name=t,this.code=DOMException[t],this.message=e},a=function(t,e){if(""===e)throw new c("SYNTAX_ERR","An invalid or illegal string was specified");if(/\s/.test(e))throw new c("INVALID_CHARACTER_ERR","String contains an invalid character");return o.call(t,e)},l=function(t){for(var e=r.call(t.getAttribute("class")||""),n=e?e.split(/\s+/):[],i=0,s=n.length;s>i;i++)this.push(n[i]);this._updateClassName=function(){t.setAttribute("class",this.toString())}},u=l[n]=[],f=function(){return new l(this)};if(c[n]=Error[n],u.item=function(t){return this[t]||null},u.contains=function(t){return t+="",-1!==a(this,t)},u.add=function(){var t,e=arguments,n=0,i=e.length,s=!1;do t=e[n]+"",-1===a(this,t)&&(this.push(t),s=!0);while(++n<i);s&&this._updateClassName()},u.remove=function(){var t,e,n=arguments,i=0,s=n.length,r=!1;do for(t=n[i]+"",e=a(this,t);-1!==e;)this.splice(e,1),r=!0,e=a(this,t);while(++i<s);r&&this._updateClassName()},u.toggle=function(t,e){t+="";var n=this.contains(t),i=n?e!==!0&&"remove":e!==!1&&"add";return i&&this[i](t),e===!0||e===!1?e:!n},u.toString=function(){return this.join(" ")},s.defineProperty){var h={get:f,enumerable:!0,configurable:!0};try{s.defineProperty(i,e,h)}catch(d){-2146823252===d.number&&(h.enumerable=!1,s.defineProperty(i,e,h))}}else s[n].__defineGetter__&&i.__defineGetter__(e,f)}}(self))});
//# sourceMappingURL=polyfill.classList.js.map
require("input-file",function(e,t){var a=require("dom"),i=require("data");t.exports=function(e){var t=a.tag("input",{type:"file"}),n=a.tag("label","text",[a.div([e.text]),t]);return"undefined"!=typeof i.get(e.data)&&(t.value=i.get(e.data)),t.addEventListener("blur",function(){i.set(e.data,t.value)}),n}});
//# sourceMappingURL=input-file.js.map
require("input-text",function(t,e){var a=require("dom"),n=require("data");e.exports=function(t){var e=a.tag("input",{type:"text"}),r=a.tag("label","text",[a.div([t.text]),e]);return"undefined"!=typeof n.get(t.data)&&(e.value=n.get(t.data)),e.addEventListener("blur",function(){n.set(t.data,e.value),n.save()}),r}});
//# sourceMappingURL=input-text.js.map
require("input-boolean",function(e,a){var t=require("dom"),s=require("data");a.exports=function(e){var a=t.div("boolean",[e.text]);return s.get(e.data)&&t.addClass(a,"yes"),t.on(a,function(){s.get(e.data)?(t.removeClass(a,"yes"),s.set(e.data,0)):(t.addClass(a,"yes"),s.set(e.data,1)),s.save}),a}});
//# sourceMappingURL=input-boolean.js.map
require("tfw.hash-watcher",function(t,n){var r="?"+Date.now(),o=0,e=null,i="",a=[];n.exports=function(t){e=t,o||(o=window.setInterval(function(){var t=window.location.hash;if(r!=t)if(r=t,"function"==typeof e){for("#"==t.charAt(0)&&(t=t.substr(1)),i=t;"/"==t.charAt(0);)t=t.substr(1);a=t.split("/"),e.apply(e,a)}else window.clearTimeout(o),o=0},50))},n.exports.args=function(){return a},n.exports.hash=function(){return i}});
//# sourceMappingURL=tfw.hash-watcher.js.map
