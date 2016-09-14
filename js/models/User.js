var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
    defaults: {
        team: {
            name: '研究開発',
            job: {
                main: 'javascriptFW開発',
                sub: '社内システム開発',
            }
        }
    },
    validation: {
        name: {
            required: true,
            msg: '必須項目です。'
        },
        age: [{
            required: true,
            msg: '必須項目です。'
        }, {
            range: [0, 100],
            msg: '0〜100を入力して下さい。'
        }],
        dept: {

        }
    }
});
