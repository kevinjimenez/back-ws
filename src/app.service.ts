import { Injectable } from '@nestjs/common';
import { BandInterface } from './interfaces/band.interface';
const {v4: uuidV4} = require('uuid');

@Injectable()
export class AppService {
  bands: BandInterface[] = [
    // {id: uuidV4(), name: 'Linkin park', votes : 0},
    // {id: uuidV4(), name: 'Mago OZ', votes : 0},
    // {id: uuidV4(), name: 'Strokers', votes : 0},
    // {id: uuidV4(), name: 'Gorillaz', votes : 0},
  ];
  getHello(): string {
    return 'Hello World!';
  }

  createBand(band: BandInterface) {
    band.id = uuidV4();
    band.votes = 0;
    this.bands.push(band);
    return band;
  }

  getBands() {
    return this.bands;
  }

  deleteBands(id: string) {
    this.bands = this.bands.filter(band => band.id !== id);
    console.log(this.bands);
    return this.bands;
  }

  voteBand(id: string) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) {
        band.votes++;
        return band;
      } else {
        return band;
      }
    });
  }
}
