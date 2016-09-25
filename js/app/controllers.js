/**
 * Created by sti on 1/7/16.
 */
angular.module('Atm')
  .controller('GlobalController', GlobalController)
  .controller('HeaderController', HeaderController)
  .controller('HomeController', HomeController)
  .controller('ActivitiesController', ActivitiesController)
  .controller('ActivityController', ActivityController);


/*CONTROLADORES*/
function GlobalController(){
    var gl = this;
    //gl.url = urlService.url();
}

function HeaderController($scope, $location, $route){
    var vm = this;
    vm.location = null;
    $scope.$on('$routeChangeStart', function(next, current) {
        vm.location = Object.keys(current.params).length === 0 ? true : false;
    });
}

function HomeController($scope, $routeParams, $filter, $location){
    var vm = this;
    console.log('home');
}

function ActivitiesController($scope, $routeParams, $filter, $location){
  var vm = this;
  console.log('ActivitiesController');
}

function ActivityController($scope, $routeParams, $filter, $location, ActivitiesService){
  var vm = this;
  ActivitiesService.activityById($routeParams.id).then(function(response){
    console.log('response.data:', response);
    vm.featuredActivities = response.data;
  }, function(response){
    console.log('error:', response);
  });
  console.log('ActivityController');
}