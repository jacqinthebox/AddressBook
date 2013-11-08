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
    return $resource('/api/contact/:id', { id: '@Id' },
        { update: { method: 'PUT' } }
        );

    });


addressbookModule.controller('ContactController', function ($scope, ContactFactory, $location,$routeParams) {

    $scope.contacts = ContactFactory.query();
    
       $scope.editContact = function (id) {
        console.log(id);
        $location.path('/edit/' + id);
       }

      
       $scope.deleteContact = function (id) {
           var contactToRemove = ContactFactory.get({ id: id }, function () {
               console.log(id);
               ContactFactory.remove(contactToRemove);

           });
       }
   
    });

addressbookModule.controller('AddContactController', function ($scope, ContactFactory, $location, $routeParams) {
        $scope.save = function () {
            //default method from ngresource
            ContactFactory.save($scope.contact);
            $location.path('/');
    }
   
});


addressbookModule.controller('EditContactController', function($scope, $location, $routeParams, ContactFactory) {
    //populate the boxes
    $scope.contact = ContactFactory.get({ id: $routeParams.id });

    $scope.save = function () {
        //added the update method in ContactsFactory, otherwise it will create a new record instead of PUT.
        ContactFactory.update($scope.contact);
        $location.path('/');
     }
    
});


