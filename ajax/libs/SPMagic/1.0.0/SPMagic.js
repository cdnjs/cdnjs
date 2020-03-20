window.SPMagic = window.SPMagic || {};

SPMagic.getWeb = function (context, hostUrl) {
    var web = null;

    if (hostUrl) {
        var hostContext = new SP.AppContextSite(context, hostUrl);
        web = hostContext.get_web();
    } else {
        web = context.get_web();
    }

    return web;
}

SPMagic.URLGenerator = function (url, hostUrl) {
    if (hostUrl) {
        var api = "_api/";
        var index = url.indexOf(api);
        url = url.slice(0, index + api.length) +
            "SP.AppContextSite(@target)" +
            url.slice(index + api.length - 1);

        var connector = "?";
        if (url.indexOf("?") > -1 && url.indexOf("$") > -1) {
            connector = "&";
        }

        url = url + connector + "@target='" + hostUrl + "'";
    }

    return url;
}

SPMagic.WebRepository = function () {

    function getProperties(appUrl, hostUrl, callback) {
        var url = appUrl + "/_api/Web/AllProperties";
        url = SPMagic.URLGenerator(url, hostUrl);

        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            headers: {
                Accept: "application/json;odata=verbose"
            }
        });
        
    }

    function setProperty(name, value, appUrl, hostUrl) {
        var dfd = new jQuery.Deferred();

        var context = SP.ClientContext.get_current();
        var web = SPMagic.getWeb(context, hostUrl);
        var props = web.get_allProperties();

        props.set_item(name, value);
        web.update();
        context.executeQueryAsync(success, fail);

        function success() {
            dfd.resolve();
        }

        function fail(sender, args) {
            dfd.reject(args);
        }

        return dfd.promise();
    }

    function getPermissions(appUrl, hostUrl, callback) {
        var url = appUrl + "/_api/Web/effectiveBasePermissions";
        url = SPMagic.URLGenerator(url, hostUrl);

        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            headers: {
                Accept: "application/json;odata=verbose"
            }
        });
        
    }

    return {
        getProperties: getProperties,
        setProperty: setProperty,
        getPermissions: getPermissions
    }
}

SPMagic.UserManager = function (appUrl, hostUrl) {

    function getCurrentUser(callback) {

        var listUrl = "/_api/web/currentuser";

        var url = appUrl + listUrl;
        url = SPMagic.URLGenerator(url, hostUrl);

        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            headers: {
                Accept: "application/json;odata=verbose"
            }
        });

    }

    function getUserProfilePicture(siteUrl, imageSize) {

        var url;

        return getCurrentUser().then(function (res) {

            var userEmail = res.d.Email;
            return siteUrl + "/_layouts/15/userphoto.aspx?size=" + imageSize + "&username=" + userEmail;
            

        }, function (err) {

            return err;
            });
        
    }

    return {
        getCurrentUser: getCurrentUser,
        getUserProfilePicture: getUserProfilePicture
    }
}

SPMagic.ListManager = function (appUrl, hostUrl, ListName) {

	var listUrl = "/_api/Web/Lists/getByTitle('" + ListName + "')";

	function getListItemEntityTypeFullName() {

		var list = listUrl + "/ListItemEntityTypeFullName";
		var url = appUrl + list;

		url = SPMagic.URLGenerator(url, hostUrl);

		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "json",
			headers: {
				Accept: "application/json;odata=verbose"
			}
		});
		

	}

	function getListItemwithFilter(filter, value, orderby, top, callback) {

		if (!orderby) orderby = "Id";
		if (!top) top = 15;

		var url = appUrl + listUrl + "/Items?$select=*&$filter=" + filter + " eq '" + value + "'&$orderby=" + orderby + "&$top=" + top;
		url = SPMagic.URLGenerator(url, hostUrl);

		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "json",
			headers: {
				Accept: "application/json;odata=verbose"
			}
		});

	}

	function getAllListItems(orderby, top, callback) {
		if (!orderby) orderby = "Id";
		if (!top) top = 15;

		var url = appUrl + listUrl + "/Items?$select=*&$orderby=" + orderby + "&$top=" + top;
		url = SPMagic.URLGenerator(url, hostUrl);

		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "json",
			headers: {
				Accept: "application/json;odata=verbose"
			}
		});

	}

	function getListItem(id) {
		if (!id) id = "1";

		var url = appUrl + listUrl + "/Items(" + id + ")";
		url = SPMagic.URLGenerator(url, hostUrl);

		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "json",
			headers: {
				Accept: "application/json;odata=verbose"
			}
		});

	}

	function createListItem(data, formDigest) {
		var url = appUrl + listUrl + "/Items";
		url = SPMagic.URLGenerator(url, hostUrl);

		return jQuery.ajax({
			url: url,
			type: "POST",
			data: data,
			headers: {
				Accept: "application/json;odata=verbose",
				"Content-Type": "application/json;odata=verbose",
				"X-RequestDigest": formDigest
			}
		});
		
	}

	function getNextListItemId() {
		var dfd = new jQuery.Deferred();

		var url = appUrl + listUrl + "/Items?$top=1&$select=ID&$orderby=ID desc";
		url = SPMagic.URLGenerator(url, hostUrl);

		var call = jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "json",
			headers: {
				Accept: "application/json;odata=verbose"
			}
		});

		call.done(function (data, textStatus, jqXHR) {
			var itemId = 1;

			if (data.d.results.length === 1) {
				itemId = data.d.results[0].ID + 1;
			}

			dfd.resolve(itemId);
		});
		call.fail(function (jqXHR, textStatus, errorThrown) {
			dfd.resolve(0);
		});

		return dfd.promise();
	}

	function failHandler(jqXHR, textStatus, errorThrown) {
		var response = "";
		try {
			var parsed = JSON.parse(jqXHR.responseText);
			response = parsed.error.message.value;
		} catch (e) {
			response = jqXHR.responseText;
		}
		return response;
	}



	return {
		getListItemwithFilter: getListItemwithFilter,
		getAllListItems: getAllListItems,
		getListItem: getListItem,
		createListItem: createListItem,
		getListItemEntityTypeFullName: getListItemEntityTypeFullName,
		getNextListItemId: getNextListItemId,
		failHandler: failHandler

	}

}
