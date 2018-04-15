function fetchNearestDrivers(db, coordinates, callback) {

    db.collection("drivers").createIndex({
        "location": "2dsphere"
    }, function() {
        db.collection("drivers").find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: coordinates
                    },
                    $maxDistance: 20000
                }
            }
        }).toArray(function(err, results) {
            if (err) {
                console.log(err)
            } else {
                callback(results);
            }
        });
    });
}

function fetchDriverDetails(db, userId, callback) {
    db.collection("drivers").findOne({
        userId: userId
    }, function(err, results) {
        if (err) {
            console.log(err)
        } else {
            callback(results);
        }
    });
}

function saveRequest(db, requestId, requestTime, location, userId, status, callback) {
    db.collection("requests").insert({
        "_id": requestId,
        requestTime: requestTime,
        location: location,
        userId: userId,
        status: status
    }, function(err, results) {
        if (err) {
            console.log(err);
        } else {
            callback(results);
        }
    });
}

function updateRequest(db, issueId, driverId, status, callback) {
    db.collection("requests").update({
        "_id": issueId
    }, {
        $set: {
            status: status,
            driverId: driverId
        }
    }, function(err, results) {
        if (err) {
            console.log(err);
        } else {
            callback(results)
        }
    });
}

function fetchRequests(db, callback) {
    var collection = db.collection("requests");
    //Using stream to process lots of records
    var stream = collection.find({}, {
        requestTime: 1,
        status: 1,
        location: 1,
        _id: 0
    }).stream();

    var requests = [];

    stream.on("data", function(request) {
        requests.push(request);
    });

    stream.on('end', function() {
        callback(requests);
    });
}

exports.fetchNearestDrivers = fetchNearestDrivers;
exports.fetchDriverDetails = fetchDriverDetails;
exports.saveRequest = saveRequest;
exports.updateRequest = updateRequest;
exports.fetchRequests = fetchRequests;