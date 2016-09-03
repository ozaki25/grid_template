var _ = require('underscore');
var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
var ButtonView = require('./ButtonView');

var GridRowView = Backbone.Marionette.LayoutView.extend({
    tagName: 'tr',
    template: _.template('<%= values %>'),
    templateHelpers: function() {
        return {
            values: _(this.columns).map(function(col) {
                var value = col.view ? '' : this.model.get(col.name);
                var id = 'table_data_' + this.model.id + '_' + (col.view ? col.view.cid : col.name);
                return '<td id="' + id + '">' + value + '</td>';
            }.bind(this))
        }
    },
    initialize: function(options) {
        this.columns = options.columns;
        _(this.columns).map(function(col) {
            if(col.child) col.view = new col.child.view(col.child.options);
        });
    },
    onRender: function() {
        _(this.columns).each(function(col) {
            if(col.view) {
                this.addRegion(this.model.id + col.view.cid, '#table_data_' + this.model.id + '_' + col.view.cid);
                this.getRegion(this.model.id + col.view.cid).show(col.view);
            }
        }.bind(this));
    }
});

var GridView = Backbone.Marionette.CompositeView.extend({
    tagName: 'table',
    className: 'table table-bordered',
    childView: GridRowView,
    childViewContainer: '#grid_child_container',
    childViewOptions: function() {
        return {
            columns: this.columns,
        }
    },
    template: _.template(
      '<thead>' +
        '<tr><%= tableHeader %></tr>' +
      '</thead>' +
      '<tbody id="grid_child_container"></tbody>'
    ),
    templateHelpers: function() {
        return {
            tableHeader: _(this.columns).map(function(col) {
                return '<th class="table-header" name="' + col.name + '">' + (col.label || col.name) + '</th>'
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
