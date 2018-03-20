module.exports = function(app) {

    var Users = require('../controllers/users.controller.js');

    // Create a new Note
    app.post('/users', Users.create);

    // Retrieve all Notes
    app.get('/users', Users.findAll);

    // Retrieve a single Note with noteId
    app.get('/users/:userId', Users.findOne);

    // Update a Note with noteId
    app.put('/users/:userId', Users.update);

    // Delete a Note with noteId
    app.delete('/users/:userId', Users.delete);
}
