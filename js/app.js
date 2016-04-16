require( 'app', function(exports, module) {  /**********************************************************************
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

$.on( $.get( "#CLOSE" ), function() {
    location.hash = "#" + data.get( '$next' );
});


Hash( function( actionID, arg1, arg2, arg3 ) {
    if( actionID == 'refresh' ) {
        location.hash = arg1;
        return;
    }
    var action = findAction( actionID, arg1, arg2, arg3 );
    if( !action ) return;

    Data.set( "arg0", actionID );
    Data.set( "arg1", arg1 );
    Data.set( "arg2", arg2 );
    Data.set( "arg3", arg3 );
    console.log( "----------------------------------------" );
    console.info("[app] actionID=...", actionID, Data.get( "arg0" ));
    Data.log();

    if( typeof action === 'undefined' ) {
        console.error( 'Unknown action: "' + actionID + '"' );
        console.error( Object.keys( Actions ) );
        location.hash = "#main";
        return;
    }

    var type = action[0].trim().toLowerCase();
    var children = action[1];

    document.body.className = type;
    try {
        switch( type ) {
        case 'story': actionDemo( children ); break;
        case 'demo': actionDemo( children ); break;
        case 'app': actionApp( children ); break;
        case 'msg': actionMsg( children ); break;
        }
    }
    catch( ex ) {
        console.error( "Error in " + type.toUpperCase() + ":", children );
        console.error( "Action:", action );
        alert( "There is an error!" );
    }

    $.get( '#HEADER' ).innerHTML = Data.parse( "Open Hackathon 2016 - Team 3 - <b>{{$today|datetime}}</b>" );
    Data.log();
    Data.save();
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


/**
 * `arg0` has the last actionID.
 * If `arg0 == "A:B:C"` and `actionID == "foo:bar"`,
 * the actions will be serach in this order:
 * * `A:B:foo:bar`
 * * `A:foo:bar`
 * * `foo:bar`
 */
function findAction( actionID, arg1, arg2, arg3 ) {
    var from = Data.get( "arg0" ) || '';
    from = ("" + from).trim().split( ":" );
    if( from.length > 1 ) {
        from.pop();
        var i;
        var hash;
        var prefix;
        var action;
        for( i = from.length ; i > 0 ; i-- ) {
            prefix = from.slice( 0, i ).join( ':' );
            if( prefix.length > 0 ) prefix += ":";
            action = Actions[ prefix + actionID ];
            if( action ) {
                hash = "#" + prefix + actionID;
                if( typeof arg1 !== 'undefined' ) {
                    hash += "/" + arg1;
                    if( typeof arg2 !== 'undefined' ) {
                        hash += "/" + arg2;
                        if( typeof arg3 !== 'undefined' ) {
                            hash += "/" + arg3;
                        }
                    }
                }
                location.hash = hash;
                return undefined;
            }
        }
    }
    action = Actions[actionID];
    if( !action ) {
        location.hash = "#main";
    }
    return action;
}
 });
