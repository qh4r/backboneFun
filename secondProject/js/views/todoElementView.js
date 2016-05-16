var TodoElementView = Backbone.View.extend({
    tagName: 'li',
    initialize: function(data){
        if(!data || !data.model){
            throw new Error('no model passed');
        }
        this.model = data.model;
    },

   render: function(){
       this.$el.html(this.model.get('description'));

       return this;
   }
});