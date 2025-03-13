const { PostgreSqlContainer } = require('@testcontainers/postgresql');
const logger = require('@local/simply-logger');

let container;
let pool;

beforeAll(async () => {
    try {
        // Start PostgreSQL container
        container = await new PostgreSqlContainer()
            .withDatabase('test')
            .start();

        // Set environment variables for the application code
        process.env.DB_USER = container.getUsername();
        process.env.DB_PASSWORD = container.getPassword();
        process.env.DB_HOST = container.getHost();
        process.env.DB_PORT = container.getPort();
        process.env.DB_NAME = container.getDatabase();

        // Import and initialize pool after setting environment variables
        pool = require('./config/db').default;
        
        // Connect to the pool
        await require('./config/db').connect();

    } catch (error) {
        logger.error(`Error during setup: ${error}`);
        throw error;
    }
}, 30000);

afterAll(async () => {
    try {
        if (pool) {
            await require('./config/db').close();
        }
        if (container) {
            await container.stop();
        }
    } catch (error) {
        logger.error(`Error during cleanup: ${error}`);
    }
}, 30000);

// Export the pool so it can be used in test files
module.exports = { pool }; 