"use strict";
var Widget = require("wdg");
var D = Widget.div;

/**
 * @example
 * var Boolean = require("tp4.boolean");
 * var instance = new Boolean();
 * @class Boolean
 */
var Boolean = function(v, label) {
    Widget.call(this);
    var bool = D("tp4-boolean-child");
    this._bool = bool;
    this.addClass("tp4-boolean");
    if (typeof v !== 'undefined') this.val(v);
    bool.append(
        D().text(_("no")),
        D().text(_("yes"))
    );
    var that = this;
    this.Tap(
        function() {
            bool.toggleClass("yes");
            var slot = that._Change;
            if (typeof slot === 'function') {
                slot.call(that, that.val());
            }
        }
    );
    if (typeof label !== 'undefined') {
        this.append(D('label').text(label));
        this.addClass('label');
    }
    this.append(bool);
};

// Extension of Widget.
Boolean.prototype = Object.create(Widget.prototype);
Boolean.prototype.constructor = Boolean;

/**
 * @return void
 */
Boolean.prototype.val = function(v) {
    var bool = this._bool;
    if (typeof v === 'undefined') return bool.hasClass("yes");
    if (v) {
        bool.addClass("yes");
    } else {
        bool.removeClass("yes");
    }
    return this;
};

/**
 * @return void
 */
Boolean.prototype.Change = function(slot) {
    if (typeof slot === 'undefined') return this._Change;
    this._Change = slot;
    return this;
};


Boolean.create = function(v, label) {
    return new Boolean(v, label);
};
module.exports = Boolean;
