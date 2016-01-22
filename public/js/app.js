var myApp = angular.module('myApp', ['ui.router', 'myApp.templates', 'ui.bootstrap', 'chart.js']);

myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise("/dashboard");

  $stateProvider
    .state('dashboard', {
      url: "/dashboard",
      templateUrl: "views/dashboard.html",
      controller: 'DashboardController'
    })
    .state('analytics', {
      url: '/analytics',
      templateUrl: 'views/analytics.html',
      controller: 'AnalyticsController'
    });
}]);

myApp.factory('ActivityService', function($http){

	var factory = {};

	factory.getPie = function(){
		return $http.get('/activity/pie');
	};

	factory.getProducts = function(){
		return $http.get('/activity/products');
	};

	factory.getAnalytics = function(type){
		return $http.get('/activity/analytics/'+type);
	};

	return factory;

});
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

angular.module('myApp.templates', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("views/analytics.html",
    "<div class=qr-wrapper ng-init=init()><div class=row><div class=col-md-12><div class=page-header><h2>QR Access Analytics</h2></div><section class=header-section><div class=col-md-6><h4 class=criteria-header>Show By Month</h4></div><div class=\"col-md-6 btn-col\"><div class=btn-group><button type=button class=\"btn btn-me hvr-underline-from-center\">Month</button> <button type=button class=\"btn btn-me hvr-underline-from-center\">Day</button></div></div></section><div class=line><canvas id=line class=\"chart chart-line\" chart-data=data chart-labels=labels chart-legend=true chart-series=series></canvas></div></div></div></div>");
  $templateCache.put("views/dashboard.html",
    "<div class=dashboard-wrapper ng-init=init()><div class=row><div class=col-md-12><div class=page-header><h2>Access Method</h2></div><div class=piechart><canvas id=pie class=\"chart chart-pie\" chart-data=data chart-labels=labels chart-legend=true></canvas></div><div class=page-header><h2>Product Views</h2></div><div class=myTable><table class=\"table table-bordered\"><thead><tr class=table-header><td>Products</td><td>Views</td></tr></thead><tbody><tr ng-repeat=\"product in products | orderBy: '-count'\"><td>{{product._id}}</td><td>{{product.count}}</td></tr></tbody></table></div></div></div></div>");
}]);
