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
var Text = require("input-text");
var Date = require("tp4.input-date");

/**
 * @example
 * var Demographics = require("demographics");
 * var instance = new Demographics();
 * @class Demographics
 */
var Demographics = function() {
    Widget.call(this);
    this.addClass("demographics");
    this.refresh();
};

// Extension of Widget.
Demographics.prototype = Object.create(Widget.prototype);
Demographics.prototype.constructor = Demographics;

/**
 * @return void
 */
Demographics.prototype.refresh = function() {
    this.clear(
        T('h2').text("Personal Details"),
        newText( "First Name", "dg.firstname" ),
        newText( "Family Name", "dg.lastname" ),
        T("i").text("...and so on: gender, DoB, ..."),
        T('h2').text("Contact Person"),
        newText( "Name", "dg.contact.name" ),
        newText( "Phone", "dg.contact.phone" ),
        T('h2').text("Insurance Details"),
        newText( "Insurer", "dg.insurance.insurer" ),
        newText( "Insurance N°", "dg.insurance.number" ),
        newText( "Insurance Policy Authorisation", "dg.insurance.policy" )
    );
};


function newText( caption, data ) {
    var txt = new Text({ label: caption, value: Data.get( data ), data: data });
    txt.val( Data.get( data ) );
    return txt;
}


Demographics.create = function() {
    return new Demographics();
};
module.exports = Demographics;
