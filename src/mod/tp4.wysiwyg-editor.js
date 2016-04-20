/**********************************************************************
 require( 'tp4.wysiwyg-editor' )
 -----------------------------------------------------------------------
 https://github.com/neilj/Squire
 **********************************************************************/


"use strict";
require("FontAwesome");
var DOM = require("dom");
var Popup = require("tp4.popup");
var Widget = require("wdg");
var Button = require("tp4.button");

/**
 * @example
 * var WysiwygEditor = require("tp4.wysiwyg-editor");
 * var instance = new WysiwygEditor( options );
 * @class WysiwygEditor
 */
var WysiwygEditor = function( options ) {
    var that = this;

    Widget.call(this);
    this.addClass("tp4-wysiwyg-editor");
    // Real focus function will be set when iframe will be loaded.
    var postponedFocus = false;
    this.focus = function() { postponedFocus = true; };

    var header = DOM.tag( 'header' );
    var iframe = DOM.tag( 'iframe', { src: 'squire/squire.html' } );
    iframe.addEventListener( 'load', function() {
        // Storing a reference to the wysiwyg editor.
        var squire = iframe.contentWindow.editor;
        that._squire = squire;
        that.focus = that._squire.focus.bind( squire );
        if( postponedFocus ) {
            that.focus();
        }
        // Adding edotir buttons.
        initHeader.call( that, header );
        if( that._postponedHTML ) {
            that._squire.setHTML( that._postponedHTML );
            delete that._postponedHTML;
        }
        // Adding onChange event when focus is lost.
        var lastContent = '';
        squire.addEventListener( 'focus', function() {
            lastContent = squire.getHTML();
        });
        squire.addEventListener( 'blur', function() {
            if( typeof that._Change === 'function' && lastContent !== squire.getHTML() ) {
                that._Change.call( that );
            }
        });
    }, false);

    this.append( header, iframe );
};

// Extension of Widget.
WysiwygEditor.prototype = Object.create(Widget.prototype);
WysiwygEditor.prototype.constructor = WysiwygEditor;


/**
 * Get/Set the HTML content of the editor.
 */
Object.defineProperty( WysiwygEditor.prototype, 'content', {
    get: function() {
        if( typeof this._squire === 'undefined' ) {
            // IFrame is not ready.
            return this._postponedHTML || "";
        }
        return this._squire.getHTML();
    },
    set: function( html ) {
        if( typeof this._squire === 'undefined' ) {
            // IFrame is  not ready.  We store  the `html`  and it
            // will  be inserted  as soon  as the  iframe will  be
            // loaded.
            this._postponedHTML = html;
            return;
        }
        this._squire.setHTML( html );
    },
    configurable: false,
    enumarable: true
});

/**
 * Accessor for attribute Change.
 */
WysiwygEditor.prototype.Change = function(v) {
    if (typeof v === 'undefined') return this._Change;
    this._Change = v;
    return this;
};


function initHeader( header ) {
    var buttonName, slot;
    var squire = this._squire;
    var buttons = [
        ['bold', squire.bold.bind( squire )],
        ['italic', squire.italic.bind( squire )],
        ['underline', squire.underline.bind( squire )],
        "|",
        ['list-ul', squire.makeUnorderedList.bind( squire )],
        ['list-ol', squire.makeOrderedList.bind( squire )],
        "|"
    ];
    buttons.forEach(function ( item ) {
        if( item === '|' ) {
            DOM.add( header, DOM.div( 'sep' ));
        } else {
            var buttonName = item[0];
            var slot = item[1];
            addButton( header, buttonName, slot );
        }
    });

    DOM.add( header, DOM.div( 'wide' ) );
}

/**
 * Add an editor button into the header.
 */
function addButton( header, name, slot ) {
    var button = DOM.div( 'button', { 'data-name': name }, [
        DOM.tag( 'i', 'fa', 'fa-' + name )
    ]);
    DOM.on( button, slot );
    DOM.add( header, button );
    return button;
}


WysiwygEditor.create = function( options ) {
    return new WysiwygEditor( options );
};

/**
 * Open a popup with `html` in the editor and `caption` as title.
 * Il the __Validate__  button is clicked, call `onValidate` with the resulting HTML as argument.
 */
WysiwygEditor.edit = function( caption, html, onValidate ) {
    var editor = new WysiwygEditor();
    editor.content = html || "";
    var footer = DOM.tag( 'footer' );
    var body = DOM.div( 'tp4-wysiwyg-editor-popup', [editor, footer] );
    var close = Popup( caption, body );
    var btnCancel = Button.Cancel().Tap( close );
    var btnOK = Button.Ok().Tap( function() {
        onValidate( editor.content );
        close();
    } );
    DOM.add( footer, DOM.div([ btnCancel.element() ]), DOM.div([ btnOK.element() ]) );
    editor.focus();
};

module.exports = WysiwygEditor;
