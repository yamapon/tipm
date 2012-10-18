
/**
 * Module dependencies.
 */

var exec = require('child_process').exec
  , fs = require('fs')
  , path = require('path');

describe('component', function(){
  describe('empty', function(){
    it('should output help', function(done){
      exec('bin/component', function(err, stdout){
        if (err) return done(err);
        stdout.should.include('component <command> [options]');
        stdout.should.include('--help');
        stdout.should.include('Commands:');
        stdout.should.include('install');
        stdout.should.include('create');
        stdout.should.include('search');
        stdout.should.include('info');
        stdout.should.include('convert');
        stdout.should.include('ls');
        done();
      })
    })
  })
})