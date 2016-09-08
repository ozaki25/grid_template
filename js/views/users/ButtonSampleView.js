var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
var ButtonView = require('../../lib/ButtonView');

module.exports = Backbone.Marionette.LayoutView.extend({
    className: 'col-md-1',
    template: '#button_sample_view',
    regions: {
        button1Region: '#button_1_region',
        button2Region: '#button_2_region',
    },
    childEvents: {
        'click:button': 'onClickButton',
        'click:edit': 'onClickEditButton',
    },
    onBeforeShow: function() {
        this.renderButton();
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
    onClickButton: function(view) {
        alert('click button!');
    },
    onClickEditButton: function(view) {
        alert('click edit button!');
        console.log('edit : ' + JSON.stringify(view.model.attributes));
    },
});
