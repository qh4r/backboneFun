var TodoElementView = Backbone.View.extend({
    tagName: 'li',
    id: function(){
        return this.model.get('itemId');
    },
    initialize: function(data){
        if(!data || !data.model){
            throw new Error('no model passed');
        }
        this.model = data.model;
        this.model.on('change', this.render, this);
    },
    events: {
        'click input[type=checkbox]:first': 'onToggle',
        'click button': 'onDelete'
    },

    onToggle: function(){
        this.model.toggleCompletion();
    },
    onDelete: function(){
      this.model.destroy();
    },

   render: function(){
       //DRUGI ARGUMENT SPRAWIA ZE TOGGLE USTAWIA ZGODNIE Z WARTOSCIA BOOLA
       this.$el.toggleClass('complete', this.model.get('isComplete'));

       //ESCAPE ZAMIAST GET SPRAWIA ZE HTML NIE BEDZIE WYKONYWAY
       //UNIKA CROSS SIDE SCRIPTINGU
       var template = $('#todoElementTemplate').html();
       var html = Mustache.render(template, this.model.toJSON());
       this.$el.append(html);

       return this;
   }
});