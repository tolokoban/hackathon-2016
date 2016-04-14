require( 'input-file', function(exports, module) {  var $ = require("dom");
var Data = require("data");


module.exports = function( args ) {
    var input = $.tag( 'input', { type: 'file' } );
    var elem = $.tag( 'label', 'text', [
        $.div([ args.text ]),
        input
    ]);
    if( typeof Data.get( args.data ) !== 'undefined' ) {
        input.value = Data.get( args.data );
    }
    input.addEventListener( 'blur', function() {
        Data.set( args.data, input.value );
    });
    return elem;
};
 });
