function Formulario({
  titulo, setTitulo,
  plataforma, setPlataforma,
  ano, setAno,
  avaliacao, setAvaliacao,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit}>
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
  );
}

export default Formulario;