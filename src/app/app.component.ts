import { Component, Injectable } from '@angular/core';
import { Barcode, BarcodePicker, Camera, CameraSettings, ScanResult, ScanSettings } from "scandit-sdk-angular";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { GetSvgBarcodeService } from './get-svg-barcode.service';
import { AddToCartService } from './add-to-cart.service';

@Component({
  selector: 'scandit-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

@Injectable({providedIn:'root'})
export class AppComponent  {

  public activeSettings: ScanSettings;
  public settingsSymbologies: ScanSettings;
  public scannerGuiStyle: BarcodePicker.GuiStyle = BarcodePicker.GuiStyle.LASER;
  public activeCamera: Camera;
  public cameraSettings: CameraSettings;
  public scanningPaused: boolean = false;
  public visible: boolean = true;
  public fps: number = 30;
  public videoFitContain: BarcodePicker.ObjectFit = BarcodePicker.ObjectFit.CONTAIN;
  public videoFitCover: BarcodePicker.ObjectFit = BarcodePicker.ObjectFit.COVER;
  public videoFit: BarcodePicker.ObjectFit = this.videoFitCover;
  public scannedCodes: Barcode[] = [];
  public isReady: boolean = false;
  public enableCameraSwitcher: boolean = true;
  public enablePinchToZoom: boolean = true;
  public enableTapToFocus: boolean = true;
  public enableTorchToggle: boolean = true;
  public enableVibrateOnScan: boolean = true;
  public cameraAccess: boolean = true;
  public enableSoundOnScan: boolean = true;
  public isShowDiv: boolean = false;  
  public possibleCameras: Camera[] = [];


  constructor(private addToCartService : AddToCartService, private matIconRegistry: MatIconRegistry,private domSanitizer: DomSanitizer, private svgBarcode: GetSvgBarcodeService) {


    this.matIconRegistry.addSvgIconLiteral('barcodeicon', this.domSanitizer.bypassSecurityTrustHtml(this.svgBarcode.provideBarcodeIcon()));



    // We enable EAN13 and CODE128 symbologies, setting up a 3 sec duplicate filter and a rectangle search area 
    // of 100% width and 20% height, in the centre of the screen
    this.settingsSymbologies = new ScanSettings({
      enabledSymbologies: [Barcode.Symbology.EAN13,Barcode.Symbology.CODE128],
      codeDuplicateFilter: 3000,
      searchArea: { x: 0, y: 0.4, width: 1, height: 0.2 },
    });

    // We apply the settings, from the ScanSettings object previously created
    this.activeSettings = this.settingsSymbologies;

    // We enable Full HD resolution 
    this.cameraSettings = {
      resolutionPreference: CameraSettings.ResolutionPreference.FULL_HD,
    };

    // We call a custom method to setup different camera and barcode picker settings on a scan button press in the UI  
    this.setupCameraSettings();
  }

  // On a scan event, we save the decoded barcode in an array of Barcode objects 
  public onScan(result: ScanResult): void {
    this.scannedCodes = this.scannedCodes.concat(result.barcodes);

    this.addToCartService.addProductToCart(result.barcodes);

  }

  // We toggle camera access, camera stream for recognition of codes, visibility of the barcode picker UI and enable viewfinder laser style
  public setupCameraSettings(): void{
    this.cameraAccess = !this.cameraAccess;
    this.scanningPaused = !this.scanningPaused;
    this.visible = !this.visible;
    this.scannerGuiStyle = BarcodePicker.GuiStyle.LASER;
    
    this.showCameraDiv();
  }

  // Custom method to enable/disable the div component that contians the barcode-picker 
  public showCameraDiv(): void{
     
      this.isShowDiv = !this.isShowDiv;  
  }

}
