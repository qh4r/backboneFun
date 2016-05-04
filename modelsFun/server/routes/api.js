var express = require('express');

var apiRouter = function (apiController){
    var router = express.Router();

    router.route('/vehicles')
        .post(apiController.addVehicle);


    router.route('/vehicles/:id')
        .get(apiController.getVehicle)
        .put(apiController.updateVehicle)
        .delete(apiController.deleteVehicle);


    return router;
};

module.exports = apiRouter;
