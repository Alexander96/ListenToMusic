var controllers = require('../controllers');
    auth = require('./auth.js');

var User = require('mongoose').model('User');
module.exports = function (app) {
    app.get('/api/users', auth.isInRole('admin'),controllers.users.getAllUsers );
    app.post('/api/users', controllers.users.createUser);
    app.put('/api/users',auth.isAuthenticated, controllers.users.updateUser);
    app.get('/partials/:partialArea/:partialName', function (req, res) {
        res.render('../../public/app/' + req.params.partialArea + '/' + req.params.partialName, {
               beautify: true,
        });
    });
    app.get('/api/playlists', controllers.playlists.getAllPlaylists);
    app.post('/api/playlists', controllers.playlists.createPlaylist);
    app.put('/api/playlists', auth.isAuthenticated, controllers.playlists.updatePlaylist);
    app.get('/api/playlists/:id', controllers.playlists.getPlaylistById);
    app.get('/api/your-playlists/:username', controllers.playlists.getPlaylistsByUsername);
    app.post('/login',auth.login);
    app.post('/logout', auth.logout);
    app.get('/api/*', function(req,res){
        res.status(404);
        res.end();
    });
    app.get('*', function (req, res) {
        res.render('index', {currentUser: req.user});
    });
};