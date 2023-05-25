'use strict';

/*
 * openui5-tour
 * (c) Copyright 2017-2023 Mauricio Lauffer
 * Licensed under the MIT license. See LICENSE file in the project root for full license information.
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
   * @version 0.1.0
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
    version: '0.1.0'
  });
});
