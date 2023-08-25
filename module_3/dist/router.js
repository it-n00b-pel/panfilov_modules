"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("./Controllers/UserController"));
const router = express_1.default.Router();
router.post('/v1/record/', UserController_1.default.create);
router.get('/v1/record/', UserController_1.default.getAll);
exports.default = router;
