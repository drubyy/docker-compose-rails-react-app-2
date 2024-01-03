pre-build:
	if [ -d ".ssh" ]; then rm -Rf .ssh; fi\
	&& mkdir .ssh && sudo cp -r ~/.ssh . && sudo chmod 777 .ssh && sudo chmod 777 .ssh/*

build:
	docker compose build

up:
	docker compose up -d

down:
	docker compose down

debug: dev
	docker attach --detach-keys="ctrl-c" $(shell docker compose ps -q app)

bundle:
	docker compose exec app bash -c "bin/bundle install"

sidekiq:
	docker compose exec app bash -c "bundle exec sidekiq"

bash:
	docker compose exec app bash

console:
	docker compose exec app bash -c "bin/rails c"

db-setup:
	docker compose exec app bash -c "bin/rails db:setup"

migrate:
	docker compose exec app bash -c "bin/rails db:migrate"

routes:
	docker compose exec app bash -c "bin/rails routes"

routes_grep:
	docker compose exec app bash -c "bin/rails routes | grep $(name)"

attach-log:
	docker compose exec app bash -c "tail -f log/development.log"

seed:
	docker compose exec app bash -c "bin/rails db:seed"

npm-install:
	docker compose exec -it app_frontend npm install $(package) --save

logs:
	docker compose logs $(name)

restart:
	docker compose down && docker compose up -d