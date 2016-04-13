/**********************************************************************
 require( 'app.perform-actions' )
 -----------------------------------------------------------------------
 
 **********************************************************************/
var $ = require("dom");
var Data = require('data');
var Tpl = require("x-template");
var InputBool = require("input-boolean");
var InputText = require("input-text");
var InputFile = require("input-file");
var InputDate = require("input-text");


module.exports = function( children ) {
    var body = $.div();

    children.forEach(function ( child ) {
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
        var btn = $.tag( 'a', 'button', { href: '#' + parse( args.action ) } );
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

        if( sort.trim().length > 0 ) {

        }

        var content = $.div();
        arr.forEach(function ( child ) {
            Data.set( item, child );
            content.appendChild( module.exports( children ) );
        });

        return content;
    }
};


function parse( input ) {
    if( Array.isArray( input ) ) {
        var i, item;
        for (i = 0 ; i < input.length ; i++) {
            item = input[i];
            if( typeof item !== 'undefined' && item !== 'null' ) return parse( item );
        }
    }
    else if( typeof input === 'function' ) {
        return parse( input.call( Data ) );
    }
    else if( typeof input === 'string' ) {
        var cursor = 0;
        var posStart;
        var posEnd;
        var output = '';
        while( true ) {
            posStart = input.indexOf( '{{', cursor );
            if( posStart == -1 ) break;
            output += input.substr( cursor, posStart - cursor );
            cursor = posStart + 2;
            posEnd = input.indexOf( '}}', cursor );
            if( posEnd == -1 ) break;
            output += Data.get( input.substr( cursor, posEnd - cursor ).trim() );
            cursor = posEnd + 2;
        }
        return output + input.substr( cursor );
    }

    return "" + input;
}
