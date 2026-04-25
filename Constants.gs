/**
 *  Constants
 * 
 *  Author: Fernando Costa de Almeida
 *  LastM : 20/10/2025
 * 
 * */

const VERSION = 1.8;

const LANG = "pt-br";
const DEBUG = true;

const LOAD_INDICATORS_ON_OPEN = false;
const SORT_ALL_ON_OPEN = true;

const stockfundamentusUrls = {
  "IBM"       : "https://stockfundamentus.mybluemix.net",
  "HEROKU"    : "https://stockfundamentus.herokuapp.com",
  "HOME"      : "http://prestoapis.sytes.net:8080/fundamentus",
  "ONRENDER"  : "https://fundamentus.onrender.com",
  "GOOGLE"    : "https://fundamentus-542923649932.southamerica-east1.run.app"
}

const stockfundamentusImpl = "HOME";

const stockfundamentusUrl = stockfundamentusUrls[stockfundamentusImpl];

// For ticker sorting and management
const firstFiiRow = 2;
const firstStockRow = 3;
const firstNonBrStockRow = 2;
const firstCryptoRow = 2;

const fiiDefaultSortColumn = 19;
const brStockDefaultSortColumn = 19;
const nonBrStockDefaultSortColumn = 19;
const cryptoDefaultSortColumn = 12;

// Sheets names
const fiisSheetName = "FIIs";
const stocksSheetName = "ACOES NAC";
const intStocksSheetName = "ACOES INT";
const historicalSheetName = "HISTORICO";
const cryptoSheetName = "CRYPTO";

// Used for counting and finding tickers
const stockRegex = /^[A-Z,a-z,0-9]+[0-9]+$/;
const fiiRegex = /^[A-Z,a-z,0-9]+[0-9]+$/;
const cryptoRegex = /^[A-Z,a-z]+$/;

// Dialog parameters
const loadingGif = "https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif";
const dialogWidth = 200;
const dialogHeight = 100;
const dialogCloseDelay = 2 * 1000;

// EOF
