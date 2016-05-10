var SongsView = Backbone.View.extend({
    render: function () {
        this.$el.html('SONGS VIEW');
        return this
    }
});

var SingleSongView = Backbone.View.extend({
    initialize: function(data){
      this.songId = data.songId;
    },
    render: function () {
        this.$el.html('SINGLE SONG VIEW -> '+ this.songId);
        return this
    }
});

var MoviesView = Backbone.View.extend({
    render: function () {
        this.$el.html('MOVIES VIEW');
        return this
    }
});

var BooksView = Backbone.View.extend({
    render: function () {
        this.$el.html('BOOKS VIEW');
        return this
    }
});


var ApplicationRouter = Backbone.Router.extend({
    routes: {
        "songs": "songsView",
        "songs/:songId": "singleSongView",
        "movies": "moviesView",
        "books": "booksView",
        "*other": "defaultView"
    },

    songsView: function(){
        var view = new SongsView({el: "#content-container"});
        view.render();
    },

    singleSongView: function(songId){
        var view = new SingleSongView({songId: songId, el: "#content-container"});
        view.render();
    },

    moviesView: function(){
        var view = new MoviesView({el: "#content-container"});
        view.render();
    },

    booksView: function(){
        var view = new BooksView({el: "#content-container"});
        view.render();
    }
});

var router = new ApplicationRouter();
Backbone.history.start();

var NavigationView = Backbone.View.extend({
    el: '.items',
    events: {
        'click': 'onClick'
    },

    onClick: function(e){
        var $li = $(e.target);
        //BEZ TRIGGER TRUE USTAWIANY JEST HASH ADRES
        //ALE NIE JEST ZMIENIANY CONTENT STRONY
        router.navigate($li.attr('data-url'), {trigger: true});
    }
});

var navigation = new NavigationView();