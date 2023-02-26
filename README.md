## Resumo

O projeto dividido em duas partes beckend e frontend. Backnend usando nestjs como framework, usando mongodb websocket e outros recusos que o framework oferece e o Frontend usando ReactJS com typescript como framework.

## Requisitos

- Docker
- Docker-compose

## Instalar API

Passo para rodar a API.

1. Entre na pasta **`backend`**
2. Rodar o comando **`docker-compose up -d --build`** no terminal
3. Rodar o comando **`docker exec -it backend-api-1 cp .env.example .env`** no terminal

URLs

- API home - http://localhost:3000
- MongoDB - http://localhost:27017

## Instalar Frontend

Passo para rodar a API.

1. Entre na pasta **`frontend`**
2. Rodar o comando **`docker-compose up -d --build`** no terminal

URLs

- App home - http://localhost:5173
