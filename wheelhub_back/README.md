# Candidate Exercise / Full-stack Web Developer for WheelHub
[![WheelHub](https://wheelhub.es/logo/Logotipo-Vertical-Negro-Alta.png)](https://wheelhub.es/)

## Installation

```sh
npm i
```

## Configuration
Is necessary configure file for a environment:

```sh
NODE_ENV = "development"
APP_PORT = "8081"
```

## About The Project

You are going to develop endpoint registration.

## Tecnologies and libraries

```bash
BACK
- Typescrit
- NODE
- TypeORM
- SQLite
- EXPRESS
```

## Getting Started

First, run the development server:

```bash
npm run start - view for mode production in local
npm run test - pass test with jest
```

## Description
<p align="center"> LIST OF TASKS DEMANDED</p>

1. DONE ✅
Create one route with method POST 'create'.

Receive and validate the fields allowing only those included in the Swagger:
| FIELD | FORMAT |
| ------ | ------ |
| username | string |
| password | string |

Exclude additional fields or fields arriving in other formats.

2. DONE ✅
the password must be encrypted to SHA256.

TypeORM
   | table USER|  |
   | ------ | ------ |
   | id | string |
   | username | string |
   | password | string |


3. DONE ✅
Return JSON with next format:
`
{
   status: 200,
   message: "El usuario se creó correctamente"
}
`

4. DONE ❌
Use a SWAGGER
