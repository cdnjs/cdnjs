export const fromEpsilon = () => {
  const start = createState(false);
  const end = createState(true);
  addEpsilonTransition(start, end);

  return { start, end };
};

export const fromSchema = (schema) => {
  const start = createState(false);
  const end = createState(true);
  addTransition(start, end, schema);

  return { start, end };
};

export const concat = (first, second) => {
  if (first === undefined) {
    return second;
  }
  addEpsilonTransition(first.end, second.start);
  first.end.isEnd = false;

  return { start: first.start, end: second.end };
};

export const union = (first, second) => {
  const start = createState(false);
  addEpsilonTransition(start, first.start);
  addEpsilonTransition(start, second.start);

  const end = createState(true);

  addEpsilonTransition(first.end, end);
  first.end.isEnd = false;
  addEpsilonTransition(second.end, end);
  second.end.isEnd = false;

  return { start, end };
};

export const closure = (nfa) => {
  const start = createState(false);
  const end = createState(true);

  addEpsilonTransition(start, end);
  addEpsilonTransition(start, nfa.start);

  addEpsilonTransition(nfa.end, end);
  addEpsilonTransition(nfa.end, nfa.start);
  nfa.end.isEnd = false;

  return { start, end };
};

export const zeroOrOne = (nfa) => {
  const start = createState(false);
  const end = createState(true);

  addEpsilonTransition(start, end);
  addEpsilonTransition(start, nfa.start);

  addEpsilonTransition(nfa.end, end);
  nfa.end.isEnd = false;

  return { start, end };
};

export const oneOrMore = (nfa) => {
  const start = createState(false);
  const end = createState(true);

  addEpsilonTransition(start, nfa.start);
  addEpsilonTransition(nfa.end, end);
  addEpsilonTransition(nfa.end, nfa.start);
  nfa.end.isEnd = false;

  return { start, end };
};

const addEpsilonTransition = (from, to) => {
  from.epsilonTransitions.push(to);
};

const addTransition = (from, to, symbol) => {
  from.transition[symbol] = to;
};

const createState = (isEnd) => {
  return {
    isEnd,
    transition: {},
    epsilonTransitions: []
  };
};
