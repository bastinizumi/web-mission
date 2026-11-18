import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    clientName: { type: String, required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    headline: { type: String, required: true },
    summary: { type: String, required: true },
    impactMetric: { type: String, default: '' },
    image: { type: String, required: true },
    accent: { type: String, default: '#38bdf8' },
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);

