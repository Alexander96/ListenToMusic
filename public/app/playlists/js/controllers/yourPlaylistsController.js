app.controller('YourPlaylists', function($scope, cachedYourPlaylists, VoteResource){
    $scope.playlists = cachedYourPlaylists.query();
    $scope.Upvote = VoteResource.Upvote;
    $scope.DownVote = VoteResource.DownVote;
});