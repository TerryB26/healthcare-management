import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-dep-details',
  templateUrl: './dep-details.component.html',
  styleUrls: ['./dep-details.component.css']
})
export class DepDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];

      console.log("Parameter ID: " + id);
    });
  }
}
