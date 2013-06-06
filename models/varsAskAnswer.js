/***** DEFAULT VARS FOR TARGET CONTAINER CLASSES *****/

/* MAIN CONTAINERS */
var defaultQuestionAnswerParentContainer = "#BVQAContainer"; // main container for AA implementation
var defaultQuestionAnswerBodyContainer = "._BVQuestionAnswerBodyContainer"; // all question & answer section container
var defaultQuestionAnswerContainer = "._BVQuestionAnswerContainer"; // individual question container

/* QUESTION CONTENT */
var defaultQuestionTitleContainer = "._BVTitleContainer"; // question title container
var defaultQuestionTitleTextContainer = "._BVTitleText"; // question title text
var defaultQuestionBodyTextContainer = "._BVBodyTextContainer"; // question body text container
var defaultQuestionBodyTextTextContainer = "._BVBodyText"; // question body text
var defaultQuestionDateContainer = "._BVDateContainer"; // question date container
var defaultQuestionDateTextContainer = "._BVDateText"; // question date text

/* TAGS */
var defaultQuestionTagGroupContainer = "._BVTagGroupContainer"; // all tags container
var defaultQuestionTagIndividualContainer = "._BVTagIndividualContainer"; // individual tag container
var defaultQuestionTagLabelTextContainer = "._BVTagLabelText";
var defaultQuestionTagTextContainer = "._BVTagText";

/* USER INFO */
var defaultQuestionUserNicknameContainer = "._BVUserNicknameContainer"; // user nickname container
var defaultQuestionUserNicknameTextContainer = "._BVUserNicknameText";
var defaultQuestionUserLocationContainer = "._BVUserLocationContainer"; // user location container
var defaultQuestionUserLocationTextContainer = "._BVUserLocationText";

/* CDVs */
var defaultQuestionContextDataValueGroupContainer = "._BVContextDataValueGroupContainer"; // context data values container
var defaultQuestionContextDataValueLabelTextContainer = "._BVContextDataValueLabelText";
var defaultQuestionContextDataValueTextContainer = "._BVContextDataValueText";

/* ADDITIONAL FIELDS */
var defaultQuestionAdditionalFieldGroupContainer = "._BVAdditionalFieldGroupContainer"; // additional fields container
var defaultQuestionAdditionalFieldLabelTextContainer = "._BVAdditionalFieldsLabelText";
var defaultQuestionAdditionalFieldTextContainer = "._BVAdditionalFieldsValueText";

/* MEDIA */
var defaultQuestionPhotoGroupContainer = "._BVPhotoGroupContainer"; // photos container
var defaultQuestionPhotoThumbnailContainer = "._BVPhotoThumbnail";
var defaultQuestionPhotoIndividualContainer = "._BVPhotoNormal";
var defaultQuestionPhotoCaptionContainer = "._BVPhotoCaption";
var defaultQuestionVideoGroupContainer = "._BVVideoGroupContainer"; // videos container
var defaultQuestionVideoThumbnailContainer = "._BVVideoThumbnail";
var defaultQuestionVideoIndividualContainer = "._BVVideoNormal";
var defaultQuestionVideoCaptionContainer = "._BVVideoCaption";

/* FEEDBACK (helpfulness voting) */
var defaultQuestionFeedbackContainer = "._BVFeedbackContainer"; // all feedback (count and feedback) container
var defaultQuestionFeedbackCountContainer = "._BVFeedbackCountContainer"; // feedback count container
var defaultQuestionFeedbackCountPositiveContainer = "._BVFeedbackPositiveCountValue";
var defaultQuestionFeedbackCountTotalContainer = "._BVFeedbackTotalCountValue";
var defaultQuestionFeedbackCountPercentageContainer = "._BVFeedbackCountContainer";
var defaultQuestionFeedbackVotingContainer = "._BVFeedbackVotingContainer"; // feedback voting container
var defaultQuestionFeedbackVotingButtonContainer = "._BVFeedbackVotingButtonContainer"; // feedback voting button container
var defaultQuestionFeedbackVotingButtonPositiveContainer = "._BVFeedbackPositiveButton";
var defaultQuestionFeedbackVotingButtonNegativeContainer = "._BVFeedbackNegativeButton";

/* REPORT INAPPROPRIATE */
var defaultQuestionReportInappropriateContainer = "._BVReportInappropriateContainer"; // inapropriate content container


/* VIEW TEMPLATES */
var defaultQuestionAnswerContainerView = pathView("questionAnswerContainer.html");


/* QUESTIONS TEMPLATES */

// question title module
var defaultQuestionTitleContainerView = pathView("titleContainer.html");
// question text module
var defaultQuestionBodyTextContainerView = pathView("bodyTextContainer.html");
// date module
var defaultQuestionDateContainerView = pathView("dateContainer.html");

/* NICKNAME TEMPLATES */

// nickname module
var defaultQuestionUserNicknameContainerView = pathView("nicknameContainer.html");

/* LOCATION TEMPLATES */

// location module
var defaultQuestionUserLocationContainerView = pathView("locationContainer.html");

/* CDVs TEMPLATES */

// context data values module
var defaultQuestionContextDataValueContainerView = pathView("contextDataValueIndividualContainer.html");

/* TAGS TEMPLATES */

// all tags module
var defaultQuestionTagsContainerView = pathView("tagGroupContainer.html");
// individual tag module
var defaultQuestionTagContainerView = pathView("tagIndividualContainer.html");

/* ADDITIONAL FIELDS TEMPLATES */

// additional fields module
var defaultQuestionAdditionalFieldContainerView = pathView("additionalFieldIndividualContainer.html");

/* MEDIA TEMPLATES */

// photos module
var defaultQuestionPhotoContainerView = pathView("photoThumbnailContainer.html");
// videos module
var defaultQuestionVideoContainerView = pathView("videoThumbnailContainer.html");

/* FEEDBACK TEMPLATES */

// all feedback (count and voting) module
var defaultQuestionFeedbackContainerView = pathView("feedbackContainer.html");
// feedback count module
var defaultQuestionFeedbackCountContainerView = pathView("feedbackCountContainer.html");
// feedback voting module
var defaultQuestionFeedbackVotingContainerView = pathView("feedbackVotingContainer.html");

/* INAPPROPRIATE CONTENT TEMPLATES */

// inappropriate content module
var defaultQuestionReportInappropriateContainerView = pathView("reportInappropriateContainer.html");

