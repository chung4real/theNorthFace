const fn = function (a, b) {
  console.log(a + b)
  console.log(this);
}

fn(323, 32)