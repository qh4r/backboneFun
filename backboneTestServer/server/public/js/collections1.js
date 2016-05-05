var Movie = Backbone.Model.extend();

var Movies = Backbone.Collection.extend({
    model: Movie,
    //dziala tylko na get - cala kolekcja
    url: 'api/movies',

    //Dodatkowe argumenty w zapytaniu:
    data: {
        page: 3
        //da ?page=3
    }
});

var movies = new Movies([
    new Movie({title: 'Szczeki'}),
    new Movie({title: 'Dzieci Kukurydzy'}),
    new Movie({title: 'Koszmar z ulicy Wiązów'}),
    new Movie({title: 'Hellraiser'})
]);

movies.add(new Movie({title: 'Piątek Trzynastego'}));

//obiekt z at w 2 argumencie okresla index gdzie zostanie dodane
movies.add(new Movie({title: 'Halloween'}), {at: 0});
//push i pop tez dzialaja


//movies.get("c1") --c1 to cid przyznawane dla kazdego obiektu
var szczeki = movies.where({title: 'Szczeki'});// -- zwraca szczeki
console.log('szczeki ', szczeki);
// WHERE ZWRACA TABLICE
//ZWRACA TO CO SPELNIA FUNKCJE
var where = movies.where(function(elem){return elem.has('title') && elem.get('title').length > 16});
console.log('where ', where);
//JAK WHERE ALE ZWRACA PIERWSZA INSTANCJE
var whereFind = movies.findWhere(function(elem){return elem.has('title') && elem.get('title').length > 16});
console.log('findWhere ', whereFind);

//filter działa jak where

var hellraiser = movies.filter({title: 'Hellraiser'})
console.log('hellraiser ', hellraiser);

var filter = movies.filter(function(elem){return elem.has('title') && elem.get('title').length < 16});
console.log('filter ', filter);
//Sa jeszcze metody all, any

console.log('each:');
movies.each(function(movie){
    console.log(movie.toJSON());
});

//Remove przyjmuje model
// At zwraca element o podanym indexie
//movies.remove(movies.at(0))
