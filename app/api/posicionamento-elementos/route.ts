import { NextResponse } from "next/server";
import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

export async function POST(request: Request) {
  try {
    const { elementos, formatoOrigem, formatosDestino } = await request.json();

    // Validação básica
    if (
      !elementos ||
      !formatoOrigem ||
      !formatosDestino ||
      !Array.isArray(formatosDestino)
    ) {
      return NextResponse.json(
        { error: "Dados inválidos. Verifique os parâmetros enviados." },
        { status: 400 }
      );
    }

    // Construir o prompt para a Anthropic Claude
    const prompt = `
      Analise os seguintes elementos de um formato de marketing digital:
      ${JSON.stringify(elementos, null, 2)}
      
      Formato de origem: ${JSON.stringify(formatoOrigem, null, 2)}
      
      Preciso adaptar esses elementos para os seguintes formatos:
      ${JSON.stringify(formatosDestino, null, 2)}
      
      Para cada formato de destino, sugira o melhor posicionamento dos elementos, 
      respeitando as diretrizes de grid de cada formato. Considere:
      
      1. A hierarquia visual dos elementos
      2. A proporção e tamanho relativo entre os elementos
      3. As dimensões e restrições de cada formato
      4. A legibilidade e experiência do usuário
      
      Retorne um objeto JSON com a seguinte estrutura:
      {
        "sugestoes": [
          {
            "formato": {objeto do formato},
            "elementos": [
              {
                "id": "id do elemento original",
                "tipo": "tipo do elemento",
                "posicao": {
                  "x": número,
                  "y": número
                },
                "dimensoes": {
                  "largura": número,
                  "altura": número
                },
                "propriedades": {
                  // propriedades específicas do elemento, como tamanho de fonte, etc.
                }
              }
            ]
          }
        ]
      }
    `;

    // Chamar a Anthropic Claude
    const { text } = await generateText({
      model: anthropic("claude-3-5-sonnet-20241022"),
      prompt: prompt,
      temperature: 0.7,
      maxTokens: 4000,
    });

    console.log("Resposta da Anthropic Claude:", text);

    // Processar a resposta
    let sugestoes;
    try {
      // Extrair apenas o JSON da resposta
      const jsonMatch =
        text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/\{[\s\S]*\}/);

      const jsonText = jsonMatch ? jsonMatch[1] || jsonMatch[0] : text;
      sugestoes = JSON.parse(jsonText);
    } catch (error) {
      console.error("Erro ao processar resposta da Anthropic Claude:", error);
      console.log("Resposta original:", text);

      return NextResponse.json(
        {
          error: "Erro ao processar resposta da IA",
          rawResponse: text,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(sugestoes);
  } catch (error) {
    console.error("Erro no processamento:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
