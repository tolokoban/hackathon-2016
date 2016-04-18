"use strict";
var Widget = require("wdg");
var D = Widget.div;
var T = Widget.tag;
var LG = require("tfw.layout-grid").create;
var B = require("button").create;
var Data = require("data2");


/**
 * @example
 * var CheckList = require("check-list");
 * var instance = new CheckList();
 * @class CheckList
 */
var CheckList = function() {
    Widget.call(this);
    this.addClass("check-list");
    
};

// Extension of Widget.
CheckList.prototype = Object.create(Widget.prototype);
CheckList.prototype.constructor = CheckList;

/**
 * @param key - appointment key.
 */
CheckList.prototype.refresh = function( key ) {
    
};



CheckList.create = function() {
    return new CheckList();
};
module.exports = CheckList;
