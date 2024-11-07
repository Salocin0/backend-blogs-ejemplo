# Qué significa que una API es RESTful (Arquitectura)

Cuando se dice que una API es **RESTful**, significa que está diseñada con un estilo arquitectónico para la comunicación entre sistemas en la web. Una API RESTful usa estos principios para permitir que diferentes aplicaciones puedan interactuar con recursos de manera consistente y estructurada.

## Principios Clave de una API RESTful

1. **Recursos Identificables por URL**
   - En una API RESTful, cada recurso tiene una URL  única
     - `/usuarios` para un listado de usuarios 
     - `/usuarios/1` para un usuario específico

    Los **recursos** (usuarios, productos, etc.) se exponen a través de estas URLs o "endpoints".

2. **Uso de Métodos HTTP**
   - RESTful se basa en los métodos HTTP para operar sobre los recursos:
     - `GET` para leer o recuperar datos.
     - `POST` para crear nuevos recursos.
     - `PUT` o `PATCH` para actualizar recursos existentes.
     - `DELETE` para eliminar recursos.

3. **Stateless (Sin Estado)**
   - Cada solicitud HTTP de un cliente a un servidor es **independiente**. Esto significa que el servidor no almacena el estado de la sesión entre solicitudes.
   - Toda la información necesaria para procesar una solicitud debe estar contenida en la propia solicitud.

4. **Representaciones de Recursos**
   - JSON 
   - XML
   - HTML

   JSON es el formato más común para APIs RESTful en la actualidad.


5. **Manejo de Códigos de Estado HTTP**
   - Las APIs RESTful usan los códigos de estado HTTP para indicar el resultado de una solicitud, como:
     - `200 OK` para éxito.
     - `201 Created` para creación exitosa.
     - `400 Bad Request` para errores en la solicitud del cliente.
     - `404 Not Found` si el recurso no se encuentra.
     - `500 Internal Server Error` para errores en el servidor.


## Ejemplo de API RESTful

Supongamos una API RESTful para gestionar usuarios:

- `GET /usuarios` — Obtiene una lista de usuarios.
- `GET /usuarios/1` — Obtiene los detalles del usuario con ID 1.
- `POST /usuarios` — Crea un nuevo usuario.
- `PUT /usuarios/1` — Actualiza el usuario con ID 1.
- `DELETE /usuarios/1` — Elimina el usuario con ID 1.


ctrl + k -> v