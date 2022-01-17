import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class ConfirmationService {
    constructor() {
        this.requireConfirmationSource = new Subject();
        this.acceptConfirmationSource = new Subject();
        this.requireConfirmation$ = this.requireConfirmationSource.asObservable();
        this.accept = this.acceptConfirmationSource.asObservable();
    }
    confirm(confirmation) {
        this.requireConfirmationSource.next(confirmation);
        return this;
    }
    close() {
        this.requireConfirmationSource.next(null);
        return this;
    }
    onAccept() {
        this.acceptConfirmationSource.next(null);
    }
}
ConfirmationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ConfirmationService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfirmationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ConfirmationService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ConfirmationService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybWF0aW9uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9hcGkvY29uZmlybWF0aW9uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBSS9CLE1BQU0sT0FBTyxtQkFBbUI7SUFEaEM7UUFHWSw4QkFBeUIsR0FBRyxJQUFJLE9BQU8sRUFBZ0IsQ0FBQztRQUN4RCw2QkFBd0IsR0FBRyxJQUFJLE9BQU8sRUFBZ0IsQ0FBQztRQUUvRCx5QkFBb0IsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDckUsV0FBTSxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQWV6RDtJQWJHLE9BQU8sQ0FBQyxZQUEwQjtRQUM5QixJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2xELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7Z0hBcEJRLG1CQUFtQjtvSEFBbkIsbUJBQW1COzJGQUFuQixtQkFBbUI7a0JBRC9CLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDb25maXJtYXRpb24gfSBmcm9tICcuL2NvbmZpcm1hdGlvbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb25maXJtYXRpb25TZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgcmVxdWlyZUNvbmZpcm1hdGlvblNvdXJjZSA9IG5ldyBTdWJqZWN0PENvbmZpcm1hdGlvbj4oKTtcbiAgICBwcml2YXRlIGFjY2VwdENvbmZpcm1hdGlvblNvdXJjZSA9IG5ldyBTdWJqZWN0PENvbmZpcm1hdGlvbj4oKTtcblxuICAgIHJlcXVpcmVDb25maXJtYXRpb24kID0gdGhpcy5yZXF1aXJlQ29uZmlybWF0aW9uU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xuICAgIGFjY2VwdCA9IHRoaXMuYWNjZXB0Q29uZmlybWF0aW9uU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgY29uZmlybShjb25maXJtYXRpb246IENvbmZpcm1hdGlvbikge1xuICAgICAgICB0aGlzLnJlcXVpcmVDb25maXJtYXRpb25Tb3VyY2UubmV4dChjb25maXJtYXRpb24pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgdGhpcy5yZXF1aXJlQ29uZmlybWF0aW9uU291cmNlLm5leHQobnVsbCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIG9uQWNjZXB0KCkge1xuICAgICAgICB0aGlzLmFjY2VwdENvbmZpcm1hdGlvblNvdXJjZS5uZXh0KG51bGwpO1xuICAgIH1cbn1cbiJdfQ==