/***** CLIENT DEFAULTS *****/

// url path for staging site
var stagingURL = "http://localhost:8888/Chameleon/";
// url pate for production site
var productionURL = "http://localhost:8888/Chameleon/";

// 
var apiDefaults = {
	stagURL: "bazaarvoice.com/bvstaging/data/",
	prodURL: "bazaarvoice.com/data/",
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
	} else {
		apiBaseURL = apiDefaults["stagURL"];
};

var siteBaseURL;
	if (production) {
		siteBaseURL = productionURL;
	} else {
		siteBaseURL = stagingURL;
};