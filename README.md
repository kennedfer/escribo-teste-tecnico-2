## Escribo - Teste Técnico 2
### Desenvolver uma API RESTful para autenticação de usuários, que permita operações de cadastro (sign up), autenticação (sign in) e recuperação de informações do usuário.

## Especificações Técnicas:
### 1. Formato de Comunicação:
- Todos os endpoints devem aceitar e retornar apenas dados no formato JSON.
- Retorno JSON para situações de endpoint não encontrado.
### 2. Persistência de Dados:
- Armazenamento persistente de dados do usuário.
### 3. Respostas de Erro:
- Formato padrão:
 
## Requisitos:
- Persistência de dados. ✔️
- Sistema de build com gerenciamento de dependências. ✔️
- Task runner para build. ✔️
- Padronização de estilo (ex: jsHint/jsLint). ✔️
- Framework: Express, Hapi, ou similar. ✔️

## Requisitos Desejáveis:
- JWT como token. ✔️
- Testes unitários. ✔️
- Criptografia hash na senha e token. ✔️

## Como Usar:
### 1. Configuração do Ambiente:
Certifique-se de ter o Node.js e o MongoDB instalados em sua máquina. Crie um arquivo .env na raiz do seu projeto para armazenar as variáveis de ambiente necessárias, como PORT, MONGODB_URI, e JWT_SECRET.
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/nome-do-seu-banco-de-dados
JWT_SECRET=suachavedetokensecreta
```
### 2. Instalação das Dependências:
No terminal, execute o seguinte comando para instalar as dependências do projeto:
```
npm install
```
### 3. Execução do Servidor:
Inicie o servidor executando o seguinte comando:
```
npm start
```
Isso iniciará o servidor na porta especificada no arquivo .env ou na porta padrão 3000.

### 4. Endpoints da API:
A API possui os seguintes endpoints:

**POST /signup**: Para criar um novo usuário. Envie um corpo de requisição no formato JSON com as informações do usuário, como nome, e-mail, senha e telefones.

Exemplo usando cURL:
```
curl -X POST http://localhost:3000/signup -H "Content-Type: application/json" -d '{"nome":"Seu Nome","email":"seuemail@gmail.com","senha":"suasenha","telefones":[]}'
```
**POST /login**: Para autenticar um usuário existente. Envie um corpo de requisição no formato JSON com e-mail e senha.

Exemplo usando cURL:
```
curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"email":"seuemail@gmail.com","senha":"suasenha"}'
```
**GET /user**: Para obter informações do usuário autenticado. Inclua o token no cabeçalho de autorização.

Exemplo usando cURL:
```
curl http://localhost:3000/user -H "Authorization: Bearer seu_token"
```
### 5. Testes:
Os testes unitários e de integração podem ser executados com o seguinte comando:
```
npm test
```
Certifique-se de ajustar os dados nos arquivos de teste de integração de acordo com o seu ambiente.

## Deploy
Você também pode usar o link do deploy e usar/testar a api sem precisar configura-lo em sua máquina:
Link do Deploy: Loading
