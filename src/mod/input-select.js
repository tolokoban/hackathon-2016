var $ = require("dom");
var Data = require("data");


module.exports = function( args ) {
    var input = $.tag( 'select' );
    var elem = $.tag( 'label', 'text', [
        $.div([ args.text ]),
        input
    ]);
    if( typeof Data.get( args.data ) !== 'undefined' ) {
        input.value = Data.get( args.data );
    }
    input.addEventListener( 'blur', function() {
        Data.set( args.data, input.value );
        Data.save();
    });
    var options = args.options;
    if( typeof options === 'string' ) {
        try {
            options = JSON.parse( options );
        }
        catch( ex ) {
            console.error( "Unable to parse this JSON: ", options );
            console.error( ex );
        }
    }
    if( Array.isArray( options ) ) {
        options.forEach(function ( opt ) {
            var option = $.tag( 'option', { value: opt }, [opt] );
            $.add( input, option );
        });

    }
    return elem;
};
