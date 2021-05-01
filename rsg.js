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

function complex(real, imag) {
  return {
    real: real,
    imag: imag,
  };
}

function dft(samples) {
  var len = samples.length;
  var arr = Array(len);
  var invlen = 1 / len;
  for (var i = 0; i < len; i++) {
    arr[i] = complex(0, 0);
    for (var n = 0; n < len; n++) {
      var theta = -Math.PI * 2 * i * n * invlen;
      var costheta = Math.cos(theta);
      var sintheta = Math.sin(theta);
      if (samples[n].real == undefined) samples[n] = complex(samples[n], 0);
      arr[i].real += samples[n].real * costheta - samples[n].imag * sintheta;
      arr[i].imag += samples[n].real * sintheta + samples[n].imag * costheta;
    }
  }
  return arr;
}

function fft(samples) {
  var len = samples.length;
  var arr = Array(len);

  if (len == 1) {
    if (samples[0].real == undefined) return [complex(samples[0], 0)];
    else return [complex(samples[0].real, samples[0].imag)];
  }

  let even = samples.filter((sample, index) => index % 2 == 0);
  let odd = samples.filter((sample, index) => index % 2 == 1);

  var arrEven = fft(even);
  var arrOdd = fft(odd);

  var invlen = 1 / len;

  for (var k = 0; k < len / 2; k++) {
    let temp = complex(0, 0);

    var theta = -Math.PI * 2 * k * invlen;
    var costheta = Math.cos(theta);
    var sintheta = Math.sin(theta);

    temp.real = arrOdd[k].real * costheta - arrOdd[k].imag * sintheta;
    temp.imag = arrOdd[k].real * sintheta + arrOdd[k].imag * costheta;

    arr[k] = complex(arrEven[k].real + temp.real, arrEven[k].imag + temp.imag);

    arr[k + len / 2] = complex(
      arrEven[k].real - temp.real,
      arrEven[k].imag - temp.imag
    );
  }

  return arr;
}
