var app = angular.module('nbaRoutes');

app.controller('teamCtrl', function($scope, $routeParams, teamService){

	$scope.getTeamData = function() { 
		var data = teamService.getTeamData('losangeleslakers');
		console.log(data)
	}

	$scope.getTeamData()

});