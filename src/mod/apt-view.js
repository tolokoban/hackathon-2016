"use strict";
var Widget = require("wdg");
var D = Widget.div;
var T = Widget.tag;
var LG = require("tfw.layout-grid").create;
var B = require("button").create;
var Data = require("data2");
var $ = require("dom");
var Bln = require("input-boolean");
var Desc = require("tp4.input-desc");


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
        createCheckList.call( this, apt ),
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



function createCheckList( apt ) {
    var div = D();
    if( apt.type != "Surgery" ) return div;
    if( typeof apt.checklist === 'undefined' ) apt.checklist = {};
    this.chklst = apt.checklist;

    div.append(
        this.newGroup('My demographic and instance data'),
        this.newGroup("Physiotherapy Information", [
            this.newGroup('Instructions for pre- and post-surgery preparation'),
            this.newGroup('Plan for pre-surgery preparation'),
            this.newGroup('Plan for post-surgery preparation')
        ]),
        this.newGroup("Pre-anesthetic Assessment", [
            this.newBool('Patient history'),
            this.newBool('Airway examination'),
            this.newBool('Blood examination'),
            this.newBool('Breathing examination'),
            this.newBool('Clinical examination'),
            this.newBool('Co-morbidities'),
            this.newBool('Guidelines for pre-surgery self-observation', [
                this.newDesc('Guidelines')
            ]),
            this.newBool('Drugs and Alergies'),
            this.newBool('Pre-surgery drug intake guideline'),
            this.newBool('Previous anaesthesia and surgeries'),
            this.newBool('Case for surgery', [
                this.newDesc('Case')
            ]),
            this.newBool('Fluid guidelines', [
                this.newDesc('Fluid')
            ]),
            this.newBool('Fasting guidelines', [
                this.newDesc('Fasting')
            ]),
            this.newBool('Physical status', [
                this.newDesc('Physical')
            ]),
            this.newBool('Patient signed the consent')
        ]),
        this.newGroup("Useful information", [
            this.newBool('Personal documents (ID Card, Insurance Card)'),
            this.newBool('Hygiene (toothbrush)'),
            this.newBool('Clothing')
        ]),
        this.newBool("Modification of health status", [
            this.newDesc('Modification of health status desc')
        ])
    );
    return div;
}

/**
 * @return void
 */
AptView.prototype.newBool = function( caption, children ) {
    var chklst = this.chklst;
    var div = $.div();
    var body = $.div({ style: "display: " + (chklst[caption] ? 'block' : 'none') });
    var bln = new Bln({ 
        text: caption, 
        get: function() {
            return chklst[caption];
        },
        set: function( v ) {
            chklst[caption] = v;
            if( v ) {
                body.style.display = "block";
            } else {
                body.style.display = "none";
            }
            Data.save();
        }
    });
    if( Array.isArray(children) ) {
        children.forEach(function (child) {
            $.add( body, child );
        });

    }
    $.add( div, bln, body );
    return div;
};

/**
 * @return void
 */
AptView.prototype.newDesc = function( caption ) {
    var desc = new Desc({ label: caption });
    var chklst = this.chklst;
    desc.val( chklst[caption] );
    desc.Change(function() {
        chklst[caption] = desc.val();
        Data.save();
    });
    return desc;
};


AptView.prototype.newGroup = function( caption, children ) {
    var div = $.div( 'pack-item' );
    if( !Array.isArray( children ) ) {
        children = [];
    }
    var nbTraces = children.length;
    var title = $.tag( 'h1', 'title', [caption + (nbTraces > 0 ? ' (' + nbTraces + ')' : '')] );
    var more = $.div( 'more' );
    $.on( title, function() {
        if( $.hasClass( div, 'show' ) ) {
            $.css( div, { height: "32px" } );
            $.removeClass( div, 'show' );
        } else {
            var rect = more.getBoundingClientRect();
            $.css( div, { height: (32 + rect.height) + "px" } );
            $.addClass( div, 'show' );
        }
    });
    children.forEach(function ( child ) {
        $.add( more, child );
    });
    $.add( div, title, more );
    return div;
}
