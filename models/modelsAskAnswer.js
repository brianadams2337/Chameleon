// gets a single question by ID (no filter, sorts, etc)
function getSpecificQuestions (questionIDs, callBack, options) {
	var settings = $.extend(true, {
		"Parameters":{
			"Filter":{
				"Id":questionIDs
			}
		}
	}, options);
	var apiCall = questionAnswerAPICall(settings);
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

// gets all questions with answers & statistics - set productID to null to return all questions
function getAllQuestionsAnswers (productID, callBack, options) {
	var settings = $.extend(true, {
		"Parameters":{
			"Include":"Answers",
			"Stats":"Questions",
			"Filter":{
				"ProductId":productID
			},
			"Sort":{
				"SubmissionTime":"desc"
			}
		}
	}, options);
	var apiCall = questionAnswerAPICall(settings);
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

// gets all questions with statistics - set productID to null to return all questions
function getQuestionsStats (productID, callBack, options) {
	var settings = $.extend(true, {
		"Parameters":{
			"Include":"Answers",
			"Stats":"Questions",
			"Filter":{
				"ProductId":productID
			}
		}
	}, options);
	var apiCall = questionAnswerAPICall(settings);
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

// gets all featured questions - if no productID, all questions will return
function getFeaturedQuestions (productID, callBack, options) {
	var settings = $.extend(true, {
		"Parameters":{
			"Filter":{
				"ProductId":productID,
				"IsFeatured":true,
			}
		}
	}, options);
	var apiCall = questionAnswerAPICall(settings);
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

// gets all questions with photos - if no productID, all questions will return
function getPhotoQuestions (productID, callBack, options) {
	var settings = $.extend(true, {
		"Parameters":{
			"Filter":{
				"ProductId":productID,
				"HasPhotos":true
			}
		}
	}, options);
	var apiCall = questionAnswerAPICall(settings);
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

// gets all featured question with photos - if no productID, all questions will return
function getFeaturedPhotoQuestions (productID, callBack, options) {
	var settings = $.extend(true, {
		"Parameters":{
			"Filter":{
				"ProductId":productID,
				"IsFeatured":true,
				"HasPhotos":true
			}
		}
	}, options);
	var apiCall = questionAnswerAPICall(settings);
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
function getQuestionsCustom (productID, callBack, options) {
	var settings = $.extend(true, {
		"Parameters":{
			"Filter":{
				"ProductId":productID
			}
		}
	}, options);
	var apiCall = questionAnswerAPICall(settings);
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

function questionAnswerAPICall (options) {

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
				"Id":null, //The identifier of the Question.
				"AuthorId":null, //The identifier of the author who wrote the content
				"CampaignId":null, //The identifier of the Campaign associated with the content
				"CategoryAncestorId":null, //The identifier of the Product Category ancestor of the Product that the Question was written on.
				"CategoryId":null, //The identifier of the Product Category that the Question was written on.
				"ContentLocale":null, //Locale of the content to display. If this filter is not defined, all content regardless of its locale is returned. To return specific content by locale, define the value in the filter. A wildcard character “*” can be used to define the value, e.g., “en*” returns all content in English (en_US, en_CA, en_GB, etc.) or you can use a single ContentLocale code (e.g., “fr_FR”). ContentLocale codes are case-sensitive.
				"ContextDataValue_[DIMENSION_EXTERNAL_ID]":null, //The context data value for the content. DIMENSION_EXTERNAL_ID can be age, gender, etc. e.g. filter=contextdatavalue_age:under21&filter=contextdatavalue_gender:male
				"HasAnswers":null, //Boolean flag indicating whether the question has answers.
				"HasBestAnswer":null, //Boolean flag indicating whether the question has a best answer.
				"HasBrandAnswers":null, //Boolean flag indicating whether the question has at least one brand answer.
				"HasPhotos":null, //Boolean flag indicating whether content has photos
				"HasStaffAnswers":null, //Boolean flag indicating whether the question has staff answers.
				"HasTags":null, //Boolean flag indicating whether content has tags
				"HasVideos":null, //Boolean flag indicating whether content has videos. For more information on inserting the returned VideoUrl into HTML, see the API Basics page.
				"IsFeatured":null, //Boolean flag indicating whether content is featured
				"IsSubjectActive":null, //Boolean flag indicating whether the content subject is active
				"LastApprovedAnswerSubmissionTime":null, //The date/time of the latest approved answer submission
				"LastModeratedTime":null, //The date/time of the latest moderation of the content. See the Introduction for an example of using advanced operators for filtering.
				"LastModificationTime":null, //The date/time of the latest modification of the content. See the Introduction for an example of using advanced operators for filtering.
				"ModeratorCode":null, //String value indicating the moderator code for rejected content, e.g., &Filter=ModeratorCode:eq:CR returns UGC that contains the CR (Competitor Reference) code. Multiple codes can be entered in a comma-delimited list, e.g., &Filter=ModeratorCode:eq:CS,IU returns UGC with either the CS (Customer Service Complaint) or the IU (Inappropriate/Unusable Content) code. For a list of all Moderator Codes, see the API Basics page. Note that the ModeratorCodes attribute parameter must be explicitly requested in order to use this filter. See the Parameters section above.
				"ProductBrandId":null, //The value of the external product brand ID. The value is case-insensitive. To return content that doesn't have a brand ID associated with it, set productbrandid:eq:null
				"ProductId":null, //The identifier of the Product that the Question was written on.
				"SubmissionId":null, //Submission identifier assigned to the content when it was initially submitted
				"SubmissionTime":null, //The submission date/time of the content. See the Introduction for an example of using advanced operators for filtering.
				"Tag_[TAG_NAME]":null, //The tag name to filter by, e.g., filter=tag_[TAG_NAME]:eq:[TAG_VALUE]
				"TotalAnswerCount":null, //The number of answer the Question has
				"TotalFeedbackCount":null, //Number of feedbacks received
				"TotalNegativeFeedbackCount":null, //Number of negative feedbacks received
				"TotalPositiveFeedbackCount":null, //Number of positive feedbacks received
				"UserLocation":null //Location of the author
			},
			"Filter_[TYPE]":null, // Filtering option for included nested content. TYPE can be any included nested content. i.e. Answers for Questions.
			"Include":null, // Related subjects to be included (e.g. Products, Categories, Authors, or Answers).
			"Limit":apiDefaults["limit"], // Max number of records returned. An error is returned if the value passed exceeds 100.
			"Limit_[TYPE]":null, // Limit option for the nested content type returned. TYPE can be any nested content. e.g. Answers for Questions. An error is returned if the value passed exceeds 20.
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
				"CategoryId":null, //The identifier of the Product Category that the Question was written on.
				"ContentLocale":null, //Locale value of the content
				"ContextDataValue_[DIMENSION_EXTERNAL_ID]":null, //The context data value for the content. DIMENSION_EXTERNAL_ID can be age, gender, etc. e.g. sort=contextdatavalue_age:desc&sort=contextdatavalue_gender:asc
				"HasAnswers":null, //Boolean flag indicating whether the Question has answers.
				"HasBestAnswer":null, //Boolean flag indicating whether the Question has a best answer.
				"HasPhotos":null, //Boolean flag indicating whether content has photos
				"HasStaffAnswers":null, //Boolean flag indicating whether the Question has staff answers.
				"HasTags":null, //Boolean flag indicating whether content has tags
				"HasVideos":null, //Boolean flag indicating whether content has videos. For more information on inserting the returned VideoUrl into HTML, see the API Basics page.
				"IsFeatured":null, //Boolean flag indicating whether content is featured
				"IsSubjectActive":null, //Boolean flag indicating whether the content subject is active
				"LastApprovedAnswerSubmissionTime":null, //The date/time of the latest approved answer submission
				"LastModeratedTime":null, //The date/time of the latest moderation of the content
				"LastModificationTime":null, //The date/time of the latest modification of the content
				"ProductId":null, //The identifier of the product
				"SubmissionId":null, //Submission identifier assigned to the content when it was initially submitted
				"SubmissionTime":null, //The submission date/time of the content
				"Summary":null, //Summary of the question
				"TotalAnswerCount":null, //The number of Answers that have been written to the Questions.
				"TotalFeedbackCount":null, //Number of feedbacks received
				"TotalNegativeFeedbackCount":null, //Number of negative feedbacks received
				"TotalPositiveFeedbackCount":null, //Number of positive feedbacks received
				"UserLocation":null //Location of the author
			},
			"Sort_[TYPE]":null, // Sorting option for nested content. TYPE can be any nested content. e.g. Answers for Questions.
			"Stats":null // The type of statistics that will be calculated on included subjects. Available content types are: Reviews, Questions, Answers, Stories. Note: Not all statistical content types apply to every possible include.
		}
	}, options);
	
	// set URL base for API call
	var url = "http://" + defaultSettings["URL"]["CustomerName"] + "." + defaultSettings["URL"]["BaseURL"] + "data/" + "questions." + defaultSettings["URL"]["Format"];
	
	// set URL parameters for API call
	var params = defaultSettings["Parameters"];

	// create array with url and parameters
	var apiCall = {"url":url, "params":params};

	// return the API call
	return apiCall;

};
