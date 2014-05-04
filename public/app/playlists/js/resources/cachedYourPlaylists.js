app.factory('cachedYourPlaylists', function(YourPlaylistsResource){
    var cachedPlaylists;

    return {
        query: function(){
            if(!cachedPlaylists){
                cachedPlaylists = YourPlaylistsResource.query();
            }
            return cachedPlaylists;
        },
        update: function(){
            cachedPlaylists = YourPlaylistsResource.query();
        }
    }
});