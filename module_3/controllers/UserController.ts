import User from '../models/User';
import express from 'express';


let date1: number;

class UserController {
    async create(req: express.Request, res: express.Response) {
        try {
            const {name} = req.body;
            console.log(name);
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

            const user = await User.create({name, record: result});
            res.json(user);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getAll(req: express.Request, res: express.Response) {
        try {
            const users = await User.find();
            date1 = new Date().getTime();
            console.log('all');
            return res.json(users);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default new UserController();
