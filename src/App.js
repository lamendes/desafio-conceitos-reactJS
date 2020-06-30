import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Novo Repositorio ${Date.now()}`,
      url: "www.github/lamendes",
      techs: ["NodeJs", "ReactJS"],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleLikeRepository(id) {
    await api.post(`repositories/${id}/like`);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}{" "}
            <button onClick={() => handleLikeRepository(repository.id)}>
              Like
            </button>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
