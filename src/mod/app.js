/**********************************************************************
 **********************************************************************/
var $ = require("dom");
var Data = require("data");
var Hash = require("tfw.hash-watcher");
var Actions = require("actions");
var PerformActions = require('app.perform-actions');


// Main div af the screen.
var WDG = {
    demo: $.get( '#DEMO' ),
    app: $.get( '#APP' ),
    appBody: $.get( '#APP-BODY' )
};


Hash( function( actionID, arg1, arg2, arg3 ) {
    Data.set( "arg1", arg1 );
    Data.set( "arg2", arg2 );
    Data.set( "arg3", arg3 );
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

    $.get( '#HEADER' ).innerHTML = Data.parse( "Open Hackathon 2016 - Team 3 - <b>{{today|date}}</b>" );
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
