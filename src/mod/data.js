var WS = require("tfw.web-service");
var Local = require("tfw.storage").local;


var DATA = Local.get( 'data', {} ) || {};

var MONTHES = [ 'January', 'February', 'March', 'April',
                'May', 'June', 'July', 'August',
                'September', 'October', 'November', 'December' ];

exports.get = function( name ) {
    var data = DATA;
    var path = explodePath( name );
    var i;
    for( i=0 ; i<path.length ; i++ ) {
        while( Array.isArray( data ) ) {
            // Take the last element of an array.
            data = data[data.length - 1];
        }
        data = data[path[i]];
        if( typeof data === 'undefined' ) return undefined;
    }

    return data;
};


exports.set = function( name, value ) {
    checkValueArrays( value );

    var data = DATA;
    var path = explodePath( name );
    var i;
    for( i=0 ; i<path.length - 1 ; i++ ) {
        if( typeof data[path[i]] === 'undefined' ) {
            data[path[i]] = {};
        }
        data = data[path[i]];
    }
    data[path.pop()] = value;
};

exports.reset = function() {
    data = {};
    exports.save();
};

exports.save = function() {
    Local.set( 'data', DATA );
    /*
     var data = APP.data || {};
     data.id = APP.id;
     console.info("[data] data=...", data);
     WS.get(
     'registration',
     ['set', data ]
     );
     */
};


exports.parse = function( input ) {
    if( Array.isArray( input ) ) {
        var i, item, result;
        for (i = 0 ; i < input.length ; i++) {
            item = input[i];
            result = exports.parse( item );
            if( typeof result !== 'undefined' && result !== 'null' ) return result;
        }
    }
    else if( typeof input === 'function' ) {
        return exports.parse( input.call( exports ) );
    }
    else if( typeof input === 'string' ) {
        var cursor = 0;
        var posStart;
        var posEnd;
        var output = '';
        var variable;
        while( true ) {
            posStart = input.indexOf( '{{', cursor );
            if( posStart == -1 ) break;
            output += input.substr( cursor, posStart - cursor );
            cursor = posStart + 2;
            posEnd = input.indexOf( '}}', cursor );
            if( posEnd == -1 ) break;
            variable = input.substr( cursor, posEnd - cursor ).trim().split( '|' );
            variable[0] = exports.get( variable[0] ) || '';
            for( i = 1 ; i < variable.length ; i++ ) {
                variable[0] = format( variable[0], variable[i] );
            }
            output += variable[0];
            cursor = posEnd + 2;
        }
        return output + input.substr( cursor );
    }

    return undefined;
};


/**
 * Examples of numeric dates are: `20160501`, `201605011830`.
 * Time can be added, but just hours and minutes.
 */
exports.num2dat = function( num ) {
    var txt = "" + num;
    while( txt.length < 12 ) txt += "0";
    return new Date(
        parseInt( txt.substr( 0, 4) ),
        parseInt( txt.substr( 4, 2) ) - 1,
        parseInt( txt.substr( 6, 2) ),
        parseInt( txt.substr( 8, 2) ),
        parseInt( txt.substr( 10, 2) ),
        0
    );
};


exports.pad = function( value, size, filler ) {
    if( typeof size === 'undefined' ) size = 2;
    if( typeof filler === 'undefined' ) filler = '0';

    value = "" + value;
    while( value.length < size ) value = filler + value;
    return value;
};


/**
 * Push `value` into an array called `name`.
 */
exports.push = function( name, value ) {
    var arr = exports.get( name );
    if( !Array.isArray( arr ) ) {
        console.error( "[Data.push] `" + name + "` is not an array!" );
        return 0;
    }
    checkValueArrays( arr );
    value.$key = arr.$key++;
    return value.$key;
};



/**
 * In  an array,  each item  must have  the `$key'  property. This  is
 * needed if you need to remove an element from that list.
 * Keys are just  incremenral numbers relative to the  array the items
 * belong. So  the array itself has  a `$key` attribute to  store this
 * increment.
 */
function checkValueArrays( value ) {
    if( Array.isArray( value ) ) {
        if( typeof value.$key !== 'number' ) {
            // New ID for elements of this array.
            value.$key = 1;
        }
        value.forEach(function ( item ) {
            if( typeof item.$key !== 'number' ) {
                item.$key = value.$key++;
            }
            checkValueArrays( item );
        });
    }
    else if( typeof value === 'object' ) {
        var key;
        for( key in value ) {
            checkValueArrays( value[key] );
        }
    }
}


function format( value, type ) {
    switch( type ) {
    case 'date':
        value = exports.num2dat( value );
        return MONTHES[value.getMonth()] + " " + value.getDate() + ", " + value.getFullYear();
    case 'time':
        value = exports.num2dat( value );
        return value.getHours() + ":" + exports.pad( value.getMinutes() );
    case 'datetime':
        value = exports.num2dat( value );
        return MONTHES[value.getMonth()] + " " + value.getDate() + ", " + value.getFullYear()
            + "  " + value.getHours() + ":" + exports.pad( value.getMinutes() );
    }
    return value;
}

function explodePath( name ) {
    var start = 0;
    var cursor = 0;
    var mode = 0;
    var path = [];
    var c;
    
    while( cursor < name.length ) {
        c = name.charAt( cursor );
        if( mode == 0 ) {
            if( c == '[' ) {
                
            }
            else if ( c == '.' ) {

            }
        }
    }

    return path;
}
