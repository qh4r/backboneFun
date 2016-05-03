var Person = Backbone.Model.extend({
    defaults: {
        height: 150
    },
    initialize: function(){
        console.log("Instancja stworzona")
    },
    validate: function(attributes){
        if(!attributes.name){
            return "Imie wymagene";
        }
        if(isNaN(attributes.age) || attributes.age < 1 ){
            return "Wiek musi być liczbą nieujemną"
        }
    }
});

var person1 = new Person();

person1.set('name', 'Rafał');

person1.set({
    age: 23,
    height: 170
});

var person2 = new Person({
    name: "krzyś",
    age: 7
});

console.log(person1.toJSON(), !person1.isValid() ? person1.validationError : "" , '\n', person2.toJSON(), !person2.isValid() ? person2.validationError : "");

console.log('name', person1.get("name"));

//Usuwa wlasciwosc
person1.unset("height");

console.log(person1.toJSON())

//sprawdza czy istnieje
console.log('has name ', person1.has('name'));

//USUWA WSZYSTKIE ATRYBUTY
person1.clear()

console.log(person1.toJSON());

console.log('has name ', person1.has('name'));

var person3 = new Person({
    age: 4
});

var person4 = new Person({
    name: "Marysia",
    age: 0
});

console.log(person3.toJSON(), !person3.isValid() ? person3.validationError : "" , '\n', person4.toJSON(), !person4.isValid() ? person4.validationError : "");

var person5 = new Person();
//validationError wypisuje ostatni komunikat błędu
//Przerywa po 1 bledzie
console.log("wypisuje ostatni komunikat błędu ",person5.toJSON(), !person5.isValid() ? person3.validationError : "");

person3.set("name", "Jnusz");

//NIESTETY stary komunikat erroru wciaz pozostaje dlatego zawsze trzeba sprawdzac isValid
console.log(person3.toJSON(), !person3.isValid() ? person3.validationError : "" , '\n', person4.toJSON(), !person4.isValid() ? person4.validationError : "");



//NEXT
var Vehicle = Backbone.Model.extend({
    urlRoot: "/api/vehicles",
    //FUNKCJE
    //fetch()
    //save()
    //destroy()
    start: function(){
        console.log("startuje silnik");
    },
    shoot: function(){
        console.log("odpalam rakiete!")
    }
});

var Car = Vehicle.extend({
    shoot: function(){
        //sposob na odwolanie do base
        //Vehicle.prototype.shoot.call(this);
        console.log('ogupłeś?')
    }
});

var car1 = new Car();

//Przyklad:
//car1.fetch({
//    success: function(){
//
//    },
//    error: function(err){
//        console.log('error ', err);
//    }
//});
//Save inaczej
//car1.fetch({..OBIEKT.. },{
//    success: function(){
//
//    },
//    error: function(err){
//        console.log('error ', err);
//    }
//});

car1.start();
//PRzesłania
car1.shoot();