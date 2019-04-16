import { assert } from 'chai';
import { isObservable, getObservable, observable, observableProperty } from '../../src/decorators/observable';

@observable
class Person {
    @observableProperty
    pets: any[];
    name: string;
    age: number;

    constructor(name: string, age: number, pets?: any[]) {
        this.name = name;
        this.age = age;
        this.pets = pets || [1, 2, 3];
    }

    say() {
        console.log('SAY');
    }
}

//@observable
class Animal {
    nickname: string;
    limbs: string[];

    constructor(nickname: string, limbs?: string[]) {
        this.nickname = nickname;
        this.limbs = limbs || [];
    }
}



describe("decorators/observable", () => {
    describe("mock classes", () => {
        it("is Observable", () => {
            const person = new Person('Name', 15);
            assert(isObservable(person));
        })
        // it("", (done) => {
        //     const animal = new Animal('sdf')
        //     const person = new Person('Name', 15);
        //     const person2 = new Person('sdf', 123);
        //     const obs = getObservable(person);
        //     assert(person.pets === person2.pets);
        //     obs && obs.subscribe((arr: any) => {
        //         console.log(arr);
        //         assert(true);
        //         done();
        //     })
        //     person.pets.push(animal)
        // })
        it("primitive change was observed", (done) => {
            const person = new Person('Name', 15);
            const obs = getObservable(person);
            const expectedValue = 'Petya';
            const oldName = person.name;
            obs && obs.subscribe((obj: any) => {
                assert.notEqual(oldName, obj.name);
                assert.equal(obj.name, expectedValue);
                done();
            })
            person.name = expectedValue;
        })
        it("new object is observable", (done) => {
            const person = new Person('Name', 15);
            const obs = getObservable(person);
            obs && obs.subscribe((obj: any) => {
                assert(isObservable(obj));
                done();
            })
            person.name = 'newName';
        })
        it("primitive change to itself wasn't observed", (done) => {
            const constName = 'Name';
            const person = new Person(constName, 15);
            const obs = getObservable(person);
            const timerId = setTimeout(() => {
                assert(true);
                done();
            }, 50)
            obs && obs.subscribe((obj: any) => {
                clearTimeout(timerId);
            })
            person.name = constName;
        })
        it("2 changes 2 submits", (done) => {
            const person = new Person('Name', 15);
            const obs = getObservable(person);
            let i = 0;
            obs && obs.subscribe((obj: any) => {
                i++;
            })
            person.age = 5;
            person.age = 15;
            setTimeout(() => {
                assert(i === 2)
                done()
            }, 50);
        })
        it("new Object", (done) => {
            const person = new Person('Name', 15);
            const obs = getObservable(person);
            obs && obs.subscribe((obj: any) => {
                assert.notEqual(obj, person);
                done();
            });
            person.age = 1;
        })
        it("only one change", (done) => {
            const person = new Person('Name', 15);
            const obs = getObservable(person);
            const oldName = person.name;
            const oldAge = person.age;
            const oldPets = person.pets;
            obs && obs.subscribe((obj: any) => {
                assert.notEqual(obj.name, oldName);
                assert.equal(obj.age, oldAge);
                assert.equal(oldPets, obj.pets);
                done();
            })
            person.name = 'Masha';
        })
        it("array change was observed", (done) => {
            const animal_1 = new Animal('animal_1');
            const animal_2 = new Animal('animal_2');
            const person = new Person('Name', 15, [animal_1]);
            const oldPet = person.pets[0];
            const obs = getObservable(person);
            obs && obs.subscribe((obj: any) => {
                assert.equal(oldPet, obj.pets[0]);
                done();
            })
            person.pets.push(animal_2);
        })
        it("array was observed few times", (done) => {
            const animal_1 = new Animal('animal_1');
            const animal_2 = new Animal('animal_2');
            const person = new Person('Name', 15);
            let newPerson;
            const obs = getObservable(person);
            const dispose = obs && obs.subscribe((obj: any) => {
                newPerson = obj;
                const obs = getObservable(newPerson);
                obs.subscribe(() => {
                    assert(true);
                    done();
                })
                dispose.dispose();
                newPerson.pets.push(animal_2);
            })
            person.pets.push(animal_1);
        })
        it("unsubscribe with primitive fields", (done) => {
            const person = new Person('Name', 15);
            const obs = getObservable(person);
            let i = 0;
            const unsubscribe = obs && obs.subscribe(() => {
                i++;
            })
            person.age = 1;
            person.name = 'Masha';
            unsubscribe && unsubscribe.dispose();
            person.age = 14;
            person.name = 'Vypsen';
            setTimeout(() => {
                assert(i === 2)
                done()
            }, 50);
        })
    })
    describe("reflect metadata", () => {
        it("metadata exist after del", () => {
            const person = new Person('name', 12);
            delete (person as any).__proto__.pets;
            assert((person as any).__proto__.pets === undefined);
            assert(Reflect.getMetadata("observableProperty", person, 'pets'));
        })
    })
})