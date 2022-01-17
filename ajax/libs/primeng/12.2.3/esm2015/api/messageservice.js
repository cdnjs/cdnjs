import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class MessageService {
    constructor() {
        this.messageSource = new Subject();
        this.clearSource = new Subject();
        this.messageObserver = this.messageSource.asObservable();
        this.clearObserver = this.clearSource.asObservable();
    }
    add(message) {
        if (message) {
            this.messageSource.next(message);
        }
    }
    addAll(messages) {
        if (messages && messages.length) {
            this.messageSource.next(messages);
        }
    }
    clear(key) {
        this.clearSource.next(key || null);
    }
}
MessageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: MessageService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
MessageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: MessageService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: MessageService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvYXBpL21lc3NhZ2VzZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFJL0IsTUFBTSxPQUFPLGNBQWM7SUFEM0I7UUFHWSxrQkFBYSxHQUFHLElBQUksT0FBTyxFQUFxQixDQUFDO1FBQ2pELGdCQUFXLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUU1QyxvQkFBZSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEQsa0JBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO0tBa0JuRDtJQWhCRyxHQUFHLENBQUMsT0FBZ0I7UUFDaEIsSUFBSSxPQUFPLEVBQUU7WUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNwQztJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsUUFBbUI7UUFDdEIsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUM3QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNyQztJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsR0FBWTtRQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDOzsyR0F0QlEsY0FBYzsrR0FBZCxjQUFjOzJGQUFkLGNBQWM7a0JBRDFCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnLi9tZXNzYWdlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VTZXJ2aWNlIHtcbiAgICBcbiAgICBwcml2YXRlIG1lc3NhZ2VTb3VyY2UgPSBuZXcgU3ViamVjdDxNZXNzYWdlfE1lc3NhZ2VbXT4oKTtcbiAgICBwcml2YXRlIGNsZWFyU291cmNlID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAgIFxuICAgIG1lc3NhZ2VPYnNlcnZlciA9IHRoaXMubWVzc2FnZVNvdXJjZS5hc09ic2VydmFibGUoKTtcbiAgICBjbGVhck9ic2VydmVyID0gdGhpcy5jbGVhclNvdXJjZS5hc09ic2VydmFibGUoKTtcbiAgICBcbiAgICBhZGQobWVzc2FnZTogTWVzc2FnZSkge1xuICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlU291cmNlLm5leHQobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgYWRkQWxsKG1lc3NhZ2VzOiBNZXNzYWdlW10pIHtcbiAgICAgICAgaWYgKG1lc3NhZ2VzICYmIG1lc3NhZ2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlU291cmNlLm5leHQobWVzc2FnZXMpO1xuICAgICAgICB9IFxuICAgIH1cbiAgICBcbiAgICBjbGVhcihrZXk/OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jbGVhclNvdXJjZS5uZXh0KGtleXx8bnVsbCk7XG4gICAgfVxuICAgIFxufSJdfQ==