import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coins } from '../models/coin.model';

@Injectable({
  providedIn: 'root'
})
export class CoinsServiceService {

  constructor(private http: HttpClient) { }

  getCoins() {
    return this.http.get<Coins[]>('assets/data.json');
  }
}

