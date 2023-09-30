sap.ui.define([

    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Core",
    "sap/ui/layout/HorizontalLayout",
    "sap/ui/layout/VerticalLayout",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Label",
    "sap/m/Input",
    "sap/m/library",
    "sap/m/MessageToast",
    "sap/m/Text",
    "sap/m/TextArea",
    "sap/ui/core/library"
], function (Controller, Core, HorizontalLayout, VerticalLayout, Dialog, Button, Label, Input, mobileLibrary, MessageToast, Text, TextArea,coreLibrary) {
    'use strict';
    // shortcut for sap.m.ButtonType
    var ButtonType = mobileLibrary.ButtonType;

    // shortcut for sap.m.DialogType
    var DialogType = mobileLibrary.DialogType;

    // shortcut for sap.ui.core.ValueState
	var ValueState = coreLibrary.ValueState;

    return {
        AddQuestion: function (oEvent) {
            var that = this;
            if (!this.oSubmitDialog) {
                this.oSubmitDialog = new Dialog({
                    type: DialogType.Message,
                    title: "Questions Count Dialog",
                    content: [
                        new Label({
                            text: oEvent.getObject(oEvent.getPath()).title,
                            labelFor: "questionCount"
                        }),
                        new Input("questionCount", {
                            width: "100%",
                            placeholder: "Add number of questions",
                            type: "Number",
                            liveChange: function (oEvent) {
                                var nQuestionCount = oEvent.getParameter("value");
                                this.oSubmitDialog.getBeginButton().setEnabled(nQuestionCount.length > 0);
                            }.bind(this)
                        })
                    ],
                    beginButton: new Button({
                        type: ButtonType.Emphasized,
                        text: "Submit",
                        enabled: false,
                        press: function () {                            
                            var oModel = this.getModel();
                            //var oActivityCreateContext = this.getCreateContext();
                            let bindingContext = this.getBindingContext();
                            var oActionODataContextBinding = oModel.bindContext(oEvent.getPath()+"/DevChallengeService.assignQuestionsToTest(...)");
                            oActionODataContextBinding.setParameter("questionsCount", parseInt(Core.byId("questionCount").getValue()));
                            oActionODataContextBinding.execute().then(
                                function () {
                                    var oActionContext = oActionODataContextBinding.getBoundContext();
                                    bindingContext.refresh()
                                    that.oSubmitDialog.close();
                                    if (!this.oInfoMessageDialog) {
                                        this.oInfoMessageDialog = new Dialog({
                                            type: DialogType.Message,
                                            title: "Information",
                                            state: ValueState.Information,
                                            content: new Text({ text: oActionContext.getObject().value}),
                                            beginButton: new Button({
                                                type: ButtonType.Emphasized,
                                                text: "OK",
                                                press: function () {
                                                    this.oInfoMessageDialog.close();
                                                    this.oInfoMessageDialog=undefined;
                                                }.bind(this)
                                            })
                                        });
                                    }                        
                                    this.oInfoMessageDialog.open();
                                    console.log(oActionContext.getObject().value);
                                }.bind(this)
                            );                        
                        }.bind(this)
                    }),
                    endButton: new Button({
                        text: "Cancel",
                        press: function () {
                            this.oSubmitDialog.close();
                        }.bind(this)
                    })
                });
            }

            this.oSubmitDialog.open();
        }
    };
});
