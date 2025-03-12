require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('@local/simply-logger');
const notesRoutes = require('./routes/notes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/notes', notesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`🚀 Server started on http://localhost:${PORT}`);
});