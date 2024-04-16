import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { campaigns } from '../../mock/campaigns';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-campaigns-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './campaigns-list.component.html',
  styleUrl: './campaigns-list.component.scss',
})
export class CampaignsListComponent {
  displayedColumns: string[] = ['id', 'name', 'status', 'options'];
  dataSource = campaigns;
}
