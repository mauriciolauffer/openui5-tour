'use strict';

QUnit.config.autostart = false;
QUnit.config.reorder = false;

sap.ui.getCore().attachInit(function() {
  sap.ui.require([
    'openui5/tour/library',
    'test/unit/allTests'
  ], function() {
    QUnit.start();
  });
});
