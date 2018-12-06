
export class Settings {

  // static MAIN_URL = 'http://5.101.180.10:3005/';
  static MAIN_URL = 'http://localhost:3005/';
  // static MAIN_URL = 'http://192.168.1.75:3005/';

}

export class Vars {
  static categories = [
    'coffee',
    'food',
    'household goods',
    'services',
    'others',
    'increase'
  ];
  static catColors = {
      'increase': '#1FB37F',
      'food': '#CCCC33',
      'household goods': '#000033',
      'services': '#CC3333',
      'others': '#cc9819',
      'coffee': '#be5267'
    };

  static incoming = ['incoming'];
}
