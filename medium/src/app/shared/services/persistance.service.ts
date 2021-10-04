import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersistanceService {

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.log(e)
    }
  }

  get(key: string): any {
    try {
      return JSON.parse(<string>localStorage.getItem(key));
    } catch (e) {
      console.log(e)
      return null
    }
  }
}
