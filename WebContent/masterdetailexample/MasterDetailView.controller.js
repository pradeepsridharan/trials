sap.ui.controller("masterdetailexample.MasterDetailView", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf masterdetailexample.MasterDetailView
*/
	onInit: function() {
		console.log(this.getView().byId("splitAppId"));
		var splitApp  = this.getView().byId("splitAppId");
		

		var masterView = sap.ui.view({id:"idMasterView", viewName:"masterdetailexample.MasterView", type:sap.ui.core.mvc.ViewType.XML});
		var detailsView = sap.ui.view({id:"idDetailsView", viewName:"masterdetailexample.DetailsView", type:sap.ui.core.mvc.ViewType.XML});
//		
		splitApp.addMasterPage(masterView);
		splitApp.addDetailPage(detailsView);
		

	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf masterdetailexample.MasterDetailView
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf masterdetailexample.MasterDetailView
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf masterdetailexample.MasterDetailView
*/
//	onExit: function() {
//
//	}

});