var app = angular.module('nbaRoutes');

app.service('teamService', function($http, $q, $log){
	//his method is going to take in a gameObject as the parameter. That gameObj will eventually have data about each individual game 
	//that we'll send to parse.
	this.addNewGame = function(gameObj) { debugger
		//gameObj.homeTeam, points to the teams specific name 
		var url = "https://api.parse.com/1/classes/" + gameObj.homeTeam;
		
		//If it is, set a property called 'won' on the gameObj to true
		//check to see if the home team score (gameObj.homeTeamScore) is greater then the opponents core (gameObj.opponentScore)

		
		if (parseInt(gameObj.homeTeamScore) > parseInt(gameObj.opponentScore)) {
			gameObj.won = true;
		} else {
			gameObj.won = false;
		}
			//POST request to parse adding the gameObj to our URL
			//return the result of making an $http request with the 'method' of 'POST', the 'url' being the URL variable, 
			//and 'data' being our gameObj.
			return $http.post(url, gameObj)
  			.success(function(data) {
    // this callback will be called asynchronously
    // when the response is available
    		console.log(data)
  			})
  			.error(function(data) {
  				console.log(data)
  			})
	}

	this.getTeamData = function(team) { 
		var deferred = $q.defer();
		var url = 'https://api.parse.com/1/classes/' + team;

		$http.get(url)
			//We're not going to return that object but instead modify the data
			//add a .then to the end of the $http request
			//.then function accepts 'data' as the parameter, data will be the actual data we get back 
			.then(function(response) {
				//variable called results is equal to data.data.results, which is the actual games the team has played.
				//which is an array of game objects
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
				//add a 'wins' property to the results array and set it equal to our wins variable and let's also set a 'losses' 
				//property on our results array and set it equal to our losses variable
				teamData.wins = wins;
				teamData.losses = losses
	
				// console.log(teamData)
				deferred.resolve(teamData);
			})
			return deferred.promise;
	}

});