var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
var SelectboxView = require('../../lib/SelectboxView');

module.exports = Backbone.Marionette.LayoutView.extend({
    className: 'col-md-2',
    template: '#selectbox_sample_view',
    regions: {
        selectbox1Region: '#selectbox_1_region',
        selectbox2Region: '#selectbox_2_region',
    },
    childEvents: {
        'change:selectbox': 'onChangeSelectbox',
        'change:username' : 'onChangeSelectUser',
    },
    onBeforeShow: function() {
        this.renderSelectbox();
    },
    renderSelectbox: function() {
        var selectbox1View = new SelectboxView({ collection: this.collection, label: 'name', value: 'id', blank: true });
        var selectbox2View = new SelectboxView({
            collection: this.collection,
            label: 'name',
            value: 'id',
            changeEventName: 'change:username',
            _id: 'select_user',
            _className: 'form-control select-user',
            attrs: { name: 'selectUser', 'data-target': '#button' },
            optionAttrs: { class: 'select-option' },
            selected: this.collection.length == 0 ? '' : this.collection.at(this.collection.length -1).id,
            blank: true,
            blankLabel: '未選択',
            blankValue: 'blank',
        });
        this.getRegion('selectbox1Region').show(selectbox1View);
        this.getRegion('selectbox2Region').show(selectbox2View);

    },
    onChangeSelectbox: function(view, value, model) {
        console.log(value);
        console.log(JSON.stringify(model.attributes));
    },
    onChangeSelectUser: function(view, value, model) {
        console.log(value);
        console.log(JSON.stringify(model.attributes));
    },
});
