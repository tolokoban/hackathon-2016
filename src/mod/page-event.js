var $ = require("dom");
//var HintManager = require("hint-manager");

exports.activate = function() {
    var container = $.get( '#event' );
    $.clear( container );
    HintManager.appendTo( 'start', container );    
};
