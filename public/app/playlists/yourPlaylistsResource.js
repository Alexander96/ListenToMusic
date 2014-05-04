app.factory('YourPlaylistsResource', function($resource, identity){
    var YourPlaylistsResource = $resource('/api/your-playlists/:username', {username: identity.currentUser.username}, {update: { method:'PUT', isArray: false } } );

    return YourPlaylistsResource;
});