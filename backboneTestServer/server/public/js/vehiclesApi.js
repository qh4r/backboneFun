//NEXT
var Vehicle = Backbone.Model.extend({
    urlRoot: function () {
        var base = '/api/vehicles/';
        //if (this.isNew()) return base;
        //return base + this.id;
        return base;
    },
    //BRAK ID OZNACZA NOWY

    //validate: function(attributes){
    //    if(!attributes.id){
    //        return "id wymagene";
    //    }
    //},
    saveNew: function () {
        this.save({}, {
            success: function () {
                console.log('saved');
            },
            error: function (err) {
                console.log('error -> ', err);
            }
        })
    },

    getStored: function () {
        this.fetch({
            success: function () {
                console.log('saved');
            },
            error: function (err) {
                console.log('error -> ', err);
            }
        })
    },

    deleteStored: function () {
        this.destroy({
            success: function () {
                console.log('destroyed');
            },
            error: function (err) {
                console.log('error -> ', err);
            }
        })
    }
});

var Vehicles = Backbone.Collection.extend({
    model: Vehicle,
    url: 'api/vehicles/',
});

//ARGUMENTY DO GETA PRZEKAZUJEMY TAK
//vss = new Vehicles()
//vss.fetch({data: {page: 2}})

var VehicleView = Backbone.View.extend({
    tagName: 'li',
    id: function () {
        return 'vehicle-' + this.model.get('id');
    },
    events: {
        'click .delete-btn': 'deleteElement',
        'click .edit-btn': 'editElement'
    },
    isEdited: false,
    initialize: function (data) {
        if (data && data.removeCallback) {
            this.removeCallback = data.removeCallback;
        }
    },
    deleteElement: function () {
        this.removeCallback(this.model);
    },
    editElement: function () {
        //POOR MANS UPDATE W/O BINDING
        if (this.isEdited) {
            this.model.set('name', this.$('.name-column')[0].innerText);
            return this.model.save({}, {
                success: function () {
                    this.isEdited = !this.isEdited;
                    this.render();
                }.bind(this),
                error: function (err) {
                    console.log(err);
                }
            })
        }
        this.isEdited = !this.isEdited;
        this.render();
    },
    getTemplate: (function () {
        var result;
        return function getTemplate() {
            if (result) {
                var promise = new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        if (result.error) {
                            return reject(result);
                        }
                        return resolve(result);
                    }, 0);
                });
                return promise;
            }
            return fetch('/templates/vehicleTemplate.html')
                .then(function (data) {
                    if (data && data.text) {
                        return data.text();
                    }
                })
                .then(function (html) {
                    result = {
                        template: html
                    };
                    return result;
                })
                .catch(function (err) {
                    result = {
                        template: '',
                        error: err
                    }
                });
        }
    })(),
    render: function () {
        this.getTemplate().then(function (result) {
            var template = _.template(result.template);
            var model = this.model.toJSON();
            model.isEdited = this.isEdited;
            var html = template(model);
            this.$el.html(html);
        }.bind(this));
        return this;
    }
});


var VehiclesView = Backbone.View.extend({
    tagName: 'ul',
    initialize: function () {
        if (this.model && this.model.length) {
            this.model.on('add', this.addElement, this);
        }
    },
    onRemove: function (element) {
        var id = element.get('id');
        element.destroy({
            success: function () {
                //this.model.remove(element);
                console.log('vehicle-' + id);
                this.$('#vehicle-' + id).remove();
            },
            error: function (err) {
                console.log(err);
            }
        })
    },
    addElement: function (element) {
        var vehicle = new VehicleView({
            model: element,
            removeCallback: this.onRemove
        });
        this.$el.append(vehicle.render().$el);
    },
    render: function () {
        if (this.model && this.model.length) {
            this.model.forEach(function (elem) {
                this.addElement(elem);
            }.bind(this));
        }
        return this;
    }
});

var nameField = $('#name');
$('#add-vehicle-btn').on('click', function () {
    var vehicleName = nameField.val();
    var newVehicle = new Vehicle({name: vehicleName});
    newVehicle.save({}, {
        success: function () {
            list.push(newVehicle);
        },
        error: function (err) {
            console.log(err);
        }
    });
    nameField.val('');
});

var list = new Vehicles();
list.fetch({
    success: function () {
        var view = new VehiclesView({
            model: list
        });
        console.log(view);
        $('.content-table').html(view.render().$el);
    },
    error: function (err) {
        console.log('ERR ', err);
    }
});

