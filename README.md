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
El endpoint es " /signIn "<br>
En el body pasaremos email y password, que si coinciden con los del usuario. Devuelve token.
<br>
● Endpoint de Registro <br>
Es la ruta " /signUp " <br>
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
Es el endpoint '/users/:id'  <br>
En el authorise le tenemos que pasar el token. <br>
La ruta solo es accesible para usuarios que o bien sean la id del perfil a consultar o nivel admin o superior. <br>
<br>
**Extra points:** <br>
-Roles Administrador / Usuario / Vendedor <br>
Se han creado para ello los distintos niveles de usuario y cada usuario tiene un nivel que le identifica. Por defecto al crearse es 1. <br>
-Endpoints modificar datos de Usuario <br>
El endpoint de cambiar datos de usuario es '/users/:id' <br>
<br>
<br>
## Feature 2 : Gestión Product <br>
<br>
**Requisitos Mínimos:** <br>
● Endpoints añadir, eliminar, modificar producto (vendedor). <br>
● Endpoint muestra all products <br>
● Endpoints productos filtro (más vendidos, precio, título...) <br>
<br>
**Extra points:** <br>
● Endpoint de productos por vendedor. <br>
● Endpoint de productos por categoría. <br>
<br>
