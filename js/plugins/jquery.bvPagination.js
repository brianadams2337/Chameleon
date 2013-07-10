/* JavaScript Document - Bazaarvoice - Pagination jQuery PlugIn v1.0 - written by Brian Adams */

(function($) {
// extend the jQuery
	$.fn.bvPaginate = function (container,options) {
		console.log('test');
		/* VARIABLES */
		
		// set defaults for options variable
		var settings = $.extend(true, {
			"parentContainer":"",
			"targetContainer":"",
			"viewContainer":"",
			"Offset":0,
			"Limit":10,
			"TotalResults":256,
			btnsDisplayed:7,
			prevBtn:true,
			prevBtnTxt:'&laquo;',
			nextBtn:true,
			nextBtnTxt:'&raquo;',
			firstBtn:true,
			firstBtnTxt:'First',
			lastBtn:true,
			lastBtnTxt:'Last',
			showPageTotal:true
		}, options);
/*
		// attach data to the object
		if (!(this.data('pageContainerPath'))) {
			var pageContainerPath = container;
			this.data('pageContainerPath',pageContainerPath);
		}
		if (!(this.data('contentArray'))) {
			elems = this.find('tr');
			contentArray = $.makeArray(elems);
			this.data('contentArray',contentArray);
		}
		if (!(this.data('options'))) {
			this.data('options',options);
		}
		if (!(this.data('currentPage'))) {
			this.data('currentPage',options.startPage);
		}		
		*/
		// get total amount of pages and set variable
		var pageCount = Math.ceil(settings["TotalResults"]/settings["Limit"]);
		console.log(pageCount);
		
		/* CREATE BUTTON NAVIGATION */
		
		// create div after parent object to hold the page nav
		$(pageContainerPath).parent('table').after($('<div />').addClass('paginationNav').data('pageContainerPath',pageContainerPath));
		
		// create 'First Page' button if needed
		if (options.firstBtn) {
			$(pageContainerPath).parent('table').next().append($('<a>'+options.firstBtnTxt+'</a>').addClass('paginationNavBtn').attr('name','first'));
		}
					
		// create 'Previous Page' button if needed
		if (options.prevBtn) {
			$(pageContainerPath).parent('table').next().append($('<a>'+options.prevBtnTxt+'</a>').addClass('paginationNavBtn').attr('name','previous'));
		}
		
		// create container for number links
		$(pageContainerPath).parent('table').next().append($('<span />').addClass('pageNumbers'));
		// create numbered page butons
		for (i=1;i<=pageCount;i++) {
			$(pageContainerPath).parent('table').next().find('.pageNumbers').append($('<a>'+i+'</a>').addClass('paginationNavBtn').attr('name',i));
			if (options.showPageTotal && i==pageCount) {
				// show the total number of pages if at the end of the loop
				$(pageContainerPath).parent('table').next().find('.pageNumbers').append('<span>'+' of '+pageCount+'</span>');
			}
		}
		
		// create 'Next Page' button if needed
		if (options.nextBtn) {
			$(pageContainerPath).parent('table').next().append($('<a>'+options.nextBtnTxt+'</a>').addClass('paginationNavBtn').attr('name','next'));
		}
		
		// create 'Last Page' button if needed
		if (options.lastBtn) {
			$(pageContainerPath).parent('table').next().append($('<a>'+options.lastBtnTxt+'</a>').addClass('paginationNavBtn').attr('name','last'));
		}
		
		// get all page number links and create an array
		btns = $(pageContainerPath).parent('table').next().find('.pageNumbers').find('a');
		btnsArray = $.makeArray(btns);
		
		// attach array of page number links to the link container
		$(pageContainerPath).parent('table').next().data('btnsArray',btnsArray);
		
		/* INITIAL UPDATE OF CONTENT AND NAVIGATION */

		this.bvPaginate.updateContent(this);
		this.bvPaginate.updateNav(this);
										
		// maintain chanability
		return this;
										
	};
	
	$.fn.bvPaginate.updateContent = function (pageContainerPath,newPage) {
	
		// get the keys of the array to start and stop diplaying on
		if (newPage) {
			start = ($(pageContainerPath).data('options')['itemsPerPage'] * newPage) - $(pageContainerPath).data('options')['itemsPerPage'];
			stop = ($(pageContainerPath).data('options')['itemsPerPage'] * newPage);
		} else {
			start = (pageContainerPath.data('options')['itemsPerPage'] * pageContainerPath.data('options')['startPage']) - pageContainerPath.data('options')['itemsPerPage'];
			stop = (pageContainerPath.data('options')['itemsPerPage'] * pageContainerPath.data('options')['startPage']);
		}
		// hide all contents of container displaying data
		$.each($(pageContainerPath).data('contentArray'), function() {
			$(this).hide();
		});
		// show the contents of container pertaining to the page
		$.each($(pageContainerPath).data('contentArray').slice(start,stop), function() {
			$(this).show();
		});
		
		// maintain chanability
		return this;
			
	};
	
	$.fn.bvPaginate.updateNav = function (pageContainerPath,newPage) {
	
		// get the keys of the array to start and stop diplaying on
		if (newPage) {
			cur = newPage;
			start = (cur-(Math.floor($(pageContainerPath).data('options')['btnsDisplayed']/2)))-1;
			stop = start+($(pageContainerPath).data('options')['btnsDisplayed']);
			if (start <= 0) {
				start = 0;
				stop = start+($(pageContainerPath).data('options')['btnsDisplayed']);
			}
			if (stop > (Math.ceil($(pageContainerPath).data('contentArray').length/$(pageContainerPath).data('options')['itemsPerPage']))) {
				stop = Math.ceil($(pageContainerPath).data('contentArray').length/$(pageContainerPath).data('options')['itemsPerPage']);
				start = stop-($(pageContainerPath).data('options')['btnsDisplayed']);
			}
		} else {
			cur = pageContainerPath.data('options')['startPage'];
			start = (cur-(Math.floor(pageContainerPath.data('options')['btnsDisplayed']/2)))-1;
			stop = start+(pageContainerPath.data('options')['btnsDisplayed']);
			if (start <= 0) {
				start = 0;
				stop = start+(pageContainerPath.data('options')['btnsDisplayed']);
			}
			if (stop > (Math.ceil(pageContainerPath.data('contentArray').length/pageContainerPath.data('options')['itemsPerPage']))) {
				stop = Math.ceil(pageContainerPath.data('contentArray').length/pageContainerPath.data('options')['itemsPerPage']);
				start = stop-(pageContainerPath.data('options')['btnsDisplayed']);
			}
		}
		// hide all page buttons
		$.each($(pageContainerPath).parent('table').next().data('btnsArray'), function() {
			$(this).hide();
			$(this).removeClass('paginationNavBtnCurrent');
			$(this).addClass('paginationNavBtn');
		});
		// show page buttons inside the portion of the array to be displayed
		$.each($(pageContainerPath).parent('table').next().data('btnsArray').slice(start,stop), function() {
			$(this).show();
			if ($(this).text() == cur) {
				$(this).removeClass('paginationNavBtn');
				$(this).addClass('paginationNavBtnCurrent');
				}
		});
		
		// maintain chanability
		return this;
						
	};

})(jQuery);
