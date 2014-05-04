var app = angular.module('app', ['ngResource', 'ngRoute']).value('toastr', toastr);

app.config(function($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);

    var routeUserCheck = {
        adminRole: {
            authenticate: function ( auth ) {
                return auth.isAuthorizedForRole( 'admin' );
            }
        },
        authenticated: {
            authenticate: function(auth){
                return auth.isAuthenticated();
            }
        }
    }

    $routeProvider
        .when('/', {
            templateUrl : '/partials/main/home',
            controller: 'MainController'
        })
        .when('/all-playlists', {
            templateUrl : '/partials/playlists/playlists-list',
            controller: 'PlaylistsListController'
        })
        .when('/playlists/:id', {
            templateUrl : '/partials/playlists/playlist-details',
            controller: 'PlaylistDetailsController'
        })
        .when('/repeat-video', {
            templateUrl : '/partials/playlists/repeat-video',
            controller: 'RepeatVideoController'
        })
        .when('/your-playlists', {
            templateUrl : '/partials/playlists/your-playlists',
            controller: 'YourPlaylists',
            resolve: routeUserCheck.authenticated
        })
        .when('/your-playlists/edit/:id', {
            templateUrl : '/partials/playlists/edit-playlist',
            controller: 'EditPlaylistController',
            resolve: routeUserCheck.authenticated
        })
        .when('/add-playlist', {
            templateUrl : '/partials/playlists/add-playlist',
            controller: 'AddPlaylistController',
            resolve: routeUserCheck.authenticated
        })
        .when('/about', {
            templateUrl : '/partials/main/about',
            controller: 'AboutController'
        })
        .when('/signup', {
            templateUrl: '/partials/account/signup',
            controller: 'SignUpController'
        })
        .when('/profile', {
            templateUrl: '/partials/account/profile',
            controller: 'ProfileController',
            resolve: routeUserCheck.authenticated
        })
        .when('/admin/users', {
            templateUrl: 'partials/admin/users-list',
            controller: 'UserListController',
            resolve: routeUserCheck.adminRole
        })
        .otherwise({ redirectTo: '/home' });

});
app.run(function($rootScope, $location){
    $rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
        if(rejection === 'not-authorized'){
            $location.path('/');
        }
    });
});