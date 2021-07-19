import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class TreeDragDropService {
    constructor() {
        this.dragStartSource = new Subject();
        this.dragStopSource = new Subject();
        this.dragStart$ = this.dragStartSource.asObservable();
        this.dragStop$ = this.dragStopSource.asObservable();
    }
    startDrag(event) {
        this.dragStartSource.next(event);
    }
    stopDrag(event) {
        this.dragStopSource.next(event);
    }
}
TreeDragDropService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TreeDragDropService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
TreeDragDropService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TreeDragDropService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: TreeDragDropService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZWRyYWdkcm9wc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9hcGkvdHJlZWRyYWdkcm9wc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBSS9CLE1BQU0sT0FBTyxtQkFBbUI7SUFEaEM7UUFHWSxvQkFBZSxHQUFHLElBQUksT0FBTyxFQUFxQixDQUFDO1FBQ25ELG1CQUFjLEdBQUcsSUFBSSxPQUFPLEVBQXFCLENBQUM7UUFFMUQsZUFBVSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDakQsY0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUM7S0FTbEQ7SUFQRyxTQUFTLENBQUMsS0FBd0I7UUFDOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUF3QjtRQUM3QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDOztnSEFkUSxtQkFBbUI7b0hBQW5CLG1CQUFtQjsyRkFBbkIsbUJBQW1CO2tCQUQvQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVHJlZU5vZGVEcmFnRXZlbnQgfSBmcm9tICcuL3RyZWVub2RlZHJhZ2V2ZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRyZWVEcmFnRHJvcFNlcnZpY2Uge1xuICAgIFxuICAgIHByaXZhdGUgZHJhZ1N0YXJ0U291cmNlID0gbmV3IFN1YmplY3Q8VHJlZU5vZGVEcmFnRXZlbnQ+KCk7XG4gICAgcHJpdmF0ZSBkcmFnU3RvcFNvdXJjZSA9IG5ldyBTdWJqZWN0PFRyZWVOb2RlRHJhZ0V2ZW50PigpO1xuICAgIFxuICAgIGRyYWdTdGFydCQgPSB0aGlzLmRyYWdTdGFydFNvdXJjZS5hc09ic2VydmFibGUoKTtcbiAgICBkcmFnU3RvcCQgPSB0aGlzLmRyYWdTdG9wU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xuICAgIFxuICAgIHN0YXJ0RHJhZyhldmVudDogVHJlZU5vZGVEcmFnRXZlbnQpIHtcbiAgICAgICAgdGhpcy5kcmFnU3RhcnRTb3VyY2UubmV4dChldmVudCk7XG4gICAgfVxuICAgIFxuICAgIHN0b3BEcmFnKGV2ZW50OiBUcmVlTm9kZURyYWdFdmVudCkge1xuICAgICAgICB0aGlzLmRyYWdTdG9wU291cmNlLm5leHQoZXZlbnQpO1xuICAgIH1cbn0iXX0=