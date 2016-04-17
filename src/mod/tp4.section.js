"use strict";
var Widget = require("wdg");
var D = Widget.div;

/**
 * @example
 * var Section = require("tp4.Section");
 * var instance = new Section(title, body);
 * @class Section
 */
var Section = function(title, body, expanded) {
  if (typeof title === 'undefined') title = "";
  if (typeof body === 'undefined') body = "";
  if (typeof expanded === 'undefined') expanded = true;
  Widget.call(this);
  this.addClass("tp4-section");
  var that = this;
  this._titleContainer = D("title").Tap(
    function() {
      that.toggle();
    }
  );
  this._bodyContainer = D("body");
  this.title(title);
  this.body(body);
  this.expanded(expanded);
  this.append(this._titleContainer, this._bodyContainer);
};

// Extension of Widget.
Section.prototype = Object.create(Widget.prototype);
Section.prototype.constructor = Section;

/**
 * Accessor for attribute title.
 */
Section.prototype.title = function(v) {
  if (typeof v === 'undefined') return this._title;
  this._title = v;
  this._titleContainer.clear(v);
  return this;
};

/**
 * Accessor for attribute body.
 */
Section.prototype.body = function(v) {
  if (typeof v === 'undefined') return this._body;
  this._body = v;
  this._bodyContainer.clear(v);
  return this;
};

/**
 * Accessor for attribute expanded.
 */
Section.prototype.expanded = function(v) {
  if (typeof v === 'undefined') return this._expanded;
  this._expanded = v;
  if (v) {
    this.addClass("expanded");
  } else {
    this.removeClass("expanded");
  }
  return this;
};

/**
 * Accessor for attribute collapsed.
 */
Section.prototype.collapsed = function(v) {
  if (typeof v === 'undefined') return !this._expanded;
  this._expanded = !v;
  if (v) {
    this.removeClass("expanded");
  } else {
    this.addClass("expanded");
  }
  return this;
};

/**
 * @return void
 */
Section.prototype.toggle = function() {
  if (this.expanded()) {
    this.expanded(false);
  } else {
    this.expanded(true);
  }
};


Section.create = function(title, body, expanded) {
  return new Section(title, body, expanded);
};
module.exports = Section;
