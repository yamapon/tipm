/**
 * Create a makefile.
 */

module.exports = function createMakefile(obj) {

  var year = (new Date()).getFullYear();

  var buf = '\n';
  buf += '#\n';
  buf += '# This is your module manifest and used by Titanium\n';
  buf += '# during compilation, packaging, distribution, etc.\n';
  buf += '# Generated by tipm\n';
  buf += '#\n';
  buf += 'version: '+obj.version+'\n';
  buf += 'description: '+obj.description+'\n';
  buf += 'author: '+obj.author+'\n';
  buf += 'license: '+obj.licence+'\n';
  buf += 'copyright: Copyright '+year+' '+obj.author+'\n';
  buf +=  '\n';
  buf +=  '\n';
  buf += '# these should not be edited\n';
  buf += 'name: '+obj.name+'\n';
  buf += 'moduleid: '+obj.repo.replace(/\//g, '-')+'\n';
  buf += 'guid: '+obj.guid+'\n';
  buf += 'platform: commonjs\n';
  buf += 'minsdk: '+obj.minsdk+'\n';

  return buf;
};
