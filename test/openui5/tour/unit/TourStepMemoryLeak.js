sap.ui.define([
  'sap/ui/qunit/utils/MemoryLeakCheck',
  'sap/m/Text',
  'openui5/tour/Tour',
  'openui5/tour/TourStep'
],
function (MemoryLeakCheck, Text, Tour, TourStep) {
  "use strict";

  function buildTarget() {
    const target = new Text();
    target.placeAt('qunit-fixture');
    sap.ui.getCore().applyChanges();
    return target;
  }

  function buildTourStep() {
    return new TourStep({
      content: new Text({text: 'Hey! It is a tour!'}),
      target: target,
      title: 'Test TourStep'
    });
  }

  let target = buildTarget();

  MemoryLeakCheck.checkControl("openui5.tour.TourStep", function () {
    return new Tour({steps: [buildTourStep(), buildTourStep()]});
  }, null, true);
});
