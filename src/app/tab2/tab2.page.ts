import { Component } from "@angular/core";
import { PopoverController } from "@ionic/angular";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page {
  

  constructor(private popoverCtrl: PopoverController) {}

  async apiRequest() {
    const top = await this.popoverCtrl.getTop()
    top.backdropDismiss = false
    console.log('cant dismiss')
    setTimeout(function() {
      console.log('done')
      top.backdropDismiss = true
    }, 5000)
  }
}
