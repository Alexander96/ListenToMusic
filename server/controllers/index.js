var usersController = require('../controllers/UsersController.js'),
    playlistController = require('../controllers/PlaylistController.js');

module.exports = {
    users: usersController,
    playlists: playlistController
}