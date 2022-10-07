sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("fioriapp2.controller.View1", {
            onInit: function () {

                sap.ui.getCore().sapAppID = this.getOwnerComponent()
                    .getMetadata()
                    .getManifest()["sap.app"].id;
                    const oRouter = this.getOwnerComponent().getRouter();
                    this.oRouter = this.getOwnerComponent().getRouter();
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

            onListItemPress: function (evt) {

                const sId = evt.getSource().getBindingContext().getObject().ID
                this.oRouter.navTo("Details1", {ID: sId});
            }

        });
    });
