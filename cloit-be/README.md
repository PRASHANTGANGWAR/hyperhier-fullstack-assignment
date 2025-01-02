A Simple NestJS Backend Application
This is a backend application built using the NestJS framework. It connects to a PostgreSQL database and utilizes Prisma.js ORM for efficient database operations.

The application is designed to provide a scalable and maintainable structure, adhering to modern development best practices. It leverages Prisma for seamless schema management, migrations, and querying, ensuring robust interaction with the PostgreSQL database.


## Prerequisites
Before running the application, ensure you have the following installed:

Node.js (v18 or higher)
npm 

## Installation
   1. Clone the repository:
      git clone <repository link>
      cd your-repo-name

   2. Install dependencies:
      ``npm install``

   3. Set up environment variables:
   Copy the example environment file and create a .env file in root directory:


## Running the Application
   1. Development Mode:
      ```npm run start:dev```

   2. Production Mode:
      ```npm run build```
      ```npm run start:prod```


## Creating table in database
   First, add a model to the schema.prisma file, and then execute this command.
      ```npx prisma migrate dev --name init```

