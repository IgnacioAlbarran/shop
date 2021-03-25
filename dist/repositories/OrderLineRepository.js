"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrderLineRepository = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _OrderLine = require("../entities/OrderLine.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require("typeorm"),
    EntityRepository = _require.EntityRepository,
    Repository = _require.Repository,
    getConnection = _require.getConnection,
    transactionEntityManager = _require.transactionEntityManager;

var OrderLineRepository = exports.OrderLineRepository = (_dec = EntityRepository(_OrderLine.OrderLine), _dec(_class = function (_Repository) {
  _inherits(OrderLineRepository, _Repository);

  function OrderLineRepository() {
    _classCallCheck(this, OrderLineRepository);

    var _this = _possibleConstructorReturn(this, (OrderLineRepository.__proto__ || Object.getPrototypeOf(OrderLineRepository)).call(this));

    _this.connection = getConnection();
    _this.queryRunner = _this.connection.createQueryRunner();
    return _this;
  }

  _createClass(OrderLineRepository, [{
    key: "createOrderLines",
    value: async function createOrderLines(productId, quantity) {
      await this.queryRunner.startTransaction();
      try {
        var orderLine = new _OrderLine.OrderLine();
        orderLine.productId = productId;
        orderLine.quantity = quantity;
        await this.queryRunner.manager.save(orderLine);
        await this.queryRunner.commitTransaction();
        return orderLine;
      } catch (error) {
        console.error(error);
        await this.queryRunner.rollbackTransaction();
      } finally {
        await this.queryRunner.release();
      }
    }
  }]);

  return OrderLineRepository;
}(Repository)) || _class);