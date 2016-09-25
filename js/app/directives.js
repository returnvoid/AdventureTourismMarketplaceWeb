/**
 * Created by sti on 1/12/16.
 */
angular.module('Atm')
  .directive('searchBarHome', searchBarHomeDirective)
  .directive('activityFeaturedList', activityFeaturedListDirective);


function searchBarHomeDirective(){
  return {
    templateUrl:'templates/directives/searchBarHome.html',
    controller: controller,
    controllerAs: 'sbh',
    link: link
  };
  function link(scope, element, attrs){
  
  }

  function controller($scope, $timeout, $q, $location){
    var vm = this;
    vm.activities = loadAll();
    vm.querySearch = querySearch;
    vm.searchTextChange = searchTextChange;
    vm.selectedItemChange = selectedItemChange;
    vm.search = search;
  
    function loadAll() {
      var activities = [
        {
          '_id': 1,
          'name'      : 'Angular 1',
          'url'       : 'https://github.com/angular/angular.js',
          'watchers'  : '3,623',
          'forks'     : '16,175',
        },
        {
          '_id': 2,
          'name'      : 'Angular 2',
          'url'       : 'https://github.com/angular/angular',
          'watchers'  : '469',
          'forks'     : '760',
        },
        {
          '_id': 3,
          'name'      : 'Angular Material',
          'url'       : 'https://github.com/angular/material',
          'watchers'  : '727',
          'forks'     : '1,241',
        },
        {
          '_id': 4,
          'name'      : 'Bower Material',
          'url'       : 'https://github.com/angular/bower-material',
          'watchers'  : '42',
          'forks'     : '84',
        },
        {
          '_id': 5,
          'name'      : 'Material Start',
          'url'       : 'https://github.com/angular/material-start',
          'watchers'  : '81',
          'forks'     : '303',
        }
      ];
      return activities.map( function (activity) {
        activity.value = activity.name.toLowerCase();
        return activity;
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
      $location.path('/activities/'+vm.selectedItem._id);
    }
  }
}


function activityFeaturedListDirective(){
  return {
    templateUrl:'templates/directives/activityFeaturedList.html',
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