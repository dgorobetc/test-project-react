import { faker } from '@faker-js/faker';

export function createData() {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: Math.floor(Math.random() * (50 - 10 + 1) + 10),
    city: faker.address.city(),
    street: faker.address.street(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
    company: faker.company.bs(),
  };
}