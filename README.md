# AppRendo
Aplicación-servicio transversal para desarrollo de software accesible

Esta aplicación todavía se encuentra en desarrollo, será terminada para fin de año.
Hecha por el grupo de desarrollo ParadigmaVisual 2

#### ¿Por qué este diseño?

Elegimos este diseño debido a que se asemeja a lo que hemos estado trabajando en nuestras prácticas de empresa. Preferimos este diseño frente a otro que utilizase dos repositorios distintos para el backend y el frontend debido a su simplicidad y facilidad para configurarlo. Lo consideramos adecuado ya que no es un proyecto de gran envergadura.

* **Backend**: 

  Se ha seguido la estructura que genera el propio django con el comando: `django-admin startproject "nombre"`. Se crearán así los siguientes archivos que serán cruciales: settings.py, urls.py, asgi.py, wsgi.py.
      
  A partir de esos archivos generados automáticamente, cada vez que queramos crear una nueva aplicación (explicación más abajo) usaremos el comando: python3 manage.py startapp "nombre", donde django generará los archivos necesarios para que pasemos a rellenarlos.
  Para la ejecución del proyecto se utilizará: python manage.py runserver
  
  Para información adicionada, consultar: https://docs.djangoproject.com/en/4.1/intro/
  
* **Frontend**:

  Se ha decidido utilizar la herramienta `create-react-app` para inicializar el proyecto en el caso web. Para la app móvil se ha inicializado el proyecto utilizando `React Native CLI`. Estas dos herramientas generan una estructura de carpetas por defecto que hemos decidido seguir por agilizar las tareas. 

  Para crear interfaces con react se hace uso de "componentes" y "hooks". Los componentes son piezas sencillas de una interfaz (por ejemplo: la barra de navegación, un formulario...), estos se pueden componer entre ellos para formar componentes más complejos. Los hooks representan una funcionalidad de un componente, se suele utilizar cuando cierta funcionalidad se puede reutilizar (por ejemplo, obtener las tareas del backend es una funcionalidad que se puede reutilizar bastante, pues se crea un hook para eso).

#### Distribución de las carpetas

- **Back/**: contiene todo el código referente al backend. Se decide modularizar en apps de django en las cuales se dividen las funcionalidades de tal forma que sean lo más indepedientes posibles pudiendo incluso llegar a reutilizar dicha app en otro proyecto.
    
    - **accounts/**: contiene toda la lógica para gestionar usuarios
    - **main/**: principalmente contiene las configuraciones del backend
    - **media/**: contiene los ficheros media (imágenes, vídeos, etc.) subidos a la base de datos
    - **menus/**: contiene la lógica para crear, editar y eliminar menus
    - **tasks/**: contiene la lógica para crear, editar y eliminar tareas como, por ejemplo, las comandas o tareas normales
    - **manage.py**: permite iniciar el servidor y crear aplicaciones (menu y tasks son ejemplos de aplicaciones), entre otras funcionalidades
   
   * El patrón de diseño utilizado es Modelo Vista Controlador desarrollado en Django Rest Framework.
   
- **Front/**: contiene todo el código referente al frontend, tanto la app móvil como la web del administrador
    - **apprendoMovil/**: contiene la aplicación de React-Native para dispositivos móviles
        - **android/** e **ios/**: contiene código nativo específico para esas plataformas (no se ha utilizado en este proyecto pero incluye archivos necesarios para que la app funcione)
        - **assets/fonts/**: contiene las fuentes que vayamos a usar en la app. Después de añadir fuentes a esta carpeta es necesario ejecutar el comando: `npx react-native-asset`
        - **src/**: contiene el código Typescript de la aplicación.
          - **common/**: contiene código común a toda la app (constantes y funciones de uso general)
              - **hooks/**: contiene los custom hooks que hemos implementado
          - **components/**: incluye las carpetas de cada uno de los componentes usados. Dentro de cada carpeta del componente encontramos un `index.tsx` y un `styles.ts` que definen el componente en sí y sus estilos.
          - **screens/**: incluye los componentes que se consideran pantallas de la aplicación. La estructura interna de cada carpeta es igual que la de los componentes.
        - **resto de ficheros**: incluyen archivos de configuración, de dependencias así como el archivo principal que se ejecuta `App.tsx` e `index.js`
    - **web/**: contiene la aplicación de React para los administradores (web)
        - **public/**: contiene los archivos finales, la carpeta que se despliega en un servidor web.
        - **src/**:
            - **assets/**: incluye las imágenes y demás archivos multimedia necesarios
            - **common/**: archivos de constantes y de declaraciones de tipos usados a lo largo de la app web
            - **components/**: incluye las carpetas de cada uno de los componentes usados. Dentro de cada carpeta del componente encontramos un `index.tsx` y un `style.css` que definen el componente en sí y sus estilos.
            - **hooks/**: custom hooks que hemos implementado
            - **pages/**: incluye los componentes que hemos considerado pantallas de la aplicación
            - **resto de ficheros**: archivos css globales y archivos principales de ejecución `App.tsx` e `index.tsx` 
        - **resto de ficheros**: de configuración y de dependencias.
