define(['./vehicleModel'], function (Vehicle) {
    var Vehicles = Backbone.Collection.extend({
        model: Vehicle,
        url: 'api/vehicles/',
    });

    return Vehicles;
});