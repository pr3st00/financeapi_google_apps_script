/**
 *  AI related functions
 * 
 *  Author: Fernando Costa de Almeida
 *  LastM : 22/05/2026
 * 
 * */

function analyzeFii() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = getNumberOfFiis() + 1;
  const values = sheet.getRange("A1:S" + lastRow).getValues();

  const data = values.flat().join("\n");
  let prompt = buildPrompt(data, "fundos imobiliarios");

  showProgressDialog(getMessage("AI_ANALYSING"));
  let response = getFromCache("FII_AI") != null ?
    getFromCache("FII_AI") : addToCache("FII_AI", ai(prompt));
  closeProgressDialog();

  showDialog(getMessage("AI_ANALYSING"), response, 800, 500);
}

function analyzeStock() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = getNumberOfLargeCaps() + getNumberOfSmallCaps() + 3;
  const values = sheet.getRange("A1:S" + lastRow).getValues();

  const data = values.flat().join("\n");
  let prompt = buildPrompt(data, "acoes");

  showProgressDialog(getMessage("AI_ANALYSING"));
  let response = getFromCache("STOCK_AI") != null ?
    getFromCache("STOCK_AI") : addToCache("STOCK_AI", ai(prompt));
  closeProgressDialog();

  showDialog(getMessage("AI_ANALYSING"), response, 800, 500);
}

function analyzeCrypto() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = getNumberOfCrypto() + 1;
  const values = sheet.getRange("A1:L" + lastRow).getValues();

  const data = values.flat().join("\n");
  let prompt = buildPrompt(data, "crypto moedas");

  showProgressDialog(getMessage("AI_ANALYSING"));
  let response = getFromCache("CRYPTO_AI") != null ?
    getFromCache("CRYPTO_AI") : addToCache("CRYPTO_AI", ai(prompt));
  closeProgressDialog();

  showDialog(getMessage("AI_ANALYSING"), response, 800, 500);
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
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(url, options);
  const data = JSON.parse(response.getContentText());

  try {
    return extractText(data);
  } catch (e) {
    return "Error: " + response.getContentText();
  }
}

function extractText(data) {
  try {
    return data.candidates[0].content.parts
      .map(p => p.text || "")
      .join("")
      .trim();
  } catch (e) {
    return "Error: " + JSON.stringify(data);
  }
}

function buildPrompt(data, type) {
  return `
    Voce é um analista financeiro da empresa AI Analysis.
    
    Sua funcao é analisar uma carteira de investimentos composta por ${type}.

    Forneca um relatorio estruturado em HTML5 com estilização moderna via Tailwind CSS (através de CDN, dispensando arquivos externos) 
    e um visual branco e light.

    O relatorio deve conter as seguintes secoes:

    1. Visao Geral da carteira;
    2. Listagem dos ativos com dados detalhados, incluindo no final uma indicativo de compra(verde)/venda(vermelho)/manter(cinza).
    3. Sugestoes de aportes;
    4. Pontos fortes e fracos.

    Nao inclua nada alem do html descrito acima na resposta. 
    
    Composicao: ${data}
  `;
}

// EOF