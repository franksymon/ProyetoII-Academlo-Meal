const { app } = require('./app');

// MODELS
const { initModels } = require('./models/initModels');

//UTILS
const { db } = require('./utils/databese');

//AUTHENTICATE DATABASE CREDENTIALS
db.authenticate()
  .then(() => console.log('Database authenticated'))
  .catch(err => console.log(err));

// Establish models relations
initModels();

//SYNC SEQUELIZE MODELS
db.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.log(err));

//SPIN PU SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});
