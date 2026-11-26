function Lista({ series }) {
    if (series.length === 0){
        return <p>Nenhum item encontrado</p>
    }


return(
    <ul>
        {series.map((serie) => (
            <li key = {serie.id}>
                <b>Titulo: </b> {serie.titulo} <br></br> <b>Plataforma:</b>{" "}
                 {serie.plataforma} <br></br> <b>Ano:</b>
                 {serie.ano} <br></br> <b>Avaliação:</b> {serie.avaliacao}
            </li>
         ))}
    </ul>
);
}
export default Lista