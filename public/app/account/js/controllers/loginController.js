app.controller('LoginController', function($scope, $route, $http, 
    notifier, $location, identity, auth, $modal, $log){
    $scope.identity = identity;
    $scope.logout = function(){
        auth.logout().then(function(){
            notifier.success('Successfully logout!');
            if($scope.user){
                $scope.user.username = '';
                $scope.user.password = '';
            }
            $location.path('/');
            location.reload();
        });
    }

    $scope.open = function () {

        var modalInstance = $modal.open({
            templateUrl: '/partials/account/login',
            controller: 'ModalInstanceCtrl',
            resolve: {
            }
        });

        modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
});