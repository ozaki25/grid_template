var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
var GridView = require('../../lib/GridView');
var PagerView = require('../../lib/PagerView');
var PaginationView = require('../../lib/PaginationView');

module.exports = Backbone.Marionette.LayoutView.extend({
    template: '#paging_sample_view',
    regions: {
        userTableRegion: '#user_table_region',
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
        this.renderUserTable();
        this.renderPager();
        this.renderPagination();
    },
    renderUserTable: function() {
        var columns = [
            { label: 'ID', name: 'id' },
            { label: '名前', name: 'name' },
            { label: '部署', name: 'dept' },
            { label: '年齢', name: 'age' },
        ];
        var gridView = new GridView({
            collection: this.collection,
            columns: columns,
        });
        this.getRegion('userTableRegion').show(gridView);
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