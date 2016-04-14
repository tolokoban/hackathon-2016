require( 'app.perform-actions', function(exports, module) {  /**********************************************************************
 require( 'app.perform-actions' )
 -----------------------------------------------------------------------
 
 **********************************************************************/
var $ = require("dom");
var Data = require('data');
var Tpl = require("x-template");
var InputBool = require("input-boolean");
var InputText = require("input-text");
var InputFile = require("input-file");
var InputDate = require("input-date");


module.exports = function( children ) {
    var body = $.div();

    children.forEach(function ( child, idx ) {
        if( !Array.isArray( child ) ) {
            console.error( "Element #" + idx + " should be an array!" );
            console.info("[app.perform-actions] child=...", child);
            console.info("[app.perform-actions] children=...", children);
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
    });

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
        for( key in args ) {
            val = args[key];
            Data.set( key, val );
        }
    },
    set: function( args ) {
        var key, val;
        for( key in args ) {
            val = args[key];
            Data.set( key, val );
        }
    },
    "input-bool": function( args ) {
        return InputBool( args );
    },
    "input-text": function( args ) {
        return InputText( args );
    },
    "input-file": function( args ) {
        return InputFile( args );
    },
    "input-date": function( args ) {
        return InputDate( args );
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

 });
