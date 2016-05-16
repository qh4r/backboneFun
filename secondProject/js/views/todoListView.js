var TodoListView = Backbone.View.extend({
    tagName: 'ul',
    id: 'toDoList',
    initialize: function(data){
      if(!data || !data.model){
          throw new Error('no list items passed');
      }
    },
    render: function(){
        this.model.forEach(function(element){
            var view = new TodoElementView({model: element});
            this.$el.append(view.render().$el);
        }.bind(this));

        return this;
    }
});