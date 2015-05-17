var app = angular.module('nbaRoutes', ['ngRoute']);

app.config(function($routeProvider, $httpProvider){
  $httpProvider.interceptors.push('httpRequestInterceptor');

//$routesProvider has methods that are used to CONFIGURE ROUTES
  $routeProvider 

// Configuration blocks - get executed during the provider registrations and configuration phase.  
//This is to prevent accidental instantiation of services before they have been fully configured.


//Adds a new route definition to the $route service.
//.WHEN(PATH, OBJECT / WITH PROPERTIES)
//First Arg is the Path, the other is the route Object which has the controller property and the template property
		.when('/', {
			templateUrl :  'js/home/homeTmpl.html',
			controller : 'homeCtrl'
		})

		.when('/teams/:team', {
			templateUrl : 'js/teams/teamTmpl.html',
			controller : 'teamCtrl',
			resolve : {teamData : function(teamService, $route) {
				teamService.getTeamData($route.current.params.team)
					.then(function(data) {
						console.log(data);
					})
				}
			}
		})

		.otherwise('/');
});


