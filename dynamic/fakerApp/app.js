let faker = require("faker");
for (let i = 0; i < 10; ++i) {
  console.log(
    "Name: " + faker.name.findName() + ", price: " + faker.commerce.price()
  );
}
