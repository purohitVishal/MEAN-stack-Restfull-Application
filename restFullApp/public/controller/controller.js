var myApp = angular.module('myApp',[]);
myApp.controller('appCtrl',['$scope','$http',appCtrlFun]);

function appCtrlFun($scope,$http){
	console.log('hello from angular controller')

function refresh(){
$http.get('/contactList').then(function(response){
	console.log('i got the data i requested');
	
	$scope.contactList=response.data;
	 
});
}

refresh();

$scope.addContact = function(){
		console.log($scope.contact);
		$http.post('/contactList',$scope.contact).then(function(response){
			console.log(response);

			refresh();
		});
};
	
	$scope.remove = function(id){
		console.log(id);
		$http.delete('/contactList/' + id).then(function(response){
			refresh();
		});

	};
	$scope.edit = function(id){
		console.log(id);
		$http.get('/contactList/'+id).then(function(response){
			$scope.contact = response.data;
		});
	};

	$scope.update = function(){
		console.log($scope.contact._id);
		$http.put('/contactList/'+$scope.contact._id,$scope.contact).then(function(response){
			 
			refresh();
		})
	}
	

}