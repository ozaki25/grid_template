jQuery = require('jquery');
require('bootstrap');
var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
var Users = require('./collections/Users');
var HeaderView = require('./views/HeaderView');
var MainView = require('./views/users/MainView');

var appRouter = Backbone.Marionette.AppRouter.extend({
    appRoutes: {
        "": "users",
        "users": "users"
    },
    initialize: function() {
        app.getRegion('header').show(new HeaderView());
    },
    controller: {
        users: function() {
            var users = new Users();
            users.fetch();
            var mainView = new MainView({ collection: users });
            app.getRegion('main').show(mainView);
        }
    }
});

var app = new Backbone.Marionette.Application({
    regions: {
        header: '#header',
        main: '#main'
    },
    onStart: function() {
        new appRouter();
        Backbone.history.start();
    }
});

app.start();
