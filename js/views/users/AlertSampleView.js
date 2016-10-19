var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
var AlertMessageView = require('./AlertMessageView');
var ButtonView = require('../../lib/ButtonView');
var AlertView = require('../../lib/AlertView');

module.exports = Backbone.Marionette.LayoutView.extend({
    template: '#alert_sample_view',
    regions: {
        button1Region: '#button_1_region',
        button2Region: '#button_2_region',
        button3Region: '#button_3_region',
        alert1Region: '#alert_1_region',
        alert2Region: '#alert_2_region',
        alert3Region: '#alert_3_region',
    },
    childEvents: {
        'click:success': 'onClickSuccess',
        'click:error': 'onClickError',
        'click:button': 'onClickButton',
    },
    onRender: function() {
        this.renderButton();
    },
    renderButton: function() {
        var button1View = new ButtonView({ _className: 'btn btn-success', label: 'Success!', clickEventName: 'click:success' });
        var button2View = new ButtonView({ _className: 'btn btn-danger', label: 'Error!', clickEventName: 'click:error' });
        var button3View = new ButtonView({ _className: 'btn btn-default', label: 'Click!' });
        this.getRegion('button1Region').show(button1View);
        this.getRegion('button2Region').show(button2View);
        this.getRegion('button3Region').show(button3View);
    },
    renderAlert1: function() {
        var alertView = new AlertView({ alertType: 'success', message: 'This is alert message!' });
        this.getRegion('alert1Region').show(alertView);
    },
    renderAlert2: function() {
        var alertView = new AlertView({ alertType: 'danger', message: 'This is error message!', _className: 'error', _id: 'error_message' });
        this.getRegion('alert2Region').show(alertView);
    },
    renderAlert3: function() {
        var alertView = new AlertView({ alertType: 'info', message: new AlertMessageView() });
        this.getRegion('alert3Region').show(alertView);
    },
    onClickSuccess: function(view) {
        this.renderAlert1();
    },
    onClickError: function(view) {
        this.renderAlert2();
    },
    onClickButton: function(view) {
        this.renderAlert3();
    },
});
