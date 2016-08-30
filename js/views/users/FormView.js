var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
Backbone.Validation = require('backbone.validation');
var User = require('../../models/User');

module.exports = Backbone.Marionette.ItemView.extend({
    className: 'panel panel-default',
    template: '#user_form_view',
    ui: {
        inputName: 'input.name',
        inputAge: 'input.age',
        inputDept: 'input.dept',
        inputs: 'input',
        createBtn: '.create-btn'
    },
    events: {
        'click @ui.createBtn': 'onClickCreate'
    },
    onClickCreate: function() {
        this.model = new User();
        this.bindBackboneValidation();
        this.model.set({
            name: this.ui.inputName.val().trim(),
            age: this.ui.inputAge.val().trim(),
            dept: this.ui.inputDept.val().trim(),
        });
        var options = {
            wait: true,
            success: () => this.ui.inputs.val('')
        }
        this.collection.create(this.model, options);
    },
    bindBackboneValidation: function() {
        Backbone.Validation.bind(this, {
            valid: function(view, attr) {
                var control = view.$('[name=' + attr + ']');
                var group = control.closest('.form-group');
                group.removeClass('has-error').find('.help-inline').empty();
            },
            invalid: function(view, attr, error) {
                var control = view.$('[name=' + attr + ']');
                var group = control.closest('.form-group');
                group.addClass('has-error').find('.help-inline').text(error);
            }
        });
    }
});

