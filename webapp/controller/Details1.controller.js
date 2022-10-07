sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("fioriapp2.controller.Details1", {
            onInit: function () {

                sap.ui.getCore().sapAppID = this.getOwnerComponent()
                    .getMetadata()
                    .getManifest()["sap.app"].id;
                    const oRouter = this.getOwnerComponent().getRouter();
                    oRouter.getRoute("Details1").attachPatternMatched(this._onRouteMatched, this);
            },
            _onRouteMatched: function (oEvent) {
                //   alert(oEvent.getParameter("arguments").parameter.split(';'));
                var sId = oEvent.getParameter("arguments").ID;
                const that = this;
                jQuery.ajax({
                    url: jQuery.sap.getModulePath(
                        sap.ui.getCore().sapAppID +
                        "/sflight/Customers/" + sId,
                    ),
                    contentType: "application/json",
                    type: "GET",
                    dataType: "json",
                    async: false,
                    success: function (oCustomers) {
                        const oModel = new JSONModel(oCustomers);
                        that.getView().setModel(oModel);
                    },
                    error: function (error) {
                        sap.m.MessageToast.show("Error");
                    },
                });
            },


            onPress: function () {
                const that = this;
                jQuery.ajax({
                    url: jQuery.sap.getModulePath(
                        sap.ui.getCore().sapAppID +
                        "/sflight/Customers",
                    ),
                    contentType: "application/json",
                    type: "GET",
                    dataType: "json",
                    async: false,
                    success: function (oCompleteEntry) {
                        console.log(oCompleteEntry)
                        var oModel = new JSONModel(oCompleteEntry);
                        that.getView().setModel(oModel);
                    },
                    error: function (error) {
                        sap.m.MessageToast.show("Error");
                    },
                });

            },
            
            onSubmit: function (oEvent) {
                //   alert(oEvent.getParameter("arguments").parameter.split(';'));
              const oCustomer = this.getView().getModel().getData();
              const sId = oCustomer.ID
              delete oCustomer.ID
              delete oCustomer["@odata.context"]
                const that = this;
                jQuery.ajax({
                    url: jQuery.sap.getModulePath(
                        sap.ui.getCore().sapAppID +
                        "/sflight/Customers/" + sId,
                    ),
                    contentType: "application/json",
                    type: "PUT",
                    dataType: "json",
                    data: JSON.stringify(oCustomer),
                    async: false,
                    success: function (oCustomers) {
                        const oModel = new JSONModel(oCustomers);
                        that.getView().setModel(oModel);
                        sap.m.MessageToast.show("Success");
                    },
                    error: function (error) {
                        sap.m.MessageToast.show("Error");
                    },
                });
            }, 




        });
    });
