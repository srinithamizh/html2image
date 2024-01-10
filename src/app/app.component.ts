import { Component, ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  @ViewChild('screenshotDiv') screenshotDiv!: ElementRef;
  fuelStationName: string;
  receiptNumber: number;
  product: string;
  products = ['Petrol', 'Disel'];
  fuelRate: number;
  fuelAmount: number;
  fuelQuantity: number;
  customerName: string;
  vehicleNumber: string;
  time: string;
  date: string;
  mode: string;
  count: number;
  receipt: number[] = [];

  constructor() {
    this.fuelStationName = 'Narayana agency iocl dealer';
    this.product = this.products[0];
    this.customerName = 'THAMIZHARASAN S';
    this.vehicleNumber = 'TN21BS1098';
    this.mode = 'cash';
    this.receiptNumber = this.getRandomInteger(6);
    this.fuelRate = 109 + (this.getRandomInteger(2, 75, 79) * 0.01);
    this.fuelAmount = this.getRandomInteger(2, 24, 30) * 100;
    this.fuelQuantity = this.quantityCalculator(this.fuelRate, this.fuelAmount, 2);
    this.time = this.getRandomTime(8, 10);
    this.date = this.getRandomDate(0);
    this.count = 0; 
  }

  generator(receiptNumber: number, month: number): void {
    this.receiptNumber = receiptNumber;
    this.fuelRate = 109 + (this.getRandomInteger(2, 75, 79) * 0.01);
    this.fuelAmount = this.getRandomInteger(2, 24, 30) * 100;
    this.fuelQuantity = this.quantityCalculator(this.fuelRate, this.fuelAmount, 2);
    this.time = this.getRandomTime(8, 10);
    this.date = this.getRandomDate(month);
  }

  generate() {
    if(this.count == 0) {
      for(let i=0; i<12; i++) {
        this.receipt.push(this.getRandomInteger(6));
      }
      this.receipt.sort();
    }
      this.generator(this.receipt[this.count], this.count+1);
      this.captureScreen();
      this.count++;
      if(this.count == 12){
        this.count = 0;
      }
  }

  getRandomInteger(digits: number, 
                    min: number = Math.pow(10, digits - 1), 
                    max: number = Math.pow(10, digits) - 1): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomTime(from: number, to: number) {
    const randomDate = new Date(0);
    randomDate.setHours(this.getRandomInteger(2, from, to));
    randomDate.setMinutes(this.getRandomInteger(2) % 60);
    return randomDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false});
  }

  getRandomDate(month: number, fromDate: number = 1, toDate: number = 14 ) {
    const randomDate = new Date();
    randomDate.setDate(this.getRandomInteger(2, fromDate, toDate));
    month = month == null ? this.getRandomInteger(2, 0, 11) : month;
    randomDate.setMonth(month);
   
    const dd = String(randomDate.getDate()).padStart(2, '0');
    const MMM = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(randomDate);
    const yyyy = new Date().getFullYear();

    const formattedDate = `${dd} ${MMM} ${yyyy}`;
    return formattedDate;
  }

  quantityCalculator(rate: number, amount: number, decimalPlaces: number): number {
    const factor = Math.pow(10, decimalPlaces)
    return  Math.floor(amount/rate * factor) / factor;
  }

  captureScreen() {
    const element = this.screenshotDiv.nativeElement;
    html2canvas(element, {width: 260}).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = imgData;
      downloadLink.download = `petrol-bill-${this.count+1}.png`;
      downloadLink.click();
    });
  }
}
