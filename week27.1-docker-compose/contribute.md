# Contribution doc

## manual installation

-   install node locally()
-   clone repo locally
-   install dependencies (npm install)
-   start DB locally
    1. docker run -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 postgres
    2. go to neon.tech and get yourself a new database.
-   set the env variables for your database.
-   migrate the model to database.(npx prisma migrate dev --name init)
-   generate the client.(npx prisma generate)
-   build the project.(npm run build)
-   start it.(npm run start)

## docker installation

-   install docker locally.
-   start a docker network `docker network create user-app`
-   start postgres
    -   `docker run --network user-app --name postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres`
-   build the image - `docker build --network=host -t user-project .`
-   start the image - `docker run -e DATABASE_URL=postgresql://postgres:mysecretpassword@postgres:5432/postgres --network user-app -p 3000:3000 user-project`

## docker compose

-   install docker locally, docker-compose.
-   run `docker-compose up`
