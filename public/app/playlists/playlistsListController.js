app.controller('PlaylistsListController', function($scope, CachedPlaylists, identity, auth){
    $scope.playlists = CachedPlaylists.query();
    $scope.Upvote = function(playlist){
        alert(JSON.stringify(playlist));
    }
    $scope.DownVote = function(playlist){
        alert(JSON.stringify(playlist));
    }
    $scope.identity = identity;
    $scope.Upvote = function(playlist){
        if(!identity.isAuthenticated())
            alert('You should to login first :)');
        else{
            if(!identity.currentUser.votes){
                identity.currentUser.votes = [];
                identity.currentUser.votes.push(playlist._id);
                auth.update(identity.currentUser).then(function(){
                        playlist.rate++;
                    });
            }else{
                if(!identity.currentUser.votes.contains(playlist._id)){
                    identity.currentUser.votes.push(playlist._id);
                    auth.update(identity.currentUser).then(function(){
                        playlist.rate++;
                    });
                }
            }
        }
    }
    $scope.DownVote = function(playlist){
        if(playlist.rate > 0 ){
            if (!identity.isAuthenticated())
                alert('You should to login first :)');
            else {
                if (!identity.currentUser.votes) {
                    identity.currentUser.votes = [];
                    identity.currentUser.votes.push(playlist._id);
                    auth.update(identity.currentUser).then(function(){
                        playlist.rate++;
                    });
                } else {
                    if (!identity.currentUser.votes.contains(playlist._id)) {
                        identity.currentUser.votes.push(playlist._id);
                        auth.update(identity.currentUser).then(function(){
                        playlist.rate++;
                    });
                    }
                }
            }
        }
    }
});