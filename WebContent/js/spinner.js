var app= angular.module('myApp', ['angularSpinners'])
  .directive('loading', function () {
      return {
        restrict: 'E',
        replace:true,
        template: '<div class="loading"><img src="../image/spinner.jpg" width="20" height="20" />LOADING...</div>',
        link: function (scope, element, attr) {
              scope.$watch('loading', function (val) {
                  if (val)
                      $(element).show();
                  else
                      $(element).hide();
              });
        }
      }
  })
  app.controller('myCtrl', function($scope, $http)
	{
	  $scope.cars = [];
	  
	  $scope.clickMe=function()
	  {
		  $scope.loading= true;
		  $http.get('test.json')
		  .success(function(data)
			{
			  console.log("display data sucessfully");
			  $scope.cars = data[0].cars;
	            $scope.loading = false;
			});
	  }
	  
	});
  
  