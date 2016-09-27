var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
var GridView = require('../../lib/GridView');
var PagerView = require('../../lib/PagerView');

module.exports = Backbone.Marionette.LayoutView.extend({
    template: '#pager_sample_view',
    regions: {
        userTableRegion: '#user_table_region',
        pagerRegion   : '#pager_region',
    },
    childEvents: {
        'click:changePage': 'onClickChangePage',
    },
    initialize: function(options) {
        this.model = new Backbone.Model({
            pageNumber: 1,
            totalPage: 3,
        });
    },
    onBeforeShow: function() {
        this.renderUserTable();
        this.renderPager();
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
    onClickChangePage: function(view, e) {
        console.log('you click ' + e.target.className);
        console.log(JSON.stringify(view.model.attributes));
    },
});
