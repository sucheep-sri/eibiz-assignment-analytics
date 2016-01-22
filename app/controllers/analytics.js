myApp.controller('AnalyticsController', function($scope, $location, ActivityService){

	var d = new Date();
	$scope.labels = [];
	$scope.data = [];
	$scope.series = ['App View', 'QR View', 'iBeacon View'];

	for (var i = parseInt(d.getDate()); i > 0; i--) {
		$scope.labels.push(i.toString());
	}

	$scope.init = function(){
		drawLine();
	};

	function drawLine(){
		ActivityService.getAnalytics('month').success(function(data){

		});
	}
/*
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90],
    [38, 28, 10, 19, 86, 37, 80]
  ];
*/

});
