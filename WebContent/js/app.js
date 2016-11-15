var retailApp = angular.module('retailApp', [ 'ngRoute' ])
retailApp.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'home.html'
	}).when('/signUp', {
		templateUrl : 'signUp.html',
		controller : 'signController'
	}).when('/Electronics', {
		templateUrl : "Electronics.html"

	}).when('/Men', {
		templateUrl : "Men.html"

	}).when('/productDetails', {
		templateUrl : "productDetails.html"

	}).when('/cartDetails', {
		templateUrl : "cartDetails.html"

	}).when('/sellerDetails', {
		templateUrl : "seller.html"

	}).when('/sellerTwoDetails', {
		templateUrl : "sellerTwo.html"

	}).when('/sellerThreeDetails', {
		templateUrl : "sellerThree.html"

	}).when('/allReviews', {
		templateUrl : "allReviews.html"

	}).otherwise({
		redirectTo : '/'
	});
});

retailApp.factory('displayLoginService', function() {

	var data = {
		isLoginVisible : false
	};

	return {
		isLoginVisible : function() {
			return data.isLoginVisible;
		},
		setIsLoginVisible : function(isLoginVisible) {
			data.isLoginVisible = isLoginVisible;
		}
	};
});

retailApp.controller('loginCtrl', function($scope, $location, $http, $timeout,
		displayLoginService,$rootScope) {
	$scope.test = 'test';
	//$scope.isLoginVisible = displayLoginService.isLoginVisible();
	$scope.showSpinner = false;
	$scope.cancelLogin = function(){
		$rootScope.isLoginVisible = false;
	};
	$scope.login = function() {
		$scope.showSpinner = true;
		var username = $scope.username;
		var password = $scope.password;
		$scope.errorMsg = '';
		if(!$scope.username && !$scope.password)
			{
			     $scope.errorMsg='Please Enter Usename and Password'
			     document.getElementById("userName").focus();
			}
		else if(!$scope.password)
		{
			$scope.errorMsg='Please Enter Password'
				 document.getElementById("Password").focus();
		}
		else if ($scope.username == 'admin' && $scope.password == 'admin') {
			$http.get("login.json").then(function(response) {

				/*console.log((response.data.data.errorcode != '0000'));*/
				if (response.data.data.errorcode != '0000') {
					console.log("Error occurred!!!");
					$scope.errorMsg = response.data.data.message;

				} else {
					console.log("Login successful!!!");
					$scope.cancelLogin();
					$location.path('/home');
					

				}
			});
		} else  {
			$scope.errorMsg= 'User Name Or Password may be wrong'
				document.getElementById("userName").className += " input-error";
			document.getElementById("Password").className += " input-error";
		}
		

	};
	 $scope.signUp = function()
     {
    	 $location.path('/signUp')
     }

	$scope.hideMe = function() {
		$scope.show = true;
	}
	$scope.resetLoginData=function()
	{
		$scope.username=null;
		$scope.password=null;
		$scope.errorMsg=null;
		document.getElementById("Password").className = document.getElementById("Password").className.replace(" input-error","");
	}
});

retailApp.controller('displayLoginCtrl', function($scope, displayLoginService,$rootScope) {
	displayLoginService.setIsLoginVisible(false);
	$rootScope.isLoginVisible = false;
	$scope.displayLogin = function() {
		displayLoginService.setIsLoginVisible(true);
		$rootScope.isLoginVisible = true;
	}

});



/*retailApp.controller(carouselCtrl, function($scope)
		{
	      $scope.myInterval = 3000;
	      $scope.slides=
	    	  [

                    {
                    	image: 'image/Galaxy S5-latest-samsung-phones.jpg/400/200'
	                 },
	                 {
	                	 image: 'image/galaxy-alpha-unbox_1.jpg/400/200'
	                 }
	    	   ];
	
		});
*/
retailApp.controller('signCtrl', function($scope) {

	$scope.submitForm = function() {

		if ($scope.userForm.$valid) {
			alert('user registraion sucessfully');
		} else {
			console.log("error occured");
		}
	};

});

retailApp.controller('carouselCtrl',function($scope)
		{
		
});


retailApp.controller('searchCtrl', function($scope, $http) {
	$http.get("products.json").then(function(response) {
		$scope.searchInfo = response.data;
	});

});

retailApp.controller('homeCtrl', function($scope, $http,$location) {
	
	/*$scope.cart = [];*/
	$http.get('products.json').success(function(response) {
		$scope.products = response.products
	});
	
	$http.get('sellingProducts.json').success(function(response) {
		$scope.sellingProducts = response.sellingProducts
	});
	
	$http.get('bestProduct.json').success(function(response) {
		$scope.bestProduct = response.bestProduct
	});
	
	$http.get('electronicProduct.json').success(function(response) {
		$scope.electronicProduct = response.electronicProduct
	});
	
	$http.get('discountProduct.json').success(function(response) {
		$scope.discountProduct = response.discountProduct
	});
	
	$http.get('offerProduct.json').success(function(response) {
		$scope.offerProduct = response.offerProduct
	});
	
	$http.get('slider.json').success(function(response) {
		$scope.slider = response.slider
	});
	
	
	$scope.addCart = function(product) {
		var found = false;
		$scope.cart.forEach(function(item) {
			if (item.id == product.id) {
				item.quantity++;
				found = true;
			}
		});
		if (!found) {
			$scope.cart.push(angular.extend({
				quantity : 1
			}, product));
		}
	};
	$scope.getCartPrice = function() {
		var total = 0;
		$scope.cart.forEach(function(product) {
			total += product.price * product.quantity;
		});
		return total;
	};

	$scope.checkout = function() {
		$model.open({
			templateUrl : 'checkout.html',
			controller : 'checkoutCtrl',
			resolve : {
				totalAmount : $scope.getCartPrice
			}
		});
	};
	$scope.productDetails = function()
	{
		$location.path('/productDetails')
	}
	
	$scope.displayAllReview = function()
	{
		$location.path('/productDetails')
	}
	
});
var timer1;
function scrollDiv(divId, depl) 
{
	  var scroll_container = document.getElementById(divId);
	  scroll_container.scrollLeft -= depl;
	  timer1 = setTimeout('scrollDiv("'+divId+'", '+depl+')', 2);
}

var timer1;
function scrollBestProduct(divId, depl) 
{
	  var scroll_container = document.getElementById(divId);
	  scroll_container.scrollLeft -= depl;
	  timer1 = setTimeout('scrollDiv("'+divId+'", '+depl+')', 4);
}

var timer1;
function scrollHomeProduct(divId, depl) 
{
	  var scroll_container = document.getElementById(divId);
	  scroll_container.scrollLeft -= depl;
	  timer1 = setTimeout('scrollDiv("'+divId+'", '+depl+')', 6);
}

var timer1;
function scrollElecronicProduct(divId, depl) 
{
	  var scroll_container = document.getElementById(divId);
	  scroll_container.scrollLeft -= depl;
	  timer1 = setTimeout('scrollDiv("'+divId+'", '+depl+')', 8);
}

var timer1;
function scrollDiscountProduct(divId, depl) 
{
	  var scroll_container = document.getElementById(divId);
	  scroll_container.scrollLeft -= depl;
	  timer1 = setTimeout('scrollDiv("'+divId+'", '+depl+')', 8);
}

var timer1;
function scrollOfferProduct(divId, depl) 
{
	  var scroll_container = document.getElementById(divId);
	  scroll_container.scrollLeft -= depl;
	  timer1 = setTimeout('scrollDiv("'+divId+'", '+depl+')', 9);
}



retailApp.controller('CheckoutCtrl', function($scope, $totalAmount) {
	$scope.totalAmount = totalAmount;
	$scope.onSubmit = function() {
		$scope.processing = true;
	};
	$scope.stripeCallback = function(code, result) {
		$scpe.processing = false;
		$scope.hideAlerts();
		if (result.error) {
			$scope.stripeError = result.error.message;
		} else {
			$scope.stripeToken = result.id;
		}
	};
	$scope.hideAlerts = function() {
		$scope.stripeError = null;
		$scope.stripeToken = null;
	};

});

/*retailApp.controller('signCtrl' ,function($scope,displayLoginService,$rootScope)
		{
	$scope.cancelSign = function(){
		$rootScope.isLoginVisible = false;
	};
		$scope.sign = function()
		{
			var mobileNumber = $scope.mobileNumber;
			$scope.errorMsg = '';
			if(!$scope.mobileNumber)
				{
				$scope.errorMsg='Please Enter valid Number'
				     document.getElementById("mobileNumber").focus(); 
				}
			else
				{
				document.getElementById("mobileNumber").className += " input-error";
				}
		}
			});



retailApp.controller('signCtrl',function($scope)
{
	})*/

retailApp.controller('signController',function($scope,$location)
		{
	        
	});

retailApp.controller('featureCtrl',function($scope)
		{
	
	$scope.showFeatureElement = false;
	$scope.toggleFeatureElement = function() {
		$scope.showFeatureElement = $scope.showFeatureElement ? false : true;
	};
	        
	});

retailApp.controller('productDetailsCtrl', function($scope, $timeout,$http,$location, $anchorScroll) {

	$http.get('displayImages.json').success(function(response) {
		$scope.displayImages = response.displayImages.small_img
	});
	
	$scope.data= {
			
			small_image: 'image/apple-iphone-6-original-large-img.jpeg',
		    large_image: 'image/apple-iphone6-large-img.jpg'
	}
	
	 $scope.data_delayed = {}
	$timeout(function(){
	    $scope.data_delayed = {
	      small_image: 'image/apple-iphone-6-original-large-img.jpeg',
	      large_image: 'image/apple-iphone6-large-img.jpg'
	    }
	  }, 1000);
	
	$scope.showElement = false;
	$scope.toggleFiveStarElement = function() {
		$scope.showElement = $scope.showElement ? false : true;
	};
	
	$scope.changeImage = function name(imageId) {
		
		 var image= document.getElementById('phneImg')
	     image.src=  document.getElementById(imageId).src;
	}
	
	console.log("before product details ajax call");
	$http.get('productDetails.json').success(function(response) {
		console.log("inside product details sucess");
		$scope.productRating = response.productDetail.productRating;
		
		console.log("product rating values for five star count in sucess ::"+$scope.productRating.fiveStarCount);
		console.log("after product details ajax call");
		$scope.fiveStarCount =$scope.productRating.fiveStarCount ;
		$scope.fourStarCount= $scope.productRating.fourStarCount
		$scope.threeStarCount=$scope.productRating.threeStarCount;
		$scope.twoStarCount=$scope.productRating.twoStarCount;
		$scope.oneStarCount=$scope.productRating.oneStarCount;
		console.log("product rating values for five star count"+$scope.productRating.fiveStarCount)
var ratingArr= [$scope.fiveStarCount,$scope.fourStarCount,$scope.threeStarCount,$scope.twoStarCount,$scope.oneStarCount];
	
		
	 	function calculateMaximumRating(ratingArr)
	 {
		var i;
			var max;
			 
			 max=ratingArr[0];
			 for(i=1;i<5;i++)
				 {
				      if(ratingArr[i] > max)
				    	  {
				    	     max = ratingArr[i];
				    	  }
				 
				 }
			 return max;
	 };
	 $scope.maximumCount=calculateMaximumRating(ratingArr);
	
	$scope.fiveStar = $scope.fiveStarCount/$scope.maximumCount * 100;
	$scope.fourStar = $scope.fourStarCount/$scope.maximumCount * 100;
	$scope.threeStar =$scope.threeStarCount/$scope.maximumCount * 100;  
	$scope.twoStar = $scope.twoStarCount/$scope.maximumCount * 100;
	$scope.oneStar = $scope.oneStarCount/$scope.maximumCount * 100;
	
	$scope.productReviews = response.productDetail.productReviews;
	
	$scope.productSpecifications = response.productDetail.productSpecifications;
	
	$scope.productDescription = response.productDetail.productDescription;
	
	});
	  
	
	
	
	$scope.scrollTo = function(id) {
	    $location.hash(id);
	    console.log($location.hash());
	    $anchorScroll();
	  };
	  
	/*   var scrollTop;
	  if(scrollTop> 147)
		    {
		        document.getElementById("absoluteScroll").className += "retailer-image-absolute";
		  
		    }*/
	  
	  $scope.sellerDetails= function()
	  {
		  $location.path('/sellerDetails')
	  }
	  
	  $scope.displayAllReview= function()
	  {
		  $location.path('/allReviews')
	  }
});


retailApp.controller('readMoreCtrl',function($scope)
{
	$scope.showElement = false;
	$scope.toggleElement = function() {
		$scope.showElement = $scope.showElement ? false : true;
	};
});

retailApp.controller('reviewCtrl', function($scope)
{
	$scope.showElement = false;
	$scope.togglereviewElement = function() {
		$scope.showElement = $scope.showElement ? false : true;
	};
});

retailApp.controller('featureCtrl', function($scope)
		{
	      $scope.showElement = false;
	     $scope.togglefeatureElement = function() {
		$scope.showElement = $scope.showElement ? false : true;
	
	     };
	});

retailApp.directive('ngElevateZoom', function() {
	  return {
	    restrict: 'A',
	    link: function(scope, element, attrs) {
	      console.log("Linking")
	      element.attr('data-zoom-image',attrs.zoomImage);
	      $(element).elevateZoom();
	    }
	  };
	});


var timer1;
function scrollSimilarProduct(divId, depl) 
{
	  var scroll_container = document.getElementById(divId);
	  scroll_container.scrollLeft -= depl;
	  timer1 = setTimeout('scrollDiv("'+divId+'", '+depl+')', 4);
}

retailApp.controller('headerCtrl',function($scope,$location)
{
	$scope.cartDetails=function()
	{
		$location.path('/cartDetails')
	}
});




retailApp.controller('cartDetailsCtrl',function($scope,$http)
{
	
});

retailApp.controller('sellerCtrl',function($scope,$http,$location)
{
	       $http.get('sellerDetails.json').success(function(response) {
		      $scope.sellerDetails = response.sellerDetails
	   }); 
	       
	       $scope.sellerDetailsFunc=function()
	   	{
	   		$location.path('/home')
	   	};
	       $scope.sellerTwoDetails=function()
		   	{
		   		$location.path('/sellerTwoDetails')
		   	}
});

retailApp.controller('sellerTwoCtrl',function($scope,$http,$location)
{
	
	 $http.get('sellerDetails.json').success(function(response) {
	      $scope.sellerDetails = response.sellerDetails
  }); 
	 $scope.sellerDetailsFunc=function()
	   	{
	   		$location.path('/home')
	   	};
	
});

retailApp.controller('allReviewCtrl',function($scope,$http,$location)
{
	$http.get('productDetails.json').success(function(response) {
		console.log("inside product details sucess");
		$scope.productRating = response.productDetail.productRating;
		
		console.log("product rating values for five star count in sucess ::"+$scope.productRating.fiveStarCount);
		console.log("after product details ajax call");
		$scope.fiveStarCount =$scope.productRating.fiveStarCount ;
		$scope.fourStarCount= $scope.productRating.fourStarCount
		$scope.threeStarCount=$scope.productRating.threeStarCount;
		$scope.twoStarCount=$scope.productRating.twoStarCount;
		$scope.oneStarCount=$scope.productRating.oneStarCount;
		console.log("product rating values for five star count"+$scope.productRating.fiveStarCount)
var ratingArr= [$scope.fiveStarCount,$scope.fourStarCount,$scope.threeStarCount,$scope.twoStarCount,$scope.oneStarCount];
	
		
	 	function calculateMaximumRating(ratingArr)
	 {
		var i;
			var max;
			 
			 max=ratingArr[0];
			 for(i=1;i<5;i++)
				 {
				      if(ratingArr[i] > max)
				    	  {
				    	     max = ratingArr[i];
				    	  }
				 
				 }
			 return max;
	 };
	 $scope.maximumCount=calculateMaximumRating(ratingArr);
	
	$scope.fiveStar = $scope.fiveStarCount/$scope.maximumCount * 100;
	$scope.fourStar = $scope.fourStarCount/$scope.maximumCount * 100;
	$scope.threeStar =$scope.threeStarCount/$scope.maximumCount * 100;  
	$scope.twoStar = $scope.twoStarCount/$scope.maximumCount * 100;
	$scope.oneStar = $scope.oneStarCount/$scope.maximumCount * 100;
	
	$scope.productReviews = response.productDetail.productReviews;

	
	});
	
	 $scope.redirectProductPage=function()
	   	{
	   		$location.path('/productDetails')
	   	}
	
});


function changeImage(imageId)
{
     var image= document.getElementById('phneImg')
     image.src=  document.getElementById(imageId).src;
     	 
}
/*var scrollTop;
function myFunction()
{
	if(scrollTop>147)
		{
		     document.getElementById("absoluteScroll").className += "retailer-image-absolute"; 
		}
}*/

