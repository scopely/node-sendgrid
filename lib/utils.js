(function() {
  var WGET_LONG_TIMEOUT_SEC, WGET_NAME, WGET_REQUEST_LONG_TIMEOUT_SEC, WGET_REQUEST_RETRY, WGET_REQUEST_TIMEOUT_SEC, getHTTPSGetResponse, getHTTPSPostResponse, getWgetOptions, https, querystring, requestByWget, spawn, url, wget;
  spawn = require('child_process').spawn;
  https = require('https');
  querystring = require('querystring');
  url = require('url');
  WGET_REQUEST_TIMEOUT_SEC = 10;
  WGET_REQUEST_RETRY = 0;
  WGET_REQUEST_LONG_TIMEOUT_SEC = 10;
  WGET_LONG_TIMEOUT_SEC = 10;
  WGET_NAME = '/usr/bin/wget';
  getHTTPSGetResponse = function(urlString, options, callback) {
    var req, responseData, urlObj;
    urlObj = url.parse(urlString);
    responseData = '';
    console.log(urlObj.query);
    options = {
      host: urlObj.host,
      path: "" + urlObj.pathname + "?" + urlObj.query
    };
    return req = https.get(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        return responseData += chunk;
      });
      return res.on('end', function() {
        return callback(null, responseData);
      });
    }).on('error', function(e) {
      return callback(e, null);
    });
  };
  getHTTPSPostResponse = function(urlString, options, callback) {
    var req, responseData, urlObj;
    urlObj = url.parse(urlString);
    responseData = '';
    options = {
      method: 'GET',
      host: urlObj.host,
      path: urlObj.pathname
    };
    req = https.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        return responseData += chunk;
      });
      return res.on('end', function() {
        return callback(null, responseData);
      });
    });
    req.write(urlObj.query);
    req.end();
    return req.on('error', function(e) {
      return callback(e, null);
    });
  };
  getWgetOptions = function(timeoutSec, retryNum) {
    var options;
    options = [];
    options.push("--no-check-certificate");
    options.push("-O");
    options.push("-");
    options.push("--timeout");
    options.push(timeoutSec);
    options.push("--read-timeout");
    options.push(timeoutSec);
    options.push("--connect-timeout");
    options.push("2");
    options.push("-q");
    return options;
  };
  wget = function(args, ttl, callback) {
    var stderr, stdout, wgetSpawn;
    wgetSpawn = spawn(WGET_NAME, args);
    if (!ttl) {
      ttl = WGET_LONG_TIMEOUT_SEC * 3;
    }
    stdout = '';
    stderr = '';
    wgetSpawn.on('exit', function(code) {
      if (callback) {
        callback(code, stdout, stderr);
      }
      wgetSpawn.kill('SIGHUP');
      return wgetSpawn = null;
    });
    wgetSpawn.on('close', function() {
      return wgetSpawn.kill('SIGHUP');
    });
    wgetSpawn.stdout.on('data', function(data) {
      return stdout += data;
    });
    wgetSpawn.stderr.on('data', function(data) {
      return stderr += data;
    });
    return setTimeout(function() {
      if (wgetSpawn !== null) {
        return wgetSpawn.kill('SIGHUP');
      }
    }, ttl * 1000);
  };
  requestByWget = function(url, options, callback) {
    var onWgetResponse;
    if (options === void 0 || options === null) {
      options = getWgetOptions(WGET_REQUEST_TIMEOUT_SEC, WGET_REQUEST_RETRY);
    }
    options.push(url);
    onWgetResponse = function(code, stdout, stderr) {
      if (!stderr) {
        if (callback) {
          return callback(null, stdout);
        }
      } else {
        if (callback) {
          return callback("wget_error: " + stderr, null);
        }
      }
    };
    try {
      return wget(options, WGET_REQUEST_LONG_TIMEOUT_SEC * 3, onWgetResponse);
    } catch (ex) {
      if (callback) {
        return callback("wget_exception: " + ex, null);
      }
    }
  };
  module.exports = {
    requestByWget: requestByWget,
    getHTTPSGetResponse: getHTTPSGetResponse,
    getHTTPSPostResponse: getHTTPSPostResponse
  };
}).call(this);
