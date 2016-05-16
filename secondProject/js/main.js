$(function(){
   var item = new TodoElement({
       description: "testowy opis"
   });

    var list = new TodoList([
        item,
        new TodoElement({
            description: "drugi testowy opis"
        }),
        new TodoElement({
            description: "trzeci testowy opis"
        })
    ]);

    var view = new TodoListView({
        model: list
    });

    $('body').prepend(view.render().$el);
});