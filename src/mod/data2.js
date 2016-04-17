var WS = require("tfw.web-service");
var Local = require("tfw.storage").local;


var DATA = null;

var MONTHES = [ 'January', 'February', 'March', 'April',
                'May', 'June', 'July', 'August',
                'September', 'October', 'November', 'December' ];

exports.log = function( prettyprint) {
    if( prettyprint ) {
        console.info("[data] DATA=...", JSON.stringify( DATA, null, '  ' ));
    } else {
        console.info("[data] DATA=...", DATA);
    }
};

exports.get = function( name ) {
    var data = DATA || {};
    var path = explodePath( name );
    var item;
    var key;
    var i;
    for( i=0 ; i<path.length ; i++ ) {
        item = path[i];
        data = data[item.name];
        if( typeof data === 'undefined' ) return undefined;
        if( Array.isArray( data ) && item.index ) {
            key = exports.get( item.index );
            data = data.find(function( elem ) {
                return elem.$key == key;
            });
            if( typeof data === 'undefined' ) {
                console.error( 'Key `' + key + "` not found in `" + name + "` at level " + i + "!" );
                return undefined;
            }
        }
    }

    return data;
};

exports.set = function( name, value ) {
    if( typeof value === 'undefined' ) value = '';

    // Values are always copied.
    // This avoid cyclic problems.
    value = JSON.parse( JSON.stringify( value ) );

    checkValueArrays( value );

    var data = DATA;
    var path = explodePath( name );
    var next;
    var item;
    var key;
    var i;
    for( i=0 ; i<path.length - 1 ; i++ ) {
        item = path[i];
        if( typeof data[item.name] === 'undefined' ) {
            if( path.index ) {
                data[item.name] = [{ $key: exports.get( item.index ) }];
            } else {
                data[item.name] = {};
            }
        }
        data = data[item.name];
        if( item.index ) {
            key = exports.get( item.index );
            next = data.find(function( elem ) {
                return elem.$key == key;
            });
            if( typeof next === 'undefined' ) {
                data.push({ $key: key });
            } else {
                data = next;
            }
        }
    }
    data[path.pop().name] = value;
};


exports.reset = function() {
    var arg0 = DATA.arg0;
    var arg1 = DATA.arg1;
    var arg2 = DATA.arg2;
    var arg3 = DATA.arg3;
    DATA = {
        arg0: arg0,
        arg1: arg1,
        arg2: arg2,
        arg3: arg3
    };
    exports.save();
};

exports.load = function( id, onLoaded ) {
    WS.get( 'registration', ['get', id] ).then(
        function( data ) {
            DATA = data;
            console.info("[page-user] id=...", id);
            console.info("[page-user] data=...", data);
            if( !data ) {
                window.location = "?#/book/main";
                return;
            }
            if( typeof onLoaded === 'function') {
                onLoaded();
            }
        },
        function( err ) {
            console.error( err );
        }
    );

};

exports.save = function() {
    var data = DATA || {};
    data.id = APP.id;
    console.info("[data] data=...", data);
    return WS.get(
        'registration',
        ['set', data ]
    );
};

exports.data = function() {
    return DATA;
}


exports.parse = function( input, context ) {
    if( typeof context === 'undefined' ) context = {};

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
            if( typeof context[variable[0]] !== 'undefined' ) {
                // This is a frozen var. Used in looping context.
                variable[0] = context[variable[0]];
            } else {
                variable[0] = exports.get( variable[0] ) || '';
            }
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
    if( typeof value !== 'object' || Array.isArray( value )) {
        value = { value: value };
    }
    value.$key = arr.$key++;
    arr.push( value );
    return value.$key;
};

/**
 * Remove in  array `arrName`  the item  with the  key given  by the
 * value of `keyName`.
 */
exports.remove = function( arrName, keyName ) {
    var arr = exports.get( arrName );
    var key = exports.get( keyName );
    var idx = arr.findIndex(function( item ) {
        return item.$key == key;
    });
    if( idx == -1 ) return false;
    arr.splice( idx, 1 );
    return true;
};


exports.removeByKey = function( arrName, key ) {
    var arr = exports.get( arrName );
    var idx = arr.findIndex(function( item ) {
        return item.$key == key;
    });
    if( idx == -1 ) return false;
    arr.splice( idx, 1 );
    return true;
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
        var values = [];
        value.forEach(function ( item ) {
            if( typeof item !== 'object' || Array.isArray( item )) {
                item = { value: item };
            }
            if( typeof item.$key !== 'number' ) {
                item.$key = value.$key++;
            }
            checkValueArrays( item );
            values.push( item );
        });
        value.splice( 0, value.length );
        values.forEach(function ( item ) {
            value.push( item );
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
    var pathItem;
    var c;

    for( cursor = 0 ; cursor < name.length ; cursor++ ) {
        c = name.charAt( cursor );
        if( mode == 0 ) {
            if( c == '[' || c == '.' ) {
                pathItem = { name: name.substr( start, cursor - start ) };
                path.push( pathItem );
                start = cursor + 1;
                if( c == '[' ) {
                    mode = 1;
                }
            }
        }
        else if( mode == -1 ) {
            // After a `]`, we must find a `.`.
            if( c == '.' ) {
                start = cursor + 1;
                mode = 0;
            }
            else {
                console.error( "Bad var name!\n" + name + "\nPos: " + cursor );
            }
        }
        else {
            if( c == '[' ) {
                mode++;
            }
            else if( c == ']' ) {
                mode--;
                if( mode == 0 ) {
                    pathItem.index = name.substr( start, cursor - start );
                    start = cursor + 1;
                    mode = -1;
                }
            }
        }
    }
    if( mode == 0 ) {
        path.push( { name: name.substr( start ) } );
    }
    else {
        console.error( "Bad ending for var name!\n" + name );
    }

    return path;
}


exports.formatDate = function( num ) {
    value = exports.num2dat( num );
    return MONTHES[value.getMonth()] + " " + value.getDate() + ", " + value.getFullYear()
        + "  " + value.getHours() + ":" + exports.pad( value.getMinutes() );
};
