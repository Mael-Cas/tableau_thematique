const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const PORT = 10001;
const generateIndexHtml = require('./page/Index-get.js');

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
    const indexHtml = await generateIndexHtml();
    res.send(indexHtml);
});

app.get('/api/getSavedTables', async (req, res) => {
    try {
        const filePath = path.join(__dirname, 'tableau.txt');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const tableContents = fileContent.trim().split('\n\n'); // Séparation des tableaux par une ligne vide
        const savedTables = tableContents.map(tableContent => {
            const tableRows = tableContent.trim().split('\n');
            const headers = tableRows[0].split('|');
            const data = tableRows.slice(1).map(row => {
                const rowData = row.split('|');
                return headers.reduce((acc, header, index) => {
                    acc[header] = rowData[index];
                    return acc;
                }, {});
            });
            return { headers, data };
        });

        res.json(savedTables);
    } catch (error) {
        console.error('Erreur lors de la récupération des tableaux sauvegardés:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des tableaux sauvegardés.' });
    }
});

app.post('/api/saveTable', async (req, res) => {
    try {
        const { headers, data } = req.body;
        const tableContent = `${headers.join('|')}\n${data.map(row => Object.values(row).join('|')).join('\n')}\n`;

        const filePath = path.join(__dirname, 'tableau.txt');
        await fs.appendFile(filePath, `\n${tableContent}`); // Ajout d'une ligne vide avant le nouveau tableau

        console.log('Tableau sauvegardé avec succès.');
        res.sendStatus(200);
    } catch (error) {
        console.error('Erreur lors de la sauvegarde du tableau:', error);
        res.status(500).json({ error: 'Erreur lors de la sauvegarde du tableau.' });
    }
});

app.delete('/api/deleteTable/:index', async (req, res) => {
    try {
        const { index } = req.params;

        const filePath = path.join(__dirname, 'tableau.txt');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const tableContents = fileContent.trim().split('\n\n');

        if (index >= 0 && index < tableContents.length) {
            tableContents.splice(index, 1);
            const updatedContent = tableContents.join('\n\n') + '\n';
            await fs.writeFile(filePath, updatedContent);

            console.log('Tableau supprimé avec succès.');
            res.sendStatus(200);
        } else {
            res.status(400).json({ error: 'Index de tableau invalide.' });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du tableau:', error);
        res.status(500).json({ error: 'Erreur lors de la suppression du tableau.' });
    }
});


app.listen(PORT, () => {
    console.log(`Serveur démarré : http://localhost:${PORT}`);
});
