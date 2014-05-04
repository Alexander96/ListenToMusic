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
        var take1=false,take2=false,take3=false;
        for(var i=0;i<collection.length;i++){
            current = collection[i];
            if(max1.rate < current.rate && current !=list){
                max1 = current;
                take1 = true;
            }
        }
        if(!take1){
            max1 = collection[collection.length-1];
            max2 = collection[collection.length-2];
            max3 = collection[collection.length-3];
        }
        for(var i=0;i<collection.length;i++){
            current = collection[i];
            if(max2.rate < current.rate && current !=list && current != max1){
                max2 = current;
                take2=true;
            }
            //if(!take2){
            //    for(var i=0;i<collection.length;i++){
            //        current = collection[i];
            //        if(current != max1 && current != list){
            //            max2=current;
            //            break;
            //        }
            //    }
            //}
        }
        for(var i=0;i<collection.length;i++){
            current = collection[i];
            if(max3.rate < current.rate && current != list && current != max1 && current != max2){
                max3 = current;
                take3=true;
            }
        }
        //if(!take3){
        //    for(var i=0;i<collection.length;i++){
        //            current = collection[i];
        //            if(current != max1 && current != list && current != max2){
        //                max3=current;
        //                break;
        //            }
        //        }
        //}
        var popular = [];
        popular.push(list);
        popular.push(max1);
        popular.push(max2);
        popular.push(max3);
        $scope.popular = popular;
    });    
});