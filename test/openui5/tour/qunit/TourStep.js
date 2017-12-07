sap.ui.require([
  'jquery.sap.global',
  'sap/m/Title',
  'sap/m/Page',
  'openui5/tour/TourStep',
  'sap/ui/thirdparty/sinon',
  'sap/ui/thirdparty/sinon-qunit'
], function($, Title, Page, TourStep) {
  'use strict';

  /*sap.ui.jsview('mlauffer.test.view', {
    getControllerName: function() {
      return '';
    },
    createContent: function() {
      const panel = new Panel(this.createId('panel'), {
        content: [ new Title({text: 'Title 1'}) ]
      });
      return new Page(this.createId('page'), {
        content: panel
      });
    }
  });

  function createView() {
    return sap.ui.view({
      type: sap.ui.core.mvc.ViewType.JS,
      viewName:'mlauffer.test.view'
    });
  }*/

  const { test } = QUnit;

  QUnit.module('TourStep', function() {
    QUnit.module('constructor', () => {
      test('Should instantiate the control', (assert) => {
        const tourStep = new TourStep();
        assert.deepEqual(tourStep.getTitle(), 0);
      });
    });
  });
});
