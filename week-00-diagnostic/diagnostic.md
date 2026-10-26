# Diagnostic — Questions

Write your answer under each question, after **Answer:**.
Mark guesses with `(guess)`. "I don't know" is fine.
Unless stated otherwise, assume the code runs in a modern browser or Node, as an ES module (strict mode).

---

## 1. Types & coercion

### 1.1 What does this print?

```js
console.log(typeof null);
console.log(typeof []);
console.log(typeof NaN);
```

**Answer:**
console.log(typeof null); -> false
console.log(typeof []); -> true
console.log(typeof NaN); -> false

### 1.2 What does this print?

```js
console.log("5" + 3);
console.log("5" - 3);
console.log(0 == "");
console.log(null ?? "default", 0 || "default");
```

**Answer:**
console.log('5' + 3); 53 + превръща следвашия елемент във стринг
console.log('5' - 3); 2 "-" превръща стринга в число
console.log(0 == ''); true защото == сравнява по стойност а === сравнява по тип и стойности
console.log(null ?? 'default', 0 || 'default'); default default. В случая всичко е false затова връща първата true стойност. при "??" приема null като falsy, но ако беше 0 ?? 'default' щеше да върне 0 защото "??" ще направи изключение за 0.

### 1.3 Which of these values are falsy?

`0`, `'0'`, `''`, `[]`, `{}`, `null`, `NaN`, `'false'`, `undefined`

**Answer:**
0, null, NaN, false, undefined Мисля, че и '0' Но тя е и стринг затова не съм сигурен.

### 1.4 (open)

What's the difference between `==` and `===`? Which one do you use, and why?

**Answer:**
"==" сравнява по стойност, "===" сравнява по тип и стойност. I will use "===" because its strict.

---

## 2. Scope & hoisting

### 2.1 What happens?

```js
console.log(a);
var a = 1;
console.log(b);
let b = 2;
```

**Answer:**
a -> will be undefined, b -> error because it is in the temporary deadzone

### 2.2 What does this print? What changes if you replace `var` with `let`?

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
```

**Answer:**
If we change it with let it will be 0 1 2, but if it is var it will be 3 3 3, but I dont know why.

### 2.3 What does this print?

```js
const x = "global";

function printX() {
  console.log(x);
}

function run() {
  const x = "local";
  printX();
}

run();
```

**Answer:**
global, becasue const x = 'local' lives only in the functional scope of the function run() and printX() dont have access to it. Also we do not return it nowhere.

---

## 3. References & copying

### 3.1 What does this print?

```js
const a = { name: "Ana" };
const b = a;
b.name = "Ivan";
console.log(a.name);
console.log({} === {});
```

**Answer:**
console.log(a.name); -> "Ivan" because we have two keys pointing the same object
console.log({} === {}); false because there are two different keys.

### 3.2 What does this print?

```js
const user = { name: "Ana", address: { city: "Sofia" } };
const copy = { ...user };
copy.name = "Ivan";
copy.address.city = "Plovdiv";
console.log(user.name, user.address.city);
```

**Answer:**
console.log(user.name, user.address.city); -> Това ще го обясня на български, че ми е трудно на английски. Значи user.name Ще бъде Ana, защото примитивите се копират като pass-by-value, обаче обектите са pass-by-reference и реално и двата ключа сочат към един обект. Тоест copy-то като променя name си го променя само за себе си защото се е копирала изцяло нова променлива name, но обекта вътре го ползват и user и copy.

### 3.3 (open)

In React, why doesn't this update the UI? How would you fix it?

```jsx
const [user, setUser] = useState({ name: "Ana" });

function rename() {
  user.name = "Ivan";
  setUser(user);
}
```

**Answer:**
I haven't learn React yet, but I'm pretty sure that we need to return it?

---

## 4. Functions, `this`, closures

### 4.1 What does this print?

```js
function makeCounter() {
  let count = 0;
  return () => ++count;
}

const c1 = makeCounter();
const c2 = makeCounter();
c1();
c1();
console.log(c1(), c2());
```

**Answer:**
3, 1 -> we call c1 - 3 times and c2 only 1 time

### 4.2 What happens on each `console.log`?

```js
const user = {
  name: "Ana",
  greet() {
    return `Hi, ${this.name}`;
  },
};

console.log(user.greet());

const greet = user.greet;
console.log(greet());
```

**Answer:**

console.log(user.greet()); -> Hi, Ana
console.log(greet()); -> this will be undefined.

### 4.3 (open)

What is a closure? Give an example where you'd actually use one.

**Answer:**
Closure е махнизъм в JavaScript, чрез който функцията запазва жив достъп до променливите вътре в нея от заобикалящия ги lexical scope, дори след като изпълнението на родителската функция е приключило.

Все едно да напуснеш някой апартамент, но все още да имаш ключ за него и когато искаш да можеш да ходиш.

### 4.4 (open)

What's the difference between `call`, `apply` and `bind`?

**Answer:**
call & apply задават стойността на this и извикват функцията.
Разликата между двете е в начина на извикване, при едните се използва array, а при другите обект.
bind е нещо като договор, където "бинд-ваш" както ще е this, но не го извикваш.

---

## 5. Modern syntax & arrays

### 5.1 What does this print?

```js
const { name, age = 30, ...rest } = { name: "Ana", city: "Sofia", role: "dev" };
console.log(name, age, rest);
```

**Answer:**
Ana 30 { city: 'Sofia', role: 'dev' } - оператора рест извиква останалата част.

### 5.2 What does this print?

```js
const user = { profile: null };
console.log(user.profile?.email);
console.log(user.settings?.theme ?? "light");
```

**Answer:**
console.log(user.profile?.email); => undefined, but if it wasn't "?" it will be an error it prevents when we don't know if there is a profile in the object.
console.log(user.settings?.theme ?? 'light'); "light" because if there is not theme settled it returns the true value which is light

### 5.3 What does this print?

```js
const nums = [1, 2, 3, 4, 5];
console.log(nums.filter((n) => n % 2).map((n) => n * 10));
console.log(nums.reduce((acc, n) => acc + n, 0));
console.log([10, 1, 2].sort());
```

**Answer:**
console.log(nums.filter((n) => n % 2).map((n) => n _ 10)); -> filter will return only the odd numbers which are 1, 3, 5
map will return every odd number _ 10 so it will be 10, 30, 50

console.log(nums.reduce((acc, n) => acc + n, 0)); reduce will reduce everything to one element and in this case it will acumulate 1+2+3+4+5 = 15

console.log([10, 1, 2].sort()); somebody will expect that they will be sorted 1,2 and 10, but sort() will make them sorted alphabeticaly if we want ascending order we need to use toSorted()

### 5.4 (open)

Which array methods **change** (mutate) the original array? Name as many as you can.

**Answer:**
push, unshift, pop, shift, splice, reverse, sort and fill

---

## 6. DOM & events

### 6.1 (open)

You have a `<ul>` with 1000 `<li>` items. Items are added and removed dynamically. How would you handle a click on any item? Why that way?

**Answer:**
I will use handleClick but I will call it without () otherwise it will be executed instantly. I will add addEventListerner with on "click" and I will select the elements of li with queryselector

### 6.2 (open)

What's the difference between `event.target` and `event.currentTarget`?

**Answer:**
I'm not sure.

### 6.3 (open)

What do `event.preventDefault()` and `event.stopPropagation()` do? Give an example for each.

**Answer:**
event.preventDefault() is used to protect the default from the browser so it won't break.

---

## 7. OOP & modules

### 7.1 What does this print?

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  speak() {
    return `${super.speak()} — woof`;
  }
}

console.log(new Dog("Rex").speak());
```

**Answer:**
I dont know

### 7.2 (open)

What is a prototype in JavaScript? How are `class` and prototypes related?

**Answer:**

I dont know

### 7.3 (open)

What's the difference between `export default` and named exports? Which do you prefer and why?

**Answer:**

---

## 8. Async

### 8.1 In what order are the numbers printed?

```js
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
```

**Answer:**

I am not familiar with async programing.

### 8.2 What does this print?

```js
async function getData() {
  return 42;
}

const result = getData();
console.log(result);
```

**Answer:**

I dont know

### 8.3 (open)

This works, but a reviewer says it's slow. Why? How would you make it faster? Anything else missing?

```js
async function loadUsers(ids) {
  const users = [];
  for (const id of ids) {
    const user = await fetchUser(id);
    users.push(user);
  }
  return users;
}
```

**Answer:**

I dont know

### 8.4 (open)

What's the difference between `Promise.all` and `Promise.allSettled`?

**Answer:**
No idea

---

## 9. About you

### 9.1 What do you use JavaScript for at work right now? What did your last React task look like?

**Answer:**

### 9.2 Rate yourself from 1 (never heard of it) to 5 (could teach it)

| Topic                                     | 1–5 |
| ----------------------------------------- | --- |
| Types, `==` vs `===`, truthy/falsy        | 5   |
| Scope, hoisting                           | 5   |
| `this`                                    | 3   |
| Closures                                  | 4   |
| Destructuring, spread, `?.`, `??`         | 4   |
| Array methods (`map`, `filter`, `reduce`) | 5   |
| DOM & events                              | 3   |
| Classes & prototypes                      | 1   |
| Modules, npm, bundlers                    | 1   |
| Promises, async/await                     | 1   |
| Debugging with breakpoints                | 1   |
| Git                                       | 5   |

### 9.3 Which topic scares you the most?

**Answer:**

I am not familiar with OOP and Async Await I think I MUST learn it 100%
About Debugging with breakpoints I dont think that in 2026 it is useful, but you will tell me.
About Closures I think I need a little lesson so master it.
About DOM & Events I need lessons.

### 9.4 After 8 weeks, what do you want to be able to do that you can't do now?

**Answer:**
In 8 weeks I want to master JavaScript in the way that I can pass junior and mid level interview questions and coding tasks.
