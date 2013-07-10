var settings = $.extend(true, {
	"parentContainer":"", // NO DEFAULT
	"targetContainer":"",
	"viewContainer":"",
	"loadOrder":"",
	"productId":"", // id associated with the product
	"contentId":"", // id associated with the content (i.e. review, question, story, etc.) being displayed
	"returnURL":"",
	"modelLocalDefaultSettings":"", // used to pass the api settings into the local function (for use with pagination, filter, and sort reloading)
	// submission input settings
	"inputSettings":{
		"inputName":"",
		"inputType":"",
		"inputLabel":"",
		"inputPlaceholder":"", // USER DEFINED
		"inputHelperText":"", // USER DEFINED
		"inputValue":"",
		"inputSelected":"",
		"inputMinLength":"",
		"inputMaxLength":"",
		"inputRequired":"",
		"inputDefault":"",
		"inputOptionsArray":"",
		"inputSubElements":""
	},
	// pagination settings
	"paginationSettings":{
		"offset":null,
		"limit":null,
		"totalResults":null,
		"btnsDisplayed":null,
		"prevBtnBool":"",
		"prevBtnLabel":"",
		"nextBtnBool":"",
		"nextBtnLabel":"",
		"firstBtnBool":"",
		"firstBtnLabel":"",
		"lastBtnBool":"",
		"lastBtnLabel":"",
		"totalPageBool":""
	},
	// for pagination, filtering, sorting, etc
	"viewReloadOptions":{
		"model":"",
		"modelSettings":"",
		"controller":"",
		"controllerSettings":""
	}
}, options);
