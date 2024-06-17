import { TipoTransacao } from "./TipoTransacao.js";
let saldo = JSON.parse(localStorage.getItem("saldo")) || 0.0; //localstorage é o banco de dados do navegador, esse banco só aceita Strings
const transacoes = JSON.parse(localStorage.getItem("transacoes"), (key, value) => {
    if (key === "data") {
        return new Date(value);
    }
    return value;
}) || [];
const VALOR_MINIMO_TRANSACAO = 0.01;
function debitar(valor) {
    if (valor < VALOR_MINIMO_TRANSACAO) {
        throw new Error(`O valor mínimo para débito é de R$${VALOR_MINIMO_TRANSACAO.toFixed(2)}`);
    }
    else if (valor > saldo) {
        throw new Error("Saldo insuficiente!");
    }
    saldo -= valor;
    localStorage.setItem("saldo", saldo.toString()); //guarda no banco de dados do navegador
}
function depositar(valor) {
    if (valor < VALOR_MINIMO_TRANSACAO) {
        throw new Error(`O valor mínimo para depósito é de R$${VALOR_MINIMO_TRANSACAO.toFixed(2)}`);
    }
    saldo += valor;
    localStorage.setItem("saldo", saldo.toString()); //guarda no banco de dados do navegador
}
const Conta = {
    getsaldo() {
        return saldo;
    },
    getDataAcesso() {
        return new Date();
    },
    getGruposTransacoes() {
        const grupostransacoes = [];
        const listaTransacoes = structuredClone(transacoes);
        const transacoesOrdenadas = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime()); //compara as duas datas e ordena pela mais recente
        let labelAtualGrupoTransacao = "";
        //verifica se o grupo ja existe, caso exista coloca dentro do mesmo, se não, cria outro com o rótulo que estou criando
        for (let transacao of transacoesOrdenadas) {
            let labelGrupotransacao = transacao.data.toLocaleDateString("pt-br", { month: "long", year: "numeric" });
            if (labelAtualGrupoTransacao !== labelGrupotransacao) {
                labelAtualGrupoTransacao = labelGrupotransacao;
                grupostransacoes.push({
                    label: labelAtualGrupoTransacao,
                    transacoes: []
                });
            }
            grupostransacoes.at(-1).transacoes.push(transacao); //adiciona no final da lista
        }
        return grupostransacoes;
    },
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            depositar(novaTransacao.valor);
            //Sempre que a transação for do tipo DEPÓSITO, o valor da transação deve ser adicionado ao saldo da conta.
            //Aqui é possível verificar um problema, pois como o JavaScript interpreta os valores de saldo e valor como texto, as operações de adiçãoi não funcionam porque na verdade são concatenados valores, não somados.
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
            //Sempre que a transação for do tipo TRANSFERÊNCIA ou PAGAMENTO DE BOLETO, o valor da transação deve ser subtraído do saldo da conta.
        }
        else {
            throw new Error("Transação inválida!");
        }
        transacoes.push(novaTransacao);
        localStorage.setItem("transacoes", JSON.stringify(transacoes));
    }
};
export default Conta;
