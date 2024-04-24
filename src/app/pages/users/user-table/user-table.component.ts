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

    /**
     * Handles the request to change the page.
     *
     * @param status Controls whether the pagination is incrementing or decrementing.
     */
    handleChangePageRequest(status: boolean) {
        const pageNumber = this._getNextPageNumber(status);
        if (pageNumber != this.currentPage) {
            this.changePageEvent.emit(pageNumber);
        }
    }

    /**
     * Handles the request to clear the search input field.
     */
    handleClearSearchField() {
        this.searchFormControl.setValue('');
    }

    get isLoadingUsers() {
        return this.users.length === 0 && this.isLoadingContent;
    }

    /**
     * Generates the next or previous page number.
     *
     * @param status Controls whether the pagination is incrementing or decrementing.
     * @returns Next page number.
     */
    private _getNextPageNumber(status: boolean) {
        if (status) {
            return this.currentPage + 1 <= this.totalPages ? this.currentPage + 1 : this.currentPage;
        }

        return this.currentPage - 1 >= 1 ? this.currentPage - 1 : 1;
    }
}
