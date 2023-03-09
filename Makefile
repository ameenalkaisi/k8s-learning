.PHONY: check-env

setup: check-env
	docker run --rm -it --network=host alpine ash -c \
		"apk add socat && socat TCP-LISTEN:$(PORT),reuseaddr,fork TCP:host.docker.internal:$(PORT)" & \
	kubectl port-forward --namespace kube-system service/registry $(PORT):80 & \

install-test:
	helm install test k8s-learning-chart

install-test-and-service:
	helm install test k8s-learning-chart
	minikube service nextjs-app-service

uninstall-test:
	helm uninstall test

build-and-push: check-env
	$(MAKE) -C nextjs-app build-and-push

check-env:
ifndef PORT
	$(error PORT is undefined)
endif
