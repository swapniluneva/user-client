angular.module('UserApp.controllers', []).

/* Drivers controller */
controller('userController', function($scope, userAPIService) {
    $scope.page = 1;
    $scope.usersList = [];

    $scope.next = function() {
        $scope.page = $scope.page++;
        getUsers();
    };

    $scope.prev = function() {
        $scope.page--;
        getUsers()
    };

    $scope.loadUser = (ind) => {
        $scope.activeRecord = $scope.usersList[ind];
        document.getElementById("myModal").style.display = "block";
    }
    $scope.cancel = () => {
        $scope.activeRecord = null;
        document.getElementById("myModal").style.display = "none";
    }

    $scope.exportUsers = () => {
        userAPIService.exportUsers().success(function(response) {
            downloadFileFromBinary(response, 'Users.xlsx')
            console.log('response', response);

        });
    }

    $scope.updateUser = () => {
        userAPIService.updateUser($scope.activeRecord).success(function(response) {
            console.log('response', response);
            alert('Record saved successfully')
            $scope.cancel();
            getUsers();
        });
    }

    function getUsers() {
        userAPIService.getUsers($scope.page).success(function(response) {
            $scope.usersList = response.data.GetUsers;
        });
    }

    getUsers();

    function downloadFileFromBinary(data, fileName) {
        var binaryData = [];
        binaryData.push(data);
        let contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;";
        var url = window.URL.createObjectURL(new Blob(binaryData, { type: contentType }));
        var a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    }
});