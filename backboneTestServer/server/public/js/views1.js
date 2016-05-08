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
    events: {
        //selector odnosi sie tylko do elementow wewnatrz
        'click .sub-item': 'onClickSubItem',
        click: "onClick"
    },
    initialize: function(){
      console.log('init ', arguments[0]);

        if(!this.model.length) {
            //3 argument(this) sprawia ze call bedzie wykonywany na tym (this) w czasie wykonania
            this.model.on('change', this.render, this);
        } else {
            this.model.on('add', this.elementAdded, this);
            this.model.on('remove', this.elementRemoved, this);
        }

        if(arguments[0] && arguments[0]['even']){
            // this.el.className += " even"
            this.$el.addClass('even');
        }
       // Array.prototype.slice.call(arguments).forEach(function(elem, lp){
       //     console.log(lp," -> ", elem, ' = ', arguments[elem]);
       // })
    },
    elementAdded: function(elem){
        console.log('eszlo', elem);
        var movie = new MoviesView({model: elem, even: (this.model.length%2)});
        console.log('newww >', movie);
        this.$el.append(movie.render().$el);
    },
    elementRemoved: function(elem){
        //GENERALNIE 100x LEPIEJ BYło BY DODAC COS PO CZYM MOZNA IDENTYFIKOWAC
        //ELEMENTY ALE TU POGLADOWO
        console.log('removed ', elem);

        //this.$() to skrot od this.$el.find()
        // this.$el.find('li').each(function(lp){
        this.$('li').each(function(lp){
            if(this.innerHTML.includes(elem.get('title'))){
                $(this).remove();
            }
        })
    },
    onClick: function(){
        console.log(this.model.get('title').toUpperCase());
    },
    onClickSubItem: function(e){
        e.stopPropagation();
        console.log(this.model.get('title').toLowerCase());
    },
    single: function(movie){
        this.$el.html(this.model.get('title') + ' <span>'+this.model.get('runningTime')+'</span>');
        // this.$el.html(this.model.get('title')+'<p class="sub-item">test</p>');
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
    events: function(){
        return (this.model && this.model.length)
            ? {}
            : {
            'click .sub-item': 'onClickSubItem',
            click: "onClick"
        };
    },
    tagName: function(){
        return (this.model && this.model.length) ? "ul" : "li";
    },
    many: function(){
        //mozna tez uzyc metody each
        this.model.forEach(function (elem, lp) {
            var movie = new MoviesView({
                model: elem,
                even: !(lp%2)
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

var movie1 = new Movie({title: "Szczeki", runningTime: 113});
var movieView1 = new MovieView({model: movie1});


$('#movie-content').html(movieView1.render().$el);

var movies = new Movies([
    movie1,
    new Movie({title: "Szarknado", runningTime: 121}),
        new Movie({title: "Sharktopus", runningTime: 87}),
        new Movie({title: "Mechashark", runningTime: 93})
]);

var moviesList = new MoviesView({
    model: movies
});

$('#movies-list-content').html(moviesList.render().$el);

//ZMIANY
// movies.at(3).set('runningTime', 244)


