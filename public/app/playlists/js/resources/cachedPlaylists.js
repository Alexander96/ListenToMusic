app.factory('CachedPlaylists', function(PlaylistResource){
    var cachedPlaylists;

    return {
        query: function(){
            if(!cachedPlaylists){
                cachedPlaylists = PlaylistResource.query();
            }
            return cachedPlaylists;
        },
        update: function(){
            cachedPlaylists = PlaylistResource.query();
        }
    }
});