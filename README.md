# 🛒 E-commerce API
API de e-commerce desenvolvida com NestJS, PostgreSQL e BullMQ (Redis) para processamento de pedidos assíncronos.

## 📌 Descrição do Projeto
Este projeto é uma API REST para gerenciamento de pedidos em um e-commerce. Ele permite que os usuários criem pedidos, consultem pedidos por status ou intervalo de data e conta com um sistema de processamento assíncrono de pedidos, utilizando filas para melhorar a escalabilidade e desempenho.

A API foi construída seguindo os princípios de Clean Architecture, garantindo modularidade e separação de responsabilidades, além de boas práticas como tratamento de erros, validação de dados e testes automatizados.

## 🔹 Funcionalidades do Projeto
### 1️⃣ Criação de Pedidos
Os usuários podem criar novos pedidos, informando dados como:

- Itens do pedido
- Quantidade
- Preço
- Status inicial
  
🚀 Tecnologia utilizada: NestJS + PostgreSQL + BullMQ (fila de processamento de pedidos)

### 2️⃣ Consulta de Pedidos

Os pedidos podem ser consultados de duas formas:

📌 Por Status → Filtra os pedidos pelo status atual (Pendente, Processando, Concluído, Cancelado).

📌 Por Intervalo de Datas → Filtra os pedidos criados entre uma data inicial e final.

🚀 Tecnologia utilizada: TypeORM (Banco de Dados) + Query Parameters

### 3️⃣ Processamento Assíncrono de Pedidos
Após a criação de um pedido, ele entra em uma fila de processamento assíncrono, utilizando o BullMQ e Redis.

💡 Como funciona?

1. O pedido é criado e enviado para uma fila no Redis.
2. Um worker processa o pedido de forma assíncrona.
3. Quando o pedido é concluído, seu status é atualizado no banco de dados.
   
✅ Vantagens:
✔️ Evita travamentos no servidor principal.
✔️ Permite processar múltiplos pedidos ao mesmo tempo.
✔️ Melhora a escalabilidade do sistema.

🚀 Tecnologia utilizada: BullMQ (Redis) + NestJS Background Jobs

### 4️⃣ Filas e Redis
A API utiliza BullMQ para gerenciar filas de pedidos.

📌 O Redis é responsável por armazenar temporariamente os pedidos enquanto aguardam o processamento.

🚀 Tecnologia utilizada: BullMQ (Gerenciamento de filas) + Redis (Armazenamento temporário)

### 5️⃣ Autenticação e Segurança (Futuras Implementações)
Atualmente, a API ainda não possui autenticação, mas está preparada para integração com JWT ou OAuth para garantir segurança no acesso aos endpoints.

🚀 Tecnologia planejada: JWT + Passport.js

## 🏗 Arquitetura do Projeto
O projeto segue os princípios da Clean Architecture, garantindo separação de responsabilidades e código modular.

📂 src/
├── application/ (Casos de Uso - Regras de Negócio)
├── domain/ (Entidades e Repositórios)
├── infra/ (Banco de Dados, Filas, Configurações)
├── presentation/ (Controllers e DTOs)
├── config/ (Configuração de Banco de Dados, Redis, BullMQ)
└── main.ts (Ponto de entrada da aplicação)

✅ Vantagens da Arquitetura:
✔️ Código modular e de fácil manutenção
✔️ Baixo acoplamento entre os componentes
✔️ Facilidade para testes automatizados

## 🚀 Instruções para executar o projeto
### 1️⃣ Pré-requisitos
Antes de começar, instale as seguintes dependências no seu sistema:

✅ Node.js (versão 18+)
✅ PostgreSQL (Banco de Dados)
✅ Redis (Para filas de processamento BullMQ)
✅ Docker (Opcional, mas recomendado)

### 2️⃣ Configuração do Banco de Dados
Crie um banco de dados PostgreSQL:

````
CREATE DATABASE ecommerce;
````

Se estiver usando Docker, suba um contêiner do PostgreSQL e Redis com o seguinte comando:

````
docker-compose up -d
````
### 3️⃣ Clonar o Repositório
````
git clone https://github.com/seu-usuario/ecommerce-api.git
cd ecommerce-api
````

### 4️⃣ Configurar Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto e defina as configurações:

````
# Configuração do Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=admin
DB_DATABASE=ecommerce


# Configuração do Redis (BullMQ)
REDIS_HOST=localhost
REDIS_PORT=6379
````
### 5️⃣ Instalar Dependências
````
npm install
````
### 6️⃣ Rodar Migrations do Banco de Dados
````
npm run migration:run
````
### 7️⃣ Executar o Servidor
#### 🔹 Modo Desenvolvimento
````
npm run start:dev
````
#### 🔹 Modo Produção
````
npm run build
npm run start:prod
````
A API estará rodando em http://localhost:3000 🚀

## ✅ Testando a API
### 📌 Documentação Swagger e Postman
Acesse http://localhost:3000/api no Swagger ou https://documenter.getpostman.com/view/41666076/2sAYX2Liny no Postman para visualizar e testar os endpoints.

### 📌 Testes Automatizados
````
npm run test
````

## 🛠 Tecnologias Utilizadas

. ✅ NestJS - Framework TypeScript
. ✅ TypeORM - ORM para PostgreSQL
. ✅ BullMQ - Gerenciamento de Filas com Redis
. ✅ Docker - Contêinerização
. ✅ Swagger - Documentação da API

## 📬 Contato
👨‍💻 Desenvolvido por Julio Oliveira
🔗 GitHub: juliooliveiradev

🔥 Boa codificação! 🚀
