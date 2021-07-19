import padEnd from 'lodash/padEnd';
import { create, all } from 'mathjs/number';

const math = create(all);;

export function formatMoney(value, precision, groupSeparator = ',') {

  let num = '';

  const val = String(value);
  const cells = val.match(/^(-?)(\d*)(\.(\d+))?$/);

  if(!cells) {
    num = val;
  }else{
    const negative = cells[1];
    let int = cells[2] || '0';
    let decimal = cells[4] || '';

    int = int.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);

    if (typeof precision === 'number') {
      decimal = padEnd(decimal, precision, '0').slice(0, precision);
    }

    if (decimal) {
      decimal = `.${decimal}`;
    }

    num = `${negative}${int}${decimal}`;
  }

  return num;
}

// 相乘
export function multiply(arg1, arg2) {
  let { format, multiply, number } = math;
  return number(format(multiply(arg1, arg2), {precision: 14}));
}

// 相减
export function subtract(arg1, arg2) {
  let { format, subtract, number } = math;
  return number(format(subtract(arg1, arg2), {precision: 14}));
}

// 相加
export function add(arg1, arg2) {
  let { format, add, number } = math;
  return number(format(add(arg1, arg2), {precision: 14}));
}
// 除
export function divide(arg1, arg2) {
  let { format, divide, number } = math;
  return number(format(divide(arg1, arg2), {precision: 14}));
}


