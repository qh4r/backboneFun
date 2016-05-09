var test = {
    name: 'nie backbone',

    alert: function () {
        this.trigger("isGivingSignal", {
            data: 23,
        });
    }
};

_.extend(test, Backbone.Events);


function otrzymano(e) {
    console.log('otrzymano sygnał', e);
}

function potwierdam() {
    console.log('naprawde otrzymano');
}

test.on('isGivingSignal', otrzymano);
test.on('isGivingSignal', potwierdam);


function unsubType() {
    test.off('isGivingSignal');
}

function unsubOne() {
    test.off('isGivingSignal', potwierdam);
}

function unsubAll() {
    //OFF BEZ ARGUMENTOW USUWA WSZYSTKIE EVENTY Z OBIEKTU
    test.off();
}

var Item = Backbone.Model.extend();

var Items = Backbone.Collection.extend({
    model: Item
});

var ItemView = Backbone.View.extend({
    tegName: 'li',
    events: {
        'click': 'onClick',
    },
    initialize: function (input) {
        this.eventsBus = input.eventsBus;
    },
    onClick: function () {
        if (this.eventsBus && this.eventsBus.trigger) {
            this.eventsBus.trigger('itemSelected', this.model);
        }
    },
    render: function () {
        this.$el.html(this.model.get('name'));
        return this;
    }
});

var ItemsView = Backbone.View.extend({
    tagName: 'ul',
    id: 'list',
    initialize: function (input) {
        this.eventsBus = input.eventsBus;
    },
    render: function () {
        if (this.model && this.model.length) {
            this.model.forEach(function (element) {
                var view = new ItemView({model: element, eventsBus: this.eventsBus});
                this.$el.append(view.render().$el);
            }.bind(this))
        }
        return this;
    }
});

var ContentView = Backbone.View.extend({
    el: '#content-container',
    initialize: function (input) {
        this.eventsBus = input.eventsBus;

        if (this.eventsBus && this.eventsBus.on) {
            this.eventsBus.on('itemSelected', function(args){
                this.model = args;
                this.render();
            }.bind(this));
        }
    },
    render: function () {
        if (this.model) {
            this.$('#display-name').html(this.model.get('name'));
        }
        return this;
    }
});

var eventsBus = _.extend({}, Backbone.Events);

var items = new Items([
    new Item({name: "Testowy obiekt"}),
    new Item({name: "Próbny przedmiot"}),
    new Item({name: "Prototypowa instancja"})
]);

var itemsView = new ItemsView({model: items, eventsBus: eventsBus});
console.log(items)
$('.items').html(itemsView.render().$el);

//var content = new ContentView({model: new Item({name: 'test'})});
var content = new ContentView({eventsBus: eventsBus});
content.render();