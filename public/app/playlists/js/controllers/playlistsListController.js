app.controller('PlaylistsListController', function($scope, CachedPlaylists, identity, auth, VoteResource){
    $scope.playlists = CachedPlaylists.query();
    $scope.Upvote = VoteResource.Upvote;
    $scope.DownVote = VoteResource.DownVote;
    $scope.identity = identity;
});