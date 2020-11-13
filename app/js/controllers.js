angular.module('UserApp.controllers', []).

/* Drivers controller */
controller('userController', function($scope, userAPIService, $location) {

    let eId = $location.search().eId;
    $scope.showFormType = false;
    $scope.formData = [{
            colspan: 1,
            cols: [
                { class: 'heading column', value: "1. ISTP No." },
                { class: 'column', type: 'input', value: '', name: 'emm11' },
                { class: 'heading column', value: "2. Name Of Transporter:" },
                { class: 'column', type: 'input', value: '', name: 'name' }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading column', value: "3. Transporter Id:" },
                { class: 'column', type: 'input', value: '', name: 'mobile' },
                { class: 'heading column', value: "4. Mobile Number Of Transporter:" },
                { class: 'column', type: 'input', value: '', name: 'tin' }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading column', value: "5. Transporter Details [Address]:" },
                { class: 'column', type: 'input', value: '', name: 'lessee' },
                { class: 'heading column', value: " 6. QTY Transported in Cubic Meter: " },
                { class: 'column', type: 'input', value: '', name: 'address' }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading column', value: "7. Name Of Mineral:" },
                { class: 'column', type: 'input', value: '', name: 'tehsil' },
                { class: 'heading column', value: "8. Destination District :" },
                { class: 'column', type: 'input', value: '', name: 'distt' }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading column', value: "9. Distance(Approx in K.M.):" },
                { class: 'column', type: 'input', value: '', name: 'qty' },
                { class: 'heading column', value: "10. Traveling Duration :" },
                { class: 'column', type: 'input', value: '', name: 'mineral' }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading column', value: "11. Transit Pass Generated On:" },
                { class: 'column', type: 'input', value: '', name: 'loading' },
                { class: 'heading column', value: "12. Transit Pass Valid Upto:" },
                { class: 'column', type: 'input', value: '', name: 'dest' }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading column', value: "13. Loading From(Origin District):" },
                { class: 'column', type: 'input', value: '', name: 'dist' },
                { class: 'heading column', value: "14. Loading From(Origin State):" },
                { class: 'column', type: 'input', value: '', name: 'etp' }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading column', value: "15. Origin Transit Pass No :" },
                { class: 'column', type: 'input', value: '', name: 'valid' },
                { class: 'heading column', value: "16. Origin Transit Pass Generation Date :" },
                { class: 'column', type: 'input', value: '', name: 'duration' }
            ]
        },
        {
            colspan: 4,
            cols: [
                { class: 'title columnFull', value: "Details Of Vehicle" }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading column', value: "1. Vehicle Number : " },
                { class: 'column', type: 'input', value: '', name: 'reg' },
                { class: 'heading column', value: "2. Type Of Vehicle:" },
                { class: 'column', type: 'input', value: '', name: 'type' }
            ]
        },
        {
            colspan: 1,
            cols: [
                { class: 'heading column', value: "3. Name Of Driver : " },
                { class: 'column', type: 'input', value: '', name: 'driver' },
                { class: 'heading column', value: "4. Mobile Number Of Driver: " },
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
                { class: 'heading1 column', value: "This ISTP is valid up to" },
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
            $scope.codeUrl = userAPIService.getQRUrl(window.location.origin + '/app/#/Transporter/PrintTransporterFormVehicleCheckValidOrNot.aspx?eId=' + eId);
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
        $scope.printData.code = Math.random().toString(36).substr(2, 5).toUpperCase();
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