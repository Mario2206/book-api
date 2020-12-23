
## Description

This project is a book api which enables to the user to reserve books from a database. Only an admin can create and remove a book. An user can't have more than three current reservations. Of course, he can close his reservations. 

## Installation

```bash
$ npm install
```

## Configuration 

* Create a ".env" file at the project root
* Use the ".env.example" file content to complete the informations (your mongo DB connection url AND your jwt private key)

## Seeds

```bash
# User seed
$ npx nestjs-command create:users
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testing routes 

Go to : http://localhost:3000/api (access to an interface for using the API)

## Routes 

### App 

* (POST) /v1/auth/login : Login
* (POST) /v1/auth/register : Register

### Book

* (POST) /v1/books : Create a book (ADMIN)
* (GET) /v1/books : Get all books
* (DELETE) /v1/books/{bookId} : Remove a specific book (according its id)
* (GET) /v1/books/{bookId} : Get a specific book (according its id)

### Reservation

* (POST) /v1/reservation : Create a reservation (USER)
* (GET) /v1/reservation : Get all current reservation (of the authentified user)
* (PUT) /v1/reservation/{reservationId} : Close a specific reservation (according its id)

*For more details, go to http://localhost:3000/api*



