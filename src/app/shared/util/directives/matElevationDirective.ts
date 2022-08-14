import { Directive, ElementRef, HostListener, Input, Renderer2, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[matElevation]'
})
export class MatElevationDirective implements OnChanges {

    constructor(
        private element: ElementRef,
        private renderer: Renderer2
    ) {
    }
    ngOnChanges(changes: SimpleChanges): void {
        if(this.clicked===false){
            this.removeFullScreen();
        }
    }
       
    @Input('matElevation') clicked: boolean;

    @HostListener('mouseenter')
    onMouseEnter() {
        this.setElevation();
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.removeElevation();
    }

    @HostListener('click') 
    onClick() {
        if(this.clicked===true){
            this.addFullScreen();
        }
        else{
            this.removeFullScreen();
        }
    }
    setElevation() {
        this.renderer.addClass(this.element.nativeElement, `mat-elevation-z24`);
    }
    removeElevation() {
        this.renderer.removeClass(this.element.nativeElement, `mat-elevation-z24`);
    }
    addFullScreen(){
        this.renderer.addClass(this.element.nativeElement,'fullscreen');
        this.renderer.setStyle(this.element.nativeElement,'box-shadow','rgb(180, 180, 180) 329px 237px 365px 69px')
    }
    removeFullScreen(){
        this.renderer.removeClass(this.element.nativeElement,'fullscreen');
        this.renderer.removeStyle(this.element.nativeElement,'box-shadow');
    }
}