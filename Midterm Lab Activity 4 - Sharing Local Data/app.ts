import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';   
import { EmployeeService, Employee } from './employee';
import { ProductService, Product } from './product';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],  
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  public employees: Employee[] = [];
  public products: Product[] = [];

  constructor(
    private _employeeService: EmployeeService,
    private _productService: ProductService
  ) {}

  ngOnInit() {
    this.employees = this._employeeService.getEmployees();
    this.products = this._productService.getProducts();
  }
}
