# Teste Técnico (Tech Lead)

O presente projeto corresponde à etapa de teste técnico da empresa RadarFit do participante Matheus Rodrigues Borges para a posição de Tech Lead.

O arquivo PDF contendo a solução do desafio teórico pode ser acessado [neste link](https://github.com/matheus-rborges/radarfit-teste/blob/main/RadarFit%20-%20Teste%20Pr%C3%A1tico.pdf)

## Linguagem e framework

O presente projeto foi escrito utilizando-se a linguagem TypeScript e valendo-se do Framework NestJs como framework principal.

## Database

Para esse projeto, foi escolhido o SQLite como banco uma vez que se trata apenas de uma prova de conceito e, para tanto, ele é uma escolha que agrega muita simplicidade ao projeto.

#### Table `Objects`:

| Column name | Data type | Description                                       |
| ----------- | --------- | ------------------------------------------------- |
| id (PK)     | interger  | The autoincrement id for the the table            |
| name        | text      | corresponde ao campo título solicitado            |
| description | text      | corresponde ao campo descrição                    |
| createdAt   | datetime  | Campo padrão para registro da hora de criação     |
| updatedAt   | datetime  | Campo padrão para registro da hora de atualização |

### Data source

Foi gerado um JSON contendo as entradas inciais que foram utilizadas para popular o banco de dados e facilitar os testes futuros.

## Execução via Docker

Basta executar

```bash
docker compose up --build
```

Ou, caso já tenha o gerenciador de pacotes NPM ou YARN instalados:

```bash
# Para yarn
yarn compose
# Ou para Npm
npm run compose
```

## Instalação na máquina hospedeira com ambiente NodeJs prepado ([v19](https://nodejs.org/download/release/v19.9.0/))

```bash
# Install package.json dependencies
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod

# compose app in docker container
$ yarn compose
```

## Test

```bash
# unit tests
$ yarn test

# test coverage
$ yarn test:cov
```

## Endpoints

### Documentação swagger

```
GET: /doc
```

Conta com a página de swagger para teste e documentação da API.

### Obtendo um objeto específico por Id

```
GET: /objects/1
```

Example of answer:

```json
{
    "id": 1,
    "name": "Laptop ASUS ZenBook",
    "description": "Ultrafino e leve, com tela de 14 polegadas, processador Intel Core i7, 16GB de RAM e 512GB de SSD.",
    "createdAt": "2024-03-12T19:16:47.966Z",
    "updatedAt": "2024-03-12T19:16:47.966Z"
}
```

### Listando objetos (com paginação)

```
GET: /objects?limit=3&offset=0
```

`Limit` representa o número de objetos por página e `offset` o número de objetos exibidos nas páginas anteriores.

Example of answer:

```json
{
    "objects": [
        {
            "id": 1,
            "name": "Laptop ASUS ZenBook",
            "description": "Ultrafino e leve, com tela de 14 polegadas, processador Intel Core i7, 16GB de RAM e 512GB de SSD.",
            "createdAt": "2024-03-12T19:16:47.966Z",
            "updatedAt": "2024-03-12T19:16:47.966Z"
        },
        {
            "id": 2,
            "name": "Cadeira de Escritório Ergonômica",
            "description": "Cadeira com design ergonômico, ajustável em altura, encosto para cabeça e apoio lombar, ideal para longas horas de trabalho.",
            "createdAt": "2024-03-12T19:16:47.973Z",
            "updatedAt": "2024-03-12T19:16:47.973Z"
        },
        {
            "id": 3,
            "name": "Livro: O Senhor dos Anéis",
            "description": "Obra de fantasia escrita por J.R.R. Tolkien, que narra as aventuras de um grupo de personagens em busca de destruir um poderoso anel.",
            "createdAt": "2024-03-12T19:16:47.975Z",
            "updatedAt": "2024-03-12T19:16:47.975Z"
        }
    ],
    "meta": {
        "hasNext": true,
        "total": 6
    }
}
```

### Criando novos objetos

```
POST: /objects
```

Example of body:

```json
{
    "name": "Novo objeto",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus."
}
```

Example of answer:

```json
{
    "id": 8,
    "name": "Novo objeto",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus.",
    "createdAt": "2024-03-12T23:54:48.118Z",
    "updatedAt": "2024-03-12T23:54:48.118Z"
}
```

### Alterando objetos

```
PUT: /objects/8
```

Example of body:

```json
{
    "name": "Nome novo"
}
```

Example of answer:

```json
{
    "id": 8,
    "name": "Nome novo",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus.",
    "createdAt": "2024-03-12T23:54:48.118Z",
    "updatedAt": "2024-03-12T23:54:48.118Z"
}
```

### Deletando objetos

```
DELETE: /objects/8
```

Example of answer:

```json
{
    "id": 8,
    "name": "Nome novo",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus.",
    "createdAt": "2024-03-12T23:54:48.118Z",
    "updatedAt": "2024-03-12T23:54:48.118Z"
}
```
