/**
 *  Constants
 * 
 *  Author: Fernando Costa de Almeida
 *  LastM : 19/09/2025
 * 
 * */

var DEBUG = false;

var LOAD_INDICATORS_ON_OPEN = false;
var SORT_ALL_ON_OPEN = true;

var VERSION = 1.7;

var stockfundamentusUrls = {
  "IBM"       : "https://stockfundamentus.mybluemix.net",
  "HEROKU"    : "https://stockfundamentus.herokuapp.com",
  "HOME"      : "http://prestoapis.sytes.net:8080/fundamentus",
  "ONRENDER"  : "https://fundamentus.onrender.com"
}

var stockfundamentusImpl = "HOME";

var stockfundamentusUrl = stockfundamentusUrls[stockfundamentusImpl];

var firstFiiRow = 2;
var firstStockRow = 3;
var firstNonBrStockRow = 2;
var firstCryptoRow = 2;

var fiiDefaultSortColumn = 19;
var brStockDefaultSortColumn = 19;
var nonBrStockDefaultSortColumn = 19;
var cryptoDefaultSortColumn = 12;

var fiisSheetName = "FIIs";
var stocksSheetName = "ACOES NAC";
var intStocksSheetName = "ACOES INT";
var historicalSheetName = "HISTORICO";
var cryptoSheetName = "CRYPTO";
