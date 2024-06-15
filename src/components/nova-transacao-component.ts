import { Transacao } from "../types/Transacao.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
import { atualizarSaldo, getSaldo } from "./saldo-component.js";

const elementoFormulario    = document.querySelector(".block-nova-transacao form") as HTMLFormElement;   //seleciona no html o elemento do formulário
elementoFormulario.addEventListener("submit", function(event){   //escuta o evento "submit"
    event.preventDefault(); //submit sem carregar a página

    if(!elementoFormulario.checkValidity()){ // checa se os campos estão de acordo com as especificações (required)
        alert("Por favor, verifique se todos os campos foram preenchidos devidamente e tente novamente!");
        return;
    }

    //coletando campos do formulário
    const inputTipo     = document.querySelector("#tipoTransacao") as HTMLSelectElement;
    const inputValor    = document.querySelector("#valor") as HTMLInputElement;
    const inputData     = document.querySelector("#data") as HTMLInputElement;

    let tipoTransacao: TipoTransacao = Number(inputTipo.value) as TipoTransacao;
    let valor: number = inputValor.valueAsNumber;
    let data: Date = new Date(inputData.value);
    
    let saldo: number = getSaldo();
    
    if(tipoTransacao == TipoTransacao.DEPOSITO){
        saldo += valor;
        //Sempre que a transação for do tipo DEPÓSITO, o valor da transação deve ser adicionado ao saldo da conta.

        //Aqui é possível verificar um problema, pois como o JavaScript interpreta os valores de saldo e valor como texto, as operações de adiçãoi não funcionam porque na verdade são concatenados valores, não somados.
    }else if(tipoTransacao == TipoTransacao.TRANSFERENCIA || tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO){
        saldo -= valor;
        //Sempre que a transação for do tipo TRANSFERÊNCIA ou PAGAMENTO DE BOLETO, o valor da transação deve ser subtraído do saldo da conta.
    }else{
        alert("Transação inválida!");
        return;
    }

    atualizarSaldo(saldo); 

    //construindo objeto que constam as informações do tipo transação criado
    const novaTransacao: Transacao = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data
    }

    console.log(novaTransacao);
    elementoFormulario.reset();

});