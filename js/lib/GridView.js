var Backbone = require('backbone');
var _ = require('underscore');
Backbone.Marionette = require('backbone.marionette');

var GridRowView = Backbone.Marionette.ItemView.extend({
    tagName: 'tr',
    template: _.template('<%= values %>'),
    templateHelpers: function() {
        return {
            values: _(this.columns).map(function(col) {
                var propName = 0;
                return '<td>' + this.model.get(col[propName]) + '</td>'
            }.bind(this))
        }
    },
    initialize: function(options) {
        this.columns = options.columns;
    },
});

var GridView = Backbone.Marionette.CompositeView.extend({
    childView: GridRowView,
    childViewContainer: '#grid_child_container',
    childViewOptions: function() {
        return {
            columns: this.columns,
        }
    },
    template: _.template(
      '<table class="table table-bordered">' +
        '<thead>' +
          '<tr><%= tableHeader %></tr>' +
        '</thead>' +
        '<tbody id="grid_child_container"></tbody>' +
      '</table>'
    ),
    templateHelpers: function() {
        return {
            tableHeader: _(this.columns).map(function(col) {
                var propName = 0;
                var header = 1;
                return '<th class="table-header" name="' + col[propName] + '">' + (col[header] || col[propName]) + '</th>'
            }).join('')
        }
    },
    initialize: function(options) {
        this.sortable = options.sort;
        this.columns = options.columns;
    },
    ui: {
        tableHeader: 'th.table-header',
    },
    events: {
        'click @ui.tableHeader': 'onClickTableHeader',
    },
    onClickTableHeader: function(e) {
        if(this.sort) {
            this.collection.comparator = this.$(e.target).attr('name');
            this.collection.sort();
        }
    }
});

module.exports = GridView;
