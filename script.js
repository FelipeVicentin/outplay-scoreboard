const SHEET_ID = "14UYi9pw6GkO1z3SUePABkE8_wHRjyyKFGuKF_HBZ17g";
const GID = "610259364";

const URL =
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?gid=${GID}&tqx=out:json`;

async function carregarRanking() {

    try {

        const resposta = await fetch(URL);
        const texto = await resposta.text();

        const json = JSON.parse(texto.substring(47).slice(0, -2));

        const linhas = json.table.rows;

        const tabela = document.getElementById("ranking");

        tabela.innerHTML = "";

        let posicao = 1;

        linhas.forEach(linha => {

            // Coluna R = índice 17
            const atleta = linha.c[17]?.v;

            // Coluna S = índice 18
            const pontos = linha.c[18]?.v;

            if (!atleta) return;

            let medalha = posicao + "º";

            if (posicao === 1) medalha = "🥇";
            if (posicao === 2) medalha = "🥈";
            if (posicao === 3) medalha = "🥉";

            tabela.innerHTML += `
                <tr>
                    <td>${medalha}</td>
                    <td>${atleta}</td>
                    <td>${pontos}</td>
                </tr>
            `;

            posicao++;

        });

        document.getElementById("ultimaAtualizacao").innerHTML =
            "Última atualização: " + new Date().toLocaleTimeString();

    } catch (erro) {

        console.error(erro);

        document.getElementById("ranking").innerHTML = `
            <tr>
                <td>⚠️</td>
                <td>Erro ao conectar à planilha</td>
                <td>-</td>
            </tr>
        `;
    }

}

carregarRanking();

setInterval(carregarRanking, 5000);