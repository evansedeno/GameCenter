cd /home/gamecenter/gamecenter/backend/ && node index.js --host gamecenter.leiven.fr --port 3001 &
cd /home/gamecenter/gamecenter/frontend/server/ && node app.js --host gamecenter.leiven.fr --port 3000 &
cd /home/gamecenter/gamecenter/frontend/client/ && npm run serve &
cd /home/gamecenter/morpion/server/ && node app.js --host gamecenter.leiven.fr --port 4000 &
cd /home/gamecenter/morpion/client/ && ng serve --open --host gamecenter.leiven.fr --port 81 &