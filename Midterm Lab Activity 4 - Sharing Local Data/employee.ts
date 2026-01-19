import { Injectable } from '@angular/core';

export interface Employee {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  getEmployees(): Employee[] {
    return [
      { id: 101, 
        firstname: 'Joseph', 
        lastname: 'Dizon', 
        email: 'jdizon@hau.edu.ph' 
      },
      { id: 102, 
        firstname: 'James', 
        lastname: 'Atienza', 
        email: 'jatienza@hau.edu.ph' 
      },
      { id: 103, 
        firstname: 'John', 
        lastname: 'Cena', 
        email: 'jcena@hau.edu.ph' 
      },
      { id: 104, 
        firstname: 'Robert', 
        lastname: 'Quintana', 
        email: 'rquintana@hau.edu.ph' 
      },
      { id: 105, 
        firstname: 'Aaron', 
        lastname: 'Yumul', 
        email: 'ayumul@hau.edu.ph' },
    ];
  }
}
