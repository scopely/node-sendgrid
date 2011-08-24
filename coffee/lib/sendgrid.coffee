querystring   = require('querystring')
utils         = require('./utils')
url           = require('url')
SendGridSMTP = require('./smtp').SendGridSMTP

class SendGridClient

  @API_URL = "https://sendgrid.com/api/"

  constructor : (@apiUser, @apiKey, @useWebApi = true) ->
    if !apiUser || !apiKey
      throw new Error('Credentials missing')

    @smtp = new SendGridSMTP(@apiUser, @apiKey)

    @api =
      mail:
        send: (params, callback) =>
          @.callApi('mail.send', params, ['to' ,'from', 'subject', 'text', 'html'], ['x-smtapi','toname','bcc','fromname'], callback)

      unsubscribe:
        get: (params, callback) =>
          @callApi('unsubscribes.get', params, [], ['date'], callback)
        delete: (params, callback) =>
          @callApi('unsubscribes.delete', params, ['email'], callback)
        add: (params, callback) =>
          @callApi('unsubscribes.add', params, ['email'], callback)

      spamreports:
        get: (params, callback) =>
          @callApi('spamreports.get', params, [], ['date'], callback)
        delete: (params, callback) =>
          @callApi('spamreports.delete', params, ['email'], callback)

      stats:
        get: (params, callback) =>
          @callApi('stats.get', params, [], ['days', 'start_date', 'end_date'], callback)
        getAggregates : (callback) =>
          @callApi('stats.get', {aggregate: 1}, ['aggregate'], [], callback)
        getCategories : (callback) =>
          @callApi('stats.get', {list: true}, ['list'], [], callback)
        getCategoriesStats : (params, callback) =>
          @callApi('stats.get', params, ['category'], ['days', 'start_date', 'end_date'], callback)

      bounces:
        get: (params, callback) =>
          @callApi('bounces.get', params, [], ['date'], callback)
        delete : (params, callback) =>
          @callApi('bounces.delete', params , ['email'], [], callback)


  callApi : (method, params, requiredParamKeys, optionalParamKeys, callback) ->

    for required in requiredParamKeys
      if !params[required]
        throw new Error('Missing required parameter ' + required)

    for key, value of params
      if key not in requiredParamKeys and key not in  optionalParamKeys
        delete params[key]

    params['api_user'] = @apiUser
    params['api_key']  = @apiKey

    urlString = "#{SendGridClient.API_URL}#{method}.json?#{querystring.stringify(params)}"

    utils.requestByWget(urlString, null, (err, result) ->
      callback(err, result) if callback
    )


exports.SendGridClient = SendGridClient
