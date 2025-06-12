const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { dbUser, dbPassword, port } = require("./config/env");
const errorHandler = require("./middlewares/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// Cria uma instância do Express
const app = express();

// Configuração do CORS
app.use(
  cors({
    origin: true, // permite todas as origens
    credentials: true, // permite todas as credenciais
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'], // Cabeçalhos permitidos
    exposedHeaders: ['Content-Range', 'X-Requested-With'],
    maxAge: 86400,
  })
);

// Configura o express para entender req. em Json
app.use(express.json());

// Rota aberta
app.get("/api", (requisicao, resposta) => {
  resposta.status(200).send({ msg: "Bem vindo a API!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

const startServer = async() => {
    try {
      await mongoose.connect(
        `mongodb+srv://${dbUser}:${dbPassword}@api.j32kk.mongodb.net/?retryWrites=true&w=majority&appName=API`
  )
    console.log("Conectado ao MongoDB");
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
    } catch (error) {
        console.error("Erro ao iniciar o servidor", error);
    process.exit(1);
    }
}

// Inicia o servidor apenas se NÃO ESTIVER EM AMBIENTE DE TESTE
if (process.env.NODE_ENV !== "test") {
  startServer();
} 
