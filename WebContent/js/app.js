var retailApp = angular.module('retailApp', [ 'ngRoute','rzModule','ui.bootstrap' ])

retailApp.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'home.html'
	}).when('/signUp', {
		templateUrl : 'signUp.html',
		controller : 'signController'
	}).when('/productDetails', {
		templateUrl : "productDetails.html"

	}).when('/cartDetails', {
		templateUrl : "cartDetails.html"

	}).when('/sellerDetails', {
		templateUrl : "seller.html"

	}).when('/allReviews', {
		templateUrl : "allReviews.html"

	}).when('/searchProductDetails', {
		templateUrl : "searchProductDetails.html"

	}).when('/mobileDetails', {
		templateUrl : "mobileHome.html"

	}).when('/menuDetails', {
		templateUrl : "menuBar.html"

	}).when('/TVDetails', {
		templateUrl : "TVDetails.html"

	}).when('/orderHistory', {
		templateUrl : "orderHistory.html"

	}).when('/trackOrder', {
		templateUrl : "trackOrder.html"

	}).when('/downloadApp', {
		templateUrl : "downloadApp.html"

	}).when('/giftCard', {
		templateUrl : "giftCard.html"

	}).when('/assured', {
		templateUrl : "assured.html"

	}).when('/customerCare', {
		templateUrl : "CustomerCare.html"

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
	$scope.cancelLogin = function(){
		$scope.isLoginVisible = false;
	};
	  
	
	$scope.login = function() {
		
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
	
	
	 
	$scope.displayMyAccount=function()
	{
		$rootScope.ismyAccountvisble=false;
	};
	
	$scope.disableLogin= function()
	{
		$rootScope.isSignInVisibleLink=false;
	}
	
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
	$rootScope.isSignInVisibleLink=true;
	
	
	$scope.displayLogin = function() {
		displayLoginService.setIsLoginVisible(true);
		$rootScope.isLoginVisible = true;
	}

});




retailApp.controller('signCtrl', function($scope) {

	$scope.submitForm = function() {

		if ($scope.userForm.$valid) {
			alert('user registraion sucessfully');
		} else {
			console.log("error occured");
		}
	};

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
	
	/*$http.get('slider.json').success(function(response) {
		$scope.slider = response.slider
	});*/
	
	
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
	
	/*$scope.displaySearchProducts=function()
	{
		$location.path('/searchProductDetails');
	}*/
	$scope.displayMobileDeatils=function()
	{
		$location.path('/mobileDetails')
	}
	$scope.displayMobileDetails=function()
	{
		$location.path('/TVDetails')
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

retailApp.controller('productDetailsCtrl', function($scope, $timeout,$http,$location, $anchorScroll,displayLoginService,$rootScope) {

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
	
	/*console.log("before product details ajax call");*/
	$http.get('productDetails.json').success(function(response) {
		/*console.log("inside product details sucess");*/
		$scope.productRating = response.productDetail.productRating;
		
		/*console.log("product rating values for five star count in sucess ::"+$scope.productRating.fiveStarCount);*/
		/*console.log("after product details ajax call");*/
		$scope.fiveStarCount =$scope.productRating.fiveStarCount ;
		$scope.fourStarCount= $scope.productRating.fourStarCount
		$scope.threeStarCount=$scope.productRating.threeStarCount;
		$scope.twoStarCount=$scope.productRating.twoStarCount;
		$scope.oneStarCount=$scope.productRating.oneStarCount;
		/*console.log("product rating values for five star count"+$scope.productRating.fiveStarCount)*/
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
	
	$scope.EMIOptions = response.productDetail.EMIOptions;
	
	$scope.EMITermsCondition = response.productDetail.EMITermsCondition;
	
	$scope.TermsAndCondition = response.productDetail.TermsAndCondition;
	
	$scope.displayEmiPlan= function(index)
	{
		console.log("index : " + index);
		
		$scope.selecteEMIOffer = $scope.EMIOptions.emiOffers[index].emiOffer;
		$scope.emiPlans=true;
		$scope.termsCondition=false;
		
	}
	
	$scope.orig = angular.copy($scope.EMIOptions);
	 $scope.resetData = function() {
	     $scope.EMIOptions = angular.copy($scope.orig);
	  };
	
	});
	$scope.selecteEMIOffer = {};
	
	
	
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
	 /* $scope.cancelLogin = function(){
			$scope.isLoginVisible = false;
		};*/
	  $scope.isViewPlansVisible = false;
	  
		$scope.hideViewPlans = function() {
			$scope.isViewPlansVisible = false;
		
		}
		
		$scope.displayViewPlans=function()
		{
			$scope.isViewPlansVisible = true;
		}
		
		$scope.emiPlans=true;
		$scope.termsCondition=false;
		
		$scope.displayEMICondition= function()
		{
			$scope.emiPlans=false;
			$scope.termsCondition=true;
		}
		
		$scope.isTermsAndConditionVisible=false;
		
		$scope.hideTermsAnsCondition = function()
		{
			$scope.isTermsAndConditionVisible=false;
		}
		
		$scope.displayTermsAndCondition= function()
		{
			
			$scope.isTermsAndConditionVisible=true;
		}
		
		
		$scope.isTermsVisible= false;
		
		$scope.hideTerms= function()
		{
			$scope.isTermsVisible= false;
		}
		$scope.displayTerms= function()
		{
			$scope.isTermsVisible= true;
		}
		
		displayLoginService.setIsLoginVisible(false);
		$rootScope.isLoginVisible = false;
		$scope.dsiplaySignup = function() {
			displayLoginService.setIsLoginVisible(true);
			$rootScope.isLoginVisible = true;
		}
		
		$scope.isAssuredVisible=false;
		$scope.hideAssured= function()
		{
			$scope.isAssuredVisible=false;
		}

		$scope.displayAssured= function()
		{
			$scope.isAssuredVisible=true;
		}
		
		$scope.isShareVisible=false;
		$scope.hideShare = function()
		{
			$scope.isShareVisible=false;
		}
		
		$scope.displayShare= function()
		{
			$scope.isShareVisible=true;
		}
		
		$scope.isEmiDetailsVisible= false;
		
		$scope.displayEmiDetails = function()
		{
			$scope.isEmiDetailsVisible= true;
		}
		
		$scope.hideEmiDetails = function()
		{
			$scope.isEmiDetailsVisible= false;
		}
		
		
		$scope.scrollBar = function(id) {
		    $location.hash(id);
		    console.log($location.hash());
		    $anchorScroll();
		  };
		  
		 /* $scope.emiDetails= true;
		  $scope.toggleCustom = function() {
	            $scope.emiDetails = $scope.emiDetails === false ? true: false;
		  };*/
		  $scope.hiddenDiv = false;
		    $scope.showDiv = function () {
		        $scope.hiddenDiv = !$scope.hiddenDiv;
		    };
		  
		  
		
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

retailApp.filter('searchFor', function(){

	// All filters must return a function. The first parameter
	// is the data that is to be filtered, and the second is an
	// argument that may be passed with a colon (searchFor:searchString)

	return function(arr, searchString){

		if(!searchString){
			return arr;
		}

		var result = [];

		searchString = searchString.toLowerCase();

		// Using the forEach helper method to loop through the array
		angular.forEach(arr, function(item){

			if(item.title.toLowerCase().indexOf(searchString) !== -1){
				result.push(item);
			}

		});

		return result;
	};

});



retailApp.controller('headerCtrl',function($scope,$location)
{
	$scope.cartDetails=function()
	{
		$location.path('/cartDetails')
	}
	
	$scope.items = [
	        		{
	        			url: 'http://www.tutorialspoint.com/android/',
	        			title: 'i-phone 7s',
	        			image: 'http://www.tutorialspoint.com/android/images/android-mini-logo.jpg'
	        		},
	        		{
	        			url: 'http://www.tutorialspoint.com/angularjs/',
	        			title: 'iphone 7',
	        			image: 'http://www.tutorialspoint.com/angularjs/images/angularjs-mini-logo.jpg'
	        		},
	        		{
	        			url: 'http://www.tutorialspoint.com/html5/',
	        			title: 'iPhone 6',
	        			image: 'http://www.tutorialspoint.com/html5/images/html5-mini-logo.jpg'
	        		},
	        		{
	        			url: 'http://www.tutorialspoint.com/css/',
	        			title: 'moto',
	        			image: 'http://www.tutorialspoint.com/css/images/css-mini-logo.jpg'
	        		},
	        		{
	        			url: 'http://www.tutorialspoint.com/java/',
	        			title: 'Nokia',
	        			image: 'http://www.tutorialspoint.com/java/images/java-mini-logo.jpg'
	        		},
	        		{
	        			url: 'http://www.tutorialspoint.com/joomla/',
	        			title: 'Asus',
	        			image: 'http://www.tutorialspoint.com/joomla/images/joomla-mini-logo.jpg'
	        		},
	        		{
	        			url: 'http://www.tutorialspoint.com/html/',
	        			title: 'sony ',
	        			image: 'http://www.tutorialspoint.com/html/images/html-mini-logo.jpg'
	        		}
	        	];
	
	   $scope.isSearch=true;
	   $scope.searchString=""
	   $scope.displaySearch= function()
	   {
		   console.log("$scope.searchString : " + $scope.searchString);
            if($scope.searchString=="")
            	{
            	$scope.isSearch=true;
            	}
            else
            	{
                 	$scope.isSearch=false;
            	}
	   };
	   
	   $scope.displaySearchProducts=function()
		{
			$location.path('/searchProductDetails');
		}
	
});

retailApp.controller('cartDetailsCtrl',function($scope,$http)
{
	
});

retailApp.controller('sellerCtrl',function($scope,$http,$location,$timeout,
		displayLoginService,$rootScope)
{
	       /*$http.get('sellerDetails.json').success(function(response) {
		      $scope.sellerDetails = response.sellerDetails
		      $scope.currentPage = 0;
		      $scope.pageSize = 5;
		     
	   }); */
	
	
	
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
	
	$scope.sellerDetails = response.productDetail.sellerDetails;
       
	 $scope.currentPage = 0;
     $scope.pageSize = 5;
	});
	
	
	       
	       $scope.sellerDetailsFunc=function()
	   	{
	   		$location.path('/home')
	   	};
});
console.log("Before filter function")
retailApp.filter('startFrom', function() {
    return function(input, start) {
    	if (!input || !input.length)
    		{
    		  return;
    		}
        start = +start; //parse to int
        return input.slice(start);
        console.log("in filtter function")
    }
    
    
    
   
});
console.log("after filter function");




retailApp.controller('allReviewCtrl',function($scope,$http,$location, $timeout,
		displayLoginService,$rootScope)
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
	
	$scope.helpfulReviews = response.productDetail.helpfulReviews;
	$scope.positiveProductReview = response.productDetail.positiveProductReview;
	$scope.negativeProductReview = response.productDetail.negativeProductReview;
	$scope.mostRecentReview = response.productDetail.mostRecentReview;
	$scope.cerifiedProductReview = response.productDetail.cerifiedProductReview;
       
	 $scope.currentPage = 0;
     $scope.pageSize = 5;
     
     $scope.MostHelpful=true;
     $scope.positiveDetails=false;
     $scope.negativeDetails=false;
     $scope.MostRecentReview=false;
     $scope.certifiedReview=false;
     
     $scope.displayHelpfulReview=function()
     {
    	 $scope.MostHelpful=true;
         $scope.positiveDetails=false;
         $scope.negativeDetails=false;
         $scope.MostRecentReview=false;
         $scope.certifiedReview=false;
     }
     
     $scope.displayPositiveReview=function()
     {
    	 $scope.MostHelpful=false;
         $scope.positiveDetails=true;
         $scope.negativeDetails=false;
         $scope.MostRecentReview=false;
         $scope.certifiedReview=false;
     }
     
     $scope.displayNegativeReview=function()
     {
    	 $scope.MostHelpful=false;
         $scope.positiveDetails=false;
         $scope.negativeDetails=true;
         $scope.MostRecentReview=false;
         $scope.certifiedReview=false;
     }
     $scope.displayRecentReview=function()
     {
    	 $scope.MostHelpful=false;
         $scope.positiveDetails=false;
         $scope.negativeDetails=false;
         $scope.MostRecentReview=true;
         $scope.certifiedReview=false;
     }
     
     $scope.displayCertifiedReview=function()
     {
    	 $scope.MostHelpful=false;
         $scope.positiveDetails=false;
         $scope.negativeDetails=false;
         $scope.MostRecentReview=true;
         $scope.certifiedReview=false;
     }
	
	});
	
	 $scope.redirectProductPage=function()
	   	{
	   		$location.path('/productDetails')
	   	}
	 
	 displayLoginService.setIsLoginVisible(false);
		$rootScope.isLoginVisible = false;
		$scope.dsiplaySignup = function() {
			displayLoginService.setIsLoginVisible(true);
			$rootScope.isLoginVisible = true;
		}
	 
	
});


function changeImage(imageId)
{
     var image= document.getElementById('phneImg')
     image.src=  document.getElementById(imageId).src;
     	 
}

function displayPin()
{
	 document.getElementById("pinode").focus();
	}


/*$(document).ready(function() {
	// Show or hide the sticky footer button
	$(window).scroll(function() {
		if ($(this).scrollTop() > 200) {
			$('.go-top').fadeIn(200);
		} else {
			$('.go-top').fadeOut(200);
		}
	});
	
	// Animate the scroll to top
	$('.go-top').click(function(event) {
		event.preventDefault();
		
		$('ng-controller').animate({scrollTop: 0}, 300);
	})
});*/

$(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.goto').fadeIn();
        } else {
            $('.goto').fadeOut();
        }
    });

});

retailApp.controller('searchProductCtrl',function($scope,$http,$modal,$timeout,$location,displayLoginService,$rootScope)
		{
	$scope.slider = {
		    minValue: 0,
		    maxValue: 100,
		    options: {
		        floor: 0,
		        ceil: 100,
		        step: 1,
		        noSwitching: true
		    }
		};
	
	$http.get('searchProductDetails.json').success(function(response) {
		$scope.filter = response.filter
		
		$scope.phoneDetails = response.phoneDetails;
		$scope.popularityPhoneDetails = response.popularityPhoneDetails;
		$scope.lowPricePhoneDetails = response.lowPricePhoneDetails;
		$scope.highPricePhoneDetails = response.highPricePhoneDetails;
		$scope.newestFirstPhoneDetails = response.newestFirstPhoneDetails;
		
		$scope.isrelevance=true;
		$scope.isPopularity=false;
		$scope.islowPrice=false;
		$scope.isHighPrice=false;
		$scope.isnewest=false;
		
		$scope.displayRelevance=function()
		{
			$scope.isrelevance=true;
    		$scope.isPopularity=false;
    		$scope.islowPrice=false;
    		$scope.isHighPrice=false;
    		$scope.isnewest=false;
		}
		
		$scope.displayPopularity=function()
		{
			$scope.isrelevance=false;
    		$scope.isPopularity=true;
    		$scope.islowPrice=false;
    		$scope.isHighPrice=false;
    		$scope.isnewest=false;
		}
		
		$scope.displayLowPrice=function()
		{
			$scope.isrelevance=false;
    		$scope.isPopularity=false;
    		$scope.islowPrice=true;
    		$scope.isHighPrice=false;
    		$scope.isnewest=false;
		}
		
		$scope.displayLowPrice=function()
		{
			$scope.isrelevance=false;
    		$scope.isPopularity=false;
    		$scope.islowPrice=false;
    		$scope.isHighPrice=true;
    		$scope.isnewest=false;
		}
		
		$scope.displayNewest=function()
		{
			$scope.isrelevance=false;
    		$scope.isPopularity=false;
    		$scope.islowPrice=false;
    		$scope.isHighPrice=false;
    		$scope.isnewest=true;
		}
		
		
	});
	
	$scope.hiddenDiv = false;
    $scope.showDiv = function () {
        $scope.hiddenDiv = !$scope.hiddenDiv;
    };
    
    $scope.CheckBoxChanged= function()
    {
    	 
    }
    
    $scope.popoverIsVisible = false; 
    $scope.showPopover = function() {
    	  $scope.popoverIsVisible = true; 
    	};

    	$scope.hidePopover = function () {
    	  $scope.popoverIsVisible = false;
    	};
    	
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
    	
    	$scope.sellerDetails = response.productDetail.sellerDetails;
           
    	 
    	});
    	
    	    	$scope.backToHome= function()
    	{
    		$location.path('/home');
    	}
    	$scope.backToProductDeatils= function()
    	{
    		$location.path('/productDetails')
    	}
    	 displayLoginService.setIsLoginVisible(false);
 		$rootScope.isLoginVisible = false;
 		$scope.dsiplaySignup = function() {
 			displayLoginService.setIsLoginVisible(true);
 			$rootScope.isLoginVisible = true;
 		}
    
});

retailApp.controller('mobileDetailsCtrl',function($scope,$http,$modal,$timeout,$location,displayLoginService,$rootScope)
		{
	$http.get('searchProductDetails.json').success(function(response) {
		$scope.filter = response.filter;
	});      
	
	$scope.slider = {
		    minValue: 0,
		    maxValue: 100,
		    options: {
		        floor: 0,
		        ceil: 100,
		        step: 1,
		        noSwitching: true
		    }
		};
	
	$http.get('mobileProductDetails.json').success(function(response) {
		$scope.newLauncher = response.newLauncher;
	});      
	
		});

retailApp.controller('tvDetailsCtrl',function($scope,$http,$location)
{
	  $http.get('searchProductDetails.json').success(function(response)
			  
	  {
		     $scope.filter=response.filter; 
	  });
	  
	  $scope.slider = {
			    minValue: 0,
			    maxValue: 100,
			    options: {
			        floor: 0,
			        ceil: 100,
			        step: 1,
			        noSwitching: true
			    }
			};
});


retailApp.controller('giftCardCtrl', ['$scope', function($scope,$http,$location)
		{
	 $scope.choices = [];
	  
	  $scope.addNewChoice = function() {
	    var newItemNo = $scope.choices.length+1;
	    $scope.choices.push({newItemNo});
	  };
	    
	  $scope.removeChoice = function() {
	    var lastItem = $scope.choices.length-1;;
	    $scope.choices.splice(lastItem);
	  };
	 $scope.isgiftInfoHidden=true;
	    $scope.displayCheckItem=function()
	    {
	    	$scope.isgiftInfoHidden = $scope.isgiftInfoHidden ? false : true;
	    };
	    
	    $scope.ishidesecondGiftCard=true;
	    $scope.displaySecondGift=function()
	    {
	    	$scope.ishidesecondGiftCard = $scope.ishidesecondGiftCard ? false : true;
	    };
	    $scope.ishideThirdGiftCard=true;
	    $scope.displayThirdGift=function()
	    {
	    	$scope.ishideThirdGiftCard = $scope.ishideThirdGiftCard ? false : true;
	    };
	    
	    $scope.ishideFourthGiftCard=true;
	    $scope.displayFourthGift=function()
	    {
	    	$scope.ishideFourthGiftCard = $scope.ishideFourthGiftCard ? false : true;
	    };
	    
	    $scope.retailGiftCard=true;
	    $scope.isCheckBalance=false;
	    $scope.isCorporateRequirement=false;
	    $scope.isFrequntlyAskedQuestions=false;
	    $scope.displayRetailGiftCard=function()
	    {
	    	$scope.retailGiftCard=true;
	    	$scope.isCheckBalance=false;
	    	$scope.isCorporateRequirement=false;
	    	$scope.isFrequntlyAskedQuestions=false;
	    };
	    
	    $scope.displayCheckBalance=function()
	    {
	    	$scope.retailGiftCard=false;
	    	$scope.isCheckBalance=true;
	    	$scope.isCorporateRequirement=false;
	    	$scope.isFrequntlyAskedQuestions=false;
	    };
	    
	    $scope.displayCorporateRequiremnet=function()
	    {
	    	$scope.retailGiftCard=false;
	    	$scope.isCheckBalance=false;
	    	$scope.isCorporateRequirement=true;
	    	$scope.isFrequntlyAskedQuestions=false;
	    };
	    $scope.displayFrequntlyaskedQuestion=function()
	    {
	    	$scope.retailGiftCard=false;
	    	$scope.isCheckBalance=false;
	    	$scope.isCorporateRequirement=false;
	    	$scope.isFrequntlyAskedQuestions=true;
	    	
	    };
	    
	    
	    
	    $scope.redirectCustomerCare=function()
	    {
	    	  $location.path=('/customerCare');
	    };
	    
	        
	    
	    $scope.master = {};
	   
		  $scope.update = function(user) {
		    $scope.master = angular.copy(user);
		   
		  };
		  
		 /* $scope.checkDetails = {};
		   
		  $scope.getDetails = function(user1) {
		    $scope.checkDetails = angular.copy(user1);
		   
		  };*/
	    
		}]);
var counter = 0;
var numBoxes = 4;
function toggle4(showHideDiv) {
       var ele = document.getElementById(showHideDiv + counter);
       if(ele.style.display == "block") {
              ele.style.display = "none";
       }
       else {
              ele.style.display = "block";
       }
       if(counter == numBoxes) {
                document.getElementById("toggleButton").style.display = "none";
       }
}

retailApp.controller('downloadAppCtrl', function($scope,$http)
		{
			
		});

retailApp.controller('customerCareCtrl', function($scope,$http,$location,$timeout)
		{
	$scope.isOrderHidden = true;
    $scope.displayOrder = function () {
        //If DIV is hidden it will be visible and vice versa.
        $scope.isOrderHidden = $scope.isOrderHidden ? false : true;
    };
    
    $scope.iscancellationHidden=true;
    $scope.displayCancellation=function()
    {
    	$scope.iscancellationHidden = $scope.iscancellationHidden ? false : true;
    };
    $scope.isPaymentHidden=true;
    $scope.displayPayment=function()
    {
    	$scope.isPaymentHidden = $scope.isPaymentHidden ? false : true;
    };
    $scope.isPaymentHidden=true;
    $scope.displayShopping=function()
    {
    	$scope.isshoppinghidden = $scope.isshoppinghidden ? false : true;
    };
    $scope.isPaymentHidden=true;
    $scope.displayWallet=function()
    {
    	$scope.isWalletHidden = $scope.isWalletHidden ? false : true;
    };
    $scope.ishiddendisplayorder=true;
    $scope.displayPlaceOrder=function()
    {
    	$scope.ishiddendisplayorder = $scope.ishiddendisplayorder ? false : true;
    	
    };
    $scope.istrckmyorderhidden=true;
    $scope.displayTrackOrder=function()
    {
    	$scope.istrckmyorderhidden = $scope.istrckmyorderhidden ? false : true;
    };
    $scope.istrckmyorderhidden=true;
    $scope.displayDelivery=function()
    {
    	$scope.ishiddenOutOfdelivery = $scope.ishiddenOutOfdelivery ? false : true;
    };
    
    $scope.hiddenDiv = false;
    $scope.hiddenDiv1 = false;
    $scope.hiddenDiv2 = false;
    $scope.hiddenDiv3 = false;
    $scope.hiddenDiv4 = false;
    $scope.hiddenDiv5 = false;
    $scope.hiddenDiv6 = false;
    $scope.showDiv = function () {
        $scope.hiddenDiv = !$scope.hiddenDiv;
        $scope.hiddenDiv1 = !$scope.hiddenDiv1;
        $scope.hiddenDiv2 = !$scope.hiddenDiv2;
        $scope.hiddenDiv3 = !$scope.hiddenDiv3;
        $scope.hiddenDiv4 = !$scope.hiddenDiv4;
        $scope.hiddenDiv5 = !$scope.hiddenDiv5;
        $scope.hiddenDiv6 = !$scope.hiddenDiv6;
    };
		});

retailApp.controller('assuredCtrl', function($scope,$http)
		{
			
		});


retailApp.controller('retailHeaderCtrl', function($scope,$http,$location,$timeout)
		{
	           
		});

retailApp.factory('displaySignService', function() {

	var data = {
			isSignVisible : false
	};

	return {
		isSignVisible : function() {
			return data.isSignVisible;
		},
		setIsLoginVisible : function(isSignVisible) {
			data.isSignVisible = isSignVisible;
		}
	};
});

retailApp.controller('signUpCtrl',function($scope,$http, displaySignService,$rootScope,$timeout)
{
	$scope.cancelSign = function(){
		$rootScope.isSignVisible = false;
	};
});

retailApp.controller('displaySignCtrl', function($scope, displaySignService,$rootScope) {
	displaySignService.setIsLoginVisible(false);
	$rootScope.isSignVisible = false;
	$scope.displaySignPop = function() {
		displaySignService.setIsLoginVisible(true);
		$rootScope.isSignVisible = true;
	};
	
});

retailApp.controller('trackOrderCtrl',function($scope,$location,$timeout)
{
	console.log("before login")
	  /*  var email = $scope.email;
		var password = $scope.password;*/
	
	$scope.email = '';
	$scope.password = 'admin';
    $scope.trackOrderLogin=function()
    {
    	
         if($scope.email == 'admin' && $scope.password == 'admin')
        	 {
        	       $location.path('/orderHistory');
        	       console.login("redirect oredr history")
        	 }
         else
        	 {
        	    alert("invalide id or password")
        	 }
         console.log("in login");
    };
	console.log("after login");
	
});



retailApp.controller('orderHistoryCtrl',function($scope)
{
	});


retailApp.controller('indexTrackOrderCtrl',function($scope,$location)
{
      $scope.displayTrackOrder= function()
      {
    	  $location.path('/trackOrder');
      }
});

retailApp.controller('myAccountCtrl',function($scope,$location,$rootScope)
		{
            	$rootScope.ismyAccountvisble=true
		});


retailApp.controller('menuCtrl',function($scope,$location)
		{
	$scope.showPopover = function() {
		  $scope.popoverIsVisible = true; 
		};

		$scope.hidePopover = function () {
		  $scope.popoverIsVisible = false;
		};
		
		
		$scope.showMenPopover = function() {
			  $scope.menpopoverIsVisible = true; 
			};

			$scope.hideMenPopover = function () {
			  $scope.menpopoverIsVisible = false;
			};
			
	
		});


retailApp.controller('menuDemorCtrl',function($scope)
{
	$scope.showMenuPopover = function() {
		  $scope.isMenuDemoVisible = true; 
		};

		$scope.hideMenuPopover = function () {
		  $scope.isMenuDemoVisible = false;
		};
		
		
		$scope.showMenPopover = function() {
			  $scope.isMenVisible = true; 
			};

			$scope.hideMenPopover = function () {
			  $scope.isMenVisible = false;
			};
			
			
			$scope.showomenPopover = function() {
				  $scope.isWomenVisible = true; 
				};

				$scope.hidewomePopover = function () {
				  $scope.isWomenVisible = false;
				};
				$scope.showBabyPopover = function() {
					  $scope.isBabyVisible = true; 
					};

					$scope.hideBabyPopover = function () {
					  $scope.isBabyVisible = false;
					};
					$scope.showHomePopover = function() {
						  $scope.isHomeVisible = true; 
						};

						$scope.hideHomePopover = function () {
						  $scope.isHomeVisible = false;
						};
						$scope.showBooksPopover = function() {
							  $scope.isBooksVisible = true; 
							};

							$scope.hideBooksPopover = function () {
							  $scope.isBooksVisible = false;
							};
							 $scope.master = {};
							$scope.update = function(user) {
							    $scope.master = angular.copy(user);
							  };
});


retailApp.controller('retailGiftCardCtrl', ['$scope', function($scope) {
	  $scope.master = {};
       $scope.isHide=false;
	  $scope.update = function(user) {
	    $scope.master = angular.copy(user);
	    $scope.isHide=true;
	  };

	 
	}]);


retailApp.controller('MainCtrl', function($scope) {

	  $scope.choices = [{id: 'choice0'}, {id: 'choice1'}];
	  
	  $scope.addNewChoice = function() {
	    var newItemNo = $scope.choices.length+1;
	    $scope.choices.push({'id':'choice'+newItemNo});
	  };
	    
	  $scope.removeChoice = function() {
	    var lastItem = $scope.choices.length-1;
	    $scope.choices.splice(lastItem);
	  };
	  
	});
