// script.js

// Funktion, um Einträge zu laden
function loadEntries() {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    const entryList = document.getElementById('entryList');
    entryList.innerHTML = ''; // Liste leeren

    entries.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = entry;
        entryList.appendChild(li);
    });
}

// Funktion, um neuen Eintrag hinzuzufügen
function addEntry(entryText) {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push(entryText);
    localStorage.setItem('entries', JSON.stringify(entries));
}

// Eventlistener für das Formular
document.getElementById('entryForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const entryText = document.getElementById('entry').value.trim();
    if (entryText) {
        addEntry(entryText); // Eintrag speichern
        loadEntries();       // Einträge neu laden
        document.getElementById('entry').value = ''; // Eingabefeld leeren
    }
});

// Seite laden und Einträge anzeigen
document.addEventListener('DOMContentLoaded', loadEntries);
