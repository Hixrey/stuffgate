const express = require('express');
const app = express();
const port = 80; // Port sur lequel le serveur écoutera
// Route pour la page d'accueil
var players=[];

function ajoutePlayer(name, x, y, direction , index_idle , index_move) {
    const existingPlayer = players.find((player) => player.text === name);
    
    if (existingPlayer) {
      existingPlayer.index_idle = index_idle;
      existingPlayer.index_move = index_move;
      existingPlayer.x = x;
      existingPlayer.y = y;
      existingPlayer.direction = direction;
    } else {
      players.push({"id": players.length, "text": name, "x": x, "y": y, "direction": direction ,"index_idle": index_idle,"index_move": index_move});
    }
  }


app.get('/', (req, res) => {
res.send('Bonjour, ceci est la page d\'accueil de l\'API !');
});

app.get('/players', (req, res) => {
    res.send(players);
    });

app.get('/players::id', (req, res) => {
    res.send(players.filter((player) => req.params.id == player.id));
    });

app.post('/players', (req, res) => {
    ajoutePlayer(req.query.text, req.query.x, req.query.y, req.query.direction, req.query.index_idle, req.query.index_move);
    res.send(players);
    })
// Démarrez le serveur
app.listen(port, '0.0.0.0', () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
