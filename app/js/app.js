angular.module('UserApp', [
    'UserApp.services',
    'UserApp.controllers',
    'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when("/", { templateUrl: "views/users.html", controller: "userController" }).
    otherwise({ redirectTo: '/' });
}]);