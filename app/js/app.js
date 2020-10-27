angular.module('UserApp', [
    'UserApp.services',
    'UserApp.controllers',
    'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when("/", { templateUrl: "views/users.html", controller: "userController" }).
    when("/Registration/form", { templateUrl: "views/form.html", controller: "userController" }).
    when("/Registration/PrintRegistrationFormVehicleCheckValidOrNot.aspx", { templateUrl: "views/print.html", controller: "userController" }).
    otherwise({ redirectTo: '/' });
}]);