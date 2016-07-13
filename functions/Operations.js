export function add(x, y) {
    return x + y;
}

export function subtract(x, y) {
    return x - y;
}

export function multiply(x, y) {
    return x * y;
}

export function divide(x, y) {
    return x / y;
}

export function clear(x, y) {
    return 0;
}

export function negate(x) {
    return x * -1;
}

export function percent(x) {
    return Number((x * 0.01).toFixed(12).replace(/0+$/, ''));
}
