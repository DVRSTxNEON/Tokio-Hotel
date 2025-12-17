const display = document.getElementById('resultado');

function addNumber(num) {
  if (display.value === '0') {
    display.value = num;
  } else {
    display.value += num;
  }
}

function addDecimal() {
  const partes = display.value.split(/[\+\-\*\/x÷%]/);
  const ultima = partes.pop() || '';
  if (ultima.includes('.')) return;
  if (display.value === '0') display.value = "0.";
  else display.value += ".";
}

function clearAll() {
  display.value = '0';
}

function deleteLast() {
  if (display.value.length <= 1) display.value = '0';
  else display.value = display.value.slice(0, -1);
}

function addOperator(op) {
  const last = display.value.slice(-1);

  if ("+-x*/÷%".includes(last)) return;

  if (display.value === "0" && op !== "-") return;

  if (op === "%") { addPercent(); return; }

  display.value += op;
}

function addPercent() {
  aplicarPorcentaje();
}

function aplicarPorcentaje() {
  try {
    const expr = display.value;
    const partes = expr.split(/([\+\-\*\/x÷])/);

    let i = partes.length - 1;
    while (i >= 0 && partes[i] === "") i--;

    const ultima = partes[i];
    const num = parseFloat(ultima);
    if (isNaN(num)) throw new Error();

    partes[i] = num / 100;
    display.value = partes.join('');

  } catch {
    display.value = "Error";
  }
}

/* NUEVO ★ — Raíz cuadrada */
function addSqrt() {
  const last = display.value.slice(-1);

  if (!isNaN(last) && last !== '') return;

  if (display.value === "0") {
    display.value = "√(";
    return;
  }

  display.value += "√(";
}

/* NUEVO ★ — Paréntesis inteligentes */
function addParenthesis() {
  const expr = display.value;
  const last = expr.slice(-1);

  const openCount = (expr.match(/\(/g) || []).length;
  const closeCount = (expr.match(/\)/g) || []).length;

  if (openCount === closeCount) {
    if (!isNaN(last)) return;
    display.value += "(";
    return;
  }

  if (openCount > closeCount) {
    if ("+-*/x÷".includes(last)) return;
    display.value += ")";
  }
}

/* CÁLCULO FINAL */
function calcular() {
  try {
    let expr = display.value;

    expr = expr.replace(/x/g, "*");
    expr = expr.replace(/×/g, "*");
    expr = expr.replace(/÷/g, "/");

    // √ reemplazar
    expr = expr.replace(/√\(/g, "Math.sqrt(");

    if (/[+\-*/.(]$/.test(expr)) throw new Error("Formato inválido");

    const resultado = eval(expr);

    if (!isFinite(resultado)) throw new Error("Math error");

    display.value = resultado;

    setTimeout(() => display.value = "0", 3000);

  } catch {
    display.value = "Error";
  }
}
