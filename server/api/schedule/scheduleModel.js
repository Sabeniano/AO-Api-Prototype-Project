import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  employee_id: Number,
  work_date: Date,
  start_work_hour: Date,
  end_work_hour: Date,
  is_holiday: Boolean,
  is_weekend: Boolean,
  links: [{}],
});

export default mongoose.model('schedules', scheduleSchema);
