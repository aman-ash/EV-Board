"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var boardSchema = new _mongoose.Schema({
  boardName: {
    type: String
  },
  Sections: {
    type: [String]
  },
  format: {
    type: String
  },
  description: {
    type: String
  }
}, {
  timestamps: true
});
var _default = (0, _mongoose.model)('Board', boardSchema);
exports["default"] = _default;