app.factory('VoteResource', function(identity, auth, PlaylistCreateResource){
    return{
    Upvote :function(playlist){
        if(!identity.isAuthenticated())
            alert('You should login first :)');
        else{
            if(!identity.currentUser.votes){
                identity.currentUser.votes = [];
                identity.currentUser.votes.push(playlist._id);
                auth.update(identity.currentUser).then(function(){
                    playlist.rate++;
                    PlaylistCreateResource.update(playlist).then(function(){
                        console.log(identity.currentUser);
                    });
                });
            }else{
                if(!identity.currentUser.votes.contains(playlist._id)){
                    identity.currentUser.votes.push(playlist._id);
                    auth.update(identity.currentUser).then(function(){
                        playlist.rate++;
                        PlaylistCreateResource.update(playlist).then(function(){
                            console.log(identity.currentUser);
                        });
                    });
                }
            }
        }
    },
    DownVote: function(playlist){
        if(playlist.rate > 0 ){
            if (!identity.isAuthenticated())
                alert('You should login first :)');
            else {
                if (!identity.currentUser.votes) {
                    identity.currentUser.votes = [];
                    identity.currentUser.votes.push(playlist._id);
                    auth.update(identity.currentUser).then(function(){
                        playlist.rate--;
                        PlaylistCreateResource.update(playlist).then(function(){
                        
                        });
                    });
                } else {
                    if (!identity.currentUser.votes.contains(playlist._id)) {
                        identity.currentUser.votes.push(playlist._id);
                        auth.update(identity.currentUser).then(function(){
                            playlist.rate--;
                            PlaylistCreateResource.update(playlist).then(function(){
                        
                            });
                        });
                    }
                }
            }
        }
    }
    }
});