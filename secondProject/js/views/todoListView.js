var TodoListView = Backbone.View.extend({
    tagName: 'ul',
    id: 'toDoList',
    initialize: function(data){
      if(!data || !data.model){
          throw new Error('no list items passed');
      }
        this.model.on('add', this.onElementAdded, this);
        this.model.on('remove', this.onRemove, this);
        this.eventBus = _.extend({}, Backbone.Events);
        //BARDZO BRZYDKIE
        this.addClicked = (function(){
            var descInput;
            this.eventBus.on('rendered', function(){
                descInput = this.$('#descInput');
            }, this);
            return function(){
                if(descInput.val()) {
                    var item = new TodoElement({description: descInput.val()});
                    descInput.val('');
                    this.model.add(item);
                }
            }
        }.bind(this))();
    },
    onElementAdded: function(elem){
        var view = new TodoElementView({model: elem});
        this.$el.append(view.render().$el);
    },
    onKeyPressed: function(key){
      if(key.keyCode === 13){
          this.addClicked();
      }
    },
    onRemove: function(elem){
      this.$('#'+elem.get('itemId')).remove();
    },
    events: {
        'click #add': 'addClicked',
        'keypress #descInput': 'onKeyPressed'
    },
    render: function(){

        this.$el.append('<input type="text" autofocus id="descInput">');
        this.$el.append('<button id="add">Add</button>');

        this.model.forEach(function(element){
            var view = new TodoElementView({model: element});
            this.$el.append(view.render().$el);
        }.bind(this));

        this.eventBus.trigger('rendered');
        return this;
    }
});