var TodoElementView = Backbone.View.extend({
    tagName: 'li',
    initialize: function(data){
        if(!data || !data.model){
            throw new Error('no model passed');
        }
        this.model = data.model;
        this.model.on('change', this.render, this);
    },
    events: {
        'click input[type=checkbox]:first': 'onToggle'
    },

    onToggle: function(){
        this.model.toggleCompletion();
    },

   render: function(){
       //DRUGI ARGUMENT SPRAWIA ZE TOGGLE USTAWIA ZGODNIE Z WARTOSCIA BOOLA
       this.$el.toggleClass('complete', this.model.get('isComplete'));

       //ESCAPE ZAMIAST GET SPRAWIA ZE HTML NIE BEDZIE WYKONYWAY
       //UNIKA CROSS SIDE SCRIPTINGU
       this.$el.html('<input type="checkbox" '+(this.model.get("isComplete") ? 'checked' : '')+ '> '+ this.model.escape('description'));

       return this;
   }
});