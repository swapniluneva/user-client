angular.module('UserApp', [
    'UserApp.services',
    'UserApp.controllers',
    'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when("/", { templateUrl: "views/users.html", controller: "userController" }).
    when("/Registration/form", { templateUrl: "views/form.html", controller: "userController" }).
    when("/Registration/print", { templateUrl: "views/pdf.html", controller: "userController" }).
    when("/Transporter/PrintTransporterFormVehicleCheckValidOrNot.aspx", { templateUrl: "views/preview.html", controller: "userController" }).
    otherwise({ redirectTo: '/' });
}]);