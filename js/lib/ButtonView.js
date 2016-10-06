var _ = require('underscore');
var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');

var ButtonView = Backbone.Marionette.ItemView.extend({
    tagName: 'button',
    attributes: function() {
        return Backbone.$.extend(this.options.attrs, {
            id: this.options._id,
            class: typeof this.options._className === 'undefined' ? 'btn btn-default' : this.options._className,
        });
    },
    template: _.template('<%= label %>'),
    templateHelpers: function() {
        return {
            label: this.label
        }
    },
    initialize: function(options) {
        this.label = options.label;
        this.clickEventName = options.clickEventName || 'click:button';
    },
    events: {
        'click': 'onClick'
    },
    onClick: function(e) {
        e.preventDefault();
        this.triggerMethod(this.clickEventName);
    }
});

module.exports = ButtonView;
