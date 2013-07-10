// gets review submission form
function getFeedbackForm (contentID, callBack, options) {
	var settings = $.extend(true, {
		"Parameters":{
			"ContentId":contentID,
			"ProductId":"",
			"ContentType":"",
			"FeedbackType":"",
			"UserId":"",
			"Vote":"",
			"ReasonText":""
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
			"BaseURL":apiBaseSubmissionURL,
			"CustomerName":apiDefaults["customerName"],
			"Format":apiDefaults["format"] //Response format (xml or json)
		},
		"Parameters":{
			"ApiVersion":apiDefaults["apiVersion"], //The API version.
			"ContentId":null, //ID of the content with which the feedback is associated
			"ContentType":null, //Type of content with which the feedback is associated (review, story, question, answer, story_comment, review_comment)
			"FeedbackType":null, //Type of feedback (inappropriate, helpfulness)
			"PassKey":apiDefaults["passkey"], //API key is required to authenticate API user and check permission to access particular client's data.
			"ProductId":null, //Product ID which the feedback is associated
			"UserId":null, //User's external ID
			"Vote":null, //Helpfulness vote for this content. Valid votes are: Positive, Negative, UNDO. This parameter is only required for FeedbackType=helpfulness.
			"ReasonText":null //Reason this content has been flagged as inappropriate
		}
	}, options);

	// set URL base for API call
	var url = "http://" + defaultSettings["URL"]["BaseURL"] + "data/" + "submitfeedback." + defaultSettings["URL"]["Format"];
	
	// set URL parameters for API call
	var params = defaultSettings["Parameters"];

	// create array with url and parameters
	var apiCall = {"url":url, "params":params};

	// return the API call
	return apiCall;

};