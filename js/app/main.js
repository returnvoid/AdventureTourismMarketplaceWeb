var API_URL = 'http://localhost:3000';


var app = angular.module('Atm', ['ngRoute', 'ngMaterial']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'templates/home.html',
                controller: 'HomeController as vm'
            }).
            when('/activities/:category', {
                templateUrl: 'templates/activities.html',
                controller: 'ActivitiesController as vm'
            }).
            when('/activity/:id', {
                templateUrl: 'templates/activity.html',
                controller: 'ActivityController as vm'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);