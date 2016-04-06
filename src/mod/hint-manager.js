var $ = require("dom");
var Tpl = require("x-template");
var Data = require("data");
var Bool = require("boolean");
var Field = require("field");
var Hints = require("hints");


exports.appendTo = appendTo;

function appendTo( hintID, parent ) {
    var hint = Hints[hintID];
    if( typeof hint === 'undefined' ) throw Error( 'Unknown hint "' + hintID + '"!' );
    var children = Tpl.appendTo( 'hint', parent );
    children.question.innerHTML = hint.question;
    window.setTimeout( $.addClass.bind( $, children.question, 'show' ) );

    var exec = function( item ) {
        $.clear( parent );
        Data.save();
        var next = item[1];
        if( next ) {
            if( next.charAt( 0 ) == '#' ) window.location = next;
            else appendTo( next, parent );
        }
    };

    var ans = children.answers;
    hint.answers.forEach(function ( item ) {
console.info("[hint-manager] item=...", item);
        addItem( item, ans, exec.bind( this, item ) );
    }, this);
};

function addItem( item, parent, exec ) {
    if( Array.isArray( item ) ) addButton( item, parent, exec );
    if( !item.data ) return;
    var type = end( item.data );
    switch( type ) {
        case 'bool': return addBool( item, parent );
    }
}


function end( txt ) {
    return txt.split( "." ).pop();
}


function addBool( item, parent ) {
    parent.appendChild( Bool( item ) );
}

function addButton( item, parent, exec ) {
    var a = $.tag( "button", "wide tp4-button", [item[0]] );
    $.on( a, exec );
    parent.appendChild( a );
}
