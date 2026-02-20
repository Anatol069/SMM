import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  mediaIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Media',
    },
  ],
  platforms: [
    {
      type: String,
      enum: [
        'instagram',
        'facebook',
        'twitter',
        'tiktok',
        'linkedin',
        'youtube',
        'threads',
        'snapchat',
      ],
    },
  ],
  scheduledTime: {
    type: Date,
    required: true,
  },
  publishedTime: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'published', 'failed'],
    default: 'draft',
  },
  hashtags: [String],
  mentions: [String],
  engagement: {
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    impressions: { type: Number, default: 0 },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Post', postSchema);
