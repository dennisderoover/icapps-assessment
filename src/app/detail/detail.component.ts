import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public repo$: Observable<any> | undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient, public router: Router) { }

  ngOnInit(): void {
    const ownerName = this.route.snapshot.paramMap.get('ownerName');
    const projectName = this.route.snapshot.paramMap.get('projectName');
    this.fetchProject(ownerName, projectName);
  }

  private fetchProject(ownerName: string | null, projectName: string | null): void {
    const url = `${environment.apiUrl}repos/${ownerName}/${projectName}`;
    this.repo$ = this.http.get(url);
  }

  public goToGitHub(url: string): void {
    window.location.href = url;
  }
}
