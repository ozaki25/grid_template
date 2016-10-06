var _ = require('underscore');
var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');

var InputView = Backbone.Marionette.ItemView.extend({
    tagName: 'input',
    attributes: function() {
        return Backbone.$.extend(this.options.attrs, {
            id: this.options._id,
            class: typeof this.options._className == 'undefined' ? 'form-control' : this.options._className,
            value: this.options.value,
            type: this.options.type || 'text',
        });
    },
    template: _.template(''),
    initialize: function(options) {
        this.changeEventName = options.changeEventName || 'change:input';
        this.keypressEventName = options.keypressEventName || 'keypress:input';
    },
    events: {
        'change': 'onChange',
        'keypress': 'onKeyPress',
    },
    onChange: function() {
        this.triggerMethod(this.changeEventName, this.$el.val());
    },
    onKeyPress: function() {
        this.triggerMethod(this.keypressEventName, this.$el.val());
    },
});

module.exports = InputView;
