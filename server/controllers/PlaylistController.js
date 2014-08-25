var Playlist = require('mongoose').model('Playlist');
var fs = require("fs");
var id='';
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
                console.log('Fail to create the new playlist: ' + err);
                return;
            }
            id=play._id;
            console.log('New playlist created!');
            res.send({success: true});
        });
    },
    updatePlaylist: function(req, res, next){
        var updatedPlaylist = req.body;
        Playlist.update({_id: req.body._id}, updatedPlaylist, function(err){
            if(err){
                console.log('Failed to update playlist' + err);
                return
            }
            console.log('Plalist updated!');
            res.end();
        });
    },
    uploadImg: function(req, res, next){
        var msg = '';
        var img = '';
        console.log(req.files);
        if(req.files.image.type != 'image/png' && req.files.image.type != 'image/jpeg' && req.files.image.type != 'image/gif')
        {
            msg = 'Invalid format, accepts only: jpg, png and gif.<br/>';
            res.status(400);
            return;
        }

        if(msg == '')
        {
            if(diff > 0)
            {
                name = name.substring(name.length-diff, name.length);
            }
            var date = Date.now();
            var name = req.files.image.name;
            var diff = name.length - 20;
            var rnd_number = Math.floor(Math.random()*101);
            var new_name = date.toString() + rnd_number +'_'+ name;

            fs.renameSync(req.files.image.path, 'public/img/'+new_name);

            img = '<img src="public/img/'+new_name+'" width="100%"/>';
        }
        Playlist.findOne({_id:id}, function(err, play){
            if(err){
                console.log("Fail find with id in img upload: " + err);
                return;
            }
            play.cover = "/img/"+new_name;

            var updPlay = {}
            updPlay.username = play.username;
                updPlay.title = play.title;
                updPlay.published = play.published;
                updPlay.videos = play.videos;
                updPlay.cover = play.cover;
                updPlay.rate = play.rate;
            Playlist.update({_id:play._id}, updPlay, function(err){
                if(err){
                    console.log("failed update at img upload: " + err);
                    return;
                }
                id="";
            })

        });
        res.redirect("");
    }
}