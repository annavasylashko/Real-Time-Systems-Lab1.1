const generateRandomSignals = (n, wl, N) => {
  let signals = new Array(N);
  for (let i = 0; i < N; ++i) signals[i] = 0;

  let Wp = 0;

  for (let i = 1; i <= n; i++) {
    Wp += wl / n;

    for (let t = 0; t < N; t++) {
      let fp = Math.random();
      let Ap = Math.random();

      signals[t] += Ap * Math.sin(Wp * t + fp);
    }
  }

  return signals;
};

const sum = (signals) => signals.reduce((p, c) => p + c, 0);
const average = (signals) => sum(signals) / signals.length;
const dispercy = (signals) => {
  let mx = average(signals);
  return sum(signals.map((xt) => Math.pow(xt - mx, 2))) / (signals.length - 1);
};
