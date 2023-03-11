## How to run on minikube on docker on Windows
### Prerequisites
- minikube installed
- running docker desktop
- helm installed
- make installed "or copy the commands from make manually, replace port as you see it"
- port 30004 opened
- make sure MySQL windows service isn't running (I think 3306 port might need to be opened but haven't tested)

1. Run minikube start
2. Make sure registry addon is enable through
```
minikube addons enable registry
```
3. Using the docker port to replace the original port, run the following in one of the terminals, needed so that docker registry is accessible
```
make setup-docker -e PORT=*PORT*
```

4. With the same port, run the following in another terminal, this helps with making the docker registry accessible
```
make setup-kubectl -e PORT=*PORT*
```

5. Build and install the app

To build the application, use `make build-and-push -p PORT=*docker port`
To install the testing yaml files using helm run `make install-test`
And remove it using `make uninstall-test`

5. Port forward the local 30004 port to the cluster's 3000 port using this command, again in another terminal
```
make port-forward-app
```

If you want the dashboard, run this in another terminal
````
minikube dashboard
``````

## About Make
In Windows, must run setup-docker and setup-kubectl instead of setup, also the build-and-push is not concurrent so it will be slower.

## TODO

- [x] fix "Internal Server Error" issue wth next-auth, look back to see what I did wrong
- [ ] test, make sure that auth works with the same client when they are interacting with multiple servers (through load balancing)
- [ ] fix db-migration job _sometimes_ breaking (half the times I deploy it breaks 4 times in a row saying can't authenticate)
