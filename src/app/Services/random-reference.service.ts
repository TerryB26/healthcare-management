import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomReferenceService {

  GetRefNum(roleName :string)
  {
    let userRefNumber;

    switch (roleName) {
      case "Admin":
        userRefNumber = Math.floor(Math.random() * 900000) + 1 + "-ADM-" + Math.floor(Math.random() * 900000) + 1;
        break;

      case "Doctor":
        userRefNumber = Math.floor(Math.random() * 900000) + 1 + "-DCT-" + Math.floor(Math.random() * 900000) + 1;
        break;

      case "Nurse":
        userRefNumber = Math.floor(Math.random() * 900000) + 1 + "-NRS-" + Math.floor(Math.random() * 900000) + 1;
        break;

      case "Patient":
        userRefNumber = Math.floor(Math.random() * 900000) + 1 + "-PTN-" + Math.floor(Math.random() * 900000) + 1;
        break;
    }

    return userRefNumber;
  }

  constructor() { }
}
