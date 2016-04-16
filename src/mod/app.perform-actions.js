/**********************************************************************
 require( 'app.perform-actions' )
 -----------------------------------------------------------------------

 **********************************************************************/
var $ = require("dom");
var Tpl = require("x-template");
var Data = require('data');
var Actions = require("actions");
var InputBool = require("input-boolean");
var InputText = require("input-text");
var InputFile = require("input-file");
var InputDate = require("input-date");
var InputSelect = require("input-select");


module.exports = function( children ) {
    var body = $.div();

    try {
        if( typeof children === 'undefined' ) {
            throw( "children is undefined! But it must be an Array." );
        }
        children.forEach(function ( child, idx ) {
            try {
                if( !Array.isArray( child ) ) {
                    throw( "Element #" + idx + " should be an array!" );
                }
                var actionID = child[0];
                var action = actions[actionID];
                if( action ) {
                    var element = action.apply( body, child.slice( 1 ) );
                    if( typeof element === 'string' ) {
                        location.hash = '#' + element;
                        return;
                    }
                    if( element ) body.appendChild( element );
                } else {
                    throw "Unknonw type `" + actionID + "`!";
                }
            }
            catch( ex ) {
                console.error( "Exception: ", ex );
                console.error( "Child #" + idx, child );
                throw( null );
            }
        }, this);
    }
    catch( ex ) {
        if( ex !== null ) {
            console.error( "Exception: ", ex );
        }
        console.error( "Error in: ", children );
        throw( ex );
    }
    return body;
};


var actions = {
    text: function( args ) {
        var div = $.tag( 'p' );
        div.innerHTML = parse( args );
        return div;
    },
    button: function( args ) {
        var btn = $.tag( 'a', args.style || 'button' );
        var context = {};
        if( args.freeze ) {
            if( !Array.isArray( args.freeze ) ) {
                args.freeze = [args.freeze];
            }
            args.freeze.forEach(function ( name ) {
                context[name] = Data.get( name );
            });

        }
        $.on( btn, function() {
            var target = parse( args.action, context );
            if( typeof target === 'string' && target.length > 0 ) {
                console.log( "GOTO: " + target );
                location.hash = "#" + target;
            }
        });
        btn.innerHTML = parse( args.text );
        return btn;
    },
    nurse: function( args ) {
        var content = $.div();
        var children = Tpl.appendTo( "nurse", content );
        children.text.innerHTML = parse( args );
        return content;
    },
    reset: function( args ) {
        Data.reset();
        var key, val;
        if( typeof args === 'string' ) {
            args = Actions[args];
        }
        for( key in args ) {
            val = args[key];
            Data.set( key, val );
        }
    },
    set: function( args ) {
        var key, val;
        for( key in args ) {
            val = args[key];
            Data.set( key, parse( val ) );
        }
    },
    "input-bool": function( args ) {
        return InputBool( args );
    },
    "input-text": function( args ) {
        return InputText( args );
    },
    "input-select": function( args ) {
        return InputSelect( args );
    },
    "input-file": function( args ) {
        return InputFile( args );
    },
    "input-date": function( args ) {
        return InputDate( args );
    },
    row: function( args ) {
        var tbl = $.div( 'tbl' );
        if( !Array.isArray( args ) ) args = [args];
        args.forEach(function ( arg ) {
            var body = module.exports( [arg] );
            $.add( tbl, $.div([ body ], {
                style: "width:" + (100 / args.length) + "%"
            }));            
        });
        return tbl;
    },
    loop: function( args, children ) {
        var list = parse( args.list );
        var item = parse( args.item );
        var sort = parse( args.sort );

        var arr = Data.get( list );
        if( !Array.isArray( arr ) ) arr = [arr];

        // Sorting.
        if( typeof sort === 'string' && sort.trim().length > 0 ) {
            sort = [sort];
        }
        if( Array.isArray( sort ) ) {
            arr.sort(function( a, b ) {
                var i, att;
                for (i = 0 ; i < sort.length ; i++) {
                    att = sort[i];
                    if( a[att] < b[att] ) return -1;
                    if( a[att] > b[att] ) return 1;
                }
                return 0;
            });
        }

        // Filtering.
        if( typeof args.filter === 'function' ) {
            arr = arr.filter( args.filter );
        }

        var content = $.div();
        arr.forEach(function ( child ) {
            Data.set( item, child );
            content.appendChild( module.exports( children ) );
        });

        return content;
    }
};


function parse( input, context ) {
    return Data.parse( input, context );
}
