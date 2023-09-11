"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const envalid_1 = require("../libs/envalid");
exports.env = (0, envalid_1.cleanEnv)(process.env, {
    DATABASE_HOST: (0, envalid_1.str)({ default: "db" }),
    DATABASE_PORT: (0, envalid_1.port)({ default: 3306 }),
    DATABASE_USERNAME: (0, envalid_1.str)({ default: "root" }),
    DATABASE_PASSWORD: (0, envalid_1.str)({ default: "secret" }),
});
