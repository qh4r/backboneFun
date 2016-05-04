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
/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

module.exports = apiRouter;
