"use strict";
var Widget = require("wdg");
var Data = require("data2");

var D = require("wdg").div;


/**
 * @example
 * var AptList = require("apt-list");
 * var instance = new AptList();
 * @class AptList
 */
var AptList = function( args ) {
    Widget.call(this);
    this.addClass("apt-list");
    this._args = args;
}

// Extension of Widget.
AptList.prototype = Object.create(Widget.prototype);
AptList.prototype.constructor = AptList;

/**
 * @return void
 */
AptList.prototype.refresh = function() {
    var appointments = Data.get( "appointments" );
console.info("[apt-list] appointments=...", appointments);
    appointments.forEach(function ( apt ) {
        this.addApt( apt, this._args.action );
    }, this);    
};


/**
 * @return void
 */
AptList.prototype.addApt = function( apt, action ) {
    var div = D();
    var dat = Data.num2dat( apt.date );
    div.append(
        D( 'date' ).text( dat.getDate() + "/" + (dat.getMonth() + 1) + "/" + dat.getFullYear()
                        + " - " + dat.getHours() + ":" + dat.getMinutes()),
        D( 'specialist' ).text( apt.specialist ),
        D( 'name' ).text( apt.name )
    );
    if( typeof action === 'string' ) {
        div.Tap( function() {
            var slot = APP[action];
            if( typeof slot !== 'function' ) {
                console.error( "APP[" + action + "] not found!" );
            } else {
                slot( apt.$key );
            }
        });
    }
    this.append( div );
};



AptList.create = function() {
    return new AptList();
};
module.exports = AptList;
