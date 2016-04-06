var $ = require("dom");


module.exports = function( label, element ) {
    return $.div( "field", [
        $.div( ["" + label] ),
        $.div( [element] )
    ]);
};
