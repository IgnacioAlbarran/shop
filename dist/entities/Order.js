'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Order = undefined;

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

var _OrderLine = require('./OrderLine');

var _User = require('./User');

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
    ManyToOne = _require.ManyToOne,
    OneToMany = _require.OneToMany,
    JoinColumn = _require.JoinColumn;

var Order = exports.Order = (_dec = Entity(), _dec2 = PrimaryGeneratedColumn(), _dec3 = ManyToOne(function () {
  return _User.User;
}, function (user) {
  return user.orders;
}, { eager: true, cascade: true }), _dec4 = JoinColumn(), _dec5 = OneToMany(function () {
  return _OrderLine.OrderLine;
}, function (orderLine) {
  return orderLine.order;
}), _dec(_class = (_class2 = function Order() {
  _classCallCheck(this, Order);

  _initDefineProp(this, 'id', _descriptor, this);

  _initDefineProp(this, 'user', _descriptor2, this);

  _initDefineProp(this, 'orderLines', _descriptor3, this);
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'id', [_dec2], {
  enumerable: true,
  initializer: function initializer() {
    return undefined;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'user', [_dec3, _dec4], {
  enumerable: true,
  initializer: function initializer() {
    return _User.User;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'orderLines', [_dec5], {
  enumerable: true,
  initializer: function initializer() {
    return _OrderLine.OrderLine;
  }
})), _class2)) || _class);