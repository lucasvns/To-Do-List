# 📌 API REST de Tarefas (To-Do List)

Esta é uma API REST simples para gerenciamento de tarefas (To-Do List), desenvolvida com **Node.js** e **Express**. O projeto explora todos os métodos HTTP (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) e inclui um middleware de logging para registrar as requisições.

---

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **Express.js**
- **CORS**
- **Jest**

---

## 📂 Estrutura do Projeto

```
├── app/
│   ├── routes/
│   │   ├── task.js
│   ├── controllers/
│   │   ├── task.js
│   ├── services/
│   │   ├── task.js
│   ├── middlewares/
│   │   ├── logger.js
│   ├── app.js
├── test/
│   ├── unit/
│   │   ├── task.test.js
├── server.js
├── package.json
├── README.md
```

---

## 🔧 Instalação e Execução

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/To-Do-List.git
   ```

2. Acesse a pasta do projeto:
   ```sh
   cd To-Do-List
   ```

3. Instale as dependências:
   ```sh
   npm install
   ```

4. Inicie o servidor:
   ```sh
   npm run dev
   ```

A API rodará em `http://localhost:3000`.

---

## 📌 Endpoints

### 🔹 Criar uma Tarefa
**`POST /tasks`**
- **Corpo da requisição:**
  ```json
  {
    "title": "Aprender Node.js",
    "description": "Estudar Express e APIs"
  }
  ```
- **Resposta:**
  ```json
  {
    "id": 1,
    "title": "Aprender Node.js",
    "description": "Estudar Express e APIs",
    "completed": false
  }
  ```

### 🔹 Listar Todas as Tarefas
**`GET /tasks`**
- **Resposta:**
  ```json
  [
    {
      "id": 1,
      "title": "Aprender Node.js",
      "description": "Estudar Express e APIs",
      "completed": false
    }
  ]
  ```

### 🔹 Buscar uma Tarefa por ID
**`GET /tasks/:id`**
- **Resposta (sucesso):**
  ```json
  {
    "id": 1,
    "title": "Aprender Node.js",
    "description": "Estudar Express e APIs",
    "completed": false
  }
  ```
- **Resposta (erro - 400):**
  ```json
  { "error": "Tarefa não encontrada" }
  ```

### 🔹 Atualizar uma Tarefa
**`PUT /tasks/:id`**
- **Corpo da requisição:**
  ```json
  {
    "title": "Aprender Express.js",
    "description": "Criar APIs REST"
  }
  ```
- **Resposta:**
  ```json
  {
    "id": 1,
    "title": "Aprender Express.js",
    "description": "Criar APIs REST",
    "completed": false
  }
  ```

### 🔹 Marcar uma Tarefa como Concluída
**`PATCH /tasks/:id`**
- **Corpo da requisição:**
  ```json
  {
    "completed": true
  }
  ```
- **Resposta:**
  ```json
  {
    "id": 1,
    "title": "Aprender Express.js",
    "description": "Criar APIs REST",
    "completed": true
  }
  ```

### 🔹 Deletar uma Tarefa
**`DELETE /tasks/:id`**
- **Resposta:**
  ```json
  {
    "id": 1,
    "title": "Aprender Express.js",
    "description": "Criar APIs REST",
    "completed": true
  }
  ```

---

## 🛠️ Middleware de Logging
A API possui um middleware que registra todas as requisições:
```javascript
const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} - ${req.url}`);
  next();
};
```

## 📌 Testes Unitários
A API inclui testes unitários para garantir o funcionamento correto de suas funcionalidades. Os testes são realizados com Jest.

1. Rode os testes com o comando
   ```sh
   npm test
   ```

📝 Testes Disponíveis:

Criação de Tarefas: Verifica se as tarefas estão sendo criadas corretamente e se erros são lançados quando os dados estão incompletos.

Busca de Tarefas: Verifica se as tarefas podem ser encontradas pelo ID e se um erro é lançado quando a tarefa não existe.

Atualização de Tarefas: Verifica se é possível atualizar o título, descrição e status de uma tarefa.

Exclusão de Tarefas: Verifica se as tarefas podem ser deletadas corretamente e se um erro é lançado ao tentar excluir uma tarefa inexistente.

```javascript
  it('should throw error when creating without title or description', () => {
    expect(() => TaskService.create()).toThrow('Campos incompletos')
  })
```

---

## 📌 Melhorias Futuras
- [ ] Persistência de dados com um banco de dados
- [ ] Autenticação e autorização
