vkApp.modules.main.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: './templates/pages/login.html',
        controller: 'LoginController'
      }).
      when('/post', {
        templateUrl: './templates/pages/post.html',
        controller: 'PostingController'
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