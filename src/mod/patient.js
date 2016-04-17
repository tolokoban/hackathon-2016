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

require("tp4.button");
require("page-new");
require("page-lost");

var Wdg = require("x-widget");
var Md5 = require("md5");
var Data = require("data2");
var Storage = require("tfw.storage").local;
var PageUser = require("page-user");
var PageUserEdit = require("page-user-edit");


var querystring = window.location.search.substr( 1 );
if( Md5.isValid( querystring ) ) {
    exports.id = querystring;
    Data.load( querystring, function() {
        window.location = "#/book/user";
    });
}

exports.onActivateMain = function() {
    var qrcode = Wdg.onWidgetCreation( 'qrcode', function( wdg ) {
        wdg.id = Storage.get( 'id', Md5( "contact@tolokoban.org" ) );
    });
};


exports.onActivateUser = function() {
    PageUser.activate( APP.id );
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
