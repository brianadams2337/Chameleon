/***** FILE PATHS *****/


function pathView (view) {
	var path = siteBaseURL + "views/" + view;
	return path;
}

function pathModel (model) {
	var path = siteBaseURL + "models/" + model;
	return path;
}

function pathController (controller) {
	var path = siteBaseURL + "controllers/" + controller;
	return path;
}


/***** FORMS *****/


function loadSubmissionPage (url) {
	if (url) {
		$(location).attr('href', url);
	} else {
		alert("There is no URL to return to.");
	}
}

function returnToPage (url) {
	console.log(url);
	if (url) {
		$(location).attr('href', url);
	} else if (urlParameters["returnURL"]) {
		$(location).attr('href', urlParameters["returnURL"]);
	} else {
		console.log("There is no URL to return to.");
	}
}

function submitForm (action, form, productId) {
	$("#title").parsley( 'validate' );
	$(form).append("<input type='hidden' name='Action' value='" + action + "' />").append("<input type='hidden' name='ProductId' value='" + productId + "' />").submit();
}


/***** IDS & CLASSES *****/


function addOddEvenClasses (toReceive) {
	var total = $(toReceive).length;
	var current = 1;
	$(toReceive).each(function() {
		if (current %2 != 0) {
			$(this).addClass("BVodd");
		} else {
			$(this).addClass("BVeven");
		}
		current ++;
	});
}

function addFirstLastClasses (toReceive) {
	$(toReceive).first().addClass("BVfirst");
	$(toReceive).last().addClass("BVlast");
}


/***** GENERAL *****/


function setStarRating (toReceive, rating, range) {
	var imgWidth = $(toReceive).find('._BVRatingStarsUnfilledImage').andSelf().filter('._BVRatingStarsUnfilledImage').width();
   	var avgDecimal = (rating/range);
   	var avg = (avgDecimal * 100);
	var imgPercentage = (imgWidth / (imgWidth * avgDecimal)) * 100;

	$(toReceive).find('._BVRatingStarsContainer').andSelf().filter('._BVRatingStarsContainer').css({
		"position":"relative"
	});
	$(toReceive).find('._BVRatingStarsFilled').andSelf().filter('._BVRatingStarsFilled').css({
		"width":avg+"%",
		"position":"absolute",
		"top":"0px",
		"left":"0px",
		"overflow":"hidden"
	});
	$(toReceive).find('._BVRatingStarsFilledImage').andSelf().filter('._BVRatingStarsFilledImage').css({
		"width":imgPercentage+"%"
	});
	$(toReceive).find('._BVRatingStarsUnfilled').andSelf().filter('._BVRatingStarsUnfilled').css({
		"width":"100%"
	});
	
	$(toReceive).find('._BVRatingStarsText').andSelf().filter('._BVRatingStarsText').text(rating + " stars");
}

function convertDecimalToPercentage (value) {
	return value.toFixed(2) * 100;
}


/***** HEADERS *****/


// page headers
function loadPageHeader (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer,
		"targetContainer":defualtPageHeaderContainer,
		"viewContainer":defaultPageHeaderContainerView,
		"loadOrder":"",
		"productId":""
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		success: function(container) {
			var $container = $(container);
			// set text
			$container.find(defualtPageHeaderTextContainer).andSelf().filter(defualtPageHeaderTextContainer).text(content);
			// add header template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).html($container);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

// section headers
function loadSectionHeader (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer,
		"targetContainer":defualtSectionHeaderContainer,
		"viewContainer":defaultSectionHeaderContainerView,
		"loadOrder":"",
		"productId":""
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		success: function(container) {
			var $container = $(container);
			// set text
			$container.find(defualtSectionHeaderTextContainer).andSelf().filter(defualtSectionHeaderTextContainer).text(content);
			// add header template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).html($container);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}


/***** BUTTONS *****/


// submit button
function loadSubmitButton (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer,
		"targetContainer":defaultButtonSubmitContainer,
		"viewContainer":defaultButtonContainerView,
		"loadOrder":"",
		"productId":""
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		async: false,
		success: function(container) {
			var $container = $(container);
			// set attributes and text for button
			var url = "submission.html?productId=" + settings["productId"];
			$container.find("a").andSelf().filter("a").attr({
				"id":"",
				"title":"",
				"onclick":"submitForm('Submit', $(this).closest('form'));",
				"href":"#"
			}).find(defaultButtonTextContainer).andSelf().filter(defaultButtonTextContainer).text(content);
			// add button template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).html($container);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

// preview button
function loadPreviewButton (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer,
		"targetContainer":defaultButtonPreviewContainer,
		"viewContainer":defaultButtonContainerView,
		"loadOrder":"",
		"productId":""
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		async: false,
		success: function(container) {
			var $container = $(container);
			// set attributes and text for button
			var url = "submission.html?productId=" + settings["productId"];
			$container.find("a").andSelf().filter("a").attr({
				"id":"",
				"title":"",
				"onclick":"submitForm('Preview', $(this).closest('form'));",
				"href":"#"
			}).find(defaultButtonTextContainer).andSelf().filter(defaultButtonTextContainer).text(content);
			// add button template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).html($container);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

// edit button
function loadEditButton (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer,
		"targetContainer":defaultButtonEditContainer,
		"viewContainer":defaultButtonContainerView,
		"loadOrder":"",
		"productId":""
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		async: false,
		success: function(container) {
			var $container = $(container);
			$container.find("a").andSelf().filter("a").attr({
				"id":"",
				"title":"",
				"onclick":"",
				"href":"#"
			}).find(defaultButtonTextContainer).andSelf().filter(defaultButtonTextContainer).text(content);
			// add button template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).html($container);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

// cancel button
function loadCancelButton (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer,
		"targetContainer":defaultButtonCancelContainer,
		"viewContainer":defaultButtonContainerView,
		"loadOrder":"",
		"productId":"",
		"returnURL":""
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		async: false,
		success: function(container) {
			var $container = $(container);
			$container.find("a").andSelf().filter("a").attr({
				"id":"",
				"title":"",
				"onclick":"returnToPage('" + settings["returnURL"] + "');",
				"href":"#"
			}).find(defaultButtonTextContainer).andSelf().filter(defaultButtonTextContainer).text(content);
			// add button template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).html($container);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

// return button
function loadReturnButton (toReceive, toLoad, content, id) {
	$.ajax({
		url: toLoad,
		type: 'get',
		dataType: 'html',
		async: false,
		success: function(container) {
			$(container).appendTo(toReceive).find("a").attr({
				"id":"",
				"title":"",
				"onclick":"returnToPage();",
				"href":"#"
			}).find(defaultButtonTextContainer).andSelf().filter(defaultButtonTextContainer).text(content);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

// write review button
function loadWriteReviewButton (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultReviewsParentContainer,
		"targetContainer":defaultButtonWriteReviewContainer,
		"viewContainer":defaultButtonContainerView,
		"loadOrder":"",
		"productId":""
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		success: function(container) {
			var $container = $(container);
			// set attributes and text for button
			var returnURL = $(location).attr("href") + "";
			var submissionParams = $.param({
				"productId":settings["productId"],
				"returnURL":returnURL
			});
			console.log(submissionParams);
			var url = "submission.html?" + submissionParams;
			// set attributes
			$container.find("a").andSelf().filter("a").attr({
				"id":"",
				"title":"",
				"onclick":"loadSubmissionPage('" + url + "')",
				"href":"#"
			}).find(defaultButtonTextContainer).andSelf().filter(defaultButtonTextContainer).text(content);
			// add button template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).html($container);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}


/***** PAGINATION *****/


function loadNumberedPagination (content, options) {
	var settings = $.extend(true, {
		"parentContainer":"", // value needs to be set when called
		"targetContainer":"", // value needs to be set when called
		"viewContainer":"views/universal/pagination/paginationContainer.html",
		"loadOrder":"",
		"productId":"",
		"modelLocalDefaultSettings":"",
		"paginationSettings":{
			"offset":content["Offset"],
			"limit":content["Limit"],
			"totalResults":content["TotalResults"],
			"displayCount":7,
			"prevBtnBool":true,
			"prevBtnLabel":"Previous Page",
			"nextBtnBool":true,
			"nextBtnLabel":"Next Page",
			"firstBtnBool":true,
			"firstBtnLabel":"First Page",
			"lastBtnBool":true,
			"lastBtnLabel":"Last Page",
			"totalPageBool":false
		},
		"viewReloadOptions":{
			"model":"",
			"modelSettings":"",
			"controller":"",
			"controllerSettings":""
		}
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		success: function(container) {
			var $container = $(container);

			// set variables
			var pageOffset = settings["paginationSettings"]["offset"];
			var pageLimit = settings["paginationSettings"]["limit"];
			var pageCount = Math.ceil(settings["paginationSettings"]["totalResults"]/pageLimit); // total number of pages
			var pagesToDisplay = settings["paginationSettings"]["displayCount"]; // amount of pagination buttons to display
			
			var currentPage = pageCount - Math.ceil((settings["paginationSettings"]["totalResults"] - pageOffset)/pageLimit); // current page
			var firstPage = 1; // first page
			var firstPageLabel = firstPage + "..."; // first page label
			var lastPage = pageCount; // last page
			var lastPageLabel = "..." + lastPage; // last page label
			var prevPage = currentPage - 1; // previous page
			var prevPageLabel = settings["paginationSettings"]["prevBtnLabel"]; // previous page label
			var nextPage = currentPage + 1; // next page
			var nextPageLabel = settings["paginationSettings"]["nextBtnLabel"]; // next page label

			var startPage = currentPage - Math.floor(pagesToDisplay/2); // first pagination link to display - DEFAULT
			var stopPage = (startPage + pagesToDisplay) - 1; // last pagination link to display - DEFAULT

			// make sure pagination nav never goes below 1
			if (startPage <= 0) {
				startPage = 1;
				stopPage = ((startPage + pagesToDisplay) - 1);
			}
			
			// make sure pagination nav never goes above total page count
			if (stopPage > pageCount) {
				stopPage = pageCount;
				if (((stopPage - pagesToDisplay) + 1) <= 1) {
					startPage = 1;
				} else {
					startPage = ((stopPage - pagesToDisplay) + 1);
				}
			}

			// check if pagination is needed
			if (pageCount > 1) {

				// prev page button
				if (settings["paginationSettings"]["prevBtnBool"] && prevPage >= 0) {
					// set offset and limit in api call for each button respectively
					settings["viewReloadOptions"]["modelSettings"]["Parameters"]["Offset"] = (pageLimit * prevPage);
					settings["viewReloadOptions"]["modelSettings"]["Parameters"]["Limit"] = pageLimit;
					
					// load button
					loadPaginationButton (prevPageLabel, {
						"parentContainer":$container,
						"targetContainer":"._BVPaginationBtnPrev",
						"viewReloadOptions":settings["viewReloadOptions"]
					});
				}

				// first page button
				if (settings["paginationSettings"]["firstBtnBool"] && startPage > 1) {
					// set offset and limit in api call for each button respectively
					settings["viewReloadOptions"]["modelSettings"]["Parameters"]["Offset"] = (pageLimit * (firstPage - 1));
					settings["viewReloadOptions"]["modelSettings"]["Parameters"]["Limit"] = pageLimit;
					
					// load button
					loadPaginationButton (firstPageLabel, {
						"parentContainer":$container,
						"targetContainer":"._BVPaginationBtnFirst",
						"viewReloadOptions":settings["viewReloadOptions"]
					});
				}

				// pagination buttons
				for (var i = startPage; i <= stopPage; i++) {
					if (i == currentPage) {
						// set offset and limit in api call for each button respectively
						settings["viewReloadOptions"]["modelSettings"]["Parameters"]["Offset"] = (pageLimit * (i - 1));
						settings["viewReloadOptions"]["modelSettings"]["Parameters"]["Limit"] = pageLimit;
						
						// load button
						loadPaginationButton (i, {
							"parentContainer":$container,
							"targetContainer":"._BVPaginationBtnContainer",
							"viewReloadOptions":settings["viewReloadOptions"]
						});
					} else {
						// set offset and limit in api call for each button respectively
						settings["viewReloadOptions"]["modelSettings"]["Parameters"]["Offset"] = (pageLimit * (i - 1));
						settings["viewReloadOptions"]["modelSettings"]["Parameters"]["Limit"] = pageLimit;
						
						// load button
						loadPaginationButton (i, {
							"parentContainer":$container,
							"targetContainer":"._BVPaginationBtnContainer",
							"viewReloadOptions":settings["viewReloadOptions"]
						});
					}
				}
				if (settings["paginationSettings"]["totalPageBool"]) {
					// show the total number of pages if at the end of the loop
					$container.find("._BVPaginationBtnOutOfText").andSelf().filter("._BVPaginationBtnOutOfText").html(pageCount);
				}

				// last page button
				if (settings["paginationSettings"]["lastBtnBool"] && pageCount > stopPage) {
					//echo "\t".' | '.'<a href="?limit='.$GLOBALS['displayLimit'].'&amp;page='.$pageCount.'" class="active">'.' ... '.$pageCount.'</a>'."\n";
					// set offset and limit in api call for each button respectively
					settings["viewReloadOptions"]["modelSettings"]["Parameters"]["Offset"] = (pageLimit * (lastPage - 1));
					settings["viewReloadOptions"]["modelSettings"]["Parameters"]["Limit"] = pageLimit;
					
					// load button
					loadPaginationButton (lastPageLabel, {
						"parentContainer":$container,
						"targetContainer":"._BVPaginationBtnLast",
						"viewReloadOptions":settings["viewReloadOptions"]
					});
				}

				// next page button
				if (settings["paginationSettings"]["nextBtnBool"] && nextPage < pageCount) {
					// set offset and limit in api call for each button respectively
					settings["viewReloadOptions"]["modelSettings"]["Parameters"]["Offset"] = (pageLimit * nextPage);
					settings["viewReloadOptions"]["modelSettings"]["Parameters"]["Limit"] = pageLimit;
					
					// load button
					loadPaginationButton (nextPageLabel, {
						"parentContainer":$container,
						"targetContainer":"._BVPaginationBtnNext",
						"viewReloadOptions":settings["viewReloadOptions"]
					});
				}

			}

			// add pagination template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($container);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

function loadPaginationButton (content, options) {
	var settings = $.extend(true, {
		"parentContainer":"", // value needs to be set when called
		"targetContainer":"._BVPaginationBtnContainer",
		"viewContainer":"views/universal/pagination/paginationButtonContainer.html",
		"loadOrder":"",
		"productId":"",
		"viewReloadOptions":{
			"model":"",
			"modelSettings":"",
			"controller":"",
			"controllerSettings":""
		}
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		async: false,
		success: function(container) {
			var $container = $(container);
			// set variables
			$container.find("._BVPaginationButtonContainer").andSelf().filter("._BVPaginationButtonContainer").html(content);
			$container.click(function(){
				settings["viewReloadOptions"]["model"] (
					settings["productId"],
					function(content) {
						// callback function
						settings["viewReloadOptions"]["controller"](content, settings["viewReloadOptions"]["controllerSettings"]);
					},
					settings["viewReloadOptions"]["modelSettings"]
				);
			});
			// add pagination button template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($container);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}


/***** FILTERS *****/


function loadFiltersContextDataValuesGroup (content, options) {
	var filtersToLoad = content["Includes"]["Products"][settings["productId"]]['ReviewStatistics']["ContextDataDistribution"]; // review stats
	var defaultLoadOrder = new Array();
	$.each(filtersToLoad, function() {
		defaultLoadOrder.push(this);
	});
	var settings = $.extend(true, {
		"parentContainer":"", // value needs to be set when called
		"targetContainer":"", // value needs to be set when called
		"viewContainer":"views/universal/filters/filters.html",
		"loadOrder":"",
		"productId":"",
		"modelLocalDefaultSettings":"",
		"filterSettings":{
			"offset":content["Offset"],
			"limit":content["Limit"],
			"totalResults":content["TotalResults"],
			"displayCount":7,
			"popinBool":true,
			"onClickBool":true,
			"showCountBool":true
		},
		"viewReloadOptions":{
			"model":"",
			"modelSettings":"",
			"controller":"",
			"controllercontrollerSettings":""
		}
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		success: function(container) {
			var $container = $(container);

			// set variables
			var pageOffset = settings["paginationSettings"]["offset"];
			var pageLimit = settings["paginationSettings"]["limit"];
			var pageCount = Math.ceil(settings["paginationSettings"]["totalResults"]/pageLimit); // total number of pages
			var pagesToDisplay = settings["paginationSettings"]["displayCount"]; // amount of pagination buttons to display
			
			var currentPage = pageCount - Math.ceil((settings["paginationSettings"]["totalResults"] - pageOffset)/pageLimit); // current page
			var firstPage = 1; // first page
			var firstPageLabel = firstPage + "..."; // first page label
			var lastPage = pageCount; // last page
			var lastPageLabel = "..." + lastPage; // last page label
			var prevPage = currentPage - 1; // previous page
			var prevPageLabel = settings["paginationSettings"]["prevBtnLabel"]; // previous page label
			var nextPage = currentPage + 1; // next page
			var nextPageLabel = settings["paginationSettings"]["nextBtnLabel"]; // next page label

			var startPage = currentPage - Math.floor(pagesToDisplay/2); // first pagination link to display - DEFAULT
			var stopPage = (startPage + pagesToDisplay) - 1; // last pagination link to display - DEFAULT

			// make sure pagination nav never goes below 1
			if (startPage <= 0) {
				startPage = 1;
				stopPage = ((startPage + pagesToDisplay) - 1);
			}
			
			// make sure pagination nav never goes above total page count
			if (stopPage > pageCount) {
				stopPage = pageCount;
				if (((stopPage - pagesToDisplay) + 1) <= 1) {
					startPage = 1;
				} else {
					startPage = ((stopPage - pagesToDisplay) + 1);
				}
			}

			// check if pagination is needed
			if (pageCount > 1) {

				// prev page button
				if (settings["paginationSettings"]["prevBtnBool"] && prevPage >= 0) {
					// set offset and limit in api call for each button respectively
					settings["viewReloadOptions"]["modelSettings"]["Parameters"]["Offset"] = (pageLimit * prevPage);
					settings["viewReloadOptions"]["modelSettings"]["Parameters"]["Limit"] = pageLimit;
					
					// load button
					loadPaginationButton (prevPageLabel, {
						"parentContainer":$container,
						"targetContainer":"._BVPaginationBtnPrev",
						"viewReloadOptions":settings["viewReloadOptions"]
					});
				}

				// first page button
				if (settings["paginationSettings"]["firstBtnBool"] && startPage > 1) {
					// set offset and limit in api call for each button respectively
					settings["viewReloadOptions"]["modelSettings"]["Parameters"]["Offset"] = (pageLimit * (firstPage - 1));
					settings["viewReloadOptions"]["modelSettings"]["Parameters"]["Limit"] = pageLimit;
					
					// load button
					loadPaginationButton (firstPageLabel, {
						"parentContainer":$container,
						"targetContainer":"._BVPaginationBtnFirst",
						"viewReloadOptions":settings["viewReloadOptions"]
					});
				}

				// pagination buttons
				for (var i = startPage; i <= stopPage; i++) {
					if (i == currentPage) {
						// set offset and limit in api call for each button respectively
						settings["viewReloadOptions"]["modelSettings"]["Parameters"]["Offset"] = (pageLimit * (i - 1));
						settings["viewReloadOptions"]["modelSettings"]["Parameters"]["Limit"] = pageLimit;
						
						// load button
						loadPaginationButton (i, {
							"parentContainer":$container,
							"targetContainer":"._BVPaginationBtnContainer",
							"viewReloadOptions":settings["viewReloadOptions"]
						});
					} else {
						// set offset and limit in api call for each button respectively
						settings["viewReloadOptions"]["modelSettings"]["Parameters"]["Offset"] = (pageLimit * (i - 1));
						settings["viewReloadOptions"]["modelSettings"]["Parameters"]["Limit"] = pageLimit;
						
						// load button
						loadPaginationButton (i, {
							"parentContainer":$container,
							"targetContainer":"._BVPaginationBtnContainer",
							"viewReloadOptions":settings["viewReloadOptions"]
						});
					}
				}
				if (settings["paginationSettings"]["totalPageBool"]) {
					// show the total number of pages if at the end of the loop
					$container.find("._BVPaginationBtnOutOfText").andSelf().filter("._BVPaginationBtnOutOfText").html(pageCount);
				}

				// last page button
				if (settings["paginationSettings"]["lastBtnBool"] && pageCount > stopPage) {
					//echo "\t".' | '.'<a href="?limit='.$GLOBALS['displayLimit'].'&amp;page='.$pageCount.'" class="active">'.' ... '.$pageCount.'</a>'."\n";
					// set offset and limit in api call for each button respectively
					settings["viewReloadOptions"]["modelSettings"]["Parameters"]["Offset"] = (pageLimit * (lastPage - 1));
					settings["viewReloadOptions"]["modelSettings"]["Parameters"]["Limit"] = pageLimit;
					
					// load button
					loadPaginationButton (lastPageLabel, {
						"parentContainer":$container,
						"targetContainer":"._BVPaginationBtnLast",
						"viewReloadOptions":settings["viewReloadOptions"]
					});
				}

				// next page button
				if (settings["paginationSettings"]["nextBtnBool"] && nextPage < pageCount) {
					// set offset and limit in api call for each button respectively
					settings["viewReloadOptions"]["modelSettings"]["Parameters"]["Offset"] = (pageLimit * nextPage);
					settings["viewReloadOptions"]["modelSettings"]["Parameters"]["Limit"] = pageLimit;
					
					// load button
					loadPaginationButton (nextPageLabel, {
						"parentContainer":$container,
						"targetContainer":"._BVPaginationBtnNext",
						"viewReloadOptions":settings["viewReloadOptions"]
					});
				}

			}

			// add pagination template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($container);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

