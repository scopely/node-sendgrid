(function() {
  var SendGridClient, SendGridSMTP, querystring, url, utils;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  querystring = require('querystring');
  utils = require('./utils');
  url = require('url');
  SendGridSMTP = require('./smtp').SendGridSMTP;
  SendGridClient = (function() {
    SendGridClient.API_URL = "https://sendgrid.com/api/";
    function SendGridClient(apiUser, apiKey, useWebApi) {
      this.apiUser = apiUser;
      this.apiKey = apiKey;
      this.useWebApi = useWebApi != null ? useWebApi : true;
      if (!apiUser || !apiKey) {
        throw new Error('Credentials missing');
      }
      this.smtp = new SendGridSMTP(this.apiUser, this.apiKey);
      this.api = {
        mail: {
          send: __bind(function(params, callback) {
            return this.callApi('mail.send', params, ['to', 'from', 'subject', 'text', 'html'], ['x-smtapi', 'toname', 'bcc', 'fromname'], callback);
          }, this)
        },
        unsubscribe: {
          get: __bind(function(params, callback) {
            return this.callApi('unsubscribes.get', params, [], ['date'], callback);
          }, this),
          "delete": __bind(function(params, callback) {
            return this.callApi('unsubscribes.delete', params, ['email'], callback);
          }, this),
          add: __bind(function(params, callback) {
            return this.callApi('unsubscribes.add', params, ['email'], callback);
          }, this)
        },
        spamreports: {
          get: __bind(function(params, callback) {
            return this.callApi('spamreports.get', params, [], ['date'], callback);
          }, this),
          "delete": __bind(function(params, callback) {
            return this.callApi('spamreports.delete', params, ['email'], callback);
          }, this)
        },
        stats: {
          get: __bind(function(params, callback) {
            return this.callApi('stats.get', params, [], ['days', 'start_date', 'end_date'], callback);
          }, this),
          getAggregates: __bind(function(callback) {
            return this.callApi('stats.get', {
              aggregate: 1
            }, ['aggregate'], [], callback);
          }, this),
          getCategories: __bind(function(callback) {
            return this.callApi('stats.get', {
              list: true
            }, ['list'], [], callback);
          }, this),
          getCategoriesStats: __bind(function(params, callback) {
            return this.callApi('stats.get', params, ['category'], ['days', 'start_date', 'end_date'], callback);
          }, this)
        },
        bounces: {
          get: __bind(function(params, callback) {
            return this.callApi('bounces.get', params, [], ['date'], callback);
          }, this),
          "delete": __bind(function(params, callback) {
            return this.callApi('bounces.delete', params, ['email'], [], callback);
          }, this)
        }
      };
    }
    SendGridClient.prototype.callApi = function(method, params, requiredParamKeys, optionalParamKeys, callback) {
      var key, required, urlString, value, _i, _len;
      for (_i = 0, _len = requiredParamKeys.length; _i < _len; _i++) {
        required = requiredParamKeys[_i];
        if (!params[required]) {
          throw new Error('Missing required parameter ' + required);
        }
      }
      for (key in params) {
        value = params[key];
        if (__indexOf.call(requiredParamKeys, key) < 0 && __indexOf.call(optionalParamKeys, key) < 0) {
          delete params[key];
        }
      }
      params['api_user'] = this.apiUser;
      params['api_key'] = this.apiKey;
      urlString = "" + SendGridClient.API_URL + method + ".json?" + (querystring.stringify(params));
      return utils.requestByWget(urlString, null, function(err, result) {
        if (callback) {
          return callback(err, result);
        }
      });
    };
    return SendGridClient;
  })();
  exports.SendGridClient = SendGridClient;
}).call(this);
