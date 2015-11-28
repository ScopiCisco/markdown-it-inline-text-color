// Process ~subscript~

'use strict';

var COLOR_OPEN_REGEX = /{\s*color\s*:\s*(\w+\s*)}/;
var COLOR_CLOSE_REGEX = /{\s*color\s*}/;
var TOKEN_TYPE = 'color_text';
var MARKUP = "{color}";

function getColor(attrs) {
  if(!attrs || attrs.length < 1) { return null; }

  for(var ii=0; ii< attrs.length; ii++) {
    var att = attrs[ii];
    if(att && att.length > 1) {
      if(att[0] === 'color') {
        return att[1];
      }
    }
  }

  return null;
}

function color(state, silent) {
  var found,
      content,
      token,
      startResult,
      endResult,
      result,
      nesting = 1,
      isOpen = true,
      max = state.posMax,
      start = state.pos;

  if (state.src.charCodeAt(start) !== 0x7B/* ~ */) { return false; }
  if (silent) { return false; } // don't run any pairs in validation mode

  content = state.src.slice(start);
  startResult = COLOR_OPEN_REGEX.exec(content);
  endResult = COLOR_CLOSE_REGEX.exec(content);

  if(!startResult && !endResult) { return false; }

  if(startResult && endResult) {
    if(startResult.index < endResult.index) {
      result = startResult;
    } else {
      nesting = -1;
      result = endResult;
    }
  } else if(startResult) {
    result = startResult;
  } else {
    result = endResult;
    nesting = -1;
  }

  isOpen = result.length === 2;
  state.posMax = start + result[0].length;

  token         = state.push(TOKEN_TYPE, 'span', nesting);
  token.markup  = MARKUP;

  if(isOpen) {
    token.attrPush(['color', result[1]]);
  }

  state.pos = state.posMax;
  state.posMax = max;
  return true;
}

function renderDefault(tokens, idx, _options, env, self) {
    var token = tokens[idx];

    var result = ['<'];

    if(token.nesting === -1) {
        result.push('/');
    }

    result.push('span');

    if(token.nesting === 1) {
      var color = getColor(token.attrs);

      if(color) {
        result.push(' style="color:',color,';"');
      }
    }
    result.push('>');

    return result.join('');
}

module.exports = function sub_plugin(md, name, options) {
  options = options || {};

  md.inline.ruler.after('emphasis', 'span', color);

  md.renderer.rules[TOKEN_TYPE] = options.render || renderDefault;
};
