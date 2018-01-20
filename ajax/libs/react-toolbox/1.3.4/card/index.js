'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardTitle = exports.CardText = exports.CardMedia = exports.CardActions = exports.Card = undefined;

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _Card = require('./Card.js');

var _CardActions = require('./CardActions.js');

var _CardMedia = require('./CardMedia.js');

var _CardText = require('./CardText.js');

var _CardTitle = require('./CardTitle.js');

var _avatar = require('../avatar');

var _avatar2 = _interopRequireDefault(_avatar);

var _theme = require('./theme.scss');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CardTitle = (0, _CardTitle.cardTitleFactory)(_avatar2.default);
var ThemedCard = (0, _reactCssThemr.themr)(_identifiers.CARD, _theme2.default)(_Card.Card);
var ThemedCardActions = (0, _reactCssThemr.themr)(_identifiers.CARD, _theme2.default)(_CardActions.CardActions);
var ThemedCardMedia = (0, _reactCssThemr.themr)(_identifiers.CARD, _theme2.default)(_CardMedia.CardMedia);
var ThemedCardText = (0, _reactCssThemr.themr)(_identifiers.CARD, _theme2.default)(_CardText.CardText);
var ThemedCardTitle = (0, _reactCssThemr.themr)(_identifiers.CARD, _theme2.default)(CardTitle);

exports.default = ThemedCard;
exports.Card = ThemedCard;
exports.CardActions = ThemedCardActions;
exports.CardMedia = ThemedCardMedia;
exports.CardText = ThemedCardText;
exports.CardTitle = ThemedCardTitle;