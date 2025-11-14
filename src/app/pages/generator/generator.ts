import { Component } from '@angular/core';
import {GeniaService} from '../../services/genia-service';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './generator.html',
  styleUrl: './generator.scss'
})
export class Generator {

  text = '';
  summary = '';
  pdfUrl: SafeResourceUrl | null = null;

  constructor(private genia: GeniaService, private sanitizer: DomSanitizer) {}

  generate() {
    this.genia.generate(this.text).subscribe((res: { data: any; }) => {
      const data = res.data;

      this.summary = data.summary;

      const cleanBase64 = data.pdfBase64.replace(/\s/g, '');

      const pdfBlob = this.base64ToBlob(cleanBase64, 'application/pdf');

      const objectUrl = URL.createObjectURL(pdfBlob);
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
    });
  }

  private base64ToBlob(base64: string, type: string) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    return new Blob([new Uint8Array(byteNumbers)], { type });
  }

}
