app.controller("shoppingCartCtrl", function ($scope, $http, $window, shoppingCartSrv) {

    $scope.items = shoppingCartSrv.load();

    $scope.addItem = function (key, product) {
        shoppingCartSrv.store(key, product);
        $scope.items = shoppingCartSrv.load();
    };

    $scope.removeItem = function (key) {
        shoppingCartSrv.remove(key);
        $scope.items = shoppingCartSrv.load();
    };

    $scope.removeAll = function (key) {
        shoppingCartSrv.removeAll(key);
        $scope.items = shoppingCartSrv.load();
    };

    $scope.getSum = function (items) {
        var total = 0;
        for (var i = 0; i < items.length; i++) {
            total += items[i].totalPrice;
        }
        return total;
    }

    $scope.order = new Object();
    $scope.order.Id = 0;
    $scope.order.odate = null;
    $scope.order.customer = '';
    $scope.order.comments = '';

    $scope.makeOrder = function () {
        
        $scope.order.odate = new Date();
        $http.post('api/Orders', JSON.stringify($scope.order)).
            then(function onSuccess(response) {
                var order = angular.fromJson(response.data);
                $scope.order.Id = order.Id;
                $scope.order.odate = order.odate;

                for (var i = 0; i < $scope.items.length; i++) {
                    var orderLine = new Object();
                    orderLine.Id = 0;
                    orderLine.orderId = $scope.order.Id;
                    orderLine.productId = $scope.items[i].productId;
                    orderLine.quantity = $scope.items[i].quantity;
                    orderLine.price = $scope.items[i].price;
                    //orderLine.order = $scope.order;
                    //orderLine.product = new Object();
                    //orderLine.product.Id = $scope.items[i].productId;
                    //orderLine.product.title = $scope.items[i].title;
                    //orderLine.product.price = $scope.items[i].price;

                    //console.log(JSON.stringify(orderLine));

                    $http.post('api/OrderLines', JSON.stringify(orderLine)).
                        then(function onSuccess(response2) {
                            $scope.removeAll($scope.items[i].productId);
                        }, function onError(response2) {
                            console.log(response2.StatusText);
                        });
                };

                $window.alert('Номер заказа: ' + $scope.order.Id.toString());

            }, function onError(response) {
                console.log(response.StatusText);
            });
    };

});