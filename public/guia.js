Instalar Node.JS e NPM

Para verificar se estão instalados é correr no Terminal
    node -v
    npm -v


Inicializar npm neste projecto
    colocar-me no Temimnal na directoria do projecto 
    npm init
    posso basicamente dar ok a tudo
    vai criar um folder e um package.json


Instalar Express
    colocar-me no Temrinal na directoria do projecto 
    npm install express --save


Instalar socket.io
    colocar-me no Temrinal na directoria do projecto
    npm install socket.io --save


Criar "server.js" na raiz do projecto
    Tem que ter o código que está neste exemplo para criar os sockets e comunicar com os clients


Criar folder "public" na raiz deste projecto
    Neste folder criar "index.html" e "script.js"
    "script.js" tem de ter o códifo que está neste exemplo para criar os sockets e comunicar com o server

    
No "index.html" é necessário adicionar a library do socket.io

PARA ARRANCAR A APP LOCALMENTE FAZER NO TERMINAL => node server.js



App está deployed no Heroku
Criei também uma sincronização da Goodle Drive ("Local") para o Github/Wesfar/Heroku e dai para o server do Heroku

Para a app arrancar bem a partir do server é necessário ter na raiz um ficheiro "procfile" com o conteudo "web: node server.js"
Isto é o equivalente ao "node server.js" para arrancar localmente

PARA ARRANCAR A APP NA NET/NO SERVER HEROKU APENAS NECESSÁRIO IR AO SITE VIA LINK NO WESFAR.COM


