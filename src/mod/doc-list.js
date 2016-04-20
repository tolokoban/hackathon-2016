"use strict";
var Widget = require("wdg");
var Data = require("data2");

var D = Widget.div;
var T = Widget.tag;


/**
 * @example
 * var DocList = require("doc-list");
 * var instance = new DocList();
 * @class DocList
 */
var DocList = function( args ) {
    Widget.call(this);
    this.addClass("doc-list");
}

// Extension of Widget.
DocList.prototype = Object.create(Widget.prototype);
DocList.prototype.constructor = DocList;

/**
 * @return void
 */
DocList.prototype.refresh = function() {
    this.clear();
    var documents = Data.get( "documents" );
    console.info("[doc-list] documents=...", documents);
    documents.forEach(function ( doc ) {
        this.addDoc( doc );
    }, this);
};


/**
 * @return void
 */
DocList.prototype.addDoc = function( doc ) {
    var ul = T('ul');
    ul.append(
        T( 'li' ).append(
            T( 'a' ).text( doc.name ).attr(
                'href',
                "#/book/doc-view/" + doc.$key
            )
        )
    );
    this.append( ul );
};



DocList.create = function() {
    return new DocList();
};
module.exports = DocList;
