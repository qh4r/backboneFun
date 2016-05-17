var TodoElement = Backbone.Model.extend({
    defaults: {
        isComplete: false
    },
    initialize: (function(){
        var nextId = 1;
       return function(){
           this.set('itemId', 'item'+nextId++);
       };
    })(),
    validate: function(input){
        if(!input || !input.description){
            throw new Error('no decription passed');
        }
    },
    toggleCompletion: function(){
        this.set('isComplete', !this.get('isComplete'));
    }
});