# Cohort Ops Notes

## Week 24.1

1. Create a Digital Ocean account.
    - Use SSH key for verification.
    - Generate the SSH key on the local machine inside the `.ssh` folder using the command `ssh-keygen`.
2. Serve a demo webpage on Digital Ocean.
3. Access it by the public domain.

## Week 24.2

1. Get a GCP account and initiate a virtual machine.
2. Replace Nginx with Traefik/HAProxy/Apache.
3. Try deploying a React project.
4. Get a domain (Namecheap). **DONE**
5. Try ASGs (Auto Scaling Groups).
6. Try to do certificate management yourself.
7. Create a CI/CD pipeline to auto deploy your server from GitHub.
8. Use Forever or PM2 for process management.

> **Note:**
> Whenever we open a terminal anywhere, it automatically sources the shell files like (.bashrc, .zshrc, etc.) but only in the interactive shell. So if we manually SSH into the virtual machine (VM), the shell is interactive and hence the shell files are sourced and we get desired access to nvm, node, npm, etc., if they are already installed.
>
> But in the case of GitHub, when the GitHub server SSHs into the VM, its shell is non-interactive and hence no shell files are sourced and hence no access to anything like node, nvm, or npm.
>
> It will display: `[Pseudo-terminal will not be allocated because stdin is not a terminal.]`
>
> Even though you manually include the command to source nvm in the deployment file, it still misses the path where all the commands are stored for node and all.

---

## Week 25.2

1. Create a monorepo with apps (ws, http, web), connect each of them to the database, and push it to GitHub.
2. manually deploying the projects.
    - Create 2 servers.
    - Add Node, Nginx to both the servers and also pnpm.
    - Clone the monorepo to both the servers.
    - Start all three processes: http, ws, and web.
    - Point the domain name to the specific servers.
    - Also deploy the staging websites.
    - Refresh Nginx config.
    - Test everything is working.
3. Create a CI/CD pipeline.

---

## Week 26.1

1. Install Docker Desktop and sign up.
    - Run Mongo image locally and also remove it.
2. Docker image vs container.
    - **Image:** Standalone package that contains or encapsulates everything required to run a piece of software. _(Analogy: consider it as a class.)_
    - **Container:** An instance of an image; many can be created. _(Analogy: consider it as an object of a class.)_
3. Understand the concept of port mapping.
4. Common Docker commands:
    - `docker run` / `docker kill`
    - `docker ps` / `docker exec`
    - `docker images`
    - `docker push`
    - `docker build` (creating your own Docker image)
5. Create a Docker image locally:
    - Build and run a container of the image.
    - Push it on Docker Hub and remove it from the local machine, then run it again to pull it locally.

---

## Week 26.2

1. Layers in Docker.
    - Caching and optimizing the cached layers to optimize the build process.
    - Always try to use cached layers from previous builds if they're not dependent or unchanged.
2. Volumes in Docker.
3. Networks in Docker.

---

## Week 27.1

1. Docker Compose.
2. Create a monorepo, and write a CI/CD pipeline to deploy it.
    - Task: Monorepo deployment to VM via CI/CD using Docker.

---

## Week 27.2

**Task:** Deploying a monorepo to a VM using Docker and CI/CD

1. **Use Bun as a package manager for all apps in the monorepo.**
   - Understand SSG, CSR, SSR, ISR in Next.js.
   - Clarify the difference between edge and non-edge environments.
   - Note: In Next.js App Router, by default every page is SSG at build time. Next.js decides which pages to statically generate. If a page uses SSG and fetches data from a database, the database connection is needed at build time. This is why you must provide the database URL as a build argument (BUILD ARG) for web apps. For HTTP and WebSocket servers, database access is only needed at runtime, not build time.

2. **Create a simple monorepo structure:**
   - `apps/`
     - `http-server`
     - `ws-server`
     - `web` (Next.js)
   - `packages/`
     - `db` (Prisma, shared types, etc.)
     - `ui` (shared UI components)

3. **Write a Dockerfile for each app:**
   - Use multi-stage builds for smaller images.
   - For web (Next.js):
     - Use `ARG` for `DATABASE_URL` at build time for SSG.
     - Use `ENV` or `env_file` for runtime variables.
   - For http-server and ws-server:
     - Only set `DATABASE_URL` as an environment variable for runtime.

4. **Write a `docker-compose.yml`:**
   - Define services for each app and the database (e.g., Postgres).
   - Use `env_file` for runtime secrets/configs.
   - Use build `args` for web app build-time variables.
   - Use named volumes for database persistence.
   - Example:
     - `DATABASE_URL=postgresql://postgres:${POSTGRES_PASSWORD}@postgres:5432/postgres`
     - `POSTGRES_PASSWORD` in root `.env` for the database container.

5. **Write a CI/CD pipeline:**
   - Build and push Docker images to a registry (e.g., Docker Hub).
   - SSH into the VM and pull the latest images.
   - Use `docker-compose` to start/restart the services.
   - Automate the process using GitHub Actions or another CI/CD tool.

6. **(Optional)** Add health checks, logging, and monitoring for production readiness.

---

This structure ensures clear separation of build-time and runtime configs, secure handling of secrets, and a repeatable deployment process for your monorepo.
