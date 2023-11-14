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
exports.Orders = void 0;
const typeorm_1 = require("typeorm");
let Orders = class Orders {
    constructor() {
        this.Version = 1;
    }
};
exports.Orders = Orders;
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Orders.prototype, "Order_State", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Orders.prototype, "Executing_Entity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Orders.prototype, "Contracting_Entity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Orders.prototype, "Instrument_Code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 500,
        nullable: true,
    }),
    __metadata("design:type", String)
], Orders.prototype, "Instrument_Description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Orders.prototype, "ISIN_Code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Orders.prototype, "Sedol_Code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Orders.prototype, "Market_Id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Orders.prototype, "Counterparty_Code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 500,
        nullable: true,
    }),
    __metadata("design:type", String)
], Orders.prototype, "Counterparty_Description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Orders.prototype, "Top_Level", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: false,
        primary: true,
    }),
    __metadata("design:type", String)
], Orders.prototype, "Order_Id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        nullable: false,
        primary: true,
    }),
    __metadata("design:type", Number)
], Orders.prototype, "Version", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Orders.prototype, "Buy_Sell", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        nullable: true,
        scale: 14,
        precision: 28,
    }),
    __metadata("design:type", String)
], Orders.prototype, "Total_Quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        nullable: true,
        scale: 14,
        precision: 28,
    }),
    __metadata("design:type", String)
], Orders.prototype, "Quantity_Field", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        nullable: true,
        scale: 14,
        precision: 28,
    }),
    __metadata("design:type", String)
], Orders.prototype, "Limit_Price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        nullable: true,
        scale: 14,
        precision: 28,
    }),
    __metadata("design:type", String)
], Orders.prototype, "Gross_Fill_Price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Orders.prototype, "Dealt_Ccy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Orders.prototype, "Settlement_Ccy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        nullable: true,
        scale: 14,
        precision: 28,
    }),
    __metadata("design:type", String)
], Orders.prototype, "Dealt_To_Settlement_Rate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "datetime",
        nullable: true,
    }),
    __metadata("design:type", Date)
], Orders.prototype, "Amended_Datetime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Orders.prototype, "Trader", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Orders.prototype, "Num_Fills", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "datetime",
        nullable: true,
    }),
    __metadata("design:type", Date)
], Orders.prototype, "Entered_Datetime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "datetime",
        nullable: true,
    }),
    __metadata("design:type", Date)
], Orders.prototype, "Settlement_Datetime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Orders.prototype, "Commission_Type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        nullable: true,
        scale: 14,
        precision: 28,
    }),
    __metadata("design:type", String)
], Orders.prototype, "Commission_Value", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Orders.prototype, "Buy_Sell_Qualifier", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Orders.prototype, "Root_Order_Id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        nullable: true,
        scale: 14,
        precision: 28,
    }),
    __metadata("design:type", String)
], Orders.prototype, "Quantity_Available", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        nullable: true,
        scale: 14,
        precision: 28,
    }),
    __metadata("design:type", String)
], Orders.prototype, "Quantity_Filled_Today", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 100,
        nullable: true,
    }),
    __metadata("design:type", String)
], Orders.prototype, "Order_Flags", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "datetime",
        nullable: true,
    }),
    __metadata("design:type", Date)
], Orders.prototype, "Last_Complete_Datetime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Orders.prototype, "Account_Code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 300,
        nullable: true,
    }),
    __metadata("design:type", String)
], Orders.prototype, "Order_Notes", void 0);
exports.Orders = Orders = __decorate([
    (0, typeorm_1.Entity)({ database: "techtest", name: "Orders" })
], Orders);
