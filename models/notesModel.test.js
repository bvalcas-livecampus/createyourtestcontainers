const { pool } = require('../jest.setup');
const notesModel = require('./notesModel');

describe('Notes Model Tests', () => {
    beforeEach(async () => {
        // Create table in test container
        await pool.query(`
            CREATE TABLE IF NOT EXISTS notes (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
    });

    afterEach(async () => {
        await pool.query('DELETE FROM notes');
    });

    describe('getAllNotes', () => {
        it('should return all notes', async () => {
            // Insert test data using model
            await notesModel.createNote('Test Note 1', 'Content 1');
            await notesModel.createNote('Test Note 2', 'Content 2');
        });
    });

    describe('getNote', () => {
        it('should return a specific note', async () => {
            // Insert test data using model
            const note = await notesModel.createNote('Test Note', 'Content');
        });
    });

    // Add other test cases as needed...
});
