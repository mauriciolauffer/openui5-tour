sap.ui.define([
  'jquery.sap.global',
  'sap/ui/core/Control',
  './library'
], function($, Control) {
  'use strict';

  /**
   * OpenUI5 Tour.
   *
   * @author Mauricio Lauffer
   * @version ${version}
   *
   * @namespace
   * @name openui5.tour
   * @public
   */

  /**
   * A list of properties of UI5 Controls which will be used to dynamically get the field value.
   *
   * @private
   */
  var VALID_UI5_CONTROL_PROPERTIES = ['dateValue', 'value', 'selectedKey'];

  /**
   * Constructor for a new Tour Control.
   * @class
   * @extends sap.ui.base.Object
   *
   * @constructor
   * @param {sap.ui.core.mvc.View} view UI5 view which contains the fields to be validated.
   * @param {object} schema Schema used for validation.
   * @public
   */

  var Tour = Control.extend("openui5.tour", {
    constructor: function() {
      Control.apply(this, arguments);
    }
  });


  return Tour;
}, /* bExport= */ true);
