#!/bin/bash
# Script para limpiar y reiniciar Next.js

echo "Deteniendo procesos de Node.js..."
taskkill //F //IM node.exe 2>nul || echo "No hay procesos de Node corriendo"

echo "Esperando 2 segundos..."
sleep 2

echo "Eliminando directorio .next..."
rm -rf .next

echo "Eliminando caché de node_modules..."
rm -rf node_modules/.cache

echo "Iniciando servidor de desarrollo..."
npm run dev


