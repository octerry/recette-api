
# Recette API

API based on TheMealDB to access to more than 600 receipes smoothly with filter parametters and statistics


## API Reference

#### Get all meals

```http
  GET /api/meals/${page}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page` | `int` ( 0 -> 30 ) | The number of the page to fetch |

#### Get meals by filters

```http
  GET /api/filter/${page}?${param}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `char`      | `string` ( 1 character only ) | First character of the items to fetch |
| `category`      | `string` | Category of the items to fetch |
| `country`      | `string` | Country's name of the items to fetch |

#### Get single meal

```http
  GET /api/singlemeal?${param}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | Id of the item to fetch |
| `name`      | `string` | Name of the items to fetch |
| `random`      | is activated when present | Fetch a random meal |

#### Get statistics

```http
  GET /api/stats?${param}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `category`      | is activated when present | Shows the category section |
| `countries`      | is activated when present | Shows the countries section |
| `ingredients`      | is activated when present | Shows the ingredients section |
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT:3000` ( I use 3000 but you can chose what you want )
## Run Locally

Clone the project

```bash
  git clone https://github.com/octerry/recette-api
```

Go to the project directory

```bash
  cd recette-api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Use of AI

#### AI was used to solve 2 errors :
- error in function that remove `null`, `""` and `" "` from JavaScript objects
- error in JSON fetch for the /health route
## Documentation

#### If you want to dig deeper

```
/ src
    / routes <-- Where routes after /api goes 
        filter.routes.js
        meal.routes.js
        singemeal.routes.js
        stats.routes.js
    
    / services <-- Where the TheMealDB API is fetch and stored
        meal-db.service.js
    
    app.js <-- Where the request goes if there's no error

server.js <-- Where the request firest goes and is being handle
```

#### meal-db.service.js functions

`getAll(url, page)` -> Return a list from the API

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `url`      | `string` | **Required**. current URL ( or '*' to get the full API) |
| `page`    | `int` ( 0 -> 30 ) | showed raw page |

`getBy(type, input)` -> Return a filtered list from the API

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `type`      | `"char"`, `"category"` or `"country"` | **Required**. type to filter |
| `input`    | `any` | input used to filter by it |

`getItemBy(type, input)` -> Return a filtered (or not) single item from the API

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `type`      | `"random"`, `"id"` or `"name"` | type to filter |
| `input`    | `any` | input used to filter by it |