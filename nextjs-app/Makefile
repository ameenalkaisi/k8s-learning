.PHONY: check-env

build-and-push: check-env
	docker build -t nextjs-docker -f build.Dockerfile . && \
	docker image tag nextjs-docker localhost:$(PORT)/nextjs-app && \
	docker push localhost:$(PORT)/nextjs-app &

	docker build -t nextjs-db-migration -f db-migrate.Dockerfile . && \
	docker image tag nextjs-db-migration localhost:$(PORT)/nextjs-db-migration && \
	docker push localhost:$(PORT)/nextjs-db-migration &

check-env:
ifndef PORT
	$(error PORT is undefined)
endif
