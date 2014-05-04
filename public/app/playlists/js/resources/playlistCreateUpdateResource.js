app.factory('PlaylistCreateResource', function(PlaylistResource, $q, PlaylistResource){
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
        update: function(playlist){
            var deferred = $q.defer();
            var updatedPlaylist = new PlaylistResource(playlist);
            updatedPlaylist._id = playlist._id;
            updatedPlaylist.$update().then(function(){
                deferred.resolve();
            }, function(response){
                deferred.reject(response);
            })
            return deferred.promise;
        }
    }
})