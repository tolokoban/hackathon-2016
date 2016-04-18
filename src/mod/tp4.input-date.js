"use strict";
var Widget = require("wdg");
var Listeners = require("tfw.listeners");
var Data = require("data2");

var I = require("input-text").create;
var D = Widget.div;

/**
 * @example
 * var InputDate = require("input-text-date");
 * var instance = new InputDate(opt);
 * @class InputDate
 */
var InputDate = function(opt) {
    var that = this;

    Widget.call(this);
    this.addClass("tp4-input-date");
    this.css( "width", "auto" );
    if (typeof opt !== 'object') opt = {};
    if (typeof opt === 'undefined') opt = {};
    if (typeof opt.show === 'undefined') opt.show = 'DMY hm';
    if (typeof opt.date === 'undefined') opt.date = new Date();

    this.eventChange = new Listeners();

    var wdg = {};
    this._wdg = wdg;

    if (typeof opt.label === 'string') {
        this.append(
            D('head').text( opt.label )
        );
    }
    
    var inputs = D('body').appendTo( this );
    var validator = function( min, max ) {        
        return function( v ) {
            v = parseInt( v );
            if (isNaN( v )) return false;
            if (v < min || v > max) return false;
            return true;
        };
    };
    
    if (opt.show.indexOf('D') > -1) {
        wdg.D = I({ width: '2em', validator: validator(1, 31) }).appendTo( inputs );
    }
    if (opt.show.indexOf('M') > -1) {
        wdg.M = I({ width: '2em', validator: validator(1, 12) }).appendTo( inputs );
    }
    if (opt.show.indexOf('Y') > -1) {
        wdg.Y = I({ width: '4em', validator: validator(1000, 9999) }).appendTo( inputs );
    }
    if (opt.show.indexOf('h') > -1) {
        inputs.append(D('space').text(':'));
        wdg.h = I({ width: '2em', validator: validator(0, 23) }).appendTo( inputs );
    }
    if (opt.show.indexOf('m') > -1) {
        wdg.m = I({ width: '2em', validator: validator(0, 59) }).appendTo( inputs );
    }
    if (opt.show.indexOf('s') > -1) {
        wdg.s = I({ width: '2em', validator: validator(0, 59) }).appendTo( inputs );
    }

    wdg.text = D('foot').appendTo( this );

    this.eventChange.add(function() {
        var v = that.val();
        wdg.text.text(
            _('format', _('wd' + v.getDay()), v.getDate(), _('m' + v.getMonth()), v.getFullYear())
        );
    });

    this.val( opt.date );
    if( typeof this._data === 'string' ) {
        this._data = opt.data;
        this.YMDhms( Data.get( this._data ) );
    }
};

// Extension of Widget.
InputDate.prototype = Object.create(Widget.prototype);
InputDate.prototype.constructor = InputDate;


/**
 * @param {string} v - April 13th, 2019 at 12:32:14 is encoded as the string `20190413123214`.
 */
InputDate.prototype.YMDhms = function(v) {
    var Y, M, D, h, m, s;
    if (typeof v === 'undefined') {
        Y = this.year();
        M = this.month();
        D = this.day();
        h = this.hour();
        m = this.minute();
        s = this.second();
        if (M < 10) M = '0' + M;
        if (D < 10) D = '0' + D;
        if (h < 10) h = '0' + h;
        if (m < 10) m = '0' + m;
        if (s < 10) s = '0' + s;
        return '' + Y + M + D + h + m + s;
    } else {
        v = '' + v;
        // Ensure we  have all  the needed  digits. Otherwise,  just add
        // zeros at the end.
        while ( v.length < 14 ) {
            v += '0';
        }
        this.val(
            new Date(
                parseInt( v.substr(0, 4) ),
                parseInt( v.substr(4, 2) ) - 1,  // Monthes start with 0.
                parseInt( v.substr(6, 2) ),
                parseInt( v.substr(8, 2) ),
                parseInt( v.substr(10, 2) ),
                parseInt( v.substr(12, 2) )
            )
        );
        return this;
    }
};


/**
 * @param {Date} v
 */
InputDate.prototype.val = function(v) {
    if (typeof v === 'undefined') {
        return new Date(
            this.year(), this.month() - 1, this.day(),
            this.hour(), this.minute(), this.second()
        );
    } else {
        if (typeof v === 'number' || typeof v === 'string') {
            v = new Date(v);
        }
        this.year( v.getFullYear() );
        this.month( v.getMonth() + 1 );
        this.day( v.getDate() );
        this.hour( v.getHours() );
        this.minute( v.getMinutes() );
        this.second( v.getSeconds() );
        this.eventChange.fire( this );
        if( typeof this._data === 'string' ) {
            Data.set( this._data, this.YMDhms() );
        }
        return this;
    }    
};

/**
 * @return void
 */
InputDate.prototype.Change = function( slot ) {
    if (this._Change) this.eventChange.remove( this._Change );
    this._Change = slot;
    this.eventChange.add( slot );
    return this;
};


/**
 * Getter/Setter for the __Day__.
 */
InputDate.prototype.day = function(v) {
    var e = this._wdg.D;
    if (typeof v === 'undefined') {
        return e ? parseInt( e.val() ) : 1;
    }
    if ( e ) {
        e.val( v );
    }
    return this;
};


/**
 * Getter/Setter for the __Month__.
 */
InputDate.prototype.month = function(v) {
    var e = this._wdg.M;
    if (typeof v === 'undefined') {
        return e ? parseInt( e.val() ) : 1;
    }
    if ( e ) {
        e.val( v );
    }
    return this;
};


/**
 * Getter/Setter for the __Year__.
 */
InputDate.prototype.year = function(v) {
    var e = this._wdg.Y;
    if (typeof v === 'undefined') {
        return e ? parseInt( e.val() ) : 2000;
    }
    if ( e ) {
        e.val( v );
    }
    return this;
};


/**
 * Getter/Setter for the __Hour__.
 */
InputDate.prototype.hour = function(v) {
    var e = this._wdg.h;
    if (typeof v === 'undefined') {
        return e ? parseInt( e.val() ) : 12;
    }
    if ( e ) {
        e.val( v );
    }
    return this;
};


/**
 * Getter/Setter for the __Minute__.
 */
InputDate.prototype.minute = function(v) {
    var e = this._wdg.m;
    if (typeof v === 'undefined') {
        return e ? parseInt( e.val() ) : 0;
    }
    if ( e ) {
        e.val( v );
    }
    return this;
};


/**
 * Getter/Setter for the __Second__.
 */
InputDate.prototype.second = function(v) {
    var e = this._wdg.s;
    if (typeof v === 'undefined') {
        return e ? parseInt( e.val() ) : 0;
    }
    if ( e ) {
        e.val( v );
    }
    return this;
};



InputDate.create = function(opt) {
    return new InputDate(opt);
};
module.exports = InputDate;
