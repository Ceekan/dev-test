import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Filter } from 'app/shared/filter.models';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-restaurant-filters',
  templateUrl: './restaurant-filters.component.html',
  styleUrls: ['./restaurant-filters.component.scss'],
})
export class RestaurantFiltersComponent implements OnInit, OnDestroy {
  form: FormGroup;
  alive: boolean = true;
  
  @Input()
  tags: string[] | null = [];

  @Output()
  filtersChange = new EventEmitter<Filter>();

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      search: [""],
      tags: this.formBuilder.array([]),
      familyFriendly: [false],
      vegan: [false]
    });
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(takeWhile(() => this.alive))
      .subscribe(this.filtersChange);
  }

  onTagChecked(event: any): void {
    const selectedTags: FormArray = this.form.get('tags') as FormArray;

    if (event.target.checked) {
      selectedTags.push(new FormControl(event.target.value));
    } else {
      for (let i = 0; i < selectedTags.controls.length; i++) {
        let tag = selectedTags.at(i).value; 
        
        if (tag == event.target.value) {
          selectedTags.removeAt(i);
          return;
        }
      };
    }
  }

  ngOnDestroy(): void {
		this.alive = false;
	}
}
