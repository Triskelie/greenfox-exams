# Adoxus algoritmusos próba vizsga

## Kezdeti lépések

- Fork-old ezt a repository-t a saját account-odra
- Klónozd a fork-olt repository-t a saját számítógépedre
- Készíts egy `.gitignore` file-t, hogy a generált file-ok ne szerepeljenek
  a commit-odban
- Commit-olj gyakran és az üzenetek legyenek elég deskriptívek
- Minden válasz és megoldás kerüljön ebbe a repository-ba
- Ebbe a [Gradescope assignmentbe](https://www.gradescope.com/courses/328822/assignments/1606285) töltsd fel a megoldásod zippelt (tömörített) formában

## Tartsd észben

- Bármilyen online forrást használhatsz, de **kérlek dolgozz egyedül!**

- **Ne csak copy-paste-eld** a válaszokat és megoldásokat,
  inkább használd a saját szavaidat

- **Ne push-olj** GitHub-ra, amíg a mentorod be nem jelenti, hogy eljött az idő

## Feladatok

### __1. Censor__

Készíts egy függvényt, amely három string-et (karakterláncot) kér paraméterként
és egy string-gel tér vissza. Az első string (`text`) az a szöveg, amit a
függvénynek meg kell majd változtatnia. A második string (`originalWord`)
lesz az, amit minden előfordulása során a harmadik string-re (`newWord`)
kell megváltoztatni, majd a függvénynek az eredménnyel visszatérnie.

**Fontos**, hogy nem használhatod egyik beépített helyettesítő (replace) függvényt sem!

Példa:

```javascript
censor("A kedvenc gyümölcsöm a(z) alma", "alma", "banán");
```

Amivel vissza kellene térnie: `"A kedvenc gyümölcsöm a(z) banán"`.

### __2. ThreeSum__

Készíts egy `threeSum` nevű függvényt, ami

- egy integer (egész szám) tömböt (`array`) kér inputként,
- talál 3 *különböző* elemet
  (az értékük megegyezhet, de az indexük különböző kell legyen)
  a tömbben, megkeresi a 3 legkissebb elem összegét és
- visszatér a legkisebb összeggel integer-ként.
- -1-gyel tér vissza, ha a tömb mérete kisebb, mint 3.

Példák:

```javascript
threeSum([1, 2, 3, 4, 5]);
```

Amivel vissza kellene térnie: `6`, mert `1`, `2` és `3`
adja a legkisebb összeget.

```javascript
threeSum([100, 450, 200, 5]);
```

Amivel vissza kellene térnie: `305`, mert `100`, `200` és `5`
adja a legkisebb összeget.

```javascript
threeSum([1, 2]);
```

Amivel vissza kellene térnie: `-1` mert nincs 3 különböző szám a tömbben.

### __3. Grammar check__

Készíts egy függvényt, amely egy string-et (`text`) kér paraméterként és
ellenőrzi, hogy a `.` írásjelek után az első betűk nagybetűk-e és
egy boolean-nel (logikai értékkel) tér vissza.

Példák:

```javascript
grammarCheck("Ez egy jó példa. Ez egy jó példa.");
```

Amivel vissza kellene térnie: `true`.

```javascript
grammarCheck("ez még mindig egy jó példa. Hiszen a második mondat nagybetűvel kezdődik.");
```

Amivel vissza kellene térnie: `true`.

```javascript
grammarCheck("Ez egy rossz példa. itt nincs nagybetű.");
```

Amivel vissza kellene térnie: `false`.

## __4. Average of every `n`th element__

Készíts egy `averageOfEveryNth` nevű függvényt, ami két paramétert kér:

- egy `numbers` nevű tömböt pozitív integer-ekkel,
- egy `n` nevű pozitív integer-t.

A metódusnak azt az átlagot kell kiszámolnia,
amely a tömb minden `n`-edik eleméből származik és
vissza kell vele térnie.

Példák:

```javascript
averageOfEveryNth([2, 4, 10, 34, 3, 16, 3, 21], 3);
```

Amivel vissza kellene térnie: `13`, mert `10` és `16` átlaga `13`.

```javascript
averageOfEveryNth([2, 4, 10, 34, 3, 16, 3, 21], 2);
```

Amivel vissza kellene térnie: `18.75`, mert `4`, `34`, `16`, `21` átlaga `18.75`.

```javascript
averageOfEveryNth([2, 4, 10, 34, 3, 16, 3, 21], 10);
```

Amivel vissza kellene térnie: `0`, mert nincs érvényes elem.
