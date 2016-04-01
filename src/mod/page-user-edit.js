var $ = require("dom");
var WS = require("tfw.web-service");
var Wdg = require("x-widget");

var inputFirstname;
var inputLastname;

$.on(
    $.get( '#btnUserUpdate' ),
    function() {
        APP.waitOn();

        WS.get(
            'registration',
            ['set', { id: APP.id, firstname: inputFirstname.val(), lastname: inputLastname.val()}]
        ).then(
            function( data ) {
                APP.waitOff();
                console.info("[page-user] data=...", data);
                window.location = "#/book/user";
            },
            function( err ) {
                console.error( err );
                APP.waitOff();
            }
        );
    }
);

exports.activate = function( id ) {
    inputFirstname = Wdg.getById( 'user-edit-firstname' );
    inputLastname = Wdg.getById( 'user-edit-lastname' );

    inputLastname.val( APP.data.lastname );
    inputFirstname.val( APP.data.firstname );
};
