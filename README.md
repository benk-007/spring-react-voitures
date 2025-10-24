# 🚗 Car Management System

A full-stack web application for managing a car inventory with Spring Boot backend, React frontend, and monitoring capabilities.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Monitoring](#monitoring)
- [Testing](#testing)
- [Docker Deployment](#docker-deployment)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **CRUD Operations**: Complete Create, Read, Update, Delete functionality for cars
- **Owner Management**: Track car owners with one-to-many relationships
- **RESTful API**: Spring Data REST with custom endpoints
- **Modern UI**: Responsive React interface with React Bootstrap
- **Security**: HTTP Basic Authentication with Spring Security
- **Monitoring**: Prometheus metrics and Grafana dashboards
- **Database**: MariaDB for production, H2 for development
- **API Documentation**: Interactive Swagger UI (OpenAPI 3.0)
- **Docker Support**: Multi-container deployment with Docker Compose

## 🛠 Tech Stack

### Backend
- **Java 21**
- **Spring Boot 3.5.6**
- **Spring Data JPA**
- **Spring Data REST**
- **Spring Security**
- **MariaDB / H2**
- **Lombok**
- **Maven**

### Frontend
- **React 19**
- **React Router v7**
- **React Bootstrap 2**
- **Axios**
- **Bootstrap 5**

### DevOps & Monitoring
- **Docker & Docker Compose**
- **Prometheus**
- **Grafana**
- **Spring Boot Actuator**
- **Nginx**

## 🏗 Architecture

```
┌─────────────┐      ┌──────────────┐      ┌──────────────┐
│   React     │─────▶│  Spring Boot │─────▶│   MariaDB    │
│  Frontend   │      │    Backend   │      │   Database   │
│  (Port 3000)│      │  (Port 8080) │      │  (Port 3307) │
└─────────────┘      └──────────────┘      └──────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │  Prometheus  │
                     │  (Port 9090) │
                     └──────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │   Grafana    │
                     │  (Port 3001) │
                     └──────────────┘
```

## 📦 Prerequisites

- **Java Development Kit (JDK) 21**
- **Node.js 20+** and **npm**
- **Maven 3.9+**
- **Docker** and **Docker Compose** (for containerized deployment)
- **MariaDB 11** (or use Docker)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/car-management-system.git
cd car-management-system
```

### 2. Install Backend Dependencies

```bash
./mvnw clean install
```

### 3. Install Frontend Dependencies

```bash
cd src/main/webapp/reactjs
npm install
cd ../../../..
```

## ⚙️ Configuration

### Backend Configuration

Edit `src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:mariadb://localhost:3307/compagnie
spring.datasource.username=sbuser
spring.datasource.password=sbpass

# Security
spring.security.user.name=user
spring.security.user.password=pass

# Spring Data REST
spring.data.rest.base-path=/api
```

### Frontend Configuration

Edit `src/main/webapp/reactjs/src/axios.js` to match your backend credentials:

```javascript
export const withAuth = (cfg = {}) => ({
  ...cfg,
  headers: { 
    ...(cfg.headers || {}), 
    Authorization: "Basic " + btoa("user:pass") 
  },
});
```

## 🏃 Running the Application

### Development Mode

#### Option 1: Run Backend and Frontend Separately

**Terminal 1 - Backend:**
```bash
./mvnw spring-boot:run
```

**Terminal 2 - Frontend:**
```bash
cd src/main/webapp/reactjs
npm start
```

- Backend: http://localhost:8080
- Frontend: http://localhost:3000
- Swagger UI: http://localhost:8080/swagger-ui/index.html

#### Option 2: Using Docker Compose

```bash
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001 (admin/admin)

### Production Build

```bash
# Build backend JAR
./mvnw clean package -DskipTests

# Build frontend
cd src/main/webapp/reactjs
npm run build
```

## 📚 API Documentation

### Interactive API Documentation

Access Swagger UI at: http://localhost:8080/swagger-ui/index.html

### Main Endpoints

#### Voitures (Cars)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/voitures` | List all cars | No |
| GET | `/api/voitures/{id}` | Get car by ID | Yes |
| POST | `/api/voitures` | Create new car | Yes |
| PUT | `/api/voitures/{id}` | Update car | Yes |
| PATCH | `/api/voitures/{id}` | Partial update | Yes |
| DELETE | `/api/voitures/{id}` | Delete car | Yes |

#### Custom Search Endpoints

- `/api/voitures/search/findByMarque?marque=Toyota`
- `/api/voitures/search/findByModele?modele=Corolla`
- `/api/voitures/search/findByCouleur?couleur=Rouge`
- `/api/voitures/search/findByAnnee?annee=2018`

#### Example Request

```bash
# Create a new car
curl -X POST http://localhost:8080/api/voitures \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic dXNlcjpwYXNz" \
  -d '{
    "marque": "Toyota",
    "modele": "Camry",
    "couleur": "Bleu",
    "immatricule": "A-1-2345",
    "annee": 2023,
    "prix": 150000
  }'
```

## 📊 Monitoring

### Prometheus Metrics

Access metrics at: http://localhost:9090

Available metrics include:
- JVM metrics (memory, threads, GC)
- HTTP request metrics
- Database connection pool metrics
- Custom application metrics

### Grafana Dashboards

1. Access Grafana at http://localhost:3001
2. Login with `admin/admin`
3. Import the dashboard from `dashboard_grafan.json`

Key metrics displayed:
- HTTP status codes
- Response times
- Request rates
- System health

### Spring Boot Actuator

Health endpoint: http://localhost:8080/actuator/health
Prometheus endpoint: http://localhost:8080/actuator/prometheus

## 🧪 Testing

### Run All Tests

```bash
./mvnw test
```

### Run Specific Test Classes

```bash
# Repository tests
./mvnw test -Dtest=VoitureRepoTest

# Smoke tests
./mvnw test -Dtest=SpringdataBasicSmokeTest
```

### Test Coverage

- Unit tests for repositories
- Integration tests for controllers
- Smoke tests for application context

## 🐳 Docker Deployment

### Services in Docker Compose

1. **mariadb**: Database server (port 3307)
2. **backend**: Spring Boot application (port 8080)
3. **frontend**: React app served by Nginx (port 3000)
4. **prometheus**: Metrics collection (port 9090)
5. **grafana**: Monitoring dashboards (port 3001)

### Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop all services
docker-compose down

# Rebuild services
docker-compose up --build

# Remove volumes (clean database)
docker-compose down -v
```

## 📁 Project Structure

```
SpringDataRest/
├── src/
│   ├── main/
│   │   ├── java/org/cours/
│   │   │   ├── config/          # Security, CORS configuration
│   │   │   ├── modele/          # JPA entities and repositories
│   │   │   ├── web/             # REST controllers
│   │   │   └── SpringDataRestApplication.java
│   │   ├── resources/
│   │   │   └── application.properties
│   │   └── webapp/reactjs/      # React frontend
│   │       ├── public/
│   │       └── src/
│   │           ├── Components/  # React components
│   │           ├── App.js
│   │           └── axios.js     # API client
│   └── test/                    # Test classes
├── monitoring/
│   └── prometheus.yml           # Prometheus configuration
├── docker-compose.yml           # Docker services definition
├── Dockerfile                   # Backend Dockerfile
├── pom.xml                      # Maven configuration
└── README.md
```

## 🔐 Default Credentials

### Application
- **Username**: user
- **Password**: pass

### Database (Docker)
- **Database**: compagnie
- **Username**: sbuser
- **Password**: sbpass
- **Root Password**: rootpass

### Grafana (Docker)
- **Username**: admin
- **Password**: admin

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Spring Boot Documentation
- React Documentation
- Bootstrap Documentation
- Docker Documentation

---

