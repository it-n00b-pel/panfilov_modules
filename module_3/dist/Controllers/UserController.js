"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
let date1;
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = req.body;
                let date2 = new Date().getTime();
                // Разница в миллисекундах
                let diff = Math.abs(date1 - date2);
                // Количество часов
                let hours = Math.floor(diff / 3600000);
                diff = diff % 3600000;
                // Количество минут
                let minutes = Math.floor(diff / 60000);
                diff = diff % 60000;
                // Количество секунд
                let seconds = Math.floor(diff / 1000);
                let result = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                const user = yield User_1.default.create({ username, time: result });
                res.json(user);
            }
            catch (e) {
                res.status(500).json(e);
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User_1.default.find();
                date1 = new Date().getTime();
                return res.json(users);
            }
            catch (e) {
                res.status(500).json(e);
            }
        });
    }
}
exports.default = new UserController();
