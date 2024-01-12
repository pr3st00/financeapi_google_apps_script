/**
 *  Constants
 * 
 *  Author: Fernando Costa de Almeida
 *  LastM : 03/01/2024
 * 
 * */

var DEBUG = false;
var LOAD_INDICATORS_ON_OPEN = false;

var VERSION = 1.6;

var stockfundamentusUrls = {
  "IBM" : "https://stockfundamentus.mybluemix.net",
  "HEROKU" : "https://stockfundamentus.herokuapp.com",
  "HOME": "http://presto.sytes.net:8080/fundamentus",
  "ONRENDER" : "https://fundamentus.onrender.com"
}

var stockfundamentusUrl = stockfundamentusUrls["ONRENDER"];

var firstFiiRow = 2;
var firstStockRow = 3;
var firstCryptoRow = 2;

var fiisSheetName = "FIIs";
var stocksSheetName = "ACOES NAC";
var intStocksSheetName = "ACOES INT";
var historicalSheetName = "HISTORICO";
var cryptoSheetName = "CRYPTO";
