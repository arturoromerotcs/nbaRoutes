var app = angular.module('nbaRoutes');

app.controller('teamCtrl', function($scope, $routeParams, teamService){

	$scope.getTeamData = function() { 
		teamService.getTeamData('losangeleslakers')
			.then(function(data) {
					console.log(data);
			})
	}

	$scope.getTeamData()

});