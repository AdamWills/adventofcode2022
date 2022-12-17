type Operand = "+" | "-" | "*" | "/" | "%";
type Operation = { a: number | "old"; b: number | "old"; operand: Operand };
type TestResult = [number, number];
type Transaction = { worryLevel: number; throwToMonkeyToIndex: number };
type ReduceWorryLevelFunction = (x: number) => number;

class Monkey {
  name: string;
  startingItems: number[];
  operation: Operation;
  testDivisor: number;
  testResult: TestResult;
  inspectionCount: number;

  constructor(
    name: string,
    startingItems: number[],
    operation: Operation,
    testDivisor: number,
    testResult: TestResult,
  ) {
    this.name = name;
    this.startingItems = startingItems;
    this.operation = operation;
    this.testDivisor = testDivisor;
    this.testResult = testResult;
    this.inspectionCount = 0;
  }

  performOperation(worryLevel: number, operation: Operation) {
    const a: number = operation.a === "old" ? worryLevel : operation.a;
    const b: number = operation.b === "old" ? worryLevel : operation.b;
    switch (operation.operand) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return a / b;
      case "%":
        return a % b;
    }
  }

  inspectItem(
    worryLevel: number,
    reduceWorryLevel: ReduceWorryLevelFunction,
    debug: boolean,
  ): Transaction {
    this.inspectionCount++;
    if (debug) {
      console.log(
        `  Monkey inspects an item with a worry level of ${worryLevel}.`,
      );
    }
    let newWorryLevel = this.performOperation(worryLevel, this.operation);
    if (debug) {
      console.log(
        `    Worry level is ${this.operation.operand} by ${this.operation.b} to ${newWorryLevel}.`,
      );
    }
    newWorryLevel = reduceWorryLevel(newWorryLevel);
    if (debug) {
      console.log(
        `    Monkey gets bored with item. Worry level is reduced to ${newWorryLevel}.`,
      );
    }
    const testResult: boolean = newWorryLevel % this.testDivisor === 0;
    if (debug) {
      console.log(
        `    Current worry level is ${
          testResult ? "" : "not"
        } divisible by ${this.testDivisor}.`,
      );
    }
    const index: number = testResult ? 0 : 1;
    const monkeyToThrowTo: number = this.testResult[index];
    if (debug) {
      console.log(
        `    Item with worry level ${newWorryLevel} is thrown to monkey ${
          this.testResult[index]
        }.`,
      );
    }

    return {
      worryLevel: newWorryLevel,
      throwToMonkeyToIndex: monkeyToThrowTo,
    };
  }

  throwItem(transaction: Transaction, monkeys: Monkey[]) {
    // remove item from startingItems
    const index = this.startingItems.indexOf(transaction.worryLevel);
    this.startingItems.splice(index, 1);
    // add item to new monkey
    monkeys[transaction.throwToMonkeyToIndex].startingItems.push(
      transaction.worryLevel,
    );
  }

  takeTurn(
    monkeys: Monkey[],
    reduceWorryLevel: ReduceWorryLevelFunction,
    debug = false,
  ) {
    if (debug) console.log(`${this.name}:`);
    const results: Transaction[] = [];
    this.startingItems.forEach((item) => {
      results.push(this.inspectItem(item, reduceWorryLevel, debug));
    });
    results.forEach((result) => {
      this.throwItem(result, monkeys);
    });
  }
}

export default Monkey;
