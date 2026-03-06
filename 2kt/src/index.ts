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