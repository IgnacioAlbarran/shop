"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserRepository = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _typeorm = require("typeorm");

var _User = require("../entities/User");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var service = require('../../services/index.js');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var myPlaintextPassword = 's0/\/\P4$$w0rD';
var someOtherPlaintextPassword = 'not_bacon';
var moment = require('moment');

var UserRepository = exports.UserRepository = (_dec = (0, _typeorm.EntityRepository)(_User.User), _dec(_class = function (_Repository) {
  _inherits(UserRepository, _Repository);

  function UserRepository() {
    _classCallCheck(this, UserRepository);

    var _this = _possibleConstructorReturn(this, (UserRepository.__proto__ || Object.getPrototypeOf(UserRepository)).call(this));

    _this.connection = (0, _typeorm.getConnection)();
    _this.queryRunner = _this.connection.createQueryRunner();
    return _this;
  }

  _createClass(UserRepository, [{
    key: "signUp",
    value: async function signUp(firstName, lastName, email, password, level) {
      var hash = bcrypt.hashSync(password, salt);
      var user = new _User.User();
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.password = hash;
      user.level = level;

      await this.queryRunner.startTransaction();

      try {
        await this.queryRunner.manager.save(user);
        await this.queryRunner.commitTransaction();
        return user;
      } catch (error) {
        console.error(error);
        await this.queryRunner.rollbackTransaction();
      } finally {
        await this.queryRunner.release();
      }
    }
  }, {
    key: "getUsers",
    value: async function getUsers() {
      try {
        return this.find();
      } catch (error) {
        console.error(error);
      }
    }
  }, {
    key: "updateUser",
    value: async function updateUser(id, userData) {
      this.queryRunner.startTransaction();
      try {
        if (userData.password != undefined) {
          var hash = bcrypt.hashSync(userData.password, salt);
          userData.password = hash;
        }
        await this.queryRunner.manager.update(_User.User, id, userData);
        await this.queryRunner.commitTransaction();
      } catch (error) {
        console.error(error);
        await this.queryRunner.rollbackTransaction();
      } finally {
        await this.queryRunner.release();
      }
    }
  }, {
    key: "deleteUser",
    value: async function deleteUser(id) {
      this.queryRunner.startTransaction();
      var date = new Date();
      var timestamp = date.toLocaleString();
      try {
        await this.queryRunner.manager.update(_User.User, id, { "level": service.USUARIOS.inactive, "deletedAt": timestamp });
        await this.queryRunner.commitTransaction();
      } catch (error) {
        console.error(error);
        await this.queryRunner.rollbackTransaction();
      } finally {
        await this.queryRunner.release();
        return "Deleted user " + id + " - " + moment.utc;
      }
    }
  }, {
    key: "getUser",
    value: async function getUser(id) {
      try {
        var user = await this.find({ id: id });
        if ((typeof user === "undefined" ? "undefined" : _typeof(user)) !== 'object') {
          return 'User not found';
        } else {
          return user;
        }
      } catch (error) {
        console.error(error);
      }
    }
  }]);

  return UserRepository;
}(_typeorm.Repository)) || _class);