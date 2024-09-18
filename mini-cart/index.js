const prompt = require('prompt-sync')();

const EcommerceSystem = require('./cartSystem');

const system = new EcommerceSystem();

function main() {
    console.log("Welcome to the Mini E-commerce Cart System!");
    system.listProducts();

    while (true) {
        const input = prompt("> ").trim();
        const [command, ...args] = input.split(" ");

        switch (command) {
            case "add_to_cart":
                if (args.length === 2) {
                    const productId = args[0];
                    const quantity = parseInt(args[1]);
                    if (!isNaN(quantity)) {
                        system.addToCart(productId, quantity);
                    } else {
                        console.log("Invalid quantity.");
                    }
                } else {
                    console.log("Usage: add_to_cart <productId> <quantity>");
                }
                break;

            case "remove_from_cart":
                if (args.length === 2) {
                    const productId = args[0];
                    const quantity = parseInt(args[1]);
                    if (!isNaN(quantity)) {
                        system.removeFromCart(productId, quantity);
                    } else {
                        console.log("Invalid quantity.");
                    }
                } else {
                    console.log("Usage: remove_from_cart <productId> <quantity>");
                }
                break;

            case "view_cart":
                system.viewCart();
                break;

            case "list_discounts":
                system.listDiscounts();
                break;

            case "checkout":
                system.checkout();
                return;

            case "exit":
                console.log("Exiting the system.");
                return;

            default:
                console.log("Invalid command.");
        }
    }
}

main();
