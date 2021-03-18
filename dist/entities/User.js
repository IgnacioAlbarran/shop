'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = undefined;

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;

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
    DeleteDateColumn = _require.DeleteDateColumn,
    Column = _require.Column,
    Index = _require.Index,
    OneToMany = _require.OneToMany;

var User = exports.User = (_dec = Entity(), _dec2 = PrimaryGeneratedColumn(), _dec3 = Column('varchar'), _dec4 = Column('varchar'), _dec5 = Index({ unique: true }), _dec6 = Column('varchar'), _dec7 = Column('varchar'), _dec8 = Column({ type: 'integer', default: 1 }), _dec9 = OneToMany(function (type) {
  return _Order.Order;
}, function (order) {
  return order.user;
}), _dec10 = DeleteDateColumn(), _dec(_class = (_class2 = function User() {
  _classCallCheck(this, User);

  _initDefineProp(this, 'id', _descriptor, this);

  _initDefineProp(this, 'firstName', _descriptor2, this);

  _initDefineProp(this, 'lastName', _descriptor3, this);

  _initDefineProp(this, 'email', _descriptor4, this);

  _initDefineProp(this, 'password', _descriptor5, this);

  _initDefineProp(this, 'level', _descriptor6, this);

  _initDefineProp(this, 'orders', _descriptor7, this);

  _initDefineProp(this, 'deletedAt', _descriptor8, this);
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'id', [_dec2], {
  enumerable: true,
  initializer: function initializer() {
    return undefined;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'firstName', [_dec3], {
  enumerable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'lastName', [_dec4], {
  enumerable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'email', [_dec5, _dec6], {
  enumerable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'password', [_dec7], {
  enumerable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'level', [_dec8], {
  enumerable: true,
  initializer: function initializer() {
    return undefined;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'orders', [_dec9], {
  enumerable: true,
  initializer: function initializer() {
    return _Order.Order;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, 'deletedAt', [_dec10], {
  enumerable: true,
  initializer: function initializer() {
    return undefined;
  }
})), _class2)) || _class);