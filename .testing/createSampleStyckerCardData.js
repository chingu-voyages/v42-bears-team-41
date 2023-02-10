import { randomIntFromInterval } from "@/helpers/randomInteger";
import { faker } from "@faker-js/faker";
import { generateSampleImageURL } from "./generateSampleImageURL";

export function generateSampleStyckerTags(numberOfItems) {
  const returnableTags = [];
  for (let i = 0; i < numberOfItems; i++) {
    returnableTags.push({
      text: faker.random.words(
        faker.random.numeric(1, {
          bannedDigits: ["0", "3", "4", "5", "6", "7", "8", "9"],
        })
      ),
      color: null, //replace with random color (within tailwind constraints) if you wish
    });
  }
  return returnableTags;
}

export function createSampleStyckerCardData(minTags = 0, maxTags = 0) {
  const sampleStyckerCardData = {
    id: faker.datatype.uuid(),
    // 30% chance of there being a cover image for the StyckerCard
    image:
      Math.random() < 0.3 ? generateSampleImageURL(1920, 1080, true) : null,
    user: {
      name: faker.name.fullName(),
      // 50% chance of there being a profile picture
      avatar_url:
        Math.random() < 0.5 ? generateSampleImageURL(500, 500, true) : null,
    },
    title: faker.company.name(),
    description: faker.lorem.paragraph(), // best thing I could find as a placeholder
    tags:
      minTags > 0 && maxTags >= minTags
        ? generateSampleStyckerTags(randomIntFromInterval(minTags, maxTags))
        : null,
  };
  return sampleStyckerCardData;
}
export function createSampleStyckerCardDataArray(
  numberOfItems,
  minTags = 0,
  maxTags = 0
) {
  let sampleStyckerCardDataArray = [];
  for (let i = 0; i < numberOfItems; i = i + 1)
    sampleStyckerCardDataArray.push(
      createSampleStyckerCardData(minTags, maxTags)
    );
  return sampleStyckerCardDataArray;
}
