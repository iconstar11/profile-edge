const { app, testFirestoreConnection } = require('./app');
const port = process.env.PORT || 5000;

(async () => {
  await testFirestoreConnection();
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
})();