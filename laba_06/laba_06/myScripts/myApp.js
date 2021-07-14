var app = angular.module('myApp', ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: 'views/main.html',
        })
        .when("/persons", {
            templateUrl: 'views/persons.html',
            controller: 'personsController'

        })
        .when("/order", {
            templateUrl: 'views/order.html',
            controller: 'orderController'
        })
        .otherwise({
            template: "<h2>Page not found</h2>"
        });
});

app.controller('personsController', function ($scope) {
    $scope.persons = [
        { name: 'Sergey', age: 39 },
        { name: 'Kosty', age: 11 },
        { name: 'Nataliya', age: 35, lastName: 'Shuykova' },
        { name: 'Alex', age: 7 }
    ]
})

app.controller('orderController', function ($scope) {
    $scope.goods = [
        { title: 'Книга', quantity: 10, price: 300 },
        { title: 'Диск', quantity: 5, price: 100 },
        { title: 'Флэшка', quantity: 2, price: 600 }
    ];
    $scope.getSumma = function () {
        var summa = 0;
        for (var i = 0; i < $scope.goods.length; i++)
            summa += $scope.goods[i].price * $scope.goods[i].quantity;
        return summa;
    }
})

