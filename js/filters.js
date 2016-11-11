angular.module('Tienditas')
        .filter('filterObject', function () {
            return function (items, search) {
                if (search && search['*'] != undefined) {
                    search = search['*'];
                }
                if (!search) {
                    return items;
                }

                var result = {};
//                console.log('###################');
                for (var key in items) {//cada elemento del objeto
                    var itemValue = items[key];
                    if (typeof search === 'string') {
                        for (var keyItem in itemValue) {//buscar en todas las propiedades del elemento
                            var propertyValue = itemValue[keyItem];
                            if (typeof propertyValue === 'string') {
                                if (propertyValue.toUpperCase().indexOf(search.toUpperCase()) > -1) {
                                    result[key] = itemValue;
                                    break;
                                }
                            } else {
                                if (propertyValue == search) {
                                    result[key] = itemValue;
                                    break;
                                }
                            }

                        }
                    } else if (typeof search === 'object') {
                        for (var prop in search) {//buscar en las propiedades definidas
                            var searchString = search[prop];
                            if (typeof itemValue[prop] === 'string') {
                                if (itemValue[prop].toUpperCase().indexOf(searchString.toUpperCase()) > -1) {
                                    result[key] = itemValue;
                                    continue;
                                }
                            } else {
                                if (itemValue[prop] == searchString) {
                                    result[key] = itemValue;
                                    continue;
                                }
                            }
                        }
                    }

                }
//                $ionicScrollDelegate.scrollTo(0, 0, false);
                return result;

            }
        })
        .filter('ucfirst', function () {
            return function (input, arg) {
                return input.replace(/(?:^|\s)\S/g, function (a) {
                    return a.toUpperCase();
                });
            };
        })
        .filter('numberFixedLen', function () {
            return function (n, len) {
                var num = parseInt(n, 10);
                len = parseInt(len, 10);
                if (isNaN(num) || isNaN(len)) {
                    return n;
                }
                num = '' + num;
                while (num.length < len) {
                    num = '0' + num;
                }
                return num;
            };
        })
        .filter('orderObjectBy', function () {
            return function (items, field, reverse) {
                var filtered = [];
                angular.forEach(items, function (item) {
                    filtered.push(item);
                });
                filtered.sort(function (a, b) {
                    return (a[field] > b[field] ? 1 : -1);
                });
                if (reverse)
                    filtered.reverse();
                return filtered;
            };
        })
        .filter('highlight', function ($sce) {
            return function (text, phrase) {
                if (phrase) {
                    text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
                            '<span class="highlighted">$1</span>');
                }
                return $sce.trustAsHtml(text);
            }
        });