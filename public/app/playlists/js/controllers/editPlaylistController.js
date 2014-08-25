app.controller('EditPlaylistController', function($scope, cachedYourPlaylists, $location, $routeParams, PlaylistCreateResource, CachedPlaylists, notifier){
    cachedYourPlaylists.query().$promise.then(function(collection){
        collection.forEach(function(playlist){
            if(playlist._id == $routeParams.id){
                $scope.playlist = playlist;
            }
        });
    });
    $scope.addVideoInput = function(){
        var playlistTitle = $('#title').val();
        var playlistCover = $('#cover').val();
        $('#title').val(playlistTitle);
        $('#cover').val(playlistCover);
        $('#formAddPlaylist').append( 
        '<div class="form-group"><label class="col-md-2" for="videoTitle">Video Title</label><div class="col-md-10"><input type="text" required="required" placeholder="Video title" ng-model="text" class="form-control videoTitle ng-valid-required" ng-model="t" /></div></div>' +
        '<div class="form-group"><label class="col-md-2" for="videoUrl">Video Url</label><div class="col-md-10"><input type="url" required="required" placeholder="Video url" ng-model="url" class="form-control videoUrl ng-valid-required" ng-model="e" /></div></div>');
    }
    $scope.edit = function(playlist){
        var newPlaylist = {};
        newPlaylist._id = playlist._id;
        newPlaylist.title = playlist.title;
        newPlaylist.published = new Date();
        newPlaylist.username = playlist.username;
        newPlaylist.rate = playlist.rate;
        newPlaylist.videos = [];
        var titlesVid = $('.videoTitle').toArray();
        var ulrsVid = $('.videoUrl').toArray();
        var url = '',
            title = '',
            video = {};
        for(var i=0;i<titlesVid.length;i++){
            url = ulrsVid[i].value;
            title = titlesVid[i].value;
            if(url == "" || title == "")
                continue;
            var id = '';
            var take = false;
            for(var j=0; j<url.length;j++){
                if(take) id += url[j];
                if(url[j] == '=')take = true;
            }
            video.title = title;
            video.id = id;
            newPlaylist.videos.push(video);
            video = {};
            title= '';
            url = '';
        }
        PlaylistCreateResource.update(newPlaylist).then(function(response){
            notifier.success('Playlist successfully saved!');
            CachedPlaylists.update();
            $location.path('/your-playlists');
            //location.reload();
        });
    }
});