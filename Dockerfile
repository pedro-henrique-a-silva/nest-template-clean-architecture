FROM node:20.10.0

WORKDIR /home/app
COPY ./package*.json ./

RUN npm install
COPY . .

RUN npx prisma generate
ENTRYPOINT [ "npm" ]
CMD run build