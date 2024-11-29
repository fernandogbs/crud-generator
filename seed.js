const mongoose = require("mongoose")
require("dotenv").config()

const MONGO_URI = process.env.MONGO_URI

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log("Conectado ao MongoDB!")
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err)
    process.exit(1)
  }
}

const seedData = async () => {
  const userSchema = new mongoose.Schema({}, { strict: false })
  const productSchema = new mongoose.Schema({}, { strict: false })
  const orderSchema = new mongoose.Schema({}, { strict: false })

  const User = mongoose.model("users", userSchema)
  const Product = mongoose.model("products", productSchema)
  const Order = mongoose.model("orders", orderSchema)

  const users = [
    { name: "Fernando Gustavo B Santos", email: "fernando@gmail.com", age: 20 },
    { name: "Arthur Galvão Loureiro Argôlo", email: "arthur@gmail.com", age: 20 },
    { name: "Felipe Souza Teixeira da Silva", email: "felipe@gmail.com", age: 24 },
    { name: "João Paulo Rosa Batista", email: "joao@gmail.com", age: 20 },
  ]

  const products = [
    { name: "pc da nasa", price: 4000, category: "Eletronicos" },
    { name: "ps5", price: 5000, category: "Eletronicos" },
    { name: "camisa do palmeiras", price: 100, category: "Acessorios" },
  ]

  const orders = [
    { userId: "user_1", productId: "product_1", quantity: 1 },
    { userId: "user_2", productId: "product_2", quantity: 2 },
    { userId: "user_3", productId: "product_3", quantity: 3 },
  ]

  try {
    await User.deleteMany({})
    await Product.deleteMany({})
    await Order.deleteMany({})

    await User.insertMany(users)
    await Product.insertMany(products)
    await Order.insertMany(orders)

    console.log("Dados inseridos com sucesso!")
  } catch (err) {
    console.error("Erro ao inserir dados:", err)
  } finally {
    mongoose.connection.close()
  }
}

(async () => {
  await connectToDatabase()
  await seedData()
})()