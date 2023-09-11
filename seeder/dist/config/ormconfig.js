"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSoruce = exports.baseOrmConfig = void 0;
const typeorm_1 = require("typeorm");
const env_1 = require("./env");
const order_1 = require("../entities/order");
const trades_1 = require("../entities/trades");
exports.baseOrmConfig = {
    type: "mysql",
    host: env_1.env.DATABASE_HOST,
    port: env_1.env.DATABASE_PORT,
    username: env_1.env.DATABASE_USERNAME,
    password: env_1.env.DATABASE_PASSWORD,
    entities: [order_1.Orders, trades_1.Trades],
    synchronize: true,
    logging: true,
};
exports.AppDataSoruce = new typeorm_1.DataSource(exports.baseOrmConfig);
