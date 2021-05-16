import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCovidService {

  constructor(private httpClient: HttpClient) { }

  url: string = 'https://api.covid19api.com';
  urlMais: string = 'https://covid-api.mmediagroup.fr/v1';
  /**
   * infoApiCovid
   */
  public infoApiCovid(): Observable<any> {
    return this.httpClient.get(this.url + "/summary")
  }

  /**
  * infoApiCovidMais
  */
  public infoApiCovidMais(pais: string): Observable<any> {
    return this.httpClient.get(this.urlMais + "/cases?country=" + pais)
  }

  /**
   * infoApiCovidMaisVaccine
   */
  public infoApiCovidMaisVaccine(pais: string): Observable<any> {
    return this.httpClient.get(this.urlMais + "/vaccines?country=" + pais)

  }
}
