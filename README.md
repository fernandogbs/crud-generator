# CRUD de Cruds

API em Node.js e Express que permite criar, ler, atualizar e deletar documentos em coleções dinâmicas no MongoDB. Ou seja, um Crud de Cruds

Instruções de uso da API em prod no fim no arquivo. Links abaixo.

Links da API em produção:

```bash
Vercel: https://crud-generator.vercel.app
Render: https://crud-generator.onrender.com
```

**É possível que a requisição no `Render` demore um pouco. Pois devido ao servidor ficar inativo ele entra em modo 'Stand By' e leve um tempo para reiniciar/iniciar devidamente bem.**

---

## 🚀 Tecnologias Utilizadas

- **Node.js**: Plataforma para execução do JavaScript no lado do servidor.
- **Express**: Framework para construção de APIs.
- **MongoDB**: Banco de dados NoSQL para armazenamento dinâmico.
- **Mongoose**: ODM para interagir com o MongoDB.
- **Dotenv**: Gerenciamento de variáveis de ambiente.

---

## ⚙️ Configuração do Projeto

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/crud-generator.git
cd crud-generator
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure o .env

### Crie um arquivo .env na raiz do projeto e adicione as variáveis abaixo:

```bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database_name>?retryWrites=true&w=majority
PORT=3000
```

    Substitua <username>, <password> e <database_name> pelos valores corretos do MongoDB.

### 4. Inicie o Servidor

```bash
node server.js
```

_O servidor estará disponível em: http://localhost:3000_

## 📚 Rotas da API

![image](https://github.com/user-attachments/assets/caee41d5-7283-4a1c-9901-669df22f2339)

### 1. Criar Documento (POST)

> Endpoint:

```bash
POST /api/crud
```

### Corpo da Requisição:

> Para executar essa ação basta criar uma nova requisição e no Body selecionar a opção `raw (rascunho)` e visualizar `JSON`

![image](https://github.com/user-attachments/assets/fa2bbe6d-4b6d-4efc-a2c9-18bc8b94e6bf)

```bash
{
  "collection": "users",
  "data": {
    "name": "John Doe",
    "age": 30
  }
}
```

### Resposta de Sucesso:

```bash
{
  "message": "Created",
  "document": {
    "\_id": "64d9f4f0a65d4e001c234567",
    "name": "John Doe",
    "age": 30
  }
}
```

### 2. Ler Documento (GET)

> Endpoint:

```bash
GET /api/crud/:collection/:id
```

### Exemplo:

```bash
GET /api/crud/users/64d9f4f0a65d4e001c234567
```

### Resposta de Sucesso:

```bash
{
  "\_id": "64d9f4f0a65d4e001c234567",
  "name": "John Doe",
  "age": 30
}
```

### Erro:

```bash
{
  "error": "Not found"
}
```

### 3. Atualizar Documento (PUT)

> Endpoint:

```bash
PUT /api/crud/:collection/:id
```

### Corpo da Requisição:

```bash
{
  "data": {
   "age": 35
  }
}
```

### Exemplo:

```bash
PUT /api/crud/users/64d9f4f0a65d4e001c234567
```

### Resposta de Sucesso:

```bash
{
  "message": "Updated",
  "document": {
    "\_id": "64d9f4f0a65d4e001c234567",
    "name": "John Doe",
    "age": 35
  }
}
```

### 4. Deletar Documento (DELETE)

> Endpoint:

```bash
DELETE /api/crud/:collection/:id
```

### Exemplo:

```bash
DELETE /api/crud/users/64d9f4f0a65d4e001c234567
```

### Resposta de Sucesso:

```bash
{
  "message": "Deleted"
}
```

### Erro:

```bash
{
  "error": "Not found"
}
```

## 🛠️ Testando a API

### Caso queira popular o banco com dados diferentes

_Atualize o arquivo seed.js com os dados de sua preferência_

```javascript
node seed.js
```

---

> Ferramentas Recomendadas

- **Postman** ou **Insomnia**: Ferramentas gráficas para realizar requisições HTTP.
- **curl**: Ferramenta de linha de comando para testar as rotas.

### Exemplo com curl:

_Vale ressaltar que você pode criar a collection de acordo com o que preferir e com os campos que preferir. Utilizamos `users` apenas de exemplo_

> Criar:

```bash
curl -X POST http://localhost:3000/api/crud -H "Content-Type: application/json" -d '{"collection":"users", "data":{"name":"John Doe","age":30}}'
```

---

## Ler:

> Ler todas coleções existentes no Banco

```bash
curl -X GET http://localhost:3000/api/collections<id>
```

> Ler todos os campos existentes em uma determinada coleção

```bash
curl -X GET http://localhost:3000/api/fields/<collection>
```

> Listar todos IDs de uma coleção (Apenas IDs)

```bash
curl -X GET http://localhost:3000/api/ids/<collection>
```

> Listar todos objetos por ID (agrupados por ID)

```bash
curl -X GET http://localhost:3000/api/documents/<collection>
```

### Exemplo na collection USERS

```bash
curl -X GET http://localhost:3000/api/crud/users/<id>
```

---

> Atualizar:

```bash
curl -X PUT http://localhost:3000/api/crud/users/<id> -H "Content-Type: application/json" -d '{"data":{"age":35}}'
```

---

> Deletar:

```bash
curl -X DELETE http://localhost:3000/api/crud/users/<id>
```
