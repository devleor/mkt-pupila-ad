# Configuração de APIs

## Anthropic Claude (Atual)

O projeto está configurado para usar o **Claude 3.5 Sonnet** da Anthropic.

### Configuração da Variável de Ambiente

1. **Obtenha sua chave API:**
   - Acesse: https://console.anthropic.com/
   - Crie uma conta ou faça login
   - Gere uma nova chave API

2. **Para desenvolvimento local:**
   ```bash
   # Crie um arquivo .env.local na raiz do projeto
   echo "ANTHROPIC_API_KEY=sua_chave_aqui" > .env.local
   ```

3. **Para produção (Vercel):**
   - Acesse o dashboard do Vercel
   - Vá em Settings > Environment Variables
   - Adicione: `ANTHROPIC_API_KEY` com sua chave

### Modelo Utilizado

- **Modelo:** `claude-3-5-sonnet-20241022`
- **Capacidades:** Análise de posicionamento de elementos visuais
- **Temperatura:** 0.7 (balanceado entre criatividade e consistência)

## OpenAI (Alternativa)

Se preferir usar a OpenAI, você pode alterar o código:

1. **Instalar dependência:**
   ```bash
   pnpm add @ai-sdk/openai
   ```

2. **Modificar o arquivo:** `app/api/posicionamento-elementos/route.ts`
   ```typescript
   import { openai } from "@ai-sdk/openai";
   
   // Na chamada da API:
   model: openai("gpt-4o"),
   ```

3. **Configurar variável:**
   ```bash
   OPENAI_API_KEY=sua_chave_openai_aqui
   ```

## Comparação de Custos

| Provedor | Modelo | Custo por 1M tokens |
|----------|--------|---------------------|
| Anthropic | Claude 3.5 Sonnet | $3.00 |
| OpenAI | GPT-4o | $5.00 |

## Segurança

- ✅ Nunca commite chaves API no repositório
- ✅ Use variáveis de ambiente
- ✅ Configure `.env.local` para desenvolvimento
- ✅ Configure no dashboard do Vercel para produção 