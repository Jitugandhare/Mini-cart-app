// index.js
const prompt = require('prompt-sync')();
const EcommerceSystem = require('./cartSystem');

const system = new EcommerceSystem();

function main() {
    console.log("Welcome to the Mini E-commerce Cart System!");
    system.listProducts();

    while (true) {
        const command = prompt("> ").trim().toLowerCase();
        
        if (command.startsWith("add_to_cart")) {
            const [_, productId, quantity] = command.split(" ");
            system.addToCart(productId, parseInt(quantity));
        }

        else if (command === "view_cart") {
            system.viewCart();
        }

        else if (command.startsWith("remove_from_cart")) {
            const [_, productId, quantity] = command.split(" ");
            system.removeFromCart(productId, parseInt(quantity));
        }

        else if (command === "list_discounts") {
            system.listDiscounts();
        }

        else if (command === "checkout") {
            system.checkout();
            break;
        }

        else if (command === "exit") {
            console.log("Exiting the system.");
            break;
        }

        else {
            console.log("Invalid command.");
        }
    }
}

main();
