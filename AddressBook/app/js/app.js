//app/lib/app.js:
var addressbookModule = angular.module('addressbookModule', [])
    
.config(function ($routeProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);

    $routeProvider.when('/',
        {
            templateUrl: '/app/templates/start.html',
            controller: 'PersonController'
        }
        )

    $routeProvider.when('/new',
        {
            templateUrl: '/app/templates/newPerson.html',
            controller: 'PersonController'
        }
        )

    $routeProvider.when('/about',
       {
           templateUrl: '/app/templates/about.html',

       }
       )

});



addressbookModule.factory('personData', function ($http,$log) {
    return {
        getPersons: function (successcb) {
            $http({ method: 'GET', url: 'http://localhost:8000/api/person' })
                    .success(function (data, status, headers, config) {
                        $log.info(data, status, headers(), config);
                        successcb(data);
                    })
                    .error(function (data, status, headers, config) {
                        $log.warn(data, status, headers, config);
                    });
            }
    };
});



//controllers
addressbookModule.controller('PersonController', function ($scope,personData) {
    $scope.appname = "Awesome Addressbook";
   
    personData.getPersons(function (persons) {
        $scope.persons = persons;
    });
});