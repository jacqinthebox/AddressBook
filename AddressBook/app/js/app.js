//app/lib/app.js:
var addressbookModule = angular.module('addressbookModule', []);

addressbookModule.factory('personData', function ($http) {
    return {
        getPersons: function (successcb) {
            $http({ method: 'GET', url: 'http://localhost:8000/api/person' })
                    .success(function (data, status, headers, config) {
                        successcb(data);
                    })
                    .error(function (data, status, headers, config) {
                        $log.warn(data, status, headers, config);
                    });
            }
    };
});


addressbookModule.controller('PersonController', function ($scope,personData) {
    $scope.appname = "Awesome Addressbook";
   
    personData.getPersons(function (persons) {
        $scope.persons = persons;
    });
});