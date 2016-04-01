{"intl":"","src":"require( 'wdg.gravatar', function(exports, module) {  // https://secure.gravatar.com/site/implement/images/\r\n\r\nvar Widget = require(\"wdg\");\r\nvar Md5 = require(\"md5\");\r\n\r\n/**\r\n * @param {string} md5 Email's MD5.\r\n * @param {number} size Side size in pixel of the image. Default = `32`.\r\n * @param {string} unknown Que faut-il afficher s'il n'y a pas de Gravatar. Default = `retro`.\r\n * \r\n * * `404` : Ne rien retourner. C'est la valeur par défaut.\r\n * * `mm` : Mystery Man, constant.\r\n * * `blank` : Blanc, constant.\r\n * * `identicon` : Dépend de l'e-mail.\r\n * * `monsterid` : Dépend de l'e-mail.\r\n * * `wavatar` : Dépend de l'e-mail.\r\n * * `retro` : Dépend de l'e-mail.\r\n * \r\n */\r\nvar getURL = function(md5, size, unknown) {\r\n    if (typeof size === 'undefined') size = 32;\r\n    if (typeof unknown === 'undefined') unknown = \"retro\";\r\n\r\n    return \"https://secure.gravatar.com/avatar/\"\r\n        + md5 + \"?s=\" + size + \"&r=pg&d=\" + unknown;\r\n};\r\n\r\n/**\r\n * @param {string} email Adresse mail ou MD5.\r\n * @param {string} unknown Que faut-il afficher s'il n'y a pas de Gravatar.\r\n * \r\n * * `404` : Ne rien retourner. C'est la valeur par défaut.\r\n * * `mm` : Mystery Man, constant.\r\n * * `blank` : Blanc, constant.\r\n * * `identicon` : Dépend de l'e-mail.\r\n * * `monsterid` : Dépend de l'e-mail.\r\n * * `wavatar` : Dépend de l'e-mail.\r\n * * `retro` : Dépend de l'e-mail.\r\n * \r\n * @example\r\n * var Gravatar = require(\"wdg.gravatar\");\r\n * var instance = new Gravatar(email, size);\r\n * @class Gravatar\r\n */\r\nvar Gravatar = function(email, size, unknown) {\r\n    var that = this;\r\n    Widget.call(this);\r\n    if (typeof unknown === 'undefined') unknown = 'retro';\r\n    var md5 = email;\r\n    if (email.indexOf(\"@\") > 0) {\r\n        md5 = Md5(email);\r\n    }\r\n    this.addClass(\"wdg-gravatar\", \"hide\");\r\n    if (typeof size !== 'number') size = 32;\r\n    this._loaded = false;\r\n    this._defined = false;\r\n    this._url = null;\r\n    this.css({width: size + \"px\", height: size + \"px\"});\r\n    var img = new Image();\r\n    img.onload = function() {\r\n        that.css({backgroundImage: \"url(\" + img.src + \")\"});\r\n        that._loaded = true;\r\n        that._defined = true;\r\n        that.removeClass(\"hide\");\r\n    };\r\n    img.onerror = function() {\r\n        that._loaded = true;\r\n        that._defined = false;\r\n    };\r\n    img.src = getURL(md5, size, unknown);\r\n    this._url = img.src;\r\n};\r\n\r\nGravatar.prototype = Object.create(Widget.prototype);\r\nGravatar.prototype.constructor = Gravatar;\r\n\r\n/**\r\n * @return void\r\n */\r\nGravatar.prototype.isLoaded = function() {\r\n    return this._loaded;\r\n};\r\n\r\n/**\r\n * @return void\r\n */\r\nGravatar.prototype.isDefined = function() {\r\n    return this._defined;\r\n};\r\n\r\nGravatar.create = function(email, size, unknown) {\r\n    return new Gravatar(email, size, unknown);\r\n};\r\n\r\nGravatar.url = getURL;\r\n\r\nmodule.exports = Gravatar;\r\n });\r\n","zip":"require(\"wdg.gravatar\",function(e,r){var t=require(\"wdg\"),n=require(\"md5\"),o=function(e,r,t){return\"undefined\"==typeof r&&(r=32),\"undefined\"==typeof t&&(t=\"retro\"),\"https://secure.gravatar.com/avatar/\"+e+\"?s=\"+r+\"&r=pg&d=\"+t},d=function(e,r,d){var i=this;t.call(this),\"undefined\"==typeof d&&(d=\"retro\");var a=e;e.indexOf(\"@\")>0&&(a=n(e)),this.addClass(\"wdg-gravatar\",\"hide\"),\"number\"!=typeof r&&(r=32),this._loaded=!1,this._defined=!1,this._url=null,this.css({width:r+\"px\",height:r+\"px\"});var s=new Image;s.onload=function(){i.css({backgroundImage:\"url(\"+s.src+\")\"}),i._loaded=!0,i._defined=!0,i.removeClass(\"hide\")},s.onerror=function(){i._loaded=!0,i._defined=!1},s.src=o(a,r,d),this._url=s.src};d.prototype=Object.create(t.prototype),d.prototype.constructor=d,d.prototype.isLoaded=function(){return this._loaded},d.prototype.isDefined=function(){return this._defined},d.create=function(e,r,t){return new d(e,r,t)},d.url=o,r.exports=d});\n//# sourceMappingURL=wdg.gravatar.js.map","map":{"version":3,"file":"wdg.gravatar.js.map","sources":["wdg.gravatar.js"],"sourcesContent":["require( 'wdg.gravatar', function(exports, module) {  // https://secure.gravatar.com/site/implement/images/\r\n\r\nvar Widget = require(\"wdg\");\r\nvar Md5 = require(\"md5\");\r\n\r\n/**\r\n * @param {string} md5 Email's MD5.\r\n * @param {number} size Side size in pixel of the image. Default = `32`.\r\n * @param {string} unknown Que faut-il afficher s'il n'y a pas de Gravatar. Default = `retro`.\r\n * \r\n * * `404` : Ne rien retourner. C'est la valeur par défaut.\r\n * * `mm` : Mystery Man, constant.\r\n * * `blank` : Blanc, constant.\r\n * * `identicon` : Dépend de l'e-mail.\r\n * * `monsterid` : Dépend de l'e-mail.\r\n * * `wavatar` : Dépend de l'e-mail.\r\n * * `retro` : Dépend de l'e-mail.\r\n * \r\n */\r\nvar getURL = function(md5, size, unknown) {\r\n    if (typeof size === 'undefined') size = 32;\r\n    if (typeof unknown === 'undefined') unknown = \"retro\";\r\n\r\n    return \"https://secure.gravatar.com/avatar/\"\r\n        + md5 + \"?s=\" + size + \"&r=pg&d=\" + unknown;\r\n};\r\n\r\n/**\r\n * @param {string} email Adresse mail ou MD5.\r\n * @param {string} unknown Que faut-il afficher s'il n'y a pas de Gravatar.\r\n * \r\n * * `404` : Ne rien retourner. C'est la valeur par défaut.\r\n * * `mm` : Mystery Man, constant.\r\n * * `blank` : Blanc, constant.\r\n * * `identicon` : Dépend de l'e-mail.\r\n * * `monsterid` : Dépend de l'e-mail.\r\n * * `wavatar` : Dépend de l'e-mail.\r\n * * `retro` : Dépend de l'e-mail.\r\n * \r\n * @example\r\n * var Gravatar = require(\"wdg.gravatar\");\r\n * var instance = new Gravatar(email, size);\r\n * @class Gravatar\r\n */\r\nvar Gravatar = function(email, size, unknown) {\r\n    var that = this;\r\n    Widget.call(this);\r\n    if (typeof unknown === 'undefined') unknown = 'retro';\r\n    var md5 = email;\r\n    if (email.indexOf(\"@\") > 0) {\r\n        md5 = Md5(email);\r\n    }\r\n    this.addClass(\"wdg-gravatar\", \"hide\");\r\n    if (typeof size !== 'number') size = 32;\r\n    this._loaded = false;\r\n    this._defined = false;\r\n    this._url = null;\r\n    this.css({width: size + \"px\", height: size + \"px\"});\r\n    var img = new Image();\r\n    img.onload = function() {\r\n        that.css({backgroundImage: \"url(\" + img.src + \")\"});\r\n        that._loaded = true;\r\n        that._defined = true;\r\n        that.removeClass(\"hide\");\r\n    };\r\n    img.onerror = function() {\r\n        that._loaded = true;\r\n        that._defined = false;\r\n    };\r\n    img.src = getURL(md5, size, unknown);\r\n    this._url = img.src;\r\n};\r\n\r\nGravatar.prototype = Object.create(Widget.prototype);\r\nGravatar.prototype.constructor = Gravatar;\r\n\r\n/**\r\n * @return void\r\n */\r\nGravatar.prototype.isLoaded = function() {\r\n    return this._loaded;\r\n};\r\n\r\n/**\r\n * @return void\r\n */\r\nGravatar.prototype.isDefined = function() {\r\n    return this._defined;\r\n};\r\n\r\nGravatar.create = function(email, size, unknown) {\r\n    return new Gravatar(email, size, unknown);\r\n};\r\n\r\nGravatar.url = getURL;\r\n\r\nmodule.exports = Gravatar;\r\n });\r\n"],"names":["require","exports","module","Widget","Md5","getURL","md5","size","unknown","Gravatar","email","that","this","call","indexOf","addClass","_loaded","_defined","_url","css","width","height","img","Image","onload","backgroundImage","src","removeClass","onerror","prototype","Object","create","constructor","isLoaded","isDefined","url"],"mappings":"AAAAA,QAAS,eAAgB,SAASC,EAASC,GAE3C,GAAIC,GAASH,QAAQ,OACjBI,EAAMJ,QAAQ,OAgBdK,EAAS,SAASC,EAAKC,EAAMC,GAI7B,MAHoB,mBAATD,KAAsBA,EAAO,IACjB,mBAAZC,KAAyBA,EAAU,SAEvC,sCACDF,EAAM,MAAQC,EAAO,WAAaC,GAoBxCC,EAAW,SAASC,EAAOH,EAAMC,GACjC,GAAIG,GAAOC,IACXT,GAAOU,KAAKD,MACW,mBAAZJ,KAAyBA,EAAU,QAC9C,IAAIF,GAAMI,CACNA,GAAMI,QAAQ,KAAO,IACrBR,EAAMF,EAAIM,IAEdE,KAAKG,SAAS,eAAgB,QACV,gBAATR,KAAmBA,EAAO,IACrCK,KAAKI,SAAU,EACfJ,KAAKK,UAAW,EAChBL,KAAKM,KAAO,KACZN,KAAKO,KAAKC,MAAOb,EAAO,KAAMc,OAAQd,EAAO,MAC7C,IAAIe,GAAM,GAAIC,MACdD,GAAIE,OAAS,WACTb,EAAKQ,KAAKM,gBAAiB,OAASH,EAAII,IAAM,MAC9Cf,EAAKK,SAAU,EACfL,EAAKM,UAAW,EAChBN,EAAKgB,YAAY,SAErBL,EAAIM,QAAU,WACVjB,EAAKK,SAAU,EACfL,EAAKM,UAAW,GAEpBK,EAAII,IAAMrB,EAAOC,EAAKC,EAAMC,GAC5BI,KAAKM,KAAOI,EAAII,IAGpBjB,GAASoB,UAAYC,OAAOC,OAAO5B,EAAO0B,WAC1CpB,EAASoB,UAAUG,YAAcvB,EAKjCA,EAASoB,UAAUI,SAAW,WAC1B,MAAOrB,MAAKI,SAMhBP,EAASoB,UAAUK,UAAY,WAC3B,MAAOtB,MAAKK,UAGhBR,EAASsB,OAAS,SAASrB,EAAOH,EAAMC,GACpC,MAAO,IAAIC,GAASC,EAAOH,EAAMC,IAGrCC,EAAS0B,IAAM9B,EAEfH,EAAOD,QAAUQ"},"dependencies":["mod/wdg.gravatar","mod/wdg","mod/md5"]}