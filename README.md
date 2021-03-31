# Reto Final Bootcamp Backend GeeksHubs: E-Commerce "Shop" <br>

Como se ha solicitado, está montado en NodeJs con Express. La base de datos elegida es SQL (MariaDB) usando un container de Docker con docker-compose. <br>

"npm run dev" para arrancar la API <br>


## Feature 1 : Gestión Usuario <br>

**Requisitos Mínimos:** <br><br>
● Validación por Token <br>
Usamos el módulo JWT, concretamente jwt-simple para codificar. <br>
Decodificamos con jwt-decode. <br>
<br>
● Endpoint de Login <br>
El endpoint es -->  POST '/signIn' <br>
En el body pasaremos email y password, que si coinciden con los del usuario. Devuelve token.<br>
<br>
● Endpoint de Registro <br>
Es la ruta -->   POST  '/signUp' <br>
Le pasamos por el body los campos: firstName(varchar), lastName(varchar), email(varchar), password(varchar) y level(integer) <br>
La password la encriptamos y guardamos encriptada en la DB con el módulo Bcrypt. <br>
El level lo usamos para establecer los distintos tipos de usuario: <br>
0 -> Inactive <br>
1 -> User <br>
2 -> Seller <br>
3 -> Administrator <br>
4 -> Superadmin <br>
<br>
Devuelve token cifrado con HS256 y en cuyo payload metemos la 'id de usuario, el 'level' del usuario (para los permisos) además de fecha expedicion y de validez <br>
```
{
  "sub": 178,
  "lev": 3,
  "iat": 1616484090,
  "exp": 1617690090
}
```
● Endpoint de Perfil (Datos de Usuario) <br>
Es el endpoint -->  GET  '/users/:id'  <br>
En el authorise le tenemos que pasar el token. <br>
La ruta solo es accesible para usuarios que o bien sean la id del perfil a consultar o nivel admin o superior. <br>
<br>
**Extra points:** <br>
-Roles Administrador / Usuario / Vendedor <br>
Se han creado para ello los distintos niveles de usuario y cada usuario tiene un nivel que le identifica. Por defecto al crearse es 1. <br>
-Endpoints modificar datos de Usuario <br>
El endpoint de cambiar datos de usuario es -->  PUT  '/users/:id' <br>
<br>
<br>
## Feature 2 : Gestión Product <br><br>
**Requisitos Mínimos:**<br><br>
● Endpoints añadir, eliminar, modificar producto (vendedor). <br><br>
🚀 Endpoint añadir -->  POST  '/products'<br>
El body será del tipo:<br>
```
{
    "name": "Pi 3",
    "brand": "Raspberry",
    "seller": 1,
    "category": 3,
    "price": 45,
    "photo": "https://www.raspberrypi.org/homepage-9df4b/static/532b4c25752c4235d76cc41051baf9ab/16e7d/877fb653-7b43-4931-9cee-977a22571f65_3b%2BAngle%2B2%2Brefresh.jpg",
    "description": "Raspberry Pi version 3 mini-pc"
}
```
💣 Endpoint eliminar --> DELETE '/products/:id'<br>
devuelve: `Deleted product id: ${id}`<br>
<br>
👷 Endpoint modificar producto (vendedor) -->  PUT '/products/:id'<br>
En el body pasaremos las propiedades a modificar.<br>
Necesita recibir token con número de usuario que sea el vendedor de ese producto o tenga nivel ADMIN o SUPERADMIN.<br>
Devuelve el producto modificado con sus nuevas propiedades.<br>

● Endpoint muestra all products <br><br>
Endpoint -->  GET '/products'<br>
<br>

● Endpoints productos filtro (más vendidos, precio, título...) <br><br>
Mostrar un producto por ID -->  GET '/products/:id'<br>
Mostrar por precio -->  GET '/listByPrice'  --> Pasaremos en el body un JSON con min y max, ambos integer. Ej:<br>
```
{
  "min": 30,
  "max": 300
}
```
<br><br>
**Extra Points**<br>
<br>
● Endpoint de productos por vendedor.<br>
Mostrar por vendedor -->  GET '/listBySeller' , en el body le pasaremos la id del vendedor.<br>
<br>
● Endpoint de productos por categoría. <br>
Mostrar todos los productos por categoría -->  GET '/listByCategory/:category'<br>
<br>
<br>
## Feature 3 : Gestión Compras<br>
<br>**Requisitos mínimos:**<br><br>
● Endpoint de añadir compra.<br>
Endpoint -->  POST '/orders' <br>

● Endpoint muestra todas las compras.<br>
Endpoint -->  GET --> '/orders' <br>
<br>
<br>**Extra points:** <br><br>
● Endpoint de compras por usuario. (modo factura)<br>
Endpoint  -->  GET '/ordersByUser' <br>
<br>
<br>**Requisitos Extra:** <br><br>
● Endpoint modificación datos factura.<br>
(modificación hecha por el vendedor).<br>
