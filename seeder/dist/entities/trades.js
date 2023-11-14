"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trades = void 0;
const faker_1 = require("@faker-js/faker");
const typeorm_1 = require("typeorm");
let Trades = class Trades {
    constructor() {
        this.Record_Type = "M";
        this.State = faker_1.faker.helpers.arrayElement(["I", "C"]);
        this.Buy_Sell = faker_1.faker.helpers.arrayElement(["B", "S"]);
        this.Quantity = faker_1.faker.finance.amount({
            autoFormat: false,
            dec: 10,
            max: 10000,
            min: 10,
        });
        this.Version_Number = 1;
        this.Order_Price_Type = "EQ";
        this.Root_Order_Id = null;
    }
};
exports.Trades = Trades;
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: false,
    }),
    __metadata("design:type", String)
], Trades.prototype, "Record_Type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Trades.prototype, "State", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Trades.prototype, "Buy_Sell", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        nullable: true,
        scale: 14,
        precision: 28,
    }),
    __metadata("design:type", String)
], Trades.prototype, "Quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Trades.prototype, "Instrument_Code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Trades.prototype, "Isin_Code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Trades.prototype, "Sedol_Code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Trades.prototype, "Exchange_Id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        nullable: true,
        scale: 14,
        precision: 28,
    }),
    __metadata("design:type", String)
], Trades.prototype, "Gross_Price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        nullable: true,
        scale: 14,
        precision: 28,
    }),
    __metadata("design:type", String)
], Trades.prototype, "Gross_Consideration", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Trades.prototype, "Counterparty_Code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Trades.prototype, "Counterparty", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "datetime",
        nullable: true,
    }),
    __metadata("design:type", Date)
], Trades.prototype, "Trade_Datetime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: false,
        primary: true,
    }),
    __metadata("design:type", String)
], Trades.prototype, "Trade_Id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        precision: 10,
        nullable: false,
        primary: true,
    }),
    __metadata("design:type", Number)
], Trades.prototype, "Version_Number", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "datetime",
        nullable: true,
    }),
    __metadata("design:type", Date)
], Trades.prototype, "Settlement_Datetime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Trades.prototype, "Dealt_Ccy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Trades.prototype, "Order_Id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Trades.prototype, "Entered_By", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Trades.prototype, "Exchange_Trade_Code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Trades.prototype, "Trader", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Trades.prototype, "Trade_Flags", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Trades.prototype, "Sub_Account", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 500,
        nullable: true,
    }),
    __metadata("design:type", String)
], Trades.prototype, "Notes", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Trades.prototype, "Instrument_Id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "datetime",
        nullable: true,
    }),
    __metadata("design:type", Date)
], Trades.prototype, "Entered_Datetime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Trades.prototype, "Commission_Type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        nullable: true,
        scale: 14,
        precision: 28,
    }),
    __metadata("design:type", String)
], Trades.prototype, "Commission_Value", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Trades.prototype, "Trading_Entity_Id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "datetime",
        nullable: true,
    }),
    __metadata("design:type", Date)
], Trades.prototype, "Amended_Datetime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Trades.prototype, "Execution_Venue", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Trades.prototype, "Order_Price_Type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Trades.prototype, "Root_Order_Id", void 0);
exports.Trades = Trades = __decorate([
    (0, typeorm_1.Entity)({ database: "techtest", name: "Trades" })
], Trades);
