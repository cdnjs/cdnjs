"use strict";

function Rule (data){
  data = data || {};

  this.exception = data.exception || false;
  this.firstLevel = data.firstLevel || '';
  this.secondLevel = data.secondLevel || null;
  this.isHost = data.isHost || false;
  this.source = data.source || '';
  this.wildcard = data.wildcard || false;
}

/**
 * Returns the TLD or SLD (Second Level Domain) pattern for a rule
 *
 * @return {String}
 */
Rule.prototype.getNormalXld = function getNormalXld(){
  return (this.secondLevel ? '.' + this.secondLevel : '') + '.' + this.firstLevel;
};

/**
 * Returns a pattern suitable for normal rule
 * Mostly for internal use
 *
 * @return {String}
 */
Rule.prototype.getNormalPattern = function getNormalPattern(){
  return (this.secondLevel ? '\\.' + this.secondLevel : '') + '\\.' + this.firstLevel;
};

/**
 * Returns a pattern suitable for wildcard rule
 * Mostly for internal use
 *
 * @return {String}
 */
Rule.prototype.getWildcardPattern = function getWildcardPattern(){
  return '\\.[^\\.]+' + this.getNormalXld().replace(/\./g, '\\.');
};

/**
 * Returns a pattern suitable for exception rule
 * Mostly for internal use
 *
 * @return {String}
 */
Rule.prototype.getExceptionPattern = function getExceptionPattern(){
  return (this.secondLevel || '') + '\\.' + this.firstLevel;
};

/**
 * Returns the best pattern possible for a rule
 * You just have to test a value against it to check or extract a hostname
 *
 * @api
 * @param {string|undefined} before
 * @param {string|undefined} after
 * @return {String} A pattern to challenge some string against
 */
Rule.prototype.getPattern = function getPattern(before, after){
  var pattern = '';

  before = (before === undefined) ? '(': before+'';
  after = (after === undefined) ? ')$': after+'';

  if (this.exception === true){
    pattern = this.getExceptionPattern();
  }
  else if (this.isHost === true) {
    pattern = this.firstLevel;
  }
  else{
    pattern = '[^\\.]+' + (this.wildcard ? this.getWildcardPattern() : this.getNormalPattern());
  }

  return before + pattern + after;
};

module.exports = Rule;
