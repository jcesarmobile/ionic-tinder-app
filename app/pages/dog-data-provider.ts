

export class DogDetails {
  constructor(public name: string, public age: number, public breed: string, public url: string) {
  }
}

export class PoochProvider {
  constructor() {
  }

  getDogs() {
    let dogs = [];
    dogs.push(new DogDetails('Bailey', getRandomDogAge(), 'Adorable Mix', `${PREFIX}/8wTPqxlnKM4/${SIZE}x${SIZE}`));
    dogs.push(new DogDetails('Bella', getRandomDogAge(), 'Adorable Mix', `${PREFIX}/i2DefZ6PCN0/${SIZE}x${SIZE}`));
    dogs.push(new DogDetails('Sadie', getRandomDogAge(), 'Adorable Mix', `${PREFIX}/TkwzP_frzl4/${SIZE}x${SIZE}`));
    dogs.push(new DogDetails('Lucy', getRandomDogAge(), 'Adorable Mix', `${PREFIX}/hnYMacpvKZY/${SIZE}x${SIZE}`));
    dogs.push(new DogDetails('Charlie', getRandomDogAge(), 'Adorable Mix', `${PREFIX}/sssxyuZape8/${SIZE}x${SIZE}`));
    dogs.push(new DogDetails('Molly', getRandomDogAge(), 'Adorable Mix', `${PREFIX}/XuhsDXmH4bA/${SIZE}x${SIZE}`));
    dogs.push(new DogDetails('Maggie', getRandomDogAge(), 'Adorable Mix', `${PREFIX}/sirEpWjfSmo/${SIZE}x${SIZE}`));
    dogs.push(new DogDetails('Rocky', getRandomDogAge(), 'Adorable Mix', `${PREFIX}/JLE7S5iTouU/${SIZE}x${SIZE}`));
    dogs.push(new DogDetails('Lola', getRandomDogAge(), 'Adorable Mix', `${PREFIX}/jx_kpR7cvDc/${SIZE}x${SIZE}`));
    dogs.push(new DogDetails('Zoe', getRandomDogAge(), 'Adorable Mix', `${PREFIX}/oH9AuO20kbk/${SIZE}x${SIZE}`));
    dogs.push(new DogDetails('Max', getRandomDogAge(), 'Adorable Mix', `${PREFIX}/UUcQywVQhMI/${SIZE}x${SIZE}`));
    dogs.push(new DogDetails('Buster', getRandomDogAge(), 'Adorable Mix', `${PREFIX}/3s3oSch5f1c/${SIZE}x${SIZE}`));
    dogs.push(new DogDetails('Cooper', getRandomDogAge(), 'Adorable Mix', `${PREFIX}/BiqAZqMU2bM/${SIZE}x${SIZE}`));
    dogs.push(new DogDetails('Duke', getRandomDogAge(), 'Adorable Mix', `${PREFIX}/IEe2c3kyERo/${SIZE}x${SIZE}`));
    dogs.push(new DogDetails('Gracie', getRandomDogAge(), 'Adorable Mix', `${PREFIX}/1TLIfwdS0tk/${SIZE}x${SIZE}`));
    dogs.push(new DogDetails('Coco', getRandomDogAge(), 'Adorable Mix', `${PREFIX}/e9ZJpC8P0UY/${SIZE}x${SIZE}`));
    dogs.push(new DogDetails('Lily', getRandomDogAge(), 'Adorable Mix', `${PREFIX}/e5dkQjh89RQ/${SIZE}x${SIZE}`));
    dogs.push(new DogDetails('Tucker', getRandomDogAge(), 'Adorable Mix', `${PREFIX}/rEgveRa_5ds/${SIZE}x${SIZE}`));
    return dogs;
  }
}

function getRandomDogAge(){
  let max = 8;
  let min = 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const SIZE = 500;
const PREFIX = 'https://source.unsplash.com';
