# Применение принципов SOLID (TypeScript)

## Описание проекта

В рамках данной работы был рассмотрен и отрефакторен простой объектно-ориентированный код на TypeScript, моделирующий животных (`Animal`, `Dog`, `Cat`). Основная цель — продемонстрировать применение принципов SOLID для улучшения архитектуры, читаемости и расширяемости кода.

---

## Исходный код

```ts
abstract class Animal {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract makeSound(): void;

  introduce(): void {
    console.log(`My name is ${this.name}`);
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }

  makeSound(): void {
    console.log("гавгав");
  }
}

class Cat extends Animal {
  constructor(name: string) {
    super(name);
  }

  makeSound(): void {
    console.log("мяяяяоо");
  }
}

const dog = new Dog("Liza");
dog.introduce();
dog.makeSound();

const cat = new Cat("barsik");
cat.introduce();
cat.makeSound();
```

---

## Применение принципов SOLID

### 1. S — Single Responsibility Principle (Принцип единственной ответственности)

**Проблема:**
Класс `Animal` отвечает сразу за:

* хранение имени
* представление (introduce)
* поведение (makeSound)

**Решение:**
Разделим ответственность — вынесем вывод информации в отдельный сервис.

```ts
class AnimalPresenter {
  introduce(animal: Animal): void {
    console.log(`My name is ${animal['name']}`);
  }
}
```

Теперь:

* `Animal` — только модель
* `AnimalPresenter` — отвечает за вывод

---

### 2. O — Open/Closed Principle (Принцип открытости/закрытости)

Код уже соответствует принципу:

* Мы можем добавлять новые классы (`Bird`, `Cow`)
* Не изменяя существующий код

```ts
class Cow extends Animal {
  makeSound(): void {
    console.log("мууу");
  }
}
```

---

### 3. L — Liskov Substitution Principle (Принцип подстановки Лисков)

Все подклассы (`Dog`, `Cat`) корректно заменяют базовый класс `Animal`.

```ts
function makeAnimalSpeak(animal: Animal) {
  animal.makeSound();
}
```

Работает с любым наследником:

```ts
makeAnimalSpeak(new Dog("Liza"));
makeAnimalSpeak(new Cat("Barsik"));
```

---

### 4. I — Interface Segregation Principle (Принцип разделения интерфейсов)

Добавим интерфейсы для разделения обязанностей:

```ts
interface Soundable {
  makeSound(): void;
}

interface Introducible {
  introduce(): void;
}
```

Теперь классы могут реализовывать только нужные интерфейсы.

---

### 5. D — Dependency Inversion Principle (Принцип инверсии зависимостей)

Создадим абстракцию для вывода:

```ts
interface Output {
  log(message: string): void;
}

class ConsoleOutput implements Output {
  log(message: string): void {
    console.log(message);
  }
}
```

Используем зависимость от абстракции:

```ts
class AnimalPresenter {
  constructor(private output: Output) {}

  introduce(animal: Animal): void {
    this.output.log(`My name is ${animal['name']}`);
  }
}
```

---

## Итоговый улучшенный подход

* Код стал более модульным
* Легко расширяется (новые животные)
* Легко тестируется (можно подменять Output)
* Снижается связанность компонентов

---

## Используемые инструменты

* TypeScript
* IDE (VS Code / WebStorm)
* Git
* Markdown (для документации)

---

## Вывод

Применение принципов SOLID позволило:

* улучшить структуру проекта
* повысить читаемость кода
* подготовить систему к масштабированию

Даже на простом примере видно, как правильная архитектура упрощает разработку и поддержку.

---
