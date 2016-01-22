myApp.controller('DashboardController', function($scope, $location, ActivityService){

	$scope.labels = ["App Access", "QR Access", "iBeacon Access"];
	$scope.data = [];
	$scope.products = [];

	$scope.init = function(){
		drawPie();
		drawTable();
	};

	function drawPie(){
		ActivityService.getPie().success(function(data){
			$scope.data = [data.app, data.qr, data.ibeacon];

		});
	}
	function drawTable(){
		ActivityService.getProducts().success(function(data){
			$scope.products = data.data;
		});		
	}

 
});
