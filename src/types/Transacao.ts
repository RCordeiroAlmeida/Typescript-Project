//tipos personalizados - Type Alias

import { TipoTransacao } from "./TipoTransacao.js";
//criando um tipo de dado, aqui funciona como uma struct em C
export type Transacao = {
    tipoTransacao: TipoTransacao;
    valor: number;
    data: Date;
}
