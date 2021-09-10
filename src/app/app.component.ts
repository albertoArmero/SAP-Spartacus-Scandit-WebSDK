import { Component, Injectable } from '@angular/core';
import { Barcode, BarcodePicker, Camera, CameraSettings, ScanResult, ScanSettings } from "scandit-sdk-angular";

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


  constructor() {

    // We enable EAN13 and CODE128 symbologies, setting up a 3 sec duplicte filter and a rectangle search area 
    // of 100% width and 20% height, in the center of the screen
    this.settingsSymbologies = new ScanSettings({
      enabledSymbologies: [Barcode.Symbology.EAN13,Barcode.Symbology.CODE128],
      codeDuplicateFilter: 3000,
      searchArea: { x: 0, y: 0.4, width: 1, height: 0.2 },
    });

    // We apply the settings, from the ScanSettings objectd previously created
    this.activeSettings = this.settingsSymbologies;

    // We enable Full HD resolution 
    this.cameraSettings = {
      resolutionPreference: CameraSettings.ResolutionPreference.FULL_HD,
    };

    // Calling custom method to enable camera access,   
    this.setupCameraSettings();
  
  }

  public onScan(result: ScanResult): void {
    this.scannedCodes = this.scannedCodes.concat(result.barcodes);


  }

  public setupCameraSettings(): void{
    this.cameraAccess = !this.cameraAccess;
    this.scanningPaused = !this.scanningPaused;
    this.visible = !this.visible;
    this.scannerGuiStyle = BarcodePicker.GuiStyle.LASER;
    
    this.showCameraDiv();
  
  }

  public showCameraDiv(): void{
     
      this.isShowDiv = !this.isShowDiv;  
  }

}
