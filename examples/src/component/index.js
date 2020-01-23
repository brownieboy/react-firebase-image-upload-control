"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _DummyComponent = _interopRequireDefault(require("./DummyComponent.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App() {
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("span", null, "My app"), _react.default.createElement(_DummyComponent.default, null));
};

var _default = App;
exports.default = _default;
