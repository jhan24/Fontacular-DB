var fontApp = angular.module('fontApp', [
  'ngRoute',
  'fontControllers'
]);

fontApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/fonts', {
        templateUrl: 'home.html',
        controller: 'fontListCtrl'
      }).
      when('/fonts/:id', {
        templateUrl: 'font.html',
        controller: 'fontCtrl'
      }).
      otherwise({
        redirectTo: '/fonts'
      });
  }]);
  
var fontControllers = angular.module('fontControllers', []);

fontControllers.controller('fontListCtrl', function ($scope, $http) {
  $http.get("http://api.fontacular.com/fonts/index.json").success(function(data) {
    $scope.fonts = data;
  });
});

fontControllers.controller('fontCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.get("http://api.fontacular.com/fonts/" + $routeParams.id + "/data.json").success(function(data) {
        $scope.font = data;
        var weightObjects = data.tag_weight;
        console.log(weightObjects);
        $scope.tagWeights = [];
        // for (var i = 0; i < weightObjects.length; i++) {
            // $scope.tagWeights.push(weightObjects[i]);
        // }
        var array = $.map(weightObjects, function(value, index) {
            return [value];
        });
        $scope.tagWeights = array;
        console.log($scope.tagWeights);
    });
  }]);
 