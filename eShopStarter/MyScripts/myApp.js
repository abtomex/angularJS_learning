var app = angular.module('myApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/main', {
            templateUrl: 'Views/Main.html'
        })
        .when('/products', {
            templateUrl: 'Views/Products.html',
            controller: 'productsCtrl'
        })
        .when('/shoppingCart', {
            templateUrl: 'Views/ShoppingCart.html',
            controller: 'shoppingCartCtrl'
        })
        .otherwise({
            template: ''
        });
});