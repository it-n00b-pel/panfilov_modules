import mongoose from 'mongoose';

const User = new mongoose.Schema({
    username: {type: String, required: true},
    time: {type: String, required: true},
});

export default mongoose.model('User', User);
