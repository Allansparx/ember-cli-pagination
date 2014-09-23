import startApp from '../helpers/start-app';
import pretenderServer from '../helpers/pretender-server';
import Ember from 'ember';
var App, server;

App = null;

server = null;

module('Integration - Todo Index', {
  setup: function() {
    App = startApp();
    return server = pretenderServer();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    return server.shutdown();
  }
});

test('Should showo todos', function() {
  return visit("/todos").then(function() {
    return equal(find(".todo").length, 2);
  });
});
