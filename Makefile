.PHONY: build up down run stop logs certs

certs:
	mkdir -p certs
	openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
		-keyout certs/selfsigned.key \
		-out certs/selfsigned.crt \
		-subj "/CN=localhost"

build:
	docker compose build

up:
	docker compose up

run:
	docker compose up -d --build

stop:
	docker compose down

down:
	docker compose down

logs:
	docker compose logs -f
