var app = angular.module('nbaRoutes');

app.controller('teamCtrl', function($scope, $routeParams, $log, teamService, teamData){
	$scope.teamData = teamData;
	// $scope.logoPath = 'images/jazz-logo.png';

	if ($routeParams.team === 'utahjazz') { 
		$scope.teamData.map(function(item){ 
			return item.homeTeam = 'Utah Jazz';
		});
		$scope.logoPath = 'images/jazz-logo.png';
	} else if ($routeParams.team === 'losangeleslakers') {
		$scope.teamData.map(function(item){ 
			return item.homeTeam = 'Los Angeles Lakers';
		});
		$scope.logoPath = 'images/lakers-logo.png';
	} else if ($routeParams.team === 'miamiheat') {
		$scope.teamData.map(function(item){ 
			return item.homeTeam = 'Miami Heat';
		});
		$scope.logoPath = 'images/heat-logo.png';
	}

	$scope.newGame = {};
	
	$scope.showNewGameForm = false;

	$scope.toggleNewGameForm = function() {
		if ($scope.showNewGameForm) {
			$scope.showNewGameForm = false;
		} else if (!$scope.showNewGameForm) {
			$scope.showNewGameForm = true;
		}
	}

	$scope.submitGame = function() {
		$scope.newGame.homeTeam = $scope.homeTeam.split(' ').join('').toLowerCase();
		teamService.addNewGame($scope.newGame);
	}
});