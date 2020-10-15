angular.module('UserApp.services', [])
    .factory('userAPIService', function($http) {
        var userAPI = {};

        userAPI.getUsers = function(page) {
            return $http({
                method: 'GET',
                url: 'http://127.0.0.1:1601/api/GetUsers/' + page
            });
        }

        userAPI.exportUsers = function() {
            return $http({
                method: 'GET',
                url: 'http://127.0.0.1:1602/api/ExportUsers/',
                blocked: true,
                responseType: "arraybuffer"
            });
        }

        userAPI.updateUser = function(user) {
            return $http({
                method: 'PUT',
                url: 'http://127.0.0.1:1601/api/UpdateUser/',
                data: user
            });
        }

        return userAPI;
    });