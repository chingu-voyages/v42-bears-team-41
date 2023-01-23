import { faker } from "@faker-js/faker";

export function createSampleStyckerCardData() {
  return {
    user: {
      name: faker.name,
      //avatar_url: ???
    },
    title: faker.company.name(),
    description: faker.lorem.paragraph(), // best thing I could find as a placeholder
  };
}
export function createSampleStyckerCardDataArray(numberOfItems) {
  let sampleStyckerCardDataArray = [];
  for (let i = 0; i < numberOfItems; i++)
    sampleStyckerCardDataArray.push(createSampleStyckerCardData());
  return sampleStyckerCardDataArray;
}
