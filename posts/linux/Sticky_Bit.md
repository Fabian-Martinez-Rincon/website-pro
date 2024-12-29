---
title: 'Sticky Bit'
description: ''
tags: ["ACL", "Permisos", "Linux"]
categories: [Linux]
titleIcon: '/linux.png'
---


- [Material 1](https://www.fpgenred.es/GNU-Linux/el_bit_sticky.html)
- [Material 2](https://keepcoding.io/blog/que-es-el-sticky-bit-y-como-configurarlo/)

El **Sticky Bit** es un mecanismo de control de acceso en sistemas de archivos Unix y Linux que se utiliza para gestionar los permisos de eliminación y renombrado de archivos en un directorio. Aquí se presenta una explicación completamente teórica del Sticky Bit, abarcando su propósito, funcionamiento, representación y ejemplos de uso.

### Propósito del Sticky Bit

El objetivo principal del Sticky Bit es mejorar la seguridad y el control en directorios compartidos. Cuando se establece el Sticky Bit en un directorio, se restringe la capacidad de los usuarios para eliminar o renombrar archivos en ese directorio a solo los propietarios de esos archivos, el propietario del directorio o el usuario root. Esto es especialmente útil en directorios donde muchos usuarios tienen permisos de escritura, como `/tmp`.

### Funcionamiento del Sticky Bit

#### 1. **Permisos de Archivos y Directorios**

En sistemas Unix y Linux, cada archivo y directorio tiene un conjunto de permisos que determinan qué operaciones pueden realizar el propietario del archivo, el grupo propietario y otros usuarios (world). Los permisos típicos son lectura (r), escritura (w) y ejecución (x).

#### 2. **Permisos Especiales**

Además de estos permisos básicos, existen permisos especiales que incluyen el Setuid, Setgid y Sticky Bit. El Sticky Bit, cuando se establece en un directorio, modifica el comportamiento de los permisos de escritura.

#### 3. **Restricciones de Eliminación y Renombrado**

- **Sin Sticky Bit:** En un directorio sin el Sticky Bit, cualquier usuario con permisos de escritura en ese directorio puede eliminar o renombrar cualquier archivo, independientemente de quién sea el propietario.
- **Con Sticky Bit:** En un directorio con el Sticky Bit activado, solo el propietario del archivo, el propietario del directorio o el usuario root pueden eliminar o renombrar archivos. Esto evita que los usuarios borren o cambien archivos de otros usuarios inadvertidamente o maliciosamente.

### Representación del Sticky Bit

#### 1. **Notación Simbólica**

En la salida del comando `ls -l`, los permisos de archivos y directorios se muestran en formato simbólico. Cuando el Sticky Bit está activado en un directorio, se representa con una `t` en el lugar de los permisos de ejecución para "otros" (world).

Ejemplo: `drwxrwxrwt`
- `d`: indica que es un directorio.
- `rwxrwxrw`: permisos para propietario, grupo y otros.
- `t`: Sticky Bit activo para "otros".

#### 2. **Notación Octal**

En la notación octal de permisos, el Sticky Bit se representa con un 1 en el cuarto dígito (más significativo) de un número de cuatro dígitos.

Ejemplo: `1777`
- `1`: Sticky Bit activo.
- `777`: permisos de lectura, escritura y ejecución para todos.

### Ejemplos Teóricos de Uso

#### 1. **Directorio `/tmp`**

El directorio `/tmp` es un espacio temporal utilizado por todos los usuarios del sistema. Para prevenir que los usuarios borren o modifiquen archivos de otros usuarios, el Sticky Bit está activado.

Permisos típicos de `/tmp`: `drwxrwxrwt`
- Esto asegura que solo los propietarios de los archivos y el usuario root puedan eliminar o renombrar archivos en `/tmp`.

#### 2. **Directorio Compartido**

Supongamos un directorio `/shared` utilizado por múltiples usuarios para colaborar. Sin el Sticky Bit, cualquier usuario con permisos de escritura puede eliminar archivos de otros usuarios.

Activar el Sticky Bit en `/shared`:
- Permisos antes: `drwxrwxrwx`
- Permisos después: `drwxrwxrwt`

Esto garantiza que los archivos dentro de `/shared` solo puedan ser eliminados o renombrados por sus propietarios, el propietario del directorio o el usuario root.

### Conclusión

El Sticky Bit es una característica de control de acceso crucial para la gestión de archivos en directorios compartidos en sistemas Unix y Linux. Su propósito es restringir la eliminación y renombrado de archivos, proporcionando una capa adicional de seguridad y control. Representado simbólicamente como una `t` y en notación octal como un `1` en el cuarto dígito, el Sticky Bit asegura que solo los propietarios de los archivos y el usuario root puedan realizar modificaciones críticas en directorios con acceso de escritura para múltiples usuarios.

### Ejemplo Practico

![image](https://github.com/user-attachments/assets/e296c068-da22-4549-ac9f-198c47e9f9d7)

Resultados del sticky bit en un directorio compartido.

![image](https://github.com/user-attachments/assets/462425a1-13c6-4b93-8822-73266b3ece52)

### Mas información

El Sticky Bit, cuando se aplica a un directorio, tiene un impacto específico en el comportamiento del sistema de archivos a nivel del kernel. Aquí te explico cómo funciona el Sticky Bit a bajo nivel:

### Estructura del Sistema de Archivos

En sistemas Unix y Linux, los archivos y directorios están organizados en un sistema de archivos que el kernel gestiona. Cada archivo y directorio está representado por una estructura llamada **inode** que contiene metadatos sobre el archivo o directorio, incluyendo sus permisos y atributos especiales como el Sticky Bit.

### Inodes y Permisos

- **Inode:** Cada archivo o directorio tiene un inode que almacena información sobre el archivo, como su tamaño, propietario, permisos y atributos especiales.
- **Permisos:** Los permisos de un archivo o directorio son almacenados en su inode y determinan qué usuarios pueden leer, escribir o ejecutar el archivo.

### Atributos Especiales en Inodes

Los atributos especiales como el Sticky Bit se almacenan en campos específicos del inode. Cuando el Sticky Bit está establecido, se indica en el inode con un bit específico.

### Comportamiento del Kernel con el Sticky Bit

#### 1. **Verificación de Permisos**

Cuando un usuario intenta eliminar o renombrar un archivo en un directorio con el Sticky Bit, el kernel realiza las siguientes verificaciones:

- **Permisos del Directorio:** El kernel verifica que el usuario tiene permisos de escritura en el directorio.
- **Sticky Bit Activo:** Si el Sticky Bit está activo en el directorio, el kernel procede con verificaciones adicionales.

#### 2. **Verificaciones Adicionales del Sticky Bit**

Si el Sticky Bit está activo, el kernel realiza verificaciones adicionales para determinar si el usuario tiene permisos para eliminar o renombrar el archivo:

- **Propietario del Archivo:** El kernel compara el ID del usuario que realiza la operación con el ID del propietario del archivo.
- **Propietario del Directorio:** El kernel también compara el ID del usuario con el ID del propietario del directorio.
- **Privilegios de Root:** Finalmente, el kernel verifica si el usuario es el superusuario (root).

#### 3. **Decisión de Permisos**

Basado en las verificaciones, el kernel decide si permite o deniega la operación:

- **Permitir la Operación:** Si el usuario es el propietario del archivo, el propietario del directorio, o el usuario root, el kernel permite la operación.
- **Denegar la Operación:** Si el usuario no cumple con ninguna de las condiciones anteriores, el kernel deniega la operación de eliminación o renombrado.

### Flujo de Ejecución

Aquí está el flujo de ejecución detallado cuando se intenta eliminar o renombrar un archivo en un directorio con el Sticky Bit:

1. **Solicitud de Operación:** El usuario solicita eliminar o renombrar un archivo.
2. **Verificación de Permisos del Directorio:** El kernel verifica que el usuario tiene permisos de escritura en el directorio.
3. **Comprobación del Sticky Bit:** El kernel verifica si el Sticky Bit está activo en el directorio.
4. **Verificación del Propietario del Archivo:** El kernel compara el ID del usuario con el ID del propietario del archivo.
5. **Verificación del Propietario del Directorio:** El kernel compara el ID del usuario con el ID del propietario del directorio.
6. **Verificación de Privilegios de Root:** El kernel verifica si el usuario es el superusuario (root).
7. **Decisión de Permisos:**
   - Si alguna de las verificaciones de propiedad o privilegios es positiva, el kernel permite la operación.
   - Si ninguna verificación es positiva, el kernel deniega la operación.

### Ejemplo de Código en C (Pseudocódigo)

Aquí tienes un pseudocódigo simplificado para ilustrar el proceso a nivel del kernel:

```c
int can_delete_or_rename(uid_t user_id, inode_t *file_inode, inode_t *dir_inode) {
    // Verificar permisos de escritura en el directorio
    if (!has_write_permission(user_id, dir_inode)) {
        return 0; // Denegar operación
    }
    
    // Verificar si el Sticky Bit está activo en el directorio
    if (dir_inode->mode & STICKY_BIT) {
        // Verificar si el usuario es el propietario del archivo
        if (file_inode->uid == user_id) {
            return 1; // Permitir operación
        }
        // Verificar si el usuario es el propietario del directorio
        if (dir_inode->uid == user_id) {
            return 1; // Permitir operación
        }
        // Verificar si el usuario es root
        if (user_id == 0) { // UID 0 es root
            return 1; // Permitir operación
        }
        // Ninguna verificación positiva, denegar operación
        return 0;
    }
    
    // Si el Sticky Bit no está activo, permitir operación basada en permisos estándar
    return has_standard_permission(user_id, file_inode);
}
```

### Conclusión

El Sticky Bit es una característica de control de acceso a nivel del sistema de archivos en Unix y Linux que se utiliza principalmente en directorios para restringir la eliminación y renombrado de archivos. A nivel del kernel, el Sticky Bit introduce verificaciones adicionales para asegurar que solo los propietarios de los archivos, el propietario del directorio o el superusuario (root) puedan eliminar o renombrar archivos en un directorio con el Sticky Bit activado. Esto proporciona una capa adicional de seguridad en entornos donde múltiples usuarios comparten directorios.