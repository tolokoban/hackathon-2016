var $ = require("dom");
var WS = require("tfw.web-service");
var Wdg = require("x-widget");

var Storage = require("tfw.storage").local;

var btnLostRegistration = document.getElementById( 'btnLostRegistration' );
$.on( btnLostRegistration, function() {
    APP.waitOn();
    var email = Wdg.getById( 'lost-email' ).val();
    
    WS.get( 'registration', [
        'new', {
            email: email
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
