import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coins } from './models/coin.model';
import { CoinsServiceService } from './services/coins-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  public moeda:string = '';
  public initialDate:string = '';
  public lastDate:string = '';
  
  public API = '';
  
  public coins: Observable<Coins[]>;
  
  public apiQuote: Observable<any>;

  myFormGroup: FormGroup;
  
  constructor(
    private http: HttpClient, 
    private dropdownCoins: CoinsServiceService,
    private formBuilder: FormBuilder
    ) {
    this.apiQuote = <any>[];
    this.myFormGroup = this.formBuilder.group({
      validCoins:[this.moeda, Validators.required],
      validInitDate:[this.initialDate, Validators.required],
      validLastDate:[this.lastDate, Validators.required]
    })
  }
  
  ngOnInit():void {
    this.coins = this.dropdownCoins.getCoins();
    this.apiQuote = this.coins;
  }
  
  addCoin(e:any):void {
    this.moeda = e.target.value;
  }

  getInitDate(e):void {
    let getDate = e.target.value;
    getDate = moment(getDate).format('MM-DD-YYYY');
    this.initialDate = getDate;
  }
  
  getLastDate(e):void {
    let getDate = e.target.value;
    getDate = moment(getDate).format('MM-DD-YYYY');
    this.lastDate = getDate;
  }

  getApi():void {
    
    this.API = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda=%27${this.moeda}%27&@dataInicial=%27${this.initialDate}%27&@dataFinalCotacao=%27${this.lastDate}%27&$top=1000&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`;

    if (!this.myFormGroup.valid) {
      console.log('form inválido');
      return;
    }

    if (this.initialDate > this.lastDate) {
      alert('A data inicial não pode ser maior do que a data final!');
      return;
    }
    
    this.apiQuote = this.http.get(this.API);
  }

} 
