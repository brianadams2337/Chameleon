// gets review submission form
function postFeedbackForm (contentID, callBack, options) {
	var settings = $.extend(true, {
		"Parameters":{
			"contentid":contentID
		}
	}, options);
	var apiCall = feedbackAPICall(settings);
	var url = apiCall["url"];
	var params = $.param(apiCall["params"]);
	$.ajax({
		type: "POST",
		url: defaultFeedbackFormProcessingFile,
		data: params,
		dataType: "json",
		success: function(data) {
			console.log(data);
			callBack(data, settings);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

function feedbackAPICall (options) {

	var defaultSettings = $.extend(true, {
		"URL":{
			"baseurl":apiBaseSubmissionURL,
			"customername":apiDefaults["customerName"],
			"format":apiDefaults["format"] //Response format (xml or json)
		},
		"Parameters":{
			"apiversion":apiDefaults["apiVersion"], //The API version.
			"contentid":null, //ID of the content with which the feedback is associated
			"contenttype":null, //Type of content with which the feedback is associated (review, story, question, answer, story_comment, review_comment)
			"feedbacktype":null, //Type of feedback (inappropriate, helpfulness)
			"passkey":apiDefaults["passkey"], //API key is required to authenticate API user and check permission to access particular client's data.
			"productid":null, //Product ID which the feedback is associated
			"userid":bvUserDefaults["userId"], //User's external ID
			"vote":null, //Helpfulness vote for this content. Valid votes are: Positive, Negative, UNDO. This parameter is only required for FeedbackType=helpfulness.
			"reasontext":null //Reason this content has been flagged as inappropriate
		}
	}, options);

	// set URL base for API call
	var url = "http://" + defaultSettings["URL"]["baseurl"] + "data/" + "submitfeedback." + defaultSettings["URL"]["format"];
	
	// set URL parameters for API call
	var params = defaultSettings["Parameters"];

	// create array with url and parameters
	var apiCall = {"url":url, "params":params};

	// return the API call
	return apiCall;

};