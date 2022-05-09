import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './item';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'todo';
  filter: 'all' | 'active' | 'done' = 'all';
  allItems: any[] = [];
  constructor(private http: HttpClient) {}

  letodosRegistros() {
    this.http.get<Item[]>(`/api/getAll`).subscribe(resultado =>
      this.allItems = resultado);
  }
  addItem(description: string) {
    var produto = new Item();
    produto.description = description;
    produto.done = false;
    this.http.post<Item>(`/api/post`, produto).subscribe(resultado => { console.log(resultado); this.letodosRegistros(); });
  }
  updateItem(item) {
    var indice = this.allItems.indexOf(item);
    var id = this.allItems[indice]._id;
    this.http.patch<Item>(`/api/update/${id}`, item).subscribe(resultado => { console.log(resultado); this.letodosRegistros(); });
  }

  remove(item) {
    var indice = this.allItems.indexOf(item);
    var id = this.allItems[indice]._id;
    this.http.delete<Item>(`/api/delete/${id}`).subscribe(resultado => {
      console.log(resultado); this.letodosRegistros();
    });
  }
  removeAllDone() {
    for (let index = this.allItems.length - 1; index >= 0; index--) {
      const element = this.allItems[index];
      if (element.done == true) {
        this.remove(element);
      }
    }
  }

}

