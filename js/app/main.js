var API_URL = 'http://localhost:3000';
var USER = '57e70be651bc3f0dbab8920b';


var app = angular.module('Atm', ['ngRoute', 'ngMaterial']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'templates/home.html',
                controller: 'HomeController as vm'
            }).
            when('/activities', {
                templateUrl: 'templates/activities.html',
                controller: 'ActivitiesController as vm'
            }).
            when('/activity/:id', {
                templateUrl: 'templates/activity.html',
                controller: 'ActivityController as vm'
            }).
            when('/wishlists', {
                templateUrl: 'templates/wishlists.html',
                controller: 'WishlistsController as vm'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);