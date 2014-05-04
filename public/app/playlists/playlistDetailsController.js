app.controller('PlaylistDetailsController', function($scope, $routeParams, $sce, CachedPlaylists, identity, auth ){
    
    var adds = '&autoplay=1&modestbranding=1';
    var vid = [];
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
    $scope.changeVideo = function(id){
        $scope.code = vid[vid.indexOf(id)] + "?playlist=" + vid.joinWithoutEl(vid.indexOf(id)) + adds;
    }
    $scope.playlist = CachedPlaylists.query().$promise.then(function(collection){
        collection.forEach(function(playlist){
            if(playlist._id === $routeParams.id){
                $scope.playlist = playlist;
                for(var i=0;i < playlist.videos.length; i++){
                    vid.push(playlist.videos[i].id.toString());
                }
                
                //$scope.code = playlist.videos[0].id; //+ '&autoplay=1?modestbranding=1';
                $scope.code = vid[0] + "?playlist=" + vid.joinWithoutEl(0) + adds;
            }
        });
        
    });
});