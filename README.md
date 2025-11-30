🛒 CotaçãoJá - Sistema de Leilão Reverso B2B
<!-- O Shield do Netlify aparecerá após o deploy -->
Uma aplicação PWA (Progressive Web App) focada em otimizar o processo de cotação de preços entre gerentes de lojas e fornecedores. O sistema utiliza o modelo de Leilão Reverso, onde a loja publica uma necessidade e múltiplos fornecedores enviam suas ofertas em tempo real.
🔗 Demo Online: https://lucianodevfrontend.netlify.app/
📱 Funcionalidades
🛍️ Para Gerentes (Lojistas)
 * Criação de Pedidos: Publique itens que precisa comprar com categoria e descrição.
 * Comparação em Tempo Real: Veja as ofertas chegando instantaneamente sem recarregar a página.
 * Integração com WhatsApp: Botão direto para fechar negócio com o fornecedor vencedor.
 * Gestão: Edite ou exclua pedidos e filtre por categorias.
🚚 Para Fornecedores
 * Feed de Oportunidades: Visualize pedidos de várias lojas em um só lugar.
 * Cotação Cega: Envie sua oferta sem ver o preço dos concorrentes (garantindo preço justo).
 * Gestão de Ofertas: Acompanhe, altere preços ou cancele ofertas enviadas na aba "Minhas Ofertas".
⚙️ Técnicas
 * PWA (Progressive Web App): Instalável no Android, iOS e Desktop. Funciona offline (shell).
 * Realtime Database: Sincronização instantânea via Firestore.
 * Segurança: Regras de acesso e autenticação via Firebase Auth.
🛠️ Tecnologias Utilizadas
 * Frontend: HTML5, JavaScript (ES6 Modules), CSS3.
 * Estilização: Tailwind CSS (via CDN para leveza).
 * Backend as a Service: Google Firebase.
   * Firestore: Banco de dados NoSQL em tempo real.
   * Authentication: Sistema de login e cadastro.
 * Ícones: Lucide Icons.
🚀 Como rodar localmente
Este projeto não requer instalação de dependências via npm (Node.js) para rodar, pois utiliza ES Modules nativos e CDNs.
 * Clone o repositório:
   git clone [https://github.com/SEU-USUARIO/NOME-DO-REPO.git](https://github.com/SEU-USUARIO/NOME-DO-REPO.git)
cd NOME-DO-REPO

 * Configuração do Firebase:
   * Crie um projeto no Firebase Console.
   * Habilite o Authentication (Email/Senha).
   * Habilite o Firestore Database.
   * Substitua as chaves firebaseConfig no final do arquivo index.html pelas suas chaves.
 * Rodar o projeto:
   * Você precisa de um servidor HTTP local (devido aos módulos ES6 e Service Workers).
   * Se usar VS Code, instale a extensão Live Server e clique em "Go Live".
   * Ou use Python: python3 -m http.server
🔒 Regras de Segurança (Firestore)
Para garantir a privacidade das cotações (Blind Auction), o projeto utiliza as seguintes regras no Firestore:
// Gerentes leem todas as ofertas.
// Fornecedores só podem ler/editar as PRÓPRIAS ofertas.
match /ofertas/{ofertaId} {
  allow read: if request.auth != null && 
    (resource.data.fornecedorId == request.auth.uid || getUserData().tipo == 'gerente');
}

📂 Estrutura de Arquivos
/
├── index.html      # Aplicação Single Page (SPA) completa
├── faq.html        # Página de Ajuda e Instruções
├── sw.js           # Service Worker (Cache e Offline)
├── manifest.json   # Configurações de instalação PWA
└── README.md       # Documentação

👤 Autor
Desenvolvido com 💙 por SantosCodes.
 * Portfólio: Luciano Dev Frontend
 * GitHub: @lucianosantos
 * LinkedIn: Luciano Santos
📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
