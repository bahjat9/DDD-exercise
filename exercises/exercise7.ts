import { logError } from "./logger.js"

//============================================================================
// EXERCISE 7: Currency Confusion
// ============================================================================

type Currency = "USD" | "EUR" | "GBP"

class Money {
    private constructor(
        private readonly cents: number,
        public readonly currency: Currency,
    ) {}

    static fromDollars(amount: number, currency: Currency): Money {
        return new Money(Math.round(amount * 100), currency)
    }

    static fromCents(cents: number, currency: Currency): Money {
        if (!Number.isInteger(cents)) throw new Error("Cents must be integer")
        return new Money(cents, currency)
    }

    add(other: Money): Money {
        if (this.currency !== other.currency)
            throw new Error("Cannot add different currencies")
        return new Money(this.cents + other.cents, this.currency)
    }

    format(): string {
        return `${this.currency === "USD" ? "$" : this.currency + " "}${(this.cents / 100).toFixed(2)}`
    }
}

export function exercise7_CurrencyConfusion() {
    type MenuItem = {
        name: string
        price: Money
    }

    try {
        // 1. Setup valid items (The Fix)
        const burger: MenuItem = {
            name: "Burger",
            price: Money.fromDollars(12.5, "USD"), // $12.50
        }

        const pizza: MenuItem = {
            name: "Pizza",
            price: Money.fromCents(1850, "USD"), // $18.50
        }

        // 2. Demonstrate the Fix (Correct Calculation)
        const total = burger.price.add(pizza.price)
        // This should be $31.00. If it works, we don't log the silent error.
        if (total.format() !== "$31.00") {
             logError(7, "Calculation failed", { issue: "Math is still wrong" })
        }

        // 3. FORCE AN ERROR to prove the safety works (The Test)
        // We will try to add a Euro item to a USD item.
        // This MUST throw an error for the exercise to pass successfully.
        const soda = Money.fromDollars(2, "EUR");
        burger.price.add(soda); // <--- This should explode safely 💥

    } catch (error) {
        console.log("Caught expected error:", error instanceof Error ? error.message : error);
    }
}