/* DEFAULT SUBMISSION FORM FUNCTION */

function loadReviewSubmissionForm (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionContainer,
		"targetContainer":defaultSubmissionFormContainer,
		"viewContainer":defaultSubmissionFormContainerView,
		"loadOrder":"",
		"productId":"",
		"returnURL":"",
		"inputSettings":{
			"inputName":content["Id"],
			"inputType":content["Type"],
			"inputLabel":content["Label"],
			"inputPlaceholder":"",
			"inputValue":content["Value"],
			"inputMinLength":content["MinLength"],
			"inputMaxLength":content["MaxLength"],
			"inputRequired":content["Required"],
			"inputDefault":content["Default"],
			"inputOptionsArray":content["Options"]
		}
	}, options);
	console.log(content);
	$(settings["targetContainer"]).hide();
	// get a new id for the submission container using product id - this will be needed for reference on child elements
	var newID = "BVSubmissionContainerID" + settings["productId"];
	$.when(
		$.ajax({
			url: settings["viewContainer"],
			type: 'get',
			dataType: 'html',
			async: false,
			success: function(container) {
				var $container = $(container);
				// add submission container
				$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($($container).attr("id", newID));
				// set form attributes (just fallbacks, not needed since we are using ajax submission)
				$container.find("form").andSelf().filter("form").attr({
					"id":newID,
					"name":newID,
					//"action":"formprocess.php?productId=" + settings["productId"],
					"method":"POST",
					"enctype":"application/x-www-form-urlencoded",
					"autocomplete":"on",
					"accept-charset":"UTF-8",
					"target":""
				});
				
				/***** headers *****/

				loadPageHeader ("Write Your Review", {
					"parentContainer":$container,
					"targetContainer":defualtPageHeaderContainer
				});
				loadSectionHeader ("Your Rating", {
					"parentContainer":$container,
					"targetContainer":"._BVSectionHeaderRatingsContainer"
				});
				loadSectionHeader ("Your Review", {
					"parentContainer":$container,
					"targetContainer":"._BVSectionHeaderReviewContainer"
				});
				loadSectionHeader ("Media Upload", {
					"parentContainer":$container,
					"targetContainer":"._BVSectionHeaderMediaContainer"
				});
				loadSectionHeader ("User Info", {
					"parentContainer":$container,
					"targetContainer":"._BVSectionHeaderUserContainer"
				});
				
				/***** inputs *****/

				// overall rating
				loadOverallRatingInput (content, {
					"parentContainer":$container,
					"inputSettings":{
						"inputLabel":"Overall Rating"
					}
				});
				// is recommended
				loadIsRecommendedInput (content, {
					"parentContainer":$container,
					"inputSettings":{
						"inputLabel":"Would you recommend this product?"
					}
				});
				// review title
				loadReviewTitleInput (content, {
					"parentContainer":$container,
					"inputSettings":{
						"inputLabel":"Review Title"
					}
				});
				// review text
				loadReviewTextInput (content, {
					"parentContainer":$container,
					"inputSettings":{
						"inputLabel":"Review Text"
					}
				});
				/* TURNED OFF DUE TO ANON SUB
				// nickname
				loadUserNicknameInput (content, {
					"parentContainer":$container,
					"inputSettings":{
						"inputLabel":"User Nickname",
					}
				});
				// email
				loadUserEmailInput (content, {
					"parentContainer":$container,
					"inputSettings":{
						"inputLabel":"User Email",
					}
				});
				*/
				// location
				loadUserLocationInput (content, {
					"parentContainer":$container,
					"inputSettings":{
						"inputLabel":"User Location",
					}
				});
				// user id
				loadUserIDInput (content, {
					"parentContainer":$container,
					"inputSettings":{
						"inputLabel":"User Id",
						"inputName":"userid"
					}
				});
				// device fingerprint
				console.log("devicefingerprint");
				// product id
				console.log("productid");
				// submission id
				console.log("submissionid");
				// auth source type
				console.log("authsourcetype");
				// is ratings only
				console.log("isratingsonly");
				// net promoter score
				console.log("netpromoterscore");
				// net promoter comment
				console.log("netpromotercomment");

				// context data values
				loadContextDataValueGroupInput (content, {
					"parentContainer":$container
				});
				// additional fields
				loadAdditionalFieldGroupInput (content, {
					"parentContainer":$container
				});
				// secondary ratings
				loadSecondaryRatingGroup (content, {
					"parentContainer":$container
				});
				// photo upload
				console.log("photoupload");
				// video upload
				console.log("videoupload");
				// product recommendations
				console.log("productrecommendations");
				// tags
				loadTagGroupInput (content, {
					"parentContainer":$container
				});
				// user location geocode
				console.log("userlocationgeocode");
				// hosted authentication
				console.log("hostedauthentication");

				// buttons
				loadTermsAndConditionsInput (content, {
					"parentContainer":$container
				});
				/*
				loadSendEmailAlertWhenPublishedInput (content, {
					"parentContainer":$container
				});
				loadSendEmailAlertWhenCommentedInput (content, {
					"parentContainer":$container
				});*/

				// submit button
				loadSubmitButton ("Submit", {
					"parentContainer":$container
				});
				// submit button functionality
				$container.find(defaultButtonSubmitContainer + " " + defaultButtonContainer).andSelf().filter(defaultButtonSubmitContainer + " " + defaultButtonContainer).click(function() {
					// get form parameters
					var params = returnFormParamaters("#" + newID, {
						"action":"submit"
					});
					// POST form to server
					postReviewsSubmissionForm(settings["productId"],
						function () {
							console.log("submitted");
						}, {
						"Parameters": params
					});
				});

				// preivew button
				loadPreviewButton ("Preview", {
					"parentContainer":$container
				});
				// preivew button functionality
				$container.find(defaultButtonPreviewContainer + " " + defaultButtonContainer).andSelf().filter(defaultButtonPreviewContainer + " " + defaultButtonContainer).click(function() {
					// get form parameters
					var params = returnFormParamaters("#" + newID, {
						"action":"preview"
					});
					// POST form to server
					postReviewsSubmissionForm(settings["productId"],
						function () {
							console.log("preview");
						}, {
						"Parameters": params
					});
				});

				// cancel button
				loadCancelButton ("Cancel", {
					"parentContainer":$container,
					"returnURL":settings["returnURL"]
				});
			},
			error: function(e) {
				defaultAjaxErrorFunction(e);
			}
		})
	).done(function(){
		$(settings["targetContainer"]).show();
		$(settings["parentContainer"]).removeClass("_BVContentLoadingContainer");
		$(function(){
			$('input[type=radio].star').rating();
		});
	});
}

function returnFormParamaters (form, options) {
	var formData = $(form).serializeArray();
	var params = options;
	// add form data to params object
	$.each(formData, function(key) {
		params[this["name"]] = this["value"];
	});
	// return updated parameters
	return params;
}

/* RADIO BUTTONS */

function loadOverallRatingInput (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer,
		"targetContainer":defaultOverallRatingInputContainer,
		"viewContainer":defaultInputRadioIndividualContainerView,
		"loadOrder":[
					{1:"poor"},
					{2:"fair"},
					{3:"average"},
					{4:"good"},
					{5:"excellent"}
				],
		"productId":"",
		"inputSettings":{
			"inputName":content["Data"]["Fields"]["rating"]["Id"],
			"inputType":content["Data"]["Fields"]["rating"]["Type"],
			"inputLabel":content["Data"]["Fields"]["rating"]["Label"],
			"inputPlaceholder":"",
			"inputValue":content["Data"]["Fields"]["rating"]["Value"],
			"inputMinLength":content["Data"]["Fields"]["rating"]["MinLength"],
			"inputMaxLength":content["Data"]["Fields"]["rating"]["MaxLength"],
			"inputRequired":content["Data"]["Fields"]["rating"]["Required"],
			"inputDefault":content["Data"]["Fields"]["rating"]["Default"],
			"inputOptionsArray":content["Data"]["Fields"]["rating"]["Options"]
		}
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		async: false,
		success: function(container) {
			var $container = $(container);
			// set label
			$container.find(defaultFormLabelTextContainer).andSelf().filter(defaultFormLabelTextContainer).text(settings["inputSettings"]["inputLabel"]);
			// add input template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($container);
			// load radio buttons
			$.each(settings["loadOrder"], function(key) {
				loadRadioInputIndividual (content["Data"]["Fields"]["rating"], {
					"parentContainer":$container,
					"viewContainer":defaultInputRadioOverallRatingContainerView,
					"loadOrder":settings["loadOrder"][key]
				});
			});
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

function loadSecondaryRatingGroup (content, options) {
	var defaultLoadOrder = new Array();
	$.each(content["Data"]["Groups"]["rating"]["SubElements"], function() {
		defaultLoadOrder.push(this["Id"]);
	});
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer,
		"targetContainer":defaultSecondaryRatingGroupInputContainer,
		"viewContainer":defaultSecondaryRatingContainerView,
		"loadOrder":defaultLoadOrder,
		"productId":"",
		"inputSettings":{
			"inputType":content["Type"],
			"inputRequired":content["Required"],
			"inputSubElements":content["SubElements"]
		}
	}, options);
	$.each(settings["loadOrder"], function(key) {
		var fieldContent = content["Data"]["Fields"][this];
		$.ajax({
			url: settings["viewContainer"],
			type: 'GET',
			dataType: 'html',
			async: false,
			success: function(container) {
				var $container = $(container);
				// set label
				$container.find(defaultFormLabelTextContainer).andSelf().filter(defaultFormLabelTextContainer).text(fieldContent["Label"]);
				// add secondary rating template
				$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($container);
				// load secondary rating input container
				loadSecondaryRatingIndividual(fieldContent, {
					"parentContainer":$container
				});
			},
			error: function(e) {
				defaultAjaxErrorFunction(e);
			}
		});
	});
}

function loadSecondaryRatingIndividual (content, options) {
	// content expected ["Data"]["Fields"][<fieldname>]
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer,
		"targetContainer":"._BVInputGroupContainer",
		"viewContainer":defaultInputRadioIndividualContainerView,
		"loadOrder":[
					{1:"poor"},
					{2:"fair"},
					{3:"average"},
					{4:"good"},
					{5:"excellent"}
				],
		"productId":"",
		"inputSettings":{
			"inputName":content["Id"],
			"inputType":content["Type"],
			"inputLabel":content["Label"],
			"inputPlaceholder":"",
			"inputValue":content["Value"],
			"inputMinLength":content["MinLength"],
			"inputMaxLength":content["MaxLength"],
			"inputRequired":content["Required"],
			"inputDefault":content["Default"],
			"inputOptionsArray":content["Options"]
		}
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		async: false,
		success: function(container) {
			var $container = $(container);
			// add input template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($container);
			// load radio buttons
			$.each(settings["loadOrder"], function(key) {
				loadRadioInputIndividual (content, {
					"parentContainer":$container,
					"viewContainer":defaultInputRadioOverallRatingContainerView,
					"loadOrder":settings["loadOrder"][key]
				});
			});
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

function loadIsRecommendedInput (content, options) {
	var fieldName = "isrecommended";
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer,
		"targetContainer":defaultIsRecommendedInputContainer,
		"viewContainer":defaultInputRadioIndividualContainerView,
		"loadOrder":[
					{true:"Yes"},
					{false:"No"}
				],
		"productId":"",
		"inputSettings":{
			"inputName":content["Data"]["Fields"][fieldName]["Id"],
			"inputType":content["Data"]["Fields"][fieldName]["Type"],
			"inputLabel":content["Data"]["Fields"][fieldName]["Label"],
			"inputPlaceholder":"",
			"inputValue":content["Data"]["Fields"][fieldName]["Value"],
			"inputMinLength":content["Data"]["Fields"][fieldName]["MinLength"],
			"inputMaxLength":content["Data"]["Fields"][fieldName]["MaxLength"],
			"inputRequired":content["Data"]["Fields"][fieldName]["Required"],
			"inputDefault":content["Data"]["Fields"][fieldName]["Default"],
			"inputOptionsArray":content["Data"]["Fields"][fieldName]["Options"]
		}
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		async: false,
		success: function(container) {
			var $container = $(container);
			// set label
			$container.find(defaultFormLabelTextContainer).andSelf().filter(defaultFormLabelTextContainer).text(settings["inputSettings"]["inputLabel"]);
			// add input template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($container);
			// load radio buttons
			$.each(settings["loadOrder"], function(key) {
				loadRadioInputIndividual (content["Data"]["Fields"][fieldName], {
					"parentContainer":$container,
					"loadOrder":settings["loadOrder"][key]
				});
			});
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}
/*
// loads normal radio buttons
function loadRadioGeneralInputGroup (content, options) {
	// content expected ["Data"]["Fields"][<fieldname>]
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer, // needs to be given a more specific container if called more than once
		"targetContainer":defaultRadioButtonGroupInputContainer,
		"viewContainer":defaultInputRadioIndividualContainerView,
		"loadOrder":"", // this must be defined in the call
		"productId":"",
		"inputSettings":{
			"inputName":content["Id"],
			"inputType":content["Type"],
			"inputLabel":content["Label"],
			"inputPlaceholder":"", // user defined
			"inputValue":content["Value"],
			"inputMinLength":content["MinLength"],
			"inputMaxLength":content["MaxLength"],
			"inputRequired":content["Required"],
			"inputDefault":content["Default"],
			"inputOptionsArray":content["Options"]
		}
	}, options);
	$.each (settings["loadOrder"], function(key, value) {
		$.ajax({
			url: settings["viewContainer"],
			type: 'GET',
			dataType: 'html',
			async: false,
			success: function(container) {
				var $container = $(container);
				// set variables
				var inputId = settings["inputSettings"]["inputName"];
				var inputLabel = settings["inputSettings"]["inputLabel"];
				// add input template
				$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($container);
				// load radio buttons
				loadRadioInputIndividual(content, {
					"parentContainer":$container,
					"loadOrder":value
				});
			},
			error: function(e) {
				defaultAjaxErrorFunction(e);
			}
		});
	});
}

// load star rating radio buttons
function loadRadioRatingInputGroup (content, options) {
	// content expected ["Data"]["Fields"][<fieldname>]
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer, // needs to be given a more specific container if called more than once
		"targetContainer":defaultRadioButtonGroupInputContainer,
		"viewContainer":defaultInputRadioIndividualContainerView,
		"loadOrder":"", // this must be defined in the call
		"productId":"",
		"inputSettings":{
			"inputName":content["Id"],
			"inputType":content["Type"],
			"inputLabel":content["Label"],
			"inputPlaceholder":"", // user defined
			"inputValue":content["Value"],
			"inputMinLength":content["MinLength"],
			"inputMaxLength":content["MaxLength"],
			"inputRequired":content["Required"],
			"inputDefault":content["Default"],
			"inputOptionsArray":content["Options"]
		}
	}, options);
	$.each (settings["loadOrder"], function(key, value) {
		$.ajax({
			url: settings["viewContainer"],
			type: 'GET',
			dataType: 'html',
			async: false,
			success: function(container) {
				var $container = $(container);
				// set variables
				var inputId = settings["inputSettings"]["inputName"];
				var inputLabel = settings["inputSettings"]["inputLabel"];
				// add input template
				$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($container);
				// load radio buttons
				loadRadioInputIndividual(content, {
					"parentContainer":$container,
					"loadOrder":value,
					"viewContainer":defaultInputRadioOverallRatingContainerView
				});
			},
			error: function(e) {
				defaultAjaxErrorFunction(e);
			}
		});
	});
}
*/
// load an individual radio button
function loadRadioInputIndividual (content, options) {
	// object containing value and label text [<value>:<lable text>]
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer, // needs to be given a more specific container if called more than once
		"targetContainer":defaultRadioButtonGroupInputContainer,
		"viewContainer":defaultInputRadioContainerView,
		"loadOrder":"", // this must be defined in the call
		"productId":"",
		"inputSettings":{
			"inputName":content["Id"],
			"inputType":content["Type"],
			"inputLabel":content["Label"],
			"inputPlaceholder":"", // user defined
			"inputValue":content["Value"],
			"inputMinLength":content["MinLength"],
			"inputMaxLength":content["MaxLength"],
			"inputRequired":content["Required"],
			"inputDefault":content["Default"],
			"inputOptionsArray":content["Options"]
		}
	}, options);
	$.each (settings["loadOrder"], function(key, value) {
		$.ajax({
			url: settings["viewContainer"],
			type: 'GET',
			dataType: 'html',
			async: false,
			success: function(container) {
				var $container = $(container);
				// set variables
				var inputValue = key; // radio value
				var inputLabel = value; // radio label text
				var inputName = settings["inputSettings"]["inputName"]; // input name attribute
				var inputId = inputName + inputValue; // id attribute
				var inputRequired = settings["inputSettings"]["inputRequired"]; // required boolean
				var inputSelected = settings["inputSettings"]["inputValue"]; // selected value
				// set label
				$container.find(defaultFormRadioLabelTextContainer).andSelf().filter(defaultFormRadioLabelTextContainer).text(inputLabel).attr({
					"for":inputId
				});
				// set input attributes
				$container.find(defaultFormInputContainer).andSelf().filter(defaultFormInputContainer).attr({
					"id":inputId,
					"name":inputName,
					"value":inputValue
				});
				// selected value
				if (inputValue == inputSelected) {
					$container.find(defaultFormInputContainer).andSelf().filter(defaultFormInputContainer).attr({
						"checked":"checked",
					});
				}
				// required
				if (inputRequired == true) {
					$container.find(defaultFormInputContainer).andSelf().filter(defaultFormInputContainer).addClass("required");
				}
				// add input template
				$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($container);
			},
			error: function(e) {
				defaultAjaxErrorFunction(e);
			}
		});
	});
}

/* TEXT FIELD AND AREA INPUTS */

// review title
function loadReviewTitleInput (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer,
		"targetContainer":defaultReviewTitleInputContainer,
		"viewContainer":defaultInputContainerView,
		"loadOrder":"",
		"productId":"",
		"inputSettings":{
			"inputName":content["Data"]["Fields"]["title"]["Id"],
			"inputType":content["Data"]["Fields"]["title"]["Type"],
			"inputLabel":content["Data"]["Fields"]["title"]["Label"],
			"inputPlaceholder":"", // user defined
			"inputHelperText":"", // user defined
			"inputValue":content["Data"]["Fields"]["title"]["Value"],
			"inputMinLength":content["Data"]["Fields"]["title"]["MinLength"],
			"inputMaxLength":content["Data"]["Fields"]["title"]["MaxLength"],
			"inputRequired":content["Data"]["Fields"]["title"]["Required"],
			"inputDefault":content["Data"]["Fields"]["title"]["Default"],
			"inputOptionsArray":content["Data"]["Fields"]["title"]["Options"]
		}
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		success: function(container) {
			var $container = $(container);
			// set label
			$container.find(defaultFormLabelTextContainer).andSelf().filter(defaultFormLabelTextContainer).text(settings["inputSettings"]["inputLabel"]).attr({
				"for":settings["inputSettings"]["inputName"]
			});
			// set helper text
			$container.find(defaultFormHelperTextContainer).andSelf().filter(defaultFormHelperTextContainer).text(settings["inputSettings"]["inputHelperText"]);
			// add input template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).html($container);
			// load input
			loadTextFieldInput (content["Data"]["Fields"]["title"], {
				"parentContainer":$container,
				"targetContainer":defaultFormInputWrapperContainer,
				"inputSettings":settings["inputSettings"]
			});
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

// user nickname
function loadUserNicknameInput (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer,
		"targetContainer":defaultUserNicknameInputContainer,
		"viewContainer":defaultInputContainerView,
		"loadOrder":"",
		"productId":"",
		"inputSettings":{
			"inputName":content["Data"]["Fields"]["usernickname"]["Id"],
			"inputType":content["Data"]["Fields"]["usernickname"]["Type"],
			"inputLabel":content["Data"]["Fields"]["usernickname"]["Label"],
			"inputPlaceholder":"", // user defined
			"inputHelperText":"", // user defined
			"inputValue":content["Data"]["Fields"]["usernickname"]["Value"],
			"inputMinLength":content["Data"]["Fields"]["usernickname"]["MinLength"],
			"inputMaxLength":content["Data"]["Fields"]["usernickname"]["MaxLength"],
			"inputRequired":content["Data"]["Fields"]["usernickname"]["Required"],
			"inputDefault":content["Data"]["Fields"]["usernickname"]["Default"],
			"inputOptionsArray":content["Data"]["Fields"]["usernickname"]["Options"]
		}
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		success: function(container) {
			var $container = $(container);
			// set label
			$container.find(defaultFormLabelTextContainer).andSelf().filter(defaultFormLabelTextContainer).text(settings["inputSettings"]["inputLabel"]).attr({
				"for":settings["inputSettings"]["inputName"]
			});
			// set helper text
			$container.find(defaultFormHelperTextContainer).andSelf().filter(defaultFormHelperTextContainer).text(settings["inputSettings"]["inputHelperText"]);
			// add input template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).html($container);
			// load input
			loadTextFieldInput (content["Data"]["Fields"]["usernickname"], {
				"parentContainer":$container,
				"inputSettings":settings["inputSettings"]
			});
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

// user email
function loadUserEmailInput (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer,
		"targetContainer":defaultUserEmailInputContainer,
		"viewContainer":defaultInputContainerView,
		"loadOrder":"",
		"productId":"",
		"inputSettings":{
			"inputName":content["Data"]["Fields"]["useremail"]["Id"],
			"inputType":content["Data"]["Fields"]["useremail"]["Type"],
			"inputLabel":content["Data"]["Fields"]["useremail"]["Label"],
			"inputPlaceholder":"", // user defined
			"inputHelperText":"", // user defined
			"inputValue":content["Data"]["Fields"]["useremail"]["Value"],
			"inputMinLength":content["Data"]["Fields"]["useremail"]["MinLength"],
			"inputMaxLength":content["Data"]["Fields"]["useremail"]["MaxLength"],
			"inputRequired":content["Data"]["Fields"]["useremail"]["Required"],
			"inputDefault":content["Data"]["Fields"]["useremail"]["Default"],
			"inputOptionsArray":content["Data"]["Fields"]["useremail"]["Options"]
		}
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		success: function(container) {
			var $container = $(container);
			// set label
			$container.find(defaultFormLabelTextContainer).andSelf().filter(defaultFormLabelTextContainer).text(settings["inputSettings"]["inputLabel"]).attr({
				"for":settings["inputSettings"]["inputName"]
			});
			// set helper text
			$container.find(defaultFormHelperTextContainer).andSelf().filter(defaultFormHelperTextContainer).text(settings["inputSettings"]["inputHelperText"]);
			// add input template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).html($container);
			// load input
			loadTextFieldInput (content["Data"]["Fields"]["useremail"], {
				"parentContainer":$container,
				"inputSettings":settings["inputSettings"]
			});
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

// user location
function loadUserLocationInput (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer,
		"targetContainer":defaultUserLocationInputContainer,
		"viewContainer":defaultInputContainerView,
		"loadOrder":"",
		"productId":"",
		"inputSettings":{
			"inputName":content["Data"]["Fields"]["userlocation"]["Id"],
			"inputType":content["Data"]["Fields"]["userlocation"]["Type"],
			"inputLabel":content["Data"]["Fields"]["userlocation"]["Label"],
			"inputPlaceholder":"", // user defined
			"inputHelperText":"", // user defined
			"inputValue":content["Data"]["Fields"]["userlocation"]["Value"],
			"inputMinLength":content["Data"]["Fields"]["userlocation"]["MinLength"],
			"inputMaxLength":content["Data"]["Fields"]["userlocation"]["MaxLength"],
			"inputRequired":content["Data"]["Fields"]["userlocation"]["Required"],
			"inputDefault":content["Data"]["Fields"]["userlocation"]["Default"],
			"inputOptionsArray":content["Data"]["Fields"]["userlocation"]["Options"]
		}
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		success: function(container) {
			var $container = $(container);
			// set label
			$container.find(defaultFormLabelTextContainer).andSelf().filter(defaultFormLabelTextContainer).text(settings["inputSettings"]["inputLabel"]).attr({
				"for":settings["inputSettings"]["inputName"]
			});
			// set helper text
			$container.find(defaultFormHelperTextContainer).andSelf().filter(defaultFormHelperTextContainer).text(settings["inputSettings"]["inputHelperText"]);
			// add input template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).html($container);
			// load input
			loadTextFieldInput (content["Data"]["Fields"]["userlocation"], {
				"parentContainer":$container,
				"inputSettings":settings["inputSettings"]
			});
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

// user id
function loadUserIDInput (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer,
		"targetContainer":defaultUserIdInputContainer,
		"viewContainer":defaultInputContainerView,
		"loadOrder":"",
		"productId":"",
		"inputSettings":{
			"inputName":"userid",
			"inputType":"hidden",
			"inputLabel":"User Id",
			"inputPlaceholder":"",
			"inputHelperText":"",
			"inputValue":"",
			"inputMinLength":"",
			"inputMaxLength":"",
			"inputRequired":true,
			"inputDefault":"",
			"inputOptionsArray":""
		}
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		success: function(container) {
			var $container = $(container);
			// set label
			$container.find(defaultFormLabelTextContainer).andSelf().filter(defaultFormLabelTextContainer).text(settings["inputSettings"]["inputLabel"]).attr({
				"for":settings["inputSettings"]["inputName"]
			});
			// set helper text
			$container.find(defaultFormHelperTextContainer).andSelf().filter(defaultFormHelperTextContainer).text(settings["inputSettings"]["inputHelperText"]);
			// add input template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).html($container);
			// load input
			loadTextFieldInput (content["Data"]["Fields"]["userid"], {
				"parentContainer":$container,
				"inputSettings":settings["inputSettings"]
			});
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

// review tet
function loadReviewTextInput (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer,
		"targetContainer":defaultReviewTextInputContainer,
		"viewContainer":defaultInputContainerView,
		"loadOrder":"",
		"productId":"",
		"inputSettings":{
			"inputName":content["Data"]["Fields"]["reviewtext"]["Id"],
			"inputType":content["Data"]["Fields"]["reviewtext"]["Type"],
			"inputLabel":content["Data"]["Fields"]["reviewtext"]["Label"],
			"inputPlaceholder":"", // user defined
			"inputHelperText":"", // user defined
			"inputValue":content["Data"]["Fields"]["reviewtext"]["Value"],
			"inputMinLength":content["Data"]["Fields"]["reviewtext"]["MinLength"],
			"inputMaxLength":content["Data"]["Fields"]["reviewtext"]["MaxLength"],
			"inputRequired":content["Data"]["Fields"]["reviewtext"]["Required"],
			"inputDefault":content["Data"]["Fields"]["reviewtext"]["Default"],
			"inputOptionsArray":content["Data"]["Fields"]["reviewtext"]["Options"]
		}
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		success: function(container) {
			var $container = $(container);
			// set label
			$container.find(defaultFormLabelTextContainer).andSelf().filter(defaultFormLabelTextContainer).text(settings["inputSettings"]["inputLabel"]).attr({
				"for":settings["inputSettings"]["inputName"]
			});
			// set helper text
			$container.find(defaultFormHelperTextContainer).andSelf().filter(defaultFormHelperTextContainer).text(settings["inputSettings"]["inputHelperText"]);
			// add input template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).html($container);
			// load input
			loadTextAreaInput (content["Data"]["Fields"]["reviewtext"], {
				"parentContainer":$container,
				"inputSettings":settings["inputSettings"]
			});
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

// additional fields group container
function loadAdditionalFieldGroupInput (content, options) {
	var defaultLoadOrder = new Array();
	$.each(content["Data"]["Groups"]["additionalfield"]["SubElements"], function() {
		defaultLoadOrder.push(this["Id"]);
	});
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer,
		"targetContainer":defaultAdditionalFieldGroupInputContainer,
		"viewContainer":defaultAdditionalFieldContainerView,
		"loadOrder":defaultLoadOrder,
		"productId":"",
		"inputSettings":{
			"inputType":content["Type"],
			"inputRequired":content["Required"],
			"inputSubElements":content["SubElements"]
		}
	}, options);
	$.each(settings["loadOrder"], function(key) {
		var fieldContent = content["Data"]["Fields"][this];
		$.ajax({
			url: settings["viewContainer"],
			type: 'GET',
			dataType: 'html',
			async: false,
			success: function(container) {
				var $container = $(container);
				// add individual additional field template
				$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($container);
				// load additional field input container
				loadAdditionalFieldIndividualInput(fieldContent, {
					"parentContainer":$container
				});
			},
			error: function(e) {
				defaultAjaxErrorFunction(e);
			}
		});
	});
}

// cdv individual container
function loadAdditionalFieldIndividualInput (content, options) {
	// content is expecting ["Data"]["Fields"][<contextdatavalue_Value>]
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer,
		"targetContainer":defaultAdditionalFieldIndividualInputContainer,
		"viewContainer":defaultInputContainerView,
		"loadOrder":"",
		"productId":"",
		"inputSettings":{
			"inputName":content["Id"],
			"inputType":content["Type"],
			"inputLabel":content["Label"],
			"inputPlaceholder":"", // user defined
			"inputHelperText":"", // user defined
			"inputValue":content["Value"],
			"inputMinLength":content["MinLength"],
			"inputMaxLength":content["MaxLength"],
			"inputRequired":content["Required"],
			"inputDefault":content["Default"],
			"inputOptionsArray":content["Options"]
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
			var inputId = settings["inputSettings"]["inputName"] + "WrapperID"; // id attribute
			var inputName = settings["inputSettings"]["inputName"]; // name of input
			var inputLabel = settings["inputSettings"]["inputLabel"]; // input label text
			var inputRequired = settings["inputSettings"]["inputRequired"]; // required boolean
			var inputType = settings["inputSettings"]["inputType"]; // input type (radio or select dropdown)
			// set label
			$container.find(defaultFormLabelTextContainer).andSelf().filter(defaultFormLabelTextContainer).text(inputLabel).attr({
				"for":(inputName + "ID")
			});
			// add additional field template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).attr({
				"id":inputId
			}).append($container);
			// load text field
			loadTextFieldInput(content, {
				"parentContainer":$container
			});
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

// generic text field
function loadTextFieldInput (content, options) {
	var settings = $.extend(true, {
		"parentContainer":"",
		"targetContainer":defaultFormInputWrapperContainer,
		"viewContainer":defaultInputTextFieldContainerView,
		"loadOrder":"",
		"productId":"",
		"inputSettings":{
			"inputName":"",
			"inputType":"",
			"inputLabel":"",
			"inputPlaceholder":"", // user defined
			"inputValue":"",
			"inputMinLength":"",
			"inputMaxLength":"",
			"inputRequired":"",
			"inputDefault":"",
			"inputOptionsArray":""
		}
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		success: function(container) {
			var $container = $(container);
			// set variables
			var inputId = settings["inputSettings"]["inputName"];
			// set label
			$container.find(defaultFormLabelTextContainer).andSelf().filter(defaultFormLabelTextContainer).text(settings["inputSettings"]["inputLabel"]).attr({
				"for":settings["inputSettings"]["inputName"]
			});
			// set input attributes
			$container.find(defaultFormInputContainer).andSelf().filter(defaultFormInputContainer).attr({
				"id":inputId,
				"name":settings["inputSettings"]["inputName"],
				"value":settings["inputSettings"]["inputValue"],
				"placeholder":settings["inputSettings"]["inputPlaceholder"],
				"data-required":settings["inputSettings"]["inputRequired"]
			});
			// add input template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).html($container);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

// generic text area
function loadTextAreaInput (content, options) {
	var settings = $.extend(true, {
		"parentContainer":"",
		"targetContainer":defaultFormInputWrapperContainer,
		"viewContainer":defaultInputTextAreaContainerView,
		"loadOrder":"",
		"productId":"",
		"inputSettings":{
			"inputName":"",
			"inputType":"",
			"inputLabel":"",
			"inputPlaceholder":"", // user defined
			"inputValue":"",
			"inputMinLength":"",
			"inputMaxLength":"",
			"inputRequired":"",
			"inputDefault":"",
			"inputOptionsArray":""
		}
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		success: function(container) {
			var $container = $(container);
			// set variables
			var inputId = settings["inputSettings"]["inputName"];
			// set label
			$container.find(defaultFormLabelTextContainer).andSelf().filter(defaultFormLabelTextContainer).text(settings["inputSettings"]["inputLabel"]).attr({
				"for":settings["inputSettings"]["inputName"]
			});
			// set input attributes
			$container.find(defaultFormInputContainer).andSelf().filter(defaultFormInputContainer).attr({
				"id":inputId,
				"name":settings["inputSettings"]["inputName"],
				"value":settings["inputSettings"]["inputValue"],
				"placeholder":settings["inputSettings"]["inputPlaceholder"],
				"data-required":settings["inputSettings"]["inputRequired"]
			});
			// add input template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).html($container);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

/* SELECT DROPDOWNS */

// cdv group container
function loadContextDataValueGroupInput (content, options) {
	var defaultLoadOrder = new Array();
	$.each(content["Data"]["Groups"]["contextdatavalue"]["SubElements"], function() {
		defaultLoadOrder.push(this["Id"]);
	});
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer,
		"targetContainer":defaultContextDataValueGroupInputContainer,
		"viewContainer":defaultContextDataValueContainerView,
		"loadOrder":defaultLoadOrder,
		"productId":"",
		"inputSettings":{
			"inputType":content["Type"],
			"inputRequired":content["Required"],
			"inputSubElements":content["SubElements"]
		}
	}, options);
	$.each(settings["loadOrder"], function(key) {
		var fieldContent = content["Data"]["Fields"][this];
		$.ajax({
			url: settings["viewContainer"],
			type: 'GET',
			dataType: 'html',
			async: false,
			success: function(container) {
				var $container = $(container);
				// add individual context data value template
				$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($container);
				// load context data value input container
				loadContextDataValueIndividualInput(fieldContent, {
					"parentContainer":$container
				});
			},
			error: function(e) {
				defaultAjaxErrorFunction(e);
			}
		});
	});
}

// cdv individual container
function loadContextDataValueIndividualInput (content, options) {
	// content is expecting ["Data"]["Fields"][<contextdatavalue_Value>]
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer,
		"targetContainer":defaultContextDataValueIndividualInputContainer,
		"viewContainer":defaultInputContainerView,
		"loadOrder":"",
		"productId":"",
		"inputSettings":{
			"inputName":content["Id"],
			"inputType":content["Type"],
			"inputLabel":content["Label"],
			"inputPlaceholder":"", // user defined
			"inputHelperText":"", // user defined
			"inputValue":content["Value"],
			"inputMinLength":content["MinLength"],
			"inputMaxLength":content["MaxLength"],
			"inputRequired":content["Required"],
			"inputDefault":content["Default"],
			"inputOptionsArray":content["Options"]
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
			var inputId = settings["inputSettings"]["inputName"] + "WrapperID"; // id attribute
			var inputName = settings["inputSettings"]["inputName"]; // name of input
			var inputLabel = settings["inputSettings"]["inputLabel"]; // input label text
			var inputRequired = settings["inputSettings"]["inputRequired"]; // required boolean
			var inputType = settings["inputSettings"]["inputType"]; // input type (radio or select dropdown)
			// set label
			$container.find(defaultFormLabelTextContainer).andSelf().filter(defaultFormLabelTextContainer).text(inputLabel).attr({
				"for":(inputName + "ID")
			});
			// add context data value template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).attr({
				"id":inputId
			}).append($container);
			// load select/radio input
			if (inputType == "SelectInput") {
				// load select(dropdown)
				loadSelectInput(content, {
					"parentContainer":$container
				});
			} else {
				// set radio button load order
				var defaultLoadOrder = new Array();
				$.each(content["Options"], function(index) {
					if (this["Label"]) {
						var obj = {};
						obj[this["Value"]] = this["Label"];
						defaultLoadOrder[index] = obj;
					};
				});
				// load radio buttons
				loadRadioInputIndividual (content, {
					"parentContainer":$container,
					"targetContainer":defaultFormInputWrapperContainer,
					"loadOrder":defaultLoadOrder
				});
			}
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

// generic select(dropdown) input
function loadSelectInput (content, options) {
	// content expected ["Data"]["Fields"][<contextdatavalue_Value>]
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer,
		"targetContainer":defaultFormInputWrapperContainer,
		"viewContainer":defaultInputSelectContainerView,
		"loadOrder":"",
		"productId":"",
		"inputSettings":{
			"inputName":content["Id"],
			"inputType":content["Type"],
			"inputLabel":content["Label"],
			"inputPlaceholder":"", // user defined
			"inputHelperText":"", // user defined
			"inputValue":content["Value"],
			"inputMinLength":content["MinLength"],
			"inputMaxLength":content["MaxLength"],
			"inputRequired":content["Required"],
			"inputDefault":content["Default"],
			"inputOptionsArray":content["Options"]
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
			var inputId = settings["inputSettings"]["inputName"] + "ID"; // id attribute
			var inputName = settings["inputSettings"]["inputName"]; // name of select input
			var inputRequired = settings["inputSettings"]["inputRequired"]; // required boolean
			var inputOptions = settings["inputSettings"]["inputOptionsArray"]; // options to be loaded in the dropdown
			// set input attributes
			$container.find(defaultFormSelectInputContainer).andSelf().filter(defaultFormSelectInputContainer).attr({
				"id":inputId,
				"name":inputName
			});
			// add input template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($container);
			// load select options
			loadSelectOptionsInput(inputOptions, {
				"parentContainer":$container
			});
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

// generic option inpute
function loadSelectOptionsInput (content, options) {
	// content expected ["Data"]["Fields"][<contextdatavalue_Value>]["Options"]
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer,
		"targetContainer":defaultFormSelectInputContainer,
		"viewContainer":defaultInputSelectOptionContainerView,
		"loadOrder":content,
		"productId":"",
		"inputSettings":{
			"inputValue":content["Value"],
			"inputSelected":content["Selected"],
			"inputLabel":content["Label"]
		}
	}, options);
	$.each(settings["loadOrder"], function(key) {
		$.ajax({
			url: settings["viewContainer"],
			type: 'GET',
			dataType: 'html',
			async: false,
			success: function(container) {
				var $container = $(container);
				// set variables
				var inputValue = settings["loadOrder"][key]["Value"]; // option value
				var inputLabel = settings["loadOrder"][key]["Label"]; // option label text
				var inputSelected = settings["loadOrder"][key]["Selected"]; // option selected boolean
				// set input attributes
				$container.find(defaultFormSelectOptionInputContainer).andSelf().filter(defaultFormSelectOptionInputContainer).html(inputLabel).attr({
					"label":"",
					"value":inputValue,
					"selected":inputSelected,
					"disabled":false
				});
				// add input template
				$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($container);
			},
			error: function(e) {
				defaultAjaxErrorFunction(e);
			}
		});
	});
}

/* CHECKBOXES */

function loadTagGroupInput (content, options) {
	var defaultLoadOrder = new Array();
	$.each(content["Data"]["Groups"]["tag"]["SubElements"], function() {
		defaultLoadOrder.push(this["Id"]);
	});
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer,
		"targetContainer":"._BVTagGroupInputContainer",
		"viewContainer":"views/universal/submission/inputTagIndividualContainer.html",
		"loadOrder":defaultLoadOrder,
		"productId":"",
		"inputSettings":{
			"inputName":content["Id"],
			"inputType":content["Type"],
			"inputLabel":content["Label"],
			"inputRequired":content["Required"],
			"inputSubElements":content["SubElements"]
		}
	}, options);
	$.each(settings["loadOrder"], function(key, value) {
		$.ajax({
			url: settings["viewContainer"],
			type: 'GET',
			dataType: 'html',
			async: false,
			success: function(container) {
				var $container = $(container);
				// set label
				var inputLabel = content["Data"]["Groups"][value]["Label"];
				$container.find(defaultFormLabelTextContainer).andSelf().filter(defaultFormLabelTextContainer).text(inputLabel);
				// add input template
				$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($container);
				// set order to load inputs
				var tagLoadOrder = new Array ();
				$.each(content["Data"]["Groups"][value]["SubElements"], function() {
					$.each(content["Data"]["Groups"][this["Id"]]["SubElements"], function() {
						tagLoadOrder.push(this["Id"]);
					})
				});
				// load inputs
				loadTagIndividualInput (content, {
					"parentContainer":$container,
					"loadOrder":tagLoadOrder
				});
			},
			error: function(e) {
				defaultAjaxErrorFunction(e);
			}
		});
	});
}

function loadTagIndividualInput (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer,
		"targetContainer":"._BVInputGroupContainer",
		"viewContainer":"views/universal/submission/inputTagContainer.html",
		"loadOrder":"",
		"productId":"",
		"inputSettings":{
			"inputName":content["Id"],
			"inputType":content["Type"],
			"inputLabel":content["Label"],
			"inputRequired":content["Required"],
			"inputSubElements":content["SubElements"]
		}
	}, options);
	$.each(settings["loadOrder"], function(key, value) {
		$.ajax({
			url: settings["viewContainer"],
			type: 'GET',
			dataType: 'html',
			async: false,
			success: function(container) {
				var $container = $(container);
				// add tag template
				$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($container);
				// load checkbox
				loadCheckboxInputField (content["Data"]["Fields"][value], {
					"parentContainer":$container
				});
			},
			error: function(e) {
				defaultAjaxErrorFunction(e);
			}
		});
	});
}

function loadTermsAndConditionsInput (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer,
		"targetContainer":"._BVTermsConditionsContainer",
		"viewContainer":"views/universal/submission/inputAgreedTermsConditionsContainer.html",
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
			// add input template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($container);
			// load checkbox
			loadCheckboxInputField (content["Data"]["Fields"]["agreedtotermsandconditions"], {
				"parentContainer":$container,
				"inputSettings":{
					"inputLabel":"I acknowledge that I have read and agree to the Terms & Conditions."
				}
			});
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

function loadSendEmailAlertWhenCommentedInput (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer,
		"targetContainer":"._BVEmailAlertWhenCommentedContainer",
		"viewContainer":"",
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
			// add input template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($container);
			// load checkbox
			loadCheckboxInputField (content["Data"]["Fields"]["sendemailalertwhencommented"], {
				"parentContainer":$container,
				"inputSettings":{
					"inputLabel":"Yes, Please send me an email when a comment posts to my review."
				}
			});
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

function loadSendEmailAlertWhenPublishedInput (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer,
		"targetContainer":"._BVEmailAlertWhenPublishedContainer",
		"viewContainer":"",
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
			// add input template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($container);
			// load checkbox
			loadCheckboxInputField (content["Data"]["Fields"]["sendemailalertwhenpublished"], {
				"parentContainer":$container,
				"inputSettings":{
					"inputLabel":"Yes, Please send me an email when my review is published."
				}
			});
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}
/*
function loadCheckboxInputGroup (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer, // needs to be given a more specific container if called more than once
		"targetContainer":defaultCheckboxGroupInputContainer,
		"viewContainer":defaultInputCheckboxIndividualContainerView,
		"loadOrder":"", // this must be defined in the call
		"productId":"",
		"inputSettings":{
			"inputName":content["Id"],
			"inputType":content["Type"],
			"inputLabel":content["Label"],
			"inputRequired":content["Required"],
			"inputSubElements":content["SubElements"]
		}
	}, options);
	console.log(settings["inputSettings"]);
	$.each (settings["loadOrder"], function(key, value) {
		$.ajax({
			url: settings["viewContainer"],
			type: 'GET',
			dataType: 'html',
			async: false,
			success: function(container) {
				var $container = $(container);
				// add input template
				$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($container);
				// load checkboxes
				loadCheckboxInputField(content["Data"]["Fields"][value], {
					"parentContainer":$container
				});
			},
			error: function(e) {
				defaultAjaxErrorFunction(e);
			}
		});
	});
}
*/
function loadCheckboxInputField (content, options) {
	// content expected ["Data"]["Fields"][<fieldname>]
	var settings = $.extend(true, {
		"parentContainer":defaultSubmissionFormContainer, // needs to be given a more specific container if called more than once
		"targetContainer":defaultCheckboxIndividualInputContainer,
		"viewContainer":defaultInputCheckboxIndividualContainerView,
		"loadOrder":"", // this must be defined in the call
		"productId":"",
		"inputSettings":{
			"inputName":content["Id"],
			"inputType":content["Type"],
			"inputLabel":content["Label"],
			"inputPlaceholder":"", // user defined
			"inputValue":content["Value"],
			"inputMinLength":content["MinLength"],
			"inputMaxLength":content["MaxLength"],
			"inputRequired":content["Required"],
			"inputDefault":content["Default"],
			"inputOptionsArray":content["Options"]
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
			var inputValue = settings["inputSettings"]["inputValue"]; // checkbox value
			var inputLabel = settings["inputSettings"]["inputLabel"]; // checkbox label text
			var inputName = settings["inputSettings"]["inputName"]; // input name attribute
			var inputId = settings["inputSettings"]["inputName"]; // id attribute
			var inputRequired = settings["inputSettings"]["inputRequired"]; // required boolean
			var inputType = settings["inputSettings"]["inputType"];
			var inputPlaceholder = settings["inputSettings"]["inputPlaceholder"];
			// set label
			if (inputType !== "TextInput") {
				$container.find(defaultFormCheckboxLabelTextContainer).andSelf().filter(defaultFormCheckboxLabelTextContainer).text(inputLabel).attr({
					"for":inputId
				});
			} else {
				loadTextFieldInput(content, {
					"parentContainer":$container,
					"targetContainer":$container.find(defaultFormCheckboxLabelTextContainer).andSelf().filter(defaultFormCheckboxLabelTextContainer).attr({
						"for":inputId
					}),
					"inputSettings":{
						"inputName":inputName,
						"inputPlaceholder":inputPlaceholder
					}
				});
			}
			// set input attributes
			$container.find(defaultFormInputContainer).andSelf().filter(defaultFormInputContainer).attr({
				"id":inputId,
				"name":inputName,
				"value":inputValue
			});
			// selected value
			if (inputValue) {
				$container.find(defaultFormInputContainer).andSelf().filter(defaultFormInputContainer).attr({
					"checked":"checked",
				});
			}
			// required
			if (inputRequired == true) {
				$container.find(defaultFormInputContainer).andSelf().filter(defaultFormInputContainer).addClass("required");
			}
			// add input template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($container);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

/* MEDIA UPLOAD */



