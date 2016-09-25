/**
 * Created by sti on 1/18/16.
 */
angular.module('Atm')
  .service('testService', testService)
  .service('ActivitiesService', ActivitiesService);

function testService(){
    return {
        url:url
    }

    function url(){
        return window.url;
    }
}

function ActivitiesService($http, $q){
  return{
    activityById: function(id){
      return $http.get('/api/atm/tour/'+id).then(function(response){
        return response
      }, function(response){
        return response;
      });
    },
    featured: function(){
      return $http.get(API_URL + '/api/atm/tours').then(function(response){
        return response
      }, function(response){
        return response;
      });
    }
  }
}