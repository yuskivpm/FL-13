import { CreditCard } from '../credit-card-service/credit-card.model';

export const cardList: CreditCard[] = [
  {
    name: 'Visa',
    length: [13, 16],
    prefixes: [4],
    checkdigit: true
  },
  {
    name: 'MasterCard',
    length: [16],
    prefixes: [51, 52, 53, 54, 55],
    checkdigit: true
  },
  {
    name: 'DinersClub',
    length: [14, 16],
    prefixes: [36, 38, 54, 55],
    checkdigit: true
  },
  {
    name: 'CarteBlanche',
    length: [14],
    prefixes: [300, 301, 302, 303, 304, 305],
    checkdigit: true
  },
  {
    name: 'AmEx',
    length: [15],
    prefixes: [34, 37],
    checkdigit: true
  },
  {
    name: 'Discover',
    length: [16],
    prefixes: [6011, 622, 64, 65],
    checkdigit: true
  },
  {
    name: 'JCB',
    length: [16],
    prefixes: [35],
    checkdigit: true
  },
  {
    name: 'enRoute',
    length: [15],
    prefixes: [2014, 2149],
    checkdigit: true
  },
  {
    name: 'Solo',
    length: [16, 18, 19],
    prefixes: [6334, 6767],
    checkdigit: true
  },
  {
    name: 'Switch',
    length: [16, 18, 19],
    prefixes: [4903, 4905, 4911, 4936, 564182, 633110, 6333, 6759],
    checkdigit: true
  },
  {
    name: 'Maestro',
    length: [12, 13, 14, 15, 16, 18, 19],
    prefixes: [5018, 5020, 5038, 6304, 6759, 6761, 6762, 6763],
    checkdigit: true
  },
  {
    name: 'VisaElectron',
    length: [16],
    prefixes: [4026, 417500, 4508, 4844, 4913, 4917],
    checkdigit: true
  },
  {
    name: 'LaserCard',
    length: [16, 17, 18, 19],
    prefixes: [6304, 6706, 6771, 6709],
    checkdigit: true
  }
];
