'use strict';

sap.ui.require([
  'test/unit/Tour',
  'test/unit/TourStep'
  // 'test/unit/TourMemoryLeak',
  // 'test/unit/TourStepMemoryLeak'
], function() {
  const node = document.createElement('div');
  node.setAttribute('id', 'content');
  document.body.appendChild(node);
});
