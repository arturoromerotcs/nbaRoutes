var app = angular.module('nbaRoutes');

app.controller('teamCtrl', function($scope, $routeParams, $log, teamService, teamData){
	//put that data on the scope.
	//now that data is on our scope and can be accessed in the view.
	$scope.teamData = teamData;
	//property on the $scope object called newGame
	//the object that is going to be passed to teamSerivce.addNewGame later 
	$scope.newGame = {};

	$scope.showNewGameForm = false;
	//toggleNewGameForm which takes the current value of $scope.showNewGameForm and makes it the opposite of what it currently is
	//REFACTOR?
	$scope.toggleNewGameForm = function() {
		if ($scope.showNewGameForm) {
			$scope.showNewGameForm = false;
		} else if (!$scope.showNewGameForm) {
			$scope.showNewGameForm = true;
		}
	}
	//We set up router so that whatever team is in the URL, that value would be the current value of $routeParams.team in 
	//our controller.
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
 //method on our scope object that will be called whenever someone submits a new game. submitGame
	$scope.submitGame = function(newGame) { debugger
		//take homeTeam property that we set on the scope earlier and strip out the spaces so we can use it as an endpoint in our restAPI
		//Add a property onto our newGame object that is already on the scope called homeTeam and set it equal to Lowercase one word.
		$scope.newGame.homeTeam = $scope.teamData[0].homeTeam.split(' ').join('').toLowerCase();
		//Now we want to call the addNewGame method on our teamService method. So call addNewGame and pass it $scope.newGame
		teamService.addNewGame($scope.newGame)
		//You should have noticed it returns a promise. That means immediately after we call addNewGame we can call .then()
			.then(function(){
				//Call .then and pass a callback function, this function is then going to call the getTeamData 
				//You should notice that the getTeamData method is also returning a promise
				teamService.getTeamData($scope.newGame.homeTeam)
				  //so call .then immediately after you call getTeamData() and give it a callback function which accepts parameter the data returned
					.then(function(response){
						//set a few properties on our scope based off the data
						$scope.teamData = response
						//reset $scope.newGame to be an empty object
						$scope.newGame = {}
						//$scope.showNewGameForm back to false
						$scope.showNewGameForm = false;
					})
			})
	}
	$log.log($scope);
});