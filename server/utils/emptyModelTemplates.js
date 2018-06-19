import hateaosGenerator from './hyperMediaLinkGenerator';

function recordGenerator(employeeId, mongooseInstance, hostname, url) {
  const jobTemplate = {
    _id: mongooseInstance.Types.ObjectId(),
    jobTitle: '',
    employee_id: employeeId,
    description: '',
    permissions: [],
    links: [],
  };
  hateaosGenerator(jobTemplate, hostname, `${url}/${employeeId}/job`, ['self']);

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
  hateaosGenerator(scheduleTemplate, hostname, `${url}/${employeeId}/schedule`, ['self']);

  const walletTemplate = {
    _id: mongooseInstance.Types.ObjectId(),
    wage: 0,
    salary: 0,
    paymentMethod: 'Hourly',
    employees_id: employeeId,
    lastChanged: Date.now(),
    links: [],
  };
  hateaosGenerator(walletTemplate, hostname, `${url}/${employeeId}/wallet`, ['self']);

  const workhourTemplate = {
    _id: mongooseInstance.Types.ObjectId(),
    employees_id: employeeId,
    totalHoursThisPaycheck: 0,
    totalOvertimeHoursThisPaycheck: 0,
    links: [],
  };
  hateaosGenerator(workhourTemplate, hostname, `${url}/${employeeId}/workhours`, ['self']);

  return {
    jobTemplate,
    scheduleTemplate,
    walletTemplate,
    workhourTemplate,
  };
}
export default recordGenerator;
