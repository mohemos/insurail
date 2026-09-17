/**
 * A small syntax tokenizer for the languages shown on the site.
 * It is deliberately simple: good enough to colour keys, strings, numbers and
 * comments without pulling in a highlighting library.
 */
import type { CodeLang } from "@/content/code-samples";

export type TokenType =
  | "plain"
  | "string"
  | "key"
  | "number"
  | "comment"
  | "keyword"
  | "verb"
  | "flag"
  | "url";

export interface Token {
  type: TokenType;
  value: string;
}

const KEYWORDS = new Set([
  "const", "let", "var", "await", "async", "import", "from", "export", "function", "return", "new",
  "if", "else", "elif", "for", "in", "not", "and", "or", "def", "class", "with", "as", "try", "except",
  "raise", "throw", "lambda", "true", "false", "null", "True", "False", "None", "print", "console",
]);

const HASH_COMMENT_LANGS: CodeLang[] = ["bash", "python", "http"];
const SLASH_COMMENT_LANGS: CodeLang[] = ["javascript"];

interface Rule {
  type: TokenType;
  pattern: RegExp;
}

function rulesFor(lang: CodeLang): Rule[] {
  const rules: Rule[] = [];
  if (HASH_COMMENT_LANGS.includes(lang)) rules.push({ type: "comment", pattern: /#[^\n]*/y });
  if (SLASH_COMMENT_LANGS.includes(lang)) rules.push({ type: "comment", pattern: /\/\/[^\n]*/y });
  rules.push(
    { type: "string", pattern: /"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`/y },
    { type: "url", pattern: /https?:\/\/[^\s"'`)]+/y },
    { type: "verb", pattern: /\b(?:POST|GET|PUT|PATCH|DELETE)\b(?=\s)|HTTP\/1\.1/y },
    { type: "flag", pattern: /(?<=\s)-{1,2}[A-Za-z][\w-]*/y },
    { type: "number", pattern: /\b\d[\d_]*(?:\.\d+)?\b/y },
    { type: "plain", pattern: /[A-Za-z_$@][\w$.-]*/y },
    { type: "plain", pattern: /\s+/y },
    { type: "plain", pattern: /[^\sA-Za-z_$@\d"'`]+/y },
  );
  return rules;
}

/** Split `code` into typed tokens. Whitespace is preserved exactly. */
export function tokenize(code: string, lang: CodeLang): Token[] {
  const rules = rulesFor(lang);
  const tokens: Token[] = [];
  let index = 0;

  while (index < code.length) {
    let matched = false;
    for (const rule of rules) {
      rule.pattern.lastIndex = index;
      const match = rule.pattern.exec(code);
      if (!match || match.index !== index || match[0].length === 0) continue;
      let type = rule.type;
      const value = match[0];
      if (type === "plain" && KEYWORDS.has(value)) type = "keyword";
      tokens.push({ type, value });
      index += value.length;
      matched = true;
      break;
    }
    if (!matched) {
      tokens.push({ type: "plain", value: code[index] });
      index += 1;
    }
  }

  // A string followed by ":" is an object key (JSON, JS, Python dicts).
  for (let i = 0; i < tokens.length; i += 1) {
    if (tokens[i].type !== "string") continue;
    let j = i + 1;
    while (j < tokens.length && tokens[j].type === "plain" && /^\s+$/.test(tokens[j].value)) j += 1;
    if (j < tokens.length && tokens[j].value.startsWith(":")) tokens[i].type = "key";
  }

  return mergePlain(tokens);
}

function mergePlain(tokens: Token[]): Token[] {
  const merged: Token[] = [];
  for (const token of tokens) {
    const last = merged[merged.length - 1];
    if (last && last.type === "plain" && token.type === "plain") last.value += token.value;
    else merged.push({ ...token });
  }
  return merged;
}

/** Return the tokens that make up the first `length` characters (for typing animations). */
export function sliceTokens(tokens: Token[], length: number): Token[] {
  const out: Token[] = [];
  let used = 0;
  for (const token of tokens) {
    if (used >= length) break;
    const remaining = length - used;
    if (token.value.length <= remaining) {
      out.push(token);
      used += token.value.length;
    } else {
      out.push({ type: token.type, value: token.value.slice(0, remaining) });
      used = length;
    }
  }
  return out;
}
