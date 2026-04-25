/**
 *  System Messages
 * 
 *  Author: Fernando Costa de Almeida
 *  LastM : 21/10/2025
 * 
 * */

const MESSAGE_NOT_FOUND = "Message not found";

const MESSAGES = {
  "pt-br": {
    "FUNDAMENTUS_ERROR_MESSAGE": "Erro no servico fundamentus : ",
    "INDICATORS_UPDATE": "Atualizando dados",
    "TICKER_SORTING": "Ordenandos ativos"
  },
  "en-us": {
    "FUNDAMENTUS_ERROR_MESSAGE": "Fundamentus service error : ",
    "INDICATORS_UPDATE": "Updating data",
    "TICKER_SORTING": "Sorting tickers"
  }
}

function getMessage(key) {
  return MESSAGES[LANG] && MESSAGES[LANG][key] ? MESSAGES[LANG][key] : MESSAGE_NOT_FOUND;
}

// EOF
