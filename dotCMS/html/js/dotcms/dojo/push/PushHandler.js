dojo.provide("dotcms.dojo.push.PushHandler");

dojo.require("dijit._Widget");
dojo.require("dijit.Dialog");
dojo.require("dotcms.dijit.RemotePublisherDialog");

dojo.declare("dotcms.dojo.push.PushHandler", null, {

    assetIdentifier: "",
    dialog: null,
    title: "",

    constructor: function (title) {
        this.title = title;
    },

    showDialog: function (assetId, displayDateFilter) {

        var dateFilter = false;
        if (displayDateFilter != undefined && displayDateFilter != null) {
            dateFilter = displayDateFilter;
        }

        this.assetIdentifier = assetId;
        dialog = new dotcms.dijit.RemotePublisherDialog();
        dialog.title = this.title;
        dialog.dateFilter = dateFilter;
        dialog.show();
    },

    showCategoryDialog: function () {
        this.assetIdentifier = "CAT";
        dialog = new dotcms.dijit.RemotePublisherDialog();
        dialog.title = this.title;
        dialog.dateFilter = false;
        dialog.show();
    },

    remoteUnPublish: function (assetId) {
        var xhrArgs = {
            url: "/DotAjaxDirector/com.dotcms.publisher.ajax.RemotePublishAjaxAction/cmd/unPublish",
            content: {
                'assetIdentifier': assetId
            },
            handleAs: "text",
            load: function (data) {
                if (data.indexOf("FAILURE") > -1) {
                    alert(data);
                }
            },
            error: function (error) {
                alert(error);
            }
        };

        var deferred = dojo.xhrPost(xhrArgs);
    },

    togglePublishExpireDivs: function () {

        var x = "publish";
        if (dijit.byId("iwtExpire").getValue() != false) {
            x = "expire";
        }
        else if (dijit.byId("iwtPublishExpire").getValue() != false) {
            x = "publishexpire";
        }

        if ("publish" == x) {
            dojo.style("publishTimeDiv", "display", "");
            dojo.style("expireTimeDiv", "display", "none");
        } else if ("publishexpire" == x) {
            dojo.style("publishTimeDiv", "display", "");
            dojo.style("expireTimeDiv", "display", "");
        }
        else {
            dojo.style("publishTimeDiv", "display", "none");
            dojo.style("expireTimeDiv", "display", "");
        }
    },

    /**
     * Returns the filter date value for the filtering box if there is any
     * @returns {string}
     * @private
     */
    _getFilterDate: function () {

        var filterDiv = dojo.byId("filterTimeDiv");
        if (filterDiv && filterDiv.style.display == "") {
            var filterDate = (dijit.byId("wfFilterDateAux") && dijit.byId("wfFilterDateAux") != 'undefined')
                ? dojo.date.locale.format(dijit.byId("wfFilterDateAux").getValue(), {datePattern: "yyyy-MM-dd", selector: "date"})
                    : (dojo.byId("wfFilterDateAux") && dojo.byId("wfFilterDateAux") != 'undefined')
                        ? dojo.date.locale.format(dojo.byId("wfFilterDateAux").value, {datePattern: "yyyy-MM-dd", selector: "date"})
                            : "";

            var filterTime = (dijit.byId("wfFilterTimeAux"))
                ? dojo.date.locale.format(dijit.byId("wfFilterTimeAux").getValue(), {timePattern: "H-m", selector: "time"})
                    : (dojo.byId("wfFilterTimeAux"))
                        ? dojo.date.locale.format(dojo.byId("wfFilterTimeAux").value, {timePattern: "H-m", selector: "time"})
                            : "";

            return filterDate + "-" + filterTime;
        } else {
            return "";
        }
    },

	remotePublish : function(){

		// BEGIN: PUSH PUBLISHING ACTIONLET

		var publishDate = (dijit.byId("wfPublishDateAux") && dijit.byId("wfPublishDateAux")!='undefined')
			? dojo.date.locale.format(dijit.byId("wfPublishDateAux").getValue(),{datePattern: "yyyy-MM-dd", selector: "date"})
				: (dojo.byId("wfPublishDateAux") && dojo.byId("wfPublishDateAux")!='undefined')
					? dojo.date.locale.format(dojo.byId("wfPublishDateAux").value,{datePattern: "yyyy-MM-dd", selector: "date"})
							: "";

		var publishTime = (dijit.byId("wfPublishTimeAux"))
			? dojo.date.locale.format(dijit.byId("wfPublishTimeAux").getValue(),{timePattern: "H-m", selector: "time"})
				: (dojo.byId("wfPublishTimeAux"))
					? dojo.date.locale.format(dojo.byId("wfPublishTimeAux").value,{timePattern: "H-m", selector: "time"})
							: "";


		var expireDate = (dijit.byId("wfExpireDateAux"))
			? dijit.byId("wfExpireDateAux").getValue()!=null ? dojo.date.locale.format(dijit.byId("wfExpireDateAux").getValue(),{datePattern: "yyyy-MM-dd", selector: "date"}) : ""
				: (dojo.byId("wfExpireDateAux"))
					? dojo.byId("wfExpireDateAux").value!=null ? dojo.date.locale.format(dojo.byId("wfExpireDateAux").value,{datePattern: "yyyy-MM-dd", selector: "date"}) : ""
							: "";

		var expireTime = (dijit.byId("wfExpireTimeAux"))
			? dijit.byId("wfExpireTimeAux").getValue()!=null ? dojo.date.locale.format(dijit.byId("wfExpireTimeAux").getValue(),{timePattern: "H-m", selector: "time"}) : ""
				: (dojo.byId("wfExpireTimeAux"))
					? dojo.byId("wfExpireTimeAux").value!=null ? dojo.date.locale.format(dojo.byId("wfExpireTimeAux").value,{timePattern: "H-m", selector: "time"}) : ""
							: "";

		var iWantTo = (dijit.byId("publishForm").attr('value').wfIWantTo)
		? dijit.byId("publishForm").attr('value').wfIWantTo
			: (dijit.byId("publishForm").attr('value').wfIWantTo)
				? dijit.byId("publishForm").attr('value').wfIWantTo
						: "";

		// END: PUSH PUBLISHING ACTIONLET


		// BEGIN: PUSH PUBLISHING ACTIONLET
        dojo.byId("assetIdentifier").value = this.assetIdentifier;
        dojo.byId("remotePublishDate").value = publishDate;
        dojo.byId("remotePublishTime").value = publishTime;
        dojo.byId("remotePublishExpireDate").value = expireDate;
        dojo.byId("remotePublishExpireTime").value = expireTime;
        dojo.byId("iWantTo").value = iWantTo;
        if (dojo.byId("remoteFilterDate")) {
            dojo.byId("remoteFilterDate").value = this._getFilterDate();
        }
		// END: PUSH PUBLISHING ACTIONLET

		var xhrArgs = {
			url: "/DotAjaxDirector/com.dotcms.publisher.ajax.RemotePublishAjaxAction/cmd/publish",
			form: dojo.byId("remotePublishForm"),
			handleAs: "text",
			load: function(data){
				if(data.indexOf("FAILURE") > -1){
					alert(data);
				}
				dialog.hide();
			},
			error: function(error){
				alert(error);
				dialog.hide();
			}
		};

		var deferred = dojo.xhrPost(xhrArgs);
	}

});