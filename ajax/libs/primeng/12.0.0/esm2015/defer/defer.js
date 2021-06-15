import { NgModule, Directive, TemplateRef, EventEmitter, Output, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
export class DeferredLoader {
    constructor(el, renderer, viewContainer, cd) {
        this.el = el;
        this.renderer = renderer;
        this.viewContainer = viewContainer;
        this.cd = cd;
        this.onLoad = new EventEmitter();
    }
    ngAfterViewInit() {
        if (this.shouldLoad()) {
            this.load();
        }
        if (!this.isLoaded()) {
            this.documentScrollListener = this.renderer.listen('window', 'scroll', () => {
                if (this.shouldLoad()) {
                    this.load();
                    this.documentScrollListener();
                    this.documentScrollListener = null;
                }
            });
        }
    }
    shouldLoad() {
        if (this.isLoaded()) {
            return false;
        }
        else {
            let rect = this.el.nativeElement.getBoundingClientRect();
            let docElement = document.documentElement;
            let winHeight = docElement.clientHeight;
            return (winHeight >= rect.top);
        }
    }
    load() {
        this.view = this.viewContainer.createEmbeddedView(this.template);
        this.onLoad.emit();
        this.cd.detectChanges();
    }
    isLoaded() {
        return this.view != null;
    }
    ngOnDestroy() {
        this.view = null;
        if (this.documentScrollListener) {
            this.documentScrollListener();
        }
    }
}
DeferredLoader.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: DeferredLoader, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
DeferredLoader.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.4", type: DeferredLoader, selector: "[pDefer]", outputs: { onLoad: "onLoad" }, queries: [{ propertyName: "template", first: true, predicate: TemplateRef, descendants: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: DeferredLoader, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pDefer]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { onLoad: [{
                type: Output
            }], template: [{
                type: ContentChild,
                args: [TemplateRef]
            }] } });
export class DeferModule {
}
DeferModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: DeferModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DeferModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: DeferModule, declarations: [DeferredLoader], imports: [CommonModule], exports: [DeferredLoader] });
DeferModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: DeferModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: DeferModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [DeferredLoader],
                    declarations: [DeferredLoader]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvZGVmZXIvZGVmZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQW9DLFdBQVcsRUFDdEMsWUFBWSxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQzdHLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7QUFLN0MsTUFBTSxPQUFPLGNBQWM7SUFVdkIsWUFBbUIsRUFBYyxFQUFTLFFBQW1CLEVBQVMsYUFBK0IsRUFBVSxFQUFxQjtRQUFqSCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQUFVLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBUjFILFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQVE4RSxDQUFDO0lBRXhJLGVBQWU7UUFDWCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUNuQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDZjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDbEIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFO2dCQUN4RSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRTtvQkFDbkIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNaLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO29CQUM5QixJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDO2lCQUN0QztZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRUQsVUFBVTtRQUNOLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ2pCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO2FBQ0k7WUFDRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQ3pELElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUM7WUFDMUMsSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQztZQUV4QyxPQUFPLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNsQztJQUNMLENBQUM7SUFFRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO0lBQzdCLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFakIsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEVBQUU7WUFDN0IsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7U0FDakM7SUFDTCxDQUFDOzsyR0F6RFEsY0FBYzsrRkFBZCxjQUFjLHFIQUlULFdBQVc7MkZBSmhCLGNBQWM7a0JBSDFCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLFVBQVU7aUJBQ3ZCO3dMQUdhLE1BQU07c0JBQWYsTUFBTTtnQkFFb0IsUUFBUTtzQkFBbEMsWUFBWTt1QkFBQyxXQUFXOztBQTZEN0IsTUFBTSxPQUFPLFdBQVc7O3dHQUFYLFdBQVc7eUdBQVgsV0FBVyxpQkFqRVgsY0FBYyxhQTZEYixZQUFZLGFBN0RiLGNBQWM7eUdBaUVkLFdBQVcsWUFKWCxDQUFDLFlBQVksQ0FBQzsyRkFJZCxXQUFXO2tCQUx2QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO29CQUN6QixZQUFZLEVBQUUsQ0FBQyxjQUFjLENBQUM7aUJBQ2pDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxEaXJlY3RpdmUsRWxlbWVudFJlZixBZnRlclZpZXdJbml0LE9uRGVzdHJveSxUZW1wbGF0ZVJlZixFbWJlZGRlZFZpZXdSZWYsXG4gICAgICAgIFZpZXdDb250YWluZXJSZWYsUmVuZGVyZXIyLEV2ZW50RW1pdHRlcixPdXRwdXQsQ29udGVudENoaWxkLCBDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcERlZmVyXSdcbn0pXG5leHBvcnQgY2xhc3MgRGVmZXJyZWRMb2FkZXIgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LE9uRGVzdHJveSB7XG4gICAgICAgIFxuICAgIEBPdXRwdXQoKSBvbkxvYWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgICAgICBcbiAgICBkb2N1bWVudFNjcm9sbExpc3RlbmVyOiBGdW5jdGlvbjtcbiAgICBcbiAgICB2aWV3OiBFbWJlZGRlZFZpZXdSZWY8YW55PjtcbiAgICAgICAgICAgIFxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHB1YmxpYyB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cbiAgICBcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnNob3VsZExvYWQoKSkge1xuICAgICAgICAgICAgdGhpcy5sb2FkKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICghdGhpcy5pc0xvYWRlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50U2Nyb2xsTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbignd2luZG93JywgJ3Njcm9sbCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zaG91bGRMb2FkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvY3VtZW50U2Nyb2xsTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHNob3VsZExvYWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmlzTG9hZGVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCByZWN0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgbGV0IGRvY0VsZW1lbnQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgICAgICBsZXQgd2luSGVpZ2h0ID0gZG9jRWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiAod2luSGVpZ2h0ID49IHJlY3QudG9wKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBsb2FkKCk6IHZvaWQgeyBcbiAgICAgICAgdGhpcy52aWV3ID0gdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLnRlbXBsYXRlKTtcbiAgICAgICAgdGhpcy5vbkxvYWQuZW1pdCgpO1xuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gICAgXG4gICAgaXNMb2FkZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpZXcgIT0gbnVsbDtcbiAgICB9XG4gICAgICAgICAgICBcbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy52aWV3ID0gbnVsbDtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50U2Nyb2xsTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtEZWZlcnJlZExvYWRlcl0sXG4gICAgZGVjbGFyYXRpb25zOiBbRGVmZXJyZWRMb2FkZXJdXG59KVxuZXhwb3J0IGNsYXNzIERlZmVyTW9kdWxlIHsgfSJdfQ==