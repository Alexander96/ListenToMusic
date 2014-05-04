app.controller('YourPlaylists', function($scope, cachedYourPlaylists){
    $scope.playlists = cachedYourPlaylists.query();
    $scope.Upvote = function(playlist){
        alert(JSON.stringify(playlist));
    }
    $scope.DownVote = function(playlist){
        alert(JSON.stringify(playlist));
    }
});