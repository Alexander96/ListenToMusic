app.controller('AddPlaylistController', function($scope,$http, identity, $location, notifier, PlaylistCreateResource, CachedPlaylists){
    $scope.addVideoInput = function(){
        var playlistTitle = $('#title').val();
        var playlistCover = $('#cover').val();
        $('#title').val(playlistTitle);
        $('#cover').val(playlistCover);
        $('#formAddPlaylist').append( 
        '<div class="form-group"><label class="col-md-2" for="videoTitle">Video Title</label><div class="col-md-10"><input type="text" required="required" placeholder="Video title" ng-model="text" class="form-control videoTitle ng-valid-required" ng-model="t" /></div></div>' +
        '<div class="form-group"><label class="col-md-2" for="videoUrl">Video Url</label><div class="col-md-10"><input type="url" required="required" placeholder="Video url" ng-model="url" class="form-control videoUrl ng-valid-required" ng-model="e" /></div></div>');
    }
    $scope.createPlaylist = function(playlist){
        var newPlaylist = {};
        newPlaylist.title = playlist.title;
        newPlaylist.cover = '';
        newPlaylist.published = new Date();
        newPlaylist.username = identity.currentUser.username;
        newPlaylist.rate = 0;
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
        PlaylistCreateResource.create(newPlaylist).then(function(response){
                notifier.success('Playlist created successfully!');
                $("#form-cover").submit();
                CachedPlaylists.update();
                //$location.path('/your-playlists');
        });

    }
});