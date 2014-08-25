var mongoose = require('mongoose');

var playlistSchema = mongoose.Schema({
    username: String,
    title: String,
    published: Date,
    videos: [{title:String, id:''}],
    cover: String,
    rate: Number
});

var Playlist = mongoose.model('Playlist', playlistSchema);

module.exports.seedInitialPlaylist = function(){
    //Playlist.remove({username: 'alex'}, function(){console.log("removed");});
    //Playlist.remove({}, function(){console.log("removed");});
    Playlist.find({}).exec(function(err, collection){
        if(err){
            console.log('Cant find playlists: ' + err);
            return;
        }
        console.log("playlists: " + collection.length);
        if(collection.length == 0){
            Playlist.create({username: 'alex', title: 'Simple plan', published: new Date('2/5/2014'),
                 videos: [{title: 'Your love is a lie', id: 'XAbcgmwq3EU'},
                            {title: 'Astronaut', id: 'N-MgRkSh5Xk'}], cover: '/img/simple-plan.jpg', rate: 4});
            Playlist.create({username: 'alex', title: 'Les Friction', published: new Date('2/5/2014'),
                 videos: [{title: 'World On Fire', id: 'uKvx7J7ZqqM'},
                            {title: 'Louder Than Words', id: 'VGolV-wG9Sk'}], cover: '/img/lesfriction.jpg', rate: 5});
            Playlist.create({username: 'alex', title: 'Sum 41', published: new Date('2/5/2014'),
                 videos: [{title: 'In Too Deep', id: 'emGri7i8Y2Y'},
                            {title: 'Still Waiting', id: 'qO-mSLxih-c'}], cover: '/img/Music_Sum_41_004791_.jpg', rate: 2});
            Playlist.create({username: 'alex', title: '30 Seconds to Mars', published: new Date('2/5/2014'),
                 videos: [{title: 'Night of a Hunter', id: 'zK268TLKCK4'},
                            {title: 'Stranger in a Strang Land', id: 'RmOIDAa3Dy0'}], cover: '/img/30-seconds-mars-vr03.jpg', rate: 1});
            Playlist.create({username: 'alex', title: 'Linkin Park', published: new Date('2/5/2014'),
                 videos: [{title: 'Numb', id: 'kXYiU_JCYtU'},
                            {title: 'Breaking the Habit', id: 'v2H4l9RpkwM'}], cover: '/img/linkin-park-9a.jpg', rate: 3});

            console.log("Playlists added...");
        }
    });
}
