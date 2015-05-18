var app = angular.module('nbaRoutes', ['ngRoute']);

app.config(function($routeProvider, $httpProvider){
  $httpProvider.interceptors.push('httpRequestInterceptor');

	//$routesProvider has methods that are used to CONFIGURE ROUTES
  $routeProvider 

	// Configuration blocks - get executed during the provider registrations and configuration phase.  
	//This is to prevent accidental instantiation of services before they have been fully configured.


		//Add a new route definition to the $route service.
		//.WHEN(PATH, OBJECT / WITH PROPERTIES)
		//First Arg is the Path, the other is the route Object which has the controller property and the template property
		.when('/', {
			templateUrl :  'js/home/homeTmpl.html',
			controller : 'homeCtrl'
		})
		//all three teams (Jazz, Lakers, Heat) are going to be using the same Controller and the same Template.
		//when the user visits yoursite.com/teams/utahjazz, in our controller $routeParams.team is going to be equal to 'utahjazz'.
		//This allows us to then pass in the specific team into our getTeamData method that's on our service and get only that teams data
		//The menu link to teams which will be caught by :team in our router
		.when('/teams/:team', {
			templateUrl : 'js/teams/teamTmpl.html',
			controller : 'teamCtrl',
			 //resolve will call a method on our service, resolve that method's promise, then make the data that's being
			 //returned from that method available immediately in our controller
			 resolve: {
			 					//method called teamData which returns the promise that gets returned from teamService.getTeamData().
			 					//call the getTeamData method on our teamService service. That will return a promise which will then 
			 					//be resolved and the data we get back from that promise will then be available to us in our controller as teamData. 
                teamData: function($route, teamService) { 
                    return teamService.getTeamData($route.current.params.team);
                },
                teamdata: function() {
                    return 'teamData()';
                }

				}
			})

		.otherwise('/');
});


