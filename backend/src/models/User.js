import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
    },
    avatar: String,
    timezone: {
        type: String,
        default: 'UTC',
    },
    plan: {
        type: String,
        enum: ['free', 'pro', 'business'],
        default: 'free',
    },
    settings: {
        notifications: { type: Boolean, default: true },
        autoPublish: { type: Boolean, default: false },
        theme: { type: String, default: 'light' },
    },
    socialAccounts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SocialAccount',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcryptjs.genSalt(10);
        this.password = await bcryptjs.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

export default mongoose.model('User', userSchema);
