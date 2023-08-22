# Movies

Node.js API for movies

## Before usage:
 - Run `npm i`
 - Put `.env` file in project folder

## Usage:
 Use `npm run start` to start development watch/build
 The API specification for the implementation is available at the link:
 https://documenter.getpostman.com/view/356840/TzkyLeVK

## Docker
 - Pull dockerImage from docherHub
 `docker pull volodymyrpr/movies_service:v1`
 - Run docker in rerminal using command: 
 ` docker run --name movies -p 8000:8050 -e APP_PORT=8050 volodymyrpr/movies_service:v1`


## dev .env file

```
POST=8000
DB_STORAGE=films
```
