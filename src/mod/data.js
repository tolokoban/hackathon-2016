var WS = require("tfw.web-service");


exports.get = function( name ) {
    var data = APP.data || {};
    var path = name.split( '.' );
    var i;
    for( i=0 ; i<path.length ; i++ ) {
        data = data[path[i]];
        if( typeof data === 'undefined' ) return undefined;
    }
    if( typeof data === 'object') {
        var arr = [];
        var key;
        for( key in data ) {
            arr.push( key );
        }
        return arr;
    }

    return data;
};


exports.set = function( name, value ) {
    var data = APP.data || {};
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


exports.save = function() {
    var data = APP.data || {};
    data.id = APP.id;
console.info("[data] data=...", data);
    WS.get(
        'registration',
        ['set', data ]
    );
};
