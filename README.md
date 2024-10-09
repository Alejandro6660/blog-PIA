<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

### Blog Backend

Este repositorio contiene el backend de una plataforma de blog desarrollada con NestJS. Proporciona una API robusta.

Características principales:

- **Gestión de publicaciones:** Crear, editar, eliminar y obtener publicaciones con soporte para Markdown.
- **Sistema de tags:** Organiza las publicaciones mediante tags jerárquicas.
- **Comentarios:** Los usuarios pueden añadir, editar y eliminar comentarios en las publicaciones.
- **Autenticación y autorización:** Sistema de autenticación basado en JWT para proteger las rutas privadas.
- **Control de usuarios:** Roles de usuario (administradores, clientes) con permisos específicos.

  [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

#### Descargas necesarias

1.  Editor preferido ( Recomendacion: <a href="https://code.visualstudio.com/Download" target="_blank">Visual Studio Code</a>)
2.  <a href="https://www.postman.com/downloads/" target="_blank">Postman</a>
3.  <a href="https://www.docker.com/products/docker-desktop/#:~:text=Docker%20Desktop%20is%20a%20secure%20and%20easy-to-use%20tool" target="_blank">Docker Desktop</a>
4.  <a href="https://nodejs.org/en/download/package-manager" target="_blank">NodeJS</a>

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# DEBUGGUEAR
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Generate and Run Migration
```bash
# generate migration
npm run m:gen ./src/db/migrations/initDB

# Run migration
npm run m:run
```
## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
