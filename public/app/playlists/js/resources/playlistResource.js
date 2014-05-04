app.factory('PlaylistResource', function($resource){
    var PlaylistResource = $resource('/api/playlists/:id', {id:'@id'}, {update: { method:'PUT', isArray: false } } );

    return PlaylistResource;
});