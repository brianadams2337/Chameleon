/***** CLIENT DEFAULTS *****/

// url path for staging site
var stagingURL = "http://localhost:8888/Chameleon/";
// url pate for production site
var productionURL = "http://localhost:8888/Chameleon/";

// api parameter deautls
var apiDefaults = {
	stagURL: "bazaarvoice.com/bvstaging/",
	prodURL: "bazaarvoice.com/",
	stagSubmissionURL: "stg.api.bazaarvoice.com/",
	prodSubmissionURL: "api.bazaarvoice.com/",
	customerName: "bvpstemplates.ugc",
	format: "json",
	apiVersion: "5.4",
	passkey: "56m3b2rfbcquf5j6fejjuu3w", //kuy3zj9pr3n7i0wxajrzj04xo 56m3b2rfbcquf5j6fejjuu3w pywbyvnm7pmaes6vrfdvr5k7
	offset: 0,
	limit: 10,
	page: 1
};



/***** SET SITE TO PRODUCTION *****/
// true = production
// false = staging

var production = false;



/***** SET SITE URLS *****/

var apiBaseURL;
	if (production) {
		apiBaseURL = apiDefaults["prodURL"];
		apiBaseSubmissionURL = apiDefaults["prodSubmissionURL"];
	} else {
		apiBaseURL = apiDefaults["stagURL"];
		apiBaseSubmissionURL = apiDefaults["stagSubmissionURL"];
};

var siteBaseURL;
	if (production) {
		siteBaseURL = productionURL;
	} else {
		siteBaseURL = stagingURL;
};



/***** SERVER SIDE URLS *****/

var defaultServerSideLanguage = "php";

var defaultReviewSubmissionFormProcessingFile = defaultServerSideLanguage + "/" + "bvReviewSubmissionProcess" + "." + defaultServerSideLanguage;
var defaultReviewCommentSubmissionFormProcessingFile = defaultServerSideLanguage + "/" + "bvReviewCommentSubmissionProcess" + "." + defaultServerSideLanguage;
var defaultQuestionSubmissionFormProcessingFile = defaultServerSideLanguage + "/" + "bvQuestionSubmissionProcess" + "." + defaultServerSideLanguage;
var defaultAnswerSubmissionFormProcessingFile = defaultServerSideLanguage + "/" + "bvAnswerSubmissionProcess" + "." + defaultServerSideLanguage;
var defaultStorySubmissionFormProcessingFile = defaultServerSideLanguage + "/" + "bvStorySubmissionProcess" + "." + defaultServerSideLanguage;
var defaultStoryCommentSubmissionFormProcessingFile = defaultServerSideLanguage + "/" + "bvStoryCommentSubmissionProcess" + "." + defaultServerSideLanguage;

var defaultFeedbackFormProcessingFile = defaultServerSideLanguage + "/" + "bvFeedbackProcess" + "." + defaultServerSideLanguage;

var defaultPhotoUploadProcessingFile = defaultServerSideLanguage + "/" + "bvPhotoUploadProcess" + "." + defaultServerSideLanguage;
var defaultVideoUploadFormProcessingFile = defaultServerSideLanguage + "/" + "bvVideoUploadProcess" + "." + defaultServerSideLanguage;



