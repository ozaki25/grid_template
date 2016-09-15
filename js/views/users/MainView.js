var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
var FormView = require('./FormView');
var GridSampleView = require('./GridSampleView');
var ButtonSampleView = require('./ButtonSampleView');
var SelectboxSampleView = require('./SelectboxSampleView');
var InputSampleView = require('./InputSampleView');
var TextareaSampleView = require('./TextareaSampleView');

module.exports = Backbone.Marionette.LayoutView.extend({
    className: 'container',
    template: '#user_main_view',
    regions: {
        userFormRegion       : '#user_form_region',
        gridSampleRegion     : '#grid_sample_region',
        buttonSampleRegion   : '#button_sample_region',
        selectboxSampleRegion: '#selectbox_sample_region',
        inputSampleRegion    : '#input_sample_region',
        textareaSampleRegion : '#textarea_sample_region',
    },
    onBeforeShow: function() {
        this.renderUserForm();
        this.renderGridSample();
        this.renderButtonSample();
        this.renderSelectboxSample();
        this.renderInputSample();
        this.renderTextareaSample();
    },
    renderUserForm: function() {
        this.getRegion('userFormRegion').show(new FormView({ collection: this.collection }));
    },
    renderGridSample: function() {
        this.getRegion('gridSampleRegion').show(new GridSampleView({ collection: this.collection }));
    },
    renderButtonSample: function() {
        this.getRegion('buttonSampleRegion').show(new ButtonSampleView());
    },
    renderSelectboxSample: function() {
        this.getRegion('selectboxSampleRegion').show(new SelectboxSampleView({ collection: this.collection }));
    },
    renderInputSample: function() {
        this.getRegion('inputSampleRegion').show(new InputSampleView());
    },
    renderTextareaSample: function() {
        this.getRegion('textareaSampleRegion').show(new TextareaSampleView());
    },
});
