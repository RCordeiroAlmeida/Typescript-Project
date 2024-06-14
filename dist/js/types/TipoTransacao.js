//Enum - chaves que identificam os valores
export var TipoTransacao;
(function (TipoTransacao) {
    TipoTransacao[TipoTransacao["DEPOSITO"] = 1] = "DEPOSITO";
    TipoTransacao[TipoTransacao["TRANSFERENCIA"] = 2] = "TRANSFERENCIA";
    TipoTransacao[TipoTransacao["PAGAMENTO_BOLETO"] = 3] = "PAGAMENTO_BOLETO";
})(TipoTransacao || (TipoTransacao = {}));
