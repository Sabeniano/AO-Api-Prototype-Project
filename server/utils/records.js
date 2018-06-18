function recordGenerator(id) {
  const recordAll = {
    walletTemplate: {
      wage: 0,
      salary: 0,
      employees_id: id,
    },
    scheduleTemplate: {
      employee_id: id,
    },
    workhoursTemplate: {
      employees_id: id,
      totalHoursThisPaycheck: 0,
      totalOvertimeHoursThisPaycheck: 0,
    },
  };
  return recordAll;
}
export default recordGenerator;
