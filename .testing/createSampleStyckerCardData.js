import { faker } from "@faker-js/faker";

export function createSampleStyckerCardData() {
  return {
    id: faker.datatype.uuid(),
    user: {
      name: faker.name.fullName(),
      //avatar_url: ???
    },
    title: faker.company.name(),
    description: faker.lorem.paragraph(), // best thing I could find as a placeholder
  };
}
export function createSampleStyckerCardDataArray(numberOfItems) {
  let sampleStyckerCardDataArray = [];
  for (let i = 0; i < numberOfItems; i = i + 1)
    sampleStyckerCardDataArray.push(createSampleStyckerCardData());
  return sampleStyckerCardDataArray;
}
