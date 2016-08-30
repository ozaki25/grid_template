var Backbone = require('backbone');
Backbone._ = require('underscore');
Backbone.Marionette = require('backbone.marionette');

var GridRowView = Backbone.Marionette.ItemView.extend({
    tagName: 'tr',
    template: Backbone._.template('<%= attributes %>'),
    templateHelpers: function() {
        return {
            attributes: Backbone._(this.model.attributes).map(function(attr) { return '<td>' + attr + '</td>' })
        }
    },
    onRender: function() {
        console.log(this.model.attributes);
    }
});

var GridTemplateView = Backbone.Marionette.CompositeView.extend({
    childView: GridRowView,
    childViewContainer: '#grid_row_child_container',
    template: Backbone._.template(
      '<table class="table table-bordered">' +
        '<thead>' +
          '<tr><%= attributeNames %></tr>' +
        '</thead>' +
        '<tbody id="grid_row_child_container"></tbody>' +
      '</table>'
    ),
    templateHelpers: function() {
        return {
            attributeNames: Backbone._.chain(this.collection.models[0].attributes).keys().map(function(name) { return '<th>' + name + '</th>' }).value().join('')
        }
    },
});

module.exports = GridTemplateView;
