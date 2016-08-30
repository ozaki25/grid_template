var Backbone = require('backbone');
Backbone._ = require('underscore');
Backbone.Marionette = require('backbone.marionette');

var GridRowView = Backbone.Marionette.ItemView.extend({
    tagName: 'tr',
    template: Backbone._.template('<%= values %>'),
    templateHelpers: function() {
        return {
            values: Backbone._(this.model.attributes).map(function(value) {
                return '<td>' + value + '</td>'
            })
        }
    },
});

var GridTemplateView = Backbone.Marionette.CompositeView.extend({
    childView: GridRowView,
    childViewContainer: '#grid_row_child_container',
    template: Backbone._.template(
      '<table class="table table-bordered">' +
        '<thead>' +
          '<tr><%= keys %></tr>' +
        '</thead>' +
        '<tbody id="grid_row_child_container"></tbody>' +
      '</table>'
    ),
    templateHelpers: function() {
        return {
            keys: Backbone._(this.collection.models[0].attributes).map(function(_, key) {
                return '<th>' + key + '</th>'
            }).join('')
        }
    },
});

module.exports = GridTemplateView;
