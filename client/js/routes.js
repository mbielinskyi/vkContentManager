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
      when('/friends', {
        templateUrl: './templates/pages/friends.html',
        controller: 'FriendsController'
      }).   
      when('/groups', {
        templateUrl: './templates/pages/groups.html',
        controller: 'GroupsController'
      }).  
      when('/languages', {
        templateUrl: './templates/pages/langs.html',
        controller: 'LanguagesController'
      }).  
      otherwise({
        redirectTo: '/'
      });
  }]);