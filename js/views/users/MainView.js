var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
var FormView = require('./FormView');
var GridView = require('../../lib/GridView');
var ButtonView = require('../../lib/ButtonView');
var SelectboxView = require('../../lib/SelectboxView');
var User = require('../../models/User');
var Users = require('../../collections/Users');
module.exports = Backbone.Marionette.LayoutView.extend({
    className: 'container',
    template: '#user_main_view',
    regions: {
        userFormRegion: '#user_form_region',
        userTableRegion: '#user_table_region',
        button1Region: '#button_1_region',
        button2Region: '#button_2_region',
        selectbox1Region: '#selectbox_1_region',
        selectbox2Region: '#selectbox_2_region',
    },
    childEvents: {
        'click:button': 'onClickButton',
        'click:edit': 'onClickEditButton',
        'click:destroy': 'onClickDestroyButton',
        'change:selectbox': 'onChangeSelectbox',
        'change:username': 'onChangeSelectUser',
    },
    onBeforeShow: function() {
        this.renderUserForm();
        this.renderUserTable();
        this.renderButton();
        this.renderSelectbox();
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
            { label: '#', child: { view: ButtonView, options: { label: 'Edit', clickEventName: 'click:edit', _className: 'btn btn-xs btn-primary' } } },
            { label: '#', child: { view: ButtonView, options: { label: 'Destroy', clickEventName: 'click:destroy' } } },
            { label: '#', child: { view: SelectboxView, options: { collection: this.collection, label: 'name', value: 'id', changeEventName: 'change:username' } } },
        ];
        var eventNames = ['click:edit', 'click:destroy', 'change:username'];
        var gridView = new GridView({ collection: this.collection, columns: columns, sort: true, eventNames: eventNames });
        this.getRegion('userTableRegion').show(gridView);
    },
    renderButton: function() {
        var button1View = new ButtonView({ label: 'submit' });
        this.getRegion('button1Region').show(button1View);

        var button2View = new ButtonView({
            label: 'submit',
            clickEventName: 'click:edit',
            _id: 'edit_btn',
            _className: 'btn btn-xs btn-success',
            attrs: { name: 'editBtn', 'data-target': '#button' }
        });
        this.getRegion('button2Region').show(button2View);
    },
    renderSelectbox: function() {
        var selectbox1View = new SelectboxView({ collection: this.collection, label: 'name', value: 'id' });
        this.getRegion('selectbox1Region').show(selectbox1View);

        var selectbox2View = new SelectboxView({
            collection: this.collection,
            label: 'name',
            value: 'id',
            changeEventName: 'change:username',
            _id: 'select_user',
            _className: 'form-control select-user',
            attrs: { name: 'selectUser', 'data-target': '#button' },
            optionAttrs: { _className: 'select-option' }
        });
        this.getRegion('selectbox2Region').show(selectbox2View);

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
    onChangeSelectbox: function(view, value, model) {
        alert('change selectbox!');
        console.log(view);
        console.log(value);
        console.log(JSON.stringify(model.attributes));
    },
    onChangeSelectUser: function(view, value, model) {
        alert('change select user!');
        console.log(view);
        console.log(value);
        console.log(JSON.stringify(model.attributes));
    },
});
