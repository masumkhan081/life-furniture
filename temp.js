const districtsBangladesh = [
  "Bagerhat",
  "Bandarban",
  "Barguna",
  "Barisal",
  "Bhola",
  "Bogra",
  "Brahmanbaria",
  "Chandpur",
  "Chittagong",
  "Chuadanga",
  "Comilla",
  "Cox's Bazar",
  "Dhaka",
  "Dinajpur",
  "Faridpur",
  "Feni",
  "Gaibandha",
  "Gazipur",
  "Gopalganj",
  "Habiganj",
  "Jamalpur",
  "Jessore",
  "Jhalokati",
  "Jhenaidah",
  "Joypurhat",
  "Khagrachari",
  "Khulna",
  "Kishoreganj",
  "Kurigram",
  "Kushtia",
  "Lakshmipur",
  "Lalmonirhat",
  "Madaripur",
  "Magura",
  "Manikganj",
  "Meherpur",
  "Moulvibazar",
  "Munshiganj",
  "Mymensingh",
  "Naogaon",
  "Narail",
  "Narayanganj",
  "Narsingdi",
  "Natore",
  "Netrakona",
  "Nilphamari",
  "Noakhali",
  "Pabna",
  "Panchagarh",
  "Patuakhali",
  "Pirojpur",
  "Rajbari",
  "Rajshahi",
  "Rangamati",
  "Rangpur",
  "Satkhira",
  "Shariatpur",
  "Sherpur",
  "Sirajganj",
  "Sunamganj",
  "Sylhet",
  "Tangail",
  "Thakurgaon",
];

// Sample sub-district, village, street, and building names
const subDistricts = [
  "Gulshan",
  "Banani",
  "Dhanmondi",
  "Mohammadpur",
  "Mirpur",
];
const villages = ["Example Village", "New Village", "Old Village"];
const streets = ["Example Road", "New Road", "Old Road"];
const buildings = ["123/A", "456/B", "789/C"];

// Function to generate random integer within a range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate random address data
function generateAddress(i) {
  const district = districtsBangladesh[i];
  const sub_district = subDistricts[getRandomInt(0, subDistricts.length - 1)];
  const village = villages[getRandomInt(0, villages.length - 1)];
  const street = streets[getRandomInt(0, streets.length - 1)];
  const building = buildings[getRandomInt(0, buildings.length - 1)];

  return {
    district,
    sub_district,
    village,
    street,
    building,
  };
}

// Generate 64 JSON data samples
const jsonSamples = [];
for (let i = 0; i < 64; i++) {
  jsonSamples.push(generateAddress(i));
}

// console.log(jsonSamples);

const t = "";
const t2 = undefined;

fn();

function fn() {
  if (t) {
    console.log("if - 1");
  }
  if (t2) {
    console.log("if - 2");
  }
}
