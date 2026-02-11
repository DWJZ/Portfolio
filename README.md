# Portfolio

A static portfolio site served via nginx in Docker.

**Live:** [http://ec2-3-144-96-50.us-east-2.compute.amazonaws.com:8080/](http://ec2-3-144-96-50.us-east-2.compute.amazonaws.com:8080/)

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Quick Start

```bash
make run
```

The site will be available at [http://localhost:8080](http://localhost:8080).

## Commands

| Command     | Description                          |
|-------------|--------------------------------------|
| `make build`| Build the Docker image               |
| `make up`   | Run containers in the foreground     |
| `make run`  | Build and run in the background      |
| `make stop` | Stop and remove containers           |
| `make logs` | Follow container logs                |
