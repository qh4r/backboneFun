var TodoElement = Backbone.Model.extend({
    defaults: {
        isComplete: false
    },
    validate: function(input){
        if(!input || !input.description){
            throw new Error('no decription passed');
        }
    },
    toggleCompletion: function(){
        this.set('isComplete', !this.get('isComplete'));
    }
});