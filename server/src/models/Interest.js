import mongoose from 'mongoose';

const interestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    startup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Startup',
      required: true,
    },
  },
  { timestamps: true }
);

interestSchema.index({ user: 1, startup: 1 }, { unique: true });

export const Interest = mongoose.model('Interest', interestSchema);
