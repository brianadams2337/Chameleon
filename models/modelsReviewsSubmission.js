// gets review submission form
function getReviewsSubmissionForm (productID, callBack, options) {
	var settings = $.extend(true, {
		"Parameters":{
			"ProductId":productID
		}
	}, options);
	var apiCall = reviewsSubmissionAPICall(settings);
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

function reviewsSubmissionAPICall (options) {

	var defaultSettings = $.extend(true, {
		"URL":{
			"BaseURL":apiBaseSubmissionURL,
			"CustomerName":apiDefaults["customerName"],
			"Format":apiDefaults["format"] //Response format (xml or json)
		},
		"Parameters":{
			"ApiVersion":apiDefaults["apiVersion"], //The API version.
			"Action":null, //The submission action to take -- either 'Preview' or 'Submit'. 'Preview' will show a draft of the content to be submitted; 'Submit' will submit the content. Note that if Action=Submit, the request must be an HTTP POST.
			"AdditionalField_<Dimension-External-Id>":null, //A concrete example of the parameter might be 'AdditionalField_Seat' with a value of '24F' (describing the seat number at a stadium or on a plane).
			"AgreedToTermsAndConditions":null, //Boolean indicating whether or not the user agreed to the terms and conditions. Required depending on the client's settings.
			"Callback":null, //Callback function name (JsonP).
			"CampaignId":null, //Arbitrary text that may be saved alongside content to indicate vehicle by which content was captured, e.g. “post-purchase email”.
			"ContextDataValue_<Dimension-External-Id>":null, //Some examples of this parameter include the following. Each is followed by possible values. ContextDataValue_PurchaserRank - "top", "top10", "top100", "top1000" ContextDataValue_Purchaser - "yes", "no" ContextDataValue_Age - "under21", "21to34", "35to44", "45to54", "55to64", "over65" ContextDataValue_Gender - "male", "female"
			"HostedAuthentication_AuthenticationEmail":null, //Email address where the submitter will receive the confirmation email. If you are configured to use hosted email authentication, this parameter is required. See the Authenticate User method for more information on hosted authentication.
			"HostedAuthentication_CallbackUrl":null, //URL of the link contained in the user authentication email. This should point to a landing page where a web application exists to complete the user authentication process. The host for the URL must be one of the domains configured for the client. The link in the email will contain a user authentication token (authtoken) that is used to verify the submitter. If you are configured to use hosted email authentication, this parameter is required. See the Authenticate User method for more information on hosted authentication.
			"IsRecommended":null, //Value is true or false; default is null – "true" or "false" answer to "I would recommend this to a friend". Required dependent on client settings.
			"Locale":null, //Locale to display Labels, Configuration, Product Attributes and Category Attributes in. The default value is the locale defined in the display associated with the API key.
			"NetPromoterComment":null, //Value is text representing a user comment to explain numerical Net Promoter score.
			"NetPromoterScore":null, //Value is positive integer between 1 and 10 representing a numerical rating in response to “How would you rate this company?”
			"PassKey":apiDefaults["passkey"], //API key is required to authenticate API user and check permission to access particular client's data.
			"PhotoCaption_<n>":null, //Value is caption text for the photo URL with the same value of <n>.
			"PhotoUrl_<n>":null, //Value is a Bazaarvoice URL of a photo uploaded using the Data API, where <n> is a non-negative integer.
			"ProductId":null, //The id of the product that this content is being submitted on.
			"ProductRecommendationId_<n>":null, //Value is non-negative integer representing the product external ID of the <n>'th product recommendation (for Social Recommendations)
			"Rating":null, //Value is positive integer between 1 and 5, and represents review overall rating. Required depending on client settings.
			"Rating_<Dimension-External-Id>":null, //A concrete example might be Rating_Quality where the value would represent the user's opinion of the quality of the product. The value is a positive integer between 1 and 5 and represents rating dimension value.
			"ReviewText":null, //Value is review body text.
			"SendEmailAlertWhenCommented":null, //Boolean indicating whether or not the user wants to be notified when a comment is posted on the content.
			"SendEmailAlertWhenPublished":null, //Boolean indicating whether or not the user wants to be notified when his/her content is published.
			"tag_<Dimension-External-Id>_<n>":null, //A concrete example of the parameter might be 'tag_Pro_1'. Valid values could be any free-form text. <n> should be a non-negative integer starting at the number 1.
			"Title":null, //Value is content title text.
			"User":null, //Value of the encrypted user. This parameter demonstrates that a user has been authenticated. Note that the UserId parameter does not contain authentication information and should not be used for hosted authentication. See the Authenticate User method for more information.
			"UserEmail":null, //User's email address
			"UserId":null, //User's external ID
			"UserLocation":null, //User location text
			"UserNickname":null, //User nickname display text
			"VideoCaption_<n>":null, //Value is caption text for the video URL with the same value of <n>.
			"VideoUrl_<n>":null //Value is valid YouTube or Bazaarvoice video-upload URL where <n> is a non-negative integer.
		}
	}, options);

	// set URL base for API call
	var url = "http://" + defaultSettings["URL"]["BaseURL"] + "data/" + "submitreview." + defaultSettings["URL"]["Format"];
	
	// set URL parameters for API call
	var params = defaultSettings["Parameters"];

	// create array with url and parameters
	var apiCall = {"url":url, "params":params};

	// return the API call
	return apiCall;

};