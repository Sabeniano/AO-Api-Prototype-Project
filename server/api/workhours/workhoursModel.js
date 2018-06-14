import mongoose from 'mongoose';

const workhoursSchema = new mongoose.Schema({
  employees_id: String,
  totalHoursThisPaycheck: Number,
  totalOvertimeHoursThisPaycheck: Number,
  links: [{}],
});

export default mongoose.model('workhours', workhoursSchema);
