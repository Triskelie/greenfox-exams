/*
Készíts egy függvényt, amely egy string-et kér paraméterként és
ellenőrzi, hogy a . írásjelek után az első betűk nagybetűk-e és
egy booleannel (logikai értékkel) tér vissza.

Példák:

grammarCheck("Ez egy jó példa. Ez egy jó példa.");
Amivel vissza kellene térnie: true

grammarCheck("ez még mindig egy jó példa. Hiszen a második mondat nagybetűvel kezdődik.");
Amivel vissza kellene térnie: true

grammarCheck("Ez egy rossz példa. itt nincs nagybetű.");
Amivel vissza kellene térnie: false

A függvény paramétereket direkt nem tettük a példakódba,
a te feladatod, hogy megadd a függvény paramétereket
*/

function grammarCheck(text) {
    let result = true;
    while (text.indexOf(".") !== -1) {
        if (text.indexOf(".") + 2 < text.length) {
            let firstLetter = text.charAt(text.indexOf(".") + 2);
            if (firstLetter == firstLetter.toLowerCase()) {
                result = false;
            }
        }
        text = text.replace(".", "");
    }
    return result;
}

// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ INNEN FELFELE LÉVŐ DOLGOKAT SZERKESZTHETED ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
// ------ EZT A SORT ÉS AMI EZ ALATT VAN AZT NE TÖRÖLD, NE MÓDOSÍTSD, EZ ALÁ A SOR ALÁ NE ÍRJ SEMMIT,
// ------ KÜLÖNBEN NEM FOG MŰKÖDNI AZ ELLENŐRZŐ ÉS AUTOMATIKUSAN 0%-ot fog adni -----------

module.exports = grammarCheck;
