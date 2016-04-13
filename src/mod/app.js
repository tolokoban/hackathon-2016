/**********************************************************************
 **********************************************************************/
var $ = require("dom");
var Hash = require("tfw.hash-watcher");
var Actions = require("actions");
var PerformActions = require('app.perform-actions');


// Main div af the screen.
var WDG = {
    demo: $.get( '#DEMO' ),
    app: $.get( '#APP' ),
    appBody: $.get( '#APP-BODY' )
};

/*
if( location.hash.length < 2 ) {
    location.hash = "#main";
}
*/

Hash( function( actionID ) {
    var action = Actions[actionID];
    if( typeof action === 'undefined' ) {
        console.error( 'Unknown action: "' + actionID + '"' );
        console.error( Object.keys( Actions ) );
        location.hash = "#main";
        return;
    }

    var type = action[0].trim().toLowerCase();
    var children = action[1];

    document.body.className = type;
    switch( type ) {
        case 'demo': actionDemo( children ); break;
        case 'app': actionApp( children ); break;
        case 'msg': actionMsg( children ); break;
    }
});


function actionDemo( children ) {
    $.clear( WDG.demo, PerformActions( children ) );
}


function actionApp( children ) {
    var content = PerformActions( children );
    $.addClass( content, 'app', 'hide' );
    $.clear( WDG.appBody, content );
    window.setTimeout(function() {
        $.removeClass( content, 'hide' );
    });
}


function actionMsg( children ) {
    var content = PerformActions( children );
    $.addClass( content, 'msg', 'hide' );
    $.clear( WDG.appBody, content );
    window.setTimeout(function() {
        $.removeClass( content, 'hide' );
    });
}
