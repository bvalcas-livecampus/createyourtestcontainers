require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('@local/simply-logger');
const { EmojisKeys } = require('@local/simply-logger/dist/types');
const notesRoutes = require('./routes/notes');
const { connect, close } = require('./config/db');

connect().then(() => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    
    app.use('/notes', notesRoutes);
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        logger.info(`Server started on http://localhost:${PORT}`, EmojisKeys.SUCCESS);
    });
}).catch((err) => {
    logger.error(`Error connecting to database: ${err}`, EmojisKeys.ERROR);
});

const gracefulShutdown = async (signal, immediate = true) => {
    const message = `${signal} signal received`;
    logger.info(`${message}. Shutting down gracefully...`, EmojisKeys.WARNING)
              
    const cleanup = async () => {
        try {
            await close();
            if (immediate) {
                logger.info('Database connection closed successfully', EmojisKeys.SUCCESS);
            }
            process.exit(0);
        } catch (error) {
            if (immediate) {
                logger.error(`Error during shutdown: ${error}`, EmojisKeys.ERROR);
            }
            process.exit(1);
        }
    };

    immediate ? await cleanup() : setTimeout(cleanup, 3000);
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM', false));
process.on('SIGUSR2', () => gracefulShutdown('SIGUSR2')); // nodemon restart signal
