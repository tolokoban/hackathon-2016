"use strict";
var Widget = require("wdg");
var Data = require("data2");


/**
 * @example
 * var AptList = require("apt-list");
 * var instance = new AptList();
 * @class AptList
 */
var AptList = function( options ) {
    Widget.call(this);
    this.addClass("apt-list");
    var appointments = Data.get( "appointments" );
    appointments.forEach(function ( apt ) {
        this.addApt( apt, options.action );
    }, this);

};

// Extension of Widget.
AptList.prototype = Object.create(Widget.prototype);
AptList.prototype.constructor = AptList;

/**
 * @return void
 */
AptList.prototype.addApt = function( apt, action ) {
    var div = Widget.tag( 'div' );

    this.append( div );
};



AptList.create = function() {
    return new AptList();
};
module.exports = AptList;
