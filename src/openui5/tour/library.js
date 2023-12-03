'use strict';

/*
 * ${copyright}
 */

sap.ui.define([
  'sap/ui/core/Lib',
  'sap/ui/core/library',
  'sap/m/library'
],
/**
 * Module Dependencies
 * @param {sap.ui.core.Lib} Lib - sap.ui.core.Lib
 * @returns {object} openui5.tour library
 */
function(Lib) {
  /**
   * OpenUI5 library: openui5.tour
   * @namespace
   * @alias openui5.tour
   * @author Mauricio Lauffer
   * @version ${version}
   * @public
   */
  return Lib.init({
    name: 'openui5.tour',
    dependencies: [
      'sap.ui.core',
      'sap.m'
    ],
    controls: [
      'openui5.tour.Tour',
      'openui5.tour.TourStep'
    ],
    noLibraryCSS: true,
    version: '${version}'
  });
});
