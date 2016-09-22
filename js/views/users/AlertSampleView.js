var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
var ButtonView = require('../../lib/ButtonView');
var AlertView = require('../../lib/AlertView');

module.exports = Backbone.Marionette.LayoutView.extend({
    template: '#alert_sample_view',
    regions: {
        button1Region: '#button_1_region',
        button2Region: '#button_2_region',
        alert1Region: '#alert_1_region',
        alert2Region: '#alert_2_region',
    },
    childEvents: {
        'click:success': 'onClickSuccess',
        'click:error': 'onClickError',
    },
    onBeforeShow: function() {
        this.renderButton();
    },
    renderButton: function() {
        var button1View = new ButtonView({ _className: 'btn btn-success', label: 'Success!', clickEventName: 'click:success' });
        var button2View = new ButtonView({ _className: 'btn btn-danger', label: 'Error!', clickEventName: 'click:error' });
        this.getRegion('button1Region').show(button1View);
        this.getRegion('button2Region').show(button2View);
    },
    renderAlert1: function() {
        var alertView = new AlertView({ alertType: 'success', message: 'Alert message!' });
        this.getRegion('alert1Region').show(alertView);
    },
    renderAlert2: function() {
        var alertView = new AlertView({ alertType: 'danger', message: 'This is error message', _className: 'error', _id: 'error_message' });
        this.getRegion('alert2Region').show(alertView);
    },
    onClickSuccess: function(view) {
        this.renderAlert1();
    },
    onClickError: function(view) {
        this.renderAlert2();
    },
});
