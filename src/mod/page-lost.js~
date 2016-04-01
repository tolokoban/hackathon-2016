var $ = require("dom");
var WS = require("tfw.web-service");
var Wdg = require("x-widget");
var Md5 = require("md5");

var Storage = require("tfw.storage").local;

var btnNewRegistration = document.getElementById( 'btnNewRegistration' );
$.on( btnNewRegistration, function() {
    APP.waitOn();
    var email = Wdg.getById( 'new-email' ).val();
    var firstname = Wdg.getById( 'new-firstname' ).val();
    var lastname = Wdg.getById( 'new-lastname' ).val();
    Storage.set( 'id', Md5( email ) );
    
    WS.get( 'registration', [
        'new', {
            email: email,
            firstname: firstname,
            lastname: lastname
        }
    ]).then(
        function( ret ) {
            APP.waitOff();
            window.location = "#/book/registration" + ret;
        },
        function( err ) {
            APP.waitOff();
        }
    );
});
