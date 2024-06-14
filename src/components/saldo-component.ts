import { formatarData, formatarMoeda } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";

let saldo: number = 0;

//verifica se é realmente um elemento HTML
const elementoSaldo = document.querySelector(".saldo-valor .valor") as HTMLElement;
const elementoDataAcesso = document.querySelector(".block-saldo time") as HTMLElement;




if(elementoDataAcesso != null){
    const dataAcesso: Date = new Date();
    elementoDataAcesso.textContent = formatarData(dataAcesso, FormatoData.DIA_SEMANA_DIA_MES_ANO); //atualiza a data
}

export function getSaldo(): number{
    return saldo
}

atualizarSaldo(saldo);
export function atualizarSaldo(novoSaldo: number): void{
    saldo = novoSaldo
    //verifica se é um elemento null ou que não existe para poder aplicar ".textContent"
    if(elementoSaldo != null){
        elementoSaldo.textContent   = formatarMoeda(saldo);  //atualiza no html o saldo do usuário
    }
}