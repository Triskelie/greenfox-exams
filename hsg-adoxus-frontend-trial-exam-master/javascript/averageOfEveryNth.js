/*
Készíts egy averageOfEveryNth nevű függvényt, ami két paramétert kér:

- egy numbers nevű tömböt pozitív integer-ekkel,
- egy n nevű pozitív integer-t.

A metódusnak azt az átlagot kell kiszámolnia,
amely a tömb minden n-edik eleméből származik és
vissza kell vele térnie.

Példák:

averageOfEveryNth([2, 4, 10, 34, 3, 16, 3, 21], 3);
Amivel vissza kellene térnie: 13, mert 10 és 16 átlaga 13.

averageOfEveryNth([2, 4, 10, 34, 3, 16, 3, 21], 2);
Amivel vissza kellene térnie: 18.75`, mert 4, 34, 16, 21 átlaga 18.75.

averageOfEveryNth([2, 4, 10, 34, 3, 16, 3, 21], 10);
Amivel vissza kellene térnie: 0, mert nincs érvényes elem.

A függvény paramétereket direkt nem tettük a példakódba,
a te feladatod, hogy megadd a függvény paramétereket

*/
function averageOfEveryNth(numbers, n) {
    if (n > numbers.length) {
        return 0;
    }
    let sum = 0;
    let count = 0;
    for (let i = 0; i < numbers.length; i++) {
        if ((i+1) % n == 0) {
            sum += numbers[i];
            count += 1;
        }
    }
    let average = sum / count;
    return average;
}

// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ INNEN FELFELE LÉVŐ DOLGOKAT SZERKESZTHETED ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
// ------ EZT A SORT ÉS AMI EZ ALATT VAN AZT NE TÖRÖLD, NE MÓDOSÍTSD, EZ ALÁ A SOR ALÁ NE ÍRJ SEMMIT,
// ------ KÜLÖNBEN NEM FOG MŰKÖDNI AZ ELLENŐRZŐ ÉS AUTOMATIKUSAN 0%-ot fog adni -----------

module.exports = averageOfEveryNth;
