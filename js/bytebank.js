let saldo = 0;

const elementoSaldo         = document.querySelector(".saldo-valor .valor");
elementoSaldo.textContent   = saldo;  //atualiza no html o saldo do usuário

const elementoFormulario    = document.querySelector(".block-nova-transacao form");   //seleciona no html o elemento do formulário
elementoFormulario.addEventListener("submit", function(){   //escuta o evento "submit"
    event.preventDefault(); //submit sem carregar a página

    if(!elementoFormulario.checkValidity()){ // checa se os campos estão de acordo com as especificações (required)
        alert("Por favor, verifique se todos os campos foram preenchidos devidamente e tente novamente!");
        return;
    }

    //coletando campos do formulário
    const inputTipo     = document.querySelector("#tipoTransacao");
    const inputValor    = document.querySelector("#valor");
    const inputData     = document.querySelector("#data");

    let tipoTransacao   = inputTipo.value;
    let valor           = inputValor.value;
    let data            = inputData.value;

    /*
        1 - deposito
        2 - transferencia
        3 - boleto
    */
   
    if(tipoTransacao == 1){
        saldo += valor;
        //Sempre que a transação for do tipo DEPÓSITO, o valor da transação deve ser adicionado ao saldo da conta.

        //Aqui é possível verificar um problema, pois como o JavaScript interpreta os valores de saldo e valor como texto, as operações de adiçãoi não funcionam porque na verdade são concatenados valores, não somados.
    }else if(inputTipo == 2 || inputTipo == 3){
        saldo -= valor;
        //Sempre que a transação for do tipo TRANSFERÊNCIA ou PAGAMENTO DE BOLETO, o valor da transação deve ser subtraído do saldo da conta.
    }else{
        alert("Transação inválida!");
        return;
    }

    elementoSaldo.textContent = saldo;
    //construindo objeto que constm as informações da transação
    const novaTransacao = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data
    }

    console.log(novaTransacao);
    elementoFormulario.reset();

});


