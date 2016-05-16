var TodoElement = Backbone.Model.extend({
    validate: function(input){
        if(!input || !input.description){
            throw new Error('no decription passed');
        }
    }
});