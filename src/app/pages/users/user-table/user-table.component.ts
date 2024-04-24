import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/types';

@Component({
    selector: 'app-user-table',
    templateUrl: './user-table.component.html',
    styleUrls: ['./user-table.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableComponent {
    @Input() users: User[] = [];
    @Input() totalPages: number = 0;
    @Input() currentPage: number = 0;
    @Input() searchFormControl!: FormControl;
    @Input() isLoadingContent: boolean = false;
    @Output() changePageEvent = new EventEmitter<number>();

    handleChangePageRequest(status: boolean) {
        const pageNumber = this._getNextPageNumber(status);
        if (pageNumber != this.currentPage) {
            this.changePageEvent.emit(pageNumber);
        }
    }

    handleClearSearchField() {
        this.searchFormControl.setValue('');
    }

    get isLoadingUsers() {
        return this.users.length === 0 && this.isLoadingContent;
    }

    private _getNextPageNumber(status: boolean) {
        if (status) {
            return this.currentPage + 1 <= this.totalPages ? this.currentPage + 1 : this.currentPage;
        }

        return this.currentPage - 1 >= 1 ? this.currentPage - 1 : 1;
    }
}
