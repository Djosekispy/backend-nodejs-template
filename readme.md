# 🧰 Node.js Backend Template

Este é um template profissional e genérico para desenvolvimento de APIs backend utilizando **Node.js** com suporte para **Prisma** e **TypeORM**, arquitetura **MVC + Clean Code**, pronto para deploy na **Vercel** e integração com serviços como **Firebase**, **Email**, e **Upload local**.

> Desenvolvido para acelerar o início de projetos com boas práticas, padronização e extensibilidade.

---

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Prisma ORM** ou **TypeORM** (alternáveis)
- **TypeScript**
- **EJS** (template engine para emails e respostas visuais)
- **Firebase** (upload)
- **Multer** (upload local)
- **Nodemailer** (envio de email)
- **Vercel** (deploy)

---

## ⚙️ Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/Djosekispy/backend-nodejs-template.git
cd backend-nodejs-template
````

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` baseado no exemplo abaixo:

```env
SERVER_PORT=3000
DATABASE_URL=mysql://usuario:senha@host:porta/banco
EMAIL_USER=seu@email.com
EMAIL_PASS=sua_senha
FIREBASE_BUCKET_URL=sua_url
# etc...
```

### 4. Configure o ORM

Escolha **Prisma** ou **TypeORM** (os dois estão preparados):

* **Prisma**:

  ```bash
  npx prisma generate
  npx prisma migrate dev --name init
  ```

* **TypeORM**: configure o arquivo `data-source.ts` conforme desejado.

### 5. Execute o servidor

```bash
npm run dev
```

---

## 📦 Funcionalidades Inclusas

* ✅ Estrutura MVC + Clean Code
* ✅ Configuração pronta para Prisma e TypeORM
* ✅ Middleware de CORS, erros, validação e logger
* ✅ BaseService e BaseRepository (para herança em novos módulos)
* ✅ Upload de arquivos (Firebase ou local)
* ✅ Sistema de envio de e-mails com templates
* ✅ Padronização de mensagens de sucesso/erro
* ✅ Deploy automático via Vercel (`vercel.json` incluso)
* ✅ Templates EJS para email e respostas personalizadas

---

## 📤 Deploy na Vercel

Este projeto já possui tudo que precisa para ser executado na Vercel:

1. Crie uma conta em [vercel.com](https://vercel.com).
2. Vincule este repositório ao seu projeto.
3. Adicione as variáveis de ambiente na aba “Environment Variables”.
4. O deploy será feito automaticamente a cada `push`.

---

## 📩 Estrutura de Template de Email

Arquivos `.ejs` estão localizados na pasta `/templates`. Eles podem ser renderizados com dados dinâmicos.

---

## 🧪 Testes

Você pode configurar testes usando qualquer framework, como Jest ou Mocha, e criar os testes dentro de `src/__tests__` ou `tests/`.

---

## 🤝 Contribuições

Contribuições são bem-vindas! Para isso:

1. Fork este repositório
2. Crie uma branch com sua feature (`git checkout -b minha-feature`)
3. Commit suas alterações (`git commit -m 'feat: minha nova feature'`)
4. Push para a branch (`git push origin minha-feature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença **MIT**.

---

## 👨‍💻 Autor

**Djosekispy**
[GitHub](https://github.com/Djosekispy) • [LinkedIn](https://linkedin.com/in/osvaldodev) • [victordev8080@gmail.com](mailto:victordev8080@gmail.com)

---

> Este template é parte do ecossistema da Code Mind Tech e está pronto para ser usado em qualquer projeto backend profissional moderno.

