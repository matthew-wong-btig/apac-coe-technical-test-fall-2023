"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const node_crypto_1 = __importDefault(require("node:crypto"));
const ormconfig_1 = require("./config/ormconfig");
const order_1 = require("./entities/order");
const trades_1 = require("./entities/trades");
const SecurityMaster_1 = require("./entities/SecurityMaster");
const Client_1 = require("./entities/Client");
const lodash_1 = require("lodash");
const dayjs_1 = __importDefault(require("dayjs"));
const splitNumber_1 = require("./libs/helper/splitNumber");
const Trader_1 = require("./entities/Trader");
const enum_1 = require("./types/enum");
(async function () {
    faker_1.faker.seed(123);
    await ormconfig_1.AppDataSoruce.initialize();
    const or = ormconfig_1.AppDataSoruce.getRepository(order_1.Orders);
    const tr = ormconfig_1.AppDataSoruce.getRepository(trades_1.Trades);
    await or.clear();
    await tr.clear();
    for (let i = 0; i < 100; i++) {
        const res = seed1();
        await or.save(res.orders);
        await tr.save(res.trades);
    }
})();
function seed1() {
    let orders = [];
    let trades = [];
    let childOrders = [];
    const security = faker_1.faker.helpers.arrayElement(SecurityMaster_1.SecurityMaster);
    const client = faker_1.faker.helpers.arrayElement(Client_1.clients);
    const trader = faker_1.faker.helpers.arrayElement(Trader_1.traders);
    let rootOrder = generateRootOrder(security, client, trader);
    orders.push(rootOrder);
    const action = faker_1.faker.helpers.arrayElement(["a", "b", "c", "d"]);
    if (action === "a") {
        const amendedOrder = amendOrder(rootOrder);
        rootOrder = (0, lodash_1.cloneDeep)(amendedOrder);
        orders.push(amendedOrder);
        const fillResult = fillOrder(rootOrder, null);
        orders = orders.concat(fillResult.orders);
        trades = trades.concat(fillResult.trades);
    }
    if (action === "b") {
        childOrders = childOrders.concat(generateChildOrder(rootOrder));
    }
    if (action === "c") {
        orders.push(cancelOrder(rootOrder));
    }
    if (action === "d") {
        const { orders: filledOrders, trades: filledTrades } = fillOrder(rootOrder, null);
        orders = orders.concat(filledOrders);
        trades = trades.concat(filledTrades);
    }
    if (childOrders.length > 0) {
        const tempChildOrder = [];
        for (let childOrder of childOrders) {
            const action = faker_1.faker.helpers.arrayElement(["a", "c", "d"]);
            if (action === "a") {
                const amendedOrder = amendOrder(childOrder);
                childOrder = amendedOrder;
                tempChildOrder.push(amendedOrder);
                const fillResult = fillOrder(childOrder, rootOrder);
                orders = orders.concat(fillResult.orders);
                trades = trades.concat(fillResult.trades);
                rootOrder = fillResult.rootOrder;
            }
            if (action === "c") {
                tempChildOrder.push(cancelOrder(childOrder));
            }
            if (action === "d") {
                const fillResult = fillOrder(childOrder, rootOrder);
                orders = orders.concat(fillResult.orders);
                trades = trades.concat(fillResult.trades);
                rootOrder = fillResult.rootOrder;
            }
        }
        childOrders = childOrders.concat(tempChildOrder);
        orders = orders.concat(childOrders);
    }
    console.log(orders, trades);
    return { orders, trades };
}
function generateRootOrder(security, client, trader) {
    const orderToInsert = new order_1.Orders();
    const enterDate = faker_1.faker.date.between({
        from: (0, dayjs_1.default)().startOf("year").toDate(),
        to: (0, dayjs_1.default)().endOf("year").toDate(),
    });
    const orderId = node_crypto_1.default.randomUUID();
    orderToInsert.Order_State = enum_1.EOrderState.I;
    orderToInsert.Executing_Entity = "BTXX";
    orderToInsert.Contracting_Entity = "BTXX";
    orderToInsert.Instrument_Code = security.ticker_symbol;
    orderToInsert.Instrument_Description = security.issue_name;
    orderToInsert.ISIN_Code = security.isin;
    orderToInsert.Sedol_Code = security.sedol;
    orderToInsert.Market_Id = security.PrimSecCompExch;
    orderToInsert.Counterparty_Code = client.code;
    orderToInsert.Counterparty_Description = client.description;
    orderToInsert.Top_Level = enum_1.ETopLevel.Y;
    orderToInsert.Order_Id = orderId;
    orderToInsert.Buy_Sell = faker_1.faker.helpers.enumValue(enum_1.EBuySell);
    orderToInsert.Total_Quantity = faker_1.faker.finance.amount({
        autoFormat: false,
        dec: 0,
        max: 10000,
        min: 10,
    });
    orderToInsert.Limit_Price = faker_1.faker.finance.amount({
        autoFormat: false,
        dec: 4,
        max: 10000,
        min: 10,
    });
    orderToInsert.Gross_Fill_Price = faker_1.faker.finance.amount({
        autoFormat: false,
        dec: 4,
        max: 10000,
        min: 10,
    });
    orderToInsert.Settlement_Ccy = security.ParvalueCurenCD;
    orderToInsert.Amended_Datetime = enterDate;
    orderToInsert.Trader = trader;
    orderToInsert.Num_Fills = "0";
    orderToInsert.Entered_Datetime = enterDate;
    orderToInsert.Settlement_Datetime = (0, dayjs_1.default)(enterDate).add(2, "day").toDate();
    orderToInsert.Commission_Type = faker_1.faker.helpers.arrayElement([
        "FIXED_AMOUNT",
        "bps",
    ]);
    orderToInsert.Commission_Value = faker_1.faker.finance.amount({
        autoFormat: false,
        dec: 0,
        max: 20,
        min: 0,
    });
    orderToInsert.Root_Order_Id = orderId;
    orderToInsert.Quantity_Available = orderToInsert.Total_Quantity;
    orderToInsert.Quantity_Filled_Today = "0";
    orderToInsert.Last_Complete_Datetime = enterDate;
    orderToInsert.Account_Code = faker_1.faker.finance.accountNumber();
    orderToInsert.Order_Notes = faker_1.faker.lorem.words({ min: 1, max: 3 });
    return orderToInsert;
}
function generateChildOrder(rootOrder) {
    const clonedOrder = (0, lodash_1.cloneDeep)(rootOrder);
    const childOrderArray = [];
    const numSplit = faker_1.faker.helpers.arrayElement([2, 3]);
    if (numSplit > 0) {
        const qtyArr = (0, splitNumber_1.splitNumber)(Number(clonedOrder.Quantity_Available));
        for (let i = 0; i < numSplit; i++) {
            const child = (0, lodash_1.cloneDeep)(clonedOrder);
            child.Top_Level = enum_1.ETopLevel.N;
            child.Order_Id = node_crypto_1.default.randomUUID();
            child.Total_Quantity = qtyArr[i].toString();
            child.Quantity_Available = qtyArr[i].toString();
            childOrderArray.push((0, lodash_1.cloneDeep)(child));
        }
    }
    return childOrderArray;
}
function cancelOrder(rootOrder) {
    const original = rootOrder;
    const amended = (0, lodash_1.cloneDeep)(original);
    amended.Order_State = enum_1.EOrderState.C;
    amended.Version += 1;
    amended.Amended_Datetime = faker_1.faker.date.between({
        from: original.Entered_Datetime,
        to: (0, dayjs_1.default)(original.Entered_Datetime).add(8, "h").toDate(),
    });
    return amended;
}
function amendOrder(order) {
    const amended = (0, lodash_1.cloneDeep)(order);
    amended.Version += 1;
    amended.Amended_Datetime = faker_1.faker.date.between({
        from: order.Entered_Datetime,
        to: (0, dayjs_1.default)(order.Entered_Datetime).add(8, "h").toDate(),
    });
    amended.Order_Notes = faker_1.faker.lorem.words({ min: 1, max: 3 });
    return amended;
}
function fillOrder(order, rootOrder) {
    console.log("trigger fill order");
    const checkCase = ["1trade", "2trade", "1cancel1trade", "notrade"];
    const action = faker_1.faker.helpers.arrayElement(checkCase);
    console.log(action);
    const trades = [];
    const orders = [];
    const orgOrder = (0, lodash_1.cloneDeep)(order);
    const orgRootOrder = (0, lodash_1.cloneDeep)(rootOrder);
    if (action === "notrade") {
        return {
            orders,
            trades,
            rootOrder: orgRootOrder,
        };
    }
    if ((0, lodash_1.isNil)(rootOrder)) {
        switch (action) {
            case "1trade": {
                const trade = generateTrade(order, {
                    quantity: Number(order.Quantity_Available),
                });
                trades.push((0, lodash_1.cloneDeep)(trade));
                orgOrder.Quantity_Available = (Number(orgOrder.Quantity_Available) - Number(trade.Quantity)).toString();
                orgOrder.Quantity_Filled_Today = (Number(orgOrder.Quantity_Filled_Today) +
                    Number(trade.Quantity)).toString();
                orgOrder.Num_Fills = (Number(orgOrder.Quantity_Filled_Today) +
                    Number(trade.Quantity)).toString();
                orgOrder.Amended_Datetime = trade.Trade_Datetime;
                orgOrder.Version += 1;
                orders.push((0, lodash_1.cloneDeep)(orgOrder));
                break;
            }
            case "2trade": {
                const quantityArr = (0, splitNumber_1.splitNumber)(Number(orgOrder.Quantity_Available), { numSegment: 2 });
                for (let qty of quantityArr) {
                    const trade = generateTrade(order, {
                        quantity: Number(order.Quantity_Available),
                    });
                    trades.push((0, lodash_1.cloneDeep)(trade));
                    orgOrder.Quantity_Available = (Number(orgOrder.Quantity_Available) -
                        Number(trade.Quantity)).toString();
                    orgOrder.Quantity_Filled_Today = (Number(orgOrder.Quantity_Filled_Today) +
                        Number(trade.Quantity)).toString();
                    orgOrder.Num_Fills = (Number(orgOrder.Quantity_Filled_Today) +
                        Number(trade.Quantity)).toString();
                    orgOrder.Amended_Datetime = trade.Trade_Datetime;
                    orgOrder.Version += 1;
                    orders.push((0, lodash_1.cloneDeep)(orgOrder));
                }
                break;
            }
            case "1cancel1trade": {
                const quantityArr = (0, splitNumber_1.splitNumber)(Number(orgOrder.Quantity_Available), { numSegment: 2 });
                const tradeac = generateTrade(order, {
                    quantity: Number(order.Quantity_Available),
                });
                trades.push(tradeac);
                let tradec = (0, lodash_1.cloneDeep)(tradeac);
                tradec.State = enum_1.EState.C;
                tradec.Version_Number += 1;
                tradec.Amended_Datetime = faker_1.faker.date.between({
                    from: tradeac.Entered_Datetime,
                    to: (0, dayjs_1.default)(tradeac.Entered_Datetime)
                        .add(10, "minute")
                        .toDate(),
                });
                trades.push((0, lodash_1.cloneDeep)(tradec));
                const trade = generateTrade(order, {
                    quantity: Number(order.Quantity_Available),
                });
                trades.push((0, lodash_1.cloneDeep)(trade));
                orgOrder.Quantity_Available = (Number(orgOrder.Quantity_Available) - Number(trade.Quantity)).toString();
                orgOrder.Quantity_Filled_Today = (Number(orgOrder.Quantity_Filled_Today) +
                    Number(trade.Quantity)).toString();
                orgOrder.Num_Fills = (Number(orgOrder.Quantity_Filled_Today) +
                    Number(trade.Quantity)).toString();
                orgOrder.Amended_Datetime = trade.Trade_Datetime;
                orgOrder.Version += 1;
                orders.push((0, lodash_1.cloneDeep)(orgOrder));
                break;
            }
        }
    }
    else {
        switch (action) {
            case "1trade": {
                const trade = generateTrade(order, {
                    quantity: Number(order.Quantity_Available),
                });
                trades.push((0, lodash_1.cloneDeep)(trade));
                orgOrder.Quantity_Available = (Number(orgOrder.Quantity_Available) - Number(trade.Quantity)).toString();
                orgOrder.Quantity_Filled_Today = (Number(orgOrder.Quantity_Filled_Today) +
                    Number(trade.Quantity)).toString();
                orgOrder.Num_Fills = (Number(orgOrder.Quantity_Filled_Today) +
                    Number(trade.Quantity)).toString();
                orgOrder.Amended_Datetime = trade.Trade_Datetime;
                orgOrder.Version += 1;
                orders.push((0, lodash_1.cloneDeep)(orgOrder));
                orgRootOrder.Quantity_Available = (Number(orgRootOrder.Quantity_Available) -
                    Number(trade.Quantity)).toString();
                orgRootOrder.Quantity_Filled_Today = (Number(orgRootOrder.Quantity_Filled_Today) +
                    Number(trade.Quantity)).toString();
                orgRootOrder.Num_Fills = (Number(orgRootOrder.Quantity_Filled_Today) +
                    Number(trade.Quantity)).toString();
                orgRootOrder.Amended_Datetime = trade.Trade_Datetime;
                orgRootOrder.Version += 1;
                orders.push((0, lodash_1.cloneDeep)(orgRootOrder));
                break;
            }
            case "2trade": {
                const quantityArr = (0, splitNumber_1.splitNumber)(Number(orgOrder.Quantity_Available), { numSegment: 2 });
                for (let qty of quantityArr) {
                    const trade = generateTrade(order, { quantity: qty });
                    trades.push((0, lodash_1.cloneDeep)(trade));
                    orgOrder.Quantity_Available = (Number(orgOrder.Quantity_Available) -
                        Number(trade.Quantity)).toString();
                    orgOrder.Quantity_Filled_Today = (Number(orgOrder.Quantity_Filled_Today) +
                        Number(trade.Quantity)).toString();
                    orgOrder.Num_Fills = (Number(orgOrder.Quantity_Filled_Today) +
                        Number(trade.Quantity)).toString();
                    orgOrder.Amended_Datetime = trade.Trade_Datetime;
                    orgOrder.Version += 1;
                    orders.push((0, lodash_1.cloneDeep)(orgOrder));
                    orgRootOrder.Quantity_Available = (Number(orgRootOrder.Quantity_Available) -
                        Number(trade.Quantity)).toString();
                    orgRootOrder.Quantity_Filled_Today = (Number(orgRootOrder.Quantity_Filled_Today) +
                        Number(trade.Quantity)).toString();
                    orgRootOrder.Num_Fills = (Number(orgRootOrder.Quantity_Filled_Today) +
                        Number(trade.Quantity)).toString();
                    orgRootOrder.Amended_Datetime = trade.Trade_Datetime;
                    orgRootOrder.Version += 1;
                    orders.push((0, lodash_1.cloneDeep)(orgRootOrder));
                }
                break;
            }
            case "1cancel1trade": {
                const quantityArr = (0, splitNumber_1.splitNumber)(Number(orgOrder.Quantity_Available), { numSegment: 2 });
                const tradeac = generateTrade(order, {
                    quantity: Number(order.Quantity_Available),
                });
                trades.push((0, lodash_1.cloneDeep)(tradeac));
                let tradec = (0, lodash_1.cloneDeep)(tradeac);
                tradec.State = enum_1.EState.C;
                tradec.Version_Number += 1;
                tradec.Amended_Datetime = faker_1.faker.date.between({
                    from: tradeac.Entered_Datetime,
                    to: (0, dayjs_1.default)(tradeac.Entered_Datetime)
                        .add(10, "minute")
                        .toDate(),
                });
                trades.push((0, lodash_1.cloneDeep)(tradec));
                const trade = generateTrade(order, {
                    quantity: Number(order.Quantity_Available),
                });
                trades.push(trade);
                orgOrder.Quantity_Available = (Number(orgOrder.Quantity_Available) - Number(trade.Quantity)).toString();
                orgOrder.Quantity_Filled_Today = (Number(orgOrder.Quantity_Filled_Today) +
                    Number(trade.Quantity)).toString();
                orgOrder.Num_Fills = (Number(orgOrder.Quantity_Filled_Today) +
                    Number(trade.Quantity)).toString();
                orgOrder.Amended_Datetime = trade.Trade_Datetime;
                orgOrder.Version += 1;
                orders.push((0, lodash_1.cloneDeep)(orgOrder));
                orgRootOrder.Quantity_Available = (Number(orgRootOrder.Quantity_Available) -
                    Number(trade.Quantity)).toString();
                orgRootOrder.Quantity_Filled_Today = (Number(orgRootOrder.Quantity_Filled_Today) +
                    Number(trade.Quantity)).toString();
                orgRootOrder.Num_Fills = (Number(orgRootOrder.Quantity_Filled_Today) +
                    Number(trade.Quantity)).toString();
                orgRootOrder.Amended_Datetime = trade.Trade_Datetime;
                orgRootOrder.Version += 1;
                orders.push((0, lodash_1.cloneDeep)(orgRootOrder));
                break;
            }
        }
    }
    console.log({
        orders,
        trades,
    });
    return {
        orders,
        trades,
        rootOrder: orgRootOrder,
    };
}
function generateTrade(order, params) {
    console.log("trigger generate trade");
    const trade = new trades_1.Trades();
    const { quantity } = params;
    const instrument = SecurityMaster_1.SecurityMaster.find((e) => e.sedol === order.Sedol_Code);
    trade.Record_Type = enum_1.ERecordType.M;
    trade.State = enum_1.EState.I;
    trade.Buy_Sell = order.Buy_Sell;
    trade.Quantity = quantity.toString();
    trade.Instrument_Code = order.Instrument_Code;
    trade.Isin_Code = order.ISIN_Code;
    trade.Sedol_Code = order.Sedol_Code;
    trade.Exchange_Id = instrument.PrimSecPrimExch;
    trade.Gross_Price = order.Limit_Price;
    trade.Quantity = quantity.toString();
    trade.Gross_Consideration = (Number(order.Limit_Price) * quantity).toString();
    trade.Counterparty_Code = order.Counterparty_Code;
    trade.Counterparty = order.Counterparty_Description;
    trade.Trade_Datetime = faker_1.faker.date.between({
        from: order.Entered_Datetime,
        to: (0, dayjs_1.default)(order.Entered_Datetime).add(8, "h").toDate(),
    });
    trade.Trade_Id = node_crypto_1.default.randomUUID();
    trade.Version_Number = 1;
    trade.Settlement_Datetime = (0, dayjs_1.default)(trade.Trade_Datetime)
        .add(2, "day")
        .toDate();
    trade.Dealt_Ccy = "USD";
    trade.Order_Id = order.Order_Id;
    trade.Entered_By = faker_1.faker.lorem.word();
    trade.Exchange_Trade_Code = instrument.PrimSecPrimExch;
    trade.Trader = trade.Entered_By = order.Trader;
    trade.Sub_Account = faker_1.faker.finance.accountName();
    trade.Notes = faker_1.faker.lorem.words({ min: 1, max: 3 });
    trade.Instrument_Id = instrument.BbgCompTicker;
    trade.Commission_Type = order.Commission_Type;
    trade.Commission_Value = order.Commission_Value;
    trade.Trading_Entity_Id = order.Executing_Entity;
    trade.Amended_Datetime = trade.Trade_Datetime;
    trade.Entered_Datetime = trade.Trade_Datetime;
    trade.Execution_Venue = instrument.PrimSecPrimExch;
    trade.Root_Order_Id = order.Root_Order_Id;
    return trade;
}
