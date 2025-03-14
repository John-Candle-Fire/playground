document.getElementById('raceForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const raceNo = document.getElementById('raceNo').value;
    const url = `https://racing.hkjc.com/racing/English/tipsindex/tips_index.asp?RaceNo=${raceNo}`;

    try {
        const response = await fetch('/scrape', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        });
        const data = await response.json();
        document.getElementById('output').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Error:', error);
    }
});
