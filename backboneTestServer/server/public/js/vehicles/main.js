define(['./vehiclesCollection', './vehiclesView', './vehicleModel'], function (Vehicles, VehiclesView, Vehicle) {

//ARGUMENTY DO GETA PRZEKAZUJEMY TAK
//vss = new Vehicles()
//vss.fetch({data: {page: 2}})

    var eventPipe = _.extend({}, Backbone.Events);

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
                model: list,
                eventPipe: eventPipe
            });
            console.log(view);
            $('.content-table').html(view.render().$el);
        },
        error: function (err) {
            console.log('ERR ', err);
        }
    });

});