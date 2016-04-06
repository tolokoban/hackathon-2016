var $ = require("dom");
var WS = require("tfw.web-service");
var Tpl = require("x-template");
var Wdg = require("x-widget");
var Gravatar = require("wdg.gravatar");
var HintManager = require("hint-manager");


exports.activate = function( id ) {
    var container = document.getElementById( 'user-container' );
    $.clear( container );
    Tpl.appendTo( "user.wait", container );
    Wdg.onWidgetCreation( 'qrcode2', function( wdg ) {
        wdg.id = id;
    });
    $.get( '#user-name' ).textContent = "Unpacking your data...";
    WS.get( 'registration', ['get', id] ).then(
        function( data ) {
            APP.data = data;
            console.info("[page-user] id=...", id);
            console.info("[page-user] data=...", data);
            if( !data ) {
                window.location = "?#/book/main";
                return;
            }
            $.get( '#user-name' ).textContent = data.firstname + " " + data.lastname.toUpperCase();
            $.clear( container );
            var children = Tpl.appendTo( "user.data", container );
            children.img.src = Gravatar.url( id, 128 );

            var p;
            for( var i=1 ; i<3 ; i++ ) {
                p = $.tag( 'p' );
                children.planning.appendChild( p );
                HintManager.appendTo( 'reminder' + i, p );
            }
        }
    );
};
