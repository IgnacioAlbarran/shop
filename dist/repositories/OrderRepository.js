"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrderRepository = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _Order = require("../entities/Order");

var _OrderLine = require("../entities/OrderLine");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require("typeorm"),
    EntityRepository = _require.EntityRepository,
    Repository = _require.Repository,
    getConnection = _require.getConnection,
    getRepository = _require.getRepository,
    transactionEntityManager = _require.transactionEntityManager;

var OrderRepository = exports.OrderRepository = (_dec = EntityRepository(_Order.Order), _dec(_class = function (_Repository) {
  _inherits(OrderRepository, _Repository);

  function OrderRepository() {
    _classCallCheck(this, OrderRepository);

    var _this = _possibleConstructorReturn(this, (OrderRepository.__proto__ || Object.getPrototypeOf(OrderRepository)).call(this));

    _this.connection = getConnection();
    _this.queryRunner = _this.connection.createQueryRunner();
    return _this;
  }

  _createClass(OrderRepository, [{
    key: "createOrder",
    value: async function createOrder(user, orderLines) {
      await this.queryRunner.startTransaction();
      try {
        var orderLine = new _OrderLine.OrderLine();
        orderLine.productId = orderLines.productId;
        orderLine.quantity = orderLines.quantity;
        var order = new _Order.Order();
        order.user = user;
        order.orderLines = orderLines;
        await this.queryRunner.manager.save(order);
        await this.queryRunner.commitTransaction();
      } catch (error) {
        console.error(error);
        await this.queryRunner.rollbackTransaction();
      } finally {
        await this.queryRunner.release();
      }
    }
  }, {
    key: "ordersByUser",
    value: async function ordersByUser(user) {
      try {
        var orders = await this.find({ relations: ["user", "orderLines"], userId: user });
        return orders;
      } catch (error) {
        console.error(error);
      }
    }
  }, {
    key: "allOrders",
    value: async function allOrders() {
      try {
        var orders = await this.find();
        return orders;
      } catch (error) {
        console.error(error);
      }
    }
  }]);

  return OrderRepository;
}(Repository)) || _class);