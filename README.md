# TodoBackend

This project was generated with Node version 20.14.0.

## Development server

Run `node app.js` for a dev server. Navigate to `http://127.0.0.1:3000/`. The application will automatically reload if you change any of the source files.

## Postman

Import the Postman collection provided in the project to test the API endpoints. After importing, you can run the tests included in the collection.

### API Endpoints

- **Login**: 
  - `POST http://127.0.0.1:3000/login` - Login Users
  
- **Register**: 
  - `POST http://127.0.0.1:3000/register` - Register Users
  
- **Todo List**: 
  - **Create Todo**: 
    - `POST http://127.0.0.1:3000/api/todos` - Register a new todo list item.
  - **Get Todo**: 
    - `GET http://127.0.0.1:3000/api/todos` - Retrieve the list of todo items.
  - **Update Todo**: 
    - `PUT http://127.0.0.1:3000/api/todos/1` - Update a todo list item by ID.
  - **Delete Todo**: 
    - `DELETE http://127.0.0.1:3000/api/todos/1` - Delete a todo list item by ID.
