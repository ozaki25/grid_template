var _ = require('underscore');
var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');

module.exports = Backbone.Marionette.LayoutView.extend({
    tagName: 'nav',
    template: _.template(
      '<ul class="pager">' +
        '<li class="<%= prevClass %>">' +
          '<a class="prev-btn" href="#"><%= prevLabel %></a>' +
        '</li>' +
        '<%= pageNumber %>' +
        '<li class="<%= nextClass %>">' +
          '<a class="next-btn" href="#"><%=  nextLabel %></a>' +
        '</li>' +
      '</ul>'
    ),
    templateHelpers: function() {
        return {
            prevClass: this.alignEachSide ? 'previous' : '',
            nextClass: this.alignEachSide ? 'next' : '',
            pageNumber: this.showPageNumber ? '&nbsp;' + this.model.get('pageNumber') + '&nbsp;/&nbsp;'  + this.model.get('totalPage') + '&nbsp;' : '',
            prevLabel: this.prevLabel,
            nextLabel: this.nextLabel,
        }
    },
    ui: {
        prevBtn: '.prev-btn',
        nextBtn: '.next-btn',
    },
    events: {
        'click @ui.prevBtn': 'onClickPrevBtn',
        'click @ui.nextBtn': 'onClickNextBtn',
    },
    modelEvents: {
        'change': 'render',
    },
    initialize: function(options) {
        this.alignEachSide = !!options.alignEachSide;
        this.showPageNumber = !!options.showPageNumber;
        this.prevLabel = options.prevLabel || '前のページ';
        this.nextLabel = options.nextLabel || '次のページ';
    },
    onRender: function() {
        this.eachEndCheck();
    },
    onClickPrevBtn: function(e) {
        e.preventDefault();
        if(this.hasPrev()) {
            this.model.set({ pageNumber: this.model.get('pageNumber') - 1 });
            this.triggerMethod('click:changePage', e);
        }
    },
    onClickNextBtn: function(e) {
        e.preventDefault();
        if(this.hasNext()) {
            this.model.set({ pageNumber: this.model.get('pageNumber') + 1 });
            this.triggerMethod('click:changePage', e);
        }
    },
    eachEndCheck: function() {
        if(!this.hasPrev()) this.ui.prevBtn.parent('li').addClass('disabled');
        if(!this.hasNext()) this.ui.nextBtn.parent('li').addClass('disabled');
    },
    hasPrev: function() {
        return this.model.get('pageNumber') > 1;
    },
    hasNext: function() {
        return this.model.get('pageNumber') < this.model.get('totalPage');
    },
});

