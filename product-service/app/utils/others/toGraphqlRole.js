const ROLE_MAP = {
  Admin: 'ADMIN',
  'Support Staff': 'SUPPORT_STAFF',

  'Call Center Supervisor': 'CALL_CENTER_SUPERVISOR',
  'Call Center Technician': 'CALL_CENTER_TECHNICIAN',

  'Facility Admin': 'FACILITY_ADMIN',
  'Clinic Technician': 'CLINIC_TECHNICIAN',
  'Clinic Physician': 'CLINIC_PHYSICIAN',
  'Billing User': 'BILLING_USER',

  'Sales Admin': 'SALES_ADMIN',
  'Sales Manager': 'SALES_MANAGER',
  'Sales Representative': 'SALES_REPRESENTATIVE',
};

function toGraphqlRole(role) {
  return ROLE_MAP[role];
}

module.exports = {
  toGraphqlRole,
};
