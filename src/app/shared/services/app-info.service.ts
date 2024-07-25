import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  constructor() {}

  public get title() {
    return 'Test App';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}
