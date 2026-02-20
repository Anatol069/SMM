import mongoose from 'mongoose';

const socialAccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    platform: {
        type: String,
        enum: ['instagram', 'facebook', 'twitter', 'tiktok', 'linkedin', 'youtube', 'threads', 'snapchat'],
        required: true,
    },
    accountId: {
        type: String,
        required: true,
    },
    accountName: String,
    accountHandle: String,
    profileImage: String,
    bio: String,
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
    accessToken: String,
    refreshToken: String,
    tokenExpiry: Date,
    isConnected: { type: Boolean, default: true },
    lastSyncedAt: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('SocialAccount', socialAccountSchema);
