#!/bin/bash
# Script de corrección automática para huhugerman-portal
# Ejecutar en la raíz del proyecto

set -e  # Salir si hay errores

echo "🔧 Iniciando correcciones automáticas..."
echo ""

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: No se encuentra package.json${NC}"
    echo "   Ejecuta este script desde la raíz del proyecto"
    exit 1
fi

echo -e "${GREEN}✓${NC} Directorio del proyecto verificado"

# 2. Backup de archivos originales
echo ""
echo "📦 Creando backups..."
mkdir -p .backups
cp src/lib/ai-service.ts .backups/ai-service.ts.bak 2>/dev/null || true
cp src/lib/services/persistence/submissions.ts .backups/submissions.ts.bak 2>/dev/null || true
cp src/pages/api/submit.ts .backups/submit.ts.bak 2>/dev/null || true
echo -e "${GREEN}✓${NC} Backups creados en .backups/"

# 3. Corregir ai-service.ts
echo ""
echo "🔄 Corrigiendo src/lib/ai-service.ts..."
if [ -f "src/lib/ai-service.ts" ]; then
    sed -i "s|from './services/ai/prompt-builder'|from './ai/prompt-builder'|g" src/lib/ai-service.ts
    echo -e "${GREEN}✓${NC} Importación de prompt-builder corregida"
else
    echo -e "${YELLOW}⚠${NC}  Archivo no encontrado, saltando..."
fi

# 4. Corregir submissions.ts
echo ""
echo "🔄 Corrigiendo src/lib/services/persistence/submissions.ts..."
if [ -f "src/lib/services/persistence/submissions.ts" ]; then
    sed -i "s|from '../../../lib/supabase'|from '../../supabase'|g" src/lib/services/persistence/submissions.ts
    echo -e "${GREEN}✓${NC} Importación de supabase corregida"
else
    echo -e "${YELLOW}⚠${NC}  Archivo no encontrado, saltando..."
fi

# 5. Corregir submit.ts
echo ""
echo "🔄 Corrigiendo src/pages/api/submit.ts..."
if [ -f "src/pages/api/submit.ts" ]; then
    # Corregir imports
    sed -i 's|from "../../lib/domain/schemas/submission.schema"|from "@/lib/domain/schemas/submission.schema"|g' src/pages/api/submit.ts
    sed -i 's|from "../../lib/services/persistence/submissions"|from "@/lib/services/persistence/submissions"|g' src/pages/api/submit.ts
    sed -i 's|from "../../lib/supabase"|from "@/lib/supabase"|g' src/pages/api/submit.ts
    sed -i 's|from "../../lib/ai-service"|from "@/lib/ai-service"|g' src/pages/api/submit.ts
    
    # Corregir respuesta del API (id -> submission_id)
    sed -i 's|id: savedRecord.id,|submission_id: savedRecord.id,|g' src/pages/api/submit.ts
    
    echo -e "${GREEN}✓${NC} Importaciones y respuesta API corregidas"
else
    echo -e "${YELLOW}⚠${NC}  Archivo no encontrado, saltando..."
fi

# 6. Verificar estructura de directorios
echo ""
echo "📁 Verificando estructura de directorios..."
REQUIRED_DIRS=(
    "src/lib/ai"
    "src/lib/domain/schemas"
    "src/lib/services/persistence"
    "src/pages/api"
)

for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✓${NC} $dir existe"
    else
        echo -e "${RED}✗${NC} $dir NO existe"
    fi
done

# 7. Verificar archivos clave
echo ""
echo "📄 Verificando archivos clave..."
REQUIRED_FILES=(
    "src/lib/ai/prompt-builder.ts"
    "src/lib/supabase.ts"
    "src/lib/ai-service.ts"
    "src/pages/api/submit.ts"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file existe"
    else
        echo -e "${RED}✗${NC} $file NO existe"
    fi
done

# 8. Verificar .env
echo ""
echo "🔑 Verificando variables de entorno..."
if [ -f ".env" ]; then
    echo -e "${GREEN}✓${NC} Archivo .env existe"
    
    # Verificar que tenga las variables necesarias
    REQUIRED_VARS=("PUBLIC_SUPABASE_URL" "PUBLIC_SUPABASE_KEY" "SUPABASE_SERVICE_ROLE_KEY" "DEEPSEEK_API_KEY")
    for var in "${REQUIRED_VARS[@]}"; do
        if grep -q "^${var}=" .env; then
            echo -e "${GREEN}✓${NC} $var configurada"
        else
            echo -e "${YELLOW}⚠${NC}  $var NO encontrada en .env"
        fi
    done
else
    echo -e "${YELLOW}⚠${NC}  Archivo .env no existe"
    echo "   Creando plantilla de .env..."
    cat > .env << 'EOF'
# Supabase Configuration
PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
PUBLIC_SUPABASE_KEY=tu-anon-key-aqui
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key-aqui

# DeepSeek AI
DEEPSEEK_API_KEY=tu-deepseek-api-key-aqui
EOF
    echo -e "${GREEN}✓${NC} Plantilla .env creada - EDÍTALA con tus credenciales"
fi

# 9. Verificar TypeScript
echo ""
echo "🔍 Verificando TypeScript..."
if command -v npx &> /dev/null; then
    if npx tsc --noEmit --skipLibCheck 2>/dev/null; then
        echo -e "${GREEN}✓${NC} No hay errores de TypeScript"
    else
        echo -e "${YELLOW}⚠${NC}  Hay errores de TypeScript (revisar manualmente)"
    fi
else
    echo -e "${YELLOW}⚠${NC}  npx no disponible, saltando verificación TS"
fi

# 10. Resumen final
echo ""
echo "=========================================="
echo -e "${GREEN}✅ CORRECCIONES COMPLETADAS${NC}"
echo "=========================================="
echo ""
echo "📋 PRÓXIMOS PASOS:"
echo ""
echo "1. Edita el archivo .env con tus credenciales reales"
echo "2. Ejecuta: npm install"
echo "3. Ejecuta: npm run dev"
echo "4. Prueba el endpoint con curl:"
echo '   curl -X POST http://localhost:4321/api/submit \'
echo '     -H "Content-Type: application/json" \'
echo '     -d '"'"'{"firstName":"Test","lastName":"User","level":"aleman1","week":"w01","content":"Hallo","userId":"550e8400-e29b-41d4-a716-446655440000"}'"'"
echo ""
echo "5. Si todo funciona, ejecuta: npm run build"
echo "6. Deploy con: vercel --prod"
echo ""
echo -e "${YELLOW}💡 TIP:${NC} Los backups están en .backups/ por si necesitas revertir"
echo ""
