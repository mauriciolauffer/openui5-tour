sap.ui.define([
  'sap/m/Button',
  'sap/m/MessageToast',
  'sap/m/PlacementType',
  'sap/m/Text',
  'sap/ui/core/mvc/Controller',
  'openui5/tour/Tour',
  'openui5/tour/TourStep',
], function(Button, MessageToast, PlacementType, Text, Controller, Tour, TourStep) {
  'use strict';

  return Controller.extend('mlauffer.demo.openui5.tour.controller.App', {
    _tour: null,

    onInit: function() {
      const resourceBundle = this.getOwnerComponent().getModel('i18n').getResourceBundle();
      const tourSteps = [
        new TourStep({
          content: new Text({text: resourceBundle.getText('tour')}),
          target: this.getView().byId('panel2'),
          title: resourceBundle.getText('step', 1),
        }),

        new TourStep({
          content: new Button({text: resourceBundle.getText('tour')}),
          target: this.getView().byId('toolbar'),
          title: resourceBundle.getText('step', 2),
        }),

        new TourStep({
          content: new Text({text: resourceBundle.getText('tour')}),
          target: this.getView().byId('title3'),
          title: resourceBundle.getText('step', 3),
          placement: PlacementType.Right,
        }),

        new TourStep({
          content: new Button({text: resourceBundle.getText('tour')}),
          target: this.getView().byId('panel5'),
          title: resourceBundle.getText('step', 4),
          placement: PlacementType.Top,
        }),

        new TourStep({
          content: new Text({text: resourceBundle.getText('tour')}),
          target: this.getView().byId('panel1'),
          title: resourceBundle.getText('step', 5),
        }),
      ];

      this._tour = new Tour({
        steps: tourSteps,
        started: function() {
          MessageToast.show(resourceBundle.getText('started'));
        },
        completed: function() {
          MessageToast.show(resourceBundle.getText('completed'));
        },
        nextStep: function() {
          MessageToast.show(resourceBundle.getText('nextStep'));
        },
        previousStep: function() {
          MessageToast.show(resourceBundle.getText('previousStep'));
        },
      });
    },

    onStartTour: function() {
      this._tour.start();
    },
  });
});
