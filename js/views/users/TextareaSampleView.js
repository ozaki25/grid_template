var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
var TextareaView = require('../../lib/TextareaView');
var ButtonView = require('../../lib/ButtonView');

module.exports = Backbone.Marionette.LayoutView.extend({
    className: 'col-md-5',
    template: '#textarea_sample_view',
    regions: {
        textarea1Region: '#textarea_1_region',
        textarea2Region: '#textarea_2_region',
        submitButton1Region: '#submit_button_1_region',
        submitButton2Region: '#submit_button_2_region',
    },
    childEvents: {
        'change:textarea': 'onChangeTextarea',
        'keypress:textarea': 'onKeypressTextarea',
        'click:submit1': 'onClickSubmit1Button',
        'click:submit2': 'onClickSubmit2Button',
    },
    onBeforeShow: function() {
        this.renderTextarea();
    },
    renderTextarea: function() {
        var textarea1View = new TextareaView({ _id: 'textarea' });
        this.getRegion('textarea1Region').show(textarea1View);
        var button1View = new ButtonView({ label: 'submit!', clickEventName: 'click:submit1' });
        this.getRegion('submitButton1Region').show(button1View);

        var textarea2View = new TextareaView({
            _id: 'message',
            _className: 'form-control message',
            _value: 'I like Backbone and Marionette.',
            attrs: { name: 'message', rows: 5 }
        });
        this.getRegion('textarea2Region').show(textarea2View);
        var button2View = new ButtonView({ label: 'submit!!', clickEventName: 'click:submit2' });
        this.getRegion('submitButton2Region').show(button2View);
    },
    onChangeTextarea: function(view, value) {
        console.log('change textarea', value);
    },
    onKeypressTextarea: function(view, value) {
        console.log('key press', value);
    },
    onClickSubmit1Button: function(view) {
        var value = this.$('textarea#textarea').val();
        alert('your text is ' + value);
    },
    onClickSubmit2Button: function(view) {
        var value = this.$('textarea.message').val();
        alert('your message is ' + value);
    },
});
