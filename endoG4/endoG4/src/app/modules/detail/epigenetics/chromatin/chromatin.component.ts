import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DetailApiService } from "../../detail-api.service";
import {ActivatedRoute} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import { MatTableExporterDirective } from 'mat-table-exporter';

@Component({
  selector: 'app-chromatin',
  templateUrl: './chromatin.component.html',
  styleUrls: ['./chromatin.component.css']
})
export class ChromatinComponent implements OnInit {
  dataSource
  @ViewChild(MatTableExporterDirective, { static: false }) exporter: MatTableExporterDirective;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['sample','epi_loci',"overlap",'state',"match_seq"];

  constructor(private route: ActivatedRoute, private DataApiService: DetailApiService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      // this.g_id = params.g_id;
      this.DataApiService.findG4HMM(params.g_id).subscribe((res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sortingDataAccessor = (item, property) => {
            switch(property) {
              case 'epi_loci':
                return item.chromStart;
              default:
                return item[property];
            }
          };
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
  });
  }
}
