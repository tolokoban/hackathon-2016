var $ = require("dom");
var WS = require("tfw.web-service");
var Tpl = require("x-template");
var Wdg = require("x-widget");
var Gravatar = require("wdg.gravatar");


exports.activate = function( id ) {
    var container = document.getElementById( 'user-container' );
    $.clear( container );
    Tpl.appendTo( "user.wait", container );
    Wdg.onWidgetCreation( 'qrcode2', function( wdg ) {
        wdg.id = id;
    });
    WS.get( 'registration', ['get', id] ).then(
        function( data ) {
            APP.data = data;
            if( !data ) {
                window.location = "?#/book/main";
                return;
            }
            console.info("[page-user] data=...", data);
            $.clear( container );
            var children = Tpl.appendTo( "user.data", container );
            console.info("[page-user] children=...", children);
            children.img.src = Gravatar.url( id, 128 );
            children.firstname.textContent = data.firstname;
            children.lastname.textContent = data.lastname;
            var planning = children.planning;
            $.clear( planning );
            if( Array.isArray( data.planning ) ) {
                data.planning.forEach(function (visit) {
                    var children = Tpl.appendTo( "user.visit", planning );
                    children.visitName.textContent = visit.name;
                    children.visitDate.textContent = visit.date;
                    children.visitName.setAttribute(
                        'href',
                        "https://www.google.ch/maps/search/"
                        + ("" + visit.address).replace( /[ ]/g, '+' )
                    );
                });

            }
        }
    );
};
