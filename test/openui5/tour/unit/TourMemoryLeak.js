sap.ui.define([
  'sap/ui/qunit/utils/MemoryLeakCheck',
  'openui5/tour/Tour'
],
function (MemoryLeakCheck, Tour) {
  "use strict";

  QUnit.module('Memory Leak Check', () => {
    MemoryLeakCheck.checkControl("openui5.tour.Tour", function () {
      return new Tour();
    }, null, true);
  });
});
