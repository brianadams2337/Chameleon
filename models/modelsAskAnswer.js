// gets a single question by ID (no filter, sorts, etc)
function getSpecificQuestions (questionIDs, callBack, options) {
	var settings = $.extend(true, {
		"Parameters":{
			"filter":{
				"id":questionIDs
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
			"include":"answers",
			"stats":"questions",
			"filter":{
				"productid":productID
			},
			"sort":{
				"submissiontime":"desc"
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
			"include":"answers",
			"stats":"questions",
			"filter":{
				"productid":productID
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
			"filter":{
				"productid":productID,
				"isfeatured":true,
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
			"filter":{
				"productid":productID,
				"hasphotos":true
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
			"filter":{
				"productid":productID,
				"isfeatured":true,
				"hasphotos":true
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
			"filter":{
				"productid":productID
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
			"baseurl":apiBaseURL,
			"customername":apiDefaults["customerName"],
			"format":apiDefaults["format"] //Response format (xml or json)
		},
		"Parameters":{
			"apiversion":apiDefaults["apiVersion"], //The API version.
			"attributes":null, // Attributes to be included when returning content. For example, if includes are requested along with the &attributes=ModeratorCodes parameter, both the includes and the results will contain moderator codes. In order to filter by ModeratorCode, you must request the ModeratorCodes attribute parameter.
			"callback":null, // Callback function name (JsonP).
			"excludefamily":null, // Boolean flag indicating whether to exclude content from other products in the same family as the requested product. For example, "&filter=productid:eq:1101&excludeFamily=true" limits returned content to just that of product 1101 and not any of the products in the same family. If a value is not defined, content on all products in the family will be returned.
			"filter":{ // Filter criteria for primary content of the query. Multiple filter criteria are supported.
				"id":null, //The identifier of the Question.
				"authorid":null, //The identifier of the author who wrote the content
				"campaignid":null, //The identifier of the Campaign associated with the content
				"categoryancestorid":null, //The identifier of the Product Category ancestor of the Product that the Question was written on.
				"categoryid":null, //The identifier of the Product Category that the Question was written on.
				"contentlocale":null, //Locale of the content to display. If this filter is not defined, all content regardless of its locale is returned. To return specific content by locale, define the value in the filter. A wildcard character “*” can be used to define the value, e.g., “en*” returns all content in English (en_US, en_CA, en_GB, etc.) or you can use a single ContentLocale code (e.g., “fr_FR”). ContentLocale codes are case-sensitive.
				"contextdatavalue_[DIMENSION_EXTERNAL_ID]":null, //The context data value for the content. DIMENSION_EXTERNAL_ID can be age, gender, etc. e.g. filter=contextdatavalue_age:under21&filter=contextdatavalue_gender:male
				"hasanswers":null, //Boolean flag indicating whether the question has answers.
				"hasbestanswer":null, //Boolean flag indicating whether the question has a best answer.
				"hasbrandanswers":null, //Boolean flag indicating whether the question has at least one brand answer.
				"hasphotos":null, //Boolean flag indicating whether content has photos
				"hasstaffanswers":null, //Boolean flag indicating whether the question has staff answers.
				"hastags":null, //Boolean flag indicating whether content has tags
				"hasvideos":null, //Boolean flag indicating whether content has videos. For more information on inserting the returned VideoUrl into HTML, see the API Basics page.
				"isfeatured":null, //Boolean flag indicating whether content is featured
				"issubjectactive":null, //Boolean flag indicating whether the content subject is active
				"lastapprovedanswersubmissiontime":null, //The date/time of the latest approved answer submission
				"lastmoderatedtime":null, //The date/time of the latest moderation of the content. See the Introduction for an example of using advanced operators for filtering.
				"lastmodificationtime":null, //The date/time of the latest modification of the content. See the Introduction for an example of using advanced operators for filtering.
				"moderatorcode":null, //String value indicating the moderator code for rejected content, e.g., &Filter=ModeratorCode:eq:CR returns UGC that contains the CR (Competitor Reference) code. Multiple codes can be entered in a comma-delimited list, e.g., &Filter=ModeratorCode:eq:CS,IU returns UGC with either the CS (Customer Service Complaint) or the IU (Inappropriate/Unusable Content) code. For a list of all Moderator Codes, see the API Basics page. Note that the ModeratorCodes attribute parameter must be explicitly requested in order to use this filter. See the Parameters section above.
				"productbrandid":null, //The value of the external product brand ID. The value is case-insensitive. To return content that doesn't have a brand ID associated with it, set productbrandid:eq:null
				"productid":null, //The identifier of the Product that the Question was written on.
				"submissionid":null, //Submission identifier assigned to the content when it was initially submitted
				"submissiontime":null, //The submission date/time of the content. See the Introduction for an example of using advanced operators for filtering.
				"tag_[TAG_NAME]":null, //The tag name to filter by, e.g., filter=tag_[TAG_NAME]:eq:[TAG_VALUE]
				"totalanswercount":null, //The number of answer the Question has
				"totalfeedbackcount":null, //Number of feedbacks received
				"totalnegativefeedbackcount":null, //Number of negative feedbacks received
				"totalpositivefeedbackcount":null, //Number of positive feedbacks received
				"userlocation":null //Location of the author
			},
			"filter_[TYPE]":null, // Filtering option for included nested content. TYPE can be any included nested content. i.e. Answers for Questions.
			"include":null, // Related subjects to be included (e.g. Products, Categories, Authors, or Answers).
			"limit":apiDefaults["limit"], // Max number of records returned. An error is returned if the value passed exceeds 100.
			"limit_[TYPE]":null, // Limit option for the nested content type returned. TYPE can be any nested content. e.g. Answers for Questions. An error is returned if the value passed exceeds 20.
			"locale":null, // Locale to display Labels, Configuration, Product Attributes and Category Attributes in. The default value is the locale defined in the display associated with the API key.
			"offset":apiDefaults["offset"], // Index at which to return results. By default, indexing begins at 0 when you issue a query. Using Limit=100, Offset=0 returns results 0-99. When changing this to Offset=1, results 1-100 are returned.
			"passkey":apiDefaults["passkey"], //API key is required to authenticate API user and check permission to access particular client's data.
			"search":null, // Full-text search string used to find UGC. For more information about what fields are searched by default, see the API Basics page.
			"search_[TYPE]":null, // Searching option for included content followed by full-text search string. See the API Basics page for examples of searching for included data.
			"sort":{ // Sort criteria for primary content type of the query. Sort order is required (asc or desc). Multi-attribute sorting for each content/subject type is supported.
				"id":null, //The identifier of the content/subject type
				"additionalfield_[FIELD_NAME]":null, //Additional field to sort by, e.g., sort=AdditionalField_[FIELD_NAME]:desc
				"authorid":null, //The Identifier of the author who wrote the content
				"campaignid":null, //The identifier of the Campaign associated with the content
				"categoryid":null, //The identifier of the Product Category that the Question was written on.
				"contentlocale":null, //Locale value of the content
				"contextdatavalue_[DIMENSION_EXTERNAL_ID]":null, //The context data value for the content. DIMENSION_EXTERNAL_ID can be age, gender, etc. e.g. sort=contextdatavalue_age:desc&sort=contextdatavalue_gender:asc
				"hasanswers":null, //Boolean flag indicating whether the Question has answers.
				"hasbestanswer":null, //Boolean flag indicating whether the Question has a best answer.
				"hasphotos":null, //Boolean flag indicating whether content has photos
				"hasstaffanswers":null, //Boolean flag indicating whether the Question has staff answers.
				"hastags":null, //Boolean flag indicating whether content has tags
				"hasvideos":null, //Boolean flag indicating whether content has videos. For more information on inserting the returned VideoUrl into HTML, see the API Basics page.
				"isfeatured":null, //Boolean flag indicating whether content is featured
				"issubjectactive":null, //Boolean flag indicating whether the content subject is active
				"lastapprovedanswersubmissiontime":null, //The date/time of the latest approved answer submission
				"lastmoderatedtime":null, //The date/time of the latest moderation of the content
				"lastmodificationtime":null, //The date/time of the latest modification of the content
				"productid":null, //The identifier of the product
				"submissionid":null, //Submission identifier assigned to the content when it was initially submitted
				"submissiontime":null, //The submission date/time of the content
				"summary":null, //Summary of the question
				"totalanswercount":null, //The number of Answers that have been written to the Questions.
				"totalfeedbackcount":null, //Number of feedbacks received
				"totalnegativeFeedbackcount":null, //Number of negative feedbacks received
				"totalpositiveFeedbackcount":null, //Number of positive feedbacks received
				"userlocation":null //Location of the author
			},
			"sort_[TYPE]":null, // Sorting option for nested content. TYPE can be any nested content. e.g. Answers for Questions.
			"stats":null // The type of statistics that will be calculated on included subjects. Available content types are: Reviews, Questions, Answers, Stories. Note: Not all statistical content types apply to every possible include.
		}
	}, options);
	
	// set URL base for API call
	var url = "http://" + defaultSettings["URL"]["customername"] + "." + defaultSettings["URL"]["baseurl"] + "data/" + "questions." + defaultSettings["URL"]["format"];
	
	// set URL parameters for API call
	var params = defaultSettings["Parameters"];

	// create array with url and parameters
	var apiCall = {"url":url, "params":params};

	// return the API call
	return apiCall;

};
