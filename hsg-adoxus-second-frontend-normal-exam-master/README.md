# Félidős vizsga

## Kezdeti lépések

- Fork-old ezt a repository-t a saját accountodra
- Klónozd a fork-olt repository-t az GitHub accountodból a saját számítógépedre
- Szükség esetén készíts egy `.gitignore` file-t, hogy a generált file-ok ne szerepeljenek
  a commitodban
- Commitolj gyakran és az üzenetek legyenek elég leíróak
- Minden válasz és megoldás kerüljön a repositoryba
- A mellékelt kiinduló projektek kódjain lehet és kell is változtatni, akár új fájlt is létre szabad hozni.

## Tartsd észben

- Bármilyen online forrást használhatsz, de **kérlek dolgozz egyedül!**

- **Ne csak copy-paste-eld** a válaszokat és megoldásokat,
  inkább használd a saját stílusadat, szavaidat, változóidat.
  Ha nem érted, amit találtál, akkor ne használd!

- A vizsga után szúrópróba szerűen ellenőrizhetjük, hogy valóban érted-e a megoldást, amit használtál.

- **Ne push-olj** GitHub-ra, amíg a mentorod be nem jelenti, hogy eljött az idő

- Az utolsó 1 órában ajánljuk a megoldásod feltöltését
  [GradeScope-ba](https://www.gradescope.com/courses/328822/assignments/1651665) **zip**pel tömörített formátumban
  
- Elméleti vizsga délután 15:00-ig ajánlott elkezdeni, később már nem biztosított az 1 óra időtartam. [Link](https://www.gradescope.com/courses/328822/assignments/1705310)

- Ha az adott feladat nem fordul le / nem indítható el, vagyis ha szintaktikai hibát tartalmaz, akkor az 0 pont.

- Ügyelj a formázásra is!

- Ha megoldottál egy feladatot, olvasd át újra feladatleírást!

# Feladatok

- a létrehozott `javascript` könyvtáron belül dolgozz, a feladatoknak megfelelő mappában.
- használd az `export` / `import` utasításokat (NE a CommonJS-t, vagyis ne a `module.exports`-ot)
- minden osztály külön fájlba kerüljön

## 1. Feladat: Rajzoljunk egy fát csillagokból! (20 pont)

Készíts egy `drawTree` függvényt, amely egy fát rajzol ki a console-ra:
- egyetlen szám paramétert vár, ami az eredmény sorainak számát fogja tartalmazni
- a bemeneti paraméter értéke 4 vagy annál nagyobb. Ha nem teljesül, akkor dobjon hibát.
- annyi sort irat ki, mint amennyi a bemeneti paratméterben lett megadva

A `drawTree.js` fájlba dolgozz.
Figyelj a bemeneti paraméter validálására is (dobj hibát)!
  
### 1. Példa

#### Bemenet
```javascript
drawTree(4);
```

#### Console kimenet

A sorok elején nincsen space, csak úgy látszik, mintha lenne :)

```text
  *
 ***
*****
  *
```

### 2. Példa

#### Bemenet
```javascript
drawTree(5);
```

#### Console kimenet

A sorok elején nincsen space, csak úgy látszik, mintha lenne :)

```text
   *
  ***
 *****
*******
   *
```

## 2. feladat: FizzBuzz számok listája (35 pont)

Készíts egy `generateFizzBuzzNumbers()` függvényt,
ami visszaadja 1-től számolva a 3-mal vagy 5-tel osztható számokat a paraméterben
megadott számig (inclusive):
- Egyetlen pozitív egész szám paramétert vár
- egy **szám (integer) listával tér vissza**, ami tartalmazza
  1-től a 3-mal vagy 5-tel osztható számokat a függvény paraméteréig megadott számig
- Ha nem talált egyetlen ilyen számot se, akkor üres listával tér vissza.

A `generateFizzBuzzNumbers.js` fájlba dolgozz.
Figyelj a bemeneti paraméter validálására is (dobj hibát)!
  
### 1. Példa

#### Bemenet

```javascript
generateFizzBuzzNumbers(2);
```

#### Visszatérési érték

```javascript
[]
```

### 2. Példa

#### Bemenet

```javascript
generateFizzBuzzNumbers(20);
```

#### Visszatérési érték

```javascript
[3, 5, 6, 9, 10, 12, 15, 18, 20]
```

## 3. feladat: Bookshelf (könyvespolc) (45 pont)

Készíts egy programot, ami könyveket tud tárolni egy könyvespolcban.

2 típusú könyv létezik: keménykötésű (Hardcover) és papírkötésű (Paperback).

A feladat megoldása tartalmazzon öröklődést is.

#### Book (könyv)

- Az osztály neve legyen: `Book`
- Minden könyvnek legyen:
  - címe (`title`)
  - szerzője (`author`)
  - kiadási éve (`releaseYear`)
  - oldalak száma (`numberOfPages`)
  - tömege gramban mérve (`weightInGram`)
- Legyen egy `getBookInfo()` függvénye, ami egy stringgel tér vissza
  a következő formátumban: `<author>: <title> (<releaseYear>)`
  - Példa: `J. K. Rowling: Harry Potter and the Philosopher's Stone (1997)`
  

#### Keménykötésű könyv (HardcoverBook)

- Az osztály neve legyen: `HardcoverBook`
- a `constructor` a következő sorrendben várja a paramtéreket:
  - cím (`title`)
  - szerző (`author`)
  - kiadási év (`releaseYear`)
  - oldalak száma (`numberOfPages`)
- 1 oldal tömege: 10 gram
- A keménykötésű borító tömege: 100 gram
- A keménykötésű könyv tömegét (`weightInGram`) az oldalak tömegének összege
  és a keménykötésű borító tömegének összege alapján kapjuk meg

#### Papírkötésű könyv (PaperbackBook)

- Az osztály neve legyen: `PaperbackBook`
- a `constructor` a következő sorrendben várja a paramtéreket:
  - cím (`title`)
  - szerző (`author`)
  - kiadási év (`releaseYear`)
  - oldalak száma (`numberOfPages`)
- 1 oldal tömege: 10 gram
- A papírkötésű borító tömege: 20 gram
- A papírkötésű könyv tömegét (`weightInGram`) az oldalak tömegének összege
  és a papírkötésű borító tömegének összege alapján kapjuk meg

#### Könyvespolc (Bookshelf)

- Az osztály neve legyen `Bookshelf`
- Legyen egy `addBook()` függvénye, aminek segítségével a paraméterben 
  megadott könyvet el lehet tárolni a polcban
- Legyen egy `getBooks()` függvénye, aminek legyen egy `year` paramétere.
  Azon könyveket adja vissza egy listában / tömbben,
  amik a `year` évében lettek kiadva.
- Legyen egy `getLightestAuthor()` függvénye,
  ami visszaadja annak a szerzőnek a nevét,
  aki a legkönnyebb könyvet írta.
- Legyen egy `getAuthorOfMostWrittenPages()` függvénye,
  ami visszaadja annak a szerzőnek a nevét, aki a legtöbb oldalt írta összesen.
- Legyen egy `printBooks()` függvénye, ami kiírja az összes könyv adatát,
  vagyis soronként kiírja a könyvek `getBookInfo()` visszatérési értékét.
