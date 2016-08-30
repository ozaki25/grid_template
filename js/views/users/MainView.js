var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
var FormView = require('./FormView');
var GridView = require('../../lib/GridTemplateView');

module.exports = Backbone.Marionette.LayoutView.extend({
    className: 'container',
    template: '#user_main_view',
    regions: {
        userFormRegion: '#user_form_region',
        userTableRegion: '#user_table_region'
    },
    onRender: function() {
        this.renderUserForm();
        this.renderUserTable();
    },
    renderUserForm: function() {
        var formView = new FormView({ collection: this.collection });
        this.getRegion('userFormRegion').show(formView);
    },
    renderUserTable: function() {
        var gridView = new GridView({ collection: this.collection });
        this.getRegion('userTableRegion').show(gridView);
    },
});

