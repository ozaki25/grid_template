var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
var PagerView = require('../../lib/PagerView');
var PaginationView = require('../../lib/PaginationView');

module.exports = Backbone.Marionette.LayoutView.extend({
    template: '#paging_sample_view',
    regions: {
        pagerRegion   : '#pager_region',
        paginationRegion   : '#pagination_region',
    },
    childEvents: {
        'click:changePage': 'onClickChangePage',
    },
    initialize: function(options) {
        this.model = new Backbone.Model({
            pageNumber: 33,
            totalPage: 100,
        });
    },
    onBeforeShow: function() {
        this.renderPager();
        this.renderPagination();
    },
    renderPager: function() {
        var pagerView = new PagerView({ model: this.model, showPageNumber: true, alignEachSide: false });
        this.getRegion('pagerRegion').show(pagerView);
    },
    renderPagination: function() {
        var paginationView = new PaginationView({ model: this.model });
        this.getRegion('paginationRegion').show(paginationView);
    },
    onClickChangePage: function(view, e) {
        console.log('you click ' + e.target.className);
        console.log(JSON.stringify(view.model.attributes));
    },
});
