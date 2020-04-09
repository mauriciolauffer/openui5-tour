/*
 * openui5-tour
 * (c) Copyright 2017-2020 Mauricio Lauffer
 * Licensed under the MIT license. See LICENSE file in the project root for full license information.
 */

sap.ui.define([
  'sap/m/Button',
  'sap/m/ButtonType',
  'sap/m/PlacementType',
  'sap/m/ResponsivePopover',
  'sap/ui/core/Control'
],
/**
 * Module Dependencies
 *
 * @param {typeof sap.m.Button} Button UI5 button
 * @param {typeof sap.m.ButtonType} ButtonType UI5 button type
 * @param {typeof sap.m.PlacementType} PlacementType UI5 placement type
 * @param {typeof sap.m.ResponsivePopover} ResponsivePopover UI5 Responsive popover
 * @param {typeof sap.ui.core.Control} Control UI5 control to be extended
 * @returns {object} TourStep control, an extended UI5 control
 */
function(Button, ButtonType, PlacementType, ResponsivePopover, Control) {
  'use strict';

  /**
   * OpenUI5 TourStep.
   * Tour Step is a popup with the details to be displayed
   *
   * @author Mauricio Lauffer
   * @version 0.0.20
   *
   * @class
   * @namespace
   * @name openui5.tour
   * @public
   * @alias openui5.tour.TourStep
   */
  const TourStep = Control.extend('openui5.tour.TourStep', {
    metadata: {
      library: 'openui5.tour',
      properties: {
        /**
         * Determines the title of the step. The title is visualized in the dialog control.
         */
        title: {type: 'string', group: 'Appearance', defaultValue: ''},
        /**
         * Determines the icon that is displayed for this step.
         * This property only takes effect on phone. Please see the documentation sap.m.Dialog#icon.
         */
        icon: {type: 'sap.ui.core.URI', group: 'Appearance', defaultValue: ''},
        /**
         * Determines the UI5/DOM object which will be the reference for the dialog.
         */
        target: {type: 'object', group: 'Behavior', defaultValue: ''},
        /**
         * Determines where the dialog will be placed.
         * This property only takes effect on desktop or tablet. Please see the documentation sap.m.Popover#placement.
         */
        placement: {type: 'sap.m.PlacementType', group: 'Behavior', defaultValue: PlacementType.PreferredTopOrFlip}
      },
      defaultAggregation: 'content',
      aggregations: {
        /**
         * Content is supported by both variants. Please see the documentation on sap.m.Popover#content and sap.m.Dialog#content
         */
        content: {type: 'sap.ui.core.Control', multiple: false},
        /**
         * The internal popup instance which is either a dialog on phone or a popover on the rest of platforms
         */
        _popup: {type: 'sap.ui.core.Control', multiple: false, visibility: 'hidden'}
      }
    }
  });

  /**
   * Initializes step object
   * @public
   */
  TourStep.prototype.init = function() {
    this.setIsFirstStep(false);
    this.setIsLastStep(false);
  };

  /**
   * Destroys all content on tour step
   * @public
   */
  TourStep.prototype.exit = function() {
  };

  /**
   * Opens dialog step
   * @public
   */
  TourStep.prototype.open = function() {
    if (!this.getTarget()) {
      throw new Error('The step you are trying to open has no target assigned.');
    }
    if (!this.getAggregation('_popup')) {
      this.setAggregation('_popup', this._getPopup());
    }
    this.getTarget().getDomRef().scrollIntoView();
    this.getAggregation('_popup').openBy(this.getTarget());
  };

  /**
   * Closes dialog step
   * @public
   */
  TourStep.prototype.close = function() {
    if (this.getAggregation('_popup') && this.getAggregation('_popup').isOpen()) {
      this.getAggregation('_popup').close();
    }
  };

  /**
   * Sets step as the first one in the tour
   *
   * @param {boolean} isFirstStep Whether the step is the first one or not
   * @public
   */
  TourStep.prototype.setIsFirstStep = function(isFirstStep) {
    this._isFirstStep = (isFirstStep);
  };

  /**
   * Sets steps as the last one in the tour
   *
   * @param {boolean} isLastStep Whether the step is the last one or not
   * @public
   */
  TourStep.prototype.setIsLastStep = function(isLastStep) {
    this._isLastStep = (isLastStep);
  };

  /**
   * Sets popup as first step
   *
   * @param {typeof sap.m.ResponsivePopover} popup Tour step's popup
   * @private
   */
  TourStep.prototype._setFirstStep = function(popup) {
    popup.getBeginButton().setEnabled(false);
  };

  /**
   * Sets popup as last step
   *
   * @param {typeof sap.m.ResponsivePopover} popup Tour step's popup
   * @private
   */
  TourStep.prototype._setLastStep = function(popup) {
    this._setFinishButton(popup);
  };

  /**
   * Gets Tour Step's popup
   *
   * @returns {typeof sap.m.ResponsivePopover} Tour step's popup
   * @private
   */
  TourStep.prototype._getPopup = function() {
    if (this.getContent()) {
      this.getContent().addStyleClass('sapUiSmallMargin');
    }
    const popup = this._createPopup(this.getId(), this.getPlacement(), this.getTitle(), this.getIcon(), this.getContent());
    this._setPreviousButton(popup);
    if (this._isFirstStep) {
      this._setFirstStep(popup);
    }
    if (this._isLastStep) {
      this._setLastStep(popup);
    } else {
      this._setNextButton(popup);
    }
    return popup;
  };

  /**
   * Sets finish button in the popup
   *
   * @param {typeof sap.m.ResponsivePopover} popup Tour step's popup
   * @private
   */
  TourStep.prototype._setFinishButton = function(popup) {
    const button = this._createFinishButton(popup.getId(), this._finishStep.bind(this));
    popup.setEndButton(button);
    button.setType(ButtonType.Emphasized);
  };

  /**
   * Sets next button in the popup
   *
   * @param {typeof sap.m.ResponsivePopover} popup Tour step's popup
   * @private
   */
  TourStep.prototype._setNextButton = function(popup) {
    const button = this._createNextButton(popup.getId(), this._nextStep.bind(this));
    popup.setEndButton(button);
    button.setType(ButtonType.Emphasized);
  };

  /**
   * Sets previous button in the popup
   *
   * @param {typeof sap.m.ResponsivePopover} popup Tour step's popup
   * @private
   */
  TourStep.prototype._setPreviousButton = function(popup) {
    const button = this._createPreviousButton(popup.getId(), this._previousStep.bind(this));
    popup.setBeginButton(button);
  };

  /**
   * Builds a popup
   *
   * @param {string} tourStepId parent's ID
   * @param {typeof sap.m.PlacementType} placement Where popup will be placed
   * @param {string} title Tour step's title
   * @param {typeof sap.ui.core.URI} icon Tour step's icon
   * @param {typeof sap.ui.core.Control} content Tour step's main content
   * @returns {typeof sap.m.ResponsivePopover} A new popup instance
   * @private
   */
  TourStep.prototype._createPopup = function(tourStepId, placement, title, icon, content) {
    return new ResponsivePopover(tourStepId + '-popover', {
      modal: true,
      placement: placement,
      title: title,
      icon: icon,
      content: content
    });
  };

  /**
   * Builds finish button
   *
   * @param {string} popupId Parent's ID
   * @param {Function} handlePress A function to handle press event
   * @returns {typeof sap.m.Button} A new finish button instance
   * @private
   */
  TourStep.prototype._createFinishButton = function(popupId, handlePress) {
    return new Button(popupId + '-finishButton', {
      icon: 'sap-icon://accept',
      text: 'Done',
      press: handlePress
    });
  };

  /**
   * Builds next button
   *
   * @param {string} popupId Parent's ID
   * @param {Function} handlePress A function to handle press event
   * @returns {typeof sap.m.Button} A new next button instance
   * @private
   */
  TourStep.prototype._createNextButton = function(popupId, handlePress) {
    return new Button(popupId + '-nextButton', {
      icon: 'sap-icon://open-command-field',
      text: 'Next',
      press: handlePress
    });
  };

  /**
   * Builds previous button
   *
   * @param {string} popupId Parent's ID
   * @param {Function} handlePress A function to handle press event
   * @returns {typeof sap.m.Button} A new previous button instance
   * @private
   */
  TourStep.prototype._createPreviousButton = function(popupId, handlePress) {
    return new Button(popupId + '-previousButton', {
      icon: 'sap-icon://close-command-field',
      text: 'Back',
      press: handlePress
    });
  };

  /**
   * Validates the current step, and moves one step further.
   * @private
   */
  TourStep.prototype._nextStep = function() {
    this.getParent().nextStep();
  };

  /**
   * Discards the current step and goes one step back.
   * @private
   */
  TourStep.prototype._previousStep = function() {
    this.getParent().previousStep();
  };

  /**
   * Discards the current step and goes one step back.
   * @private
   */
  TourStep.prototype._finishStep = function() {
    this.getParent().complete();
  };

  return TourStep;
});
