"use strict";
var Widget = require("wdg");
var D = Widget.div;
var T = Widget.tag;
var LG = require("tfw.layout-grid").create;
var B = require("button").create;


var Data = require("data2");

/**
 * @example
 * var AptView = require("apt-view");
 * var instance = new AptView();
 * @class AptView
 */
var AptView = function() {
    Widget.call(this);
    this.addClass("apt-view");

};

// Extension of Widget.
AptView.prototype = Object.create(Widget.prototype);
AptView.prototype.constructor = AptView;

/**
 * @return void
 */
AptView.prototype.refresh = function( key ) {
    var apt = Data.get( "appointments" ).find(function(x) {return x.$key == key;});
    console.info("[apt-view] apt=...", apt);
    this.clear(
        LG(
            ["date", Data.formatDate( apt.date )],
            ["name", apt.name],
            ["specialist", apt.specialist],
            ["reason", apt.reason],
            ["type", apt.type],
            ["location", apt.location],
            ["more", D().html( apt.comment )]
        ).addClass('wide', 'item'),
        T('hr'),
        D().html( "<i>Checklist is here...</i>" ),
        T('hr')
    );
    if( !Data.get( "$portal" ) ) {
        // Display edit buttons only for Patient.
        this.append(
            LG([
                B("Edit").Tap(function() {

                }),
                B("Delete").addClass("warning").Tap(function() {
                    APP.waitOn();
                    Data.removeByKey( "appointments", key );
                    Data.save().then(function() {
                        APP.waitOff();
                        window.location.hash = "#/book/user";
                    }, function( err ) {
                        console.error( err );
                    });
                })
            ]).addClass('wide'),
            T('hr')
        );
    }
    this.append(
        T('hr'),
        B({caption: "Back", href: "#/book/user"}).addClass('wide')
    );
};



AptView.create = function() {
    return new AptView();
};
module.exports = AptView;
