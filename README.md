# ps11

## Run dev db
```bash
docker-compose -f ./docker-compose.dev.yml up -d 
```

## Migrations in docker
create migrations and superuser
```bash
docker exec -it ps11-backend python -m src.cli init
```