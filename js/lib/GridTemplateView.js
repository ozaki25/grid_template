var Backbone = require('backbone');
var _ = require('underscore');
Backbone.Marionette = require('backbone.marionette');

var GridRowView = Backbone.Marionette.ItemView.extend({
    tagName: 'tr',
    template: _.template('<%= values %>'),
    templateHelpers: function() {
        return {
            values: _(this.columnsLengthRange).map(function(i) {
                return '<td>' + this.model.get(this.columns[i][0]) + '</td>'
            }.bind(this))
        }
    },
    initialize: function(options) {
        this.columns = options.columns;
        this.columnsLengthRange = options.columnsLengthRange;
    },
});

var GridTemplateView = Backbone.Marionette.CompositeView.extend({
    childView: GridRowView,
    childViewContainer: '#grid_row_child_container',
    childViewOptions: function() {
        return {
            columns: this.columns,
            columnsLengthRange: this.columnsLengthRange,
        }
    },
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
            tableHeader: _(this.columnsLengthRange).map(function(i) {
                return '<th class="table-header" name="' + this.columns[i][0] + '">' + (this.columns[i][1] || this.columns[i][0]) + '</th>'
            }.bind(this)).join('')
        }
    },
    initialize: function(options) {
        this.sort = options.sort;
        this.columns = options.columns;
        var columnsLength = this.columns ? Object.keys(this.columns).length : 0;
        this.columnsLengthRange= _.range(1, columnsLength + 1);
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

module.exports = GridTemplateView;
