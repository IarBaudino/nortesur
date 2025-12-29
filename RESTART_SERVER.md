# Instrucciones para reiniciar el servidor

## Paso 1: Cerrar procesos de Node.js
1. Abre el Administrador de Tareas (Ctrl + Shift + Esc)
2. Busca todos los procesos `node.exe`
3. Selecciónalos y haz clic en "Finalizar tarea"

## Paso 2: Eliminar carpeta .next
1. Ve a la carpeta del proyecto: `E:\Programacion\nortesur`
2. Elimina la carpeta `.next` completamente
   - Si no puedes eliminarla, vuelve al Paso 1 y cierra todos los procesos de Node

## Paso 3: Reiniciar el servidor
Ejecuta en la terminal:
```bash
npm run dev
```

## Si el problema persiste:
1. Cierra completamente VS Code/Cursor
2. Elimina la carpeta `.next`
3. Abre VS Code/Cursor nuevamente
4. Ejecuta `npm run dev`


