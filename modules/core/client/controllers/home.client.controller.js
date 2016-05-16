'use strict';

angular.module('core').controller('HomeController', ['$scope', 'listingResolve', 'Authentication',
  function ($scope, Authentication, listings) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.listings = listings;
  }
]);
