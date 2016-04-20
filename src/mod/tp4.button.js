var Widget = require("wdg");
var W = require("tp4.wait").create;


/**
 * Liste des classes CSS applicables sur un bouton :
 * * __simple__ : Simple lien, sans l'aspect "bouton".
 * * __shadow__ : Bouton légèrement plus foncé.
 * * __warning__ : Bouton orangé pour indiquer une action potentiellement dangeureuse.
 * * __small__ : Bouton de petite taille (environ 70%).
 *
 * @param {object} opts
 * * {string} `caption`: Text à afficher dans le bouton.
 * * {string} `href`: Si défini, lien vers lequel dirigier la page en cas de click.
 * * {boolean} `enabled`: Mettre `false` pour désactiver le bouton.
 * * {boolean} `simple`: Si `true`, le bouton ressemble à un simple lien.
 * * {string} `help`: Si défini, un click sur le bouton emmène vers la page d'aide dans l'onglet `HELP`.
 * * {object} `email`: Associe le _Tap_ à l'envoi d'un mail.
 *   * {string} `to`: destinataire.
 *   * {string} `subject`: sujet du mail.
 *   * {string} `body`: corps du mail.
 *
 * @example
 * var Button = require("tp4.button");
 * var instance = new Button();
 * @class Button
 */
var Button = function(opts) {
    var that = this;
    Widget.call(this, {tag: "a"});
    this.addClass("tp4-button").attr('href', '#');
    
    var t = typeof opts;
    if (t === 'string') opts = {caption: opts};
    else if (t !== 'object') opts = {};
    if (typeof opts.caption === 'undefined') opts.caption = "OK";
    if (opts.simple) {
        this.addClass("simple");
    }
    if (typeof opts.enabled === 'undefined') opts.enabled = true;
    if (typeof opts.email === 'string') {
        opts.email = {to: opts.email};
    }
    if (typeof opts.email === 'object') {
        if (typeof opts.email.to !== 'string') {
            opts.email.to = "contact@trail-passion.net";
        }
        if (typeof opts.email.subject !== 'string') {
            opts.email.subject = "Trail-Passion";
        }
        if (typeof opts.email.body !== 'string') {
            opts.email.body = "";
        }
        var href =
                "mailto:" + opts.email.to
                + "?subject=" + encodeURIComponent(opts.email.subject)
                + "&body=" + encodeURIComponent(opts.email.body);
        console.info("[tp4.button] href=...", href);
        opts.href = href;
    }
    if (typeof opts.href === 'string') {
        that.attr("href", opts.href);
    }
    if (typeof opts.target === 'string') {
        that.attr("target", opts.target);
    }
    this.enabled(opts.enabled);
    if (typeof opts.help === 'string') {
        this.Tap(
            function() {
                open("http://help.trail-passion.net/" + opts.help, "HELP");
            }
        );
    }

    this.caption(opts.caption);

    // Animate the pressing.
    this.addEvent("mousedown", function() {
        that.addClass('press');
    });
    this.addEvent("mouseup", function() {
        that.removeClass('press');
    });

    this.element().addEventListener('keydown', function(evt) {
        if (evt.keyCode == 13 || evt.keyCode == 32) {
            evt.preventDefault();        
            evt.stopPropagation();
            that.fire();
        }
    }, false);
};

Button.prototype = Object.create(Widget.prototype);
Button.prototype.constructor = Button;

/**
 * @return void
 */
Button.prototype.enabled = function(v) {
    if (typeof v === 'undefined') return this._enabled;
    if (v) {
        this.removeAttr("disabled");
    } else {
        this.attr("disabled", "yes");
    }
    this._enabled = v;
    return this;
};

/**
 * @return void
 */
Button.prototype.Tap = function(slot, sender) {
    if (typeof slot === 'undefined') return Widget.prototype.Tap.call(this);
    var that = this;
    if (typeof sender === 'undefined') sender = that;
    if (typeof slot === 'string') slot = sender[slot];
    var f = function() {
        if (that._enabled) {
            slot.call(sender, this);
        }
    };
    Widget.prototype.Tap.call(this, f);
    return this;
};

/**
 * @return void
 */
Button.prototype.caption = function(v) {
    if (typeof v === 'undefined') return this._caption;
    this._caption = v;
    this.attr('title', v).text(v);
    return this;
};

/**
 * Disable the button and start a wait animation.
 */
Button.prototype.waitOn = function(text) {
    if (typeof text === 'undefined') text = this.caption();
    this.enabled(false);
    this.clear(W({size: '1em', caption: text}));
};

/**
 * Stop the wait animation and enable the button again.
 */
Button.prototype.waitOff = function() {
    this.caption(this.caption());
    this.enabled(true);
};


/**
 * Simuler un click sur ce bouton.
 */
Button.prototype.fire = function() {
    var tap = this.Tap();
    if (!Array.isArray(tap)) return this;
    tap[0].call(tap[1], this);
    return this;
};

Button.create = function(opts) {
    return new Button(opts);
};
Button.createSimple = function(caption) {
    return new Button({caption: caption, simple: true});
};

function genericButton( id, classes, defaults ) {
    var btn = new Button({ caption: _(id) });
    if ( classes.length > 0 ) {
    var i, cls;
    for (i = 0 ; i < classes.length ; i++) {
        cls = classes[i];
        btn.addClass( cls );
    }
    } else {
        if (typeof defaults === 'undefined') return btn;
        if (!Array.isArray(defaults)) {
            defaults = [defaults];
        }
        defaults.forEach(function (cls) {
            btn.addClass( cls );
        });
    }
    return btn;
}

Button.Cancel = function() { return genericButton('cancel', arguments); };
Button.Close = function() { return genericButton('close', arguments, 'simple'); };
Button.Delete = function() { return genericButton('delete', arguments, 'warning'); };
Button.No = function() { return genericButton('no', arguments); };
Button.Ok = function() { return genericButton('ok', arguments); };
Button.Edit = function() { return genericButton('edit', arguments); };
Button.Save = function() { return genericButton('save', arguments, 'warning'); };
Button.Yes = function() { return genericButton('yes', arguments); };

module.exports = Button;
