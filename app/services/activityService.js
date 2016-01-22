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