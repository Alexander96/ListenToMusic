var Playlist = require('mongoose').model('Playlist');
module.exports = {
    getAllPlaylists : function(req, res, next){
        Playlist.find({}).exec( function ( err, collection ) {
            if ( err ) {
                console.log( 'Playlists could not be found: ' + err );
                return;
            }
            res.send( collection );
        });
    },
     getPlaylistById: function(req, res, next){
         Playlist.findOne({_id: req.params.id}).exec(function(err, playlist){
             if(err){
                 console.log('Playlist could not be loaded:' + err);
                 return;
             }
             else{
                 res.send(playlist);
             }
         });
     },
     getPlaylistsByUsername: function(req, res, next){
         console.log('username' + req.params.username);
         Playlist.find({username: req.params.username}).exec(function(err, playlist){
             if(err){
                 console.log('Playlists could not be loaded:' + err);
                 return;
             }
             else{
                 res.send(playlist);
             }
         });
     },
     createPlaylist: function(req, res, next){
        var playlist = req.body;
        Playlist.create(playlist, function(err, play){
            if(err){
                console.log('Feil to create the new playlist: ' + err);
                return;
            }
            console.log('New playlist created!');
            res.send({success: true});
        });
    },
}