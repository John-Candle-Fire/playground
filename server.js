const express = require('express');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const app = express();
app.use(express.json());

app.post('/scrape', async (req, res) => {
    const { url } = req.body;

    try {
        const response = await fetch(url);
        const body = await response.text();
        const $ = cheerio.load(body);

        const tableData = [];
        $('table tr').each((index, element) => {
            if (index === 0) return; // Skip header row
            const row = {};
            row.horseNumber = $(element).find('td').eq(0).text().trim();
            row.horseName = $(element).find('td').eq(1).text().trim();
            row.weight = $(element).find('td').eq(2).text().trim();
            row.trainer = $(element).find('td').eq(3).text().trim();
            row.jockey = $(element).find('td').eq(4).text().trim();
            row.draw = $(element).find('td').eq(5).text().trim();
            row.odds = $(element).find('td').eq(6).text().trim();
            row.initialTipsIndex = $(element).find('td').eq(7).text().trim();
            row.raceDayTipsIndex = $(element).find('td').eq(9).text().trim();
            tableData.push(row);
        });

        res.json(tableData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error scraping the website');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
