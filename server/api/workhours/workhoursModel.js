import mongoose from 'mongoose';

const workhoursSchema = new mongoose.Schema({
  totalHoursThisPaycheck: Number,
  totalOvertimeHours: Number,
  links: [{}],
});

export default mongoose.model('Workhours', workhoursSchema);
