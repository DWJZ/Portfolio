# Portfolio

A static portfolio site served via nginx in Docker with HTTPS.

**Live:** [https://ec2-3-144-96-50.us-east-2.compute.amazonaws.com/](https://ec2-3-144-96-50.us-east-2.compute.amazonaws.com/)

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [OpenSSL](https://www.openssl.org/) (for generating self-signed certs)

## Quick Start

```bash
make certs   # Generate self-signed certificates (first time only)
make run
```

The site will be available at [https://localhost](https://localhost). HTTP (port 80) redirects to HTTPS.

## Commands

| Command      | Description                              |
|--------------|------------------------------------------|
| `make certs` | Generate self-signed SSL certificates    |
| `make build` | Build the Docker image                   |
| `make up`    | Run containers in the foreground         |
| `make run`   | Build and run in the background          |
| `make stop`  | Stop and remove containers               |
| `make logs`  | Follow container logs                    |
