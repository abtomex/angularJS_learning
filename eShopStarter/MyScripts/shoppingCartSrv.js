app.service('shoppingCartSrv', ['$window', function (window) {
        
    this.store = function (key, product) {
        var item = angular.fromJson(window.localStorage.getItem(key));

        if (!item) {
            item = new Object();
            item.productId = product.Id;
            item.title = product.title;
            item.price = product.price;
            item.quantity = 1;
            item.totalPrice = product.price;
        }
        else {
            item.quantity++;
            item.totalPrice = item.quantity * product.price;
        }

        window.localStorage.setItem(key, angular.toJson(item));

        //console.log(window.localStorage.length, key, JSON.stringify(item));
    };

    this.remove = function (key) {
        var item = angular.fromJson(window.localStorage.getItem(key));

        if (item) {
            item.quantity--;
            item.totalPrice = item.quantity * item.price;
        }

        if (item.quantity === 0) {
            window.localStorage.removeItem(key);
        }
        else {
            window.localStorage.setItem(key, angular.toJson(item));
        }

        //console.log(window.localStorage.length, key, JSON.stringify(item));
    };

    this.removeAll = function (key) {
        var item = angular.fromJson(window.localStorage.getItem(key));

        while (item) {
            this.remove(key);
            item = angular.fromJson(window.localStorage.getItem(key));
        }
    };

    this.load = function () {
        var items = new Array();

        for (var i = 0; i < window.localStorage.length; i++) {
            items.push(angular.fromJson(window.localStorage.getItem(window.localStorage.key(i))));
        }

        return items;
    };
}]);