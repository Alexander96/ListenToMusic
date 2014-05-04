app.factory('VoteResource', function(identity, auth, PlaylistCreateResource, notifier){
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
                        notifier.success("You voted for " + playlist.title);
                    });
                });
            }else{
                if(!identity.currentUser.votes.contains(playlist._id)){
                    identity.currentUser.votes.push(playlist._id);
                    auth.update(identity.currentUser).then(function(){
                        playlist.rate++;
                        PlaylistCreateResource.update(playlist).then(function(){
                            console.log(identity.currentUser);
                            notifier.success("You voted for " + playlist.title);
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
                            notifier.success("You down voted for " + playlist.title);
                        });
                    });
                } else {
                    if (!identity.currentUser.votes.contains(playlist._id)) {
                        identity.currentUser.votes.push(playlist._id);
                        auth.update(identity.currentUser).then(function(){
                            playlist.rate--;
                            PlaylistCreateResource.update(playlist).then(function(){
                                notifier.success("You down voted for " + playlist.title);
                            });
                        });
                    }
                }
            }
        }
    }
    }
});