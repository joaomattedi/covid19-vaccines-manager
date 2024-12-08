
# Covid19 Vaccination Manager

This project was developed for managing vaccinated employees in a company. It allows efficient and secure control of employees' vaccination status with an intuitive frontend interface and a robust backend structure.




## Tech Stack

**Backend:**

* Laravel: PHP framework used to develop the API.
* PHP: Programming language used for the backend.
* PostgreSQL: Relational database used to store employee and vaccine data.

**Frontend:**

* Next.js: React framework used to build the frontend with server-side rendering (SSR) and performance optimization.
* React: JavaScript library for building dynamic and reactive user interfaces.
* TypeScript: Programming language based on JavaScript that adds static typing, increasing code safety and scalability.

**Docker**

The project uses Docker to facilitate configuration and execution in different environments. The use of containers allows the project to be easily started on any machine, regardless of local settings, making the development environment setup faster and simpler.

## Requirements

Before running the project, make sure you have the following installed:
* [Node.js](https://nodejs.org/pt/download/package-manager) (v18 above): Required to run the frontend.
* [Docker](https://www.docker.com): Required to run the containers for both frontend and backend.
* [Docker Compose](https://docs.docker.com/compose/install/): Required to manage multi-container Docker applications.

## How to Run the Project

### 1. Clone the Repository
```bash
git clone https://github.com/joaomattedi/covid19-vaccines-manager.git
```

### 2. Setting Up the Backend

Go to the backend directory and set up the development environment:
```bash
cd backend
```

Copy the .env.example file and rename it to .env.

### 3.Setting Up the Frontend

Go to the frontend directory:
```bash
cd frontend
```

Install the dependencies:
```bash
npm install
```

### 4. Running the Project with Docker

The project is already configured to run with Docker, making it easy to deploy in different environments. At the root of the project, run the following command to start the containers:

```bash
docker-compose up --build -d
```

Then, it will be necessary to run the migrations on the database to create all the columns and indexes.

```bash
docker exec backend php artisan migrate
```

### 5. Accessing the Project

* The backend will be available at http://localhost:8000.
* The frontend will be available at http://localhost:3000.

## Available Endpoints

There are two endpoints to be used to fill the database with random data which are generateVaccines and generateEmployees. The exported file from Insomnia is inside the root directory of the project, so you can import it inside Insomnia to get all the endpoints.

### getVaccines
- **Method**: GET
- **URL**: `http://localhost:8000/api/vaccines`
- **Headers**:
  - User-Agent: insomnia/10.2.0

### getVaccine
- **Method**: GET
- **URL**: `http://localhost:8000/api/vaccines/{id}`
- **Headers**:
  - User-Agent: insomnia/10.2.0

### storeVaccine
- **Method**: POST
- **URL**: `http://localhost:8000/api/vaccines`
- **Headers**:
  - Content-Type: application/json
  - User-Agent: insomnia/10.2.0
- **Body**:
```
{
	"name": "jansen",
	"batch": 8888000,
	"expiration_date": "2027-12-08"
}
```

### generateVaccines
This one can be used to fill the database with random data.

- **Method**: POST
- **URL**: `http://localhost:8000/api/vaccines/generate`
- **Headers**:
  - Content-Type: application/json
  - User-Agent: insomnia/10.2.0
- **Body**:
```
{
	"quantity": 50
}
```

### updateVaccine
- **Method**: PUT
- **URL**: `http://localhost:8000/api/vaccines/1`
- **Headers**:
  - Content-Type: application/json
  - User-Agent: insomnia/10.2.0
- **Body**:
```
{
	"name": "ola",
	"batch": 8888000,
	"expiration_date": "2027-12-08"
}
```

### deleteVaccine
- **Method**: DELETE
- **URL**: `http://localhost:8000/api/vaccines/1`
- **Headers**:
  - User-Agent: insomnia/10.2.0

### generateEmployees
This one can be used to fill the database with random data.
- **Method**: POST
- **URL**: `http://localhost:8000/api/employees/generate`
- **Headers**:
  - Content-Type: application/json
  - User-Agent: insomnia/10.2.0
- **Body**:
```
{
	"quantity": 500
}
```

### getEmployees
- **Method**: GET
- **URL**: `http://localhost:8000/api/employees`
- **Headers**:
  - User-Agent: insomnia/10.2.0

### getEmployeeById
- **Method**: GET
- **URL**: `http://localhost:8000/api/employees/2`
- **Headers**:
  - User-Agent: insomnia/10.2.0

### getEmployeeByCPF
- **Method**: GET
- **URL**: `http://localhost:8000/api/employees/12525551990`
- **Headers**:
  - User-Agent: insomnia/10.2.0

### deleteEmployeeById
- **Method**: DELETE
- **URL**: `http://localhost:8000/api/employees/1`
- **Headers**:
  - User-Agent: insomnia/10.2.0

### deleteEmployeeByCPF
- **Method**: DELETE
- **URL**: `http://localhost:8000/api/employees/12525551990`
- **Headers**:
  - User-Agent: insomnia/10.2.0

### storeEmployee
- **Method**: POST
- **URL**: `http://localhost:8000/api/employees`
- **Headers**:
  - Content-Type: application/json
  - User-Agent: insomnia/10.2.0
  - Accept:  application/json
- **Body**:
```
{
	"cpf": "12525551904",
	"full_name": "John Doe",
	"birth_date": "1990-01-01",
	"date_first_dose": "2023-01-01",
	"date_second_dose": "2023-03-01",
	"comorbidity_carrier": true
}
```

### updateEmployeeById
- **Method**: PUT
- **URL**: `http://localhost:8000/api/employees/1722`
- **Headers**:
  - Content-Type: application/json
  - User-Agent: insomnia/10.2.0
  - Accept:  application/json
- **Body**:
```
{
	"cpf": "12525551994",
	"full_name": "John Doe",
	"birth_date": "1990-01-01",
	"date_first_dose": "2023-01-01",
	"date_second_dose": "2023-03-01",
	"vaccine_id": "",
	"comorbidity_carrier": true
}
```

### updateEmployeeByCPF
- **Method**: PUT
- **URL**: `http://localhost:8000/api/employees/12525551991`
- **Headers**:
  - Content-Type: application/json
  - User-Agent: insomnia/10.2.0
  - Accept:  application/json
- **Body**:
```
{
	"cpf": "12525551993",
	"full_name": "John Doe",
	"birth_date": "1990-01-01",
	"date_first_dose": "2023-01-01",
	"date_second_dose": "2023-03-01",
	"comorbidity_carrier": true
}
```


## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/)

