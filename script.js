// script.js
async function loadEntries() {
    const response = await fetch('/entries');
    const entries = await response.json();
    const entryList = document.getElementById('entryList');
    entryList.innerHTML = '';

    entries.forEach((entry, index) => {
        const li = document.createElement('li');
        // Nummerierung im Format "1. Dein Eintrag", "2. Dein Eintrag" usw.
        li.textContent = `${index + 1}. ${entry}`;
        entryList.appendChild(li);
    });
}

async function addEntry(entryText) {
    await fetch('/entries', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ entry: entryText }),
    });
    loadEntries();
}

document.getElementById('entryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const entryText = document.getElementById('entry').value.trim();
    if (entryText) {
        addEntry(entryText);
        document.getElementById('entry').value = '';
    }
});

document.addEventListener('DOMContentLoaded', loadEntries);
