var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
var ButtonView = require('../../lib/ButtonView');
var InputView = require('../../lib/InputView');

module.exports = Backbone.Marionette.LayoutView.extend({
    className: 'col-md-4',
    template: '#input_sample_view',
    regions: {
        input1Region: '#input_1_region',
        input2Region: '#input_2_region',
        submitButton1Region: '#submit_button_1_region',
        submitButton2Region: '#submit_button_2_region',
    },
    childEvents: {
        'change:input': 'onChangeInput',
        'keypress:input': 'onKeypressInput',
        'click:submit1': 'onClickSubmit1Button',
        'click:submit2': 'onClickSubmit2Button',
    },
    onBeforeShow: function() {
        this.renderInput();
    },
    renderInput: function() {
        var input1View = new InputView({ _id: 'username' });
        this.getRegion('input1Region').show(input1View);
        var button1View = new ButtonView({ label: 'submit!', clickEventName: 'click:submit1' });
        this.getRegion('submitButton1Region').show(button1View);

        var input2View = new InputView({
            _id: 'input_email',
            _className: 'form-control email',
            _value: 'backbone@marionette.com',
            _type: 'email',
            attrs: { name: 'email' }
        });
        this.getRegion('input2Region').show(input2View);
        var button2View = new ButtonView({ label: 'submit!!', clickEventName: 'click:submit2' });
        this.getRegion('submitButton2Region').show(button2View);
    },
    onChangeInput: function(view, value) {
        console.log('change input', value);
    },
    onKeypressInput: function(view, value) {
        console.log('key press', value);
    },
    onClickSubmit1Button: function(view) {
        var value = this.$('input#username').val();
        alert('your name is ' + value);
    },
    onClickSubmit2Button: function(view) {
        var value = this.$('input.email').val();
        alert('your email is ' + value);
    },
});
