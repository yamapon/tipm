
var exec = require('child_process').exec
  , express = require('express')
  , assert = require('assert')
  , mkdir = require('mkdirp')
  , path = require('path')
  , fs = require('fs')
  , exists = fs.existsSync || path.existsSync;

describe('component install from remote', function(){
  var app = express();
  var auth = express();

  before(function(done){
    mkdir('test/private-registry/testcomponent/master', done);
  })

  before(function(done){
    fs.writeFile('test/private-registry/testcomponent/master/package.json', JSON.stringify({
      name: 'testcomponent',
      repo: 'private-registry/testcomponent'
    }), done);
  })

  before(function(done){
    app.use(express.static(__dirname));
    app.listen(3000, done);
  })

  before(function(done){
    auth.use(express.basicAuth('admin', '1234'));
    auth.use(express.static(__dirname));
    auth.listen(3001, done);
  })

  describe('without authentication', function(){
    beforeEach(function(done){
      fs.writeFile('package.json', JSON.stringify({
        remotes: ['http://localhost:3000']
      }), done);
    })

    it('should install private component', function(done){
      exec('bin/component install private-registry/testcomponent', function(err, stdout, stderr){
        if (err) return done(err);
        stdout.should.include('install');
        stdout.should.include('complete');
        var json = require(path.resolve('components/private-registry-testcomponent/package.json'));
        json.name.should.equal('testcomponent');
        json.repo.should.equal('private-registry/testcomponent');
        done();
      })
    })

    it('should fallback to github', function(done){
      exec('bin/component install component/emitter', function(err, stdout){
        if (err) return done(err);
        stdout.should.include('install');
        stdout.should.include('fetch');
        stdout.should.include('complete');
        var json = require(path.resolve('components/component-emitter/package.json'));
        json.name.should.equal('emitter');
        done();
      })
    })
  })

  describe('with authentication', function(){
    describe('url notation', function(done){
      before(function(done){
        fs.writeFile('package.json', JSON.stringify({
          remotes: ['http://admin:1234@localhost:3001']
        }), done);
      })

      it('should support basic auth embedded into the url for each registry', function(done){
        exec('bin/component install private-registry/testcomponent', function(err, stdout){
          if (err) return done(err);
          stdout.should.include('install');
          stdout.should.include('complete');
          var json = require(path.resolve('components/private-registry-testcomponent/package.json'));
          json.name.should.equal('testcomponent');
          json.repo.should.equal('private-registry/testcomponent');
          done();
        })
      })
    })

    describe('and bad credentials', function(){
      beforeEach(function(done){
        fs.writeFile('package.json', JSON.stringify({
          remotes: ['http://admin:abcd@localhost:3001']
        }), done);
      })

      it('should fail when credentials are incorrect', function(done){
        exec('bin/component install private-registry/testcomponent', function(err, stdout, stderr){
          if (err) return done(err);
          stderr.should.include('error');
          stderr.should.include('failed to fetch http://admin:abcd@localhost:3001');
          stderr.should.include('got 401 response');
          assert(!exists('components/private-registry-testcomponent/package.json'),
            'component should not be installed');
          done();
        })
      })
    })
  })

  afterEach(function(done){
    exec('rm -fr components package.json', done);
  })

  afterEach(function(done){
    // Invalidating require's cache
    for (var key in require.cache) {
      require.cache[key] = undefined;
    }
    done();
  })

  after(function(done){
    exec('rm -fr test/private-registry', done);
  })
})
