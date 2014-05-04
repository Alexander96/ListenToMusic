app.controller('PlaylistDetailsController', function($scope, $routeParams, $sce, CachedPlaylists, identity, auth, VoteResource ){
    
    var adds = '&autoplay=1&loop=1&modestbranding=1';
    var vid = [];
    $scope.identity = identity;
    $scope.Upvote = VoteResource.Upvote;
    $scope.DownVote = VoteResource.DownVote;

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