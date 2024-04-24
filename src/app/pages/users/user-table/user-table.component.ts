import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/types';

@Component({
    selector: 'app-user-table',
    templateUrl: './user-table.component.html',
    styleUrls: ['./user-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableComponent {
    @Input() users: User[] = [];
    @Input() totalPages: number = 0;
    @Input() currentPage: number = 0;
    @Input() isLoadingContent: boolean = false;

    @Output() changePageEvent = new EventEmitter<number>();

    handleChangePageRequest(status: boolean) {
        const pageNumber = this._getNextPageNumber(status);
        if (pageNumber != this.currentPage) {
            this.changePageEvent.emit(pageNumber);
        }
    }

    private _getNextPageNumber(status: boolean) {
        if (status) {
            return this.currentPage + 1 <= this.totalPages ? this.currentPage + 1 : this.currentPage;
        }

        return this.currentPage - 1 >= 1 ? this.currentPage - 1 : 1;
    }
}
