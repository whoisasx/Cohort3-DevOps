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
