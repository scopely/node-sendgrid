spawn = require('child_process').spawn
https = require('https')
querystring = require('querystring')
url     = require('url')

WGET_REQUEST_TIMEOUT_SEC = 10
WGET_REQUEST_RETRY = 0
WGET_REQUEST_LONG_TIMEOUT_SEC = 10
WGET_LONG_TIMEOUT_SEC = 10
WGET_NAME = '/usr/bin/wget'


getHTTPSGetResponse = (urlString, options, callback) ->
  urlObj = url.parse(urlString)
  responseData = ''

  console.log urlObj.query

  options = {
    host    : urlObj.host,
    path    : "#{urlObj.pathname}?#{urlObj.query}",
  }

  req = https.get(options, (res) ->
    res.setEncoding('utf8')
    res.on('data', (chunk) ->
      responseData += chunk
    )
    res.on('end', () ->
      callback(null, responseData)
    )
  ).on('error', (e) ->
    callback(e, null)
  )

getHTTPSPostResponse = (urlString, options, callback) ->

  urlObj = url.parse(urlString)
  responseData = ''

  options = {
    method  : 'GET'
    host    : urlObj.host,
    path    : urlObj.pathname,
  }

  req = https.request(options, (res) ->
    res.setEncoding('utf8')
    res.on('data', (chunk) ->
      responseData += chunk
    )
    res.on('end', () ->
      callback(null, responseData)
    )
  )
  req.write(urlObj.query)
  req.end()
  req.on('error', (e) ->
    callback(e, null)
  )

getWgetOptions = (timeoutSec, retryNum) ->
  options = []
  options.push("--no-check-certificate")
  options.push("-O")
  options.push("-")
  options.push("--timeout")
  options.push(timeoutSec)
  options.push("--read-timeout")
  options.push(timeoutSec)
  options.push("--connect-timeout")
  options.push("2")
  options.push("-q")
  return options

wget = (args, ttl, callback) ->

  wgetSpawn = spawn(WGET_NAME, args)
  ttl = WGET_LONG_TIMEOUT_SEC * 3 if !ttl

  stdout = ''
  stderr = ''

  wgetSpawn.on('exit', (code) ->
    callback(code, stdout, stderr) if callback
    wgetSpawn.kill('SIGHUP')
    wgetSpawn = null
  )

  wgetSpawn.on('close', () ->
    wgetSpawn.kill('SIGHUP')
  )

  wgetSpawn.stdout.on('data', (data) ->
    stdout += data
  )

  wgetSpawn.stderr.on('data', (data) ->
    stderr += data
  )

  setTimeout( () ->
    if wgetSpawn != null
      wgetSpawn.kill('SIGHUP')
  , ttl * 1000)

requestByWget = (url, options, callback) ->

  if (options == undefined || options == null)
    options = getWgetOptions(WGET_REQUEST_TIMEOUT_SEC, WGET_REQUEST_RETRY)
  options.push(url)

  onWgetResponse = (code, stdout, stderr) ->
    if !stderr
      callback(null, stdout) if callback
    else
      callback("wget_error: " + stderr, null) if callback

  try
    wget(options, WGET_REQUEST_LONG_TIMEOUT_SEC * 3, onWgetResponse)
  catch ex
    callback("wget_exception: " + ex, null) if callback




module.exports = {
  requestByWget : requestByWget,
  getHTTPSGetResponse : getHTTPSGetResponse
  getHTTPSPostResponse : getHTTPSPostResponse
}
