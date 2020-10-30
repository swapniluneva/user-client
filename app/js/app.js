angular.module('UserApp', [
    'UserApp.services',
    'UserApp.controllers',
    'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when("/", { templateUrl: "views/users.html", controller: "userController" }).
    when("/Registration/form", { templateUrl: "views/form.html", controller: "userController" }).
    when("/Registration/print", { templateUrl: "views/print_final.html", controller: "userController" }).
    when("/Registration/PrintRegistrationFormVehicleCheckValidOrNot.aspx", { templateUrl: "views/scan.html", controller: "userController" }).
    otherwise({ redirectTo: '/' });
}]);