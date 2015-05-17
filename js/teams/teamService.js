var app = angular.module('nbaRoutes');

app.service('teamService', function($http, $q){

	this.addNewGame = function(gameObject) {
		var url = "https://api.parse.com/1/classes/" + gameObj.homeTeam;
		
		gameObj.homeTeamScore = parseInt(gameObj.homeTeamScore);
		gameObj.opponentScore = parseInt(gameObj.opponentScore);
		
		if (gameObj.homeTeamScore > gameObj.opponentScore) {
			gameObj.won = true;
		} else {
			gameObj.won = false;
		}

			$http.post(url, gameObj);
	}

	this.getTeamData = function(team) { 
		var deferred = $q.defer();
		var url = 'https://api.parse.com/1/classes/' + team;

		$http.get(url)
			
			.then(function(response) {
				var teamData = response.data.results;
				var wins = 0;
				var losses = 0;
				
				for(var i = 0; i < teamData.length; i += 1) {
					if (teamData[i].won === true) {
						var wins = wins + 1;
					} else if (teamData[i].won !== true) {
						var losses = losses + 1;
					}
				}

				teamData.push({
					totalWins : wins
				});
				teamData.push({
					totalLosses : losses
				});
				deferred.resolve(teamData);
			})
			return deferred.promise;
	}

});