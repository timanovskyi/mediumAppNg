import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from '../../../../services/utils.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() currentPage: number;
  @Input() total: number;
  @Input() limit: number;
  @Input() url: string;

  pagesCount: number;
  pages: number[];
  constructor(private _utils: UtilsService) {
  }

  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.total  / this.limit)
    this.pages = this._utils.range(1, this.pagesCount)
  }

}
