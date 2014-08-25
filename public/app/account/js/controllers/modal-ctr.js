var ModalInstanceCtrl = function ($scope, $modalInstance, auth, notifier) {
	$scope.invalid=false;
	$scope.login = function(user){
        auth.login(user).then(function(success){
            if(success){
                notifier.success('Successful login!');
                $modalInstance.dismiss('cancel');
            }
            else{
                notifier.error('Username or Password not matched!');
                $scope.invalid=true;
            }
        });
    };

  	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
  	};
};