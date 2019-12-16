/*
 * openui5-tour
 * (c) Copyright 2017-2019 Mauricio Lauffer
 * Licensed under the MIT license. See LICENSE file in the project root for full license information.
 */

sap.ui.define([], function() {
  'use strict';

  /**
   * OpenUI5 library: openui5.tour
   *
   * @namespace
   * @name openui5.tour
   * @author Mauricio Lauffer
   * @version 0.0.19
   * @public
   */
  return sap.ui.getCore().initLibrary({
    name: 'openui5.tour',
    dependencies: [
      'sap.ui.core',
      'sap.m',
    ],
    controls: [
      'openui5.tour.Tour',
      'openui5.tour.TourStep',
    ],
    noLibraryCSS: true,
    version: '0.0.19',
  });
});
