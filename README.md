#Encurtador de URL
Cria uma versão encurtada de uma URL enviada.
Ferramenta desenvolvida em NodeJS com banco de dados MongoDB.

Funcionalidades desenvolvidas:
* Método GET de URL encurtada com redirecionamento para URL destino.
* Método POST recebendo uma URL e devolvendo uma versão encurtada.

Ferramentas utilizadas:
* Express;
* Body-parser;
* Typescript;
* Eslint;
* Jest;
* Mongoose;

Como configurar o projeto:
* Copie o arquivo .env.example para .env e preencha o arquivo .env com suas informações;
* Digite no console `npm install`, para instalação dos pacotes;
* Para execução local, digite `npm run dev`;
* Para realizar o build do projeto `npm run build`;
* Para rodar a versão buildada do projeto `npm run start`;
* Para rodar os testes `npm run test`;

Considerações:
* É possível visualizar a ferramenta em funcionamento acessando: `https://vini-shortener.herokuapp.com/`
** Encurtar uma URL, `https://vini-shortener.herokuapp.com/encurtador`
** Para visualizar o redirecionamento, acesse o link retornado pela requisição acima.

