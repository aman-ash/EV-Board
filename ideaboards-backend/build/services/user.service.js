"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newUser = exports.login = exports.getAllUsers = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _user = _interopRequireDefault(require("../models/user.model"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
//get all users
var getAllUsers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user["default"].find();
          case 2:
            data = _context.sent;
            return _context.abrupt("return", data);
          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function getAllUsers() {
    return _ref.apply(this, arguments);
  };
}();

//create new user
exports.getAllUsers = getAllUsers;
var newUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var emailexist, saltRounds, hashpassword, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log(body);
            _context2.next = 3;
            return _user["default"].findOne({
              email: body.email
            });
          case 3:
            emailexist = _context2.sent;
            if (!emailexist) {
              _context2.next = 8;
              break;
            }
            throw new Error('user already exist');
          case 8:
            saltRounds = 10;
            _context2.next = 11;
            return _bcrypt["default"].hash(body.password, saltRounds);
          case 11:
            hashpassword = _context2.sent;
            body.password = hashpassword;
            // Store hash in your password DB.
            _context2.next = 15;
            return _user["default"].create(body);
          case 15:
            data = _context2.sent;
            return _context2.abrupt("return", data);
          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function newUser(_x) {
    return _ref2.apply(this, arguments);
  };
}();
exports.newUser = newUser;
var login = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(body) {
    var emailexist, match, token;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _user["default"].findOne({
              email: body.email
            });
          case 2:
            emailexist = _context3.sent;
            console.log(emailexist);
            if (!emailexist) {
              _context3.next = 16;
              break;
            }
            _context3.next = 7;
            return _bcrypt["default"].compare(body.password, emailexist.password);
          case 7:
            match = _context3.sent;
            if (!match) {
              _context3.next = 13;
              break;
            }
            token = _jsonwebtoken["default"].sign({
              id: emailexist._id,
              email: emailexist.email
            }, process.env.SECRET_KEY);
            return _context3.abrupt("return", token);
          case 13:
            throw new Error('Password did not match');
          case 14:
            _context3.next = 17;
            break;
          case 16:
            throw new Error('user does not exist');
          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return function login(_x2) {
    return _ref3.apply(this, arguments);
  };
}();
exports.login = login;