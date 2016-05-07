var TestView = Backbone.View.extend({
    tagName: 'span',
    id: 'test-elem',
    className: 'test-class',
    attributes: {
        "data-test": 1,
        contenteditable: true
    },
    render: function () {
        this.$el.html("Hello test");

        return this;
    }
});

var OtherView = Backbone.View.extend({
    render: function () {
        this.$el.html("Hello Other");

        return this;
    }
});

function addTestElement(type) {
    var view = new type();
    // var view = new type({el: "#content"});
    console.log('prerender -> ', view);
    view.render();
    console.log('rendered -> ', view);
    //MOZNA TEZ SKROCONE
    //view.render().$el;

    $("#content").html(view.$el);
}

// window.addTestElement = addTestElement;

addTestElement(TestView);

var view2 = new TestView();
view2.render();

//DA SIE DODAC PRZY POMOCY JQUERY
$("#second-content").html(view2.$el);

var view3 = new OtherView();
view3.render();
console.log(view3.$el);
//BEZ JQUERY NIE DZIALA
document.getElementById("third-content").innerHTML = view3.$el;


var Movie = Backbone.Model.extend();
var MovieView = Backbone.View.extend({
    tagName: 'div',
    single: function(movie){
        this.$el.html(this.model.get('title'));
    },
    render: function () {
        this.single();
        return this;
    }
});
var Movies = Backbone.Collection.extend({
    model: Movie
});
//ROZSZERZA MOVIE I DZIEDZICZY SINGLE
var MoviesView = MovieView.extend({
    tagName: function(){
        return (this.model && this.model.length) ? "ul" : "li";
    },
    many: function(){
        //mozna tez uzyc metody each
        this.model.forEach(function (elem) {
            var movie = new MoviesView({
                model: elem
            });
            // console.log('movie > ',movie);
            this.$el.append(movie.render().$el);
        }.bind(this));
    },
    render: function () {
        if(!this.model){
            return this;
        }
        if(this.model.length){
            this.many();
        }else {
            this.single();
        }

        return this;
    }
});

var movie1 = new Movie({title: "Szczeki"});
var movieView1 = new MovieView({model: movie1});


$('#movie-content').html(movieView1.render().$el);

var movies = new Movies([
    movie1,
    new Movie({title: "Szarknado"}),
        new Movie({title: "Sharktopus"}),
        new Movie({title: "Mechashark"})
]);

var moviesList = new MoviesView({
    model: movies
});

$('#movies-list-content').html(moviesList.render().$el);


