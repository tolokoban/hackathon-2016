var WS = require("tfw.web-service");
var Local = require("tfw.storage").local;


var DATA = Local.get( 'data', {} ) || {};

exports.get = function( name ) {
    var data = DATA;
    var path = name.split( '.' );
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
    var data = DATA;
    var path = name.split( '.' );
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
