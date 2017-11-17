sap.ui.define([
  'sap/m/ResponsivePopover',
  'sap/ui/core/Control'
], function(ResponsivePopover, Control) {
  'use strict';

  var Tour = Control.extend('openui5.tour.Tour', {
    metadata: {
      library: 'openui5.tour',
      properties: {},
      defaultAggregation: 'steps',
      aggregations: {
        /**
         * The tour steps to be included in the control.
         */
        steps: {type: 'openui5.tour.TourStep', multiple: true, singularName: 'step'}
      },
      events: {
        /**
         * The start event is fired when the tour is started.
         */
        start: {
          parameters: {}
        },
        /**
         * The end event is fired when the tour is ended.
         */
        end: {
          parameters: {}
        }
      }
    }
  });

  Tour._currentStepIndex = 0;
  Tour._tourStarted = false;

  /**
   * Initialize tour object
   * @public
   */
  Tour.prototype.init = function () {
    /*this._currentStepIndex = 0;
    this._setCurrentStepIndex(0);
    this._tourStarted = false;*/
  };

  /**
   * Starts the tour, opens dialog step 0
   * @public
   */
  Tour.prototype.startTour = function() {
    this._setFirstStep();
    this._setLastStep();
    this._setCurrentStepIndex(0);
    this._goToStep(this._getCurrentStepIndex());
    this.fireStart();
  };

  /**
   * Ends tour object, closes dialog step
   * @public
   */
  Tour.prototype.endTour = function() {
    this._closeStep(this._getCurrentStepIndex());
    this._setCurrentStepIndex(0);
    this.fireEnd();
  };

  /**
   * Goes to the next step.
   * @public
   */
  Tour.prototype.nextStep = function() {
    var nextStep = this._getCurrentStepIndex() + 1;
    this._goToStep(nextStep);
  };

  /**
   * Goes to the previous step.
   * @public
   */
  Tour.prototype.previousStep = function() {
    var previousStep = this._getCurrentStepIndex() - 1;
    this._goToStep(previousStep);
  };

  /**
   * Returns the current step index
   * @returns {int} Current step index
   * @private
   */
  Tour.prototype._getCurrentStepIndex = function() {
    return this._currentStepIndex;
  };

  /**
   * Sets the current step index
   * @param {int} stepIndex The current step index
   * @private
   */
  Tour.prototype._setCurrentStepIndex = function(stepIndex) {
    this._currentStepIndex = stepIndex;
  };

  /**
   * Validates the given step.
   * @param {int} stepIndex The step index to be validated.
   * @returns {boolean} Returns if the step is valid.
   * @public
   */
  Tour.prototype._isValidStepIndex = function (stepIndex) {
    if (!this.getSteps()[stepIndex]) {
      throw new Error('Tour does not contain step index #' + stepIndex);
    }
    return true;
  };

  /**
   * Goes to the given step. The step must exist.
   * @param {int} stepIndex The step to go to.
   * @private
   */
  Tour.prototype._goToStep = function (stepIndex) {
    this._closeStep(this._getCurrentStepIndex());
    this._setCurrentStepIndex(stepIndex);
    this._openStep(stepIndex);
  };

  /**
   * Opens a given step.
   * @param {int} stepIndex The step to open.
   * @private
   */
  Tour.prototype._openStep = function(stepIndex) {
    if (this._isValidStepIndex(stepIndex)) {
      this.getSteps()[stepIndex].open();
    }
  };

  /**
   * Closes a given step.
   * @param {int} stepIndex The step to close.
   * @private
   */
  Tour.prototype._closeStep = function(stepIndex) {
    if (this._isValidStepIndex(stepIndex)) {
      this.getSteps()[stepIndex].close();
    }
  };

  /**
   * Sets the first step of the tour.
   * @private
   */
  Tour.prototype._setFirstStep = function() {
    var firstStep = 0;
    if (this._isValidStepIndex(firstStep)) {
      this.getSteps()[firstStep].setIsFirstStep(true);
    }
  };

  /**
   * Sets the last step of the tour.
   * @private
   */
  Tour.prototype._setLastStep = function() {
    var lastStep = this.getSteps().length - 1;
    if (this._isValidStepIndex(lastStep)) {
      this.getSteps()[lastStep].setIsLastStep(true);
    }
  };

  return Tour;
});
