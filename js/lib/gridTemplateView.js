var Backbone = require('backbone');
Backbone._ = require('underscore');
Backbone.Marionette = require('backbone.marionette');

var GridRowView = Backbone.Marionette.ItemView.extend({
    tagName: 'tr',
    template: Backbone._.template(
        '<td><%- id %></td>' +
        '<td><%- name %></td>' +
        '<td><%- age %></td>'
    ),
});

var GridTemplateView = Backbone.Marionette.CompositeView.extend({
    childView: GridRowView,
    childViewContainer: '#grid_row_child_container',
    template: Backbone._.template(
      '<table class="table table-bordered">' +
        '<thead>' +
          '<tr>' +
            '<th>id</th>' +
            '<th>Name</th>' +
            '<th>Age</th>' +
          '</tr>' +
        '</thead>' +
        '<tbody id="grid_row_child_container"></tbody>' +
      '</table>'
    ),
});

module.exports = GridTemplateView;
