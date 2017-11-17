sap.ui.define([
  'sap/m/PlacementType',
  "sap/ui/core/mvc/Controller",
  "openui5/tour/Tour",
  "openui5/tour/TourStep"
], function(PlacementType, Controller, Tour, TourStep) {
  "use strict";

  return Controller.extend("mlauffer.demo.openui5.tour.controller.App", {
    _tour: null,

    onInit: function() {
      const tourSteps = [
        new TourStep({
          content: new sap.m.Text({ text: 'Hey! It is a tour!' }),
          target: this.getView().byId('panel2'),
          title: 'Tour test step1...',
          nextStep: function(){console.dir('next pressed from tour step1...')},
          previousStep: function(){console.dir('previous pressed from tour step1...')}
        }),

        new TourStep({
          content: new sap.m.Text({ text: 'Hey! It is a tour!' }),
          target: this.getView().byId('panel4'),
          title: 'Tour test step2...',
          nextStep: function(){console.dir('next pressed from tour step2...')},
          previousStep: function(){console.dir('previous pressed from tour step2...')}
        }),

        new TourStep({
          content: new sap.m.Text({ text: 'Hey! It is a tour!' }),
          target: this.getView().byId('title3'),
          title: 'Tour test step3...',
          placement: PlacementType.Right,
          nextStep: function(){console.dir('next pressed from tour step3...')},
          previousStep: function(){console.dir('previous pressed from tour step3...')}
        }),

        new TourStep({
          content: new sap.m.Text({ text: 'Hey! It is a tour!' }),
          target: this.getView().byId('panel5'),
          title: 'Tour test step4...',
          placement: PlacementType.Top,
          nextStep: function(){console.dir('next pressed from tour step4...')},
          previousStep: function(){console.dir('previous pressed from tour step4...')}
        }),

        new TourStep({
          content: new sap.m.Text({ text: 'Hey! It is a tour!' }),
          target: this.getView().byId('panel1'),
          title: 'Tour test step5...',
          nextStep: function(){console.dir('next pressed from tour step5...')},
          previousStep: function(){console.dir('previous pressed from tour step5...')}
        })
      ];

      this._tour = new Tour({
        steps: tourSteps,
        start: function() {console.dir('Tour has started...')},
        end: function(){console.dir('Tour has ended...')}
      });
    },

    onStartTour: function() {
      this._tour.startTour();
    }
  });
});
