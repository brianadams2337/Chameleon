// gets a single review by ID (no filter, sorts, etc)
function getSpecificReviews (reviewIDs, callBack, options) {
	var settings = $.extend(true, {
		"Parameters":{
			"Filter":{
				"Id":reviewIDs
			}
		}
	}, options);
	var apiCall = reviewsAPICall(settings);
	var url = apiCall["url"];
	var params = $.param(apiCall["params"]);
	$.ajax({
		type: "GET",
		url: url,
		data: params,
		dataType: "jsonp",
		success: function(data) {
			callBack(data, settings);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

// gets all reviews with statistics - set productID to null to return all reviews
function getAllReviews (productID, callBack, options) {
	var settings = $.extend(true, {
		"Parameters":{
			"Include":"Products",
			"Stats":"Reviews",
			"Filter":{
				"ProductId":productID
			},
			"Sort":{
				"SubmissionTime":"desc"
			}
		}
	}, options);
	var apiCall = reviewsAPICall(settings);
	var url = apiCall["url"];
	var params = $.param(apiCall["params"]);
	$.ajax({
		type: "GET",
		url: url,
		data: params,
		dataType: "jsonp",
		success: function(data) {
			callBack(data, settings);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

// gets all reviews with statistics - set productID to null to return all reviews
function getReviewsStats (productID, callBack, options) {
	var settings = $.extend(true, {
		"Parameters":{
			"Include":"Products",
			"Stats":"Reviews",
			"Filter":{
				"ProductId":productID
			}
		}
	}, options);
	var apiCall = reviewsAPICall(settings);
	var url = apiCall["url"];
	var params = $.param(apiCall["params"]);
	$.ajax({
		type: "GET",
		url: url,
		data: params,
		dataType: "jsonp",
		success: function(data) {
			callBack(data, settings);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

// gets all featured reviews - if no productID, all reviews will return
function getFeaturedReviews (productID, callBack, options) {
	var settings = $.extend(true, {
		"Parameters":{
			"Filter":{
				"ProductId":productID,
				"IsFeatured":true,
			}
		}
	}, options);
	var apiCall = reviewsAPICall(settings);
	var url = apiCall["url"];
	var params = $.param(apiCall["params"]);
	$.ajax({
		type: "GET",
		url: url,
		data: params,
		dataType: "jsonp",
		success: function(data) {
			callBack(data, settings);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

// gets all reviews with photos - if no productID, all reviews will return
function getPhotoReviews (productID, callBack, options) {
	var settings = $.extend(true, {
		"Parameters":{
			"Filter":{
				"ProductId":productID,
				"HasPhotos":true
			}
		}
	}, options);
	var apiCall = reviewsAPICall(settings);
	var url = apiCall["url"];
	var params = $.param(apiCall["params"]);
	$.ajax({
		type: "GET",
		url: url,
		data: params,
		dataType: "jsonp",
		success: function(data) {
			callBack(data, settings);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

// gets all featured reviews with photos - if no productID, all reviews will return
function getFeaturedPhotoReviews (productID, callBack, options) {
	var settings = $.extend(true, {
		"Parameters":{
			"Filter":{
				"ProductId":productID,
				"IsFeatured":true,
				"HasPhotos":true
			}
		}
	}, options);
	var apiCall = reviewsAPICall(settings);
	var url = apiCall["url"];
	var params = $.param(apiCall["params"]);
	$.ajax({
		type: "GET",
		url: url,
		data: params,
		dataType: "jsonp",
		success: function(data) {
			callBack(data, settings);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

// create your own api call
function getReviewsCustom (productID, callBack, options) {
	var settings = $.extend(true, {
		"Parameters":{
			"Filter":{
				"ProductId":productID
			}
		}
	}, options);
	var apiCall = reviewsAPICall(settings);
	var url = apiCall["url"];
	var params = $.param(apiCall["params"]);
	$.ajax({
		type: "GET",
		url: url,
		data: params,
		dataType: "jsonp",
		success: function(data) {
			callBack(data, settings);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

function reviewsAPICall (options) {

	var defaultSettings = $.extend(true, {
		"URL":{
			"BaseURL":apiBaseURL,
			"CustomerName":apiDefaults["customerName"],
			"Format":apiDefaults["format"] //Response format (xml or json)
		},
		"Parameters":{
			"ApiVersion":apiDefaults["apiVersion"], //The API version.
			"Attributes":null, // Attributes to be included when returning content. For example, if includes are requested along with the &attributes=ModeratorCodes parameter, both the includes and the results will contain moderator codes. In order to filter by ModeratorCode, you must request the ModeratorCodes attribute parameter.
			"Callback":null, // Callback function name (JsonP).
			"ExcludeFamily":null, // Boolean flag indicating whether to exclude content from other products in the same family as the requested product. For example, "&filter=productid:eq:1101&excludeFamily=true" limits returned content to just that of product 1101 and not any of the products in the same family. If a value is not defined, content on all products in the family will be returned.
			"Filter":{ // Filter criteria for primary content of the query. Multiple filter criteria are supported.
				"Id":null, //The identifier of the Review.
				"AdditionalField_[FIELD_NAME]":null, //Additional field to filter by, e.g., filter=AdditionalField_[FIELD_NAME]:eq:[FIELD_VALUE]
				"AuthorId":null, //The identifier of the author who wrote the content
				"CampaignId":null, //The identifier of the Campaign associated with the content
				"CategoryAncestorId":null, //The identifier of the Product Category ancestor of the Product that the Review was written on.
				"ContentLocale":null, //Locale of the content to display. If this filter is not defined, all content regardless of its locale is returned. To return specific content by locale, define the value in the filter. A wildcard character “*” can be used to define the value, e.g., “en*” returns all content in English (en_US, en_CA, en_GB, etc.) or you can use a single ContentLocale code (e.g., “fr_FR”). ContentLocale codes are case-sensitive.
				"ContextDataValue_[DIMENSION_EXTERNAL_ID]":null, //The context data value for the content. DIMENSION_EXTERNAL_ID can be age, gender, etc. e.g. filter=contextdatavalue_age:under21&filter=contextdatavalue_gender:male
				"HasComments":null, //Boolean flag indicating whether content has comments
				"HasPhotos":null, //Boolean flag indicating whether content has photos
				"HasTags":null, //Boolean flag indicating whether content has tags
				"HasVideos":null, //Boolean flag indicating whether content has videos. For more information on inserting the returned VideoUrl into HTML, see the API Basics page.
				"IsFeatured":null, //Boolean flag indicating whether content is featured
				"IsRatingsOnly":null, //Boolean flag indicating whether the review was a ratings only review
				"IsRecommended":null, //Boolean flag indicating whether the user would recommend this product
				"IsSubjectActive":null, //Boolean flag indicating whether the content subject is active
				"IsSyndicated":null, //Boolean flag indicating whether the review has been syndicated. If IsSyndicated:eq:true, a SyndicationSource block with the details of where the syndication is coming from is displayed. Note: The API key must be configured to show syndicated content.
				"LastModeratedTime":null, //The date/time of the latest moderation of the content. See the Introduction for an example of using advanced operators for filtering.
				"LastModificationTime":null, //The date/time of the latest modification of the content. See the Introduction for an example of using advanced operators for filtering.
				"ModeratorCode":null, //String value indicating the moderator code for rejected content, e.g., &Filter=ModeratorCode:eq:CR returns UGC that contains the CR (Competitor Reference) code. Multiple codes can be entered in a comma-delimited list, e.g., &Filter=ModeratorCode:eq:CS,IU returns UGC with either the CS (Customer Service Complaint) or the IU (Inappropriate/Unusable Content) code. For a list of all Moderator Codes, see the API Basics page. Note that the ModeratorCodes attribute parameter must be explicitly requested in order to use this filter. See the Parameters section above.
				"ProductBrandId":null, //The value of the external product brand ID. The value is case-insensitive. To return content that doesn't have a brand ID associated with it, set productbrandid:eq:null
				"ProductId":null, //The identifier of the Product that the Review was written on.
				"Rating":null, //The Review Rating, usually between 1 to 5.
				"SecondaryRating_[RATING_NAME]":null, //Secondary rating value to filter by, e.g., filter=SecondaryRating_[RATING_NAME]:gte:[RATING_VALUE]. Note: All advanced operators can be used for secondary ratings comparisons.
				"SubmissionId":null, //Submission identifier assigned to the content when it was initially submitted
				"SubmissionTime":null, //The submission date/time of the content. See the Introduction for an example of using advanced operators for filtering.
				"Tag_[TAG_NAME]":null, //The tag name to filter by, e.g., filter=tag_[TAG_NAME]:eq:[TAG_VALUE]
				"TotalCommentCount":null, //The number of comments the Review has
				"TotalFeedbackCount":null, //Number of feedbacks received
				"TotalNegativeFeedbackCount":null, //Number of negative feedbacks received
				"TotalPositiveFeedbackCount":null, //Number of positive feedbacks received
				"UserLocation":null //Location of the author
			},
			"Filter_[TYPE]":null, // Filtering option for included nested content. TYPE can be any included nested content. i.e. Comments for Reviews.
			"Include":null, // Related subjects to be included (e.g. Products, Categories, Authors, or Comments).
			"Limit":apiDefaults["limit"], // Max number of records returned. An error is returned if the value passed exceeds 100.
			"Limit_[TYPE]":null, // Limit option for the nested content type returned. TYPE can be any nested content. i.e. Comments for Reviews. An error is returned if the value passed exceeds 20.
			"Locale":null, // Locale to display Labels, Configuration, Product Attributes and Category Attributes in. The default value is the locale defined in the display associated with the API key.
			"Offset":apiDefaults["offset"], // Index at which to return results. By default, indexing begins at 0 when you issue a query. Using Limit=100, Offset=0 returns results 0-99. When changing this to Offset=1, results 1-100 are returned.
			"PassKey":apiDefaults["passkey"], //API key is required to authenticate API user and check permission to access particular client's data.
			"Search":null, // Full-text search string used to find UGC. For more information about what fields are searched by default, see the API Basics page.
			"Search_[TYPE]":null, // Searching option for included content followed by full-text search string. See the API Basics page for examples of searching for included data.
			"Sort":{ // Sort criteria for primary content type of the query. Sort order is required (asc or desc). Multi-attribute sorting for each content/subject type is supported.
				"Id":null, //The identifier of the content/subject type
				"AdditionalField_[FIELD_NAME]":null, //Additional field to sort by, e.g., sort=AdditionalField_[FIELD_NAME]:desc
				"AuthorId":null, //The Identifier of the author who wrote the content
				"CampaignId":null, //The identifier of the Campaign associated with the content
				"ContentLocale":null, //Locale value of the content
				"ContextDataValue_[DIMENSION_EXTERNAL_ID]":null, //The context data value for the content. DIMENSION_EXTERNAL_ID can be age, gender, etc. e.g. sort=contextdatavalue_age:desc&sort=contextdatavalue_gender:asc
				"HasComments":null, //Boolean flag indicating whether content has comments
				"HasPhotos":null, //Boolean flag indicating whether content has photos
				"HasTags":null, //Boolean flag indicating whether content has tags
				"HasVideos":null, //Boolean flag indicating whether content has videos. For more information on inserting the returned VideoUrl into HTML, see the API Basics page.
				"Helpfulness":null, //The helpfulness value of the review
				"IsFeatured":null, //Boolean flag indicating whether content is featured
				"IsRatingsOnly":null, //Boolean flag indicating whether the review was a ratings only review
				"IsRecommended":null, //Boolean flag indicating whether the user would recommend this product.
				"IsSubjectActive":null, //Boolean flag indicating whether the content subject is active
				"IsSyndicated":null, //Boolean flag indicating whether the Content has been Syndicated.
				"LastModeratedTime":null, //The date/time of the latest moderation of the content
				"LastModificationTime":null, //The date/time of the latest modification of the content
				"ProductId":null, //The identifier of the product
				"Rating":null, //The Review Rating, usually between 1 to 5
				"SecondaryRating_[RATING_NAME]":null, //Secondary rating value to sort by, e.g., sort=SecondaryRating_[RATING_NAME]:desc
				"SubmissionId":null, //Submission identifier assigned to the content when it was initially submitted
				"SubmissionTime":null, //The submission date/time of the content
				"TotalCommentCount":null, //Number of comments associated with the content
				"TotalFeedbackCount":null, //Number of feedbacks received
				"TotalNegativeFeedbackCount":null, //Number of negative feedbacks received
				"TotalPositiveFeedbackCount":null, //Number of positive feedbacks received
				"UserLocation":null //Location of the author
			},
			"Sort_[TYPE]":null, // Sorting option for nested content. Sort order is required (asc or desc). TYPE can be any nested content. i.e. Comments for Reviews.
			"Stats":null // The type of statistics that will be calculated on included subjects. Available content types are: Reviews, Questions, Answers, Stories. Note: Not all statistical content types apply to every possible include.
		}
	}, options);

	// set URL base for API call
	var url = "http://" + defaultSettings["URL"]["CustomerName"] + "." + defaultSettings["URL"]["BaseURL"] + "data/" + "reviews." + defaultSettings["URL"]["Format"];
	
	// set URL parameters for API call
	var params = defaultSettings["Parameters"];

	// create array with url and parameters
	var apiCall = {"url":url, "params":params};

	// return the API call
	return apiCall;

};
