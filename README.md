## TODO

[] fix "Internal Server Error" issue wth next-auth, look back to see what I did wrong
[] test, make sure that auth works with the same client when they are interacting with multiple servers (through load balancing)
[] fix db-migration job _sometimes_ breaking (half the times I deploy it breaks 4 times in a row saying can't authenticate)

## About Make
In Windows, must wun setup-docker and setup-kubectl instead of setup, also the build-and-push is not concurrent so it will be slower.
