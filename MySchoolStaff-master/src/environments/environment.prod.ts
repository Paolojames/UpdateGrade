export const environment = {
  production: true,
  enableTokenVerificationPolling: true,
  verifyTokenInterval: 1000 * 60 * 5, //5 minutes
  elavatekoAPI: {
    url: 'https://api.elevateko.com',
    endpoints: {
      login: 'api/token',
      chagePassword: 'api/change-password',
      verifyToken: 'api/token/verify',
      schoolClass: 'api/classes',
      reward: 'api/rewards',
      sponsor: 'api/sponsors',
      student: 'api/students',
      studentProfile: 'api/student-profile',
      studentPoints: 'api/student-points',
      ticketPurchase: 'api/ticket-purchases',
    }
  }
};
