var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
var GridView = require('../../lib/GridView');
var PagingView = require('../../lib/PagingView');

module.exports = Backbone.Marionette.LayoutView.extend({
    template: '#paging_sample_view',
    regions: {
        userTableRegion: '#user_table_region',
        pagingRegion   : '#paging_region',
    },
    childEvents: {
        'click:changePage': 'onClickChangePage',
    },
    initialize: function(options) {
        this.model = new Backbone.Model({
            pageNumber: 1,
            totalPage: 3,
            hasPrev: false,
            hasNext: true,
        });
    },
    onBeforeShow: function() {
        this.renderUserTable();
        this.renderPaging();
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
    renderPaging: function() {
        var pagingView = new PagingView({ model: this.model });
        this.getRegion('pagingRegion').show(pagingView);
    },
    onClickChangePage: function(view) {
        console.log(JSON.stringify(view.model.attributes));
    },
});
