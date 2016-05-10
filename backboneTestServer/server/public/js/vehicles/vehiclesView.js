define(['./vehicleView'], function (VehicleView) {
    var VehiclesView = Backbone.View.extend({
        tagName: 'ul',
        initialize: function (data) {
            if (this.model && this.model.length) {
                this.model.on('add', this.addElement, this);
            }
            if (data.eventPipe && data.eventPipe.on) {
                this.eventPipe = data.eventPipe;
                this.eventPipe.on('onRemove', this.onRemove);
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
                //removeCallback: this.onRemove
                eventPipe: this.eventPipe
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

    return VehiclesView;
});