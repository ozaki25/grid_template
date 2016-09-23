var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
var ButtonView = require('../../lib/ButtonView');

module.exports = Backbone.Marionette.LayoutView.extend({
    template: '#alert_message_view',
    regions: {
        buttonRegion: '#button_region',
    },
    childEvents: {
        'click:button': 'onClickButton',
    },
    onBeforeShow: function() {
        this.renderButton();
    },
    renderButton: function() {
        var buttonView = new ButtonView({ _className: 'btn btn-info btn-xs', label: 'Click!' });
        this.getRegion('buttonRegion').show(buttonView);
    },
    onClickButton: function() {
        alert('Click button in alert!');
    },
});
