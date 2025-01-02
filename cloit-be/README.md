## Project setup

Go to project directory:

1. Install Dependencies

```bash
$ npm install
```

2. Set Up Environment Variables
   Copy the example environment file and create a .env file:

3. Compile and Run the Project

   ```bash
   # development
   $ npm run start

   # watch mode
   $ npm run start:dev

   # production mode
   $ npm run start:prod
   ```

4. To generate a new Prisma migration, run:

```bash
npx prisma migrate dev --name init
```
