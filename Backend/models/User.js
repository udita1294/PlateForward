import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type : String, required: true, trim: true },
    email: {type : String, required: true, trim: true, unique: true },
    password: {type : String, required: true, trim: true, minlength: 6 },
    role : {type : String, enum: ['donor', 'receiver','volunteer'], default: 'donor' },
    phone : {type : String},
     address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String }
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;