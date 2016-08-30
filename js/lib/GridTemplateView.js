var _ = require('underscore');
var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');

var GridRowView = Backbone.Marionette.ItemView.extend({
    tagName: 'tr',
    template: _.template('<%= values %>'),
    templateHelpers: function() {
        return {
            values: _(this.model.attributes).map(function(value) {
                return '<td>' + value + '</td>'
            })
        }
    },
});

var GridTemplateView = Backbone.Marionette.CompositeView.extend({
    childView: GridRowView,
    childViewContainer: '#grid_row_child_container',
    template: _.template(
      '<table class="table table-bordered">' +
        '<thead>' +
          '<tr><%= tableHeader %></tr>' +
        '</thead>' +
        '<tbody id="grid_row_child_container"></tbody>' +
      '</table>'
    ),
    templateHelpers: function() {
        return {
            tableHeader: _(this.headerNames).map(function(name) {
                return '<th>' + name + '</th>'
            }.bind(this)).join('')
        }
    },
    initialize: function() {
        this.headerNames = this.collection.models.length ? Object.keys(this.collection.models[0].attributes) : [];
    }
});

module.exports = GridTemplateView;
