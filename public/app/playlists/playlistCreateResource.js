app.factory('PlaylistCreateResource', function(PlaylistResource, $q){
    return{
        create: function(playlist){
            var deferred = $q.defer();
            var playlist = new PlaylistResource(playlist);
            playlist.$save().then(function(){
                deferred.resolve();
            }, function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        },
    }
})