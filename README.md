# 🧩 NodeAPI

**API REST minimalista em Node.js (sem frameworks)**

Este projeto demonstra como construir uma API simples utilizando apenas o módulo nativo `http` do Node.js e um array em memória como "banco" de dados.  
Foi desenvolvido como um exercício introdutório para compreender o funcionamento interno de uma API CRUD sem depender de frameworks externos.

---

## 📁 Estrutura do projeto

```
src/
├── index.js              # Servidor HTTP e roteamento básico
├── routes.js             # Definição de rotas (endpoint, método, handler)
├── controllers/
│   └── userControler.js  # Handlers CRUD para usuários
├── helpers/
│   └── bodyParser.js     # Parser simples para JSON no corpo da requisição
└── mocks/
    └── users.js          # Dados mock (array de usuários)
```

---

## ⚙️ Requisitos

- Node.js **v12+** (recomendado)

---

## 🚀 Como executar

No terminal, a partir da raiz do projeto:

```bash
node src/index.js
```

O servidor será iniciado em:  
👉 **http://localhost:3000**

---

## 📡 Endpoints disponíveis

**Base URL:** `http://localhost:3000`

### 🔹 GET `/users`
Lista todos os usuários.  
Aceita o parâmetro `order=desc` para ordenar de forma decrescente por ID.  
**Resposta:** `200 OK` com array de usuários.

---

### 🔹 GET `/users/:id`
Retorna o usuário correspondente ao ID informado.  
**Resposta:**  
- `200 OK` com o usuário  
- `400 Bad Request` com `{ error: 'User not found' }`

---

### 🔹 POST `/users`
Cria um novo usuário.  
**Body JSON esperado:**
```json
{ "name": "Nome" }
```
**Resposta:**  
- `200 OK` com o usuário criado

---

### 🔹 PUT `/users/:id`
Atualiza o nome de um usuário existente.  
**Body JSON:**
```json
{ "name": "Novo Nome" }
```
**Resposta:**  
- `200 OK` com `{ id, name }`  
- `400 Bad Request` com `{ error: 'User not exists' }` se não encontrado.

---

### 🔹 DELETE `/users/:id`
Remove o usuário com o ID informado.  
**Resposta:**  
- `200 OK` com `{ deleted: true }`

---

## 🧠 Exemplos de uso (via cURL)

Listar usuários:
```bash
curl "http://localhost:3000/users"
```

Listar em ordem decrescente:
```bash
curl "http://localhost:3000/users?order=desc"
```

Obter usuário por ID:
```bash
curl "http://localhost:3000/users/2"
```

Criar usuário:
```bash
curl -X POST "http://localhost:3000/users"   -H "Content-Type: application/json"   -d '{"name":"Maria"}'
```

Atualizar usuário:
```bash
curl -X PUT "http://localhost:3000/users/2"   -H "Content-Type: application/json"   -d '{"name":"Pedro Silva"}'
```

Excluir usuário:
```bash
curl -X DELETE "http://localhost:3000/users/3"
```

---
