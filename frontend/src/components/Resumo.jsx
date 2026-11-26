function Resumo ({ series }) {
    if (series.length === 0) {
        return null;
    }

    const total = series.length;
    const media = series.reduce((soma, s) => soma + s.avaliacao, 0) / total;
    const melhor = series.reduce((a, b) => (b.avaliacao > a.avaliacao ? b : a));

    return (
        <div>
        <h2>Resumo</h2>
        <p>Total de séries cadastradas: {total}</p>
        <p>Média das avaliações: {media.toFixed(2)}</p>
        <p>Melhor série: {melhor.titulo}</p>
        </div>
  );
}

export default Resumo;