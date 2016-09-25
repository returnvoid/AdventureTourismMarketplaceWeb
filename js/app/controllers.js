/**
 * Created by sti on 1/7/16.
 */
angular.module('Atm')
  .controller('GlobalController', GlobalController)
  .controller('HeaderController', HeaderController)
  .controller('HomeController', HomeController)
  .controller('ActivitiesController', ActivitiesController)
  .controller('ActivityController', ActivityController)
  .controller('DialogWishlistController', DialogWishlistController);


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

function ActivityController($scope, $rootScope, $routeParams, $filter, $location, ActivitiesService, $mdDialog){
  var vm = this;
  vm.addToWishlist = addToWishlist;
  ActivitiesService.activityById($routeParams.id).then(function(response){
    console.log('response:', response);
    vm.activity = response.data;
    $rootScope.currentActivity = response.data;
  }, function(response){
    console.log('error:', response);
  });
  
  function addToWishlist(event){
    $mdDialog.show({
      controller: DialogWishlistController,
      controllerAs: 'dwl',
      templateUrl: 'templates/directives/wishlist.html',
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose: true
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  }
}

function DialogWishlistController($scope, $rootScope, ActivitiesService, $mdDialog){
  var vm = this;
  vm.activity = $rootScope.currentActivity;
  vm.addActivityToWishlist = addActivityToWishlist;
  
  ActivitiesService.user(USER).then(function(response){
    console.log('response.user:', response);
    vm.wishlist = response.data;
  }, function(response){
    console.log('error:', response);
  });
  
  function addActivityToWishlist(wishlist){
    ActivitiesService.wishlist(wishlist, {id:vm.activity._id, name:vm.activity.name}).then(function(response){
      console.log('response.user:', response);
    }, function(response){
      console.log('error:', response);
    });
  }
  
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}

