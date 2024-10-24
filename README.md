### Considerar
~~~bash
docker-compose up -d
npm run start:dev
~~~

tambien considerar que configure swagger pero no alcance a documentar, pero aca dejo la documentacion en postman https://documenter.getpostman.com/view/21763083/2sAY4rG5vX


### ¿Es necesario crear un endpoint logout?
- Estaria bastante bien, sino es posible que los tokens sigan activos aun cuando la persona no este usando su sesion, esto puede ocacionar problemas de seguridad en caso de que un atacante pueda robar un token de un usuario. Como dato aparte, en este ejemplo como se van a estar eliminando usuarios constantemente, considere hacer validaciones en la base de datos para validar que el usuario siga existiendo antes de poder realizar acciones.


### La funcionalidad “Dar de baja” se puede hacer de varias formas, explica al menos 3 formas que se podría hacer.

1. Eliminacion por Soft Delete, lo que permitiria tener un historial, tambien podria permitir restaurar cuentas que decidan regresar.

2. Eliminacion por Hard Delete, osea se elimina completamente el documento, que es lo que hacemos en este ejemplo con los administradores al ser sencillo y no haber informacion delicada, aparte libera espacio en la base de datos pero tiene la desventaja que se pierde informacion.

3. Procesamiento Asincrono con cola de solicitudes, se hace en segundo plano, no bloquea el hilo principal, tambien podria permitir hacer eliminaciones en horarios de baja actividad, aunque lamentablemente significaria un retraso y tendria una complejidad adicional.