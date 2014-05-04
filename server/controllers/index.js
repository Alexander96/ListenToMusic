var usersController = require('../controllers/UsersController.js'),
    coursesController = require('../controllers/coursesController.js'),
    playlistController = require('../controllers/PlaylistController.js');

module.exports = {
    users: usersController,
    courses: coursesController,
    playlists: playlistController
}