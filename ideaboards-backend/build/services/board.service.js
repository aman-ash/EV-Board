"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newBoard = exports.getBoard = exports.getAllBoard = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _board = _interopRequireDefault(require("../models/board.model"));
//get all Board
var getAllBoard = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(body) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _board["default"].find({
              userid: body.userid
            });
          case 2:
            data = _context.sent;
            if (!(data === null)) {
              _context.next = 7;
              break;
            }
            throw new Error('no notes for the user');
          case 7:
            return _context.abrupt("return", data);
          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function getAllBoard(_x) {
    return _ref.apply(this, arguments);
  };
}();

//create new  Board
exports.getAllBoard = getAllBoard;
var newBoard = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _board["default"].create(body);
          case 2:
            data = _context2.sent;
            return _context2.abrupt("return", data);
          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function newBoard(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

//get single Board
exports.newBoard = newBoard;
var getBoard = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
    var data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _board["default"].findById(id);
          case 2:
            data = _context3.sent;
            return _context3.abrupt("return", data);
          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return function getBoard(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getBoard = getBoard;