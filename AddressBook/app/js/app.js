//app/lib/app.js:
var addressbookModule = angular.module('addressbookModule', ['ngResource']);

addressbookModule.config(function ($routeProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);
    $routeProvider.when('/',
        {
            templateUrl: '/app/templates/listContacts.html',
            controller: 'ContactController'
        })

    $routeProvider.when('/add',
        {
            templateUrl: '/app/templates/addContact.html',
            controller: 'AddContactController'
        })


    $routeProvider.when('/edit/:id',
        {
            templateUrl: '/app/templates/editContact.html',
            controller: 'EditContactController'
        })

    $routeProvider.when('/about',
       {
           templateUrl: '/app/templates/about.html',
       })
});

addressbookModule.factory('ContactFactory', function ($resource) {
        return $resource('/api/contact/:id', { id: '@Id' }, { create: { method: 'POST' } }, { update: { method: 'PUT' } }, { remove: { method: 'DELETE' } });
         //  return $resource('/api/contact/:id', { id: '@Id' });

    });


addressbookModule.controller('ContactController', function ($scope, ContactFactory, $location,$routeParams) {

    $scope.contacts = ContactFactory.query();
    
       $scope.editContact = function (id) {
        console.log(id);
        $location.path('/edit/' + id);
    }
   
    });

addressbookModule.controller('AddContactController', function ($scope, ContactFactory, $location, $routeParams) {

   // $scope.contact = {};
    $scope.save = function () {
        $scope.contact.$save($scope.contact);
        //ContactFactory.create($scope.contact);
        $location.path('/');
    }
   

});


addressbookModule.controller('EditContactController', function($scope, $location, $routeParams, ContactFactory) {

    $scope.contact = ContactFactory.get({ id: $routeParams.id });
    console.log(({ id: $routeParams.id }));
    $scope.save = function () {
        $scope.contact.$save();
        $location.path('/');
    }
});


