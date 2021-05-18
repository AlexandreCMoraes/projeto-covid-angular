import { ApiCovidMaisVaccine } from './../interface/api-covid-mais-vaccine';
import { ApiCovidMais } from './../interface/api-covid-mais';
import { ApiCovidGlobal } from './../interface/api-covid-global';
import { Component, OnInit } from '@angular/core';
import { ApiCovidCountries } from '../interface/api-covid-countries';
import { ApiCovidService } from '../service/api-covid.service';
import { Map } from 'typescript';

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

  /* apiInfoCountry com os dados tratados trazendo em tela */
  public apiInfoCountry() {
    this.apiCovidService.infoApiCovid().subscribe(data => {
      this.apiCountries = data.Countries;
      // traz sobre o pais nos cards
      this.apiGlobal = data.Global;
      // traz sobre o global na table
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

  /* foundItem no input quando digita e filtra os dados ja trazendo na tela */
  infoScreen: boolean = false;
  infoScreenInput: string = "";

  public foundItem() {
    this.apiCountriesFiltro = this.apiCountries.filter((item) => {
      // filtra as info digitadas
      return item.Country.toLowerCase() == this.infoScreenInput.toLowerCase();
    })
    // console.log(this.infoScreenInput)
    this.infoScreen = true;
    // traz a tabela com as info
  }

  /* mostra aviso quando mouse passa em label e input quando digita pra pesquisar por pais */
  showsAlert: boolean = false;

  public showOn() {
    this.showsAlert = true;
    // console.log("Passou");
  }
  public showOff() {
    setTimeout(() => {
      this.showsAlert = false;
    }, 15000);
    // console.log("Passou");
  }

  /* ApiCovidNova traz outras info do pais e vacinas quando clica no botao dos cards, traz o país do card clicado e também esta no botao de "TABLE APARECE QUANDO PESQUISA" */
  // states = new Map();
  // 
  public ApiCovidNova(pais: string) {
    this.apiCovidService.infoApiCovidMais(pais).subscribe(data => {
      // qnd clica no botao do card de "mais informações" traz info sobre o país
      this.apiMais = data.All;

      //   for (var [key, value] of Object.entries(data)) {
      //     console.log(key + ' ' + value); // "a 5", "b 7", "c 9"
      // }

      // for (let index = 1; index < data.length; index++) {
      //   this.states.push(data[index])
      // }
      // console.log(this.states)
    })
    this.apiCovidService.infoApiCovidMaisVaccine(pais).subscribe(data => {
      // qnd clica no botao do card de "mais informações" traz info das vacinas
      this.apiMaisVaccine = data.All;
    })
  }

  // botao de carregar mais cards na tela de 20 em 20
  carregarMais: boolean = true
  // esta exibindo o botao por causa do boolean
  public carrega() {
    let contador = 0
    for (let index = this.apiCountriesPaginacao.length; index < this.apiCountries.length; index++) {
      console.log(index)
      // apiCountriesPaginacao começa em 20 (pq tem 20 na tela), apiCountries tem 190
      if (contador < 20) {
        // contador começa em 0 e soma ate 20
        contador++
        this.apiCountriesPaginacao.push(this.apiCountries[index])
        // add na apiCountriesPaginacao o conteudo de cada iteração de index trazendo as info dos paises
        if (this.apiCountriesPaginacao.length == this.apiCountries.length) {
          // se apiCountriesPaginacao for do mesmo taamanho de apiCountries
          this.carregarMais = false
          // o botao sai da tela
        }
      } else {
        return
      }
    }
  }
}