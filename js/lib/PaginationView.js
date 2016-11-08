var _ = require('underscore');
var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');

var PageNumberView = Backbone.Marionette.ItemView.extend({
    tagName: 'li',
    className: function() {
        return (this.model.get('active') ? 'active ' :'' ) + (this.model.get('disabled') ? 'disabled ' :'' );
    },
    template: _.template('<a href="#"><%- label %></a>'),
    events: {
        'click': 'onClick',
    },
    onClick: function(e) {
        e.preventDefault();
        if(!this.model.get('disabled')) this.triggerMethod('click:page', e);
    },
});


var PaginationView = Backbone.Marionette.CompositeView.extend({
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
        var first = [{ page: 1, label: '«', disabled: !this.hasPrev() }];
        var prev = [{ page: this.model.get('pageNumber') - 1, label: '‹', disabled: !this.hasPrev() }];
        var next = [{ page: this.model.get('pageNumber') + 1, label: '›', disabled: !this.hasNext() }];
        var last = [{ page: this.model.get('totalPage'), label: '»', disabled: !this.hasNext() }];
        var pageRange = _.range(this.model.get('pageNumber') -2, this.model.get('pageNumber') + 3);
        var pages = _.chain(pageRange).map(function(i) {
            return i < 1 || i > this.model.get('totalPage') ? '' : { page: i, label: i, active: i == this.model.get('pageNumber') };
        }.bind(this)).compact().value();
        this.collection = new Backbone.Collection([].concat(first, prev, pages, next, last));
    },
    onBeforeRender: function() {
        this.updatePages();
    },
    onClickPageLink: function(view, e) {
        this.model.set({ pageNumber: view.model.get('page') });
        this.triggerMethod('click:changePage', e);
    },
    hasPrev: function() {
        return this.model.get('pageNumber') > 1;
    },
    hasNext: function() {
        return this.model.get('pageNumber') < this.model.get('totalPage');
    },
});

module.exports = PaginationView;
