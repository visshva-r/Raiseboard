import mongoose from 'mongoose';

const startupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    oneLiner: { type: String, required: true, trim: true, maxlength: 200 },
    sector: { type: String, required: true, trim: true },
    fundingAsk: { type: Number, required: true, min: 0 },
    founder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

export const Startup = mongoose.model('Startup', startupSchema);
