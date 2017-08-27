sap.ui.require([
  'jquery.sap.global',
  'sap/ui/base/Object',
  'sap/ui/core/ValueState',
  'sap/ui/core/MessageType',
  'sap/ui/core/message/Message',
  'sap/ui/layout/form/SimpleForm',
  'sap/m/DatePicker',
  'sap/m/Input',
  'sap/m/Label',
  'sap/m/Page',
  'openui5/tour/Tour',
  'sap/ui/thirdparty/sinon',
  'sap/ui/thirdparty/sinon-qunit'
], function($, UI5Object, ValueState, MessageType, Message, SimpleForm, DatePicker, Input, Label, Page, Tour) {
  'use strict';

  sap.ui.jsview('mlauffer.test.view', {
    getControllerName: function() {
      return '';
    },
    createContent: function() {
      const form = new SimpleForm(this.createId('form'), {
        content: [
          new Label({text: 'User ID'}),
          new Input(this.createId('userid')),
          new Label({text: 'Description'}),
          new Input(this.createId('description')),
          new Label({text: 'Amount $'}),
          new Input(this.createId('amount')),
          new Label({text: 'Create Date'}),
          new DatePicker(this.createId('createdate')),
        ]
      });
      return new Page(this.createId('page'), {
        content: form
      });
    }
  });

  function getView() {
    return sap.ui.view({
      type: sap.ui.core.mvc.ViewType.JS,
      viewName:'mlauffer.test.view'
    });
  }

  function getSchema() {
    return {
    };
  }

  const { test } = QUnit;

  QUnit.module('Tour', function() {
    QUnit.module('constructor', () => {
      test('Should instantiate the control', (assert) => {
      });
    });
  });
});
