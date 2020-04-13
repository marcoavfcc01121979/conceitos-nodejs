const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs, likes } = request.body;

  const repositoriesIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoriesIndex < 0) {
    return response.status(400).json({ error: 'Project not found!' });
  }

  const repository = {
    id, title, url, techs, likes: 0
  };

  repositories[repositoriesIndex] = repository;
  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositoriesIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoriesIndex < 0) {
    return response.status(400).json({ error: 'Project not found!' });
  }

  repositories.splice(repositoriesIndex, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const repository = repositories.find(repository => repository.id === id);

  if(!repository){
    return response.status(400).json({ error: 'repository invalid!' });
  }

  repository.likes += 1;

  return response.json(repository);
});


module.exports = app;
