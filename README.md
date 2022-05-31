# Alveshop app (voll solutions).
Em Alveshop app é possível pesquisar Produtos filtrar por preços e comprar utilizando "Coins".




 ## Backend
 Utilizei um servidor node.js express com Typescript e como banco de dados MySql, para fazer o relacionamento com banco utilizei o sequelize com migrations e seeders para facilitar a manipulação do banco.
Arquitetura POO em camadas MSC (Model Service Controller), ESlint para analise estática do código.
Validações de schema  utilizando o framework "Joi" assim temos verificações simples como os tipos dos dados enviados, obrigatoriedade de campos, formato de email, números positivos. API retorna mensagens intuitivas caso tenha algum erro de validação de schema.
Algumas requisições são restrita ao usuário administrador como por exemplo consultar carteira de todos usuários, adicionar saldo para alguma carteira, usuário cliente só pode visualizar seu próprio saldo, [mais detalhes sobre isso na documentação.](https://documenter.getpostman.com/view/17745625/UyxjFmBH)

Deploy heroku https://alveshop-backend.herokuapp.com/

## Frontend

Utilizei todo o eco sistema do React.js para criar a aplicação, Context API, React hooks e React router DOM, Como biblioteca CSS, Material UI.
A interface do administrador não está pronta, porem o fluxo de administrador esta funcionando no backend [consulte documentação do backend.](https://documenter.getpostman.com/view/17745625/UyxjFmBH)

Deploy vercel: https://alveshop.vercel.app/

## Rodando a aplicação

Clonando a aplicação: 

`git clone git@github.com:malves224/alveshop.git && cd alveshop`

### Com docker:

Após clonar o projeto basta montar a aplicação pelo docker utilizando o comando 
`npm run compose:up`, caso precise encerrar os container rode `npm run compose:down`.

Após terminar de montar os containers das imagens o frontend estará acessível na porta 3000 e o backend na porta 3001.

:warning: As portas 3000 e 3001 devem estar livres :warning:

## Login

Caso queira efetuar login segue os acessos: 

cliente: Rogeirinho@email.com senha 654321

## Documentação API.
Utilizei o Postaman para gerar documentação da API segue o link:
https://documenter.getpostman.com/view/17745625/UyxjFmBH
