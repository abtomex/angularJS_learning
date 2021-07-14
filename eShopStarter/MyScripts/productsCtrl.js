app.controller("productsCtrl", function ($scope, $http, shoppingCartSrv) {
    $http.get('api/Products').
        then(function onSuccess(response) {
            $scope.products = angular.fromJson(response.data);
        });

    $scope.tblOrderBy = 'Id';
    $scope.reverseOrderBy = false;

    $scope.orderBy = function (expression) {
        if ($scope.tblOrderBy === expression) {
            $scope.reverseOrderBy = !$scope.reverseOrderBy;
        }
        else {
            $scope.tblOrderBy = expression;
            $scope.reverseOrderBy = false;
        }
    };

    $scope.saveItem = function (key, product) {
        shoppingCartSrv.store(key, product);
    };
});