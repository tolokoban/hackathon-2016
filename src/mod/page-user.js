var $ = require("dom");
var WS = require("tfw.web-service");
var Tpl = require("x-template");
var Wdg = require("x-widget");
var Data = require("data2");
var Gravatar = require("wdg.gravatar");
//var HintManager = require("hint-manager");

var hintNumber = 0;
var hintContainer;


exports.activate = function( id ) {
    var container = document.getElementById( 'user-container' );
    $.clear( container );
    Tpl.appendTo( "user.wait", container );
    Wdg.onWidgetCreation( 'qrcode2', function( wdg ) {
console.info("[page-user] QRCode 2, id=...", id);
        wdg.id = id;
    });
    $.get( '#user-name' ).textContent = "Unpacking your data...";
    WS.get( 'registration', ['get', id] ).then(
        function( data ) {
            Data.data = data;
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
            function showHint() {
                var p = $.tag( 'p' );
                children.planning.appendChild( p );
                HintManager.appendTo( 'reminder' + hintNumber, p );
                hintNumber = (hintNumber + 1) % 4;
            }

            $.on( $.get( '#random-hint' ), showHint );
        }
    );
};
