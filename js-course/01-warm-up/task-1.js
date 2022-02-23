'use strict';

/**
 * Складывает два целых числа
 * @param {Number} a Первое целое
 * @param {Number} b Второе целое
 * @throws {TypeError} Когда в аргументы переданы не числа
 * @returns {Number} Сумма аргументов
 */
function abProblem(a, b) {
    if ((typeof(a) == "number") && (typeof(b) == "number")) {
        return a + b;
    } else {
        throw new TypeError();
    }
}


/**
 * Определяет век по году
 * @param {Number} year Год, целое положительное число
 * @throws {TypeError} Когда в качестве года передано не число
 * @throws {RangeError} Когда год – отрицательное значение
 * @returns {Number} Век, полученный из года
 */
function centuryByYearProblem(year) {
    if ((typeof(year) == "number") && (Number.isInteger(year))) {
        if (year > 0) {
            return Math.ceil(year / 100);
        } else {
            throw new RangeError();
        }
    } else {
        throw new TypeError();
    }
}

function toDecimal(a, b) {
    let ans = 0;
    let c, d;

    if ("a".charCodeAt(0) <= b.charCodeAt(0) && b.charCodeAt(0) <= "f".charCodeAt(0)) {
        c = b.charCodeAt(0) - "a".charCodeAt(0) + 10;
    } else {
        c = b.charCodeAt(0) - "0".charCodeAt(0)
    }
    
    if ("a".charCodeAt(0) <= a.charCodeAt(0) && b.charCodeAt(0) <= "f".charCodeAt(0)) {
        d = a.charCodeAt(0) - "a".charCodeAt(0) + 10;
    } else {
        d = a.charCodeAt(0) - "0".charCodeAt(0);
    }
    //console.log(c, d, a.charCodeAt(0), "0".charCodeAt(0), "a".charCodeAt(0), "f".charCodeAt(0));
    ans += c;
    ans += d * 16;
    return ans;
}


/**
 * Переводит цвет из формата HEX в формат RGB
 * @param {String} hexColor Цвет в формате HEX, например, '#FFFFFF'
 * @throws {TypeError} Когда цвет передан не строкой
 * @throws {RangeError} Когда значения цвета выходят за пределы допустимых
 * @returns {String} Цвет в формате RGB, например, '(255, 255, 255)'
 */
function colorsProblem(hexColor) {
    if (typeof(hexColor) === "string") {
        if (hexColor[0] != "#") throw new RangeError();
        if (hexColor.length != 4 && hexColor.length != 7) throw new RangeError();
        let s = (hexColor.slice(1)).toLowerCase();

        for (let i = 0; i < s.length; i++) {
            let j = s[i].charCodeAt(0);
            if (!(
                ("0".charCodeAt(0) <= j && j <= "9".charCodeAt(0)) || 
                ("a".charCodeAt(0) <= j && j <= "f".charCodeAt(0))
                )) {
                throw new RangeError()
            }
        }
        let str = '';
        if (s.length === 3) {
            for (let i = 0; i < 3; i++) str += s[i] + s[i];
        } else {
            str = s;
        }
        let ans = '('
        ans += toDecimal(str[0], str[1]) + ', ';
        ans += toDecimal(str[2], str[3]) + ', ';
        ans += toDecimal(str[4], str[5]) + ')';
        return ans;
    } else {
        throw new TypeError();
    }
}


/**
 * Находит n-ое число Фибоначчи
 * @param {Number} n Положение числа в ряде Фибоначчи
 * @throws {TypeError} Когда в качестве положения в ряде передано не число
 * @throws {RangeError} Когда положение в ряде не является целым положительным числом
 * @returns {Number} Число Фибоначчи, находящееся на n-ой позиции
 */
function fibonacciProblem(n) {
    if ((typeof(n) == "number")) {
        if (n >= 1 && Number.isInteger(n)) {
            let cache = [0, 1]
            for (let i = 2; i <= n; i++) {
                cache[i] = cache[i - 1] + cache[i - 2];
            }
            return cache[n];
        } else {
            throw new RangeError();
        }
    } else {
        throw new TypeError();
    }
}


/**
 * Транспонирует матрицу
 * @param {(Any[])[]} matrix Матрица размерности MxN
 * @throws {TypeError} Когда в функцию передаётся не двумерный массив
 * @returns {(Any[])[]} Транспонированная матрица размера NxM
 */
function matrixProblem(matrix) {
    if (Array.isArray(matrix)) {
        for (let i = 0; i < matrix.length; i++) {
            if (!(Array.isArray(matrix[i]))) throw new TypeError();
        }
    } else {
        throw new TypeError();
    }

    let n = matrix.length;
    let m = matrix[0].length;
    let res = [];
    for(let i = 0; i < m; i++) {
        res.push([]);
    }

    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            res[j].push(matrix[i][j]);
        }
    }
    return res;
}


/**
 * Переводит число в другую систему счисления
 * @param {Number} n Число для перевода в другую систему счисления
 * @param {Number} targetNs Система счисления, в которую нужно перевести (Число от 2 до 36)
 * @throws {TypeError} Когда переданы аргументы некорректного типа
 * @throws {RangeError} Когда система счисления выходит за пределы значений [2, 36]
 * @returns {String} Число n в системе счисления targetNs
 */
function numberSystemProblem(n, targetNs) {
    if ((typeof(n) === "number") && (typeof(targetNs) === "number") && (Number.isInteger(targetNs))) {
        if (!(2 <= targetNs && targetNs <= 36)) {
            throw new RangeError();
        }
        return n.toString(targetNs);
    } else {
        throw new TypeError();
    }
}


/**
 * Проверяет соответствие телефонного номера формату
 * @param {String} phoneNumber Номер телефона в формате '8–800–xxx–xx–xx'
 * @throws {TypeError} Когда в качестве аргумента передаётся не строка
 * @returns {Boolean} Если соответствует формату, то true, а иначе false
 */
function phoneProblem(phoneNumber) {
    if(typeof(phoneNumber) === "string") {
        if ((phoneNumber.substr(0, 6) != "8-800-") ||  phoneNumber.length != 15 ||
         phoneNumber[9] != "-" || phoneNumber[12] != "-") {
            return false;
        }
        if (phoneNumber[6] < "0" || "9" < phoneNumber[6]) return false;
        if (phoneNumber[7] < "0" || "9" < phoneNumber[7]) return false;
        if (phoneNumber[8] < "0" || "9" < phoneNumber[8]) return false;
        if (phoneNumber[10] < "0" || "9" < phoneNumber[10]) return false;
        if (phoneNumber[11] < "0" || "9" < phoneNumber[11]) return false;
        if (phoneNumber[13] < "0" || "9" < phoneNumber[13]) return false;
        if (phoneNumber[14] < "0" || "9" < phoneNumber[14]) return false;
        return true;
    } else {
        throw new TypeError();
    }
}


/**
 * Определяет количество улыбающихся смайликов в строке
 * @param {String} text Строка в которой производится поиск
 * @throws {TypeError} Когда в качестве аргумента передаётся не строка
 * @returns {Number} Количество улыбающихся смайликов в строке
 */
function smilesProblem(text) {
    if(typeof(text) === "string") {
        let ans = 0;
        for (let i = 0; i < text.length; i++) {
            if (text[i] === ":" && i + 2 < text.length) {
                if (text[i+1] === "-" && text[i+2] === ")") {
                    ans += 1;
                    i += 2
                }
            }
            
            if (text[i] === "(" && i + 2 < text.length) {
                if (text[i+1] === "-" && text[i+2] === ":") {
                    ans += 1;
                    i += 2
                }
            }
            
        }
        return ans;
    } else {
        throw new TypeError();
    }
}


function isWinSumbol(field, sumbol) {
    for (let i = 0; i < 3; i++) {
        if (field[i][0] === field[i][1] && field[i][1] === field[i][2] && field[i][0] === sumbol) return true;
    }

    for (let i = 0; i < 3; i++) {
        if (field[0][i] === field[1][i] && field[1][i] === field[2][i] && field[0][i] === sumbol) return true;
    }

    if (field[0][0] === field[1][1] && field[1][1] === field[2][2] && field[2][2] === sumbol) return true;
    if (field[0][2] === field[1][1] && field[1][1] === field[2][0] && field[2][0] === sumbol) return true;
    return false;
}

/**
 * Определяет победителя в игре "Крестики-нолики"
 * Тестами гарантируются корректные аргументы.
 * @param {(('x' | 'o')[])[]} field Игровое поле 3x3 завершённой игры
 * @returns {'x' | 'o' | 'draw'} Результат игры
 */
function ticTacToeProblem(field) {
    let ans1 = isWinSumbol(field, 'x');
    let ans2 = isWinSumbol(field, 'o');
    if (ans1 === ans2) {
        return 'draw';
    } else if (ans1) {
        return 'x';
    } else {
        return 'o';
    }
}

module.exports = {
    abProblem,
    centuryByYearProblem,
    colorsProblem,
    fibonacciProblem,
    matrixProblem,
    numberSystemProblem,
    phoneProblem,
    smilesProblem,
    ticTacToeProblem
};