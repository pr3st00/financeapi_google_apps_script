/**
 *  Constants
 * 
 *  Author: Fernando Costa de Almeida
 *  LastM : 12/06/2022
 * 
 * */ 

var DEBUG = true;
var LOAD_INDICATORS_ON_OPEN = false;

var VERSION = 1.3;

var stockfundamentusUrlIBM    = "https://stockfundamentus.mybluemix.net";
var stockfundamentusUrlHeroku = "https://stockfundamentus.herokuapp.com";
var stockfundamentusUrlHome   = "http://presto.sytes.net:8080/fundamentus";
var stockfundamentusUrlRender = "https://fundamentus.onrender.com";

var stockfundamentusUrl = stockfundamentusUrlRender;

var firstFiiRow = 2;
var firstStockRow = 3;

var fiisSheetName = "FIIs";
var stocksSheetName = "ACOES NAC";
var intStocksSheetName = "ACOES INT";
var historicalSheetName = "HISTORICO";

