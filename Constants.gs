/**
 *  Constants
 * 
 *  Author: Fernando Costa de Almeida
 *  LastM : 15/10/2025
 * 
 * */

var VERSION = 1.8;

var DEBUG = false;

var LOAD_INDICATORS_ON_OPEN = false;
var SORT_ALL_ON_OPEN = true;

var stockfundamentusUrls = {
  "IBM"       : "https://stockfundamentus.mybluemix.net",
  "HEROKU"    : "https://stockfundamentus.herokuapp.com",
  "HOME"      : "http://prestoapis.sytes.net:8080/fundamentus",
  "ONRENDER"  : "https://fundamentus.onrender.com"
}

var stockfundamentusImpl = "HOME";

var stockfundamentusUrl = stockfundamentusUrls[stockfundamentusImpl];

// For ticker sorting and management
var firstFiiRow = 2;
var firstStockRow = 3;
var firstNonBrStockRow = 2;
var firstCryptoRow = 2;

var fiiDefaultSortColumn = 19;
var brStockDefaultSortColumn = 19;
var nonBrStockDefaultSortColumn = 19;
var cryptoDefaultSortColumn = 12;

// Sheets names
var fiisSheetName = "FIIs";
var stocksSheetName = "ACOES NAC";
var intStocksSheetName = "ACOES INT";
var historicalSheetName = "HISTORICO";
var cryptoSheetName = "CRYPTO";

// Used for counting and finding tickers
var stockRegex = /^[A-Z,a-z,0-9]+[0-9]+$/;
var fiiRegex = /^[A-Z,a-z,0-9]+[0-9]+$/;
var cryptoRegex = /^[A-Z,a-z]+$/;

// Dialog parameters
var loadingGif = "https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif";
var dialogWidth = 200;
var dialogHeight = 100;
var dialogCloseDelay = 2 * 1000;

// EOF