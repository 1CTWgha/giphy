var app = angular.module("MovieApp", []);
app.controller("MovieCtrl", ["$scope", "$http",
    function($scope, $http) {
  $scope.searchTerm = 'seattle';
  $scope.results = undefined;

  $scope.$watch('searchTerm', function(newVal, oldVal) {
    $scope.search();
  });

  $scope.search = function() {
    var req = {
      url: 'http://api.giphy.com/v1/gifs/search',
      method: "GET",
      params: {
        q: $scope.searchTerm,
        api_key: 'dc6zaTOxFJmzC'
      }
    }

    $http(req).then(function success(res) {
      console.log("HTTP success:", res);
      if (res.data.Error === "Video not found!") {
        $scope.results = [];
      } else {
        $scope.results = res.data.data;
        // console.log("THIS IS: RES.DATA.DATA", $scope.results[0].images.fixed_width.url)
      }
    }, function failure(res) {
      $scope.results = [];
      console.log("HTTP failed:", res);
    });
  }
}]);
