var app = angular.module('blogs', [])

app.factory('blogposts', ['$http', function($http){
	return $http.get('/allBlogs');
}]);

app.filter('titleUrl', function(){
	return function(x) {
		x = x.toLowerCase()
		return x.replace(/\W+/g, '-')
	}

});

app.controller('BlogController', ['$scope', 'blogposts', function($scope, blogposts){
	blogposts.success(function(data){
		$scope.blogData = JSON.parse(data['blogs']);
		$scope.filteredBlogs = $scope.blogData;
	})
	$scope.filteredBlogs = $scope.blogData;
	$scope.filterBlogs = function(topic){
		var blogs = $scope.blogData;
		var filtered_blogs = []
		if(topic === 'all'){
			filtered_blogs = $scope.blogData;
			sortBlogsById(filtered_blogs)
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
sortBlogsById = function (sortedBlogData) {
	sortedBlogData.sort(function(a,b){
		if(a['pk']>b['pk'])
			return -1;
		else
			return 1;
	});
}

sortBlogsByDate = function(sortedBlogData, orderBy){
	sortedBlogData.sort(function(a,b){
		if(a['fields']['date']<=b['fields']['date'])
			return -1;
		else
			return 1;
	});
	if(orderBy==='desc')
		sortedBlogData.reverse()
}

sortBlogsByAlpha = function(sortedBlogData, orderBy){
	sortedBlogData.sort(function(a,b){
		if(a['fields']['title']<=b['fields']['title'])
			return -1;
		else
			return 1;
	});
	if(orderBy==='desc')
		sortedBlogData.reverse()
}