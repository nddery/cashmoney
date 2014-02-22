'use strict';
angular.module('modules.forms', [])
  .directive('contactForm', function() {
    return {
      restrict: 'E'
      ,replace: true
      ,transclude: true
      ,templateUrl: 'modules/forms/contact/contact.html'
    }
  })

  .controller('ContactFormCtrl', function ContactFormCtrl($scope, $http, $sce) {
    $scope.success = false;
    $scope.httpError = false;

    $scope.send = function(){
      $http.post('http://proj.nddery.ca/cashmoney/v2/modules/forms/contact/sendmail.php', angular.toJson($scope.values))
        .success(function(data){
          console.log(data);
          if(data.form_ok){
            $scope.success = true;
          }
          else{
            $scope.httpError = true;
          }
        })
        .error(function(data){
          $scope.httpError = true;
        });
    }

    $scope.email = function(name, domain, extension){
      if (!document.write) return false;
      if (document.write) {
        var name; var domain; var extension;
        return $sce.trustAsHtml('<a href="' + 'mailto:' + name + '@' + domain + '.' + extension + '">' + name + '@' + domain + '.' + extension + '<\/a>');
      }
    }
  });
