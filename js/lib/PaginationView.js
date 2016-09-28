var _ = require('underscore');
var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');

module.exports = Backbone.Marionette.LayoutView.extend({
    tagName: 'nav',
    template: _.template(
        '<ul class="pagination">' +
          '<li><a href="#">&laquo;</a></li>' +
          '<li><a href="#">1</a></li>' +
          '<li><a href="#">2</a></li>' +
          '<li><a href="#">3</a></li>' +
          '<li><a href="#">4</a></li>' +
          '<li><a href="#">5</a></li>' +
          '<li><a href="#">&raquo;</a></li>' +
        '</ul>'
    ),
    templateHelpers: function() {
        return {
        }
    },
    ui: {
    },
    events: {
    },
    modelEvents: {
        'change': 'render',
    },
    initialize: function(options) {
    },
    onRender: function() {
    },
});

