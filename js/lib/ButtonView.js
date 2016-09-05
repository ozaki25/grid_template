var _ = require('underscore');
var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');

var ButtonView = Backbone.Marionette.ItemView.extend({
    tagName: 'button',
    attributes: function() {
        return {
            class: this.options.classNames || 'btn btn-default'
        }
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
