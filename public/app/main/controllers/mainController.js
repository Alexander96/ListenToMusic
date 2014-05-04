'use strict'
app.controller('MainController', function($scope, CachedPlaylists, identity, PlaylistResource, VoteResource){
    $scope.Upvote = VoteResource.Upvote;
    $scope.DownVote = VoteResource.DownVote;
    PlaylistResource.query().$promise.then(function(collection){
        var rate=-1;
        var list;
        for(var i=0;i<collection.length;i++){
            if(collection[i].rate > rate){
                list=collection[i];
                rate = collection[i].rate;
            }
        }
        var playlists = collection
        var lists = [];
        for(var i = playlists.length - 1;i >= 0;i--){
            if(i==playlists.length-5)break;
            lists.push(playlists[i]);
        }
        $scope.playlists = lists;
        $scope.playlist = list;
        var current;
        var max1 = {rate:0}, max2 = {rate:0}, max3 = {rate:0};
        for(var i=0;i<collection.length;i++){
            current = collection[i];
            if(max1.rate < current.rate && current !=list){
                max1 = current;
            }
        }
        for(var i=0;i<collection.length;i++){
            current = collection[i];
            if(max2.rate < current.rate && current !=list && current != max1){
                max2 = current;
            }
        }for(var i=0;i<collection.length;i++){
            current = collection[i];
            if(max3.rate < current.rate && current != list && current != max1 && current != max2){
                max3 = current;
            }
        }
        var popular = [];
        popular.push(list);
        popular.push(max1);
        popular.push(max2);
        popular.push(max3);
        $scope.popular = popular;
    });    
});