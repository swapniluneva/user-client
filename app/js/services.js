angular.module('UserApp.services', [])
    .factory('userAPIService', function($http) {
        var userAPI = {};

        const dataHost = "http://127.0.0.1:8078/api/data/";

        userAPI.getQRUrl = (eId) => {
            return dataHost + "getQRCode?eId=" + encodeURIComponent(eId);
        }
        userAPI.addData = function(user) {
            return $http({
                method: 'POST',
                url: dataHost + "addData/",
                data: user
            });
        }

        userAPI.getData = function(eId) {
            return $http({
                method: 'GET',
                url: dataHost + "getData?eId=" + eId
            });
        }

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