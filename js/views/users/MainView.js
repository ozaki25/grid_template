var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
var FormView = require('./FormView');
var GridView = require('../../lib/GridView');
var ButtonView = require('../../lib/ButtonView');

module.exports = Backbone.Marionette.LayoutView.extend({
    className: 'container',
    template: '#user_main_view',
    regions: {
        userFormRegion: '#user_form_region',
        userTableRegion: '#user_table_region',
        button1Region: '#button_1_region',
        button2Region: '#button_2_region',
    },
    childEvents: {
        'click:button': 'onClickButton',
        'click:edit': 'onClickEditButton',
        'click:destroy': 'onClickDestroyButton',
    },
    onBeforeShow: function() {
        this.renderUserForm();
        this.renderUserTable();
        this.renderButton1();
        this.renderButton2();
    },
    renderUserForm: function() {
        var formView = new FormView({ collection: this.collection });
        this.getRegion('userFormRegion').show(formView);
    },
    renderUserTable: function() {
        var columns = [
            { label: 'ID', name: 'id' },
            { label: '部署', name: 'dept' },
            { label: '名前', name: 'name' },
            { label: '#', child: { view: ButtonView, options: { label: 'Edit', clickEventName: 'click:edit', classNames: 'btn btn-xs btn-primary' } } },
            { label: '#', child: { view: ButtonView, options: { label: 'Destroy', clickEventName: 'click:destroy' } } },
        ];
        var eventNames = ['click:edit', 'click:destroy'];
        var gridView = new GridView({ collection: this.collection, columns: columns, sort: true, eventNames: eventNames });
        this.getRegion('userTableRegion').show(gridView);
    },
    renderButton1: function() {
        var buttonView = new ButtonView({ label: 'submit' });
        this.getRegion('button1Region').show(buttonView);
    },
    renderButton2: function() {
        var buttonView = new ButtonView({ label: 'submit', clickEventName: 'click:edit' });
        this.getRegion('button2Region').show(buttonView);
    },
    onClickButton: function(view) {
        alert('click button!');
    },
    onClickEditButton: function(view) {
        alert('click edit button!');
        console.log('edit : ' + JSON.stringify(view.model.attributes));
    },
    onClickDestroyButton: function(view) {
        console.log('destroy : ' + JSON.stringify(view.model.attributes));
        if(confirm('Are you ok?')) view.model.destroy();
    },
});
