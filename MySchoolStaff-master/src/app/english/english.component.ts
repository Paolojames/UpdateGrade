import { Component, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-english',
  templateUrl: './english.component.html',
  styleUrls: ['./english.component.scss']
})

export class EnglishComponent implements OnInit {

  panelOpenState = false;
  mode: MatExpansionModule = 'determinate';
  constructor() { }

  ngOnInit(): void {
  }
}
 