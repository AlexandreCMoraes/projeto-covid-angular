import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCovidService {

  constructor(private httpClient: HttpClient) { }
  // site API 01
  url: string = 'https://api.covid19api.com';
  // site API 02
  urlMais: string = 'https://covid-api.mmediagroup.fr/v1';

  /* infoApiCovid API 01 traz todos os países */
  public infoApiCovid(): Observable<any> {
    return this.httpClient.get(this.url + "/summary")
  }

  /* infoApiCovidMais API 02 traz ja filtrado os países e com o parametro espera o nome do pais ao clicar no botão com info do país */
  public infoApiCovidMais(pais: string): Observable<any> {
    return this.httpClient.get(this.urlMais + "/cases?country=" + pais)
  }

  /* infoApiCovidMaisVaccine API 02 traz ja filtrado os países e com o parametro espera o nome do pais ao clicar no botão com info de vacinas*/
  public infoApiCovidMaisVaccine(pais: string): Observable<any> {
    return this.httpClient.get(this.urlMais + "/vaccines?country=" + pais)
  }
}
