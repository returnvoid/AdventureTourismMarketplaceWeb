/**
 * Created by sti on 1/7/16.
 */
angular.module('Atm')
  .controller('GlobalController', GlobalController)
  .controller('HeaderController', HeaderController)
  .controller('HomeController', HomeController)
  .controller('ActivitiesController', ActivitiesController)
  .controller('WishlistsController', WishlistsController)
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

function ActivitiesController($scope, $routeParams, $filter, $location, ActivitiesService, $mdDialog, $rootScope){
  var vm = this;
  vm.wasLoaded = false;
  vm.addToWishlist = addToWishlist;
  vm.titles = ['Types', 'Prices', 'Duration'];
  var type = [
  {'name':'Adrenaline'},
  {'name':'Active'},
  {'name':'Kayaking / SUP'},
  {'name':'Rental'},
  {'name':'Ecotours'},
  {'name':'Cruises'},
  {'name':'Cultural'},
  {'name':'Food & Drink'},
  {'name':'Private & Custom'},
  {'name':'Sightseeing'},
  {'name':'Walking & Bike Tours'}
  ];

  var price = [
  {'name':'0-50'},
  {'name':'50-100'},
  {'name':'100-300'},
  {'name':'300+'}
  ];

  var duration = [
  {'name':'0-3 hours'},
  {'name':'3-5 hours'},
  {'name':'5-7 hours'},
  {'name':'Full Day'},
  {'name':'Multi-day'}
  ];
  vm.refines = [type, price, duration];
  ActivitiesService.activities().then(function(response){
    console.log('response:', response);
    vm.activities = response.data;
    vm.wasLoaded = true;
  }, function(response){
    console.log('error:', response);
  });
  
  function addToWishlist(event, activity){
    ActivitiesService.activityById(activity).then(function(response){
      vm.activity = response.data;
      $rootScope.currentActivity = response.data;
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
    }, function(response){
      console.log('error:', response);
    });
    
    
  }
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
  vm.addedToYourWishlist = [];
  vm.addedToAnotherWishlist = [];
  
  ActivitiesService.user(USER).then(function(response){
    console.log('response.user:', response);
    vm.wishlist = response.data;
  }, function(response){
    console.log('error:', response);
  });
  
  function addActivityToWishlist(index, wishlist, which){
    ActivitiesService.wishlists(wishlist, {
      tourId:vm.activity._id, 
      tourName:vm.activity.name,
      operation:'addTour'
    }).then(function(response){
      console.log('response.user:', response);
      if(which == 'your'){
        vm.addedToYourWishlist[index] = true;
      }else{
        vm.addedToAnotherWishlist[index] = true;
      }
      
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


function WishlistsController($scope, $routeParams, $filter, $location, ActivitiesService, $mdDialog, $rootScope){
  var vm = this;
  vm.wasLoaded = false;
  vm.wasUsersLoaded = false;
  vm.wishlist = '57e70dc051bc3f0dbab89213';
  vm.openCommentBox = openCommentBox;
  vm.addToWishlist = addToWishlist;
  vm.vote = vote;

  ActivitiesService.wishlists(vm.wishlist).then(function(response){
    console.log('response:', response);
    vm.wishlists = response.data;
    angular.forEach(vm.wishlists.tours, function(v, k){
      v.commentIsOpen = false;
    });
    vm.wasLoaded = true;
    vm.wasUsersLoaded = true;
  }, function(response){
    console.log('error:', response);
  });
  
  function addToWishlist(event, activity){
    ActivitiesService.activityById(activity).then(function(response){
      vm.activity = response.data;
      $rootScope.currentActivity = response.data;
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
    }, function(response){
      console.log('error:', response);
    });
  }
  function openCommentBox(index){
    vm.wishlists.tours[index].commentIsOpen = !vm.wishlists.tours[index].commentIsOpen;
  } 
  
  function vote(index){
    vm.wishlists.tours[index].vote = vm.wishlists.tours[index].vote + 1;
    
  }
}

