'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;

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
    ManyToOne = _require.ManyToOne;

var Product = exports.Product = (_dec = Entity(), _dec2 = PrimaryGeneratedColumn(), _dec3 = Column('varchar'), _dec4 = Column('varchar'), _dec5 = Column('integer'), _dec6 = Column('integer'), _dec7 = Column('integer'), _dec8 = Column('varchar'), _dec9 = Column('varchar'), _dec(_class = (_class2 = function Product() {
  _classCallCheck(this, Product);

  _initDefineProp(this, 'id', _descriptor, this);

  _initDefineProp(this, 'name', _descriptor2, this);

  _initDefineProp(this, 'brand', _descriptor3, this);

  _initDefineProp(this, 'seller', _descriptor4, this);

  _initDefineProp(this, 'category', _descriptor5, this);

  _initDefineProp(this, 'price', _descriptor6, this);

  _initDefineProp(this, 'photo', _descriptor7, this);

  _initDefineProp(this, 'description', _descriptor8, this);
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'id', [_dec2], {
  enumerable: true,
  initializer: function initializer() {
    return undefined;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'name', [_dec3], {
  enumerable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'brand', [_dec4], {
  enumerable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'seller', [_dec5], {
  enumerable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'category', [_dec6], {
  enumerable: true,
  initializer: function initializer() {
    return undefined;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'price', [_dec7], {
  enumerable: true,
  initializer: function initializer() {
    return undefined;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'photo', [_dec8], {
  enumerable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, 'description', [_dec9], {
  enumerable: true,
  initializer: function initializer() {
    return '';
  }
})), _class2)) || _class);