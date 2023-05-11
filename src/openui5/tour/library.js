'use strict';

/*
 * ${copyright}
 */

sap.ui.define([
  'sap/ui/core/Core',
  'sap/ui/core/library',
  'sap/m/library'
],
/**
 * Module Dependencies
 * @param {sap.ui.core.Core} Core - sap.ui.core.Core
 * @returns {object|undefined} openui5.tour library
 */
function(Core) {
  /**
   * OpenUI5 library: openui5.tour
   * @namespace
   * @alias openui5.tour
   * @author Mauricio Lauffer
   * @version ${version}
   * @public
   */
  return Core.initLibrary({
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
