/**
* Java patterns
*
* @author Leo Accend
* @version 1.0.0
*/
Rainbow.extend( "java", [
  {
    name: "constant",
    pattern: /\b(false|null|true|[A-Z_]+)\b/g
  },
  {
    matches: {
      1: "keyword",
      2: "support.namespace"
    },
    pattern: /(import|package)\s(.+)/g
  },
  {
    // see http://docs.oracle.com/javase/tutorial/java/nutsandbolts/_keywords.html
    name: "keyword",
    pattern: /\b(abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|void|volatile|while)\b/g
  },
  {
    name: "string",
    pattern: /(".*?")/g
  },
  {
    name: "char",
    pattern: /(')(.|\\.|\\u[\dA-Fa-f]{4})\1/g
  },
  {
    name: "integer",
    pattern: /\b(0x[\da-f]+|\d+)L?\b/g
  },
  {
    name: "comment",
    pattern: /\/\*[\s\S]*?\*\/|(\/\/).*?$/gm
  },
  {
    name: "support.annotation",
    pattern: /@\w+/g
  },
  {
    matches: {
      1: "entity.function"
    },
    pattern: /([^@\.\s]+)\(/g
  },
  {
    name: "entity.class",
    pattern: /\b([A-Z]\w*)\b/g
  },
  {
    // see http://docs.oracle.com/javase/tutorial/java/nutsandbolts/operators.html
    name: "operator",
    pattern: /(\+{1,2}|-{1,2}|~|!|\*|\/|%|(?:&lt;){1,2}|(?:&gt;){1,3}|instanceof|(?:&amp;){1,2}|\^|\|{1,2}|\?|:|(?:=|!|\+|-|\*|\/|%|\^|\||(?:&lt;){1,2}|(?:&gt;){1,3})?=)/g
  }
], true );
