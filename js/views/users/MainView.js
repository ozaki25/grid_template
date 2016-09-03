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
        button3Region: '#button_3_region',
    },
    childEvents: {
        'click:button': 'onClickButton',
        'click:edit': 'onClickEditButton',
    },
    onRender: function() {
        this.renderUserForm();
        this.renderUserTable();
        this.renderButton1();
        this.renderButton2();
        this.renderButton3();
    },
    renderUserForm: function() {
        var formView = new FormView({ collection: this.collection });
        this.getRegion('userFormRegion').show(formView);
    },
    renderUserTable: function() {
        var buttonView = new ButtonView();
        var columns = [
            { label: 'ID',   name: 'id' },
            { label: '部署', name: 'dept' },
            { label: '名前', name: 'name' },
            { label: '#',    child: { view: ButtonView, options: { label: 'Edit' } } },
            { label: '#',    child: { view: ButtonView, options: { label: 'Destroy' } } },
        ];
        var gridView = new GridView({ collection: this.collection, columns: columns, sort: true });
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
    renderButton3: function() {
    },
    onClickButton: function() {
        alert('click button!');
    },
    onClickEditButton: function() {
        alert('click edit button!!');
    },
});
