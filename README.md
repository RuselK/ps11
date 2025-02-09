# ps11
Landing page [ps11.ru](https://ps11.ru)

## How to run dev environment

1. Create .env file in root directory
```bash
cp .env.example .env
```

2. Run docker compose with redis and db
```bash
docker-compose -f ./docker-compose.dev.yml up -d 
```

3. install backend dependencies
```bash
cd backend
pip install -r requirements.txt
```

4. Make migrations
```bash
cd backend
python -m src.cli init
```

5. Run backend
```bash
cd backend
uvicorn src.app:app --reload
```

6. Run frontend
```bash
cd frontend
npm install
npm run dev
```

## How to run production environment
1. Create .env file in root directory
```bash
cp .env.example .env
```

2. Run docker compose
```bash
docker-compose up --build -d
```

3. Create migrations and superuser
```bash
docker exec -it ps11-backend python -m src.cli init
```

## Requirements
- Python 3.11
- Node.js
- Docker
