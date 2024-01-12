import { Directive, Input, ElementRef, Renderer2, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appPreloadImage]',
  standalone: true
})
export class PreloadImageDirective implements OnInit {
  @Input('appPreloadImage') imageUrl?: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    // Solo agrega la etiqueta de precarga si imageUrl está presente
    console.log('PreloadImageDirective: ',this.imageUrl);
    if (this.imageUrl) {
      const link: HTMLLinkElement = this.renderer.createElement('link');
      this.renderer.setAttribute(link, 'rel', 'preload');
      this.renderer.setAttribute(link, 'as', 'image');
      this.renderer.setAttribute(link, 'href', this.imageUrl);
      const head = this.document.getElementsByTagName('head')[0];
      this.renderer.appendChild(head, link);
    }
  }
}