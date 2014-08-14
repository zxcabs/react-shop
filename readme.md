## Dockerfile

### Собираем docker image

````
$ sudo docker build -t react-shop .
````

### Запускаем контейне

````
$ sudo docker run -d react-shop
````

По умолчанию запускается на 8080 порту.
Если надо изменить порт, то:

````
$ sudo docker run -d -p <port>:8080 react-shop
````
