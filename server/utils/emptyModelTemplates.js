function recordGenerator(employeeId, mongooseInstance) {
  const jobTemplate = {
    _id: mongooseInstance.Types.ObjectId(),
    jobTitle: '',
    description: '',
    permissions: [],
    links: [],
  };
  const scheduleTemplate = {
    _id: mongooseInstance.Types.ObjectId(),
    employee_id: '',
    work_date: '',
    start_work_hour: '',
    end_work_hour: '',
    is_holiday: false,
    is_weekend: false,
    links: [],
  };
  const walletTemplate = {
    _id: mongooseInstance.Types.ObjectId(),
    wage: 0,
    salary: 0,
    paymentMethod: 'Hourly',
    employees_id: employeeId,
    lastChanged: Date.now(),
    links: [],
  };

  const workhourTemplate = {
    _id: mongooseInstance.Types.ObjectId(),
    employees_id: employeeId,
    totalHoursThisPaycheck: 0,
    totalOvertimeHoursThisPaycheck: 0,
    links: [],
  };
  return {
    jobTemplate,
    scheduleTemplate,
    walletTemplate,
    workhourTemplate,
  };
}
export default recordGenerator;
