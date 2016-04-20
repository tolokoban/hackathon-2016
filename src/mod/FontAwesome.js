/**
 * Empty module used to import FontAwesome.
 * https://fortawesome.github.io/Font-Awesome/
 */
var DOM = require("dom");


module.exports = function( id ) {
    var e = DOM.tag( 'i', 'fa', 'fa-' + id );
    return e;
};
