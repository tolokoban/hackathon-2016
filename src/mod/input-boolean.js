var $ = require("dom");
var Data = require("data");


module.exports = function( args ) {
    var elem = $.div( 'boolean', [args.text] );
    var get = args.get || function() {};
    var set = args.set || function() {};
    if( get() ) {
        $.addClass( elem, 'yes' );
    }
    $.on( elem, function() {
        if( get() ) {
            $.removeClass( elem, 'yes' );
            set( 0 );
        } else {
            $.addClass( elem, 'yes' );
            set( 1 );
        }
        Data.save();
    });
    return elem;
};
