import mongoose from 'mongoose';

const workhoursSchema = new mongoose.Schema({
  totalHoursThisPaycheck: Number,
  totalOvertimeHoursThisPaycheck: Number,
  links: [{}],
});

export default mongoose.model('workhours', workhoursSchema);
