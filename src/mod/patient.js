/**********************************************************************
 require( 'patient' )
 -----------------------------------------------------------------------
 The patient application is here.
 **********************************************************************/
/**********************************************************************
 require( 'main' )
 -----------------------------------------------------------------------
 Global functions needed for the book.
 **********************************************************************/

require("button");
require("page-new");
require("page-lost");

var $ = require("dom");
var WS = require("tfw.web-service");
var Wdg = require("x-widget");
var Md5 = require("md5");
var Data = require("data2");
var Storage = require("tfw.storage").local;
var PageUserEdit = require("page-user-edit");


var querystring = window.location.search.substr( 1 );
if( Md5.isValid( querystring ) ) {
    exports.id = querystring;
    Data.load( querystring, function() {
        console.info("[patient] Data.data=...", Data.data);
        var portal = Data.get( '$portal' );
        if( portal == 1 ) {
            window.location = "#/book/portal";
        } else {
            window.location = "#/book/user";
        }
    });
}

exports.onActivateMain = function() {
    var qrcode = Wdg.onWidgetCreation( 'qrcode', function( wdg ) {
        wdg.id = Storage.get( 'id', Md5( "contact@tolokoban.org" ) );
    });
};


exports.onActivatePortal = function() {
    $.get( "#portal-patient-name" ).textContent = Data.parse( "{{dg.firstname}} {{dg.lastname}}" );
    Wdg.getById( 'portal-apt-list' ).refresh();
};


exports.onActivateUser = function() {
    if( !Data.data() ) {
        window.location = "?" + exports.id;
    } else {
        $.get( "#user-name" ).textContent = Data.parse( "{{dg.firstname}} {{dg.lastname}}" );
    }
};


exports.onActivateUserEdit = function() {
    PageUserEdit.activate( APP.id );
};


exports.waitOn = function() {
    var wait = document.getElementById( "wait" );
    wait.style.display = "block";
};

exports.waitOff = function() {
    var wait = document.getElementById( "wait" );
    wait.style.display = "none";
};


exports.onPortalOpen = function() {
    var email = Wdg.getById( 'doctor-email' );
    APP.waitOn();
    var newid = Md5( APP.id );
    WS.get( 'registration', ['tmp', { id: newid, target: APP.id }]).then(
        function( ret ) {
            APP.waitOff();
            location.hash = "#/book/portal-open/" + newid;
        },
        function( err ) {
            APP.waitOff();
            console.error( err );
        }
    );
};


exports.onActivatePortalOpen = function( md5 ) {
    var a = $.get( "#provided-url");
    a.textContent = md5;
    a.setAttribute( "href", "?" + md5 );
};


exports.onAddApt = function() {
    var apt = {
        type: Wdg.getById( "apt-add-type" ).val(),
        name: Wdg.getById( "apt-add-name" ).val(),
        specialist: Wdg.getById( "apt-add-specialist" ).val(),
        reason: Wdg.getById( "apt-add-reason" ).val(),
        date: Wdg.getById( "apt-add-date" ).YMDhms(),
        comment: Wdg.getById( "apt-add-comments" ).val(),
        location: Wdg.getById( "apt-add-location" ).val()
    };
console.info("[patient] apt=...", apt);
    Data.push( "appointments", apt );
console.info("[patient] Data.data=...", Data.data());
    APP.waitOn();
    Data.save().then(function() {
        APP.waitOff();
        location.hash = "#/book/portal";
    }, function(err) {
        APP.waitOff();
        console.error( err );
    });
};


exports.onActivateAptList = function() {
    Wdg.getById('apt-list').refresh();
};
