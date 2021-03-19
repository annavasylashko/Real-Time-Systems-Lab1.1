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

const correlate = (x, y) => {
  let Mx = average(x)
  let My = average(y)
  let n = x.length

  // N - диапазон значений испытательного интервала, на конкретном значении которого,
  // мы исследуем взаимное влияние. (по сколько это график R(tau)).
  // Можно сделать предел равным длине сигнала - 1, меньшее значение было выбрано для удобства отображения.
  // Следует помнить, что t у нас в диапазоне от 1 до длины сигнала - tau, 
  // по сколько для второго сигнала будет сдвиг на tau, и нельзя выходить за пределы.

  let N = x.length

  let correlation = new Array(N)
  correlation.fill(0)

  for (let tau = 0; tau < N; tau++) {
    for (let t = 1; t < n - tau; t++) {
      correlation[tau] += (x[t] - Mx) * (y[t + tau] - My)
    }
    correlation[tau] *= 1/ (n - 1)
  }

  return correlation
}
