
var myApp = angular.module('myApp', [
  'ngRoute']);

myApp.controller('HomeController',function($scope,$http,$timeout){
	$scope.src = "/api/search";
	$scope.searchType = 'artist';//default search tyoe
	$scope.propertyName = 'name';//default sorting criteria
	$scope.reverse = true; // Toggles Ascending or Descending
	$scope.sortBy = function(propertyName) {			//toggles sortinge
    $scope.propertyName = propertyName;
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
  };
	var data = {'q':'ricky','type':$scope.searchType}
	$http.post($scope.src,data)	
	.then(response =>{

		$scope.searchResult = response.data;//find default search results
	})

	$scope.selectType = function(searchType){//search data when user selects a click type

		
		if($scope.term.length > 0){//only search if user has entered query in the input
			data = {'q':$scope.term,'type':searchType}
			$http.post($scope.src,data)	
			.then(response =>{

				$scope.searchResult = response.data;
			})
		}
	}


})

