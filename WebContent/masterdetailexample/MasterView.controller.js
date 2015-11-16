sap.ui.controller("masterdetailexample.MasterView", {
	

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf masterdethis.itemListFactoryFunction.bind(this)tailexample.MasterView
*/
	onInit: function() {
		
		oModel = this.makeCallToGetJson('');
		var itemList = this.getView().byId("idItemList");
		this.getView().setModel(oModel,"root");
		
		itemList.bindAggregation("items","root>/root",this.itemListFactoryFunction.bind(this));//

//		console.log(itemList);
		
//		idea is to get the model in the action press item. (actualData)
//		Go to the context shown by the press item name.
//		change it from child to CHILDREN
	
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf masterdetailexample.MasterView,"async",true
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf masterdetailexample.MasterView
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf masterdetailexample.MasterView
*/
//	onExit: function() {pressedItem.getId();
//
//	}
	
	onPressActionListItem: function(oEvent){
		

		var pressedItem = oEvent.getSource();
		var pressedItemId = pressedItem.getId();
		var value = pressedItem.data("custParentId");
		var pgMstVw = this.getView().byId("pgMstVw");
//		pgMstVw.setTitle(pressedItem.getText());
		pgMstVw.data("custParentId",value);
		var oModel = this.makeCallToGetJson(pressedItemId);
		console.log(oModel);
		this.getView().setModel(oModel,pressedItemId);
		this.refreshItemList(pressedItemId);
		
		
	},
	
	onPageNavButtonPressOrTap: function(oEvent){
		var pgMstVw = this.getView().byId("pgMstVw");
		var parentOrgCode = pgMstVw.data("custParentId");

		var parentModel = this.getView().getModel(parentOrgCode);
		if(parentModel == null)
		{
			var oModel = this.makeCallToGetJson(parentOrgCode);
			this.getView().setModel(oModel,parentOrgCode);
			
		}
		this.refreshItemList(parentOrgCode);
//		pgMstVw.setTitle()		

	},

	refreshItemList: function(currModelName){
		var idItemList = this.getView().byId("idItemList");
		idItemList.destroyItems();
		idItemList.bindAggregation("items",currModelName+">/root",this.itemListFactoryFunction.bind(this));
	},
	
	makeCallToGetJson: function(param){
		
		console.log('Make Call to get Json');
		
		var oModel = new sap.ui.model.json.JSONModel();
		var qs = '';
		if(param != '')
			qs = "param="+param;
		oModel.loadData("/DataProviderWeb/index.jsp",qs);
		
		console.log("IN THE CALL");
		return oModel;
	},
	
	itemListFactoryFunction: function(sId, oContext){
		var id= oContext.getProperty("id")
		var parentId = oContext.getProperty("parentId");
		var title = oContext.getProperty("name");
		var uiControl = new sap.m.ActionListItem(id,{text:title});
		uiControl.data("custParentId",parentId)
		uiControl.attachPress(this.onPressActionListItem,this);
		return uiControl;
		
	},

});