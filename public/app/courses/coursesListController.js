app.controller('CoursesListController', function($scope, CachedCourses){
    $scope.courses = CachedCourses.query();
    $scope.Up = function(playlist){
        console.log(playlist);
        alert();
    }
    $scope.Down = function(playlist){
        console.log(playlist);
    }

});