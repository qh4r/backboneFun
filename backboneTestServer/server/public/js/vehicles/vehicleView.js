define(['jquery', 'underscore', 'backbone', 'fetchPolyfil'], function () {
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

            //CALLBACK
            //if (data && data.removeCallback) {
            //    this.removeCallback = data.removeCallback;
            //}
            if (data.eventPipe && data.eventPipe.trigger) {
                this.eventPipe = data.eventPipe;
            }
        },
        deleteElement: function () {
            //CALLBACK
            //this.removeCallback(this.model);
            if (this.eventPipe) {
                this.eventPipe.trigger('onRemove', this.model);
            }
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

    return VehicleView;
});