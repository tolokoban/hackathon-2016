/**********************************************************************
 require( 'tp4.input-description' )
 -----------------------------------------------------------------------
options:

* __val__ {object}: Keys are country codes, values are HTML content.
 **********************************************************************/
"use strict";
var DOM = require("dom");
var Btn = require("button");
var Data = require("data2");
var Widget = require("wdg");
var Editor = require("tp4.wysiwyg-editor");

/**
 * @example
 * var InputDescription = require("tp4.input-description");
 * var instance = new InputDescription();
 * @class InputDescription
 */
var InputDescription = function( options ) {
    Widget.call(this);
    this.addClass("tp4-input-description");
    this._Change = function() {};

    if( typeof options === 'undefined' ) options = {};
    if( typeof options.label === 'undefined' ) options.label = _('description');
    this._label = options.label;

    var header = DOM.tag( 'header', [options.label] );
    var section = DOM.tag( 'section' );
    var footer = DOM.tag( 'footer', [
        Btn.create({ caption: "Edit " + options.label }).Tap( this.fireEdit.bind( this ) ).element()
    ]);
    this.append( header, section/*, footer*/ );
    this.Tap( this.fireEdit.bind( this ) );

    this._section = section;
    if( typeof this._data === 'string' ) {
        this._data = options.data;
        this.val( Data.get( this._data ) );
    }
};

// Extension of Widget.
InputDescription.prototype = Object.create(Widget.prototype);
InputDescription.prototype.constructor = InputDescription;

/**
 * @return void
 */
InputDescription.prototype.fireEdit = function() {
    Editor.edit( this._label, this.val(), this.val.bind( this ) );
};


/**
 * @return void
 */
InputDescription.prototype.val = function( v ) {
    if( typeof v === 'undefined' ) return this._val;
    if( this._val === v ) return this;
    this._val = v;
    this._section.innerHTML = v;
    if( typeof this._Change === 'function' ) {
        this._Change( this );
    }
    if( typeof this._data === 'string' ) {
        Data.set( this._data, v );
    }
    return this;
};

/**
 * @return void
 */
InputDescription.prototype.Change = function( slot ) {
    if( typeof slot === 'function' ) {
        this._Change = slot;
    }
    return this;
};


InputDescription.create = function() {
    return new InputDescription();
};
module.exports = InputDescription;

