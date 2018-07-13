sap.ui.require([
  'jquery.sap.global',
  'sap/m/Panel',
  'sap/m/Title',
  'sap/m/Page',
  'openui5/tour/Tour',
  'openui5/tour/TourStep'
], function($, Panel, Title, Page, Tour, TourStep) {
  'use strict';

  sap.ui.jsview('mlauffer.test.view', {
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
  }

  function createTourStep(target) {
    return new TourStep({
      content: new sap.m.Text({ text: 'Hey! It is a tour!' }),
      target: target,
      title: 'Tour step...'
    });
  }

  const { test } = QUnit;

  QUnit.module('Tour', function() {
    QUnit.module('constructor', () => {
      test('Should instantiate the control', (assert) => {
        const tour = new Tour();
        assert.deepEqual(tour._getCurrentStepIndex(), 0);
        assert.deepEqual(tour.getSteps().length, 0);
      });
      test('Should instantiate the control with 2 steps', (assert) => {
        const tour = new Tour({
          steps: [createTourStep(), createTourStep()]
        });
        assert.deepEqual(tour._getCurrentStepIndex(), 0);
        assert.deepEqual(tour.getSteps().length, 2);
      });
    });

    QUnit.module('_getCurrentStepIndex', () => {
      test('Should return the current step index', (assert) => {
        const tour = new Tour();
        tour._setCurrentStepIndex(10);
        assert.deepEqual(tour._getCurrentStepIndex(), 10);
      });
    });

    QUnit.module('_setCurrentStepIndex', () => {
      test('Should set the current step index', (assert) => {
        const tour = new Tour();
        tour._setCurrentStepIndex(10);
        assert.deepEqual(tour._getCurrentStepIndex(), 10);
      });
    });

    QUnit.module('_isValidStepIndex', () => {
      test('Should return step index is valid', (assert) => {
        const tour = new Tour({
          steps: [createTourStep(), createTourStep()]
        });
        assert.deepEqual(tour._isValidStepIndex(1), true);
      });

      test('Should return step index is invalid for empty steps', (assert) => {
        const tour = new Tour();
        try {
          tour._isValidStepIndex(0);
          assert.deepEqual(true, false, 'Should never be executed!');
        } catch (e) {
          assert.deepEqual(e instanceof Error, true);
        }
      });

      test('Should return step index is invalid for a lower value', (assert) => {
        const tour = new Tour({
          steps: [createTourStep(), createTourStep()]
        });
        try {
          tour._isValidStepIndex(-1);
          assert.deepEqual(true, false, 'Should never be executed!');
        } catch (e) {
          assert.deepEqual(e instanceof Error, true);
        }
      });

      test('Should return step index is invalid for a higher value', (assert) => {
        const tour = new Tour({
          steps: [createTourStep(), createTourStep()]
        });
        try {
          tour._isValidStepIndex(3);
          assert.deepEqual(true, false, 'Should never be executed!');
        } catch (e) {
          assert.deepEqual(e instanceof Error, true);
        }
      });
    });



    QUnit.module('_goToStep', () => {
      test('Should close current step, set new current step and open it', (assert) => {
        const view = createView();
        view.placeAt('content');
        sap.ui.getCore().applyChanges();
        const tour = new Tour({
          steps: [createTourStep(view.byId('panel')), createTourStep(view.byId('panel'))]
        });
        tour._goToStep(1);
        const step = tour.getSteps()[1];
        step.open();
        assert.deepEqual(step.getAggregation('_popup').isOpen(), true);
        assert.deepEqual(tour._getCurrentStepIndex(), 1);
        tour.destroy();
        view.destroy();
      });
    });

    QUnit.module('_setFirstStep', () => {
      test('Should set the first step', (assert) => {
        const tour = new Tour({
          steps: [createTourStep(), createTourStep()]
        });
        tour._setFirstStep();
        assert.deepEqual(tour.getSteps()[0]._isFirstStep, true);
        assert.deepEqual(tour.getSteps()[1]._isFirstStep, false);
      });
    });

    QUnit.module('_setLastStep', () => {
      test('Should set the last step', (assert) => {
        const tour = new Tour({
          steps: [createTourStep(), createTourStep()]
        });
        tour._setLastStep();
        assert.deepEqual(tour.getSteps()[0]._isLastStep, false);
        assert.deepEqual(tour.getSteps()[1]._isLastStep, true);
      });
    });

    QUnit.module('start', () => {
      test('Should open first step and start tour', (assert) => {
        const view = createView();
        view.placeAt('content');
        sap.ui.getCore().applyChanges();
        const tour = new Tour({
          steps: [createTourStep(view.byId('panel')), createTourStep()]
        });
        tour.start();
        assert.deepEqual(tour._getCurrentStepIndex(), 0);
        assert.deepEqual(tour.getSteps()[0].getAggregation('_popup').isOpen(), true);
        tour.destroy();
        view.destroy();
      });
    });

    QUnit.module('complete', () => {
      test('Should close current step and finish tour', (assert) => {
        const done = assert.async();
        const view = createView();
        view.placeAt('content');
        sap.ui.getCore().applyChanges();
        const tour = new Tour({
          steps: [createTourStep(view.byId('panel')), createTourStep(view.byId('panel'))]
        });
        tour.start();
        tour.nextStep();
        tour.complete();
        assert.deepEqual(tour._getCurrentStepIndex(), 0);
        setTimeout(() => {
          assert.deepEqual(tour.getSteps()[0].getAggregation('_popup').isOpen(), false);
          tour.destroy();
          view.destroy();
          done();
        }, 500);
      });
    });

    QUnit.module('nextStep', () => {
      test('Should open the next step', (assert) => {
        const view = createView();
        view.placeAt('content');
        sap.ui.getCore().applyChanges();
        const tour = new Tour({
          steps: [createTourStep(view.byId('panel')), createTourStep(view.byId('panel'))]
        });
        tour.start();
        tour.nextStep();
        assert.deepEqual(tour._getCurrentStepIndex(), 1);
        tour.destroy();
        view.destroy();
      });
      test('Should fail when next step does not exist', (assert) => {
        const view = createView();
        view.placeAt('content');
        sap.ui.getCore().applyChanges();
        const tour = new Tour({
          steps: [createTourStep(view.byId('panel')), createTourStep(view.byId('panel'))]
        });
        tour.start();
        try {
          tour.nextStep();
          tour.nextStep();
          assert.deepEqual(false, true, 'Should not be executed...');
        } catch (e) {
          assert.deepEqual(e instanceof Error, true);
        }
        tour.destroy();
        view.destroy();
      });
    });

    QUnit.module('previousStep', () => {
      test('Should open the previous step', (assert) => {
        const view = createView();
        view.placeAt('content');
        sap.ui.getCore().applyChanges();
        const tour = new Tour({
          steps: [createTourStep(view.byId('panel')), createTourStep(view.byId('panel'))]
        });
        tour.start();
        tour.nextStep();
        tour.previousStep();

        const done = assert.async();
        setTimeout(function() {
          assert.deepEqual(tour._getCurrentStepIndex(), 0);
          done();
          tour.destroy();
          view.destroy();
        }, 500);
      });

      test('Should fail when previous step does not exist', (assert) => {
        const view = createView();
        view.placeAt('content');
        sap.ui.getCore().applyChanges();
        const tour = new Tour({
          steps: [createTourStep(view.byId('panel')), createTourStep(view.byId('panel'))]
        });
        tour.start();
        try {
          tour.previousStep();
          assert.deepEqual(false, true, 'Should not be executed...');
        } catch (e) {
          assert.deepEqual(e instanceof Error, true);
        }
        tour.destroy();
        view.destroy();
      });
    });
  });
});
