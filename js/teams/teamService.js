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
			
			.then(function(data) {
				var results = data.data.results;
				var wins = 0;
				var losses = 0;
				
				for(var i = 0; i < results.length; i += 1) {
					if (results[i].won === true) {
						var wins = wins + 1;
					} else if (results[i].won !== true) {
						var losses = losses + 1;
					}
				}

				results.push({
					totalWins : wins
				});
				results.push({
					totalLosses : losses
				});
				deferred.resolve(results);
			})
			return deferred.promise;

	}

});