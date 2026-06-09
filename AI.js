/**
 *  AI related functions
 * 
 *  Author: Fernando Costa de Almeida
 *  LastM : 08/06/2026
 * 
 * */

const WIDTH = 800;
const HEIGHT = 800;

const SUCCESS_RESPONSE = "success";
const ERROR_RESPONSE = "error";

function analyze(range, type, cacheKey) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const values = sheet.getRange(range).getValues();

  const data = values.flat().join("\n");
  const question = readValue('Analisar com Inteligencia Artificial', 'Questao (opcional)\n\n(deixe vazio para uma analise completa):');

  if (question == null) {
    return;
  }

  let prompt = buildPrompt(data, type, question);

  // debug("Prompt is : " + prompt);

  showProgressDialog(getMessage("AI_ANALYSING"));

  let response = null;

  if (question) {
    // Do not catch custom queries
    response = ai(prompt);
  } else {
    let cachedResponse = getFromCache(cacheKey);

    if (cachedResponse != null) {
      response = JSON.parse(cachedResponse);
      debug("Using cached response with status : " + response.status);
    } else {
      response = ai(prompt);
      debug("AI service response : " + response.status);
      response?.status == SUCCESS_RESPONSE && addToCache(cacheKey, JSON.stringify(response));
    }
  }

  closeProgressDialog();

  if (response?.status != SUCCESS_RESPONSE) {
    showErrorDialog(response?.data);
  } else {
    showDialog(getMessage("AI_ANALYSING"), shouldMask() ? maskText(response?.data) : response?.data, WIDTH, HEIGHT);
  }
}

function analyzeFii() {
  const lastRow = getNumberOfFiis() + 1;

  analyze("A1:S" + lastRow, "fundos imobiliarios", "FII_AI");
}

function analyzeBrStock() {
  const lastRow = getNumberOfLargeCaps() + getNumberOfSmallCaps() + 3;

  analyze("A1:S" + lastRow, "acoes", "STOCK_AI");
}

function analyzeNonBrStock() {
  const lastRow = getNumberOfIntStocks() + 1;

  analyze("A1:S" + lastRow, "bdrs", "BDR_AI");
}

function analyzeCrypto() {
  const lastRow = getNumberOfCrypto() + 1;

  analyze("A1:L" + lastRow, "crypto moedas", "CRYPTO_AI");
}

function ai(prompt) {
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=" + API_KEY;

  const payload = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.7
    }
  };

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: false
  };

  try {
    const apiResponse = UrlFetchApp.fetch(url, options);
    const data = JSON.parse(apiResponse.getContentText());

    const response = { status: SUCCESS_RESPONSE, data: extractText(data) };

    debug("Response from AI service is : " + response);

    return response;
  } catch (e) {
    Logger.log(getMessage("AI_ERROR_MESSAGE") + e.message);
    return { status: ERROR_RESPONSE, data : e.message, error: e.message };
  }
}

function extractText(data) {
  return data.candidates[0].content.parts
    .map(p => p.text || "")
    .join("")
    .trim();
}

function buildPrompt(data, type, question) {
  let persona = `
    Voce é um analista financeiro da empresa AI Analysis.
    
    Sua funcao é analisar uma carteira de investimentos composta por ${type}.
  `;

  let composition = `
    Nao inclua nada alem do html descrito acima na resposta.
    Inclua um botao para imprimir o relatorio no final.
    
    Composicao: ${data}
  `;

  if (question) {
    return `
    ${persona}

    Responda a seguinte pergunta com um html estruturado em HTML5 com estilização moderna via Tailwind CSS (através de CDN, dispensando arquivos externos) e um visual branco e light.

    Pergunta: ${question}

    ${composition}
    `;
  }

  return `
    ${persona}

    Forneca um relatorio estruturado em HTML5 com estilização moderna via Tailwind CSS (através de CDN, dispensando arquivos externos) 
    e um visual branco e light.

    O relatorio deve conter as seguintes secoes:

    1. Visao Geral da carteira;
    2. Listagem dos ativos com dados detalhados, incluindo no final uma indicativo de compra(verde)/venda(vermelho)/manter(cinza).
    3. Sugestoes de aportes;
    4. Pontos fortes e fracos.

    ${composition}
  `;
}

// EOF