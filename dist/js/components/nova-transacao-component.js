import { TipoTransacao } from "../types/TipoTransacao.js";
import { atualizarSaldo, getSaldo } from "./saldo-component.js";
const elementoFormulario = document.querySelector(".block-nova-transacao form"); //seleciona no html o elemento do formulário
elementoFormulario.addEventListener("submit", function (event) {
    event.preventDefault(); //submit sem carregar a página
    if (!elementoFormulario.checkValidity()) { // checa se os campos estão de acordo com as especificações (required)
        alert("Por favor, verifique se todos os campos foram preenchidos devidamente e tente novamente!");
        return;
    }
    //coletando campos do formulário
    const inputTipo = document.querySelector("#tipoTransacao");
    const inputValor = document.querySelector("#valor");
    const inputData = document.querySelector("#data");
    let tipoTransacao = Number(inputTipo.value);
    let valor = inputValor.valueAsNumber;
    let data = new Date(inputData.value);
    let saldo = getSaldo();
    if (tipoTransacao == TipoTransacao.DEPOSITO) {
        saldo += valor;
        //Sempre que a transação for do tipo DEPÓSITO, o valor da transação deve ser adicionado ao saldo da conta.
        //Aqui é possível verificar um problema, pois como o JavaScript interpreta os valores de saldo e valor como texto, as operações de adiçãoi não funcionam porque na verdade são concatenados valores, não somados.
    }
    else if (tipoTransacao == TipoTransacao.TRANSFERENCIA || tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
        saldo -= valor;
        //Sempre que a transação for do tipo TRANSFERÊNCIA ou PAGAMENTO DE BOLETO, o valor da transação deve ser subtraído do saldo da conta.
    }
    else {
        alert("Transação inválida!");
        return;
    }
    atualizarSaldo(saldo);
    //construindo objeto que constam as informações do tipo transação criado
    const novaTransacao = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data
    };
    console.log(novaTransacao);
    elementoFormulario.reset();
});
