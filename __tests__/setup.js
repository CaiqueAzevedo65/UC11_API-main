const mongoose = require("mongoose");
const {MongoMemoryServer} = require("mongodb-memory-server");

let mongoServer;

beforeAll(async () => {
    // Desconectar qualquer conexão
    await mongoose.disconnect()

    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()

    // Configurar opções de conexão
    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    // Conecto o mongoose ao banco de dados em memória
    await mongoose.connect(mongoUri, mongooseOpts)
})

// Limpeza após cada teste
afterEach(async () => {
    // Acessa todas as coleções do banco de dados
    const collections = mongoose.connection.collections
    // Para cada coleção encontrada, apaga todos os documentos
    for (const key in collections) {
        const collection = collections[key]
        await collection.deleteMany()
    }
})

// Limpeza após todos os testes
afterAll(async () => {
    // Desconecto o mongoose do banco de dados em memória
    await mongoose.disconnect()
    // Desconecto o servidor em memória
    await mongoServer.stop()
})
