// cartSystem.js

class Product {
    constructor(productId, name, price, category) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.category = category;
    }
}

class CartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    totalPrice() {
        return this.product.price * this.quantity;
    }
}

class Cart {
    constructor() {
        this.items = [];
    }

    addToCart(product, quantity) {
        const existingItem = this.items.find(item => item.product.productId === product.productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push(new CartItem(product, quantity));
        }
    }

    removeFromCart(productId, quantity = null) {
        const itemIndex = this.items.findIndex(item => item.product.productId === productId);
        if (itemIndex !== -1) {
            if (quantity && this.items[itemIndex].quantity > quantity) {
                this.items[itemIndex].quantity -= quantity;
            } else {
                this.items.splice(itemIndex, 1);
            }
        }
    }

    viewCart() {
        if (this.items.length === 0) {
            console.log("Your cart is empty.");
        } else {
            let total = 0;
            console.log("Your Cart:");
            this.items.forEach(item => {
                const itemTotal = item.totalPrice();
                console.log(`${item.product.name} - Quantity: ${item.quantity}, Price: ${item.product.price.toFixed(2)} USD, Total: ${itemTotal.toFixed(2)} USD`);
                total += itemTotal;
            });
            console.log(`Total (before discounts): ${total.toFixed(2)} USD`);
        }
    }

    totalCost() {
        return this.items.reduce((sum, item) => sum + item.totalPrice(), 0);
    }
}

class Discount {
    constructor(name, category, discountType, value = null) {
        this.name = name;
        this.category = category;
        this.discountType = discountType;
        this.value = value;
    }

    applyDiscount(cart) {
        let discount = 0;
        cart.items.forEach(item => {
            if (item.product.category === this.category) {
                if (this.discountType === "percentage") {
                    discount += item.totalPrice() * (this.value / 100);
                } else if (this.discountType === "b1g1") {
                    const freeItems = Math.floor(item.quantity / 2);
                    discount += freeItems * item.product.price;
                }
            }
        });
        return discount;
    }
}

class CurrencyConverter {
    static rates = {
        "EUR": 0.85,
        "GBP": 0.75
    }

    static convert(amount, currency) {
        if (CurrencyConverter.rates[currency]) {
            return amount * CurrencyConverter.rates[currency];
        }
        return amount;
    }
}

class EcommerceSystem {
    constructor() {
        this.cart = new Cart();
        this.products = this.initializeProducts();
        this.discounts = this.initializeDiscounts();
    }

    initializeProducts() {
        return {
            "P001": new Product("P001", "Laptop", 1000.00, "Electronics"),
            "P002": new Product("P002", "Phone", 500.00, "Electronics"),
            "P003": new Product("P003", "T-Shirt", 20.00, "Fashion")
        };
    }

    initializeDiscounts() {
        return [
            new Discount("Buy 1 Get 1 Free on Fashion items", "Fashion", "b1g1"),
            new Discount("10% Off on Electronics", "Electronics", "percentage", 10)
        ];
    }

    listProducts() {
        console.log("Available Products:");
        for (const product of Object.values(this.products)) {
            console.log(`Product ID: ${product.productId}, Name: ${product.name}, Price: ${product.price.toFixed(2)} USD, Category: ${product.category}`);
        }
    }

    listDiscounts() {
        console.log("Available Discounts:");
        this.discounts.forEach((discount, index) => {
            console.log(`${index + 1}. ${discount.name}`);
        });
    }

    addToCart(productId, quantity) {
        if (this.products[productId]) {
            this.cart.addToCart(this.products[productId], quantity);
            console.log(`Added ${quantity} ${this.products[productId].name}(s) to your cart.`);
        } else {
            console.log("Invalid Product ID.");
        }
    }

    removeFromCart(productId, quantity) {
        this.cart.removeFromCart(productId, quantity);
        console.log("Item removed from cart.");
    }

    viewCart() {
        this.cart.viewCart();
    }

    applyDiscounts() {
        return this.discounts.reduce((totalDiscount, discount) => totalDiscount + discount.applyDiscount(this.cart), 0);
    }

    checkout() {
        const total = this.cart.totalCost();
        const discount = this.applyDiscounts();
        const finalTotal = total - discount;
        console.log("Applying discounts...");
        console.log(`Final Total in USD: ${finalTotal.toFixed(2)} USD`);
        
        const convert = prompt("Would you like to view it in a different currency? (yes/no): ").trim().toLowerCase();
        if (convert === 'yes') {
            console.log("Available Currencies: EUR, GBP");
            const currency = prompt("Enter currency: ").trim().toUpperCase();
            const convertedTotal = CurrencyConverter.convert(finalTotal, currency);
            console.log(`Final Total in ${currency}: ${convertedTotal.toFixed(2)}`);
        } else {
            console.log("Thank you for shopping!");
        }
    }
}

module.exports = EcommerceSystem;
