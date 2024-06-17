import { Transacao } from "../types/Transacao.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
import SaldoComponent from "./saldo-component.js";
import Conta from "../types/Conta.js";
import ExtratoComponent from "./extrato-component.js";

const elementoFormulario    = document.querySelector(".block-nova-transacao form") as HTMLFormElement; //seleciona no html o elemento do formulário

    elementoFormulario.addEventListener("submit", function(event){   //escuta o evento "submit"
        event.preventDefault(); //submit sem carregar a página
        try{//tratamento de erros
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
            let data: Date = new Date(inputData.value + " 00:00:00"); // pra pegar a data exata, sem o + 00h00 vai marcar 1 dia a menos

            //construindo objeto que constam as informações do tipo transação criado
            const novaTransacao: Transacao = {
                tipoTransacao: tipoTransacao,
                valor: valor,
                data: data
            }
            
            Conta.registrarTransacao(novaTransacao);
            SaldoComponent.atualizar();
            ExtratoComponent.atualizar();
            elementoFormulario.reset();

        }catch(error){//caso não consia executar, exibe o alerta
            alert(error.message);
        }
    });

