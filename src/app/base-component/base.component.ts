import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-base-component',
  template: ''
})
export class BaseComponent {

  @Input()
  isAlternate = false;

  uniqueId = 0;

  constructor() { }

  getRandomId() {
    return Math.floor(Math.random() * (10 + 1));
  }

  scrollToThisSection(e) {
    const el = e.currentTarget;
    const parentID = el.closest('.hero').getAttribute('id');
    const parent = document.getElementById(parentID);
    this.scrollToSection(parent);
  }

  scrollToPrevSection(e) {
    const el = e.currentTarget;
    const parentID = el.closest('.hero').getAttribute('id');
    const slides = document.querySelectorAll('.hero');

    let slide = null;
    let prevSlide = null;

    for (let i = 0; i < slides.length; i++) {
      slide = slides[i];

      if (slide.getAttribute('id') === parentID) {
        break;
      }

      prevSlide = slide;
    }

    this.scrollToSection(prevSlide);
  }

  scrollToNextSection(e) {
    const el = e.currentTarget;
    const parentID = el.closest('.hero').getAttribute('id');
    const slides = document.querySelectorAll('.hero');

    let slide;
    let nextSlide = null;

    for (let i = 0; i < slides.length; i++) {
      slide = slides[i];
      if (slide.getAttribute('id') === parentID) {
        nextSlide = slides[i + 1];
        break;
      }
    }

    this.scrollToSection(nextSlide);
  }

  scrollToSectionById(id) {
    const el = document.getElementById(id);
    this.scrollToSection(el);
  }

  scrollToSection(el) {
    const y = el.getBoundingClientRect().top + window.scrollY;
    window.scroll({
      top: y,
      behavior: 'smooth'
    });
  }

}
