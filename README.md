# Code Challenge: Show Me The Money

The root directory contains three apps, which should be started using:

`docker compose up --build`

## App1: Angular frontend

Runs on external port 8080.

The Angular frontend does most of the work. It consumes the data and renders it into the UI.

- I kept things simple, no ng-workspace or Nx
- Again, I kept things simple, no Tailwind, Material, or Bootstrap etc.
- I separated data access from components/UI
- I broke down the UI components somewhat to illustrate my processes
- I wrote some unit tests
- Loads in dev mode, with live reload

###### Run tests

Change directory to `./ng`, then run:

```
ng test
```

TODO: Setup headless tests, to enable testing through docker.

## App2: Go backend

Runs on external port 8081.

The Go backend simply proxies the Xero API. It makes it available to the Angular frontend with CORS config.

- I kept things simple, using only the standard library
- I wrote some unit tests
- Loads in dev mode, with live reload

Change directory to the project root, then run:

```
docker exec smtm-go go test ./...
```

## App3: Xero mock API

Runs on external port 8082.

As provided.
