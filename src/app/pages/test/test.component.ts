import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  @Input() data!: any;
  countries!: string[];
  arrCountries!: string[];
  arrCities: string[] = [];

  isFirstOpt = false;
  isSecondOpt = false;
  isBothCountries = false;
  firstSelected = '';
  secondSelected = '';

  ngOnInit(): void {
    this.arrCountries = Object.keys(this.data);

    this.arrCountries.forEach((country: any) => {
      this.arrCities.push(this.data[country]);
    });

    const infoCitiesCountries = [...this.arrCountries, ...this.arrCities];
    this.countries = infoCitiesCountries.sort((a, b) => 0.5 - Math.random());
  }

  getData(data: string) {
    if (this.isBothCountries) {
      this.handleResetSelection();
    }

    if (!this.isFirstOpt && this.firstSelected === '') {
      this.firstSelected = data;
      this.isFirstOpt = true;
    } else {
      this.secondSelected = data;
      const isFirstSelectionCountry = this.arrCountries.includes(this.firstSelected);
      const isSecondSelectionCountry = this.arrCountries.includes(this.secondSelected);

      if (isFirstSelectionCountry && isSecondSelectionCountry) {
        this.handleSetErrorSelection();
      } else if (!isFirstSelectionCountry && !isSecondSelectionCountry) {
        this.handleSetErrorSelection();
      } else {
        const country = isFirstSelectionCountry ? this.firstSelected : this.secondSelected;
        const city = isSecondSelectionCountry ? this.firstSelected : this.secondSelected;
        this.handleCheckValues(country, city);
      }
    }
  }

  handleCheckValues(country: string, city: string): void {
    if (this.data[country] === city) {
      const indexCountry = this.countries.indexOf(country);
      this.countries.splice(indexCountry, 1);
      const indexCity = this.countries.indexOf(city);
      this.countries.splice(indexCity, 1);
      this.handleResetSelection();
    } else {
      this.handleSetErrorSelection();
    }
  }

  handleSetErrorSelection(): void {
    this.isSecondOpt = false;
    this.isBothCountries = true;
    this.isFirstOpt = false;
  }

  handleResetSelection(): void {
    this.isBothCountries = false;
    this.isSecondOpt = false;
    this.isFirstOpt = false;
    this.firstSelected = '';
    this.secondSelected = '';
  }

}
