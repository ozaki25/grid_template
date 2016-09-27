var _ = require('underscore');
var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');

module.exports = Backbone.Marionette.LayoutView.extend({
    tagName: 'nav',
    template: _.template(
      '<ul class="pager">' +
        '<li>' +
          '<a class="prev-btn" href="#"><%= prevLavel %></a>' +
        '</li>' +
        ' <%- pageNumber %> / <%- totalPage %> ' +
        '<li>' +
          '<a class="next-btn" href="#"><%=  nextLavel %></a>' +
        '</li>' +
      '</ul>'
    ),
    templateHelpers: function() {
        return {
            prevLavel: this.prevLavel,
            nextLavel: this.nextLavel,
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
        'sync': 'render',
    },
    initialize: function(options) {
        this.prevLavel = options.prevLavel || '&larr; 前のページ';
        this.nextLavel = options.nextLavel || '次のページ &rarr;';
    },
    onRender: function() {
        this.bothEndsCheck();
    },
    onClickPrevBtn: function(e) {
        e.preventDefault();
        if(this.model.get('hasPrev')) {
            this.model.set({ pageNumber: this.model.get('pageNumber') - 1 });
            this.triggerMethod('click:changePage');
        }
    },
    onClickNextBtn: function(e) {
        e.preventDefault();
        if(this.model.get('hasNext')) {
            this.model.set({ pageNumber: this.model.get('pageNumber') + 1 });
            this.triggerMethod('click:changePage');
        }
    },
    bothEndsCheck: function() {
        if(!this.model.get('hasPrev')) this.ui.prevBtn.parent('li').addClass('disabled');
        if(!this.model.get('hasNext')) this.ui.nextBtn.parent('li').addClass('disabled');
    },
});

