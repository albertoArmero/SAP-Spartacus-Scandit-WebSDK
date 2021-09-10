import { Component, Injectable } from '@angular/core';
import { Barcode, BarcodePicker, Camera, CameraSettings, ScanResult, ScanSettings } from "scandit-sdk";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

@Injectable({providedIn:'root'})
export class AppComponent  {

  public activeSettings: ScanSettings;
  public settingsSymbologies: ScanSettings;
  public scannerGuiStyle: BarcodePicker.GuiStyle = BarcodePicker.GuiStyle.LASER;
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


  constructor() {

    this.settingsSymbologies = new ScanSettings({
      enabledSymbologies: [Barcode.Symbology.CODE128,Barcode.Symbology.EAN13],
      codeDuplicateFilter: 3000,
      searchArea: { x: 0, y: 0.4, width: 1, height: 0.2 },
    });

    this.activeSettings = this.settingsSymbologies;

    this.cameraSettings = {
      resolutionPreference: CameraSettings.ResolutionPreference.FULL_HD,
    };

    this.setupCameraSettings();
  
  }

  public toggleGuiStyle(): void {
    if (this.scannerGuiStyle === BarcodePicker.GuiStyle.VIEWFINDER) {
      this.scannerGuiStyle = BarcodePicker.GuiStyle.LASER;
    } else {
      this.scannerGuiStyle = BarcodePicker.GuiStyle.VIEWFINDER;
    }
  }

  public onScan(result: ScanResult): void {
    this.scannedCodes = this.scannedCodes.concat(result.barcodes);


  }

  public setupCameraSettings(): void{
    this.cameraAccess = !this.cameraAccess;
    this.scanningPaused = !this.scanningPaused;
    this.visible = !this.visible;
    this.showCameraDiv();
  
  }

  public showCameraDiv(): void{
     
      this.isShowDiv = !this.isShowDiv;  
  }

}
