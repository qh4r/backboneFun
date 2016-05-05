//NEXT
var Vehicle = Backbone.Model.extend({
    urlRoot: function(){
        var base = '/api/vehicles/';
        //if (this.isNew()) return base;
        //return base + this.id;
        return base;
    },
    //BRAK ID OZNACZA NOWY

    //validate: function(attributes){
    //    if(!attributes.id){
    //        return "id wymagene";
    //    }
    //},
    saveNew: function(){
        this.save({},{
            success: function(){
                console.log('saved');
            },
            error: function(err){
                console.log('error -> ', err);
            }
        })
    },

    getStored: function(){
        this.fetch({
            success: function(){
                console.log('saved');
            },
            error: function(err){
                console.log('error -> ', err);
            }
        })
    },

    deleteStored: function(){
        this.destroy({
            success: function(){
                console.log('destroyed');
            },
            error: function(err){
                console.log('error -> ', err);
            }
        })
    }
});

window.Vehicle = Vehicle;


