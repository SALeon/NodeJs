import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id: String,
    name: String,
    phone: String,
    address: String
});

const User = mongoose.model('User', userSchema);

export default User;
