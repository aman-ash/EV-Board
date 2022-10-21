"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCard = exports.newBoard = exports.getBoard = exports.getAllBoardName = exports.getAllBoard = exports.deleteCard = exports.addCard = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _board = _interopRequireDefault(require("../models/board.model"));
var _uuid = require("uuid");
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
            throw new Error('no boards for the user');
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
exports.getAllBoard = getAllBoard;
var getAllBoardName = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var data, temp, i, currBoard;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _board["default"].find({
              userid: body.userid
            });
          case 2:
            data = _context2.sent;
            temp = [];
            for (i = 0; i < data.length; i++) {
              currBoard = {
                boardName: data[i].boardName,
                boardId: data[i]._id
              };
              temp.push(currBoard);
            }
            if (!(data === null)) {
              _context2.next = 9;
              break;
            }
            throw new Error('no boards for the user');
          case 9:
            return _context2.abrupt("return", temp);
          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function getAllBoardName(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

//create new  Board
exports.getAllBoardName = getAllBoardName;
var newBoard = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(body) {
    var data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _board["default"].create(body);
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
  return function newBoard(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

//get single Board
exports.newBoard = newBoard;
var getBoard = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id, userid) {
    var data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _board["default"].findById({
              _id: id,
              userid: userid
            });
          case 2:
            data = _context4.sent;
            if (!(data === null)) {
              _context4.next = 5;
              break;
            }
            throw new Error('board by this id do not exist');
          case 5:
            return _context4.abrupt("return", data);
          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return function getBoard(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();

// Add card to a board
exports.getBoard = getBoard;
var addCard = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id, body) {
    var board, currCard, newCard, data;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _board["default"].findById({
              _id: id
            });
          case 2:
            board = _context5.sent;
            if (!board) {
              _context5.next = 13;
              break;
            }
            currCard = board.cards;
            newCard = {
              cardId: (0, _uuid.v4)(),
              sectionName: body.sectionName,
              cardDescription: body.cardDescription
            };
            currCard.push(newCard);
            _context5.next = 9;
            return _board["default"].findOneAndUpdate({
              _id: id
            }, {
              cards: currCard
            }, {
              "new": true
            });
          case 9:
            data = _context5.sent;
            return _context5.abrupt("return", newCard.cardId);
          case 13:
            throw new Error('board by this boardid do not exist');
          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return function addCard(_x6, _x7) {
    return _ref5.apply(this, arguments);
  };
}();
exports.addCard = addCard;
var deleteCard = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id, body) {
    var board, currCard, tempCardHolder, i, data;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _board["default"].findById({
              _id: id
            });
          case 2:
            board = _context6.sent;
            if (!board) {
              _context6.next = 13;
              break;
            }
            currCard = board.cards;
            tempCardHolder = [];
            for (i = 0; i < currCard.length; i++) {
              console.log(currCard[i]);
              if (currCard[i].cardId !== body.cardId) {
                tempCardHolder.push(currCard[i]);
              }
            }
            _context6.next = 9;
            return _board["default"].findOneAndUpdate({
              _id: id
            }, {
              cards: tempCardHolder
            }, {
              "new": true
            });
          case 9:
            data = _context6.sent;
            return _context6.abrupt("return", data);
          case 13:
            throw new Error('board by this boardid do not exist');
          case 14:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return function deleteCard(_x8, _x9) {
    return _ref6.apply(this, arguments);
  };
}();
exports.deleteCard = deleteCard;
var updateCard = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(id, body) {
    var board, currCard, i, data;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _board["default"].findById({
              _id: id
            });
          case 2:
            board = _context7.sent;
            if (!board) {
              _context7.next = 12;
              break;
            }
            currCard = board.cards;
            for (i = 0; i < currCard.length; i++) {
              console.log(currCard[i]);
              if (currCard[i].cardId === body.cardId) {
                currCard[i].cardDescription = body.cardDescription;
                currCard[i].sectionName = body.sectionName;
              }
            }
            _context7.next = 8;
            return _board["default"].findOneAndUpdate({
              _id: id
            }, {
              cards: currCard
            }, {
              "new": true
            });
          case 8:
            data = _context7.sent;
            return _context7.abrupt("return", data);
          case 12:
            throw new Error('board by this boardid do not exist');
          case 13:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return function updateCard(_x10, _x11) {
    return _ref7.apply(this, arguments);
  };
}();
exports.updateCard = updateCard;