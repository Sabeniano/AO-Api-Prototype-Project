import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  jobTitle: String,
  description: String,
  permissions: [],
  links: [{}],
});

export default mongoose.model('jobs', jobSchema);
