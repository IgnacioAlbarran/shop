'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Orderline = undefined;

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

var _Order = require('./Order');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var _require = require("typeorm"),
    Entity = _require.Entity,
    PrimaryGeneratedColumn = _require.PrimaryGeneratedColumn,
    Column = _require.Column,
    ManyToOne = _require.ManyToOne,
    JoinColumn = _require.JoinColumn;

var Orderline = exports.Orderline = (_dec = Entity(), _dec2 = PrimaryGeneratedColumn(), _dec3 = ManyToOne(function (type) {
  return _Order.Order;
}, function (order) {
  return order.orderlines;
}, { cascade: true }), _dec4 = JoinColumn(), _dec5 = Column('integer'), _dec6 = Column('integer'), _dec(_class = (_class2 = function Orderline() {
  _classCallCheck(this, Orderline);

  _initDefineProp(this, 'id', _descriptor, this);

  _initDefineProp(this, 'order', _descriptor2, this);

  _initDefineProp(this, 'productId', _descriptor3, this);

  _initDefineProp(this, 'quantity', _descriptor4, this);
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'id', [_dec2], {
  enumerable: true,
  initializer: function initializer() {
    return undefined;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'order', [_dec3, _dec4], {
  enumerable: true,
  initializer: function initializer() {
    return _Order.Order;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'productId', [_dec5], {
  enumerable: true,
  initializer: function initializer() {
    return undefined;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'quantity', [_dec6], {
  enumerable: true,
  initializer: function initializer() {
    return undefined;
  }
})), _class2)) || _class);