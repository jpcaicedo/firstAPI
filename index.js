import express from "express";
import characters from "./data/db.js";

const app = express();
app.use(express.json());

app.get('/', (request, response) => {
	response.send({ message: 'Hello world' });
});

// GET - Todos los personajes
app.get('/characters', (request, response) => {
	response.json(characters);
});

// GET - Múltiples personajes separados por coma usando split
app.get('/characters/filter/:ids', (request, response) => {
	const ids = request.params.ids.split(',').map(Number);
	const filtered = characters.filter(c => ids.includes(c.id));

	if (filtered.length === 0) {
		return response.status(404).json({ message: 'No se encontraron personajes' });
	}

	response.json(filtered);
});

// GET - Personaje por ID
app.get('/characters/:id', (request, response) => {
	const id = parseInt(request.params.id);
	const character = characters.find(c => c.id === id);

	if (!character) {
		return response.status(404).json({ message: 'Personaje no encontrado' });
	}

	response.json(character);

});

app.listen(5050);
console.log('server is running on localhost:5050');