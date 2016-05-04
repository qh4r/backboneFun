var apiController = function(Vehicle){

    var getVehicle = function(req, res){
        console.log('bd -> ', req.body);
        console.log('params -> ', req.params);
        console.log('query -> ', req.query);
        console.log('url -> ', req.url);

        return Vehicle.findOne(req.params, function(err, result){
            if(err){
                console.log('errr, ',err);
                return res.status(500).json({error: err});
            }

            return res.status(200).json(result);
        });
    };

    var updateVehicle = function(req, res){
        console.log('bd -> ', req.body);
        console.log('params -> ', req.params);
        console.log('query -> ', req.query);
        console.log('url -> ', req.url);

        return Vehicle.findOne(req.params, function(err, result){
            if(err){
                console.log('errr, ',err);
                return res.status(500).json({error: err});
            }

            if(!result){
                return res.status(500).json({error: 'no instance'});
            }

            Object.keys(req.body).forEach(function(key){
                result[key] = req.body[key];
            });

            result.save(function(err, result){
                if(err){
                    console.log('errr, ',err);
                    return res.status(500).json({error: err});
                }

                return res.status(201).json(result);
            });
        });
    };

    var addVehicle = function(req, res){
        console.log('bd -> ', req.body);
        console.log('params -> ', req.params);
        console.log('query -> ', req.query);
        console.log('url -> ', req.url);

        var newVehicle = new Vehicle(req.body);

        return newVehicle.save(function(err, result){
            if(err){
                console.log('errr, ',err);
                return res.status(500).json({error: err});
            }

            return res.status(201).json(result);
        });
    };

    var deleteVehicle = function(req, res){
        console.log('bd -> ', req.body);
        console.log('params -> ', req.params);
        console.log('query -> ', req.query);
        console.log('url -> ', req.url);

        return Vehicle.findOne(req.params, function(err, result) {
            if (err) {
                console.log('errr, ', err);
                return res.status(500).json({error: err});
            }

            if(!result){
                return res.status(500).json({error: 'no instance'});
            }

            return result.remove(function (err) {
                if (err) {
                    console.log('errr, ', err);
                    return res.status(500).json({error: err});
                }

                return res.status(204).json({message: 'deleted'});
            });
        });
    };

    return {
        getVehicle: getVehicle,
        updateVehicle: updateVehicle,
        addVehicle: addVehicle,
        deleteVehicle: deleteVehicle
    };
};

module.exports = apiController;