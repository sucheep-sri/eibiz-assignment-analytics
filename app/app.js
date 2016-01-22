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
