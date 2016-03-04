vkApp.modules.main.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: './templates/pages/login.html',
        controller: 'LoginController'
      }).
      when('/post', {
        templateUrl: './templates/pages/content.html',
        controller: 'ContentController'
      }).      
      otherwise({
        redirectTo: '/'
      });
  }]);