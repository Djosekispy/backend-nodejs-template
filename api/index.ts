import { SERVER_PORT } from "../src/config/env";
import prisma from "../src/config/prisma";
import { app } from "../src/server";


const port = SERVER_PORT

async function startServer() {
  try {
    await prisma.$connect();
    app.listen(port, () => {
      console.log(`Servidor aberto na porta: ${port}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

startServer();
