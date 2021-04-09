const Benchmark = require('benchmark')
const axios = require('axios')
const superagent = require('superagent')
const suite = new Benchmark.Suite
const targetUrl = 'http://httpbin.org/ip'

suite
  .add('axios', {
    defer: true,
    fn: function(deferred) {
      axios.get(targetUrl).then(function() { deferred.resolve(); })
    }
  })
  .add('superagent - promise', {
    defer: true,
    fn: function(deferred) {
      superagent.get(targetUrl).then(function() { deferred.resolve(); })
    }
  })
  .add('superagent - end method', {
    defer: true,
    fn: function(deferred) {
      superagent.get(targetUrl).end(function() { deferred.resolve(); })
    }
  })
  .on('cycle', function(event) { console.log(String(event.target)) })
  .on('complete', function() {
    console.log('The fastest library is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })