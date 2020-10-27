angular.module('UserApp.controllers', []).

/* Drivers controller */
controller('userController', function($scope, userAPIService, $location) {

    let eId = $location.search().eId;
    $scope.formData = [{
            colspan: 4,
            cols: [
                { class: 'heading', value: "Directorate Of Geology & Mining Uttar Pradesh Minor Mineral Concession Rules 1963 e-Transit Pass For Transportation & Minor Mineral See Rules 70(1) Form MM1" }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading', value: "1.eMM11:" },
                { type: 'input', value: '' },
                { class: 'heading', value: "2. Name Of Lessee /Permit Holder:" },
                { type: 'input', value: '' }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading', value: "3. Mobile Number Of Lessee:" },
                { type: 'input', value: '' },
                { class: 'heading', value: "4. Tin Number:" },
                { type: 'input', value: '' }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading', value: "5. Lessee Id:" },
                { type: 'input', value: '' },
                { class: 'heading', value: " 6. Lease Details [Address,Village,(Gata/Khand),Area]" },
                { type: 'input', value: '' }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading', value: "7. Tehsil Of Lease:" },
                { type: 'input', value: '' },
                { class: 'heading', value: "8. District Of Lease:" },
                { type: 'input', value: '' }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading', value: "9. QTY Transported in Cubic Meter:" },
                { type: 'input', value: '' },
                { class: 'heading', value: "10. Name Of Mineral:" },
                { type: 'input', value: '' }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading', value: "11. Loading From:" },
                { type: 'input', value: '' },
                { class: 'heading', value: "12. Destination (Delivery Address):" },
                { type: 'input', value: '' }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading', value: "13. Distance(Approx in K.M.):" },
                { type: 'input', value: '' },
                { class: 'heading', value: "14. eTP Generated On:" },
                { type: 'input', value: '' }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading', value: "15. eMM11 Valid Upto:" },
                { type: 'input', value: '' },
                { class: 'heading', value: "16. Traveling Duration:" },
                { type: 'input', value: '' }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading', value: "17. Destination District:" },
                { type: 'input', value: '' }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading', value: "18.Pits Mouth Value(Rs/m3 &Rs/Ton for Silica sand):" },
                { type: 'input', value: '' }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading', value: "1.eMM11:" },
                { type: 'input', value: '' },
                { class: 'heading', value: "2. Name Of Lessee /Permit Holder:" },
                { type: 'input', value: '' }
            ]
        },
        {
            colspan: 4,
            cols: [
                { class: 'heading', value: "Details Of Registered Vehicle" }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading', value: "1. Registration Number :" },
                { type: 'input', value: '' },
                { class: 'heading', value: "2. Type Of Vehicle:" },
                { type: 'input', value: '' }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading', value: "3. Name Of Driver :" },
                { type: 'input', value: '' },
                { class: 'heading', value: "4. Mobile Number Of Driver:" },
                { type: 'input', value: '' }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading', value: "5. DL Number Of Driver:" },
                { type: 'input', value: '' }
            ]
        },
        {
            colspan: 4,
            cols: [
                { class: 'heading', value: "This eMM11 is valid up to:-20-01-2020 08:08:24 PM" }
            ]
        }
    ];

    ((eId) => {
        if (eId) {
            userAPIService.getData(eId).success(function(response) {
                console.log('response', response);
                $scope.formData = response.data.clientData;
            });
            $scope.codeUrl = userAPIService.getQRUrl(window.location.href);
        }
    })(eId)

    $scope.addData = () => {
        console.log('$scope.formData', $scope.formData);
        userAPIService.addData($scope.formData).success(function(response) {
            $location.path('/Registration/PrintRegistrationFormVehicleCheckValidOrNot.aspx').search("eId", response.data);

        });
    }

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

    // getUsers();

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