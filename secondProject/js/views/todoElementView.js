var TodoElementView = Backbone.View.extend({
    tagName: 'li',
    initialize: function(data){
        if(!data || !data.model){
            throw new Error('no model passed');
        }
        this.model = data.model;
    },

   render: function(){
       //ESCAPE ZAMIAST GET SPRAWIA ZE HTML NIE BEDZIE WYKONYWAY
       //UNIKA CROSS SIDE SCRIPTINGU
       this.$el.html(this.model.escape('description'));

       return this;
   }
});