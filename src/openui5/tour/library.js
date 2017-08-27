sap.ui.define([
  'sap/ui/core/library'
], function() {
  'use strict';

  /**
   * OpenUI5 library: openui5.tour
   *
   * @namespace
   * @name openui5.tour
   * @author Mauricio Lauffer
   * @version ${version}
   * @public
   */
  // Delegate further initialization of this library to the Core
  var openui5 = {};
  sap.ui.getCore().initLibrary({
    name: 'openui5.tour',
    dependencies: [
      'sap.ui.core',
      'sap.m'
    ],
    controls: ['openui5.tour.Tour'],
    noLibraryCSS: true,
    version: '${version}'
  });

  return openui5.tour;
}, /* bExport= */ false);
