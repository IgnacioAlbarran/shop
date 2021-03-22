# Reto Final Bootcamp Backend GeeksHubs: E-Commerce "Shop"

Como se ha solicitado, está montado en NodeJs con Express. La base de datos elegida es SQL (MariaDB) usando un container de Docker con docker-compose.

"npm run dev" para arrancar la API


## Feature 1 : Gestión Usuario

Requisitos Mínimos:
● Validación por Token
Usamos el módulo JWT, concretamente jwt-simple para codificar.
Decodificamos con jwt-decode.

● Endpoint de Login
● Endpoint de Registro
Es la ruta " /signUp "
Le pasamos por el body los campos: firstName(varchar), lastName(varchar), email(varchar), password(varchar) y level(integer)
La password la encriptamos y guardamos encriptada en la DB con el módulo Bcrypt.
El level lo usamos para establecer los distintos tipos de usuario:
0 -> Inactive
1 -> User
2 -> Seller
3 -> Administrator
4 -> Superadmin

● Endpoint de Perfil (Datos de Usuario)

Extra points:
-Roles Administrador / Usuario / Vendedor
-Endpoints modificar datos de Usuario
