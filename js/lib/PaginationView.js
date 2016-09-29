var _ = require('underscore');
var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');

PageNumberView = Backbone.Marionette.ItemView.extend({
    tagName: 'li',
    attributes: function() {
        return {
            class: this.options.pageNumber === this.model.get('page') ? 'active' : '',
        }
    },
    template: _.template('<a href="#"><%- label %></a>'),
    events: {
        'click': 'onClick',
    },
    onClick: function(e) {
        e.preventDefault();
        this.triggerMethod('click:page');
    },
});


PaginationView = Backbone.Marionette.CompositeView.extend({
    tagName: 'nav',
    childView: PageNumberView,
    childViewContainer: '#page_number_container',
    childViewOptions: function() {
        return {
            pageNumber: this.model.get('pageNumber'),
        }
    },
    template: _.template(
        '<ul id="page_number_container" class="pagination"></ul>'
    ),
    childEvents: {
        'click:page': 'onClickPageLink',
    },
    modelEvents: {
        'change': 'render',
    },
    initialize: function(options) {
        this.collection = new Backbone.Collection();
    },
    updatePages: function() {
        var first = [{ page: 1, label: '«' }];
        var prev = [{ page: this.model.get('pageNumber') - 1, label: '‹' }];
        var next = [{ page: this.model.get('pageNumber') + 1, label: '›' }];
        var last = [{ page: this.model.get('totalPage'), label: '»' }];
        var pageRange = _.range(this.model.get('pageNumber') -2, this.model.get('pageNumber') + 3);
        var pages = _(pageRange).map(function(i) { return { page: i, label: i }; });
        this.collection = new Backbone.Collection([].concat(first, prev, pages, next, last));
    },
    onBeforeRender: function() {
        this.updatePages();
    },
    onClickPageLink: function(view) {
        this.model.set({ pageNumber: view.model.get('page') });
    },
});

module.exports = PaginationView;
