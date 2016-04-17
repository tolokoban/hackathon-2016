"use strict";
var DOM = require("dom");
var Data = require("data2");
var Popup = require("tp4.popup");
var Widget = require("wdg");


/**
 * Private attributes.
 * `_caption` {string} - caption to display.
 * `_options` {object} - Keys are IDs, values are widgets or DOM elements to display.
 * `_keys` {array} - Keys of `_options`.
 */
var Select = function( args ) {
    var options = args.options;
    if( typeof options === 'string' ) {
        try {
            options = JSON.parse( options );
            if( Array.isArray(options) ) {
                var tmp = {};
                options.forEach(function (opt) {
                    tmp[opt] = opt;
                });
                options = tmp;
            }
        }
        catch( ex ) {
            console.error( "Unable to parse this JSON: ", options );
            console.error( ex );
        }
    }
    var caption = args.label || "";

    Widget.call(this);
    this.addClass("tp4-select");
    this._caption = caption;
    this._options = options;
    var D = Widget.div,
        body = D("body");
    this.append(
        D().append(D("caption").text(caption), D("tail")),
        D().append( body, D("arrow") )
    );
    // Afficher l'option courante.
    this._body = body;
    var key, keys = [];
    for (key in options) keys.push(key);
    this._keys = keys;
    this.val( keys[0] );
    // Activer le onTap.
    DOM.on( this.element(), onTap.bind( this ), true );
    this._onChange = null;
    if( typeof this._data === 'string' ) {
        this._data = options.data;
        this.val( Data.get( this._data ) );
    }
};

// Extension of Widget.
Select.prototype = Object.create(Widget.prototype);
Select.prototype.constructor = Select;

/**
 * 
 */
Object.defineProperty( Select.prototype, 'options', {
    get: function() { return this._options; },
    set: function(v) {
        this._options = v;
        // Reset `this._keys`.
        var key, keys = [];
        for (key in v) keys.push(key);
        this._keys = keys;
        // Refresh the current item.
        this.val( this.val() );
    },
    configurable: true,
    enumerable: true
});
/**
 * @return void
 */
Select.prototype.Change = function(slot) {
    if (typeof slot === 'undefined') return this._onChange;
    this._onChange = slot;
    return this;
};

/**
 * @return void
 */
Select.prototype.fireChange = function(arg) {
    var f = this._onChange;
    if (typeof f === 'function') {
        f.call(this, arg);
    }
};


/**
 * Accessor for attribute val.
 */
Select.prototype.val = function(v) {
    if (typeof v === 'undefined') return this._val;
    if (typeof this._options[v] === 'undefined') return this;
    this._val = v;
    this._body.clear( this._options[v] );
    if( typeof this._data === 'string' ) {
        Data.set( this._data, v );
    }
    return this;
};

/**
 * Private event handler for __tap__ event.
 */
function onTap() {
    var key, keys = this._keys;
    if (keys.length == 2) {
        key = keys[1 - keys.indexOf(this.val())];
        this.val(key);
        this.fireChange(key);
    } else {
        var content = DOM.div( 'tp4-select-popup' );
        var close = Popup( this._caption, content );
        var selectedKey = this.val();
        keys.forEach(function ( key ) {
            // We must not insert  the currently selected item because
            // it  is  already  inserted  in  the  combo  widget.  And
            // inserting  it in  the  popup will  remove  it from  the
            // combo.
            // But this is not a problem since the user won't click on
            // it.
            if( key == selectedKey ) return;
            var item = this.newItem( key, close );
            content.appendChild( item );
        }, this);
    }
    return this;
};

/**
 * @return void
 */
Select.prototype.newItem = function( key, close ) {
    var that = this;
    var btn = DOM.div("item", [this._options[key]]);
    DOM.on( btn, function() {
        that.val(key);
        that.fireChange(key);
        close();
    }, true);
    btn.key = key;
    return btn;
};


Select.create = function(caption, options) {
    return new Select(caption, options);
};
module.exports = Select;
