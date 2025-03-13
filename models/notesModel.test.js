const pool = require('../jest.setup');
const notesModel = require('./notesModel');
const logger = require('@local/simply-logger');

describe('Notes Model Tests', () => {
    it('pool should be an instance of pg.Pool', () => {
        const { Pool } = require('pg');
        logger.info('Verifying pool is instance of pg.Pool');
        expect(pool).toBeInstanceOf(Pool);
    });

    describe('getAllNotes', () => {
        beforeAll(async () => {
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
        
        afterAll(async () => {
            await pool.query('DELETE FROM notes');
        });

        it('should return all notes', async () => {
            // Insert test data using model
            await notesModel.createNote('Test Note 1', 'Content 1');
            await notesModel.createNote('Test Note 2', 'Content 2');
        });
    });

    describe('getNote', () => {
        beforeAll(async () => {
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
        
        afterAll(async () => {
            await pool.query('DELETE FROM notes');
        });

        it('should return a specific note', async () => {
            // Insert test data using model
            const note = await notesModel.createNote('Test Note', 'Content');
        });
    });

    // Add other test cases as needed...
});
