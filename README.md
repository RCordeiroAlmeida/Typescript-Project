# Typescript-Project
Primeira aplicação desenvolvida em typescript - se trata de um projeto do curso Typescript na prática. Idealizado pela Alura

REQUISITOS DO SISTEMA

* Cada transação realizada no sistema deve possuir SOMENTE as seguintes informações:
  1) Data da Transação (Date)
  2) Tipo de Transação (Depósito, Transferência, Pagamento de Boleto)
  3) Valor da Transação (valor maior que zero)

* Sempre que a transação for do tipo DEPÓSITO, o valor da transação deve ser adicionado ao saldo da conta.
* Sempre que a transação for do tipo TRANSFERÊNCIA ou PAGAMENTO DE BOLETO, o valor da transação deve ser subtraído do saldo da conta.
* O saldo deve sempre ser atualizado na tela da aplicação a cada transação realizada.

--------------------------------------------------------------------------------------

* AS informações da conta devem ficar num módulo específico "Conta"
  - Saldo
  - Data de acesso
  - Registros de transações realizadas
  - Histórico de transações
*

* Os componentes
  - Nova transação: deve apenas coletar as informações do formda interface e repassar os dados para o módulo Conta
  - Saldo: deve exibir as informações de dadta de acesso e do saldo para o usuário na interface, acessando esses dados através do módulo Conta
