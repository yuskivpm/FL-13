import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { News } from '../../interfaces/News';
import { NewsService } from '../../services/news.service';
import {
  NEWS_LIST_BASE_URL,
  PARAM_SOURCE_ID,
  EMPTY_SOURCE,
  FORM_COMPONENTS,
} from '../../constants/common';

const generateFormGroup = (
  list: {
    [key: string]: any[];
  } = {}
): {
  [key: string]: any;
} =>
  Object.keys(list).reduce(
    (formGroup, fieldName) => ({
      ...formGroup,
      [fieldName]: ['', list[fieldName][1]],
    }),
    {}
  );

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css'],
})
export class CreateNewsComponent implements OnInit {
  news: News;
  sourceId: number = 0;
  sourceName: string = '';
  spinner: boolean = false;
  newsForm: FormGroup = this.formBuilder.group(
    generateFormGroup(FORM_COMPONENTS)
  );

  constructor(
    private newsService: NewsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sourceId = +this.route.snapshot.paramMap.get(PARAM_SOURCE_ID);
    this.newsService
      .getSourceById(this.sourceId)
      .subscribe(({ name } = { ...EMPTY_SOURCE }) => (this.sourceName = name));
  }

  onSave(): void {
    this.spinner = true;
    this.newsService
      .addNews({
        ...this.newsForm.value,
        sourceId: this.sourceId,
      })
      .subscribe((_) => {
        this.onCancel();
      });
  }

  onCancel(): void {
    this.router.navigate([`/${NEWS_LIST_BASE_URL}/${this.sourceId}`]);
  }

  getValidationError(componentName: string): void {
    const component = this.newsForm.get(componentName);
    return component.invalid //&& (component.dirty || component.touched)
      ? FORM_COMPONENTS[componentName][0]
      : 'Looks good))';
  }
}
