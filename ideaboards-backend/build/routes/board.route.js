"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var boardController = _interopRequireWildcard(require("../controllers/board.controller"));
var _auth = require("../middlewares/auth.middleware");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var router = _express["default"].Router();

//route to get all board
router.get('/getAllBoard', _auth.userAuth, boardController.getAllBoard);

//route to get all board name and id
router.get('/getAllBoardName', _auth.userAuth, boardController.getAllBoardName);

//route to create a new board
router.post('/newBoard', _auth.userAuth, boardController.newBoard);

//route to get a board by id
router.get('/getBoard/:_id', _auth.userAuth, boardController.getBoard);

//route to add a card in board
router.patch('/addCard/:_id', _auth.userAuth, boardController.addCard);
router.patch('/deleteCard/:_id', _auth.userAuth, boardController.deleteCard);
var _default = router;
exports["default"] = _default;