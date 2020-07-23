sap.ui.require([
  'test/unit/Tour',
  'test/unit/TourStep'
  // 'test/unit/TourMemoryLeak',
  // 'test/unit/TourStepMemoryLeak'
], function() {
  'use strict';

  const node = document.createElement('div');
  node.setAttribute('id', 'content');
  document.body.appendChild(node);
});
