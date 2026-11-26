import { useEffect, useState } from "react";
import "./App.css";

const API = "http://127.0.0.1:8000/api/series";

function App() {
  const [series, setSeries] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [ano, setAno] = useState("");
  const [avaliacao, setAvaliacao] = useState("");
  const [erros, setErros] = useState([]);
  const [busca, setBusca] = useState("");

  const seriesFiltradas = series.filter((serie) => 
    serie.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  const [resumo, setResumo] = useState(null);

  function carregarSeries() {
    fetch(API)
      .then((res) => res.json())
      .then((dados) => setSeries(dados));
  }

  // para trazer o resumo para a tela
  function carregarResumo() {
    fetch("http://127.0.0.1:8000/api/series/resumo")
      .then(resposta => resposta.json())
      .then(dados => setResumo(dados));
  }

  useEffect(() => {
    carregarSeries();
    carregarResumo();
  }, []);

  async function cadastrar(evento) {
    evento.preventDefault();
    setErros([]);

    const resposta = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, plataforma, ano, avaliacao }),
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      const mensagens = Object.values(dados.detalhes || {}).flat();
      setErros(mensagens);
      return;
    }

    setTitulo("");
    setPlataforma("");
    setAno("");
    setAvaliacao("");
    carregarSeries();
    carregarResumo();
  }

  return (
    <div className="pagina">

      <h2>Resumo das Séries:</h2>
      <div className="resumo">
      {resumo && (
        <div>
          <p>Total de Séries: {resumo.quantidade_series}</p>
          <p>Média das Avaliações: {resumo.media_avaliacoes}</p>
          <p>Melhor série: {resumo.melhor_serie}</p>
        </div>
      )}
      </div>
      
      <h1>Cadastro de Séries</h1>

      {erros.length > 0 && (
        <div style={{ color: "red", marginBottom: "10px" }}>
          {erros.map((msg, i) => (
            <p key={i}>{msg}</p>
          ))}
        </div>
      )}

      <form onSubmit={cadastrar}>
        <input
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <input
          placeholder="Plataforma"
          value={plataforma}
          onChange={(e) => setPlataforma(e.target.value)}
          required
        />
        <input
          placeholder="Ano"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
          required
        />
        <input
          placeholder="Avaliação"
          value={avaliacao}
          onChange={(e) => setAvaliacao(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>

      <h2>Séries Cadastradas</h2>

      <input placeholder="Buscar por título" 
      value = {busca}
      onChange={(e) => setBusca(e.target.value)}
      />

      {seriesFiltradas.length === 0 ?  (  
          <p>Nenhum item encontrado </p>
      ) : (
      <ul>
        {seriesFiltradas.map((serie) => (
          <li key={serie.id}>
            <b>Título:</b> {serie.titulo} <br></br> <b>Plataforma:</b>{" "}
            {serie.plataforma} <br></br> <b>Ano:</b>
            {serie.ano} <br></br> <b>Avaliação:</b> {serie.avaliacao}
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}

export default App;
