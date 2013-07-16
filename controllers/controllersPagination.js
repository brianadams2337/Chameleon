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
					settings["viewReloadOptions"]["modelSettings"]["Parameters"]["offset"] = (pageLimit * prevPage);
					settings["viewReloadOptions"]["modelSettings"]["Parameters"]["limit"] = pageLimit;
					
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
					settings["viewReloadOptions"]["modelSettings"]["Parameters"]["offset"] = (pageLimit * (firstPage - 1));
					settings["viewReloadOptions"]["modelSettings"]["Parameters"]["limit"] = pageLimit;
					
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
						settings["viewReloadOptions"]["modelSettings"]["Parameters"]["offset"] = (pageLimit * (i - 1));
						settings["viewReloadOptions"]["modelSettings"]["Parameters"]["limit"] = pageLimit;
						
						// load button
						loadPaginationButton (i, {
							"parentContainer":$container,
							"targetContainer":"._BVPaginationBtnContainer",
							"viewReloadOptions":settings["viewReloadOptions"]
						});
					} else {
						// set offset and limit in api call for each button respectively
						settings["viewReloadOptions"]["modelSettings"]["Parameters"]["offset"] = (pageLimit * (i - 1));
						settings["viewReloadOptions"]["modelSettings"]["Parameters"]["limit"] = pageLimit;
						
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
					settings["viewReloadOptions"]["modelSettings"]["Parameters"]["offset"] = (pageLimit * (lastPage - 1));
					settings["viewReloadOptions"]["modelSettings"]["Parameters"]["limit"] = pageLimit;
					
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
					settings["viewReloadOptions"]["modelSettings"]["Parameters"]["offset"] = (pageLimit * nextPage);
					settings["viewReloadOptions"]["modelSettings"]["Parameters"]["limit"] = pageLimit;
					
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