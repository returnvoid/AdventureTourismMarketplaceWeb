/**
 * Created by sti on 1/12/16.
 */
angular.module('Atm')
  .directive('searchBarHome', searchBarHomeDirective)
  .directive('activityFeaturedList', activityFeaturedListDirective)
  .directive('giveawayList', giveawayListDirective);

function searchBarHomeDirective(){
  return {
    templateUrl:'templates/directives/searchBarHome.html',
    controller: controller,
    controllerAs: 'sbh',
    link: link
  };
  function link(scope, element, attrs){

  }

  function controller($scope, $timeout, $q, $location, ActivitiesService){
    var vm = this;
    vm.activities = loadAll();
    vm.querySearch = querySearch;
    vm.searchTextChange = searchTextChange;
    vm.selectedItemChange = selectedItemChange;
    vm.search = search;



    function loadAll() {
      var activities = {};
      return ActivitiesService.activities().then(function(response){
        var activities = response.data;
        return activities.map( function (activity) {
          activity.value = activity.name.toLowerCase();
          return activity;
        });
      });
    }

    function searchTextChange(text) {
      console.log('Text changed to ' + text);
    }

    function selectedItemChange(item) {
      console.log('Item changed to ' + JSON.stringify(item));
    }

    function querySearch(query){
      var results = query ? vm.activities.filter( createFilterFor(query) ) : vm.activities,
            deferred;
        if (self.simulateQuery) {
          deferred = $q.defer();
          $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
          return deferred.promise;
        } else {
          return results;
        }
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(activity) {
        return (activity.value.indexOf(lowercaseQuery) === 0);
      };
    }

    function search(){
      $location.path('/activities');
    }
  }
}


function activityFeaturedListDirective(){
  return {
    templateUrl:'templates/directives/activityFeaturedList.html?r=345876384',
    controller: controller,
    controllerAs: 'afl',
    link: link
  };

  function link(scope, element, attrs){

  }

  function controller($scope, $location, ActivitiesService){
    var vm = this;
    vm.goToActivity = goToActivity;
    ActivitiesService.featured().then(function(response){
      console.log('response.data:', response);
      vm.featuredActivities = response.data;
    }, function(response){
      console.log('error:', response);
    });

    function goToActivity(id){
      $location.path('/activity/'+id);
    }
  }
}

function giveawayListDirective(){
  return {
    templateUrl:'templates/directives/giveawayList.html',
    controller: controller,
    controllerAs: 'gl',
    link: link
  };

  function link(scope, element, attrs){

  }

  function controller($scope, $location, ActivitiesService){
    var vm = this;
    vm.goToGiveaway = goToGiveaway;
    ActivitiesService.giveaways().then(function(response){
      console.log('response.data:', response);
      vm.giveaways = response.data;
    }, function(response){
      console.log('error:', response);
    });

    function goToGiveaway(id){
      $location.path('/giveaway/'+id);
    }
  }
}