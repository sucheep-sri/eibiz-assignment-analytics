angular.module('myApp.templates', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("views/analytics.html",
    "<div class=qr-wrapper ng-init=init()><div class=row><div class=col-md-12><div class=page-header><h2>QR Access Analytics</h2></div><section class=header-section><div class=col-md-6><h4 class=criteria-header>Show By Month</h4></div><div class=\"col-md-6 btn-col\"><div class=btn-group><button type=button class=\"btn btn-me hvr-underline-from-center\">Month</button> <button type=button class=\"btn btn-me hvr-underline-from-center\">Day</button></div></div></section><div class=line><canvas id=line class=\"chart chart-line\" chart-data=data chart-labels=labels chart-legend=true chart-series=series></canvas></div></div></div></div>");
  $templateCache.put("views/dashboard.html",
    "<div class=dashboard-wrapper ng-init=init()><div class=row><div class=col-md-12><div class=page-header><h2>Access Method</h2></div><div class=piechart><canvas id=pie class=\"chart chart-pie\" chart-data=data chart-labels=labels chart-legend=true></canvas></div><div class=page-header><h2>Product Views</h2></div><div class=myTable><table class=\"table table-bordered\"><thead><tr class=table-header><td>Products</td><td>Views</td></tr></thead><tbody><tr ng-repeat=\"product in products | orderBy: '-count'\"><td>{{product._id}}</td><td>{{product.count}}</td></tr></tbody></table></div></div></div></div>");
}]);
