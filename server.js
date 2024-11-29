require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const MongoClient = require("mongodb").MongoClient
const bodyParser = require("body-parser")
const cors = require("cors")
const createGenericModel = require("./models/GenericModel")

const app = express()

app.use(bodyParser.json())
app.use(cors())

// Conecta ao MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err))

// Rotas CRUD
app.post("/api/crud", async (req, res) => {
  const { collection, data } = req.body
  try {
    const Model = createGenericModel(collection)
    const document = await Model.create(data)
    res.status(201).json({ message: "Created", document })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get("/api/collections", async (req, res) => {
  try {
    // Cria um cliente MongoDB
    const client = new MongoClient(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });

    // Conecta ao banco de dados
    await client.connect()
    const db = client.db() // Obtém o banco de dados padrão configurado no URI
    const collections = await db.listCollections().toArray() // Lista as coleções

    // Retorna os nomes das coleções
    res.json(collections.map((collection) => collection.name))

    client.close()
  } catch (err) {
    console.error("Erro ao listar coleções:", err)
    res.status(500).json({ error: err.message })
  }
})

// Endpoint para listar todos os campos de uma coleção
app.get("/api/fields/:collection", async (req, res) => {
  const { collection } = req.params
  try {
    const Model = createGenericModel(collection)
    const documents = await Model.find({}).limit(10)
    const fields = documents.reduce((acc, doc) => {
      Object.keys(doc._doc).forEach((field) => acc.add(field))
      return acc
    }, new Set())

    res.json([...fields])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Endpoint para listar todos os IDs de uma coleção
app.get("/api/ids/:collection", async (req, res) => {
  const { collection } = req.params
  try {
    const Model = createGenericModel(collection)
    const documents = await Model.find({}, { _id: 1 })
    const ids = documents.map((doc) => doc._id)

    res.json(ids)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get("/api/crud/:collection/:id", async (req, res) => {
  const { collection, id } = req.params
  try {
    const Model = createGenericModel(collection)
    const document = await Model.findById(id)
    if (!document) return res.status(404).json({ error: "Not found" })
    res.json(document)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get("/api/documents/:collection", async (req, res) => {
  const { collection } = req.params
  try {
    const Model = createGenericModel(collection)
    const documents = await Model.find({}) // Obtém todos os documentos

    // Mapeia documentos para um objeto onde o ID é a chave
    const result = documents.reduce((acc, doc) => {
      acc[doc._id] = doc._doc // Armazena os dados usando o ID como chave
      return acc
    }, {})

    res.json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.put("/api/crud/:collection/:id", async (req, res) => {
  const { collection, id } = req.params
  const { data } = req.body
  try {
    const Model = createGenericModel(collection)
    const document = await Model.findByIdAndUpdate(id, data, { new: true })
    if (!document) return res.status(404).json({ error: "Not found" })
    res.json({ message: "Updated", document })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.delete("/api/crud/:collection/:id", async (req, res) => {
  const { collection, id } = req.params
  try {
    const Model = createGenericModel(collection)
    const document = await Model.findByIdAndDelete(id)
    if (!document) return res.status(404).json({ error: "Not found" })
    res.json({ message: "Deleted" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.delete("/api/field/:collection/:field", async (req, res) => {
  const { collection, field } = req.params
  try {
    const Model = createGenericModel(collection)
    await Model.updateMany({}, { $unset: { [field]: "" } })
    res.json({ message: `Field '${field}' deletado de todos os documentos da coleção ${collection}'` })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.delete("/api/crud/:collection", async (req, res) => {
  const { collection } = req.params
  try {
    const client = new MongoClient(process.env.MONGO_URI);

    await client.connect()
    const db = client.db() 
    await db.collection(collection).drop()
    res.json({ message: "Collection deleted" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
