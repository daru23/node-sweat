# node-sweat
REST API to create and fetch workout sessions

# Dependencies
- Docker Engine ([see](https://www.docker.com/get-started/))
- docker-compose ([see](https://docs.docker.com/compose/gettingstarted/))

# How to use

Declare a `.env` file with your desire configuration, an example is provided (`.env-example`). 
Once you have your configuration ready, and you are sure you have the dependencies install in your PC do:

```shell
> docker-compose build
> docker-compose up -d
```

To check the logs of the containers do:

```shell
docker-compose logs -f
```

To stop the services (containers) do:

```shell
docker-compose down
```

Be aware the database has a persistent volume, in case that you want to delete this volume to start fresh do:

```shell
docker-compose down -v
```

or 

```shell
docker volume rm mongodb_data
```

## API Documentation
To access the api documentation go to:

http://localhost:3000/documentation

(Make sure to change the host and port according to whatever you configure in your `.env` file)

# TODO
- Add unit and integration tests
- Configure CI/CD in github and gitlab

**Note:** Make sure you do not commit your secrets to the repository.

