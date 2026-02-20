import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['image', 'video', 'carousel'],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  thumbnailUrl: String,
  size: Number,
  duration: Number, // for videos
  dimensions: {
    width: Number,
    height: Number,
  },
  metadata: mongoose.Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Media', mediaSchema);
