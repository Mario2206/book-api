
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

