var $ = require("dom");

function Qrcode( args ) {
    var that = this;

    if( typeof args !== 'object') args = undefined;
    if( typeof args === 'undefined' ) args = { id: '', page: '' };
    if( typeof args.id === 'undefined' ) args.id = '';
    if( typeof args.page === 'undefined' ) args.page = '';

    var img = document.createElement( 'img' );
    img.className = "qrcode";
    img.setAttribute( 'src', 'css/qrcode/qrcode.php?id=' + args.id + "&page=" + args.page );
    Object.defineProperty( this, 'element', {
        value: img, writable: false, enumerable: true, configurable: false
    });
    $.on( this.element, function() {
        window.location = "?" + that._args.id;
    });
    
    this._args = args;
}

/**
 * get/set the ID.
 */
Object.defineProperty( Qrcode.prototype, 'id', {
    get: function() { return this._args.id; },
    set: function(v) {
        this._args.id = v;
        this.element.setAttribute(
            'src', 'css/qrcode/qrcode.php?id=' + this._args.id + "&page=" + this._args.page
        );
    },
    configurable: true,
    enumerable: true
});


/**
 * get/set the lang.
 */
Object.defineProperty( Qrcode.prototype, 'lang', {
    get: function() { return this._args.lang; },
    set: function(v) {
        this._args.lang = v;
        this.element.setAttribute(
            'src', 'css/qrcode/qrcode.php?id=' + this._args.id + "&page=" + this._args.page
        );
    },
    configurable: true,
    enumerable: true
});



module.exports = Qrcode;
