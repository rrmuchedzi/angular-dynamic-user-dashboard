import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-user-table-row',
  templateUrl: './user-table-row.component.html',
  styleUrls: ['./user-table-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableRowComponent {
  @Input() id?: number;
  @Input() email?: string;
  @Input() avatar?: string;
  @Input() firstName?: string;
  @Input() lastName?: string;
}
