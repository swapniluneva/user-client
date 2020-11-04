angular.module('UserApp.controllers', []).

/* Drivers controller */
controller('userController', function($scope, userAPIService, $location) {

    let eId = $location.search().eId;
    $scope.showFormType = false;
    $scope.formData = [{
            colspan: 4,
            cols: [
                { class: 'title columnFull', value: "Directorate Of Geology & Mining Uttar Pradesh Minor Mineral Concession Rules 1963 e-Transit Pass For Transportation & Minor Mineral See Rules 70(1) Form MM1" }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading column', value: "1.eMM11:" },
                { class: 'column', type: 'input', value: '', name: 'emm11' },
                { class: 'heading column', value: "2. Name Of Lessee /Permit Holder:" },
                { class: 'column', type: 'input', value: '', name: 'name' }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading column', value: "3. Mobile Number Of Lessee:" },
                { class: 'column', type: 'input', value: '', name: 'mobile' },
                { class: 'heading column', value: "4. Tin Number:" },
                { class: 'column', type: 'input', value: '', name: 'tin' }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading column', value: "5. Lessee Id:" },
                { class: 'column', type: 'input', value: '', name: 'lessee' },
                { class: 'heading column', value: " 6. Lease Details [Address,Village,(Gata/Khand),Area]" },
                { class: 'column', type: 'input', value: '', name: 'address' }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading column', value: "7. Tehsil Of Lease:" },
                { class: 'column', type: 'input', value: '', name: 'tehsil' },
                { class: 'heading column', value: "8. District Of Lease:" },
                { class: 'column', type: 'input', value: '', name: 'distt' }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading column', value: "9. QTY Transported in Cubic Meter:" },
                { class: 'column', type: 'input', value: '', name: 'qty' },
                { class: 'heading column', value: "10. Name Of Mineral:" },
                { class: 'column', type: 'input', value: '', name: 'mineral' }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading column', value: "11. Loading From:" },
                { class: 'column', type: 'input', value: '', name: 'loading' },
                { class: 'heading column', value: "12. Destination (Delivery Address):" },
                { class: 'column', type: 'input', value: '', name: 'dest' }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading column', value: "13. Distance(Approx in K.M.):" },
                { class: 'column', type: 'input', value: '', name: 'dist' },
                { class: 'heading column', value: "14. eTP Generated On:" },
                { class: 'column', type: 'input', value: '', name: 'etp' }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading column', value: "15. eMM11 Valid Upto:" },
                { class: 'column', type: 'input', value: '', name: 'valid' },
                { class: 'heading column', value: "16. Traveling Duration:" },
                { class: 'column', type: 'input', value: '', name: 'duration' }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading column', value: "17. Destination District:" },
                { class: 'column', type: 'input', value: '', name: 'destination' }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading column', value: "18.Pits Mouth Value(Rs/m3 &Rs/Ton for Silica sand):" },
                { class: 'column', type: 'input', value: '', name: 'pmv' }
            ]
        },
        {
            colspan: 4,
            cols: [
                { class: 'title columnFull', value: "Details Of Registered Vehicle" }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading column', value: "1. Registration Number :" },
                { class: 'column', type: 'input', value: '', name: 'reg' },
                { class: 'heading column', value: "2. Type Of Vehicle:" },
                { class: 'column', type: 'input', value: '', name: 'type' }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading column', value: "3. Name Of Driver :" },
                { class: 'column', type: 'input', value: '', name: 'driver' },
                { class: 'heading column', value: "4. Mobile Number Of Driver:" },
                { class: 'column', type: 'input', value: '', name: 'driverMobile' }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading column', value: "5. DL Number Of Driver:" },
                { class: 'column', type: 'input', value: '', name: 'dl' }
            ]
        },
        {
            colspan: 2,
            cols: [
                { class: 'heading1 column', value: "This eMM11 is valid up to:-" },
                { class: 'heading2 column', class: 'column', type: 'input', value: "", name: 'emm11Upto' }
            ]
        }
    ];
    $scope.printData = {};
    ((eId) => {
        if (eId) {
            userAPIService.getData(eId).success(function(response) {
                $scope.printData = response.data.clientData;
            });
            $scope.codeUrl = userAPIService.getQRUrl(window.location.origin + '/app/#/Registration/PrintRegistrationFormVehicleCheckValidOrNot.aspx?eId=' + eId);
        } else {
            let code = '';
            while (code != '10635') {
                code = prompt('Enter code to proceed');
            }
            $scope.showFormType = true;
        }
    })(eId)

    $scope.addData = () => {
        console.log('$scope.formData', $scope.formData, $scope.printData);
        userAPIService.addData($scope.printData).success(function(response) {
            $location.path('/Registration/print').search("eId", response.data);

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