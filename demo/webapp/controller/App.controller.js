sap.ui.define([
  'sap/m/Button',
  'sap/m/PlacementType',
  'sap/m/Text',
  'sap/ui/core/mvc/Controller',
  'openui5/tour/Tour',
  'openui5/tour/TourStep'
], function(Button, PlacementType, Text, Controller, Tour, TourStep) {
  'use strict';

  return Controller.extend('mlauffer.demo.openui5.tour.controller.App', {
    _tour: null,

    onInit: function() {
      const tourSteps = [
        new TourStep({
          content: new Text({ text: 'Hey! It is a tour!' }),
          target: this.getView().byId('panel2'),
          title: 'Tour test step1...'
        }),

        new TourStep({
          content: new Button({ text: 'Hey! It is a tour!' }),
          target: this.getView().byId('panel4'),
          title: 'Tour test step2...'
        }),

        new TourStep({
          content: new Text({ text: 'Hey! It is a tour!' }),
          target: this.getView().byId('title3'),
          title: 'Tour test step3...',
          placement: PlacementType.Right
        }),

        new TourStep({
          content: new Button({ text: 'Hey! It is a tour!' }),
          target: this.getView().byId('panel5'),
          title: 'Tour test step4...',
          placement: PlacementType.Top
        }),

        new TourStep({
          content: new Text({ text: 'Hey! It is a tour!' }),
          target: this.getView().byId('panel1'),
          title: 'Tour test step5...'
        })
      ];

      this._tour = new Tour({
        steps: tourSteps,
        started: function() {console.dir('Tour has started...');},
        completed: function(){console.dir('Tour has ended...');},
        nextStep: function(){console.dir('next step called from tour...');},
        previousStep: function(){console.dir('previous step called from tour...');}
      });
    },

    onStartTour: function() {
      this._tour.start();
    }
  });
});
