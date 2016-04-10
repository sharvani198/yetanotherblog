var app = angular.module('blogs', [])

app.factory('blogposts', ['$http', function($http){
	return $http.get('/allBlogs');
}]);

app.service('comments', ['$http', function($http){

}])

app.controller('CommentController', ['$scope','comments', function($scope, comments){
	
}]);

app.controller('BlogController', ['$scope', 'blogposts', function($scope, blogposts){
	blogposts.success(function(data){
		$scope.blogData = JSON.parse(data['blogs']);
		$scope.filteredBlogs = $scope.blogData;
		$scope.sortedBlogs = $scope.blogData;
	})
	$scope.filteredBlogs = $scope.blogData;
	$scope.sortedBlogs = $scope.blogData;
	$scope.filterBlogs = function(topic){
		var blogs = $scope.blogData;
		var filtered_blogs = []
		if(topic === 'all'){
			filtered_blogs = $scope.sortedBlogs;
		} else{
			for(var i =0;i<blogs.length;i++){
				var t = blogs[i]['fields']['topic']
				if(t===topic){
					filtered_blogs.push(blogs[i])
				}
			}			
		}
		$scope.filteredBlogs = filtered_blogs;
	}
	$scope.sortBlogs = function(sortBy,orderBy){
		if(sortBy==='date')
			sortBlogsByDate($scope.filteredBlogs, orderBy);
		else if(sortBy === 'alpha')
			sortBlogsByAlpha($scope.filteredBlogs,orderBy);
	}
	$scope.showMe = true;
    $scope.toggleFunc = function() {
        $scope.showMe = !$scope.showMe;
    }
}]);
sortBlogsByDate = function(blogData, orderBy){
	blogData.sort(function(a,b){
		if(a['fields']['date']<=b['fields']['date'])
			return -1;
		else
			return 1;
	});
	if(orderBy==='desc')
		blogData.reverse()
}

sortBlogsByAlpha = function(blogData, orderBy){
	blogData.sort(function(a,b){
		if(a['fields']['title']<=b['fields']['title'])
			return -1;
		else
			return 1;
	});
	if(orderBy==='desc')
		blogData.reverse()
}