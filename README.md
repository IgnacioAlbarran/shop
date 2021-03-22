# Reto Final Bootcamp Backend GeeksHubs: E-Commerce "Shop"

Como se ha solicitado, está montado en NodeJs con Express. La base de datos elegida es SQL (MariaDB) usando un container de Docker con docker-compose.

"npm run dev" para arrancar la API


## Feature 1 : Gestión Usuario

Requisitos Mínimos:
● Validación por Token <br>
Usamos el módulo JWT, concretamente jwt-simple para codificar. <br>
Decodificamos con jwt-decode. <br>
<br>
● Endpoint de Login <br>
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
● Endpoint de Perfil (Datos de Usuario) <br>
<br>
Extra points: <br>
-Roles Administrador / Usuario / Vendedor <br>
-Endpoints modificar datos de Usuario <br>
