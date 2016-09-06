var _ = require('underscore');
var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');

var SelectboxOptionView = Backbone.Marionette.ItemView.extend({
    tagName: 'option',
    attributes: function() {
        return Backbone.$.extend(this.options.attrs, {
            value: this.model.get(this.options.value),
            'data-model-id': this.model.id,
        });
    },
    template: _.template('<%= label %>'),
    templateHelpers: function() {
        return {
            label: this.model.get(this.label),
        }
    },
    initialize: function(options) {
        this.label = options.label;
    },
});



var SelectboxView = Backbone.Marionette.CollectionView.extend({
    tagName: 'select',
    attributes: function() {
        return Backbone.$.extend(this.options.attrs, {
            id: this.options._id,
            class: this.options._className || 'form-control',
        });
    },
    childView: SelectboxOptionView,
    childViewOptions: function() {
        return {
            label: this.label,
            value: this.value,
            attrs: this.optionAttrs,
        }
    },
    initialize: function(options) {
        this.label = options.label;
        this.value = options.value;
        this.optionAttrs = options.optionAttrs;
        this.changeEventName = options.changeEventName || 'change:selectbox';
    },
    events: {
        'change': 'onChange'
    },
    onChange: function() {
        var id = this.$('option:selected').attr('data-model-id');
        var value = this.$el.val();
        var model = this.collection.findWhere({ id: id }) || this.collection.findWhere({ id: parseInt(id) });
        this.triggerMethod(this.changeEventName, value, model);
    }
});

module.exports = SelectboxView;
