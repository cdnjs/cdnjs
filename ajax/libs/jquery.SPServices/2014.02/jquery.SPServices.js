/*
 * SPServices - Work with SharePoint's Web Services using jQuery
 * Version 2014.02
 * @requires jQuery v1.8 or greater - jQuery 1.10.x+ recommended
 *
 * Copyright (c) 2009-2014 Sympraxis Consulting LLC
 * Examples and docs at:
 * http://spservices.codeplex.com
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 */
/*
 * @description Work with SharePoint's Web Services using jQuery
 * @type jQuery
 * @name SPServices
 * @category Plugins/SPServices
 * @author Sympraxis Consulting LLC/marc.anderson@sympraxisconsulting.com
*/

/* jshint undef: true */
/* global L_Menu_BaseUrl, _spUserId, _spPageContextInfo, GipAddSelectedItems, GipRemoveSelectedItems, GipGetGroupData */

(function ($) {

    "use strict";

    // Version info
    var VERSION = "2014.02"; // TODO: Update version


    // String constants
    //   General
    var SLASH = "/";
    var spDelim = ";#";
    var TXTColumnNotFound = "Column not found on page";
    var SCHEMASharePoint = "http://schemas.microsoft.com/sharepoint";
    var multiLookupPrefix = "MultiLookupPicker";
    var multiLookupPrefix2013 = "MultiLookup";

    // Dropdown Types
    var dropdownType = {
        simple: "S",
        complex: "C",
        multiSelect: "M"
    };

    // Known list field types - See: http://msdn.microsoft.com/en-us/library/office/microsoft.sharepoint.spfieldtype(v=office.15).aspx
    var spListFieldTypes = [
        "Integer",
        "Text",
        "Note",
        "DateTime",
        "Counter",
        "Choice",
        "Lookup",
        "Boolean",
        "Number",
        "Currency",
        "URL",
//        "Computed", // NEW
//        "Threading", // NEW
//        "Guid", // NEW
        "MultiChoice",
//        "GridChoice", // NEW
        "Calculated",
        "File",
        "Attachments",
        "User",
//        "Recurrence", // NEW
//        "CrossProjectLink", // NEW
        "ModStat",
        "ContentTypeId",
//        "PageSeparator", // NEW
//        "ThreadIndex", // NEW
        "WorkflowStatus", // NEW
//      "AllDayEvent", // NEW
//      "WorkflowEventType", // NEW
//        "Geolocation", // NEW
//        "OutcomeChoice", // NEW

        // Also seen
        "UserMulti", // Multiselect users
        "LookupMulti", // Multi-select lookup
        "datetime", // Calculated date/time result
        "float", // Calculated float
        "Calc" // General calculated
    ];

    // Caching
    var promisesCache = {};

    //   Web Service names
    var ALERTS = "Alerts";
    var AUTHENTICATION = "Authentication";
    var COPY = "Copy";
    var FORMS = "Forms";
    var LISTS = "Lists";
    var MEETINGS = "Meetings";
    var OFFICIALFILE = "OfficialFile";
    var PEOPLE = "People";
    var PERMISSIONS = "Permissions";
    var PUBLISHEDLINKSSERVICE = "PublishedLinksService";
    var SEARCH = "Search";
    var SHAREPOINTDIAGNOSTICS = "SharePointDiagnostics";
    var SITEDATA = "SiteData";
    var SITES = "Sites";
    var SOCIALDATASERVICE = "SocialDataService";
    var SPELLCHECK = "SpellCheck";
    var TAXONOMYSERVICE = "TaxonomyClientService";
    var USERGROUP = "usergroup";
    var USERPROFILESERVICE = "UserProfileService";
    var VERSIONS = "Versions";
    var VIEWS = "Views";
    var WEBPARTPAGES = "WebPartPages";
    var WEBS = "Webs";
    var WORKFLOW = "Workflow";

    // Global variables
    var currentContext = new SPServicesContext(); // Variable to hold the current context as we figure it out
    var i = 0; // Generic loop counter
    var encodeOptionList = ["listName", "description"]; // Used to encode options which may contain special characters


    // Array to store Web Service information
    //  WSops.OpName = [WebService, needs_SOAPAction];
    //      OpName              The name of the Web Service operation -> These names are unique
    //      WebService          The name of the WebService this operation belongs to
    //      needs_SOAPAction    Boolean indicating whether the operatio needs to have the SOAPAction passed in the setRequestHeaderfunction.
    //                          true if the operation does a write, else false

    var WSops = [];

    WSops.GetAlerts = [ALERTS, false];
    WSops.DeleteAlerts = [ALERTS, true];

    WSops.Mode = [AUTHENTICATION, false];
    WSops.Login = [AUTHENTICATION, false];

    WSops.CopyIntoItems = [COPY, true];
    WSops.CopyIntoItemsLocal = [COPY, true];
    WSops.GetItem = [COPY, false];

    WSops.GetForm = [FORMS, false];
    WSops.GetFormCollection = [FORMS, false];

    WSops.AddAttachment = [LISTS, true];
    WSops.AddDiscussionBoardItem = [LISTS, true];
    WSops.AddList = [LISTS, true];
    WSops.AddListFromFeature = [LISTS, true];
    WSops.ApplyContentTypeToList = [LISTS, true];
    WSops.CheckInFile = [LISTS, true];
    WSops.CheckOutFile = [LISTS, true];
    WSops.CreateContentType = [LISTS, true];
    WSops.DeleteAttachment = [LISTS, true];
    WSops.DeleteContentType = [LISTS, true];
    WSops.DeleteContentTypeXmlDocument = [LISTS, true];
    WSops.DeleteList = [LISTS, true];
    WSops.GetAttachmentCollection = [LISTS, false];
    WSops.GetList = [LISTS, false];
    WSops.GetListAndView = [LISTS, false];
    WSops.GetListCollection = [LISTS, false];
    WSops.GetListContentType = [LISTS, false];
    WSops.GetListContentTypes = [LISTS, false];
    WSops.GetListItemChanges = [LISTS, false];
    WSops.GetListItemChangesSinceToken = [LISTS, false];
    WSops.GetListItems = [LISTS, false];
    WSops.GetVersionCollection = [LISTS, false];
    WSops.UndoCheckOut = [LISTS, true];
    WSops.UpdateContentType = [LISTS, true];
    WSops.UpdateContentTypesXmlDocument = [LISTS, true];
    WSops.UpdateContentTypeXmlDocument = [LISTS, true];
    WSops.UpdateList = [LISTS, true];
    WSops.UpdateListItems = [LISTS, true];

    WSops.AddMeeting = [MEETINGS, true];
    WSops.CreateWorkspace = [MEETINGS, true];
    WSops.RemoveMeeting = [MEETINGS, true];
    WSops.SetWorkSpaceTitle = [MEETINGS, true];

    WSops.GetRecordRouting = [OFFICIALFILE, false];
    WSops.GetRecordRoutingCollection = [OFFICIALFILE, false];
    WSops.GetServerInfo = [OFFICIALFILE, false];
    WSops.SubmitFile = [OFFICIALFILE, true];

    WSops.ResolvePrincipals = [PEOPLE, true];
    WSops.SearchPrincipals = [PEOPLE, false];

    WSops.AddPermission = [PERMISSIONS, true];
    WSops.AddPermissionCollection = [PERMISSIONS, true];
    WSops.GetPermissionCollection = [PERMISSIONS, true];
    WSops.RemovePermission = [PERMISSIONS, true];
    WSops.RemovePermissionCollection = [PERMISSIONS, true];
    WSops.UpdatePermission = [PERMISSIONS, true];

    WSops.GetLinks = [PUBLISHEDLINKSSERVICE, true];

    WSops.GetPortalSearchInfo = [SEARCH, false];
    WSops.GetQuerySuggestions = [SEARCH, false];
    WSops.GetSearchMetadata = [SEARCH, false];
    WSops.Query = [SEARCH, false];
    WSops.QueryEx = [SEARCH, false];
    WSops.Registration = [SEARCH, false];
    WSops.Status = [SEARCH, false];

    WSops.SendClientScriptErrorReport = [SHAREPOINTDIAGNOSTICS, true];

    WSops.GetAttachments = [SITEDATA, false];
    WSops.EnumerateFolder = [SITEDATA, false];
    WSops.SiteDataGetList = [SITEDATA, false];
    WSops.SiteDataGetListCollection = [SITEDATA, false];
    WSops.SiteDataGetSite = [SITEDATA, false];
    WSops.SiteDataGetSiteUrl = [SITEDATA, false];
    WSops.SiteDataGetWeb = [SITEDATA, false];

    WSops.CreateWeb = [SITES, true];
    WSops.DeleteWeb = [SITES, true];
    WSops.GetSite = [SITES, false];
    WSops.GetSiteTemplates = [SITES, false];

    WSops.AddComment = [SOCIALDATASERVICE, true];
    WSops.AddTag = [SOCIALDATASERVICE, true];
    WSops.AddTagByKeyword = [SOCIALDATASERVICE, true];
    WSops.CountCommentsOfUser = [SOCIALDATASERVICE, false];
    WSops.CountCommentsOfUserOnUrl = [SOCIALDATASERVICE, false];
    WSops.CountCommentsOnUrl = [SOCIALDATASERVICE, false];
    WSops.CountRatingsOnUrl = [SOCIALDATASERVICE, false];
    WSops.CountTagsOfUser = [SOCIALDATASERVICE, false];
    WSops.DeleteComment = [SOCIALDATASERVICE, true];
    WSops.DeleteRating = [SOCIALDATASERVICE, true];
    WSops.DeleteTag = [SOCIALDATASERVICE, true];
    WSops.DeleteTagByKeyword = [SOCIALDATASERVICE, true];
    WSops.DeleteTags = [SOCIALDATASERVICE, true];
    WSops.GetAllTagTerms = [SOCIALDATASERVICE, false];
    WSops.GetAllTagTermsForUrlFolder = [SOCIALDATASERVICE, false];
    WSops.GetAllTagUrls = [SOCIALDATASERVICE, false];
    WSops.GetAllTagUrlsByKeyword = [SOCIALDATASERVICE, false];
    WSops.GetCommentsOfUser = [SOCIALDATASERVICE, false];
    WSops.GetCommentsOfUserOnUrl = [SOCIALDATASERVICE, false];
    WSops.GetCommentsOnUrl = [SOCIALDATASERVICE, false];
    WSops.GetRatingAverageOnUrl = [SOCIALDATASERVICE, false];
    WSops.GetRatingOfUserOnUrl = [SOCIALDATASERVICE, false];
    WSops.GetRatingOnUrl = [SOCIALDATASERVICE, false];
    WSops.GetRatingsOfUser = [SOCIALDATASERVICE, false];
    WSops.GetRatingsOnUrl = [SOCIALDATASERVICE, false];
    WSops.GetSocialDataForFullReplication = [SOCIALDATASERVICE, false];
    WSops.GetTags = [SOCIALDATASERVICE, true];
    WSops.GetTagsOfUser = [SOCIALDATASERVICE, true];
    WSops.GetTagTerms = [SOCIALDATASERVICE, true];
    WSops.GetTagTermsOfUser = [SOCIALDATASERVICE, true];
    WSops.GetTagTermsOnUrl = [SOCIALDATASERVICE, true];
    WSops.GetTagUrlsOfUser = [SOCIALDATASERVICE, true];
    WSops.GetTagUrlsOfUserByKeyword = [SOCIALDATASERVICE, true];
    WSops.GetTagUrls = [SOCIALDATASERVICE, true];
    WSops.GetTagUrlsByKeyword = [SOCIALDATASERVICE, true];
    WSops.SetRating = [SOCIALDATASERVICE, true];
    WSops.UpdateComment = [SOCIALDATASERVICE, true];

    WSops.SpellCheck = [SPELLCHECK, false];

    // Taxonomy Service Calls
    // Updated 2011.01.27 by Thomas McMillan
    WSops.AddTerms = [TAXONOMYSERVICE, true];
    WSops.GetChildTermsInTerm = [TAXONOMYSERVICE, false];
    WSops.GetChildTermsInTermSet = [TAXONOMYSERVICE, false];
    WSops.GetKeywordTermsByGuids = [TAXONOMYSERVICE, false];
    WSops.GetTermsByLabel = [TAXONOMYSERVICE, false];
    WSops.GetTermSets = [TAXONOMYSERVICE, false];

    WSops.AddGroup = [USERGROUP, true];
    WSops.AddGroupToRole = [USERGROUP, true];
    WSops.AddRole = [USERGROUP, true];
    WSops.AddRoleDef = [USERGROUP, true];
    WSops.AddUserCollectionToGroup = [USERGROUP, true];
    WSops.AddUserCollectionToRole = [USERGROUP, true];
    WSops.AddUserToGroup = [USERGROUP, true];
    WSops.AddUserToRole = [USERGROUP, true];
    WSops.GetAllUserCollectionFromWeb = [USERGROUP, false];
    WSops.GetGroupCollection = [USERGROUP, false];
    WSops.GetGroupCollectionFromRole = [USERGROUP, false];
    WSops.GetGroupCollectionFromSite = [USERGROUP, false];
    WSops.GetGroupCollectionFromUser = [USERGROUP, false];
    WSops.GetGroupCollectionFromWeb = [USERGROUP, false];
    WSops.GetGroupInfo = [USERGROUP, false];
    WSops.GetRoleCollection = [USERGROUP, false];
    WSops.GetRoleCollectionFromGroup = [USERGROUP, false];
    WSops.GetRoleCollectionFromUser = [USERGROUP, false];
    WSops.GetRoleCollectionFromWeb = [USERGROUP, false];
    WSops.GetRoleInfo = [USERGROUP, false];
    WSops.GetRolesAndPermissionsForCurrentUser = [USERGROUP, false];
    WSops.GetRolesAndPermissionsForSite = [USERGROUP, false];
    WSops.GetUserCollection = [USERGROUP, false];
    WSops.GetUserCollectionFromGroup = [USERGROUP, false];
    WSops.GetUserCollectionFromRole = [USERGROUP, false];
    WSops.GetUserCollectionFromSite = [USERGROUP, false];
    WSops.GetUserCollectionFromWeb = [USERGROUP, false];
    WSops.GetUserInfo = [USERGROUP, false];
    WSops.GetUserLoginFromEmail = [USERGROUP, false];
    WSops.RemoveGroup = [USERGROUP, true];
    WSops.RemoveGroupFromRole = [USERGROUP, true];
    WSops.RemoveRole = [USERGROUP, true];
    WSops.RemoveUserCollectionFromGroup = [USERGROUP, true];
    WSops.RemoveUserCollectionFromRole = [USERGROUP, true];
    WSops.RemoveUserCollectionFromSite = [USERGROUP, true];
    WSops.RemoveUserFromGroup = [USERGROUP, true];
    WSops.RemoveUserFromRole = [USERGROUP, true];
    WSops.RemoveUserFromSite = [USERGROUP, true];
    WSops.RemoveUserFromWeb = [USERGROUP, true];
    WSops.UpdateGroupInfo = [USERGROUP, true];
    WSops.UpdateRoleDefInfo = [USERGROUP, true];
    WSops.UpdateRoleInfo = [USERGROUP, true];
    WSops.UpdateUserInfo = [USERGROUP, true];

    WSops.AddColleague = [USERPROFILESERVICE, true];
    WSops.AddLink = [USERPROFILESERVICE, true];
    WSops.AddMembership = [USERPROFILESERVICE, true];
    WSops.AddPinnedLink = [USERPROFILESERVICE, true];
    WSops.CreateMemberGroup = [USERPROFILESERVICE, true];
    WSops.CreateUserProfileByAccountName = [USERPROFILESERVICE, true];
    WSops.GetCommonColleagues = [USERPROFILESERVICE, false];
    WSops.GetCommonManager = [USERPROFILESERVICE, false];
    WSops.GetCommonMemberships = [USERPROFILESERVICE, false];
    WSops.GetInCommon = [USERPROFILESERVICE, false];
    WSops.GetPropertyChoiceList = [USERPROFILESERVICE, false];
    WSops.GetUserColleagues = [USERPROFILESERVICE, false];
    WSops.GetUserLinks = [USERPROFILESERVICE, false];
    WSops.GetUserMemberships = [USERPROFILESERVICE, false];
    WSops.GetUserPinnedLinks = [USERPROFILESERVICE, false];
    WSops.GetUserProfileByGuid = [USERPROFILESERVICE, false];
    WSops.GetUserProfileByIndex = [USERPROFILESERVICE, false];
    WSops.GetUserProfileByName = [USERPROFILESERVICE, false];
    WSops.GetUserProfileCount = [USERPROFILESERVICE, false];
    WSops.GetUserProfileSchema = [USERPROFILESERVICE, false];
    WSops.GetUserPropertyByAccountName = [USERPROFILESERVICE, false];
    WSops.ModifyUserPropertyByAccountName = [USERPROFILESERVICE, true];
    WSops.RemoveAllColleagues = [USERPROFILESERVICE, true];
    WSops.RemoveAllLinks = [USERPROFILESERVICE, true];
    WSops.RemoveAllMemberships = [USERPROFILESERVICE, true];
    WSops.RemoveAllPinnedLinks = [USERPROFILESERVICE, true];
    WSops.RemoveColleague = [USERPROFILESERVICE, true];
    WSops.RemoveLink = [USERPROFILESERVICE, true];
    WSops.RemoveMembership = [USERPROFILESERVICE, true];
    WSops.RemovePinnedLink = [USERPROFILESERVICE, true];
    WSops.UpdateColleaguePrivacy = [USERPROFILESERVICE, true];
    WSops.UpdateLink = [USERPROFILESERVICE, true];
    WSops.UpdateMembershipPrivacy = [USERPROFILESERVICE, true];
    WSops.UpdatePinnedLink = [USERPROFILESERVICE, true];

    WSops.DeleteAllVersions = [VERSIONS, true];
    WSops.DeleteVersion = [VERSIONS, true];
    WSops.GetVersions = [VERSIONS, false];
    WSops.RestoreVersion = [VERSIONS, true];

    WSops.AddView = [VIEWS, true];
    WSops.DeleteView = [VIEWS, true];
    WSops.GetView = [VIEWS, false];
    WSops.GetViewHtml = [VIEWS, false];
    WSops.GetViewCollection = [VIEWS, false];
    WSops.UpdateView = [VIEWS, true];
    WSops.UpdateViewHtml = [VIEWS, true];

    WSops.AddWebPart = [WEBPARTPAGES, true];
    WSops.AddWebPartToZone = [WEBPARTPAGES, true];
    WSops.DeleteWebPart = [WEBPARTPAGES, true];
    WSops.GetWebPart2 = [WEBPARTPAGES, false];
    WSops.GetWebPartPage = [WEBPARTPAGES, false];
    WSops.GetWebPartProperties = [WEBPARTPAGES, false];
    WSops.GetWebPartProperties2 = [WEBPARTPAGES, false];
    WSops.SaveWebPart2 = [WEBPARTPAGES, true];

    WSops.CreateContentType = [WEBS, true];
    WSops.GetColumns = [WEBS, false];
    WSops.GetContentType = [WEBS, false];
    WSops.GetContentTypes = [WEBS, false];
    WSops.GetCustomizedPageStatus = [WEBS, false];
    WSops.GetListTemplates = [WEBS, false];
    WSops.GetObjectIdFromUrl = [WEBS, false]; // 2010
    WSops.GetWeb = [WEBS, false];
    WSops.GetWebCollection = [WEBS, false];
    WSops.GetAllSubWebCollection = [WEBS, false];
    WSops.UpdateColumns = [WEBS, true];
    WSops.UpdateContentType = [WEBS, true];
    WSops.WebUrlFromPageUrl = [WEBS, false];

    WSops.AlterToDo = [WORKFLOW, true];
    WSops.ClaimReleaseTask = [WORKFLOW, true];
    WSops.GetTemplatesForItem = [WORKFLOW, false];
    WSops.GetToDosForItem = [WORKFLOW, false];
    WSops.GetWorkflowDataForItem = [WORKFLOW, false];
    WSops.GetWorkflowTaskData = [WORKFLOW, false];
    WSops.StartWorkflow = [WORKFLOW, true];

    // Set up SOAP envelope
    var SOAPEnvelope = {};
    SOAPEnvelope.header = "<soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body>";
    SOAPEnvelope.footer = "</soap:Body></soap:Envelope>";
    SOAPEnvelope.payload = "";
    var SOAPAction;

    // Main function, which calls SharePoint's Web Services directly.
    $.fn.SPServices = function (options) {

        // If there are no options passed in, use the defaults.  Extend replaces each default with the passed option.
        var opt = $.extend({}, $.fn.SPServices.defaults, options);

        // Encode options which may contain special character, esp. ampersand
        for (var i = 0; i < encodeOptionList.length; i++) {
            if (typeof opt[encodeOptionList[i]] === "string") {
                opt[encodeOptionList[i]] = encodeXml(opt[encodeOptionList[i]]);
            }
        }

        // Put together operation header and SOAPAction for the SOAP call based on which Web Service we're calling
        SOAPEnvelope.opheader = "<" + opt.operation + " ";
        switch (WSops[opt.operation][0]) {
            case ALERTS:
                SOAPEnvelope.opheader += "xmlns='" + SCHEMASharePoint + "/soap/2002/1/alerts/' >";
                SOAPAction = SCHEMASharePoint + "/soap/2002/1/alerts/";
                break;
            case MEETINGS:
                SOAPEnvelope.opheader += "xmlns='" + SCHEMASharePoint + "/soap/meetings/' >";
                SOAPAction = SCHEMASharePoint + "/soap/meetings/";
                break;
            case OFFICIALFILE:
                SOAPEnvelope.opheader += "xmlns='" + SCHEMASharePoint + "/soap/recordsrepository/' >";
                SOAPAction = SCHEMASharePoint + "/soap/recordsrepository/";
                break;
            case PERMISSIONS:
                SOAPEnvelope.opheader += "xmlns='" + SCHEMASharePoint + "/soap/directory/' >";
                SOAPAction = SCHEMASharePoint + "/soap/directory/";
                break;
            case PUBLISHEDLINKSSERVICE:
                SOAPEnvelope.opheader += "xmlns='http://microsoft.com/webservices/SharePointPortalServer/PublishedLinksService/' >";
                SOAPAction = "http://microsoft.com/webservices/SharePointPortalServer/PublishedLinksService/";
                break;
            case SEARCH:
                SOAPEnvelope.opheader += "xmlns='urn:Microsoft.Search' >";
                SOAPAction = "urn:Microsoft.Search/";
                break;
            case SHAREPOINTDIAGNOSTICS:
                SOAPEnvelope.opheader += "xmlns='" + SCHEMASharePoint + "/diagnostics/' >";
                SOAPAction = "http://schemas.microsoft.com/sharepoint/diagnostics/";
                break;
            case SOCIALDATASERVICE:
                SOAPEnvelope.opheader += "xmlns='http://microsoft.com/webservices/SharePointPortalServer/SocialDataService' >";
                SOAPAction = "http://microsoft.com/webservices/SharePointPortalServer/SocialDataService/";
                break;
            case SPELLCHECK:
                SOAPEnvelope.opheader += "xmlns='http://schemas.microsoft.com/sharepoint/publishing/spelling/' >";
                SOAPAction = "http://schemas.microsoft.com/sharepoint/publishing/spelling/SpellCheck";
                break;
            case TAXONOMYSERVICE:
                SOAPEnvelope.opheader += "xmlns='" + SCHEMASharePoint + "/taxonomy/soap/' >";
                SOAPAction = SCHEMASharePoint + "/taxonomy/soap/";
                break;
            case USERGROUP:
                SOAPEnvelope.opheader += "xmlns='" + SCHEMASharePoint + "/soap/directory/' >";
                SOAPAction = SCHEMASharePoint + "/soap/directory/";
                break;
            case USERPROFILESERVICE:
                SOAPEnvelope.opheader += "xmlns='http://microsoft.com/webservices/SharePointPortalServer/UserProfileService' >";
                SOAPAction = "http://microsoft.com/webservices/SharePointPortalServer/UserProfileService/";
                break;
            case WEBPARTPAGES:
                SOAPEnvelope.opheader += "xmlns='http://microsoft.com/sharepoint/webpartpages' >";
                SOAPAction = "http://microsoft.com/sharepoint/webpartpages/";
                break;
            case WORKFLOW:
                SOAPEnvelope.opheader += "xmlns='" + SCHEMASharePoint + "/soap/workflow/' >";
                SOAPAction = SCHEMASharePoint + "/soap/workflow/";
                break;
            default:
                SOAPEnvelope.opheader += "xmlns='" + SCHEMASharePoint + "/soap/'>";
                SOAPAction = SCHEMASharePoint + "/soap/";
                break;
        }

        // Add the operation to the SOAPAction and opfooter
        SOAPAction += opt.operation;
        SOAPEnvelope.opfooter = "</" + opt.operation + ">";

        // Build the URL for the Ajax call based on which operation we're calling
        // If the webURL has been provided, then use it, else use the current site
        var ajaxURL = "_vti_bin/" + WSops[opt.operation][0] + ".asmx";
        var thisSite = $().SPServices.SPGetCurrentSite();
        var webURL = opt.webURL !== undefined ? opt.webURL : opt.webUrl;
        if (webURL.charAt(webURL.length - 1) === SLASH) {
            ajaxURL = webURL + ajaxURL;
        } else if (webURL.length > 0) {
            ajaxURL = webURL + SLASH + ajaxURL;
        } else {
            ajaxURL = thisSite + ((thisSite.charAt(thisSite.length - 1) === SLASH) ? ajaxURL : (SLASH + ajaxURL));
        }

        SOAPEnvelope.payload = "";
        // Each operation requires a different set of values.  This switch statement sets them up in the SOAPEnvelope.payload.
        switch (opt.operation) {
            // ALERT OPERATIONS
            case "GetAlerts":
                break;
            case "DeleteAlerts":
                SOAPEnvelope.payload += "<IDs>";
                for (i = 0; i < opt.IDs.length; i++) {
                    SOAPEnvelope.payload += wrapNode("string", opt.IDs[i]);
                }
                SOAPEnvelope.payload += "</IDs>";
                break;

            // AUTHENTICATION OPERATIONS
            case "Mode":
                break;
            case "Login":
                addToPayload(opt, ["username", "password"]);
                break;

            // COPY OPERATIONS
            case "CopyIntoItems":
                addToPayload(opt, ["SourceUrl"]);
                SOAPEnvelope.payload += "<DestinationUrls>";
                for (i = 0; i < opt.DestinationUrls.length; i++) {
                    SOAPEnvelope.payload += wrapNode("string", opt.DestinationUrls[i]);
                }
                SOAPEnvelope.payload += "</DestinationUrls>";
                addToPayload(opt, ["Fields", "Stream", "Results"]);
                break;
            case "CopyIntoItemsLocal":
                addToPayload(opt, ["SourceUrl"]);
                SOAPEnvelope.payload += "<DestinationUrls>";
                for (i = 0; i < opt.DestinationUrls.length; i++) {
                    SOAPEnvelope.payload += wrapNode("string", opt.DestinationUrls[i]);
                }
                SOAPEnvelope.payload += "</DestinationUrls>";
                break;
            case "GetItem":
                addToPayload(opt, ["Url", "Fields", "Stream"]);
                break;

            // FORM OPERATIONS
            case "GetForm":
                addToPayload(opt, ["listName", "formUrl"]);
                break;
            case "GetFormCollection":
                addToPayload(opt, ["listName"]);
                break;

            // LIST OPERATIONS
            case "AddAttachment":
                addToPayload(opt, ["listName", "listItemID", "fileName", "attachment"]);
                break;
            case "AddDiscussionBoardItem":
                addToPayload(opt, ["listName", "message"]);
                break;
            case "AddList":
                addToPayload(opt, ["listName", "description", "templateID"]);
                break;
            case "AddListFromFeature":
                addToPayload(opt, ["listName", "description", "featureID", "templateID"]);
                break;
            case "ApplyContentTypeToList":
                addToPayload(opt, ["webUrl", "contentTypeId", "listName"]);
                break;
            case "CheckInFile":
                addToPayload(opt, ["pageUrl", "comment", "CheckinType"]);
                break;
            case "CheckOutFile":
                addToPayload(opt, ["pageUrl", "checkoutToLocal", "lastmodified"]);
                break;
            case "CreateContentType":
                addToPayload(opt, ["listName", "displayName", "parentType", "fields", "contentTypeProperties", "addToView"]);
                break;
            case "DeleteAttachment":
                addToPayload(opt, ["listName", "listItemID", "url"]);
                break;
            case "DeleteContentType":
                addToPayload(opt, ["listName", "contentTypeId"]);
                break;
            case "DeleteContentTypeXmlDocument":
                addToPayload(opt, ["listName", "contentTypeId", "documentUri"]);
                break;
            case "DeleteList":
                addToPayload(opt, ["listName"]);
                break;
            case "GetAttachmentCollection":
                addToPayload(opt, ["listName", ["listItemID", "ID"]]);
                break;
            case "GetList":
                addToPayload(opt, ["listName"]);
                break;
            case "GetListAndView":
                addToPayload(opt, ["listName", "viewName"]);
                break;
            case "GetListCollection":
                break;
            case "GetListContentType":
                addToPayload(opt, ["listName", "contentTypeId"]);
                break;
            case "GetListContentTypes":
                addToPayload(opt, ["listName"]);
                break;
            case "GetListItems":
                addToPayload(opt, ["listName", "viewName", ["query", "CAMLQuery"],
                    ["viewFields", "CAMLViewFields"],
                    ["rowLimit", "CAMLRowLimit"],
                    ["queryOptions", "CAMLQueryOptions"]
                ]);
                break;
            case "GetListItemChanges":
                addToPayload(opt, ["listName", "viewFields", "since", "contains"]);
                break;
            case "GetListItemChangesSinceToken":
                addToPayload(opt, ["listName", "viewName", ["query", "CAMLQuery"],
                    ["viewFields", "CAMLViewFields"],
                    ["rowLimit", "CAMLRowLimit"],
                    ["queryOptions", "CAMLQueryOptions"], {
                        name: "changeToken",
                        sendNull: false
                    }, {
                        name: "contains",
                        sendNull: false
                    }
                ]);
                break;
            case "GetVersionCollection":
                addToPayload(opt, ["strlistID", "strlistItemID", "strFieldName"]);
                break;
            case "UndoCheckOut":
                addToPayload(opt, ["pageUrl"]);
                break;
            case "UpdateContentType":
                addToPayload(opt, ["listName", "contentTypeId", "contentTypeProperties", "newFields", "updateFields", "deleteFields", "addToView"]);
                break;
            case "UpdateContentTypesXmlDocument":
                addToPayload(opt, ["listName", "newDocument"]);
                break;
            case "UpdateContentTypeXmlDocument":
                addToPayload(opt, ["listName", "contentTypeId", "newDocument"]);
                break;
            case "UpdateList":
                addToPayload(opt, ["listName", "listProperties", "newFields", "updateFields", "deleteFields", "listVersion"]);
                break;
            case "UpdateListItems":
                addToPayload(opt, ["listName"]);
                if (typeof opt.updates !== "undefined" && opt.updates.length > 0) {
                    addToPayload(opt, ["updates"]);
                } else {
                    SOAPEnvelope.payload += "<updates><Batch OnError='Continue'><Method ID='1' Cmd='" + opt.batchCmd + "'>";
                    for (i = 0; i < opt.valuepairs.length; i++) {
                        SOAPEnvelope.payload += "<Field Name='" + opt.valuepairs[i][0] + "'>" + escapeColumnValue(opt.valuepairs[i][1]) + "</Field>";
                    }
                    if (opt.batchCmd !== "New") {
                        SOAPEnvelope.payload += "<Field Name='ID'>" + opt.ID + "</Field>";
                    }
                    SOAPEnvelope.payload += "</Method></Batch></updates>";
                }
                break;

            // MEETINGS OPERATIONS
            case "AddMeeting":
                addToPayload(opt, ["organizerEmail", "uid", "sequence", "utcDateStamp", "title", "location", "utcDateStart", "utcDateEnd", "nonGregorian"]);
                break;
            case "CreateWorkspace":
                addToPayload(opt, ["title", "templateName", "lcid", "timeZoneInformation"]);
                break;
            case "RemoveMeeting":
                addToPayload(opt, ["recurrenceId", "uid", "sequence", "utcDateStamp", "cancelMeeting"]);
                break;
            case "SetWorkspaceTitle":
                addToPayload(opt, ["title"]);
                break;

            // OFFICIALFILE OPERATIONS
            case "GetRecordRouting":
                addToPayload(opt, ["recordRouting"]);
                break;
            case "GetRecordRoutingCollection":
                break;
            case "GetServerInfo":
                break;
            case "SubmitFile":
                addToPayload(opt, ["fileToSubmit"], ["properties"], ["recordRouting"], ["sourceUrl"], ["userName"]);
                break;


            // PEOPLE OPERATIONS
            case "ResolvePrincipals":
                addToPayload(opt, ["principalKeys", "principalType", "addToUserInfoList"]);
                break;
            case "SearchPrincipals":
                addToPayload(opt, ["searchText", "maxResults", "principalType"]);
                break;

            // PERMISSION OPERATIONS
            case "AddPermission":
                addToPayload(opt, ["objectName", "objectType", "permissionIdentifier", "permissionType", "permissionMask"]);
                break;
            case "AddPermissionCollection":
                addToPayload(opt, ["objectName", "objectType", "permissionsInfoXml"]);
                break;
            case "GetPermissionCollection":
                addToPayload(opt, ["objectName", "objectType"]);
                break;
            case "RemovePermission":
                addToPayload(opt, ["objectName", "objectType", "permissionIdentifier", "permissionType"]);
                break;
            case "RemovePermissionCollection":
                addToPayload(opt, ["objectName", "objectType", "memberIdsXml"]);
                break;
            case "UpdatePermission":
                addToPayload(opt, ["objectName", "objectType", "permissionIdentifier", "permissionType", "permissionMask"]);
                break;

            // PUBLISHEDLINKSSERVICE OPERATIONS
            case "GetLinks":
                break;

            // SEARCH OPERATIONS
            case "GetPortalSearchInfo":
                SOAPEnvelope.opheader = "<" + opt.operation + " xmlns='http://microsoft.com/webservices/OfficeServer/QueryService'>";
                SOAPAction = "http://microsoft.com/webservices/OfficeServer/QueryService/" + opt.operation;
                break;
            case "GetQuerySuggestions":
                SOAPEnvelope.opheader = "<" + opt.operation + " xmlns='http://microsoft.com/webservices/OfficeServer/QueryService'>";
                SOAPAction = "http://microsoft.com/webservices/OfficeServer/QueryService/" + opt.operation;
                SOAPEnvelope.payload += wrapNode("queryXml", encodeXml(opt.queryXml));
                break;
            case "GetSearchMetadata":
                SOAPEnvelope.opheader = "<" + opt.operation + " xmlns='http://microsoft.com/webservices/OfficeServer/QueryService'>";
                SOAPAction = "http://microsoft.com/webservices/OfficeServer/QueryService/" + opt.operation;
                break;
            case "Query":
                SOAPEnvelope.payload += wrapNode("queryXml", encodeXml(opt.queryXml));
                break;
            case "QueryEx":
                SOAPEnvelope.opheader = "<" + opt.operation + " xmlns='http://microsoft.com/webservices/OfficeServer/QueryService'>";
                SOAPAction = "http://microsoft.com/webservices/OfficeServer/QueryService/" + opt.operation;
                SOAPEnvelope.payload += wrapNode("queryXml", encodeXml(opt.queryXml));
                break;
            case "Registration":
                SOAPEnvelope.payload += wrapNode("registrationXml", encodeXml(opt.registrationXml));
                break;
            case "Status":
                break;

            // SHAREPOINTDIAGNOSTICS OPERATIONS
            case "SendClientScriptErrorReport":
                addToPayload(opt, ["message", "file", "line", "client", "stack", "team", "originalFile"]);
                break;

            // SITEDATA OPERATIONS
            case "EnumerateFolder":
                addToPayload(opt, ["strFolderUrl"]);
                break;
            case "GetAttachments":
                addToPayload(opt, ["strListName", "strItemId"]);
                break;
            case "SiteDataGetList":
                addToPayload(opt, ["strListName"]);
                // Because this operation has a name which duplicates the Lists WS, need to handle
                SOAPEnvelope = siteDataFixSOAPEnvelope(SOAPEnvelope, opt.operation);
                break;
            case "SiteDataGetListCollection":
                // Because this operation has a name which duplicates the Lists WS, need to handle
                SOAPEnvelope = siteDataFixSOAPEnvelope(SOAPEnvelope, opt.operation);
                break;
            case "SiteDataGetSite":
                // Because this operation has a name which duplicates the Lists WS, need to handle
                SOAPEnvelope = siteDataFixSOAPEnvelope(SOAPEnvelope, opt.operation);
                break;
            case "SiteDataGetSiteUrl":
                addToPayload(opt, ["Url"]);
                // Because this operation has a name which duplicates the Lists WS, need to handle
                SOAPEnvelope = siteDataFixSOAPEnvelope(SOAPEnvelope, opt.operation);
                break;
            case "SiteDataGetWeb":
                // Because this operation has a name which duplicates the Lists WS, need to handle
                SOAPEnvelope = siteDataFixSOAPEnvelope(SOAPEnvelope, opt.operation);
                break;

            // SITES OPERATIONS
            case "CreateWeb":
                addToPayload(opt, ["url", "title", "description", "templateName", "language", "languageSpecified",
                    "locale", "localeSpecified", "collationLocale", "collationLocaleSpecified", "uniquePermissions",
                    "uniquePermissionsSpecified", "anonymous", "anonymousSpecified", "presence", "presenceSpecified"
                ]);
                break;
            case "DeleteWeb":
                addToPayload(opt, ["url"]);
                break;
            case "GetSite":
                addToPayload(opt, ["SiteUrl"]);
                break;
            case "GetSiteTemplates":
                addToPayload(opt, ["LCID", "TemplateList"]);
                break;

            // SOCIALDATASERVICE OPERATIONS
            case "AddComment":
                addToPayload(opt, ["url", "comment", "isHighPriority", "title"]);
                break;
            case "AddTag":
                addToPayload(opt, ["url", "termID", "title", "isPrivate"]);
                break;
            case "AddTagByKeyword":
                addToPayload(opt, ["url", "keyword", "title", "isPrivate"]);
                break;
            case "CountCommentsOfUser":
                addToPayload(opt, ["userAccountName"]);
                break;
            case "CountCommentsOfUserOnUrl":
                addToPayload(opt, ["userAccountName", "url"]);
                break;
            case "CountCommentsOnUrl":
                addToPayload(opt, ["url"]);
                break;
            case "CountRatingsOnUrl":
                addToPayload(opt, ["url"]);
                break;
            case "CountTagsOfUser":
                addToPayload(opt, ["userAccountName"]);
                break;
            case "DeleteComment":
                addToPayload(opt, ["url", "lastModifiedTime"]);
                break;
            case "DeleteRating":
                addToPayload(opt, ["url"]);
                break;
            case "DeleteTag":
                addToPayload(opt, ["url", "termID"]);
                break;
            case "DeleteTagByKeyword":
                addToPayload(opt, ["url", "keyword"]);
                break;
            case "DeleteTags":
                addToPayload(opt, ["url"]);
                break;
            case "GetAllTagTerms":
                addToPayload(opt, ["maximumItemsToReturn"]);
                break;
            case "GetAllTagTermsForUrlFolder":
                addToPayload(opt, ["urlFolder", "maximumItemsToReturn"]);
                break;
            case "GetAllTagUrls":
                addToPayload(opt, ["termID"]);
                break;
            case "GetAllTagUrlsByKeyword":
                addToPayload(opt, ["keyword"]);
                break;
            case "GetCommentsOfUser":
                addToPayload(opt, ["userAccountName", "maximumItemsToReturn", "startIndex"]);
                break;
            case "GetCommentsOfUserOnUrl":
                addToPayload(opt, ["userAccountName", "url"]);
                break;
            case "GetCommentsOnUrl":
                addToPayload(opt, ["url", "maximumItemsToReturn", "startIndex"]);
                if (typeof opt.excludeItemsTime !== "undefined" && opt.excludeItemsTime.length > 0) {
                    SOAPEnvelope.payload += wrapNode("excludeItemsTime", opt.excludeItemsTime);
                }
                break;
            case "GetRatingAverageOnUrl":
                addToPayload(opt, ["url"]);
                break;
            case "GetRatingOfUserOnUrl":
                addToPayload(opt, ["userAccountName", "url"]);
                break;
            case "GetRatingOnUrl":
                addToPayload(opt, ["url"]);
                break;
            case "GetRatingsOfUser":
                addToPayload(opt, ["userAccountName"]);
                break;
            case "GetRatingsOnUrl":
                addToPayload(opt, ["url"]);
                break;
            case "GetSocialDataForFullReplication":
                addToPayload(opt, ["userAccountName"]);
                break;
            case "GetTags":
                addToPayload(opt, ["url"]);
                break;
            case "GetTagsOfUser":
                addToPayload(opt, ["userAccountName", "maximumItemsToReturn", "startIndex"]);
                break;
            case "GetTagTerms":
                addToPayload(opt, ["maximumItemsToReturn"]);
                break;
            case "GetTagTermsOfUser":
                addToPayload(opt, ["userAccountName", "maximumItemsToReturn"]);
                break;
            case "GetTagTermsOnUrl":
                addToPayload(opt, ["url", "maximumItemsToReturn"]);
                break;
            case "GetTagUrls":
                addToPayload(opt, ["termID"]);
                break;
            case "GetTagUrlsByKeyword":
                addToPayload(opt, ["keyword"]);
                break;
            case "GetTagUrlsOfUser":
                addToPayload(opt, ["termID", "userAccountName"]);
                break;
            case "GetTagUrlsOfUserByKeyword":
                addToPayload(opt, ["keyword", "userAccountName"]);
                break;
            case "SetRating":
                addToPayload(opt, ["url", "rating", "title", "analysisDataEntry"]);
                break;
            case "UpdateComment":
                addToPayload(opt, ["url", "lastModifiedTime", "comment", "isHighPriority"]);
                break;

            // SPELLCHECK OPERATIONS 
            case "SpellCheck":
                addToPayload(opt, ["chunksToSpell", "declaredLanguage", "useLad"]);
                break;

            // TAXONOMY OPERATIONS 
            case "AddTerms":
                addToPayload(opt, ["sharedServiceId", "termSetId", "lcid", "newTerms"]);
                break;
            case "GetChildTermsInTerm":
                addToPayload(opt, ["sspId", "lcid", "termId", "termSetId"]);
                break;
            case "GetChildTermsInTermSet":
                addToPayload(opt, ["sspId", "lcid", "termSetId"]);
                break;
            case "GetKeywordTermsByGuids":
                addToPayload(opt, ["termIds", "lcid"]);
                break;
            case "GetTermsByLabel":
                addToPayload(opt, ["label", "lcid", "matchOption", "resultCollectionSize", "termIds", "addIfNotFound"]);
                break;
            case "GetTermSets":
                addToPayload(opt, ["sharedServiceIds", "termSetIds", "lcid", "clientTimeStamps", "clientVersions"]);
                break;

                // USERS AND GROUPS OPERATIONS
            case "AddGroup":
                addToPayload(opt, ["groupName", "ownerIdentifier", "ownerType", "defaultUserLoginName", "description"]);
                break;
            case "AddGroupToRole":
                addToPayload(opt, ["groupName", "roleName"]);
                break;
            case "AddRole":
                addToPayload(opt, ["roleName", "description", "permissionMask"]);
                break;
            case "AddRoleDef":
                addToPayload(opt, ["roleName", "description", "permissionMask"]);
                break;
            case "AddUserCollectionToGroup":
                addToPayload(opt, ["groupName", "usersInfoXml"]);
                break;
            case "AddUserCollectionToRole":
                addToPayload(opt, ["roleName", "usersInfoXml"]);
                break;
            case "AddUserToGroup":
                addToPayload(opt, ["groupName", "userName", "userLoginName", "userEmail", "userNotes"]);
                break;
            case "AddUserToRole":
                addToPayload(opt, ["roleName", "userName", "userLoginName", "userEmail", "userNotes"]);
                break;
            case "GetAllUserCollectionFromWeb":
                break;
            case "GetGroupCollection":
                addToPayload(opt, ["groupNamesXml"]);
                break;
            case "GetGroupCollectionFromRole":
                addToPayload(opt, ["roleName"]);
                break;
            case "GetGroupCollectionFromSite":
                break;
            case "GetGroupCollectionFromUser":
                addToPayload(opt, ["userLoginName"]);
                break;
            case "GetGroupCollectionFromWeb":
                break;
            case "GetGroupInfo":
                addToPayload(opt, ["groupName"]);
                break;
            case "GetRoleCollection":
                addToPayload(opt, ["roleNamesXml"]);
                break;
            case "GetRoleCollectionFromGroup":
                addToPayload(opt, ["groupName"]);
                break;
            case "GetRoleCollectionFromUser":
                addToPayload(opt, ["userLoginName"]);
                break;
            case "GetRoleCollectionFromWeb":
                break;
            case "GetRoleInfo":
                addToPayload(opt, ["roleName"]);
                break;
            case "GetRolesAndPermissionsForCurrentUser":
                break;
            case "GetRolesAndPermissionsForSite":
                break;
            case "GetUserCollection":
                addToPayload(opt, ["userLoginNamesXml"]);
                break;
            case "GetUserCollectionFromGroup":
                addToPayload(opt, ["groupName"]);
                break;
            case "GetUserCollectionFromRole":
                addToPayload(opt, ["roleName"]);
                break;
            case "GetUserCollectionFromSite":
                break;
            case "GetUserCollectionFromWeb":
                break;
            case "GetUserInfo":
                addToPayload(opt, ["userLoginName"]);
                break;
            case "GetUserLoginFromEmail":
                addToPayload(opt, ["emailXml"]);
                break;
            case "RemoveGroup":
                addToPayload(opt, ["groupName"]);
                break;
            case "RemoveGroupFromRole":
                addToPayload(opt, ["roleName", "groupName"]);
                break;
            case "RemoveRole":
                addToPayload(opt, ["roleName"]);
                break;
            case "RemoveUserCollectionFromGroup":
                addToPayload(opt, ["groupName", "userLoginNamesXml"]);
                break;
            case "RemoveUserCollectionFromRole":
                addToPayload(opt, ["roleName", "userLoginNamesXml"]);
                break;
            case "RemoveUserCollectionFromSite":
                addToPayload(opt, ["userLoginNamesXml"]);
                break;
            case "RemoveUserFromGroup":
                addToPayload(opt, ["groupName", "userLoginName"]);
                break;
            case "RemoveUserFromRole":
                addToPayload(opt, ["roleName", "userLoginName"]);
                break;
            case "RemoveUserFromSite":
                addToPayload(opt, ["userLoginName"]);
                break;
            case "RemoveUserFromWeb":
                addToPayload(opt, ["userLoginName"]);
                break;
            case "UpdateGroupInfo":
                addToPayload(opt, ["oldGroupName", "groupName", "ownerIdentifier", "ownerType", "description"]);
                break;
            case "UpdateRoleDefInfo":
                addToPayload(opt, ["oldRoleName", "roleName", "description", "permissionMask"]);
                break;
            case "UpdateRoleInfo":
                addToPayload(opt, ["oldRoleName", "roleName", "description", "permissionMask"]);
                break;
            case "UpdateUserInfo":
                addToPayload(opt, ["userLoginName", "userName", "userEmail", "userNotes"]);
                break;

            // USERPROFILESERVICE OPERATIONS
            case "AddColleague":
                addToPayload(opt, ["accountName", "colleagueAccountName", "group", "privacy", "isInWorkGroup"]);
                break;
            case "AddLink":
                addToPayload(opt, ["accountName", "name", "url", "group", "privacy"]);
                break;
            case "AddMembership":
                addToPayload(opt, ["accountName", "membershipInfo", "group", "privacy"]);
                break;
            case "AddPinnedLink":
                addToPayload(opt, ["accountName", "name", "url"]);
                break;
            case "CreateMemberGroup":
                addToPayload(opt, ["membershipInfo"]);
                break;
            case "CreateUserProfileByAccountName":
                addToPayload(opt, ["accountName"]);
                break;
            case "GetCommonColleagues":
                addToPayload(opt, ["accountName"]);
                break;
            case "GetCommonManager":
                addToPayload(opt, ["accountName"]);
                break;
            case "GetCommonMemberships":
                addToPayload(opt, ["accountName"]);
                break;
            case "GetInCommon":
                addToPayload(opt, ["accountName"]);
                break;
            case "GetPropertyChoiceList":
                addToPayload(opt, ["propertyName"]);
                break;
            case "GetUserColleagues":
                addToPayload(opt, ["accountName"]);
                break;
            case "GetUserLinks":
                addToPayload(opt, ["accountName"]);
                break;
            case "GetUserMemberships":
                addToPayload(opt, ["accountName"]);
                break;
            case "GetUserPinnedLinks":
                addToPayload(opt, ["accountName"]);
                break;
            case "GetUserProfileByGuid":
                addToPayload(opt, ["guid"]);
                break;
            case "GetUserProfileByIndex":
                addToPayload(opt, ["index"]);
                break;
            case "GetUserProfileByName":
                // Note that this operation is inconsistent with the others, using AccountName rather than accountName
                if (typeof opt.accountName !== "undefined" && opt.accountName.length > 0) {
                    addToPayload(opt, [
                        ["AccountName", "accountName"]
                    ]);
                } else {
                    addToPayload(opt, ["AccountName"]);
                }
                break;
            case "GetUserProfileCount":
                break;
            case "GetUserProfileSchema":
                break;
            case "GetUserPropertyByAccountName":
                addToPayload(opt, ["accountName", "propertyName"]);
                break;
            case "ModifyUserPropertyByAccountName":
                addToPayload(opt, ["accountName", "newData"]);
                break;
            case "RemoveAllColleagues":
                addToPayload(opt, ["accountName"]);
                break;
            case "RemoveAllLinks":
                addToPayload(opt, ["accountName"]);
                break;
            case "RemoveAllMemberships":
                addToPayload(opt, ["accountName"]);
                break;
            case "RemoveAllPinnedLinks":
                addToPayload(opt, ["accountName"]);
                break;
            case "RemoveColleague":
                addToPayload(opt, ["accountName", "colleagueAccountName"]);
                break;
            case "RemoveLink":
                addToPayload(opt, ["accountName", "id"]);
                break;
            case "RemoveMembership":
                addToPayload(opt, ["accountName", "sourceInternal", "sourceReference"]);
                break;
            case "RemovePinnedLink":
                addToPayload(opt, ["accountName", "id"]);
                break;
            case "UpdateColleaguePrivacy":
                addToPayload(opt, ["accountName", "colleagueAccountName", "newPrivacy"]);
                break;
            case "UpdateLink":
                addToPayload(opt, ["accountName", "data"]);
                break;
            case "UpdateMembershipPrivacy":
                addToPayload(opt, ["accountName", "sourceInternal", "sourceReference", "newPrivacy"]);
                break;
            case "UpdatePinnedLink ":
                addToPayload(opt, ["accountName", "data"]);
                break;

            // VERSIONS OPERATIONS
            case "DeleteAllVersions":
                addToPayload(opt, ["fileName"]);
                break;
            case "DeleteVersion":
                addToPayload(opt, ["fileName", "fileVersion"]);
                break;
            case "GetVersions":
                addToPayload(opt, ["fileName"]);
                break;
            case "RestoreVersion":
                addToPayload(opt, ["fileName", "fileVersion"]);
                break;

            // VIEW OPERATIONS
            case "AddView":
                addToPayload(opt, ["listName", "viewName", "viewFields", "query", "rowLimit", "rowLimit", "type", "makeViewDefault"]);
                break;
            case "DeleteView":
                addToPayload(opt, ["listName", "viewName"]);
                break;
            case "GetView":
                addToPayload(opt, ["listName", "viewName"]);
                break;
            case "GetViewCollection":
                addToPayload(opt, ["listName"]);
                break;
            case "GetViewHtml":
                addToPayload(opt, ["listName", "viewName"]);
                break;
            case "UpdateView":
                addToPayload(opt, ["listName", "viewName", "viewProperties", "query", "viewFields", "aggregations", "formats", "rowLimit"]);
                break;
            case "UpdateViewHtml":
                addToPayload(opt, ["listName", "viewName", "viewProperties", "toolbar", "viewHeader", "viewBody", "viewFooter", "viewEmpty", "rowLimitExceeded",
                    "query", "viewFields", "aggregations", "formats", "rowLimit"
                ]);
                break;

            // WEBPARTPAGES OPERATIONS
            case "AddWebPart":
                addToPayload(opt, ["pageUrl", "webPartXml", "storage"]);
                break;
            case "AddWebPartToZone":
                addToPayload(opt, ["pageUrl", "webPartXml", "storage", "zoneId", "zoneIndex"]);
                break;
            case "DeleteWebPart":
                addToPayload(opt, ["pageUrl", "storageKey", "storage"]);
                break;
            case "GetWebPart2":
                addToPayload(opt, ["pageUrl", "storageKey", "storage", "behavior"]);
                break;
            case "GetWebPartPage":
                addToPayload(opt, ["documentName", "behavior"]);
                break;
            case "GetWebPartProperties":
                addToPayload(opt, ["pageUrl", "storage"]);
                break;
            case "GetWebPartProperties2":
                addToPayload(opt, ["pageUrl", "storage", "behavior"]);
                break;
            case "SaveWebPart2":
                addToPayload(opt, ["pageUrl", "storageKey", "webPartXml", "storage", "allowTypeChange"]);
                break;

            // WEBS OPERATIONS
            case "Webs.CreateContentType":
                addToPayload(opt, ["displayName", "parentType", "newFields", "contentTypeProperties"]);
                break;
            case "GetColumns":
                addToPayload(opt, ["webUrl"]);
                break;
            case "GetContentType":
                addToPayload(opt, ["contentTypeId"]);
                break;
            case "GetContentTypes":
                break;
            case "GetCustomizedPageStatus":
                addToPayload(opt, ["fileUrl"]);
                break;
            case "GetListTemplates":
                break;
            case "GetObjectIdFromUrl":
                addToPayload(opt, ["objectUrl"]);
                break;
            case "GetWeb":
                addToPayload(opt, [
                    ["webUrl", "webURL"]
                ]);
                break;
            case "GetWebCollection":
                break;
            case "GetAllSubWebCollection":
                break;
            case "UpdateColumns":
                addToPayload(opt, ["newFields", "updateFields", "deleteFields"]);
                break;
            case "Webs.UpdateContentType":
                addToPayload(opt, ["contentTypeId", "contentTypeProperties", "newFields", "updateFields", "deleteFields"]);
                break;
            case "WebUrlFromPageUrl":
                addToPayload(opt, [
                    ["pageUrl", "pageURL"]
                ]);
                break;

            // WORKFLOW OPERATIONS
            case "AlterToDo":
                addToPayload(opt, ["item", "todoId", "todoListId", "taskData"]);
                break;
            case "ClaimReleaseTask":
                addToPayload(opt, ["item", "taskId", "listId", "fClaim"]);
                break;
            case "GetTemplatesForItem":
                addToPayload(opt, ["item"]);
                break;
            case "GetToDosForItem":
                addToPayload(opt, ["item"]);
                break;
            case "GetWorkflowDataForItem":
                addToPayload(opt, ["item"]);
                break;
            case "GetWorkflowTaskData":
                addToPayload(opt, ["item", "listId", "taskId"]);
                break;
            case "StartWorkflow":
                addToPayload(opt, ["item", "templateId", "workflowParameters"]);
                break;

            default:
                break;
        }

        // Glue together the pieces of the SOAP message
        var msg = SOAPEnvelope.header + SOAPEnvelope.opheader + SOAPEnvelope.payload + SOAPEnvelope.opfooter + SOAPEnvelope.footer;

        // Check to see if we've already cached the results
        var cachedPromise;
        if (opt.cacheXML) {
            cachedPromise = promisesCache[msg];
        }

        if (typeof cachedPromise === "undefined") {

            // Finally, make the Ajax call
            var p = $.ajax({
                // The relative URL for the AJAX call
                url: ajaxURL,
                // By default, the AJAX calls are asynchronous.  You can specify false to require a synchronous call.
                async: opt.async,
                // Before sending the msg, need to send the request header
                beforeSend: function (xhr) {
                    // If we need to pass the SOAPAction, do so
                    if (WSops[opt.operation][1]) {
                        xhr.setRequestHeader("SOAPAction", SOAPAction);
                    }
                },
                // Always a POST
                type: "POST",
                // Here is the SOAP request we've built above
                data: msg,
                // We're getting XML; tell jQuery so that it doesn't need to do a best guess
                dataType: "xml",
                // and this is its content type
                contentType: "text/xml;charset='utf-8'",
                complete: function (xData, Status) {
                    // When the call is complete, call the completefunc if there is one
                    if ($.isFunction(opt.completefunc)) {
                        opt.completefunc(xData, Status);

                    }
                }
            });
            if(opt.cacheXML) {
                promisesCache[msg] = p;
            }

            // Return the promise
            return p;

        } else {

            // Call the completefunc if there is one
            if ($.isFunction(opt.completefunc)) {
//                opt.completefunc(cachedPromise, null);
                cachedPromise.done(function(data, status, jqXHR){
                    opt.completefunc(jqXHR, status);
                });

            }
            // Return the cached promise
            return cachedPromise;
        }

    }; // End $.fn.SPServices

    // Defaults added as a function in our library means that the caller can override the defaults
    // for their session by calling this function.  Each operation requires a different set of options;
    // we allow for all in a standardized way.
    $.fn.SPServices.defaults = {

        cacheXML: false, // If true, we'll cache the XML results with jQuery's .data() function
        operation: "", // The Web Service operation
        webURL: "", // URL of the target Web
        makeViewDefault: false, // true to make the view the default view for the list

        // For operations requiring CAML, these options will override any abstractions
        viewName: "", // View name in CAML format.
        CAMLQuery: "", // Query in CAML format
        CAMLViewFields: "", // View fields in CAML format
        CAMLRowLimit: 0, // Row limit as a string representation of an integer
        CAMLQueryOptions: "<QueryOptions></QueryOptions>", // Query options in CAML format

        // Abstractions for CAML syntax
        batchCmd: "Update", // Method Cmd for UpdateListItems
        valuepairs: [], // Fieldname / Fieldvalue pairs for UpdateListItems

        // As of v0.7.1, removed all options which were assigned an empty string ("")
        DestinationUrls: [], // Array of destination URLs for copy operations
        behavior: "Version3", // An SPWebServiceBehavior indicating whether the client supports Windows SharePoint Services 2.0 or Windows SharePoint Services 3.0: {Version2 | Version3 }
        storage: "Shared", // A Storage value indicating how the Web Part is stored: {None | Personal | Shared}
        objectType: "List", // objectType for operations which require it
        cancelMeeting: true, // true to delete a meeting;false to remove its association with a Meeting Workspace site
        nonGregorian: false, // true if the calendar is set to a format other than Gregorian;otherwise, false.
        fClaim: false, // Specifies if the action is a claim or a release. Specifies true for a claim and false for a release.
        recurrenceId: 0, // The recurrence ID for the meeting that needs its association removed. This parameter can be set to 0 for single-instance meetings.
        sequence: 0, // An integer that is used to determine the ordering of updates in case they arrive out of sequence. Updates with a lower-than-current sequence are discarded. If the sequence is equal to the current sequence, the latest update are applied.
        maximumItemsToReturn: 0, // SocialDataService maximumItemsToReturn
        startIndex: 0, // SocialDataService startIndex
        isHighPriority: false, // SocialDataService isHighPriority
        isPrivate: false, // SocialDataService isPrivate
        rating: 1, // SocialDataService rating
        maxResults: 10, // Unless otherwise specified, the maximum number of principals that can be returned from a provider is 10.
        principalType: "User", // Specifies user scope and other information: [None | User | DistributionList | SecurityGroup | SharePointGroup | All]

        async: true, // Allow the user to force async
        completefunc: null // Function to call on completion

    }; // End $.fn.SPServices.defaults

    // Function to determine the current Web's URL.  We need this for successful Ajax calls.
    // The function is also available as a public function.
    $.fn.SPServices.SPGetCurrentSite = function () {

        // We've already determined the current site...
        if (currentContext.thisSite.length > 0) {
            return currentContext.thisSite;
        }

        // If we still don't know the current site, we call WebUrlFromPageUrlResult.
        var msg = SOAPEnvelope.header +
            "<WebUrlFromPageUrl xmlns='" + SCHEMASharePoint + "/soap/' ><pageUrl>" +
            ((location.href.indexOf("?") > 0) ? location.href.substr(0, location.href.indexOf("?")) : location.href) +
            "</pageUrl></WebUrlFromPageUrl>" +
            SOAPEnvelope.footer;
        $.ajax({
            async: false, // Need this to be synchronous so we're assured of a valid value
            url: "/_vti_bin/Webs.asmx",
            type: "POST",
            data: msg,
            dataType: "xml",
            contentType: "text/xml;charset=\"utf-8\"",
            complete: function (xData) {
                currentContext.thisSite = $(xData.responseXML).find("WebUrlFromPageUrlResult").text();
            }
        });

        return currentContext.thisSite; // Return the URL

    }; // End $.fn.SPServices.SPGetCurrentSite

    // Function to set up cascading dropdowns on a SharePoint form
    // (Newform.aspx, EditForm.aspx, or any other customized form.)
    $.fn.SPServices.SPCascadeDropdowns = function (options) {

        var opt = $.extend({}, {
            relationshipWebURL: "", // [Optional] The name of the Web (site) which contains the relationships list
            relationshipList: "", // The name of the list which contains the parent/child relationships
            relationshipListParentColumn: "", // The internal name of the parent column in the relationship list
            relationshipListChildColumn: "", // The internal name of the child column in the relationship list
            relationshipListSortColumn: "", // [Optional] If specified, sort the options in the dropdown by this column,
            // otherwise the options are sorted by relationshipListChildColumn
            parentColumn: "", // The display name of the parent column in the form
            childColumn: "", // The display name of the child column in the form
            listName: $().SPServices.SPListNameFromUrl(), // The list the form is working with. This is useful if the form is not in the list context.
            CAMLQuery: "", // [Optional] For power users, this CAML fragment will be Anded with the default query on the relationshipList
            CAMLQueryOptions: "<QueryOptions><IncludeMandatoryColumns>FALSE</IncludeMandatoryColumns></QueryOptions>", // [Optional] For power users, ability to specify Query Options
            promptText: "", // [DEPRECATED] Text to use as prompt. If included, {0} will be replaced with the value of childColumn. Original value "Choose {0}..."
            noneText: "(None)", // [Optional] Text to use for the (None) selection. Provided for non-English language support.
            simpleChild: false, // [Optional] If set to true and childColumn is a complex dropdown, convert it to a simple dropdown
            selectSingleOption: false, // [Optional] If set to true and there is only a single child option, select it
            matchOnId: false, // By default, we match on the lookup's text value. If matchOnId is true, we'll match on the lookup id instead.
            completefunc: null, // Function to call on completion of rendering the change.
            debug: false // If true, show error messages;if false, run silent
        }, options);


        var thisParentSetUp = false;
        var thisFunction = "SPServices.SPCascadeDropdowns";

        // Find the parent column's select (dropdown)
        var parentSelect = $().SPServices.SPDropdownCtl({
            displayName: opt.parentColumn
        });
        if (parentSelect.Obj.html() === null && opt.debug) {
            errBox(thisFunction, "parentColumn: " + opt.parentColumn, TXTColumnNotFound);
            return;
        }

        // Find the child column's select (dropdown)
        var childSelect = $().SPServices.SPDropdownCtl({
            displayName: opt.childColumn
        });
        if (childSelect.Obj.html() === null && opt.debug) {
            errBox(thisFunction, "childColumn: " + opt.childColumn, TXTColumnNotFound);
            return;
        }

        // If requested and the childColumn is a complex dropdown, convert to a simple dropdown
        if (opt.simpleChild === true && childSelect.Type === dropdownType.complex) {
            $().SPServices.SPComplexToSimpleDropdown({
                listName: opt.listName,
                columnName: opt.childColumn
            });
            // Set the childSelect to reference the new simple dropdown
            childSelect = $().SPServices.SPDropdownCtl({
                displayName: opt.childColumn
            });
        }

        var childColumnRequired, childColumnStatic;

        // Get information about the childColumn from the current list
        $().SPServices({
            operation: "GetList",
            async: false,
            cacheXML: true,
            listName: opt.listName,
            completefunc: function (xData) {
                $(xData.responseXML).find("Fields").each(function () {
                    $(this).find("Field[DisplayName='" + opt.childColumn + "']").each(function () {
                        // Determine whether childColumn is Required
                        childColumnRequired = ($(this).attr("Required") === "TRUE");
                        childColumnStatic = $(this).attr("StaticName");
                        // Stop looking; we're done
                        return false;
                    });
                });
            }
        });

        // Save data about each child column on the parent
        var childColumn = {
            opt: opt,
            childSelect: childSelect,
            childColumnStatic: childColumnStatic,
            childColumnRequired: childColumnRequired
        };
        var childColumns = parentSelect.Obj.data("SPCascadeDropdownsChildColumns");

        // If this is the first child for this parent, then create the data object to hold the settings
        if (typeof childColumns === "undefined") {
            parentSelect.Obj.data("SPCascadeDropdownsChildColumns", [childColumn]);
            // If we already have a data object for this parent, then add the setting for this child to it
        } else {
            childColumns.push(childColumn);
            parentSelect.Obj.data("SPCascadeDropdownsChildColumns", childColumns);
            thisParentSetUp = true;
        }

        // We only need to bind to the event(s) if we haven't already done so
        if (!thisParentSetUp) {
            switch (parentSelect.Type) {
                // Plain old select
                case dropdownType.simple:
                    parentSelect.Obj.bind("change", function () {
                        cascadeDropdown(parentSelect);
                    });
                    break;
                // Input / Select hybrid
                case dropdownType.complex:
                    // Bind to any change on the hidden input element
                    parentSelect.optHid.bind("propertychange", function () {
                        cascadeDropdown(parentSelect);
                    });
                    break;
                // Multi-select hybrid
                case dropdownType.multiSelect:
                    // Handle the dblclick on the candidate select
                    $(parentSelect.master.candidateControl).bind("dblclick", function () {
                        cascadeDropdown(parentSelect);
                    });
                    // Handle the dblclick on the selected values
                    $(parentSelect.master.resultControl).bind("dblclick", function () {
                        cascadeDropdown(parentSelect);
                    });
                    // Handle button clicks
                    $(parentSelect.master.addControl).bind("click", function () {
                        cascadeDropdown(parentSelect);
                    });
                    $(parentSelect.master.removeControl).bind("click", function () {
                        cascadeDropdown(parentSelect);
                    });
                    break;
                default:
                    break;
            }
        }
        // Fire the change to set the initially allowable values
        cascadeDropdown(parentSelect);

    }; // End $.fn.SPServices.SPCascadeDropdowns

    function cascadeDropdown(parentSelect) {
        var choices = "";
        var parentSelectSelected;
        var childSelectSelected = null;
        var newMultiLookupPickerdata;
        var numChildOptions;
        var firstChildOptionId;
        var firstChildOptionValue;

        // Filter each child column
        var childColumns = parentSelect.Obj.data("SPCascadeDropdownsChildColumns");
        $(childColumns).each(function () {

            // Break out the data objects for this child column
            var opt = this.opt;
            var childSelect = this.childSelect;
            var childColumnStatic = this.childColumnStatic;
            var childColumnRequired = this.childColumnRequired;

            // Get the parent column selection(s)
            parentSelectSelected = getDropdownSelected(parentSelect, opt.matchOnId);

            // If the selection hasn't changed, then there's nothing to do right now.  This is useful to reduce
            // the number of Web Service calls when the parentSelect.Type = dropdownType.complex or dropdownType.multiSelect, as there are multiple propertychanges
            // which don't require any action.  The attribute will be unique per child column in case there are
            // multiple children for a given parent.
            var allParentSelections = parentSelectSelected.join(spDelim);
            if (parentSelect.Obj.data("SPCascadeDropdown_Selected_" + childColumnStatic) === allParentSelections) {
                return;
            }
            parentSelect.Obj.data("SPCascadeDropdown_Selected_" + childColumnStatic, allParentSelections);

            // Get the current child column selection(s)
            childSelectSelected = getDropdownSelected(childSelect, true);

            // When the parent column's selected option changes, get the matching items from the relationship list
            // Get the list items which match the current selection
            var sortColumn = (opt.relationshipListSortColumn.length > 0) ? opt.relationshipListSortColumn : opt.relationshipListChildColumn;
            var camlQuery = "<Query><OrderBy><FieldRef Name='" + sortColumn + "'/></OrderBy><Where><And>";
            if (opt.CAMLQuery.length > 0) {
                camlQuery += "<And>";
            }

            // Build up the criteria for inclusion
            if (parentSelectSelected.length === 0) {
                // Handle the case where no values are selected in multi-selects
                camlQuery += "<Eq><FieldRef Name='" + opt.relationshipListParentColumn + "'/><Value Type='Text'></Value></Eq>";
            } else if (parentSelectSelected.length === 1) {
                // Only one value is selected
                camlQuery += "<Eq><FieldRef Name='" + opt.relationshipListParentColumn +
                (opt.matchOnId ? "' LookupId='True'/><Value Type='Integer'>" : "'/><Value Type='Text'>") +
                escapeColumnValue(parentSelectSelected[0]) + "</Value></Eq>";
            } else {
                var compound = (parentSelectSelected.length > 2);
                for (i = 0; i < (parentSelectSelected.length - 1); i++) {
                    camlQuery += "<Or>";
                }
                for (i = 0; i < parentSelectSelected.length; i++) {
                    camlQuery += "<Eq><FieldRef Name='" + opt.relationshipListParentColumn +
                    (opt.matchOnId ? "' LookupId='True'/><Value Type='Integer'>" : "'/><Value Type='Text'>") +
                    escapeColumnValue(parentSelectSelected[i]) + "</Value></Eq>";
                    if (i > 0 && (i < (parentSelectSelected.length - 1)) && compound) {
                        camlQuery += "</Or>";
                    }
                }
                camlQuery += "</Or>";
            }

            if (opt.CAMLQuery.length > 0) {
                camlQuery += opt.CAMLQuery + "</And>";
            }

            // Make sure we don't get any items which don't have the child value
            camlQuery += "<IsNotNull><FieldRef Name='" + opt.relationshipListChildColumn + "' /></IsNotNull>";

            camlQuery += "</And></Where></Query>";

            $().SPServices({
                operation: "GetListItems",
                // Force sync so that we have the right values for the child column onchange trigger
                async: false,
                webURL: opt.relationshipWebURL,
                listName: opt.relationshipList,
                // Filter based on the currently selected parent column's value
                CAMLQuery: camlQuery,
                // Only get the parent and child columns
                CAMLViewFields: "<ViewFields><FieldRef Name='" + opt.relationshipListParentColumn + "' /><FieldRef Name='" + opt.relationshipListChildColumn + "' /></ViewFields>",
                // Override the default view rowlimit and get all appropriate rows
                CAMLRowLimit: 0,
                // Even though setting IncludeMandatoryColumns to FALSE doesn't work as the docs describe, it fixes a bug in GetListItems with mandatory multi-selects
                CAMLQueryOptions: opt.CAMLQueryOptions,
                completefunc: function (xData) {

                    // Handle errors
                    $(xData.responseXML).find("errorstring").each(function () {
                        var thisFunction = "SPServices.SPCascadeDropdowns";
                        var errorText = $(this).text();
                        if (opt.debug && errorText === "One or more field types are not installed properly. Go to the list settings page to delete these fields.") {
                            errBox(thisFunction,
                                "relationshipListParentColumn: " + opt.relationshipListParentColumn + " or " +
                                "relationshipListChildColumn: " + opt.relationshipListChildColumn,
                                "Not found in relationshipList " + opt.relationshipList);
                        } else if (opt.debug && errorText === "Guid should contain 32 digits with 4 dashes (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx).") {
                            errBox(thisFunction,
                                "relationshipList: " + opt.relationshipList,
                                "List not found");
                        }

                    });

                    // Add an explanatory prompt
                    switch (childSelect.Type) {
                        case dropdownType.simple:
                            // Remove all of the existing options
                            $(childSelect.Obj).find("option").remove();
                            // If the column is required or the promptText option is empty, don't add the prompt text
                            if (!childColumnRequired && (opt.promptText.length > 0)) {
                                childSelect.Obj.append("<option value='0'>" + opt.promptText.replace(/\{0\}/g, opt.childColumn) + "</option>");
                            } else if (!childColumnRequired) {
                                childSelect.Obj.append("<option value='0'>" + opt.noneText + "</option>");
                            }
                            break;
                        case dropdownType.complex:
                            // If the column is required, don't add the "(None)" option
                            choices = childColumnRequired ? "" : opt.noneText + "|0";
                            childSelect.Obj.val("");
                            break;
                        case dropdownType.multiSelect:
                            // Remove all of the existing options
                            $(childSelect.master.candidateControl).find("option").remove();
                            newMultiLookupPickerdata = "";
                            break;
                        default:
                            break;
                    }
                    // Get the count of items returned and save it so that we can select if it's a single option 
                    // The item count is stored thus: <rs:data ItemCount="1">
                    numChildOptions = parseFloat($(xData.responseXML).SPFilterNode("rs:data").attr("ItemCount"));

                    // Add an option for each child item
                    $(xData.responseXML).SPFilterNode("z:row").each(function () {

                        var thisOption = {};

                        // If relationshipListChildColumn is a Lookup column, then the ID should be for the Lookup value,
                        // else the ID of the relationshipList item
                        var thisValue = $(this).attr("ows_" + opt.relationshipListChildColumn);

                        if (typeof thisValue !== "undefined" && thisValue.indexOf(spDelim) > 0) {
                            thisOption = new SplitIndex(thisValue);
                        } else {
                            thisOption.id = $(this).attr("ows_ID");
                            thisOption.value = thisValue;
                        }

                        // If the relationshipListChildColumn is a calculated column, then the value isn't preceded by the ID,
                        // but by the datatype.  In this case, thisOption.id should be the ID of the relationshipList item.
                        // e.g., float;#12345.67
                        if (isNaN(thisOption.id)) {
                            thisOption.id = $(this).attr("ows_ID");
                        }

                        // Save the id and value for the first child option in case we need to select it (selectSingleOption option is true)
                        firstChildOptionId = thisOption.id;
                        firstChildOptionValue = thisOption.value;

                        switch (childSelect.Type) {
                            case dropdownType.simple:
                                var selected = ($(this).attr("ows_ID") === childSelectSelected[0]) ? " selected='selected'" : "";
                                childSelect.Obj.append("<option" + selected + " value='" + thisOption.id + "'>" + thisOption.value + "</option>");
                                break;
                            case dropdownType.complex:
                                if (thisOption.id === childSelectSelected[0]) {
                                    childSelect.Obj.val(thisOption.value);
                                }
                                choices = choices + ((choices.length > 0) ? "|" : "") + thisOption.value + "|" + thisOption.id;
                                break;
                            case dropdownType.multiSelect:
                                $(childSelect.master.candidateControl).append("<option value='" + thisOption.id + "'>" + thisOption.value + "</option>");
                                newMultiLookupPickerdata += thisOption.id + "|t" + thisOption.value + "|t |t |t";
                                break;
                            default:
                                break;
                        }
                    });

                    switch (childSelect.Type) {
                        case dropdownType.simple:
                            childSelect.Obj.trigger("change");
                            // If there is only one option and the selectSingleOption option is true, then select it
                            if (numChildOptions === 1 && opt.selectSingleOption === true) {
                                $(childSelect.Obj).find("option[value!='0']:first").attr("selected", "selected");
                            }
                            break;
                        case dropdownType.complex:
                            // Set the allowable choices
                            childSelect.Obj.attr("choices", choices);
                            // If there is only one option and the selectSingleOption option is true, then select it
                            if (numChildOptions === 1 && opt.selectSingleOption === true) {
                                // Set the input element value
                                $(childSelect.Obj).val(firstChildOptionValue);
                                // Set the value of the optHid input element
                                childSelect.optHid.val(firstChildOptionId);
                            }
                            // If there's no selection, then remove the value in the associated hidden input element (optHid)
                            if (childSelect.Obj.val() === "") {
                                childSelect.optHid.val("");
                            }
                            break;
                        case dropdownType.multiSelect:
                            // Clear the master
                            childSelect.master.data = "";
                            childSelect.MultiLookupPickerdata.val(newMultiLookupPickerdata);

                            // Clear any prior selections that are no longer valid or aren't selected
                            $(childSelect.master.resultControl).find("option").each(function () {
                                var thisSelected = $(this);
                                thisSelected.prop("selected", true);
                                $(childSelect.master.candidateControl).find("option[value='" + thisSelected.val() + "']").each(function () {
                                    thisSelected.prop("selected", false);
                                });
                            });
                            GipRemoveSelectedItems(childSelect.master);

                            // Hide any options in the candidate list which are already selected
                            $(childSelect.master.candidateControl).find("option").each(function () {
                                var thisSelected = $(this);
                                $(childSelect.master.resultControl).find("option[value='" + thisSelected.val() + "']").each(function () {
                                    thisSelected.remove();
                                });
                            });
                            GipAddSelectedItems(childSelect.master);

                            // Set master.data to the newly allowable values
                            childSelect.master.data = GipGetGroupData(newMultiLookupPickerdata);

                            // Trigger a dblclick so that the child will be cascaded if it is a multiselect.
                            $(childSelect.master.candidateControl).trigger("dblclick");

                            break;
                        default:
                            break;
                    }
                }
            });
            // If present, call completefunc when all else is done
            if (opt.completefunc !== null) {
                opt.completefunc();
            }
        }); // $(childColumns).each(function()

    } // End cascadeDropdown


    // function to convert complex dropdowns to simple dropdowns
    $.fn.SPServices.SPComplexToSimpleDropdown = function (options) {

        var opt = $.extend({}, {
            listName: $().SPServices.SPListNameFromUrl(), // The list the form is working with. This is useful if the form is not in the list context.
            columnName: "", // The display name of the column in the form
            completefunc: null, // Function to call on completion of rendering the change.
            debug: false // If true, show error messages;if false, run silent
        }, options);

        // Find the column's select (dropdown)
        var columnSelect = $().SPServices.SPDropdownCtl({
            displayName: opt.columnName
        });
        if (columnSelect.Obj.html() === null && opt.debug) {
            errBox("SPServices.SPComplexToSimpleDropdown", "columnName: " + opt.columnName, TXTColumnNotFound);
            return;
        }

        // If we don't have a complex dropdown, then there is nothing to do
        if (columnSelect.Type !== dropdownType.complex) {
            return;
        }

        // The available options are stored in the choices attribute of the complex dropdown's input element...
        var choices = $(columnSelect.Obj).attr("choices").split("|");

        // We need to know which option is selected already, if any
        var complexSelectSelectedId = columnSelect.optHid.val();

        // Build up the simple dropdown, giving it an easy to select id
        var simpleSelectId = genContainerId("SPComplexToSimpleDropdown", columnSelect.Obj.attr("title"), opt.listName);

        var simpleSelect = "<select id='" + simpleSelectId + "' title='" + opt.columnName + "'>";
        for (i = 0; i < choices.length; i = i + 2) {
            var simpleSelectSelected = (choices[i + 1] === complexSelectSelectedId) ? " selected='selected' " : " ";
            simpleSelect += "<option" + simpleSelectSelected + "value='" + choices[i + 1] + "'>" + choices[i] + "</option>";
        }
        simpleSelect += "</select>";

        // Append the new simple select to the form
        columnSelect.Obj.closest("td").prepend(simpleSelect);
        var simpleSelectObj = $("#" + simpleSelectId);

        // Remove the complex dropdown functionality since we don't need it anymore...
        columnSelect.Obj.closest("span").find("img").remove();
        // ...and hide the input element
        columnSelect.Obj.closest("span").find("input").hide();

        // When the simple select changes...
        simpleSelectObj.change(function () {
            var thisVal = $(this).val();
            // ...set the optHid input element's value to the valus of the selected option...
            columnSelect.optHid.val(thisVal);
            // ...and save the selected value as the hidden input's value only if the value is not equal to "0" (None)
            $(columnSelect.Obj).val($(this).find("option[value='" + (thisVal !== "0" ? thisVal : "") + "']").html());
        });
        // Trigger a change to ensure that the selected value registers in the complex dropdown
        simpleSelectObj.trigger("change");

        // If present, call completefunc when all else is done
        if (opt.completefunc !== null) {
            opt.completefunc();
        }

    }; // End $.fn.SPServices.SPConvertToSimpleDropdown


    // Function to display related information when an option is selected on a form.
    $.fn.SPServices.SPDisplayRelatedInfo = function (options) {

        var opt = $.extend({}, {
            listName: $().SPServices.SPListNameFromUrl(), // The list the form is working with. This is useful if the form is not in the list context.
            columnName: "", // The display name of the column in the form
            relatedWebURL: "", // [Optional] The name of the Web (site) which contains the related list
            relatedList: "", // The name of the list which contains the additional information
            relatedListColumn: "", // The internal name of the related column in the related list
            relatedColumns: [], // An array of related columns to display
            displayFormat: "table", // The format to use in displaying the related information.  Possible values are: [table, list]
            headerCSSClass: "ms-vh2", // CSS class for the table headers
            rowCSSClass: "ms-vb", // CSS class for the table rows
            CAMLQuery: "", // [Optional] For power users, this CAML fragment will be <And>ed with the default query on the relatedList
            numChars: 0, // If used on an input column (not a dropdown), no matching will occur until at least this number of characters has been entered
            matchType: "Eq", // If used on an input column (not a dropdown), type of match. Can be any valid CAML comparison operator, most often "Eq" or "BeginsWith"
            matchOnId: false, // By default, we match on the lookup's text value. If matchOnId is true, we'll match on the lookup id instead.
            completefunc: null, // Function to call on completion of rendering the change.
            debug: false // If true, show error messages;if false, run silent
        }, options);

        var divId;
        var relatedColumnsXML = [];
        var relatedListXML;
        var thisFunction = "SPServices.SPDisplayRelatedInfo";

        // Find the column's select (dropdown)
        var columnSelect = $().SPServices.SPDropdownCtl({
            displayName: opt.columnName
        });
        if (columnSelect.Obj.html() === null && opt.debug) {
            errBox(thisFunction, "columnName: " + opt.columnName, TXTColumnNotFound);
            return;
        }

        // Generate a unique id for the container
        divId = genContainerId("SPDisplayRelatedInfo", opt.columnName, opt.listName);

        // Get information about the related list and its columns
        $().SPServices({
            operation: "GetList",
            async: false,
            cacheXML: true,
            webURL: opt.relatedWebURL,
            listName: opt.relatedList,
            completefunc: function (xData) {
                // If debug is on, notify about an error
                $(xData.responseXML).find("faultcode").each(function () {
                    if (opt.debug) {
                        errBox(thisFunction, "relatedList: " + opt.relatedList, "List not found");

                    }
                });
                // Get info about the related list
                relatedListXML = $(xData.responseXML).find("List");
                // Save the information about each column requested
                for (i = 0; i < opt.relatedColumns.length; i++) {
                    relatedColumnsXML[opt.relatedColumns[i]] = $(xData.responseXML).find("Fields > Field[Name='" + opt.relatedColumns[i] + "']");
                }
                relatedColumnsXML[opt.relatedListColumn] = $(xData.responseXML).find("Fields > Field[Name='" + opt.relatedListColumn + "']");
            }
        });

        switch (columnSelect.Type) {
            // Plain old select
            case dropdownType.simple:
                columnSelect.Obj.bind("change", function () {
                    showRelated(opt, divId, relatedListXML, relatedColumnsXML);
                });
                break;
            // Input / Select hybrid
            case dropdownType.complex:
                // Bind to any change on the hidden input element
                columnSelect.optHid.bind("propertychange", function () {
                    showRelated(opt, divId, relatedListXML, relatedColumnsXML);
                });
                break;
            // Multi-select hybrid
            case dropdownType.multiSelect:
                if (opt.debug) {
                    errBox(thisFunction, "columnName: " + opt.columnName, "Multi-select columns not supported by this function");
                }
                break;
            default:
                break;
        }
        // Fire the change to set the initially allowable values
        showRelated(opt, divId, relatedListXML, relatedColumnsXML);

    }; // End $.fn.SPServices.SPDisplayRelatedInfo

    function showRelated(opt, divId, relatedListXML, relatedColumnsXML) {

        var columnSelectSelected;
        var thisFunction = "SPServices.SPDisplayRelatedInfo";

        // Find the column's select (dropdown)
        var columnSelect = $().SPServices.SPDropdownCtl({
            displayName: opt.columnName
        });

        // Get the current column selection(s)
        columnSelectSelected = getDropdownSelected(columnSelect, opt.matchOnId);
        if (columnSelect.Type === dropdownType.complex && opt.numChars > 0 && columnSelectSelected[0].length < opt.numChars) {
            return;
        }

        // If the selection hasn't changed, then there's nothing to do right now.  This is useful to reduce
        // the number of Web Service calls when the parentSelect.Type = dropdownType.complex, as there are multiple propertychanges
        // which don't require any action.
        if (columnSelect.Obj.attr("showRelatedSelected") === columnSelectSelected[0]) {
            return;
        }
        columnSelect.Obj.attr("showRelatedSelected", columnSelectSelected[0]);

        // Remove the old container...
        $("#" + divId).remove();
        // ...and append a new, empty one
        columnSelect.Obj.parent().append("<div id=" + divId + "></div>");

        // Get the list items which match the current selection
        var camlQuery = "<Query><Where>";
        if (opt.CAMLQuery.length > 0) {
            camlQuery += "<And>";
        }

        // Need to handle Lookup columns differently than static columns
        var relatedListColumnType = relatedColumnsXML[opt.relatedListColumn].attr("Type");
        if (relatedListColumnType === "Lookup") {
            camlQuery += "<Eq><FieldRef Name='" + opt.relatedListColumn +
            (opt.matchOnId ? "' LookupId='True'/><Value Type='Integer'>" : "'/><Value Type='Text'>") +
            escapeColumnValue(columnSelectSelected[0]) + "</Value></Eq>";
        } else {
            camlQuery += "<Eq><FieldRef Name='" +
            (opt.matchOnId ? "ID' /><Value Type='Counter'>" : opt.relatedListColumn + "'/><Value Type='Text'>") +
            escapeColumnValue(columnSelectSelected[0]) + "</Value></Eq>";
        }

        if (opt.CAMLQuery.length > 0) {
            camlQuery += opt.CAMLQuery + "</And>";
        }
        camlQuery += "</Where></Query>";

        var viewFields = " ";
        for (i = 0; i < opt.relatedColumns.length; i++) {
            viewFields += "<FieldRef Name='" + opt.relatedColumns[i] + "' />";
        }

        $().SPServices({
            operation: "GetListItems",
            async: false,
            webURL: opt.relatedWebURL,
            listName: opt.relatedList,
            // Filter based on the column's currently selected value
            CAMLQuery: camlQuery,
            CAMLViewFields: "<ViewFields>" + viewFields + "</ViewFields>",
            // Override the default view rowlimit and get all appropriate rows
            CAMLRowLimit: 0,
            completefunc: function (xData) {

                // Handle errors
                $(xData.responseXML).find("errorstring").each(function () {
                    var errorText = $(this).text();
                    if (opt.debug && errorText === "One or more field types are not installed properly. Go to the list settings page to delete these fields.") {
                        errBox(thisFunction,
                            "relatedListColumn: " + opt.relatedListColumn,
                            "Column not found in relatedList " + opt.relatedList);
                    } else if (opt.debug && errorText === "Guid should contain 32 digits with 4 dashes (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx).") {
                        errBox(thisFunction,
                            "relatedList: " + opt.relatedList,
                            "List not found");
                    }

                });

                var outString;
                // Output each row
                switch (opt.displayFormat) {
                    // Only implementing the table format in the first iteration (v0.2.9)
                    case "table":
                        outString = "<table>";
                        outString += "<tr>";
                        for (i = 0; i < opt.relatedColumns.length; i++) {
                            if (typeof relatedColumnsXML[opt.relatedColumns[i]] === "undefined" && opt.debug) {
                                errBox(thisFunction, "columnName: " + opt.relatedColumns[i], "Column not found in relatedList");
                                return;
                            }
                            outString += "<th class='" + opt.headerCSSClass + "'>" + relatedColumnsXML[opt.relatedColumns[i]].attr("DisplayName") + "</th>";
                        }
                        outString += "</tr>";
                        // Add an option for each child item
                        $(xData.responseXML).SPFilterNode("z:row").each(function () {
                            outString += "<tr>";
                            for (i = 0; i < opt.relatedColumns.length; i++) {
                                outString += "<td class='" + opt.rowCSSClass + "'>" + showColumn(relatedListXML, relatedColumnsXML[opt.relatedColumns[i]], $(this).attr("ows_" + opt.relatedColumns[i]), opt) + "</td>";
                            }
                            outString += "</tr>";
                        });
                        outString += "</table>";
                        break;
                    // list format implemented in v0.5.0. Still table-based, but vertical orientation.
                    case "list":
                        outString = "<table>";
                        $(xData.responseXML).SPFilterNode("z:row").each(function () {
                            for (i = 0; i < opt.relatedColumns.length; i++) {
                                if (typeof relatedColumnsXML[opt.relatedColumns[i]] === "undefined" && opt.debug) {
                                    errBox(thisFunction, "columnName: " + opt.relatedColumns[i], "Column not found in relatedList");
                                    return;
                                }
                                outString += "<tr>";
                                outString += "<th class='" + opt.headerCSSClass + "'>" + relatedColumnsXML[opt.relatedColumns[i]].attr("DisplayName") + "</th>";
                                outString += "<td class='" + opt.rowCSSClass + "'>" + showColumn(relatedListXML, relatedColumnsXML[opt.relatedColumns[i]], $(this).attr("ows_" + opt.relatedColumns[i]), opt) + "</td>";
                                outString += "</tr>";
                            }
                        });
                        outString += "</table>";
                        break;
                    default:
                        break;
                }
                // Write out the results
                $("#" + divId).html(outString);
            }
        });
        // If present, call completefunc when all else is done
        if (opt.completefunc !== null) {
            opt.completefunc();
        }
    } // End showRelated

    // Function to filter a lookup based dropdown 
    $.fn.SPServices.SPFilterDropdown = function (options) {
        var opt = $.extend({}, {
            relationshipWebURL: "", // [Optional] The name of the Web (site) which contains the relationshipList
            relationshipList: "", // The name of the list which contains the lookup values
            relationshipListColumn: "", // The internal name of the column in the relationship list
            relationshipListSortColumn: "", // [Optional] If specified, sort the options in the dropdown by this column,
            // otherwise the options are sorted by relationshipListColumn
            relationshipListSortAscending: true, // [Optional] By default, the sort is ascending. If false, descending
            columnName: "", // The display name of the column in the form
            listName: $().SPServices.SPListNameFromUrl(), // The list the form is working with. This is useful if the form is not in the list context.
            promptText: "", // [DEPRECATED] Text to use as prompt. If included, {0} will be replaced with the value of columnName. IOrignal value "Choose {0}..."
            noneText: "(None)", // [Optional] Text to use for the (None) selection. Provided for non-English language support.
            CAMLQuery: "", // This CAML fragment will be applied to the relationshipList
            CAMLQueryOptions: "<QueryOptions><IncludeMandatoryColumns>FALSE</IncludeMandatoryColumns><ViewAttributes Scope='RecursiveAll'/></QueryOptions>", // Need this to mirror SharePoint's behavior, but it can be overridden
            completefunc: null, // Function to call on completion of rendering the change.
            debug: false // If true, show error messages; if false, run silent
        }, options);

        var choices = "";
        var columnSelectSelected = null;
        var newMultiLookupPickerdata;
        var columnColumnRequired;
        var thisFunction = "SPServices.SPFilterDropdown";

        // Find the column's select (dropdown)
        var columnSelect = $().SPServices.SPDropdownCtl({
            displayName: opt.columnName
        });
        if (columnSelect.Obj.html() === null && opt.debug) {
            errBox(thisFunction, "columnName: " + opt.columnName, TXTColumnNotFound);
            return;
        }

        // Get the current column selection(s)
        columnSelectSelected = getDropdownSelected(columnSelect, true);

        // Get the relationshipList items which match the current selection
        var sortColumn = (opt.relationshipListSortColumn.length > 0) ? opt.relationshipListSortColumn : opt.relationshipListColumn;
        var sortOrder = (opt.relationshipListSortAscending === true) ? "" : "Ascending='FALSE'";
        var camlQuery = "<Query><OrderBy><FieldRef Name='" + sortColumn + "' " + sortOrder + "/></OrderBy><Where>";
        if (opt.CAMLQuery.length > 0) {
            camlQuery += opt.CAMLQuery;
        }
        camlQuery += "</Where></Query>";

        // Get information about columnName from the current list
        $().SPServices({
            operation: "GetList",
            async: false,
            cacheXML: true,
            listName: opt.listName,
            completefunc: function (xData) {
                $(xData.responseXML).find("Fields").each(function () {
                    $(this).find("Field[DisplayName='" + opt.columnName + "']").each(function () {
                        // Determine whether columnName is Required
                        columnColumnRequired = ($(this).attr("Required") === "TRUE");
                        // Stop looking; we're done
                        return false;
                    });
                });
            }
        });

        $().SPServices({
            operation: "GetListItems",
            // Force sync so that we have the right values for the column onchange trigger
            async: false,
            webURL: opt.relationshipWebURL,
            listName: opt.relationshipList,
            // Filter based on the specified CAML
            CAMLQuery: camlQuery,
            // Only get the columnName's data (plus columns we can't prevent)
            CAMLViewFields: "<ViewFields><FieldRef Name='" + opt.relationshipListColumn + "' /></ViewFields>",
            // Override the default view rowlimit and get all appropriate rows
            CAMLRowLimit: 0,
            // Even though setting IncludeMandatoryColumns to FALSE doesn't work as the docs describe, it fixes a bug in GetListItems with mandatory multi-selects
            CAMLQueryOptions: opt.CAMLQueryOptions,
            completefunc: function (xData) {

                // Handle errors
                $(xData.responseXML).find("errorstring").each(function () {
                    var errorText = $(this).text();
                    if (opt.debug && errorText === "One or more field types are not installed properly. Go to the list settings page to delete these fields.") {
                        errBox(thisFunction,
                            "relationshipListColumn: " + opt.relationshipListColumn,
                            "Not found in relationshipList " + opt.relationshipList);
                    } else if (opt.debug && errorText === "Guid should contain 32 digits with 4 dashes (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx).") {
                        errBox(thisFunction,
                            "relationshipList: " + opt.relationshipList,
                            "List not found");
                    }

                });

                // Add an explanatory prompt
                switch (columnSelect.Type) {
                    case dropdownType.simple:
                        // Remove all of the existing options
                        $(columnSelect.Obj).find("option").remove();
                        // If the column is required or the promptText option is empty, don't add the prompt text
                        if (!columnColumnRequired && (opt.promptText.length > 0)) {
                            columnSelect.Obj.append("<option value='0'>" + opt.promptText.replace(/\{0\}/g, opt.columnName) + "</option>");
                        } else if (!columnColumnRequired) {
                            columnSelect.Obj.append("<option value='0'>" + opt.noneText + "</option>");
                        }
                        break;
                    case dropdownType.complex:
                        // If the column is required, don't add the "(None)" option
                        choices = columnColumnRequired ? "" : opt.noneText + "|0";
                        columnSelect.Obj.val("");
                        break;
                    case dropdownType.multiSelect:
                        // Remove all of the existing options
                        $(columnSelect.master.candidateControl).find("option").remove();
                        newMultiLookupPickerdata = "";
                        break;
                    default:
                        break;
                }

                // Add an option for each item
                $(xData.responseXML).SPFilterNode("z:row").each(function () {

                    var thisOption = {};

                    // If relationshipListColumn is a Lookup column, then the ID should be for the Lookup value,
                    // else the ID of the relationshipList item
                    var thisValue = $(this).attr("ows_" + opt.relationshipListColumn);

                    if (typeof thisValue !== "undefined" && thisValue.indexOf(spDelim) > 0) {
                        thisOption = new SplitIndex(thisValue);
                    } else {
                        thisOption.id = $(this).attr("ows_ID");
                        thisOption.value = thisValue;
                    }

                    // If the relationshipListColumn is a calculated column, then the value isn't preceded by the ID,
                    // but by the datatype.  In this case, thisOption.id should be the ID of the relationshipList item.
                    // e.g., float;#12345.67
                    if (isNaN(thisOption.id)) {
                        thisOption.id = $(this).attr("ows_ID");
                    }

                    switch (columnSelect.Type) {
                        case dropdownType.simple:
                            var selected = ($(this).attr("ows_ID") === columnSelectSelected[0]) ? " selected='selected'" : "";
                            columnSelect.Obj.append("<option" + selected + " value='" + thisOption.id + "'>" + thisOption.value + "</option>");
                            break;
                        case dropdownType.complex:
                            if (thisOption.id === columnSelectSelected[0]) {
                                columnSelect.Obj.val(thisOption.value);
                            }
                            choices = choices + ((choices.length > 0) ? "|" : "") + thisOption.value + "|" + thisOption.id;
                            break;
                        case dropdownType.multiSelect:
                            $(columnSelect.master.candidateControl).append("<option value='" + thisOption.id + "'>" + thisOption.value + "</option>");
                            newMultiLookupPickerdata += thisOption.id + "|t" + thisOption.value + "|t |t |t";
                            break;
                        default:
                            break;
                    }
                });

                switch (columnSelect.Type) {
                    case dropdownType.simple:
                        columnSelect.Obj.trigger("change");
                        break;
                    case dropdownType.complex:
                        columnSelect.Obj.attr("choices", choices);
                        columnSelect.Obj.trigger("propertychange");
                        break;
                    case dropdownType.multiSelect:
                        // Clear the master
                        columnSelect.master.data = "";

                        columnSelect.MultiLookupPickerdata.val(newMultiLookupPickerdata);
                        // Clear any prior selections that are no longer valid
                        $(columnSelect.master.resultControl).find("option").each(function () {
                            var thisSelected = $(this);
                            $(this).attr("selected", "selected");
                            $(columnSelect.master.candidateControl).find("option").each(function () {
                                if ($(this).html() === thisSelected.html()) {
                                    thisSelected.removeAttr("selected");
                                }
                            });
                        });
                        GipRemoveSelectedItems(columnSelect.master);
                        // Hide any options in the candidate list which are already selected
                        $(columnSelect.master.candidateControl).find("option").each(function () {
                            var thisSelected = $(this);
                            $(columnSelect.master.resultControl).find("option").each(function () {
                                if ($(this).html() === thisSelected.html()) {
                                    thisSelected.remove();
                                }
                            });
                        });
                        GipAddSelectedItems(columnSelect.master);
                        // Set master.data to the newly allowable values
                        columnSelect.master.data = GipGetGroupData(newMultiLookupPickerdata);

                        // Trigger a dblclick so that the child will be cascaded if it is a multiselect.
                        $(columnSelect.master.candidateControl).trigger("dblclick");

                        break;
                    default:
                        break;
                }
            }
        });
        // If present, call completefunc when all else is done
        if (opt.completefunc !== null) {
            opt.completefunc();
        }
    }; // End $.fn.SPServices.SPFilterDropdown


    // Utility function to show the results of a Web Service call formatted well in the browser.
    $.fn.SPServices.SPDebugXMLHttpResult = function (options) {

        var opt = $.extend({}, {
            node: null, // An XMLHttpResult object from an ajax call
            indent: 0 // Number of indents
        }, options);

        var i;
        var NODE_TEXT = 3;
        var NODE_CDATA_SECTION = 4;

        var outString = "";
        // For each new subnode, begin rendering a new TABLE
        outString += "<table class='ms-vb' style='margin-left:" + opt.indent * 3 + "px;' width='100%'>";
        // DisplayPatterns are a bit unique, so let's handle them differently
        if (opt.node.nodeName === "DisplayPattern") {
            outString += "<tr><td width='100px' style='font-weight:bold;'>" + opt.node.nodeName +
            "</td><td><textarea readonly='readonly' rows='5' cols='50'>" + opt.node.xml + "</textarea></td></tr>";
            // A node which has no children
        } else if (!opt.node.hasChildNodes()) {
            outString += "<tr><td width='100px' style='font-weight:bold;'>" + opt.node.nodeName +
            "</td><td>" + ((opt.node.nodeValue !== null) ? checkLink(opt.node.nodeValue) : "&nbsp;") + "</td></tr>";
            if (opt.node.attributes) {
                outString += "<tr><td colspan='99'>" + showAttrs(opt.node) + "</td></tr>";
            }
            // A CDATA_SECTION node
        } else if (opt.node.hasChildNodes() && opt.node.firstChild.nodeType === NODE_CDATA_SECTION) {
            outString += "<tr><td width='100px' style='font-weight:bold;'>" + opt.node.nodeName +
            "</td><td><textarea readonly='readonly' rows='5' cols='50'>" + opt.node.parentNode.text + "</textarea></td></tr>";
            // A TEXT node
        } else if (opt.node.hasChildNodes() && opt.node.firstChild.nodeType === NODE_TEXT) {
            outString += "<tr><td width='100px' style='font-weight:bold;'>" + opt.node.nodeName +
            "</td><td>" + checkLink(opt.node.firstChild.nodeValue) + "</td></tr>";
            // Handle child nodes
        } else {
            outString += "<tr><td width='100px' style='font-weight:bold;' colspan='99'>" + opt.node.nodeName + "</td></tr>";
            if (opt.node.attributes) {
                outString += "<tr><td colspan='99'>" + showAttrs(opt.node) + "</td></tr>";
            }
            // Since the node has child nodes, recurse
            outString += "<tr><td>";
            for (i = 0; i < opt.node.childNodes.length; i++) {
                outString += $().SPServices.SPDebugXMLHttpResult({
                    node: opt.node.childNodes.item(i),
                    indent: opt.indent + 1
                });
            }
            outString += "</td></tr>";
        }
        outString += "</table>";
        // Return the HTML which we have built up
        return outString;
    }; // End $.fn.SPServices.SPDebugXMLHttpResult

    // Function which returns the account name for the current user in DOMAIN\username format
    $.fn.SPServices.SPGetCurrentUser = function (options) {

        var opt = $.extend({}, {
            webURL: "", // URL of the target Site Collection.  If not specified, the current Web is used.
            fieldName: "Name", // Specifies which field to return from the userdisp.aspx page
            fieldNames: {}, // Specifies which fields to return from the userdisp.aspx page - added in v0.7.2 to allow multiple columns
            debug: false // If true, show error messages; if false, run silent
        }, options);

        // The current user's ID is reliably available in an existing JavaScript variable
        if (opt.fieldName === "ID" && typeof currentContext.thisUserId !== "undefined") {
            return currentContext.thisUserId;
        }

        var thisField = "";
        var theseFields = {};
        var fieldCount = opt.fieldNames.length > 0 ? opt.fieldNames.length : 1;
        var thisUserDisp;
        var thisWeb = opt.webURL.length > 0 ? opt.webURL : $().SPServices.SPGetCurrentSite();

        // Get the UserDisp.aspx page using AJAX
        $.ajax({
            // Need this to be synchronous so we're assured of a valid value
            async: false,
            // Force parameter forces redirection to a page that displays the information as stored in the UserInfo table rather than My Site.
            // Adding the extra Query String parameter with the current date/time forces the server to view this as a new request.
            url: ((thisWeb === "/") ? "" : thisWeb) + "/_layouts/userdisp.aspx?Force=True&" + new Date().getTime(),
            complete: function (xData) {
                thisUserDisp = xData;
            }
        });

        for (i = 0; i < fieldCount; i++) {

            // The current user's ID is reliably available in an existing JavaScript variable
            if (opt.fieldNames[i] === "ID") {
                thisField = currentContext.thisUserId;
            } else {
                var thisTextValue;
                if (fieldCount > 1) {
                    thisTextValue = RegExp("FieldInternalName=\"" + opt.fieldNames[i] + "\"", "gi");
                } else {
                    thisTextValue = RegExp("FieldInternalName=\"" + opt.fieldName + "\"", "gi");
                }
                $(thisUserDisp.responseText).find("table.ms-formtable td[id^='SPField']").each(function () {
                    if (thisTextValue.test($(this).html())) {
                        // Each fieldtype contains a different data type, as indicated by the id
                        switch ($(this).attr("id")) {
                            case "SPFieldText":
                                thisField = $(this).text();
                                break;
                            case "SPFieldNote":
                                thisField = $(this).find("div").html();
                                break;
                            case "SPFieldURL":
                                thisField = $(this).find("img").attr("src");
                                break;
                            // Just in case
                            default:
                                thisField = $(this).text();
                                break;
                        }
                        // Stop looking; we're done
                        return false;
                    }
                });
            }
            if (opt.fieldNames[i] !== "ID") {
                thisField = (typeof thisField !== "undefined") ? thisField.replace(/(^[\s\xA0]+|[\s\xA0]+$)/g, '') : null;
            }
            if (fieldCount > 1) {
                theseFields[opt.fieldNames[i]] = thisField;
            }
        }

        return (fieldCount > 1) ? theseFields : thisField;

    }; // End $.fn.SPServices.SPGetCurrentUser

    // Function which provides a link on a Lookup column for the user to follow
    // which allows them to add a new value to the Lookup list.
    // Based on http://blog.mastykarz.nl/extending-lookup-fields-add-new-item-option/
    // by Waldek Mastykarz
    $.fn.SPServices.SPLookupAddNew = function (options) {

        var opt = $.extend({}, {
            lookupColumn: "", // The display name of the Lookup column
            promptText: "Add new {0}", // Text to use as prompt + column name
            newWindow: false, // If true, the link will open in a new window *without* passing the Source.
            ContentTypeID: "", // [Optional] Pass the ContentTypeID if you'd like to specify it
            completefunc: null, // Function to call on completion of rendering the change.
            debug: false // If true, show error messages;if false, run silent
        }, options);

        var thisFunction = "SPServices.SPLookupAddNew";

        // Find the lookup column's select (dropdown)
        var lookupSelect = $().SPServices.SPDropdownCtl({
            displayName: opt.lookupColumn
        });
        if (lookupSelect.Obj.html() === null && opt.debug) {
            errBox(thisFunction, "lookupColumn: " + opt.lookupColumn, TXTColumnNotFound);
            return;
        }

        var newUrl = "";
        var lookupListUrl = "";
        var lookupColumnStaticName = "";
        // Use GetList for the current list to determine the details for the Lookup column
        $().SPServices({
            operation: "GetList",
            async: false,
            cacheXML: true,
            listName: $().SPServices.SPListNameFromUrl(),
            completefunc: function (xData) {
                $(xData.responseXML).find("Field[DisplayName='" + opt.lookupColumn + "']").each(function () {
                    lookupColumnStaticName = $(this).attr("StaticName");
                    // Use GetList for the Lookup column's list to determine the list's URL
                    $().SPServices({
                        operation: "GetList",
                        async: false,
                        cacheXML: true,
                        listName: $(this).attr("List"),
                        completefunc: function (xData) {
                            $(xData.responseXML).find("List").each(function () {
                                lookupListUrl = $(this).attr("WebFullUrl");
                                // Need to handle when list is in the root site
                                lookupListUrl = lookupListUrl !== SLASH ? lookupListUrl + SLASH : lookupListUrl;
                            });
                        }
                    });
                    // Get the NewItem form for the Lookup column's list
                    newUrl = getListFormUrl($(this).attr("List"), "NewForm");
                    // Stop looking;we're done
                    return false;
                });
            }
        });

        if (lookupListUrl.length === 0 && opt.debug) {
            errBox(thisFunction, "lookupColumn: " + opt.lookupColumn, "This column does not appear to be a lookup column");
            return;
        }
        if (newUrl.length > 0) {
            // Build the link to the Lookup column's list enclosed in a div with the id="SPLookupAddNew_" + lookupColumnStaticName
            var newHref = lookupListUrl + newUrl;
            // If requested, open the link in a new window and if requested, pass the ContentTypeID
            newHref += opt.newWindow ?
            ((opt.ContentTypeID.length > 0) ? "?ContentTypeID=" + opt.ContentTypeID : "") + "' target='_blank'" :
            "?" + ((opt.ContentTypeID.length > 0) ? "ContentTypeID=" + opt.ContentTypeID + "&" : "") + "Source=" + escapeUrl(location.href) + "'";
            var newLink = "<div id='SPLookupAddNew_" + lookupColumnStaticName + "'>" + "<a href='" + newHref + ">" + opt.promptText.replace(/\{0\}/g, opt.lookupColumn) + "</a></div>";
            // Append the link to the Lookup columns's formbody table cell
            $(lookupSelect.Obj).parents("td.ms-formbody").append(newLink);
        } else if (opt.debug) {
            errBox(thisFunction, "lookupColumn: " + opt.lookupColumn, "NewForm cannot be found");
            return;
        }
        // If present, call completefunc when all else is done
        if (opt.completefunc !== null) {
            opt.completefunc();
        }
    }; // End $.fn.SPServices.SPLookupAddNew

    // Function to return the ID of the last item created on a list by a specific user. Useful for maintaining parent/child relationships
    // between list forms
    $.fn.SPServices.SPGetLastItemId = function (options) {

        var opt = $.extend({}, {
            webURL: "", // URL of the target Web.  If not specified, the current Web is used.
            listName: "", // The name or GUID of the list
            userAccount: "", // The account for the user in DOMAIN\username format. If not specified, the current user is used.
            CAMLQuery: "" // [Optional] For power users, this CAML fragment will be Anded with the default query on the relatedList
        }, options);

        var userId;
        var lastId = 0;
        $().SPServices({
            operation: "GetUserInfo",
            webURL: opt.webURL,
            async: false,
            userLoginName: (opt.userAccount !== "") ? opt.userAccount : $().SPServices.SPGetCurrentUser(),
            completefunc: function (xData) {
                $(xData.responseXML).find("User").each(function () {
                    userId = $(this).attr("ID");
                });
            }
        });

        // Get the list items for the user, sorted by Created, descending. If the CAMLQuery option has been specified, And it with
        // the existing Where clause
        var camlQuery = "<Query><Where>";
        if (opt.CAMLQuery.length > 0) {
            camlQuery += "<And>";
        }
        camlQuery += "<Eq><FieldRef Name='Author' LookupId='TRUE'/><Value Type='Integer'>" + userId + "</Value></Eq>";
        if (opt.CAMLQuery.length > 0) {
            camlQuery += opt.CAMLQuery + "</And>";
        }
        camlQuery += "</Where><OrderBy><FieldRef Name='Created_x0020_Date' Ascending='FALSE'/></OrderBy></Query>";

        $().SPServices({
            operation: "GetListItems",
            async: false,
            webURL: opt.webURL,
            listName: opt.listName,
            CAMLQuery: camlQuery,
            CAMLViewFields: "<ViewFields><FieldRef Name='ID'/></ViewFields>",
            CAMLRowLimit: 1,
            CAMLQueryOptions: "<QueryOptions><ViewAttributes Scope='Recursive' /></QueryOptions>",
            completefunc: function (xData) {
                $(xData.responseXML).SPFilterNode("z:row").each(function () {
                    lastId = $(this).attr("ows_ID");
                });
            }
        });
        return lastId;
    }; // End $.fn.SPServices.SPGetLastItemId

    // Function which checks to see if the value for a column on the form is unique in the list.
    $.fn.SPServices.SPRequireUnique = function (options) {

        var opt = $.extend({}, {
            columnStaticName: "Title", // Name of the column
            duplicateAction: 0, // 0 = warn, 1 = prevent
            ignoreCase: false, // If set to true, the function ignores case, if false it looks for an exact match
            initMsg: "This value must be unique.", // Initial message to display after setup
            initMsgCSSClass: "ms-vb", // CSS class for initial message
            errMsg: "This value is not unique.", // Error message to display if not unique
            errMsgCSSClass: "ms-formvalidation", // CSS class for error message
            showDupes: false, // If true, show links to the duplicate item(s) after the error message
            completefunc: null // Function to call on completion of rendering the change.
        }, options);

        // Get the current item's ID from the Query String
        var queryStringVals = $().SPServices.SPGetQueryString();
        var thisID = queryStringVals.ID;
        currentContext.thisList = $().SPServices.SPListNameFromUrl();

        // Set the messages based on the options provided
        var msg = "<span id='SPRequireUnique" + opt.columnStaticName + "' class='{0}'>{1}</span><br/>";
        var firstMsg = msg.replace(/\{0\}/g, opt.initMsgCSSClass).replace(/\{1\}/g, opt.initMsg);

        // We need the DisplayName
        var columnDisplayName = $().SPServices.SPGetDisplayFromStatic({
            listName: currentContext.thisList,
            columnStaticName: opt.columnStaticName
        });
        var columnObj = findFormField(columnDisplayName).find("input[Title^='" + columnDisplayName + "']");
        columnObj.parent().append(firstMsg);

        columnObj.blur(function () {
            var columnValueIDs = [];
            // Get the columnDisplayName's value
            var columnValue = $(this).val();
            if (columnValue.length === 0) {
                return false;
            }

            // Call the Lists Web Service (GetListItems) to see if the value already exists
            $().SPServices({
                operation: "GetListItems",
                async: false,
                listName: currentContext.thisList,
                // Make sure we get all the items, ignoring any filters on the default view.
                CAMLQuery: "<Query><Where><IsNotNull><FieldRef Name='" + opt.columnStaticName + "'/></IsNotNull></Where></Query>",
                // Filter based on columnStaticName's value
                CAMLViewFields: "<ViewFields><FieldRef Name='ID' /><FieldRef Name='" + opt.columnStaticName + "' /></ViewFields>",
                // Override the default view rowlimit and get all appropriate rows
                CAMLRowLimit: 0,
                completefunc: function (xData) {
                    var testValue = opt.ignoreCase ? columnValue.toUpperCase() : columnValue;
                    $(xData.responseXML).SPFilterNode("z:row").each(function () {
                        var thisValue = opt.ignoreCase ? $(this).attr("ows_" + opt.columnStaticName).toUpperCase() : $(this).attr("ows_" + opt.columnStaticName);
                        // If this value already exists in columnStaticName and it's not the current item, then save the ID in the array
                        if ((testValue === thisValue) && ($(this).attr("ows_ID") !== thisID)) {
                            columnValueIDs.push([$(this).attr("ows_ID"), $(this).attr("ows_" + opt.columnStaticName)]);
                        }
                    });
                }
            });
            var newMsg = opt.initMsg;
            var msgContainer = $("#SPRequireUnique" + opt.columnStaticName);
            msgContainer.html(newMsg).attr("class", opt.initMsgCSSClass);

            $("input[value='OK']:disabled, input[value='Save']:disabled").removeAttr("disabled");
            if (columnValueIDs.length > 0) {
                newMsg = opt.errMsg;
                msgContainer.html(newMsg).attr("class", opt.errMsgCSSClass);
                if (opt.duplicateAction === 1) {
                    columnObj.focus();
                    $("input[value='OK'], input[value='Save']").attr("disabled", "disabled");
                }
                if (opt.showDupes) {
                    var out = " " + columnValueIDs.length + " duplicate item" + (columnValueIDs.length > 1 ? "s" : "") + ": ";
                    for (i = 0; i < columnValueIDs.length; i++) {
                        out += "<a href='DispForm.aspx?ID=" + columnValueIDs[i][0] + "&Source=" + location.href + "'>" + columnValueIDs[i][1] + "</a> ";
                    }
                    $("span#SPRequireUnique" + opt.columnStaticName).append(out);
                }
            }

        });
        // If present, call completefunc when all else is done
        if (opt.completefunc !== null) {
            opt.completefunc();
        }
    }; // End $.fn.SPServices.SPRequireUnique

    // This function returns the DisplayName for a column based on the StaticName.
    $.fn.SPServices.SPGetDisplayFromStatic = function (options) {

        var opt = $.extend({}, {
            webURL: "", // URL of the target Web.  If not specified, the current Web is used.
            listName: "", // The name or GUID of the list
            columnStaticName: "", // StaticName of the column
            columnStaticNames: {} // StaticName of the columns - added in v0.7.2 to allow multiple columns
        }, options);

        var displayName = "";
        var displayNames = {};
        var nameCount = opt.columnStaticNames.length > 0 ? opt.columnStaticNames.length : 1;

        $().SPServices({
            operation: "GetList",
            async: false,
            cacheXML: true,
            webURL: opt.webURL,
            listName: opt.listName,
            completefunc: function (xData) {
                if (nameCount > 1) {
                    for (i = 0; i < nameCount; i++) {
                        displayNames[opt.columnStaticNames[i]] = $(xData.responseXML).find("Field[StaticName='" + opt.columnStaticNames[i] + "']").attr("DisplayName");
                    }
                } else {
                    displayName = $(xData.responseXML).find("Field[StaticName='" + opt.columnStaticName + "']").attr("DisplayName");
                }
            }
        });

        return (nameCount > 1) ? displayNames : displayName;

    }; // End $.fn.SPServices.SPGetDisplayFromStatic

    // This function returns the StaticName for a column based on the DisplayName.
    $.fn.SPServices.SPGetStaticFromDisplay = function (options) {

        var opt = $.extend({}, {
            webURL: "", // URL of the target Web.  If not specified, the current Web is used.
            listName: "", // The name or GUID of the list
            columnDisplayName: "", // DisplayName of the column
            columnDisplayNames: {} // DisplayNames of the columns - added in v0.7.2 to allow multiple columns
        }, options);

        var staticName = "";
        var staticNames = {};
        var nameCount = opt.columnDisplayNames.length > 0 ? opt.columnDisplayNames.length : 1;

        $().SPServices({
            operation: "GetList",
            async: false,
            cacheXML: true,
            webURL: opt.webURL,
            listName: opt.listName,
            completefunc: function (xData) {
                if (nameCount > 1) {
                    for (i = 0; i < nameCount; i++) {
                        staticNames[opt.columnDisplayNames[i]] = $(xData.responseXML).find("Field[DisplayName='" + opt.columnDisplayNames[i] + "']").attr("StaticName");
                    }
                } else {
                    staticName = $(xData.responseXML).find("Field[DisplayName='" + opt.columnDisplayName + "']").attr("StaticName");
                }
            }
        });

        return (nameCount > 1) ? staticNames : staticName;

    }; // End $.fn.SPServices.SPGetStaticFromDisplay

    // This function allows you to redirect to a another page from a new item form with the new
    // item's ID. This allows chaining of forms from item creation onward.
    $.fn.SPServices.SPRedirectWithID = function (options) {

        var opt = $.extend({}, {
            redirectUrl: "", // Page for the redirect
            qsParamName: "ID" // In some cases, you may want to pass the newly created item's ID with a different
            // parameter name than ID. Specify that name here, if needed.
        }, options);

        currentContext.thisList = $().SPServices.SPListNameFromUrl();
        var queryStringVals = $().SPServices.SPGetQueryString();
        var lastID = queryStringVals.ID;
        var QSList = queryStringVals.List;
        var QSRootFolder = queryStringVals.RootFolder;
        var QSContentTypeId = queryStringVals.ContentTypeId;

        // On first load, change the form actions to redirect back to this page with the current lastID for this user and the
        // original Source.
        if (typeof queryStringVals.ID === "undefined") {
            lastID = $().SPServices.SPGetLastItemId({
                listName: currentContext.thisList
            });
            $("form[id='aspnetForm']").each(function () {
                // This page...
                var thisUrl = (location.href.indexOf("?") > 0) ? location.href.substring(0, location.href.indexOf("?")) : location.href;
                // ... plus the Source if it exists
                var thisSource = (typeof queryStringVals.Source === "string") ?
                "Source=" + queryStringVals.Source.replace(/\//g, "%2f").replace(/:/g, "%3a") : "";

                var newQS = [];
                if (typeof QSList !== "undefined") {
                    newQS.push("List=" + QSList);
                }
                if (typeof QSRootFolder !== "undefined") {
                    newQS.push("RootFolder=" + QSRootFolder);
                }
                if (typeof QSContentTypeId !== "undefined") {
                    newQS.push("ContentTypeId=" + QSContentTypeId);
                }

                var newAction = thisUrl +
                    ((newQS.length > 0) ? ("?" + newQS.join("&") + "&") : "?") +
                        // Set the Source to point back to this page with the lastID this user has added
                    "Source=" + thisUrl +
                    "?ID=" + lastID +
                        // Pass the original source as RealSource, if present
                    ((thisSource.length > 0) ? ("%26RealSource=" + queryStringVals.Source) : "") +
                        // Pass the override RedirectURL, if present
                    ((typeof queryStringVals.RedirectURL === "string") ? ("%26RedirectURL=" + queryStringVals.RedirectURL) : "");

                // Set the new form action
                setTimeout(function() {
                    document.forms.aspnetForm.action = newAction;
                }, 0);
            });
            // If this is the load after the item is saved, wait until the new item has been saved (commits are asynchronous),
            // then do the redirect to redirectUrl with the new lastID, passing along the original Source.
        } else {
            while (queryStringVals.ID === lastID) {
                lastID = $().SPServices.SPGetLastItemId({
                    listName: currentContext.thisList
                });
            }
            // If there is a RedirectURL parameter on the Query String, then redirect there instead of the value
            // specified in the options (opt.redirectUrl)
            var thisRedirectUrl = (typeof queryStringVals.RedirectURL === "string") ? queryStringVals.RedirectURL : opt.redirectUrl;
            location.href = thisRedirectUrl + "?" + opt.qsParamName + "=" + lastID +
            ((typeof queryStringVals.RealSource === "string") ? ("&Source=" + queryStringVals.RealSource) : "");
        }
    }; // End $.fn.SPServices.SPRedirectWithID

    // The SPSetMultiSelectSizes function sets the sizes of the multi-select boxes for a column on a form automagically
    // based on the values they contain. The function takes into account the fontSize, fontFamily, fontWeight, etc., in its algorithm.
    $.fn.SPServices.SPSetMultiSelectSizes = function (options) {

        var opt = $.extend({}, {
            listName: $().SPServices.SPListNameFromUrl(), // The list the form is working with. This is useful if the form is not in the list context.
            multiSelectColumn: "",
            minWidth: 0,
            maxWidth: 0,
            debug: false
        }, options);

        var thisFunction = "SPServices.SPSetMultiSelectSizes";

        // Find the multi-select column
        var thisMultiSelect = $().SPServices.SPDropdownCtl({
            displayName: opt.multiSelectColumn
        });
        if (thisMultiSelect.Obj.html() === null && opt.debug) {
            errBox(thisFunction, "multiSelectColumn: " + opt.multiSelectColumn, TXTColumnNotFound);
            return;
        }
        if (thisMultiSelect.Type !== dropdownType.multiSelect && opt.debug) {
            errBox(thisFunction, "multiSelectColumn: " + opt.multiSelectColumn, "Column is not multi-select.");
            return;
        }

        // Create a temporary clone of the select to use to determine the appropriate width settings.
        // We'll append it to the end of the enclosing span.
        var cloneId = genContainerId("SPSetMultiSelectSizes", opt.multiSelectColumn, opt.listName);
        var cloneObj = $("<select id='" + cloneId + "' ></select>").appendTo(thisMultiSelect.container);
        cloneObj.css({
            "width": "auto", // We want the clone to resize its width based on the contents
            "height": 0, // Just to keep the page clean while we are using the clone
            "visibility": "hidden" // And let's keep it hidden
        });

        // Add all the values to the cloned select.  First the left (possible values) select...
        $(thisMultiSelect.master.candidateControl).find("option").each(function () {
            cloneObj.append("<option value='" + $(this).html() + "'>" + $(this).html() + "</option>");
        });
        // ...then the right (selected values) select (in case some values have already been selected)
        $(thisMultiSelect.master.resultControl).find("option").each(function () {
            cloneObj.append("<option value='" + $(this).val() + "'>" + $(this).html() + "</option>");
        });

        // We'll add 5px for a little padding on the right.
        var divWidth = cloneObj.width() + 5;
        var newDivWidth = divWidth;
        if (opt.minWidth > 0 || opt.maxWidth > 0) {
            if (divWidth < opt.minWidth) {
                divWidth = opt.minWidth;
            }
            if (newDivWidth < opt.minWidth) {
                newDivWidth = opt.minWidth;
            }
            if (newDivWidth > opt.maxWidth) {
                newDivWidth = opt.maxWidth;
            }
        }
        var selectWidth = divWidth;

        // Set the new widths
        $(thisMultiSelect.master.candidateControl).css("width", selectWidth + "px").parent().css("width", newDivWidth + "px");
        $(thisMultiSelect.master.resultControl).css("width", selectWidth + "px").parent().css("width", newDivWidth + "px");

        // Remove the select's clone, since we're done with it
        cloneObj.remove();

    }; // End $.fn.SPServices.SPSetMultiSelectSizes

    // Does an audit of a site's list forms to show where script is in use.
    $.fn.SPServices.SPScriptAudit = function (options) {

        var opt = $.extend({}, {
            webURL: "", // [Optional] The name of the Web (site) to audit
            listName: "", // [Optional] The name of a specific list to audit. If not present, all lists in the site are audited.
            outputId: "", // The id of the DOM object for output
            auditForms: true, // Audit the form pages
            auditViews: true, // Audit the view pages
            auditPages: true, // Audit the Pages Document Library
            auditPagesListName: "Pages", // The Pages Document Library(ies), if desired. Either a single string or an array of strings.
            showHiddenLists: false, // Show output for hidden lists
            showNoScript: false, // Show output for lists with no scripts (effectively "verbose")
            showSrc: true // Show the source location for included scripts
        }, options);

        var formTypes = [
            ["New", "NewForm.aspx", false],
            ["Display", "DispForm.aspx", false],
            ["Edit", "EditForm.aspx", false]
        ];
        var listXml;

        // Build the table to contain the results
        $("#" + opt.outputId)
            .append("<table id='SPScriptAudit' width='100%' style='border-collapse: collapse;' border=0 cellSpacing=0 cellPadding=1>" +
            "<tr>" +
            "<th></th>" +
            "<th>List</th>" +
            "<th>Page Class</th>" +
            "<th>Page Type</th>" +
            "<th>Page</th>" +
            (opt.showSrc ? "<th>Script References</th>" : "") +
            "</tr>" +
            "</table>");
        // Apply the CSS class to the headers
        var scriptAuditContainer = $("#SPScriptAudit");
        scriptAuditContainer.find("th").attr("class", "ms-vh2-nofilter");

        // Don't bother with the lists if the options don't require them
        if (opt.auditForms || opt.auditViews) {
            // First, get all of the lists within the site
            $().SPServices({
                operation: "GetListCollection",
                webURL: opt.webURL,
                async: false, // Need this to be synchronous so we're assured of a valid value
                completefunc: function (xData) {
                    $(xData.responseXML).find("List").each(function () {
                        listXml = $(this);

                        // If listName has been specified, then only return results for that list
                        if ((opt.listName.length === 0) || (listXml.attr("Title") === opt.listName)) {
                            // Don't work with hidden lists unless we're asked to
                            if ((opt.showHiddenLists && listXml.attr("Hidden") === "False") || !opt.showHiddenLists) {

                                // Audit the list's forms
                                if (opt.auditForms) {
                                    // Get the list's Content Types, therefore the form pages
                                    $().SPServices({
                                        operation: "GetListContentTypes",
                                        webURL: opt.webURL,
                                        listName: listXml.attr("ID"),
                                        async: false, // Need this to be synchronous so we're assured of a valid value
                                        completefunc: function (xData) {
                                            $(xData.responseXML).find("ContentType").each(function () {
                                                // Don't deal with folders
                                                if ($(this).attr("ID").substring(0, 6) !== "0x0120") {
                                                    var formUrls = $(this).find("FormUrls");
                                                    for (i = 0; i < formTypes.length; i++) {
                                                        // Look for a customized form...
                                                        $(formUrls).find(formTypes[i][0]).each(function () {
                                                            SPScriptAuditPage(opt, listXml, "Form", this.nodeName, ((opt.webURL.length > 0) ? opt.webURL : $().SPServices.SPGetCurrentSite()) + SLASH + $(this).text());
                                                            formTypes[i][2] = true;
                                                        });
                                                        // ...else the uncustomized form
                                                        if (!formTypes[i][2]) {
                                                            var defaultViewUrl = listXml.attr("DefaultViewUrl");
                                                            SPScriptAuditPage(opt, listXml, "Form", formTypes[i][0],
                                                                defaultViewUrl.substring(0, defaultViewUrl.lastIndexOf(SLASH) + 1) + formTypes[i][1]);
                                                        }
                                                    }
                                                    // Reset the form types
                                                    for (i = 0; i < formTypes.length; i++) {
                                                        formTypes[i][2] = false;
                                                    }
                                                }
                                            });
                                        }
                                    });
                                }

                                // Audit the list's views
                                if (opt.auditViews) {
                                    // Get the list's Views
                                    $().SPServices({
                                        operation: "GetViewCollection",
                                        webURL: opt.webURL,
                                        listName: listXml.attr("ID"),
                                        async: false, // Need this to be synchronous so we're assured of a valid value
                                        completefunc: function (xData) {
                                            $(xData.responseXML).find("View").each(function () {
                                                SPScriptAuditPage(opt, listXml, "View", $(this).attr("DisplayName"), $(this).attr("Url"));
                                            });
                                        }
                                    });
                                }

                            }
                        }
                    });
                }
            });
        }

        // Don't bother with auditing pages if the options don't require it
        var numLists = 0;
        var listsArray = [];
        if (typeof opt.auditPagesListName === "string") {
            numLists = 1;
            listsArray.push(opt.auditPagesListName);
        } else {
            numLists = opt.auditPagesListName.length;
            listsArray = opt.auditPagesListName;
        }

        if (opt.auditPages) {
            for (i = 0; i < numLists; i++) {
                $().SPServices({
                    operation: "GetList",
                    async: false,
                    cacheXML: true,
                    webURL: opt.webURL,
                    listName: listsArray[i],
                    completefunc: function (xData) {
                        $(xData.responseXML).find("List").each(function () {
                            listXml = $(this);
                        });
                    }
                });
                // Get all of the items from the Document Library
                $().SPServices({
                    operation: "GetListItems",
                    async: false,
                    webURL: opt.webURL,
                    listName: listsArray[i],
                    CAMLQuery: "<Query><Where><Neq><FieldRef Name='ContentType'/><Value Type='Text'>Folder</Value></Neq></Where></Query>",
                    CAMLViewFields: "<ViewFields><FieldRef Name='Title'/><FieldRef Name='FileRef'/></ViewFields>",
                    CAMLRowLimit: 0,
                    completefunc: function (xData) {
                        $(xData.responseXML).SPFilterNode("z:row").each(function () {
                            var thisPageUrl = $(this).attr("ows_FileRef").split(spDelim)[1];
                            var thisTitle = $(this).attr("ows_Title");
                            var thisPageType = (typeof thisTitle !== "undefined") ? thisTitle : "";
                            if (thisPageUrl.indexOf(".aspx") > 0) {
                                SPScriptAuditPage(opt, listXml, "Page", thisPageType, SLASH + thisPageUrl);
                            }
                        });
                    }
                });
            }
        }
        // Remove progress indicator and make the output pretty by cleaning up the ms-alternating CSS class
        scriptAuditContainer.find("tr[class='ms-alternating']:even").removeAttr("class");
    }; // End $.fn.SPServices.SPScriptAudit

    // Displays the usage of scripts in a site
    function SPScriptAuditPage(opt, listXml, pageClass, pageType, pageUrl) {

        var i = 0;
        var jQueryPage = 0;
        var pageScriptSrc = {};
        pageScriptSrc.type = [];
        pageScriptSrc.src = [];
        pageScriptSrc.script = [];
        var scriptRegex = RegExp("<script[\\s\\S]*?/script>", "gi");

        // Fetch the page
        $.ajax({
            type: "GET",
            url: pageUrl,
            dataType: "text",
            async: false,
            success: function (xData) {

                var scriptMatch;

                while (scriptMatch = scriptRegex.exec(xData)) {
                    var scriptLanguage = getScriptAttribute(scriptMatch, "language");
                    var scriptType = getScriptAttribute(scriptMatch, "type");
                    var scriptSrc = getScriptAttribute(scriptMatch, "src");
                    if (scriptSrc !== null && scriptSrc.length > 0 && !coreScript(scriptSrc)) {
                        pageScriptSrc.type.push((scriptLanguage !== null && scriptLanguage.length > 0) ? scriptLanguage : scriptType);
                        pageScriptSrc.src.push(scriptSrc);
                        jQueryPage++;
                    }
                }

                // Only show pages without script if we've been asked to do so.
                if ((!opt.showNoScript && (pageScriptSrc.type.length > 0)) || opt.showNoScript) {
                    var pagePath = pageUrl.substring(0, pageUrl.lastIndexOf(SLASH) + 1);
                    var out = "<tr class=ms-alternating>" +
                        "<td class=ms-vb-icon><a href='" + listXml.attr("DefaultViewUrl") + "'><IMG border=0 src='" + listXml.attr("ImageUrl") + "'width=16 height=16></A></TD>" +
                        "<td class=ms-vb2><a href='" + listXml.attr("DefaultViewUrl") + "'>" + listXml.attr("Title") + ((listXml.attr("Hidden") === "True") ? '(Hidden)' : '') + "</td>" +
                        "<td class=ms-vb2>" + pageClass + "</td>" +
                        "<td class=ms-vb2>" + pageType + "</td>" +
                        "<td class=ms-vb2><a href='" + pageUrl + "'>" + fileName(pageUrl) + "</td>";
                    if (opt.showSrc) {
                        var thisSrcPath;
                        out += "<td valign='top'><table width='100%' style='border-collapse: collapse;' border=0 cellSpacing=0 cellPadding=1>";
                        for (i = 0; i < pageScriptSrc.type.length; i++) {
                            thisSrcPath = (pageScriptSrc.src[i].substr(0, 1) !== SLASH) ? pagePath + pageScriptSrc.src[i] : pageScriptSrc.src[i];
                            out += "<tr><td class=ms-vb2 width='30%'>" + pageScriptSrc.type[i] + "</td>";
                            out += "<td class=ms-vb2 width='70%'><a href='" + thisSrcPath + "'>" + fileName(pageScriptSrc.src[i]) + "</td></tr>";
                        }
                        out += "</table></td>";
                    }
                    $("#SPScriptAudit").append(out);
                }
            }
        });
    } // End of function SPScriptAuditPage

    function getScriptAttribute(source, attribute) {
        var matches;
        var regex = RegExp(attribute + "=(\"([^\"]*)\")|('([^']*)')", "gi");
        if (matches = regex.exec(source)) {
            return matches[2];
        }
        return null;
    } // End of function getScriptAttribute

    // Check to see if the script reference is part of SharePoint core so that we can ignore it
    function coreScript(src) {
        var i;
        var coreScriptLocations = ["WebResource.axd", "_layouts"];
        for (i = 0; i < coreScriptLocations.length; i++) {
            if (src.indexOf(coreScriptLocations[i]) > -1) {
                return true;
            }
        }
        return false;
    } // End of function coreScript

    // Rearrange radio buttons or checkboxes in a form from vertical to horizontal display to save page real estate
    $.fn.SPServices.SPArrangeChoices = function (options) {

        var opt = $.extend({}, {
            listName: $().SPServices.SPListNameFromUrl(), // The list name for the current form
            columnName: "", // The display name of the column in the form
            perRow: 99, // Maximum number of choices desired per row.
            randomize: false // If true, randomize the order of the options
        }, options);

        var columnFillInChoice = false;
        var columnOptions = [];

        // Get information about columnName from the list to determine if we're allowing fill-in choices
        var thisGetList = $().SPServices({
            operation: "GetList",
            async: false,
            cacheXML: true,
            listName: opt.listName
        });

        // when the promise is available...     
        thisGetList.done(function () {
            $(thisGetList.responseXML).find("Field[DisplayName='" + opt.columnName + "']").each(function () {
                // Determine whether columnName allows a fill-in choice
                columnFillInChoice = ($(this).attr("FillInChoice") === "TRUE");
                // Stop looking;we're done
                return false;
            });

            var thisFormField = findFormField(opt.columnName);
            var totalChoices = $(thisFormField).find("tr").length;
            var fillinPrompt;
            var fillinInput;

            // Collect all of the choices
            $(thisFormField).find("tr").each(function (choiceNumber) {
                // If this is the fill-in prompt, save it...
                if (columnFillInChoice && choiceNumber === (totalChoices - 2)) {
                    fillinPrompt = $(this).find("td");
                    // ...or if it is the fill-in input box, save it...
                } else if (columnFillInChoice && choiceNumber === (totalChoices - 1)) {
                    fillinInput = $(this).find("td");
                    // ...else push into the columnOptions array.
                } else {
                    columnOptions.push($(this).find("td"));
                }
            });

            // If randomize is true, randomly sort the options
            if (opt.randomize) {
                columnOptions.sort(randOrd);
            }

            //Create a new choices table to hold the arranged choices.
            var newChoiceTable = $("<table cellpadding='0' cellspacing='1'></table>");

            //Iterate over all available choices placing them in the correct position in the new choices table.
            for (i = 0; i < columnOptions.length; i++) {
                // If we've already got perRow columnOptions in the row, close off the row
                if ((i + 1) % opt.perRow === 0) {
                    newChoiceTable.append("<tr></tr>");
                }
                newChoiceTable.find("tr:last").append(columnOptions[i]);
            }

            //Insert fillInChoices section under available choices.
            if (columnFillInChoice) {
                var fillInRow = $("<tr><td colspan='99'><table cellpadding='0' cellspacing='1'><tr></tr></table></td></tr>");
                fillInRow.find("tr").append(fillinPrompt);
                fillInRow.find("tr").append(fillinInput);
                newChoiceTable.append(fillInRow);
            }

            //Insert new table before the old choice table so that choices will still line up with header.
            var choiceTable = $(thisFormField).find("table:first");
            choiceTable.before(newChoiceTable);

            //Choices table is not removed because validation depends on the table id.
            choiceTable.hide();

        });

    }; // End $.fn.SPServices.SPArrangeChoices

    // Provide suggested values from a list for in input column based on characters typed
    $.fn.SPServices.SPAutocomplete = function (options) {

        var opt = $.extend({}, {
            webURL: "", // [Optional] The name of the Web (site) which contains the sourceList
            sourceList: "", // The name of the list which contains the values
            sourceColumn: "", // The static name of the column which contains the values
            columnName: "", // The display name of the column in the form
            listName: $().SPServices.SPListNameFromUrl(), // The list the form is working with. This is useful if the form is not in the list context.
            CAMLQuery: "", // [Optional] For power users, this CAML fragment will be Anded with the default query on the relatedList
            CAMLQueryOptions: "<QueryOptions></QueryOptions>", // [Optional] For power users, allows specifying the CAMLQueryOptions for the GetListItems call
            CAMLRowLimit: 0, // [Optional] Override the default view rowlimit and get all appropriate rows
            filterType: "BeginsWith", // Type of filtering: [BeginsWith, Contains]
            numChars: 0, // Wait until this number of characters has been typed before attempting any actions
            ignoreCase: false, // If set to true, the function ignores case, if false it looks for an exact match
            highlightClass: "", // If a class is supplied, highlight the matched characters in the values by applying that class to a wrapping span
            uniqueVals: false, // If set to true, the function only adds unique values to the list (no duplicates)
            maxHeight: 99999, // Sets the maximum number of values to display before scrolling occurs
            slideDownSpeed: "fast", // Speed at which the div should slide down when values match (milliseconds or ["fast" | "slow"])
            processingIndicator: "_layouts/images/REFRESH.GIF", // If present, show this while processing
            debug: false // If true, show error messages;if false, run silent
        }, options);

        var matchNum;

        // Find the input control for the column and save some of its attributes
        var columnObj = findFormField(opt.columnName).find("input[Title^='" + opt.columnName + "']");
        columnObj.css("position", "");
        var columnObjColor = columnObj.css("color");
        var columnObjWidth = columnObj.css("width");

        if (columnObj.html() === null && opt.debug) {
            errBox("SPServices.SPAutocomplete",
                "columnName: " + opt.columnName,
                "Column is not an input control or is not found on page");
            return;
        }

        // Remove the <br/> which isn't needed and messes up the formatting
        columnObj.closest("span").find("br").remove();
        columnObj.wrap("<div>");

        // Create a div to contain the matching values and add it to the DOM
        var containerId = genContainerId("SPAutocomplete", opt.columnName, opt.listName);
        columnObj.after("<div><ul id='" + containerId + "' style='width:" + columnObjWidth + ";display:none;padding:2px;border:1px solid #2A1FAA;background-color:#FFF;position:absolute;z-index:40;margin:0'></div>");

        // Set the width to match the width of the input control
        var containerObj = $("#" + containerId);
        containerObj.css("width", columnObjWidth);

        // Handle keypresses
        $(columnObj).keyup(function () {

            // Get the column's value
            var columnValue = $(this).val();

            // Hide the container while we're working on it
            containerObj.hide();

            // Have enough characters been typed yet?
            if (columnValue.length < opt.numChars) {
                return false;
            }

            // Show the the processingIndicator as a background image in the input element
            columnObj.css({
                "background-image": "url(" + opt.processingIndicator + ")",
                "background-position": "right",
                "background-repeat": "no-repeat"
            });

            // Array to hold the matched values
            var matchArray = [];

            // Build the appropriate CAMLQuery
            var camlQuery = "<Query><OrderBy><FieldRef Name='" + opt.sourceColumn + "'/></OrderBy><Where>";
            if (opt.CAMLQuery.length > 0) {
                camlQuery += "<And>";
            }
            camlQuery += "<" + opt.filterType + "><FieldRef Name='" + opt.sourceColumn + "'/><Value Type='Text'>" + columnValue + "</Value></" + opt.filterType + ">";
            if (opt.CAMLQuery.length > 0) {
                camlQuery += opt.CAMLQuery + "</And>";
            }
            camlQuery += "</Where></Query>";

            // Call GetListItems to find all of the potential values
            $().SPServices({
                operation: "GetListItems",
                async: false,
                webURL: opt.WebURL,
                listName: opt.sourceList,
                CAMLQuery: camlQuery,
                CAMLQueryOptions: opt.CAMLQueryOptions,
                CAMLViewFields: "<ViewFields><FieldRef Name='" + opt.sourceColumn + "' /></ViewFields>",
                CAMLRowLimit: opt.CAMLRowLimit,
                completefunc: function (xData) {
                    // Handle upper/lower case if ignoreCase = true
                    var testValue = opt.ignoreCase ? columnValue.toUpperCase() : columnValue;
                    // See which values match and add the ones that do to matchArray
                    $(xData.responseXML).SPFilterNode("z:row").each(function () {
                        var thisValue = $(this).attr("ows_" + opt.sourceColumn);
                        var thisValueTest = opt.ignoreCase ? $(this).attr("ows_" + opt.sourceColumn).toUpperCase() : $(this).attr("ows_" + opt.sourceColumn);
                        // Make sure we have a match...
                        if (opt.filterType === "Contains") {
                            var firstMatch = thisValueTest.indexOf(testValue);
                            if ((firstMatch >= 0) &&
                                    // ...and that the match is not already in the array if we want uniqueness
                                (!opt.uniqueVals || ($.inArray(thisValue, matchArray) === -1))) {
                                matchArray.push($(this).attr("ows_" + opt.sourceColumn));
                            }
                        } else {
                            // Handles normal case, which is BeginsWith and and other unknown values
                            if (testValue === thisValueTest.substr(0, testValue.length) &&
                                    // ...and that the match is not already in the array if we want uniqueness
                                (!opt.uniqueVals || ($.inArray(thisValue, matchArray) === -1))) {
                                matchArray.push($(this).attr("ows_" + opt.sourceColumn));
                            }
                        }
                    });
                }
            });

            // Build out the set of list elements to contain the available values
            var out = "";
            for (i = 0; i < matchArray.length; i++) {
                // If a highlightClass has been supplied, wrap a span around each match
                if (opt.highlightClass.length > 0) {
                    // Set up Regex based on whether we want to ignore case
                    var thisRegex = new RegExp(columnValue, opt.ignoreCase ? "gi" : "g");
                    // Look for all occurrences
                    var matches = matchArray[i].match(thisRegex);
                    var startLoc = 0;
                    // Loop for each occurrence, wrapping each in a span with the highlightClass CSS class
                    for (matchNum = 0; matchNum < matches.length; matchNum++) {
                        var thisPos = matchArray[i].indexOf(matches[matchNum], startLoc);
                        var endPos = thisPos + matches[matchNum].length;
                        var thisSpan = "<span class='" + opt.highlightClass + "'>" + matches[matchNum] + "</span>";
                        matchArray[i] = matchArray[i].substr(0, thisPos) + thisSpan + matchArray[i].substr(endPos);
                        startLoc = thisPos + thisSpan.length;
                    }
                }
                // Add the value to the markup for the container
                out += "<li style='display: block;position: relative;cursor: pointer;'>" + matchArray[i] + "</li>";
            }

            // Add all the list elements to the containerId container
            containerObj.html(out);
            // Set up hehavior for the available values in the list element
            $("#" + containerId + " li").click(function () {
                $("#" + containerId).fadeOut(opt.slideUpSpeed);
                columnObj.val($(this).text());
            }).mouseover(function () {
                var mouseoverCss = {
                    "cursor": "hand",
                    "color": "#ffffff",
                    "background": "#3399ff"
                };
                $(this).css(mouseoverCss);
            }).mouseout(function () {
                var mouseoutCss = {
                    "cursor": "inherit",
                    "color": columnObjColor,
                    "background": "transparent"
                };
                $(this).css(mouseoutCss);
            });

            // If we've got some values to show, then show 'em!
            if (matchArray.length > 0) {
                $("#" + containerId).slideDown(opt.slideDownSpeed);
            }
            // Remove the processing indicator
            columnObj.css("background-image", "");
        });

    }; // End $.fn.SPServices.SPAutocomplete

    // Get the Query String parameters and their values and return in an array
    // Includes code from http://www.developerdrive.com/2013/08/turning-the-querystring-into-a-json-object-using-javascript/
    // Simplified in 2014.01 using this code
    $.fn.SPServices.SPGetQueryString = function (options) {

        var opt = $.extend({}, {
            lowercase: false // If true, parameter names will be converted to lowercase
        }, options);

        var queryStringVals = {};

        var qs = location.search.slice(1).split('&');

        for (var i = 0; i < qs.length; i++) {
            var param = qs[i].split('=');
            var paramName = opt.lowercase ? param[0].toLowerCase() : param[0];
            queryStringVals[paramName] = decodeURIComponent(param[1] || "");
        }

        return queryStringVals;

    }; // End $.fn.SPServices.SPGetQueryString

    // Get the current list's GUID (ID) from the current URL.  Use of this function only makes sense if we're in a list's context,
    // and we assume that we are calling it from an aspx page which is a form or view for the list.
    $.fn.SPServices.SPListNameFromUrl = function (options) {

        var opt = $.extend({}, {
            listName: "" // [Optional] Pass in the name or GUID of a list if you are not in its context. e.g., on a Web Part pages in the Pages library
        }, options);

        // Has the list name or GUID been passed in?
        if (opt.listName.length > 0) {
            currentContext.thisList = opt.listName;
            return currentContext.thisList;
            // Do we already know the current list?
        } else if (currentContext.thisList !== undefined && currentContext.thisList.length > 0) {
            return currentContext.thisList;
        }

        // Parse out the list's root URL from the current location or the passed url
        var thisPage = location.href;
        var thisPageBaseName = thisPage.substring(0, thisPage.indexOf(".aspx"));
        var listPath = decodeURIComponent(thisPageBaseName.substring(0, thisPageBaseName.lastIndexOf(SLASH) + 1)).toUpperCase();

        // Call GetListCollection and loop through the results to find a match with the list's URL to get the list's GUID
        $().SPServices({
            operation: "GetListCollection",
            async: false,
            completefunc: function (xData) {
                $(xData.responseXML).find("List").each(function () {
                    var defaultViewUrl = $(this).attr("DefaultViewUrl");
                    var listCollList = defaultViewUrl.substring(0, defaultViewUrl.lastIndexOf(SLASH) + 1).toUpperCase();
                    if (listPath.indexOf(listCollList) > 0) {
                        currentContext.thisList = $(this).attr("ID");
                        return false;
                    }
                });
            }
        });

        // Return the list GUID (ID)
        return currentContext.thisList;

    }; // End $.fn.SPServices.SPListNameFromUrl

    // SPUpdateMultipleListItems allows you to update multiple items in a list based upon some common characteristic or metadata criteria.
    $.fn.SPServices.SPUpdateMultipleListItems = function (options) {

        var opt = $.extend({}, {
            webURL: "", // [Optional] URL of the target Web.  If not specified, the current Web is used.
            listName: "", // The list to operate on.
            CAMLQuery: "", // A CAML fragment specifying which items in the list will be selected and updated
            batchCmd: "Update", // The operation to perform. By default, Update.
            valuepairs: [], // Valuepairs for the update in the form [[fieldname1, fieldvalue1], [fieldname2, fieldvalue2]...]
            completefunc: null, // Function to call on completion of rendering the change.
            debug: false // If true, show error messages;if false, run silent
        }, options);

        var i;
        var itemsToUpdate = [];
        var documentsToUpdate = [];

        // Call GetListItems to find all of the items matching the CAMLQuery
        $().SPServices({
            operation: "GetListItems",
            async: false,
            webURL: opt.webURL,
            listName: opt.listName,
            CAMLQuery: opt.CAMLQuery,
            CAMLQueryOptions: "<QueryOptions><ViewAttributes Scope='Recursive' /></QueryOptions>",
            completefunc: function (xData) {
                $(xData.responseXML).SPFilterNode("z:row").each(function () {
                    itemsToUpdate.push($(this).attr("ows_ID"));
                    var fileRef = $(this).attr("ows_FileRef");
                    fileRef = "/" + fileRef.substring(fileRef.indexOf(spDelim) + 2);
                    documentsToUpdate.push(fileRef);
                });
            }
        });

        var fieldNum;
        var batch = "<Batch OnError='Continue'>";
        for (i = 0; i < itemsToUpdate.length; i++) {
            batch += "<Method ID='" + i + "' Cmd='" + opt.batchCmd + "'>";
            for (fieldNum = 0; fieldNum < opt.valuepairs.length; fieldNum++) {
                batch += "<Field Name='" + opt.valuepairs[fieldNum][0] + "'>" + escapeColumnValue(opt.valuepairs[fieldNum][1]) + "</Field>";
            }
            batch += "<Field Name='ID'>" + itemsToUpdate[i] + "</Field>";
            if (documentsToUpdate[i].length > 0) {
                batch += "<Field Name='FileRef'>" + documentsToUpdate[i] + "</Field>";
            }
            batch += "</Method>";
        }
        batch += "</Batch>";

        // Call UpdateListItems to update all of the items matching the CAMLQuery
        $().SPServices({
            operation: "UpdateListItems",
            async: false,
            webURL: opt.webURL,
            listName: opt.listName,
            updates: batch,
            completefunc: function (xData) {
                // If present, call completefunc when all else is done
                if (opt.completefunc !== null) {
                    opt.completefunc(xData);
                }
            }
        });

    }; // End $.fn.SPServices.SPUpdateMultipleListItems

    // SPGetListItemsJson retrieves items from a list in JSON format
    $.fn.SPServices.SPGetListItemsJson = function (options) {

        var opt = $.extend({}, {
            webURL: "", // [Optional] URL of the target Web.  If not specified, the current Web is used.
            listName: "",
            viewName: "",
            CAMLQuery: "",
            CAMLViewFields: "",
            CAMLRowLimit: "",
            CAMLQueryOptions: "",
            changeToken: "", // [Optional] If provided, will be passed with the request
            contains: "", // CAML snippet for an additional filter
            mapping: null, // If provided, use this mapping rather than creating one automagically from the list schema
            mappingOverrides: null, // Pass in specific column overrides here
            debug: false // If true, show error messages;if false, run silent
        }, $().SPServices.defaults, options);

        var newChangeToken;
        var thisListJsonMapping = {};
        var deletedIds = [];
        var result = $.Deferred();

        // Call GetListItems to find all of the items matching the CAMLQuery
        var thisData = $().SPServices({
            operation: "GetListItemChangesSinceToken",
            webURL: opt.webURL,
            listName: opt.listName,
            viewName: opt.viewName,
            CAMLQuery: opt.CAMLQuery,
            CAMLViewFields: opt.CAMLViewFields,
            CAMLRowLimit: opt.CAMLRowLimit,
            CAMLQueryOptions: opt.CAMLQueryOptions,
            changeToken: opt.changeToken,
            contains: opt.contains
        });

        thisData.done(function () {

            var mappingKey = "SPGetListItemsJson" + opt.webURL + opt.listName;

            // We're going to use this multiple times
            var responseXml = $(thisData.responseXML);

            // Get the changeToken
            newChangeToken = responseXml.find("Changes").attr("LastChangeToken");

            // Some of the existing items may have been deleted
            responseXml.find("listitems Changes Id[ChangeType='Delete']").each(function () {
                deletedIds.push($(this).text());
            });

            if (opt.mapping === null) {
                // Automagically create the mapping
                responseXml.find("List > Fields > Field").each(function () {
                    var thisField = $(this);
                    var thisType = thisField.attr("Type");
                    // Only work with known column types
                    if ($.inArray(thisType, spListFieldTypes) >= 0) {
                        thisListJsonMapping["ows_" + thisField.attr("Name")] = {
                            mappedName: thisField.attr("Name"),
                            objectType: thisField.attr("Type")
                        };
                    }

                });

            } else {
                thisListJsonMapping = opt.mapping;
            }

            // Implement any mappingOverrides
            // Example: { ows_JSONTextColumn: { mappedName: "JTC", objectType: "JSON" } } 
            if (opt.mappingOverrides !== null) {
                // For each mappingOverride, override the list schema
                for (var mapping in opt.mappingOverrides) {
                    thisListJsonMapping[mapping] = opt.mappingOverrides[mapping];
                }
            }

            // If we haven't retrieved the list schema in this call, try to grab it from the saved data from a prior call
            if ($.isEmptyObject(thisListJsonMapping)) {
                thisListJsonMapping = $(document).data(mappingKey);
            } else {
                $(document).data(mappingKey, thisListJsonMapping);
            }

            var jsonData = responseXml.SPFilterNode("z:row").SPXmlToJson({
                mapping: thisListJsonMapping,
                sparse: true
            });

            var thisResult = {
                changeToken: newChangeToken,
                mapping: thisListJsonMapping,
                data: jsonData,
                deletedIds: deletedIds
            };

            result.resolveWith(thisResult);

        });

        return result.promise();

    }; // End $.fn.SPServices.SPUpdateMultipleListItems

    // Convert a JavaScript date to the ISO 8601 format required by SharePoint to update list items
    $.fn.SPServices.SPConvertDateToISO = function (options) {

        var opt = $.extend({}, {
            dateToConvert: new Date(), // The JavaScript date we'd like to convert. If no date is passed, the function returns the current date/time
            dateOffset: "-05:00" // The time zone offset requested. Default is EST
        }, options);

        //Generate ISO 8601 date/time formatted string
        var s = "";
        var d = opt.dateToConvert;
        s += d.getFullYear() + "-";
        s += pad(d.getMonth() + 1) + "-";
        s += pad(d.getDate());
        s += "T" + pad(d.getHours()) + ":";
        s += pad(d.getMinutes()) + ":";
        s += pad(d.getSeconds()) + "Z" + opt.dateOffset;
        //Return the ISO8601 date string
        return s;

    }; // End $.fn.SPServices.SPConvertDateToISO

    // This method for finding specific nodes in the returned XML was developed by Steve Workman. See his blog post
    // http://www.steveworkman.com/html5-2/javascript/2011/improving-javascript-xml-node-finding-performance-by-2000/
    // for performance details.
    $.fn.SPFilterNode = function (name) {
        return this.find('*').filter(function () {
            return this.nodeName === name;
        });
    }; // End $.fn.SPFilterNode

    // This function converts an XML node set to JSON
    // Initial implementation focuses only on GetListItems
    $.fn.SPXmlToJson = function (options) {

        var opt = $.extend({}, {
            mapping: {}, // columnName: mappedName: "mappedName", objectType: "objectType"
            includeAllAttrs: false, // If true, return all attributes, regardless whether they are in the mapping
            removeOws: true, // Specifically for GetListItems, if true, the leading ows_ will be stripped off the field name
            sparse: false // If true, empty ("") values will not be returned
        }, options);

        var attrNum;
        var jsonObject = [];

        this.each(function () {
            var row = {};
            var rowAttrs = this.attributes;

            if (!opt.sparse) {
                // Bring back all mapped columns, even those with no value
                $.each(opt.mapping, function () {
                    row[this.mappedName] = "";
                });
            }

            // Parse through the element's attributes
            for (attrNum = 0; attrNum < rowAttrs.length; attrNum++) {
                var thisAttrName = rowAttrs[attrNum].name;
                var thisMapping = opt.mapping[thisAttrName];
                var thisObjectName = typeof thisMapping !== "undefined" ? thisMapping.mappedName : opt.removeOws ? thisAttrName.split("ows_")[1] : thisAttrName;
                var thisObjectType = typeof thisMapping !== "undefined" ? thisMapping.objectType : undefined;
                if (opt.includeAllAttrs || thisMapping !== undefined) {
                    row[thisObjectName] = attrToJson(rowAttrs[attrNum].value, thisObjectType);
                }
            }
            // Push this item into the JSON Object          
            jsonObject.push(row);

        });

        // Return the JSON object
        return jsonObject;

    }; // End $.fn.SPServices.SPXmlToJson


    function attrToJson(v, objectType) {

        var colValue;

        switch (objectType) {
            case "Text":
                colValue = v;
                break;
            case "DateTime":
            case "datetime": // For calculated columns, stored as datetime;#value
                // Dates have dashes instead of slashes: ows_Created="2009-08-25 14:24:48"
                colValue = dateToJsonObject(v);
                break;
            case "User":
                colValue = userToJsonObject(v);
                break;
            case "UserMulti":
                colValue = userMultiToJsonObject(v);
                break;
            case "Lookup":
                colValue = lookupToJsonObject(v);
                break;
            case "LookupMulti":
                colValue = lookupMultiToJsonObject(v);
                break;
            case "Boolean":
                colValue = booleanToJsonObject(v);
                break;
            case "Integer":
                colValue = intToJsonObject(v);
                break;
            case "Counter":
                colValue = intToJsonObject(v);
                break;
            case "MultiChoice":
                colValue = choiceMultiToJsonObject(v);
                break;
            case "Number":
            case "Currency":
            case "float": // For calculated columns, stored as float;#value
                colValue = floatToJsonObject(v);
                break;
            case "Calculated":
                colValue = calcToJsonObject(v);
                break;
            case "Attachments":
                colValue = attachmentsToJsonObject(v);
                break;
            case "URL":
                colValue = urlToJsonObject(v);
                break;
            case "JSON":
                colValue = jsonToJsonObject(v); // Special case for text JSON stored in text columns
                break;
            default:
                // All other objectTypes will be simple strings
                colValue = v;
                break;
        }
        return colValue;
    }

    function intToJsonObject(s) {
        return parseInt(s, 10);
    }

    function floatToJsonObject(s) {
        return parseFloat(s);
    }

    function booleanToJsonObject(s) {
        return s !== "0";
    }

    function dateToJsonObject(s) {

        var dt = s.split("T")[0] !== s ? s.split("T") : s.split(" ");
        var d = dt[0].split("-");
        var t = dt[1].split(":");
        var t3 = t[2].split("Z");
        return new Date(d[0], (d[1] - 1), d[2], t[0], t[1], t3[0]);
    }

    function userToJsonObject(s) {
        if (s.length === 0) {
            return null;
        } else {
            var thisUser = new SplitIndex(s);
            var thisUserExpanded = thisUser.value.split(",#");
            if (thisUserExpanded.length === 1) {
                return {
                    userId: thisUser.id,
                    userName: thisUser.value
                };
            } else {
                return {
                    userId: thisUser.id,
                    userName: thisUserExpanded[0].replace(/(,,)/g, ","),
                    loginName: thisUserExpanded[1].replace(/(,,)/g, ","),
                    email: thisUserExpanded[2].replace(/(,,)/g, ","),
                    sipAddress: thisUserExpanded[3].replace(/(,,)/g, ","),
                    title: thisUserExpanded[4].replace(/(,,)/g, ",")
                };
            }
        }
    }

    function userMultiToJsonObject(s) {
        if (s.length === 0) {
            return null;
        } else {
            var thisUserMultiObject = [];
            var thisUserMulti = s.split(spDelim);
            for (i = 0; i < thisUserMulti.length; i = i + 2) {
                var thisUser = userToJsonObject(thisUserMulti[i] + spDelim + thisUserMulti[i + 1]);
                thisUserMultiObject.push(thisUser);
            }
            return thisUserMultiObject;
        }
    }

    function lookupToJsonObject(s) {
        if (s.length === 0) {
            return null;
        } else {
            var thisLookup = s.split(spDelim);
            return {
                lookupId: thisLookup[0],
                lookupValue: thisLookup[1]
            };
        }
    }

    function lookupMultiToJsonObject(s) {
        if (s.length === 0) {
            return null;
        } else {
            var thisLookupMultiObject = [];
            var thisLookupMulti = s.split(spDelim);
            for (i = 0; i < thisLookupMulti.length; i = i + 2) {
                var thisLookup = lookupToJsonObject(thisLookupMulti[i] + spDelim + thisLookupMulti[i + 1]);
                thisLookupMultiObject.push(thisLookup);
            }
            return thisLookupMultiObject;
        }
    }

    function choiceMultiToJsonObject(s) {
        if (s.length === 0) {
            return null;
        } else {
            var thisChoiceMultiObject = [];
            var thisChoiceMulti = s.split(spDelim);
            for (i = 0; i < thisChoiceMulti.length; i++) {
                if (thisChoiceMulti[i].length !== 0) {
                    thisChoiceMultiObject.push(thisChoiceMulti[i]);
                }
            }
            return thisChoiceMultiObject;
        }
    }

    function attachmentsToJsonObject(s) {
        if (s.length === 0) {
            return null;
        } else if (s === "0" || s === "1") {
            return s;
        } else {
            var thisObject = [];
            var thisString = s.split(spDelim);
            for (i = 0; i < thisString.length; i++) {
                if (thisString[i].length !== 0) {
                    var fileName = thisString[i];
                    if (thisString[i].lastIndexOf("/") !== -1) {
                        var tokens = thisString[i].split("/");
                        fileName = tokens[tokens.length - 1];
                    }
                    thisObject.push({
                        attachment: thisString[i],
                        fileName: fileName
                    });
                }
            }
            return thisObject;
        }
    }

    function urlToJsonObject(s) {
        if (s.length === 0) {
            return null;
        } else {
            var thisUrl = s.split(", ");
            return {
                Url: thisUrl[0],
                Description: thisUrl[1]
            };
        }
    }

    function calcToJsonObject(s) {
        if (s.length === 0) {
            return null;
        } else {
            var thisCalc = s.split(spDelim);
            // The first value will be the calculated column value type, the second will be the value
            return attrToJson(thisCalc[1], thisCalc[0]);
        }
    }

    function jsonToJsonObject(s) {
        if (s.length === 0) {
            return null;
        } else {
            return $.parseJSON(s);
        }
    }

    // Find a People Picker in the page
    // Returns references to:
    //   row - The TR which contains the People Picker (useful if you'd like to hide it at some point)
    //   contents - The element which contains the current value
    //   currentValue - The current value if it is set
    //   checkNames - The Check Names image (in case you'd like to click it at some point)
    $.fn.SPServices.SPFindPeoplePicker = function (options) {

        var opt = $.extend({}, {
            peoplePickerDisplayName: "", // The displayName of the People Picker on the form
            valueToSet: "", // The value to set the People Picker to. Should be a string containing each username or groupname separated by semi-colons.
            checkNames: true // If set to true, the Check Names image will be clicked to resolve the names
        }, options);

        var thisRow = $("nobr").filter(function () {
            // Ensures we get a match whether or not the People Picker is required (if required, the nobr contains a span also)
            return $(this).contents().eq(0).text() === opt.peoplePickerDisplayName;
        }).closest("tr");

        var thisContents = thisRow.find("div[name='upLevelDiv']");
        var thisCheckNames = thisRow.find("img[Title='Check Names']:first");

        // If a value was provided, set the value
        if (opt.valueToSet.length > 0) {
            thisContents.html(opt.valueToSet);
        }

        // If checkName is true, click the check names icon
        if (opt.checkNames) {
            thisCheckNames.click();
        }
        var thisCurrentValue = $.trim(thisContents.text());

        // Parse the entity data
        var dictionaryEntries = [];

        // IE
        thisContents.children("span").each(function () {

            // Grab the entity data
            var thisData = $(this).find("div[data]").attr("data");

            var dictionaryEntry = {};

            // Entity data is only available in IE
            if (typeof thisData !== "undefined") {
                var arrayOfDictionaryEntry = $.parseXML(thisData);
                var $xml = $(arrayOfDictionaryEntry);

                $xml.find("DictionaryEntry").each(function () {
                    var key = $(this).find("Key").text();
                    dictionaryEntry[key] = $(this).find("Value").text();
                });
                dictionaryEntries.push(dictionaryEntry);
                // For other browsers, we'll call GetUserInfo to get the data
            } else {
                $().SPServices({
                    operation: "GetUserInfo",
                    async: false,
                    cacheXML: true,
                    userLoginName: $(this).attr("title"),
                    completefunc: function (xData) {

                        $(xData.responseXML).find("User").each(function () {

                            $.each(this.attributes, function (i, attrib) {
                                dictionaryEntry[attrib.name] = attrib.value;
                            });
                            dictionaryEntries.push(dictionaryEntry);
                        });
                    }
                });
            }
        });

        return {
            row: thisRow,
            contents: thisContents,
            currentValue: thisCurrentValue,
            checkNames: thisCheckNames,
            dictionaryEntries: dictionaryEntries
        };
    }; // End $.fn.SPServices.SPFindPeoplePicker

    // Mistakenly released previously outside the SPServices namespace. This takes care of offering both.
    $.fn.SPFindPeoplePicker = function (options) {
        return $().SPServices.SPFindPeoplePicker(options);
    }; // End $.fn.SPFindPeoplePicker

    // Find an MMS Picker in the page
    // Returns references to:
    //   terms - The aaray of terms as value/guid pairs
    $.fn.SPServices.SPFindMMSPicker = function (options) {

        var opt = $.extend({}, {
            MMSDisplayName: "" // The displayName of the MMS Picker on the form
        }, options);

        var thisTerms = [];

        // Find the div for the column which contains the entered data values
        var thisDiv = $("div[title='" + opt.MMSDisplayName + "']");
        var thisHiddenInput = thisDiv.closest("td").find("input[type='hidden']");
        var thisTermArray = thisHiddenInput.val().split(";");

        for (var i = 0; i < thisTermArray.length; i++) {
            var thisOne = thisTermArray[i].split("|");
            thisTerms.push({
                value: thisOne[0],
                guid: thisOne[1]
            });

        }

        return {
            terms: thisTerms
        };

    }; // End $.fn.SPServices.SPFindMMSPicker


    // Return the current version of SPServices as a string
    $.fn.SPServices.Version = function () {

        return VERSION;

    }; // End $.fn.SPServices.Version


    // Find a dropdown (or multi-select) in the DOM. Returns the dropdown object and its type:
    // S = Simple (select)
    // C = Compound (input + select hybrid)
    // M = Multi-select (select hybrid)
    $.fn.SPServices.SPDropdownCtl = function (options) {

        var opt = $.extend({}, {
            displayName: "" // The displayName of the column on the form
        }, options);

        var columnObj = {};

        var colStaticName = $().SPServices.SPGetStaticFromDisplay({
            listName: $().SPServices.SPListNameFromUrl(),
            columnDisplayName: opt.displayName
        });

        // Simple, where the select's title attribute is colName (DisplayName)
        //  Examples:
        //      SP2013 <select title="Country" id="Country_d578ed64-2fa7-4c1e-8b41-9cc1d524fc28_$LookupField">
        //      SP2010: <SELECT name=ctl00$m$g_d10479d7_6965_4da0_b162_510bbbc58a7f$ctl00$ctl05$ctl01$ctl00$ctl00$ctl04$ctl00$Lookup title=Country id=ctl00_m_g_d10479d7_6965_4da0_b162_510bbbc58a7f_ctl00_ctl05_ctl01_ctl00_ctl00_ctl04_ctl00_Lookup>
        //      SP2007: <select name="ctl00$m$g_e845e690_00da_428f_afbd_fbe804787763$ctl00$ctl04$ctl04$ctl00$ctl00$ctl04$ctl00$Lookup" Title="Country" id="ctl00_m_g_e845e690_00da_428f_afbd_fbe804787763_ctl00_ctl04_ctl04_ctl00_ctl00_ctl04_ctl00_Lookup">
        if ((columnObj.Obj = $("select[Title='" + opt.displayName + "']")).length === 1) {
            columnObj.Type = dropdownType.simple;
            // Compound
        } else if ((columnObj.Obj = $("input[Title='" + opt.displayName + "']")).length === 1) {
            columnObj.Type = dropdownType.complex;
            // Simple, where the select's id begins with colStaticName (StaticName) - needed for required columns where title="DisplayName Required Field"
            //   Example: SP2013 <select title="Region Required Field" id="Region_59566f6f-1c3b-4efb-9b7b-6dbc35fe3b0a_$LookupField" showrelatedselected="3">
        } else if ((columnObj.Obj = $("select:regex(id, (" + colStaticName + ")(_)[0-9a-fA-F]{8}(-))")).length === 1) {
            columnObj.Type = dropdownType.simple;
            // Multi-select: This will find the multi-select column control in English and most other language sites where the Title looks like 'Column Name possible values'
        } else if ((columnObj.Obj = $("select[ID$='SelectCandidate'][Title^='" + opt.displayName + " ']")).length === 1) {
            columnObj.Type = dropdownType.multiSelect;
            // Multi-select: This will find the multi-select column control on a Russian site (and perhaps others) where the Title looks like '????????? ????????: Column Name'
        } else if ((columnObj.Obj = $("select[ID$='SelectCandidate'][Title$=': " + opt.displayName + "']")).length === 1) {
            columnObj.Type = dropdownType.multiSelect;
            // Multi-select: This will find the multi-select column control on a German site (and perhaps others) where the Title looks like 'Mögliche Werte für &quot;Column name&quot;.'
        } else if ((columnObj.Obj = $("select[ID$='SelectCandidate'][Title$='\"" + opt.displayName + "\".']")).length === 1) {
            columnObj.Type = dropdownType.multiSelect;
            // Multi-select: This will find the multi-select column control on a Italian site (and perhaps others) where the Title looks like "Valori possibili Column name"
        } else if ((columnObj.Obj = $("select[ID$='SelectCandidate'][Title$=' " + opt.displayName + "']")).length === 1) {
            columnObj.Type = dropdownType.multiSelect;
        } else {
            columnObj.Type = null;
        }

        // Last ditch effort
        // Simple, finding based on the comment text at the top of the td.ms-formbody where the select's title begins with DisplayName - needed for required columns where title="DisplayName Required Field"
        //   Example: SP2010 <select name="ctl00$m$g_308135f8_3f59_4d67_b5f8_c26776c498b7$ff51$ctl00$Lookup" id="ctl00_m_g_308135f8_3f59_4d67_b5f8_c26776c498b7_ff51_ctl00_Lookup" title="Region Required Field">
        if (columnObj.Type === null) {
            var fieldContainer = findFormField(opt.displayName);
            if (fieldContainer !== undefined) {
                var fieldSelect = fieldContainer.find("select[title^='" + opt.displayName + " '][id$='_Lookup']");

                if (fieldSelect && fieldSelect.length === 1) {
                    columnObj.Type = dropdownType.simple;
                    columnObj.Obj = fieldSelect;
                }
            }
        }

        if (columnObj.Type === dropdownType.complex) {
            columnObj.optHid = $("input[id='" + columnObj.Obj.attr("optHid") + "']");
        } else if (columnObj.Type === dropdownType.multiSelect) {
            // Find the important bits of the multiselect control
            columnObj.container = columnObj.Obj.closest("span");
            columnObj.MultiLookupPickerdata = columnObj.container.find("input[id$='" + multiLookupPrefix + "_data'], input[id$='" + multiLookupPrefix2013 + "_data']");
            var addButtonId = columnObj.container.find("[id$='AddButton']").attr("id");
            columnObj.master =
                window[addButtonId.replace(/AddButton/, multiLookupPrefix + "_m")] || // SharePoint 2007
                window[addButtonId.replace(/AddButton/, multiLookupPrefix2013 + "_m")]; // SharePoint 2013
        }

        return columnObj;

    }; // End of function $.fn.SPServices.SPDropdownCtl

    ////// PRIVATE FUNCTIONS ////////

    // Get the current context (as much as we can) on startup
    // See: http://johnliu.net/blog/2012/2/3/sharepoint-javascript-current-page-context-info.html
    function SPServicesContext() {

        // The SharePoint variables only give us a relative path. to match the result from WebUrlFromPageUrl, we need to add the protocol, host, and (if present) port.
        var siteRoot = location.protocol + "//" + location.host + (location.port !== "" ? location.port : "");

        // SharePoint 2010 gives us a context variable
        if (typeof _spPageContextInfo !== "undefined") {
            this.thisSite = siteRoot + _spPageContextInfo.webServerRelativeUrl;
            this.thisList = _spPageContextInfo.pageListId;
            this.thisUserId = _spPageContextInfo.userId;
            // In SharePoint 2007, we know the UserID only
        } else {
            this.thisSite = (typeof L_Menu_BaseUrl !== "undefined") ? siteRoot + L_Menu_BaseUrl : "";
            this.thisList = "";
            this.thisUserId = (typeof _spUserId !== "undefined") ? _spUserId : undefined;
        }

    } // End of function SPServicesContext


    // Display a column (field) formatted correctly based on its definition in the list.
    // NOTE: Currently not dealing with locale differences.
    //   columnXML          The XML node for the column from a GetList operation
    //   columnValue        The text representation of the column's value
    //   opt                The current set of options
    function showColumn(listXML, columnXML, columnValue, opt) {

        if (typeof columnValue === "undefined") {
            return "";
        }

        var i;
        var outString = "";
        var dispUrl;
        var numDecimals;
        var outArray = [];
        var webUrl = opt.relatedWebURL.length > 0 ? opt.relatedWebURL : $().SPServices.SPGetCurrentSite();

        switch (columnXML.attr("Type")) {
            case "Text":
                outString = columnValue;
                break;
            case "URL":
                switch (columnXML.attr("Format")) {
                    // URL as hyperlink
                    case "Hyperlink":
                        outString = "<a href='" + columnValue.substring(0, columnValue.search(",")) + "'>" +
                        columnValue.substring(columnValue.search(",") + 1) + "</a>";
                        break;
                    // URL as image
                    case "Image":
                        outString = "<img alt='" + columnValue.substring(columnValue.search(",") + 1) +
                        "' src='" + columnValue.substring(0, columnValue.search(",")) + "'/>";
                        break;
                    // Just in case
                    default:
                        outString = columnValue;
                        break;
                }
                break;
            case "User":
            case "UserMulti":
                var userMultiValues = columnValue.split(spDelim);
                for (i = 0; i < userMultiValues.length; i = i + 2) {
                    outArray.push("<a href='/_layouts/userdisp.aspx?ID=" + userMultiValues[i] +
                    "&Source=" + escapeUrl(location.href) + "'>" +
                    userMultiValues[i + 1] + "</a>");
                }
                outString = outArray.join(", ");
                break;
            case "Calculated":
                var calcColumn = columnValue.split(spDelim);
                outString = calcColumn[1];
                break;
            case "Number":
                numDecimals = columnXML.attr("Decimals");
                outString = typeof numDecimals === "undefined" ?
                    parseFloat(columnValue).toString() :
                    parseFloat(columnValue).toFixed(numDecimals).toString();
                break;
            case "Currency":
                numDecimals = columnXML.attr("Decimals");
                outString = typeof numDecimals === "undefined" ?
                    parseFloat(columnValue).toFixed(2).toString() :
                    parseFloat(columnValue).toFixed(numDecimals).toString();
                break;
            case "Lookup":
                switch (columnXML.attr("Name")) {
                    case "FileRef":
                        // Get the display form URL for the lookup source list
                        dispUrl = listXML.attr("BaseType") === "1" ? listXML.attr("RootFolder") + SLASH + "Forms/DispForm.aspx" :
                        listXML.attr("RootFolder") + SLASH + "DispForm.aspx";
                        outString = "<a href='" + dispUrl +
                        "?ID=" + columnValue.substring(0, columnValue.search(spDelim)) + "&RootFolder=*&Source=" + escapeUrl(location.href) + "'>" +
                        columnValue.substring(columnValue.search(spDelim) + 2) + "</a>";
                        break;
                    case "FileDirRef":
                        // Get the display form URL for the lookup source list
                        dispUrl = SLASH + columnValue.substring(columnValue.search(spDelim) + 2);
                        outString = "<a href='" + dispUrl + "'>" +
                        columnValue.substring(columnValue.search(spDelim) + 2) + "</a>";
                        break;
                    // Any other lookup column
                    default:
                        // Get the display form URL for the lookup source list
                        dispUrl = getListFormUrl(columnXML.attr("List"), "DisplayForm");
                        outString = "<a href='" + opt.relatedWebURL + SLASH + dispUrl +
                        "?ID=" + columnValue.substring(0, columnValue.search(spDelim)) + "&RootFolder=*&Source=" + escapeUrl(location.href) + "'>" +
                        columnValue.substring(columnValue.search(spDelim) + 2) + "</a>";
                        break;
                }
                break;
            case "LookupMulti":
                // Get the display form URL for the lookup source list
                dispUrl = getListFormUrl(columnXML.attr("List"), "DisplayForm");
                // Show all the values as links to the items, separated by commas
                outString = "";
                if (columnValue.length > 0) {
                    var lookupMultiValues = columnValue.split(spDelim);
                    for (i = 0; i < lookupMultiValues.length / 2; i++) {
                        outArray.push("<a href='" + webUrl + SLASH + dispUrl +
                        "?ID=" + lookupMultiValues[i * 2] + "&RootFolder=*&Source=" + escapeUrl(location.href) + "'>" +
                        lookupMultiValues[(i * 2) + 1] + "</a>");
                    }
                }
                outString = outArray.join(", ");
                break;
            case "File":
                fileName = columnValue.substring(columnValue.search(spDelim) + 2);
                outString = "<a href='" + listXML.attr("RootFolder") + SLASH + fileName + "'>" + fileName + "</a>";
                break;
            case "Counter":
                outString = columnValue;
                break;
            case "DateTime":
                outString = columnValue;
                break;
            default:
                outString = columnValue;
                break;
        }
        return outString;
    } // End of function showColumn


    // Show a single attribute of a node, enclosed in a table
    //   node               The XML node
    //   opt                The current set of options
    function showAttrs(node) {
        var i;
        var out = "<table class='ms-vb' width='100%'>";
        for (i = 0; i < node.attributes.length; i++) {
            out += "<tr><td width='10px' style='font-weight:bold;'>" + i + "</td><td width='100px'>" +
            node.attributes.item(i).nodeName + "</td><td>" + checkLink(node.attributes.item(i).nodeValue) + "</td></tr>";
        }
        out += "</table>";
        return out;
    } // End of function showAttrs

    // Returns the selected value(s) for a dropdown in an array. Expects a dropdown object as returned by the DropdownCtl function.
    // If matchOnId is true, returns the ids rather than the text values for the selection options(s).
    function getDropdownSelected(columnSelect, matchOnId) {

        var columnSelectSelected = [];

        switch (columnSelect.Type) {
            case dropdownType.simple:
                if (matchOnId) {
                    columnSelectSelected.push(columnSelect.Obj.find("option:selected").val() || []);
                } else {
                    columnSelectSelected.push(columnSelect.Obj.find("option:selected").text() || []);
                }
                break;
            case dropdownType.complex:
                if (matchOnId) {
                    columnSelectSelected.push(columnSelect.optHid.val() || []);
                } else {
                    columnSelectSelected.push(columnSelect.Obj.val() || []);
                }
                break;
            case dropdownType.multiSelect:
                $(columnSelect.master.resultControl).find("option").each(function () {
                    if (matchOnId) {
                        columnSelectSelected.push($(this).val());
                    } else {
                        columnSelectSelected.push($(this).html());
                    }
                });
                break;
            default:
                break;
        }
        return columnSelectSelected;

    } // End of function getDropdownSelected

    // Build an error message based on passed parameters
    function errBox(func, param, msg) {
        var errMsg = "<b>Error in function</b><br/>" + func + "<br/>" +
            "<b>Parameter</b><br/>" + param + "<br/>" +
            "<b>Message</b><br/>" + msg + "<br/><br/>" +
            "<span onmouseover='this.style.cursor=\"hand\";' onmouseout='this.style.cursor=\"inherit\";' style='width=100%;text-align:right;'>Click to continue</span></div>";
        modalBox(errMsg);
    } // End of function errBox

    // Call this function to pop up a branded modal msgBox
    function modalBox(msg) {
        var boxCSS = "position:absolute;width:300px;height:150px;padding:10px;background-color:#000000;color:#ffffff;z-index:30;font-family:'Arial';font-size:12px;display:none;";
        $("#aspnetForm").parent().append("<div id='SPServices_msgBox' style=" + boxCSS + ">" + msg);
        var msgBoxObj = $("#SPServices_msgBox");
        var height = msgBoxObj.height();
        var width = msgBoxObj.width();
        var leftVal = ($(window).width() / 2) - (width / 2) + "px";
        var topVal = ($(window).height() / 2) - (height / 2) - 100 + "px";
        msgBoxObj.css({
            border: '5px #C02000 solid',
            left: leftVal,
            top: topVal
        }).show().fadeTo("slow", 0.75).click(function () {
            $(this).fadeOut("3000", function () {
                $(this).remove();
            });
        });
    } // End of function modalBox

    // Generate a unique id for a containing div using the function name and the column display name
    function genContainerId(funcname, columnName, listName) {
        var l = listName !== undefined ? listName : $().SPServices.SPListNameFromUrl();
        return funcname + "_" + $().SPServices.SPGetStaticFromDisplay({
                listName: l,
                columnDisplayName: columnName
            });
    } // End of function genContainerId

    // Get the URL for a specified form for a list
    function getListFormUrl(l, f) {

        var u;
        $().SPServices({
            operation: "GetFormCollection",
            async: false,
            listName: l,
            completefunc: function (xData) {
                u = $(xData.responseXML).find("Form[Type='" + f + "']").attr("Url");
            }
        });
        return u;

    } // End of function getListFormUrl

    // Add the option values to the SOAPEnvelope.payload for the operation
    //  opt = options for the call
    //  paramArray = an array of option names to add to the payload
    //      "paramName" if the parameter name and the option name match
    //      ["paramName", "optionName"] if the parameter name and the option name are different (this handles early "wrappings" with inconsistent naming)
    //      {name: "paramName", sendNull: false} indicates the element is marked as "add to payload only if non-null"
    function addToPayload(opt, paramArray) {

        var i;

        for (i = 0; i < paramArray.length; i++) {
            // the parameter name and the option name match
            if (typeof paramArray[i] === "string") {
                SOAPEnvelope.payload += wrapNode(paramArray[i], opt[paramArray[i]]);
                // the parameter name and the option name are different 
            } else if ($.isArray(paramArray[i]) && paramArray[i].length === 2) {
                SOAPEnvelope.payload += wrapNode(paramArray[i][0], opt[paramArray[i][1]]);
                // the element not a string or an array and is marked as "add to payload only if non-null"
            } else if ((typeof paramArray[i] === "object") && (paramArray[i].sendNull !== undefined)) {
                SOAPEnvelope.payload += ((opt[paramArray[i].name] === undefined) || (opt[paramArray[i].name].length === 0)) ? "" : wrapNode(paramArray[i].name, opt[paramArray[i].name]);
                // something isn't right, so report it
            } else {
                errBox(opt.operation, "paramArray[" + i + "]: " + paramArray[i], "Invalid paramArray element passed to addToPayload()");
            }
        }
    } // End of function addToPayload

    // Finds the td which contains a form field in default forms using the comment which contains:
    //  <!--  FieldName="Title"
    //      FieldInternalName="Title"
    //      FieldType="SPFieldText"
    //  -->
    // as the "anchor" to find it. Necessary because SharePoint doesn't give all field types ids or specific classes.
    function findFormField(columnName) {
        var thisFormBody;
        // There's no easy way to find one of these columns; we'll look for the comment with the columnName
        var searchText = RegExp("FieldName=\"" + columnName.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") + "\"", "gi");
        // Loop through all of the ms-formbody table cells
        $("td.ms-formbody, td.ms-formbodysurvey").each(function () {
            // Check for the right comment
            if (searchText.test($(this).html())) {
                thisFormBody = $(this);
                // Found it, so we're done
                return false;
            }
        });
        return thisFormBody;
    } // End of function findFormField

    // The SiteData operations have the same names as other Web Service operations. To make them easy to call and unique, I'm using
    // the SiteData prefix on their names. This function replaces that name with the right name in the SOAPEnvelope.
    function siteDataFixSOAPEnvelope(SOAPEnvelope, siteDataOperation) {
        var siteDataOp = siteDataOperation.substring(8);
        SOAPEnvelope.opheader = SOAPEnvelope.opheader.replace(siteDataOperation, siteDataOp);
        SOAPEnvelope.opfooter = SOAPEnvelope.opfooter.replace(siteDataOperation, siteDataOp);
        return SOAPEnvelope;
    } // End of function siteDataFixSOAPEnvelope

    // Wrap an XML node (n) around a value (v)
    function wrapNode(n, v) {
        var thisValue = typeof v !== "undefined" ? v : "";
        return "<" + n + ">" + thisValue + "</" + n + ">";
    }

    // Generate a random number for sorting arrays randomly
    function randOrd() {
        return (Math.round(Math.random()) - 0.5);
    }

    // If a string is a URL, format it as a link, else return the string as-is
    function checkLink(s) {
        return ((s.indexOf("http") === 0) || (s.indexOf(SLASH) === 0)) ? "<a href='" + s + "'>" + s + "</a>" : s;
    }

    // Get the filename from the full URL
    function fileName(s) {
        return s.substring(s.lastIndexOf(SLASH) + 1, s.length);
    }

    /* Taken from http://dracoblue.net/dev/encodedecode-special-xml-characters-in-javascript/155/ */
    var xml_special_to_escaped_one_map = {
        '&': '&amp;',
        '"': '&quot;',
        '<': '&lt;',
        '>': '&gt;'
    };
    var escaped_one_to_xml_special_map = {
        '&amp;': '&',
        '&quot;': '"',
        '&lt;': '<',
        '&gt;': '>'
    };

    function encodeXml(string) {
        return string.replace(/([\&"<>])/g, function (str, item) {
            return xml_special_to_escaped_one_map[item];
        });
    }

    function decodeXml(string) {
        return string.replace(/(&quot;|&lt;|&gt;|&amp;)/g,
            function (str, item) {
                return escaped_one_to_xml_special_map[item];
            });
    }

    /* Taken from http://dracoblue.net/dev/encodedecode-special-xml-characters-in-javascript/155/ */

    // Escape column values
    function escapeColumnValue(s) {
        if (typeof s === "string") {
            return s.replace(/&(?![a-zA-Z]{1,8};)/g, "&amp;");
        } else {
            return s;
        }
    }

    // Escape Url
    function escapeUrl(u) {
        return u.replace(/&/g, '%26');
    }

    // Split values like 1;#value into id and value                             
    function SplitIndex(s) {
        var spl = s.split(spDelim);
        this.id = spl[0];
        this.value = spl[1];
    }

    function pad(n) {
        return n < 10 ? "0" + n : n;
    }

    // James Padolsey's Regex Selector for jQuery http://james.padolsey.com/javascript/regex-selector-for-jquery/
    $.expr[':'].regex = function (elem, index, match) {
        var matchParams = match[3].split(','),
            validLabels = /^(data|css):/,
            attr = {
                method: matchParams[0].match(validLabels) ?
                    matchParams[0].split(':')[0] : 'attr',
                property: matchParams.shift().replace(validLabels, '')
            },
            regexFlags = 'ig',
            regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g, ''), regexFlags);
        return regex.test($(elem)[attr.method](attr.property));
    };


})(jQuery);