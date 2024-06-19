require('dotenv').config();
const app = require('./app');
const cors = require('cors')
app.use(cors())

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
