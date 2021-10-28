import { Component, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  panelOpenState = false;
  mode: MatExpansionModule = 'determinate';
  constructor() { }

  ngOnInit(): void {
  }

}
