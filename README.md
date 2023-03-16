# bb2empresa
Proyecto Empresa para la formación en react

Este proyecto consiste en elaborar una aplicación web en la que se puedan realizar las tareas cotidianas de una empresa. A continuación se detallan algunas de estas funcionaliades.

## Pantalla de inicio
Cuando accedemos a la página, el usuario podrá ver una página donde se le informará que para poder acceder a la total funcionalidad de la página deberá loguearse en el sistema.
Para el login se ha optado por utilizar la plataforma Auth0 que actualmente tiene compatibilidad con cualquier sistema. Una vez logueado aparecerá información del usuario y algunas acciones que puede llevar a cabo.

## Proveedores
Los proveedores se componen de varias pantallas que pasaremos a detallar a continuación
### Listado de proveedores
En esta pantalla se mostrará la información de los proveedores que actualmente se encuentran dados de alta en el sistema. Desde aquí podremos acceder fácilmente a la **creación de un nuevo proveedor**, **ver en detalle la info de un proveedor** y **actualizar un proveedor ya creado**.

### Creación de proveedor
Este formulario permite crear más proveedores en nuestra aplicación. Los campos son obligatorios. Si la operación tiene éxito la aplicación retornará al listado de proveedores.

### Vista detalle del proveedor
En esta vista el usuario podrá ver la información más detallada del proveedor, incluso una lista de los items que actualmente tiene asociados.

### Actualizar Proveedor
Este formulario nos permite actualizar la información de un proveedor
