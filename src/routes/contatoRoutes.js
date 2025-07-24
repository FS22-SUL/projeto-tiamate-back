const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/contato", async (req, res) => {
    const { nome, email, mensagem } = req.body;

    // Configuração do Nodemailer usando variáveis do .env
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        await transporter.sendMail({
            from: `"${nome}" <${process.env.EMAIL_USER}>`,
            replyTo: email,
            to: "gleidsondeveloper@gmail.com", // AJUSTAR o e-mail de destinatário
            subject: `Contato de ${nome}`,
            text: mensagem,
        });
        res.status(200).json({ message: "E-mail enviado com sucesso!" });
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        res.status(500).json({ message: "Erro ao enviar e-mail.", error: error.message });
    }
});

module.exports = router;



/*
 * COMO CRIAR UMA SENHA DE APLICATIVO NO GMAIL
 *
 * Para que este sistema/envio de e-mail funcione usando sua conta do Gmail,
 * é necessário usar uma "senha de app" — uma senha específica para o sistema,
 * diferente da sua senha normal do Gmail.
 *
 * Pré-requisito: a verificação em duas etapas (2FA) precisa estar ativada na sua conta.
 *
 * PASSO A PASSO:
 *
 * 1. Acesse sua conta Google: https://myaccount.google.com/
 *
 * 2. Vá em "Segurança" no menu lateral.
 *
 * 3. Ative a verificação em duas etapas (se ainda não estiver ativa).
 *    - Isso pode envolver o uso do seu smartphone ou app autenticador.
 *
 * 4. Após ativar, volte para a página de segurança.
 *
 * 5. Clique em "Senhas de app" (pode aparecer como opção adicional após ativar o 2FA).
 *    - Talvez você precise fazer login novamente.
 *
 * 6. Na página de senhas de app:
 *    - Escolha um nome para identificar o app (ex: "Sistema de Contato").
 *    - Clique em "Gerar".
 *
 * 7. Uma senha de 16 caracteres será exibida.
 *    - Copie essa senha e use no lugar da sua senha normal no envio de e-mails.
 *
 * NÃO compartilhe essa senha com outras pessoas.
 *    Ela só funciona no sistema onde foi cadastrada.
 *
 * Exemplo de uso com nodemailer, python, etc., use:
 *      user: 'seuemail@gmail.com',
 *      pass: 'sua_senha_de_app_aqui'
 */

/*
 * VARIÁVEIS DE AMBIENTE PARA ENVIO DE E-MAIL
 *
 * Estas variáveis são usadas para configurar o serviço de envio de e-mails no sistema.
 * No ambiente local, elas devem estar definidas no arquivo `.env`.
 *
 * Em ambiente de produção (como na Render, Vercel, etc.), essas variáveis precisam
 * ser configuradas diretamente no painel da plataforma de hospedagem (Environment Variables).
 *
 * Variáveis:
 * - EMAIL_SERVICE: serviço de e-mail (ex: 'gmail', 'hotmail', etc.)
 * - EMAIL_USER: e-mail remetente (ex: 'seuemail@gmail.com')
 * - EMAIL_PASS: senha de app ou token de acesso (não é a senha da conta)
 */