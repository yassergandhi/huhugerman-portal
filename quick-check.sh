#!/bin/bash
# Script de verificación rápida y testing
# Para: huhugerman-portal

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo ""
echo "🚀 VERIFICACIÓN RÁPIDA - huhugerman-portal"
echo "==========================================="
echo ""

# Función para verificar comando
check_command() {
    if command -v $1 &> /dev/null; then
        echo -e "${GREEN}✓${NC} $1 instalado"
        return 0
    else
        echo -e "${RED}✗${NC} $1 NO instalado"
        return 1
    fi
}

# 1. Verificar herramientas necesarias
echo "📦 Verificando herramientas..."
check_command node
check_command npm
check_command curl
echo ""

# 2. Verificar archivos del proyecto
echo "📁 Verificando estructura del proyecto..."
FILES_TO_CHECK=(
    "package.json"
    "tsconfig.json"
    "astro.config.mjs"
    ".env"
    "src/lib/ai-service.ts"
    "src/lib/ai/prompt-builder.ts"
    "src/lib/supabase.ts"
    "src/pages/api/submit.ts"
    "src/lib/services/persistence/submissions.ts"
)

for file in "${FILES_TO_CHECK[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file"
    else
        echo -e "${RED}✗${NC} $file (FALTA)"
    fi
done
echo ""

# 3. Verificar variables de entorno
echo "🔑 Verificando variables de entorno..."
if [ -f ".env" ]; then
    VARS=("PUBLIC_SUPABASE_URL" "PUBLIC_SUPABASE_KEY" "SUPABASE_SERVICE_ROLE_KEY" "DEEPSEEK_API_KEY")
    for var in "${VARS[@]}"; do
        if grep -q "^${var}=" .env && ! grep -q "^${var}=tu-" .env && ! grep -q "^${var}=$" .env; then
            echo -e "${GREEN}✓${NC} $var configurada"
        else
            echo -e "${YELLOW}⚠${NC}  $var no configurada o con valor placeholder"
        fi
    done
else
    echo -e "${RED}✗${NC} Archivo .env no existe"
fi
echo ""

# 4. Verificar importaciones en archivos clave
echo "🔍 Verificando importaciones..."

# ai-service.ts
if grep -q "from './ai/prompt-builder'" src/lib/ai-service.ts 2>/dev/null; then
    echo -e "${GREEN}✓${NC} ai-service.ts - importación correcta"
else
    echo -e "${RED}✗${NC} ai-service.ts - importación INCORRECTA"
fi

# submissions.ts
if grep -q "from '../../supabase'" src/lib/services/persistence/submissions.ts 2>/dev/null; then
    echo -e "${GREEN}✓${NC} submissions.ts - importación correcta"
else
    echo -e "${RED}✗${NC} submissions.ts - importación INCORRECTA"
fi

# submit.ts - verificar múltiples imports
if grep -q 'from "@/lib' src/pages/api/submit.ts 2>/dev/null; then
    echo -e "${GREEN}✓${NC} submit.ts - usando alias @/"
else
    echo -e "${YELLOW}⚠${NC}  submit.ts - podría necesitar alias @/"
fi

# Verificar respuesta API
if grep -q "submission_id: savedRecord.id" src/pages/api/submit.ts 2>/dev/null; then
    echo -e "${GREEN}✓${NC} submit.ts - respuesta con submission_id correcta"
else
    echo -e "${RED}✗${NC} submit.ts - respuesta podría tener 'id' en lugar de 'submission_id'"
fi
echo ""

# 5. Verificar dependencias instaladas
echo "📚 Verificando dependencias npm..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} node_modules existe"
    
    DEPS=("astro" "zod" "openai" "@supabase/supabase-js")
    for dep in "${DEPS[@]}"; do
        if [ -d "node_modules/$dep" ]; then
            echo -e "${GREEN}✓${NC} $dep instalado"
        else
            echo -e "${RED}✗${NC} $dep NO instalado"
        fi
    done
else
    echo -e "${RED}✗${NC} node_modules NO existe - ejecuta: npm install"
fi
echo ""

# 6. Test TypeScript (si está disponible)
echo "🔧 Verificando TypeScript..."
if command -v npx &> /dev/null; then
    if npx tsc --noEmit --skipLibCheck 2>&1 | grep -q "error TS"; then
        echo -e "${RED}✗${NC} Hay errores de TypeScript"
        echo "   Ejecuta: npx tsc --noEmit para ver detalles"
    else
        echo -e "${GREEN}✓${NC} Sin errores de TypeScript"
    fi
else
    echo -e "${YELLOW}⚠${NC}  npx no disponible"
fi
echo ""

# 7. Sugerencias de comandos
echo "=========================================="
echo -e "${BLUE}📋 PRÓXIMOS PASOS SUGERIDOS${NC}"
echo "=========================================="
echo ""

# Determinar qué hacer basado en el estado
NEEDS_INSTALL=false
NEEDS_ENV=false
NEEDS_FIX=false

if [ ! -d "node_modules" ]; then
    NEEDS_INSTALL=true
fi

if [ ! -f ".env" ] || grep -q "tu-proyecto.supabase.co" .env 2>/dev/null; then
    NEEDS_ENV=true
fi

if ! grep -q "from './ai/prompt-builder'" src/lib/ai-service.ts 2>/dev/null; then
    NEEDS_FIX=true
fi

if [ "$NEEDS_FIX" = true ]; then
    echo -e "${YELLOW}1.${NC} Corregir importaciones:"
    echo "   bash fix-imports.sh"
    echo ""
fi

if [ "$NEEDS_ENV" = true ]; then
    echo -e "${YELLOW}2.${NC} Configurar variables de entorno:"
    echo "   Edita .env con tus credenciales reales"
    echo ""
fi

if [ "$NEEDS_INSTALL" = true ]; then
    echo -e "${YELLOW}3.${NC} Instalar dependencias:"
    echo "   npm install"
    echo ""
fi

echo -e "${BLUE}4.${NC} Iniciar servidor de desarrollo:"
echo "   npm run dev"
echo ""

echo -e "${BLUE}5.${NC} Ejecutar tests:"
echo "   npx vitest run"
echo ""

echo -e "${BLUE}6.${NC} Test manual del API:"
echo '   curl -X POST http://localhost:4321/api/submit \'
echo '     -H "Content-Type: application/json" \'
echo '     -d '"'"'{"firstName":"Test","lastName":"User","level":"aleman1","week":"w01","content":"Hallo","userId":"550e8400-e29b-41d4-a716-446655440000"}'"'"
echo ""

echo -e "${BLUE}7.${NC} Build para producción:"
echo "   npm run build"
echo ""

echo -e "${BLUE}8.${NC} Deploy a Vercel:"
echo "   vercel --prod"
echo ""

# Resumen final
echo "=========================================="
echo -e "${GREEN}✅ VERIFICACIÓN COMPLETADA${NC}"
echo "=========================================="
echo ""

# Contador de problemas
PROBLEMS=0
if [ "$NEEDS_FIX" = true ]; then ((PROBLEMS++)); fi
if [ "$NEEDS_ENV" = true ]; then ((PROBLEMS++)); fi
if [ "$NEEDS_INSTALL" = true ]; then ((PROBLEMS++)); fi

if [ $PROBLEMS -eq 0 ]; then
    echo -e "${GREEN}Todo listo para continuar 🚀${NC}"
else
    echo -e "${YELLOW}Se encontraron $PROBLEMS problema(s) que requieren atención ⚠️${NC}"
fi
echo ""

# Ofrecer comandos rápidos
echo "💡 COMANDOS RÁPIDOS:"
echo ""
echo "   ./quick-check.sh          # Ejecutar esta verificación"
echo "   ./fix-imports.sh          # Corregir importaciones"
echo "   npm install               # Instalar dependencias"
echo "   npm run dev               # Servidor desarrollo"
echo "   npm run build             # Build producción"
echo "   npx vitest run            # Ejecutar tests"
echo ""
