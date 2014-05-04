app.controller("RepeatVideoController", function($scope){
    $scope.playVideo =function(url){
        var id = '';
        var take = false
        for(var i=0; i<url.length;i++){
            if(take) id += url[i];
            if(url[i] == '=')take = true;
        }
        $scope.code = id + '?autoplay=1&loop=1&playlist='+ id ;
        $scope.isClicked = true;
    }
});