require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000; // A porta que seu servidor vai rodar

// Middleware para processar os dados do formulário
app.use(express.urlencoded({ extended: true }));

// Rota para o seu formulário de contato (action do form no HTML)
app.post('/send-email', (req, res) => {
    // Pega os dados do corpo da requisição
    console.log('Dados recebidos do formulário:', req.body)
    const { name, email, message } = req.body;

    // 1. Configurar o transporter do Nodemailer
    //    Crie um "aplicativo de senha" no seu provedor de e-mail
    //    (ex: Google, Outlook, etc.) e use aqui
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Exemplo: 'gmail', 'Outlook365', etc.
        auth: {
            user: process.env.EMAIL_USER, // Seu e-mail
            pass: process.env.EMAIL_PASS // Sua senha de aplicativo
        }
    });

    // 2. Definir os detalhes do e-mail a ser enviado
    const mailOptions = {
        from: process.env.EMAIL_USER, // Remetente
        to: process.env.EMAIL_USER,   // Destinatário (geralmente você mesmo)
        subject: `Nova Mensagem de Contato de: ${name}`,
        text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`
    };

    // 3. Enviar o e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Erro ao enviar e-mail:', error);
            // ENVIAMOS A RESPOSTA DE ERRO PARA O NAVEGADOR
            res.send('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.'); 
        } else {
            console.log('E-mail enviado: ' + info.response);
            // ENVIAMOS A RESPOSTA DE SUCESSO PARA O NAVEGADOR
            res.send('Sua mensagem foi enviada com sucesso! Obrigado pelo contato.');
        }
    });
});

// Inicia o servidor Node.js
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log(`Abra seu formulário e aponte a ação para "http://localhost:${port}/send-email"`);
});