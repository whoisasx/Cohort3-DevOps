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

---

## Week 28.1

**Topic: Horizontal and Vertical Scaling**

1. **Horizontal Scaling (Scaling Out):**

    - Increase system capacity by adding more machines/instances.
    - Each instance runs a copy of the app, distributing the load.
    - Common in cloud: add more VMs, containers, pods.
    - Load balancers distribute traffic across instances.

2. **Vertical Scaling (Scaling Up):**

    - Increase resources (CPU, RAM, etc.) of a single machine.
    - The app runs on a more powerful server.
    - Limited by hardware max capacity; can get expensive.

3. **Process Clustering:**

    - Run multiple Node.js processes (using cluster module) to use all CPU cores.
    - In development, browsers may cache the process ID and send requests to the same process, so local load balancing may not be fully effective.

4. **Stateless vs Stateful Server Autoscaling:**

    - Stateless servers: No local user/session data. Any instance can handle any request. Easy to scale horizontally.
    - Stateful servers: Store session/user data locally. Scaling is harder—must route requests to the correct instance or share state (e.g., Redis for sessions).

5. **Best Practices:**
    - Design apps to be stateless for easier scaling and reliability.
    - Use external storage (databases, caches) for stateful data.
    - Implement health checks and monitoring for autoscaling.

---

## Week 28.2

**Steps to Create an Auto Scaling Group (ASG) in AWS:**

1. Go to the EC2 Dashboard in AWS Console.
2. In the left menu, click on "Auto Scaling Groups".
3. Click "Create Auto Scaling group".
4. Enter a name for your ASG.
5. Select a Launch Template or create a new one (defines AMI, instance type, key pair, security groups, etc.).
6. Choose the VPC and subnets for your instances.
7. Configure group size and scaling policies:
    - Set minimum, desired, and maximum number of instances.
    - Add scaling policies (e.g., target tracking, step scaling, scheduled actions).
8. (Optional) Attach a load balancer (Application/Network Load Balancer) for distributing traffic.
9. Configure notifications and tags as needed.
10. Review all settings and click "Create Auto Scaling group".

Your ASG will now automatically manage EC2 instances based on your scaling policies!

---

## Week 29 - Cloud-based IDE Platform with Auto Scaling

**Goal:** Build a scalable, production-ready cloud-based VS Code platform using AWS EC2, Auto Scaling Groups (ASG), and programmatic instance management.

### Phase 1: Base Cloud IDE Instance

-   Launch Ubuntu EC2, open ports for SSH (22), VS Code server (8080), HTTP/HTTPS (80/443).
-   Install: nginx, nodejs, npm, docker, git, code-server.
-   Configure code-server and Nginx (SSL, reverse proxy).
-   Harden security and firewall.
-   Create a custom AMI for reuse.

### Phase 2: Launch Template & ASG

-   Create a Launch Template from the AMI, add user data for auto-start and instance info.
-   Create an Auto Scaling Group (ASG) with min/max/desired capacity, scaling policies, and (optionally) a load balancer.

### Phase 3: Programmatic ASG Management

-   Create an IAM user with permissions for ASG and EC2 management.
-   Store credentials securely.
-   Build a Node.js API (Express, AWS SDK) to:
    -   Scale ASG up/down
    -   List and check instance health/status
    -   Expose endpoints for user requests (request/release/check instance)

### Phase 4: User-Facing API & Features

-   REST endpoints for requesting, releasing, and listing IDE instances.
-   Add session management, authentication, usage monitoring, and persistent storage (e.g., S3).

### Phase 5: Monitoring, Security, and Optimization

-   Integrate CloudWatch for metrics, alarms, and dashboards.
-   Implement cost optimization (scheduled scaling, spot instances, hibernation).
-   Harden security: private subnets, Systems Manager, encryption, logging.
-   Test: load, disaster recovery, performance, user experience.

> This approach delivers a robust, scalable, and secure cloud IDE platform with automated scaling, monitoring, and cost controls.

---

## Week 30.1 – ECR, ECS & Container Orchestration

1. **AWS CLI Setup**

    - Install or update the AWS CLI to ensure you can run `aws` commands in your terminal.
    - Configure your CLI with `aws configure` (set up access key, secret, region, and output format).

2. **IAM User for ECR**

    - In AWS IAM, create a user with permissions limited to ECR (Amazon Elastic Container Registry) actions.
    - Attach a policy like `AmazonEC2ContainerRegistryFullAccess` or a custom policy with only required permissions.

3. **Access Keys**

    - Generate an Access Key ID and Secret Access Key for the IAM user.
    - Use these credentials to log in via the AWS CLI.

4. **Push Docker Images to ECR**

    - Create a new ECR repository in the AWS Console.
    - Authenticate Docker to your ECR registry:
        ```bash
        aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <account-id>.dkr.ecr.<region>.amazonaws.com
        ```
    - Build your Docker image and tag it for ECR:
        ```bash
        docker build -t my-app .
        docker tag my-app:latest <account-id>.dkr.ecr.<region>.amazonaws.com/my-app:latest
        ```
    - Push the image:
        ```bash
        docker push <account-id>.dkr.ecr.<region>.amazonaws.com/my-app:latest
        ```

5. **ECS: Elastic Container Service**

    - **Architecture Overview:** Understand ECS components: Clusters, Task Definitions, Services, and Tasks.
    - **Cluster Creation:** Create an ECS cluster (EC2 or Fargate launch type).
    - **Task Definition:** Define your container specs (image, CPU, memory, ports, env vars).
    - **Service Creation:** Deploy a service in your cluster to run and maintain the desired number of tasks.
    - **Autoscaling:** Set up autoscaling policies based on CPU/memory usage or custom CloudWatch metrics.

    **Best Practices:**

    - Use IAM roles for ECS tasks for secure access to AWS resources.
    - Store secrets in AWS Secrets Manager or SSM Parameter Store.
    - Enable logging with AWS CloudWatch for observability.

---

## Week 30.2 – Monitoring, Logging & New Relic

1. **New Relic Integration**

    - Sign up for a New Relic account.
    - Install the New Relic agent in your application (Node.js, Python, etc.).
    - Configure the agent with your New Relic license key.
    - Use New Relic dashboards to monitor application performance, errors, and throughput.

2. **Winston Logger (Node.js)**

    - Install Winston:
        ```bash
        npm install winston
        ```
    - Set up a logger in your app:
        ```js
        const winston = require("winston");
        const logger = winston.createLogger({
        	level: "info",
        	format: winston.format.json(),
        	transports: [
        		new winston.transports.Console(),
        		new winston.transports.File({ filename: "app.log" }),
        	],
        });
        ```
    - Use the logger for structured logging:
        ```js
        logger.info("Server started");
        logger.error("Something went wrong", { error });
        ```

3. **Additional Monitoring & Logging Tips**
    - Forward logs to CloudWatch or a centralized log management system.
    - Set up alerts for error rates, latency, and resource usage.
    - Use distributed tracing (e.g., OpenTelemetry) for end-to-end visibility.

---

## Week 31 – Prometheus Metrics in Node.js

1. **Prometheus Metrics Integration**

    - Integrated Prometheus metrics in the Node.js (Express) app using the `prom-client` library.
    - Exposed a `/metrics` endpoint to allow Prometheus to scrape application metrics.

2. **Custom Metrics Implemented**

    - **Request Counter:** Tracks total number of HTTP requests, labeled by method, route, and status code.
    - **Request Duration Histogram:** Measures duration of HTTP requests in milliseconds, labeled by method, route, and status code.
    - **Active Requests Gauge:** Tracks the number of active HTTP requests being processed.

3. **Metrics Middleware**

    - Middleware increments active requests on each incoming request (except `/metrics`).
    - On response finish, updates request counter, observes request duration, and decrements active requests.

4. **Example Endpoints**

    - `/user` (GET/POST): Simulates user data fetch and creation.
    - `/cpu`: Simulates a CPU-intensive operation.
    - `/metrics`: Exposes all collected metrics in Prometheus format.

5. **Next Steps**
    - Configure Prometheus server to scrape the `/metrics` endpoint.
    - Visualize and alert on metrics in future sessions.

---
