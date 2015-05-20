var app = angular.module('nbaRoutes');

app.controller('homeCtrl', function($scope, homeService, utahJazzData, losAngelesLakersData, miamiHeatData){
	$scope.utahGameData = utahJazzData;
	$scope.laGameData = losAngelesLakersData;
	$scope.heatGameData = miamiHeatData;
});