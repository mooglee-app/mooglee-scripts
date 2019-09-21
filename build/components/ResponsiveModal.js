"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));

var _DialogActions = _interopRequireDefault(require("@material-ui/core/DialogActions"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Slide = _interopRequireDefault(require("@material-ui/core/Slide"));

var _withMobileDialog = _interopRequireDefault(require("@material-ui/core/withMobileDialog"));

var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function Transition(props) {
  return _react["default"].createElement(_Slide["default"], (0, _extends2["default"])({
    direction: "up"
  }, props));
}
/**
 * This is a modal component that works very well on desktop and mobile
 * It is fully customizable to meet all your needs
 * Enjoy <3
 * @see https://material-ui.com/api/modal/#modal
 */


var ResponsiveModal =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(ResponsiveModal, _React$Component);

  function ResponsiveModal() {
    (0, _classCallCheck2["default"])(this, ResponsiveModal);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ResponsiveModal).apply(this, arguments));
  }

  (0, _createClass2["default"])(ResponsiveModal, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextState !== this.state || nextProps.isOpen !== this.props.isOpen || nextProps.modalProps !== this.props.modalProps || nextProps.contentProps !== this.props.contentProps || nextProps.maxWidth !== this.props.maxWidth || nextProps.paperProps !== this.props.paperProps || nextProps.noCloseBtn !== this.props.noCloseBtn || nextProps.title !== this.props.title || nextProps.bottomActions !== this.props.bottomActions || nextProps.fullScreen !== this.props.fullScreen || nextProps.children !== this.props.children;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isOpen = _this$props.isOpen,
          closeModal = _this$props.closeModal,
          modalProps = _this$props.modalProps,
          children = _this$props.children,
          maxWidth = _this$props.maxWidth,
          noCloseBtn = _this$props.noCloseBtn,
          fullScreen = _this$props.fullScreen,
          title = _this$props.title,
          bottomActions = _this$props.bottomActions,
          paperProps = _this$props.paperProps,
          contentProps = _this$props.contentProps;
      return _react["default"].createElement(_Dialog["default"], (0, _extends2["default"])({
        TransitionComponent: Transition,
        fullScreen: fullScreen,
        open: isOpen,
        onClose: closeModal
      }, modalProps, {
        PaperProps: (0, _extends2["default"])({}, paperProps, {
          style: (0, _extends2["default"])({
            maxWidth: fullScreen ? 'initial' : maxWidth
          }, paperProps.style || {})
        })
      }), (fullScreen === true && bottomActions === undefined || noCloseBtn !== true) && _react["default"].createElement(_IconButton["default"], {
        style: {
          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: 2000
        },
        onClick: closeModal
      }, _react["default"].createElement(_Close["default"], {
        style: {
          color: '#999EA6'
        }
      })), title !== undefined && _react["default"].createElement(_DialogTitle["default"], null, title), _react["default"].createElement(_DialogContent["default"], contentProps, children), bottomActions !== undefined && _react["default"].createElement(_DialogActions["default"], null, bottomActions));
    }
  }]);
  return ResponsiveModal;
}(_react["default"].Component);

ResponsiveModal.propTypes = {
  isOpen: _propTypes["default"].bool.isRequired,
  // Define if the modal is open
  closeModal: _propTypes["default"].func.isRequired,
  // Function to close the modal
  modalProps: _propTypes["default"].object,
  // Props that are passed to the Modal component
  contentProps: _propTypes["default"].object,
  // Props that are passed to the ModalContent component
  maxWidth: _propTypes["default"].any,
  // Max width of the modal
  paperProps: _propTypes["default"].object,
  // Custom props for the Paper component
  noCloseBtn: _propTypes["default"].bool,
  // Allow to hide the close btn
  title: _propTypes["default"].any,
  // Optional title
  bottomActions: _propTypes["default"].element // Custom bottom action components

};
ResponsiveModal.defaultProps = {
  isOpen: false,
  closeModal: function closeModal() {},
  modalProps: {},
  contentProps: {},
  maxWidth: 480,
  paperProps: {},
  noCloseBtn: false
};

var _default = (0, _withMobileDialog["default"])()(ResponsiveModal);

exports["default"] = _default;