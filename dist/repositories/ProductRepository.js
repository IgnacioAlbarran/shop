"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductRepository = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _Product = require("../entities/Product");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require("typeorm"),
    EntityRepository = _require.EntityRepository,
    Repository = _require.Repository,
    getConnection = _require.getConnection,
    getRepository = _require.getRepository,
    transactionEntityManager = _require.transactionEntityManager;

var ProductRepository = exports.ProductRepository = (_dec = EntityRepository(_Product.Product), _dec(_class = function (_Repository) {
  _inherits(ProductRepository, _Repository);

  function ProductRepository() {
    _classCallCheck(this, ProductRepository);

    var _this = _possibleConstructorReturn(this, (ProductRepository.__proto__ || Object.getPrototypeOf(ProductRepository)).call(this));

    _this.connection = getConnection();
    _this.queryRunner = _this.connection.createQueryRunner();
    return _this;
  }

  _createClass(ProductRepository, [{
    key: "createProduct",
    value: async function createProduct(name, brand, category, price, photo, description) {
      await this.queryRunner.startTransaction();
      try {
        var product = new _Product.Product();
        product.name = name;
        product.brand = brand;
        product.category = category;
        product.price = price;
        product.photo = photo;
        product.description = description;
        await this.queryRunner.manager.save(product);
        await this.queryRunner.commitTransaction();
      } catch (error) {
        console.error(error);
        await this.queryRunner.rollbackTransaction();
      } finally {
        await this.queryRunner.release();
      }
    }
  }, {
    key: "productList",
    value: async function productList() {
      return this.find();
    }
  }, {
    key: "getProduct",
    value: async function getProduct(id) {
      try {
        return this.find({ id: id });
      } catch (error) {
        console.error(error);
      }
    }
  }, {
    key: "updateProduct",
    value: async function updateProduct(id, body) {
      await this.queryRunner.startTransaction();
      try {
        await this.queryRunner.manager.remove(_Product.Product, { id: id });
        var name = body.name,
            brand = body.brand,
            category = body.category,
            price = body.price,
            photo = body.photo,
            description = body.description;

        var product = new _Product.Product();
        product.id = id;
        product.name = name;
        product.brand = brand;
        product.category = category;
        product.price = price;
        product.photo = photo;
        product.description = description;
        await this.queryRunner.manager.save(product);
        await this.queryRunner.commitTransaction();
      } catch (error) {
        console.error(error);
      } finally {
        await this.queryRunner.release();
      }
    }
  }, {
    key: "deleteProduct",
    value: async function deleteProduct(id) {
      await this.queryRunner.startTransaction();
      try {
        await this.queryRunner.manager.remove(_Product.Product, { id: id });
        await this.queryRunner.commitTransaction();
      } catch (error) {
        console.error(error);
        await this.queryRunner.rollbackTransaction();
      } finally {
        await this.queryRunner.manager.release();
      }
    }
  }]);

  return ProductRepository;
}(Repository)) || _class);