var Users = require('../models/users.model.js');

exports.create = function(req, res) {
    // Create and Save a new user

};

exports.findAll = function(req, res) {
    // Retrieve and return all user from the database.

};

exports.findOne = function(req, res) {
    // Find a single note with a userId

};

exports.update = function(req, res) {
    // Update a note identified by the userId in the request

};

exports.delete = function(req, res) {
    // Delete a note with the specified userId in the request

};

exports.create = function(req, res) {
    // Create and Save a new user
    if(!req.body.content) {
        return res.status(400).send({message: "Note can not be empty"});
    }

    var users = new Users({title: req.body.title || "Unnamed User", content: req.body.content});

    users.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the User."});
        } else {
            res.send(data);
        }
    });
};

exports.findAll = function(req, res) {
    // Retrieve and return all notes from the database.
    Users.find(function(err, users){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving users."});
        } else {
            res.send(users);
        }
    });
};

exports.findOne = function(req, res) {
    // Find a single note with a noteId
    Users.findById(req.params.userId, function(err, Users) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "User not found with id " + req.params.userId});
            }
            return res.status(500).send({message: "Error retrieving user with id " + req.params.userId});
        }

        if(!users) {
            return res.status(404).send({message: "User not found with id " + req.params.userId});
        }

        res.send(users);
    });
};


exports.update = function(req, res) {
    // Update a note identified by the noteId in the request
    Users.findById(req.params.userId, function(err, users) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "User not found with id " + req.params.userId});
            }
            return res.status(500).send({message: "Error finding user with id " + req.params.userId});
        }

        if(!users) {
            return res.status(404).send({message: "User not found with id " + req.params.userId});
        }

        users.name = req.body.name;
        users.content = req.body.content;

        users.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update user with id " + req.params.userId});
            } else {
                res.send(data);
            }
        });
    });
};

exports.delete = function(req, res) {
    // Delete a note with the specified noteId in the request
    Users.findByIdAndRemove(req.params.userId, function(err, users) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "User not found with id " + req.params.userId});
            }
            return res.status(500).send({message: "Could not delete user with id " + req.params.userId});
        }

        if(!users) {
            return res.status(404).send({message: "User not found with id " + req.params.userId});
        }

        res.send({message: "User deleted successfully!"})
    });
};
