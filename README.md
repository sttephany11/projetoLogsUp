# Sistema de Gerenciamento de Produtos

Este projeto é uma aplicação full-stack para gerenciamento de produtos com funcionalidades de cadastro, edição, exclusão e visualização de produtos. A aplicação utiliza **React** no front-end e **Node.js** no back-end, com um banco de dados **MySQL** para armazenar as informações.

## Tecnologias Utilizadas

- **Back-end**: Node.js, Express, Sequelize (ORM para MySQL)
- **Front-end**: React, React Router, Bootstrap, Lucide-react (ícones)
- **Banco de dados**: MySQL

## Requisitos

Antes de iniciar, você precisa ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (v14 ou superior)
- [MySQL](https://www.mysql.com/) (ou qualquer banco de dados compatível com MySQL)
- [Git](https://git-scm.com/)

## Estrutura do Projeto

├── backend/ # Lógica do servidor (API)
├── frontend/ # Interface do usuário (React)
│ ├── src/
│ ├── public/
│ └── package.json
├── .gitignore # Arquivo para ignorar arquivos não necessários no git
├── README.md # Este arquivo
└── server.js # Arquivo de inicialização do servidor (Back-end)


- **Backend**: O back-end fica no diretório raiz do projeto, sem a pasta `backend`.
- **Frontend**: O front-end está dentro da pasta `frontend`.

## Instalação

### Passo 1: Configuração do Banco de Dados

O sistema utiliza o banco de dados **MySQL**. Para configurar:

1. **Importando o Banco de Dados (SQL Dump)**

   - Baixe o arquivo de backup do banco [**backup_banco.sql**](./database/backup_banco.sql).
   - Conecte-se ao MySQL:
     ```bash
     mysql -u seu_usuario -p
     ```
   - Crie um banco de dados:
     ```sql
     CREATE DATABASE nome_do_banco;
     USE nome_do_banco;
     ```
   - Importe o arquivo SQL:
     ```bash
     mysql -u seu_usuario -p nome_do_banco < caminho/para/backup_banco.sql
     ```

2. **Criando o Banco Manualmente**

   Se preferir criar as tabelas manualmente, execute os seguintes comandos:
   ```sql
   CREATE DATABASE nome_do_banco;
   USE nome_do_banco;
E então crie as tabelas conforme a necessidade. Exemplo de tabela de produtos:

CREATE TABLE produtos (
  IdProduto INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  preco DECIMAL(10, 2),
  quantidade INT
);

Passo 2: Configuração do Front-end

1.Navegue até a pasta frontend:
cd frontend

2.Instale as dependências do front-end:
npm install

Passo 3: Configuração do Back-end

1.Navegue até o diretório do projeto (onde está o arquivo server.js).

2.Instale as dependências do back-end:
npm install

Passo 4: Rodando o Projeto

O projeto pode ser executado em dois terminais, um para o back-end e outro para o front-end, ou você pode rodar ambos com um único comando:

1.Rodando o Back-end:
No terminal, execute o comando abaixo para iniciar o servidor do back-end:
node server.js

2.Rodando o Front-end:
No terminal, entre na pasta do front-end:
cd frontend

Rodando os dois juntos:
Você pode rodar o front-end e o back-end ao mesmo tempo com o comando:
npm run dev

Isso abrirá o front-end no navegador e a API estará rodando no localhost:8000.

Como Usar

1.Login:

- Após importar o banco ou criar as tabelas, use o usuário administrador já configurado para logar no sistema:

    Email: administrador@gmail.com
    Senha: 1234

2.Endpoints da API:

 - Endpoints da API:

POST /auth/login: Realiza o login e retorna um token de autenticação.

- Exemplo de login no Postman:

Body:
{
  "emailUser": "administrador@gmail.com",
  "senhaUser": "1234"
}

Salve o token retornado no localStorage para autenticação nas próximas requisições.

GET /api/produtos: Obtém a lista de produtos. Requer autenticação (Token no cabeçalho Authorization).

Exemplo de requisição:

Cabeçalho:

{
  "Authorization": "Bearer {token}"
}

POST /api/produtos: Cria um novo produto. Requer autenticação.

PUT /api/produtos/:id: Edita um produto existente. Requer autenticação.

DELETE /api/produtos/:id: Exclui um produto. Requer autenticação.

 - Testes

Teste de Endpoints com Postman

1. Login:

Faça uma requisição POST para o endpoint /auth/login passando o email e senha no corpo da requisição.

Exemplo de corpo:
{
  "emailUser": "administrador@gmail.com",
  "senhaUser": "1234"
}

- Resposta:

{
  "token": "seu-token-gerado",
  "user": {
    "id": 1,
    "nomeUser": "Administrador",
    "emailUser": "administrador@gmail.com",
    "privilegioUser": "admin"
  }
}

2. Verificar produtos:

Faça uma requisição GET para /api/produtos com o token no cabeçalho Authorization.

Tela de login:
<img width="1916" height="903" alt="teladelogin" src="https://github.com/user-attachments/assets/c4f5b8d3-9132-48fe-95c5-47f3cc01ee36" />

Tela de cadastro: 
<img width="1918" height="903" alt="tela de cadastro" src="https://github.com/user-attachments/assets/affc8aa9-197e-4df4-85b5-c839b4e530d3" />

Tela de produtos: 
<img width="1912" height="906" alt="Tela de produtos" src="https://github.com/user-attachments/assets/44d2dcdd-ee13-4b5a-a1da-661347215211" />

Modal para cadastro de produtos:
<img width="1916" height="907" alt="Modal de cadastrar produto" src="https://github.com/user-attachments/assets/f0adf6c7-2285-4b29-b0d1-c0d59dc521ef" />

Modall para alterar de produtos:
<img width="667" height="587" alt="Modal de editar produto" src="https://github.com/user-attachments/assets/68577df0-9bb3-4974-90f3-63ad8e048987" />




