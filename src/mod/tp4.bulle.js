/**
 *
 */
var Storage = require("tfw.storage").local;
var Widget = require("wdg");
var B = require("tp4.button").create;
var Layout = require("tfw.layout-row");
var D = Widget.div;

var registeredBulles = [];
var currentBulles = [];
var container = null;
var alreadySeen = Storage.get("hints", {});

function hide() {
    if (!container) return;
    container.detach();
    container = null;
    next();
}

function show(target, content) {
    var rect = target.rect();
    var x = rect.left + rect.width / 2;
    var y = rect.top + rect.height / 2;
    var centerX = document.body.getBoundingClientRect().width / 2;
    var centerY = document.body.getBoundingClientRect().height / 2;
    var dirH = x > centerX ? "right" : "left";
    var dirV = y > centerY ? "bottom" : "top";
    var w = D("tp4-bulle", dirH, dirV);
    var frame = D('frame');
    var center = Widget.tag("center").css("marginTop", "10px");
    var div = D("content").append(content, center);
    if (dirH == "right") x -= 240;
    w.css(
        {
            left: x + "px",
            top: y + "px"
        }
    );
    w.append(frame);
    if (dirV == 'top') {
        frame.append(D("svg"), div);
    } else {
        frame.append(div, D("svg"));
    }
    if (currentBulles.length > 0) {
        center.append(
            Layout.create(
                B({caption: _("later"), simple: true}).Tap(
                    function() {
                        currentBulles = [];
                        hide();
                    }
                ),
                B({caption: _("next")})
            )
        );
    } else {
        center.append(
            B({caption: _("close")})
        );
    }
    container = D("tp4-bulle-container").append(w).appendToBody();
    container.Tap(hide);
    setTimeout(
        function() {
            w.addClass("show");
        }
    );
};

/**
 * Afficher la prochaine bulle.
 */
function next() {
    if (currentBulles.length == 0) return;
    var bulle = currentBulles.pop();
    show(bulle.target, bulle.content);
    alreadySeen[bulle.id] = bulle.version;
    Storage.set("hints", alreadySeen);
}


exports.register = function(id, version, target, content) {
    registeredBulles.push(
        {
            id: id,
            version: version,
            target: target,
            content: content
        }
    );
    return exports;
};

exports.show = function( target, content ) {
    if (typeof target !== 'undefined' && typeof content !== 'undefined') {
        // You can force the display of a "bulle" right now.
        return show( target, content );
    }

    var bulle;
    currentBulles = [];
    while (registeredBulles.length > 0) {
        bulle = registeredBulles.pop();
        if (!alreadySeen[bulle.id] || alreadySeen[bulle.id] < bulle.version) {
            // N'afficher la bulle que si on ne l'a pas déjà vue.
            currentBulles.push(bulle);
        }
    }
    if (currentBulles.length > 0) next();
    return exports;
};

exports.reset = function() {
    alreadySeen = {};
    Storage.set("hints", {});
    return exports;
};
