# Football Championship Full Stack API

## Table of Contents
- [Introduction](#introduction)
- [Application Features and Usage](#application-features-and-usage)
- [Getting Started](#getting-started)
- [Disclaimers](#disclaimers)
- [Technologies Used](#technologies-used)

## Introduction

The Football Championship Full Stack Application enables users to manage and follow a football championship. The project includes role-based access level permissions logic, where there are two roles - "User" and "Admin".

The frontend of the application was created by Trybe (an educational institute), while the dockerization and communication of the services were implemented by the author of this repository. The backend is built in TypeScript, using Express to create the API server, and Sequelize as the ORM to communicate with a MySQL database. JSON Web Token (jsonwebtoken) is used for authentication, Joi for data validations, and Bcrypt for encryption. The project runs on three Docker containers, one for the database, one for the API, and one for the frontend.

## Application Features and Usage

<details>
<summary>Features</summary>

- User Authentication: login to the application with different access levels;
- Match Management: Create, edit and finish matches;
- View Matches: View ongoing and finished matches board;
- Filter Matches: Filter matchers by ongoing or finished;
- Leaderboard: View the championship leaderboard to see the current standings;
- Filter Leaderboard: calculate leaderboard by including home matches, away matches or both.
</details>

<details>
<summary>Usage</summary>

- **to access as an admin**: use `admin@admin.com` as *email* and `secret_admin` as *password*
- **to access as a regular user**: use `user@user.com` as *email* and `secret_user` as *password*
</details>


## Getting Started

To get started with the project, follow the steps below:

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-folder>
```

2. Run the docker compose up script to start all containers:
  - You need to have docker and docker-compose installed

```bash
npm run compose:up
```
- Wait all containers to start

3. Acess the application on your web server: `http://localhost:3000/login`


## Disclaimers

- The frontend of the application was created by Trybe (educational institute);
- The database already has seed values to facilitate testing and development;
- <details><summary>There are some relevant features to be implemented</summary>
  
    - register new users and admins
    - endpoints for match editing and deletion
    - endpoints for team creation, editing and deletion
    - the aditional endpoints will not reflect the frontend features
</details>

## Technologies Used

Below are the key technologies and libraries used in the project:

1. [TypeScript](https://www.typescriptlang.org/) - A statically-typed superset of JavaScript that compiles to plain JavaScript.
2. [Express](https://expressjs.com/) - A fast and minimalist web framework for Node.js used to create the API server.
3. [Sequelize](https://sequelize.org/) - A powerful and flexible ORM for Node.js used to communicate with the MySQL database.
4. [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - A library to generate and verify JSON Web Tokens for user authentication.
5. [Joi](https://github.com/sideway/joi) - A library for data validation in JavaScript.
6. [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) - A library for encryption and hashing of sensitive data.
7. [Docker](https://www.docker.com/) - A platform used to run the project in isolated containers.
8. [MySQL](https://www.mysql.com/) - An open-source relational database management system.