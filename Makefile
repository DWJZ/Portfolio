.PHONY: build up down run stop logs

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
