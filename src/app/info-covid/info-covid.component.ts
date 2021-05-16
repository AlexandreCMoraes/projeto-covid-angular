import { ApiCovidMaisVaccine } from './../interface/api-covid-mais-vaccine';
import { ApiCovidMais } from './../interface/api-covid-mais';
import { ApiCovidGlobal } from './../interface/api-covid-global';
import { Component, OnInit } from '@angular/core';
import { ApiCovidCountries } from '../interface/api-covid-countries';
import { ApiCovidService } from '../service/api-covid.service';

@Component({
  selector: 'app-info-covid',
  templateUrl: './info-covid.component.html',
  styleUrls: ['./info-covid.component.css']
})

export class InfoCovidComponent implements OnInit {

  constructor(private apiCovidService: ApiCovidService) { }

  ngOnInit(): void {
    this.apiInfoCountry();
  }

  // site API 01 https://api.covid19api.com/summary
  apiCountries: ApiCovidCountries[] = [];
  apiCountriesFiltro: ApiCovidCountries[] = [];
  apiCountriesPaginacao: ApiCovidCountries[] = [];
  apiGlobal!: ApiCovidGlobal;

  // site API 02 https://covid-api.mmediagroup.fr/v1/cases
  apiMais!: ApiCovidMais;
  apiMaisVaccine!: ApiCovidMaisVaccine;

  /* apiInfoCountry com os dados tratados */
  public apiInfoCountry() {
    this.apiCovidService.infoApiCovid().subscribe(data => {

      this.apiCountries = data.Countries;
      this.apiGlobal = data.Global;
      this.apiCountries.forEach((data, index) => {
        // traz a qtd de 20 itens na tela
        if (index <= 19) {
          this.apiCountriesPaginacao.push(data);
        } else {
          return;
        }
      })
      // console.log(this.apiCountries)
      // console.log(this.apiGlobal)
    })
  }

  //TODO Função ver mais que faz o push de + 20 para  apiCountriesPaginacao

  /* maisInfo quando clica na caixa/botão do card país traz mais dados */
  public maisInfo() {
    alert("jkgshkhjgsd");
  }

  /* foundItem no input quando digita e filtra os dados ja trazendo na tela */
  infoScreen: boolean = false;
  infoScreenInput: string = "";

  public foundItem() {
    this.apiCountriesFiltro = this.apiCountries.filter((item) => {
      return item.Country.toLowerCase() == this.infoScreenInput.toLowerCase();
    })
    // console.log(this.infoScreenInput)
    this.infoScreen = true;
  }

  //TODO AJUSTAR API NOVA 
  /* ApiCovidNova traz outras info */

  public ApiCovidNova(pais: string) {
    this.apiCovidService.infoApiCovidMais(pais).subscribe(data => {
      this.apiMais = data.All;
    })
    this.apiCovidService.infoApiCovidMaisVaccine(pais).subscribe(data => {
      this.apiMaisVaccine = data.All;
    })
  }

  /* mostra aviso quando mouse passa em label e input */
  showsAlert: boolean = false;
  public showOn() {
    this.showsAlert = true;
    console.log("Passou");
  }

}