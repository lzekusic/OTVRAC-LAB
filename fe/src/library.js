const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

async function updateFiles() {
    try {
        const csvResponse = await fetch('http://localhost:3001/pjevaciCsv');
        if (!csvResponse.ok) {
            throw new Error('Failed to fetch CSV data from external API');
        }
        const csvData = await csvResponse.text();

        const jsonResponse = await fetch('http://localhost:3001/pjevaciJson');
        if (!jsonResponse.ok) {
            throw new Error('Failed to fetch JSON data from external API');
        }
        const jsonData = await jsonResponse.json();

        const csvPath = "C:/OR-LAB/otvrac-github/fe/src/public/pjevaci.csv"
        const jsonPath = "C:/OR-LAB/otvrac-github/fe/src/public/pjevaci.json"

        if (fs.existsSync(csvPath)) {
            fs.unlinkSync(csvPath);
        }
        if (fs.existsSync(jsonPath)) {
            fs.unlinkSync(jsonPath);
        }

        fs.writeFileSync(csvPath, csvData, 'utf-8');
        fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 4), 'utf-8');
    } catch (error) {
        console.error('Error updating files:', error.message);
        throw error;
    }
}

module.exports = { updateFiles };