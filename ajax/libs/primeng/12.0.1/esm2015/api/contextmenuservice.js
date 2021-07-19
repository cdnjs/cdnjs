import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class ContextMenuService {
    constructor() {
        this.activeItemKeyChange = new Subject();
        this.activeItemKeyChange$ = this.activeItemKeyChange.asObservable();
    }
    changeKey(key) {
        this.activeItemKey = key;
        this.activeItemKeyChange.next(this.activeItemKey);
    }
    reset() {
        this.activeItemKey = null;
        this.activeItemKeyChange.next(this.activeItemKey);
    }
}
ContextMenuService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ContextMenuService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ContextMenuService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ContextMenuService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ContextMenuService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dG1lbnVzZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2FwaS9jb250ZXh0bWVudXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUcvQixNQUFNLE9BQU8sa0JBQWtCO0lBRC9CO1FBR1ksd0JBQW1CLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUVwRCx5QkFBb0IsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLENBQUM7S0FhbEU7SUFURyxTQUFTLENBQUMsR0FBRztRQUNULElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdEQsQ0FBQzs7K0dBaEJRLGtCQUFrQjttSEFBbEIsa0JBQWtCOzJGQUFsQixrQkFBa0I7a0JBRDlCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb250ZXh0TWVudVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBhY3RpdmVJdGVtS2V5Q2hhbmdlID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG4gICAgYWN0aXZlSXRlbUtleUNoYW5nZSQgPSB0aGlzLmFjdGl2ZUl0ZW1LZXlDaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG5cbiAgICBhY3RpdmVJdGVtS2V5OiBzdHJpbmc7XG5cbiAgICBjaGFuZ2VLZXkoa2V5KSB7XG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbUtleSA9IGtleTtcbiAgICAgICAgdGhpcy5hY3RpdmVJdGVtS2V5Q2hhbmdlLm5leHQodGhpcy5hY3RpdmVJdGVtS2V5KTtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVJdGVtS2V5ID0gbnVsbDtcbiAgICAgICAgdGhpcy5hY3RpdmVJdGVtS2V5Q2hhbmdlLm5leHQodGhpcy5hY3RpdmVJdGVtS2V5KTtcbiAgICB9XG59XG4iXX0=