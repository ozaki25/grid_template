var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
var GridView = require('../../lib/GridView');
var ButtonView = require('../../lib/ButtonView');
var SelectboxView = require('../../lib/SelectboxView');

module.exports = Backbone.Marionette.LayoutView.extend({
    template: '#grid_sample_view',
    regions: {
        userTableRegion: '#user_table_region',
    },
    childEvents: {
        'click:edit': 'onClickEditButton',
        'click:destroy': 'onClickDestroyButton',
        'change:username': 'onChangeSelectUser',
    },
    onBeforeShow: function() {
        this.renderUserTable();
    },
    renderUserTable: function() {
        var columns = [
            { label: 'ID', name: 'id' },
            { label: '部署', name: 'dept' },
            { label: '名前', name: 'name' },
            { label: '#', child: { view: ButtonView, options: { label: 'Edit', clickEventName: 'click:edit', _className: 'btn btn-xs btn-primary' } } },
            { label: '#', child: { view: ButtonView, options: { label: 'Destroy', clickEventName: 'click:destroy' } } },
            { label: '#', child: { view: SelectboxView, options: { collection: this.collection, label: 'name', value: 'id', changeEventName: 'change:username' } } },
        ];
        var eventNames = ['click:edit', 'click:destroy', 'change:username'];
        var gridView = new GridView({ collection: this.collection, columns: columns, sort: true, eventNames: eventNames });
        this.getRegion('userTableRegion').show(gridView);
    },
    onClickEditButton: function(view) {
        alert('click edit button!');
        console.log('edit : ' + JSON.stringify(view.model.attributes));
    },
    onClickDestroyButton: function(view) {
        console.log('destroy : ' + JSON.stringify(view.model.attributes));
        if(confirm('Are you ok?')) view.model.destroy();
    },
    onChangeSelectUser: function(view, value, model) {
        console.log(value);
        console.log(JSON.stringify(model.attributes));
    },
});
