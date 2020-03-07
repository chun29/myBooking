function add(n1, n2) {
  return Number(n1) + Number(n2);
}
function avg(data) {
  let total = data.reduce((total, item) => {
    return total + item.price;
  }, 0);
  return total / data.length;
}

function validateEmail(email) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export { add, avg, validateEmail };
