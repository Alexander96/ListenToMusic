'use strict'
app.controller('MainController', function($scope, CachedCourses, identity, PlaylistResource){
    PlaylistResource.query().$promise.then(function(collection){
        var rate=-1;
        var list;
        for(var i=0;i<collection.length;i++){
            if(collection[i].rate > rate){
                list=collection[i];
                rate = collection[i].rate;
            }
        }
        $scope.playlist = list;
    });
    $scope.courses = CachedCourses.query();
    $scope.identity = identity;
});