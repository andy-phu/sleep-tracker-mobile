import { Component, OnInit } from '@angular/core';
import { StanfordSleepinessData } from 'src/app/data/stanford-sleepiness-data';
import { Preferences } from '@capacitor/preferences';
import { SleepService } from '../../services/sleep.service';

@Component({
  selector: 'app-sleepiness',
  templateUrl: './sleepiness.page.html',
  styleUrls: ['./sleepiness.page.scss'],
})
export class SleepinessPage implements OnInit {

  scale = 1;
  sleepData: StanfordSleepinessData;
  data = StanfordSleepinessData.ScaleValues;
  sleepService:SleepService;
  options:Intl.DateTimeFormatOptions = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	};
  added = false;

  constructor() { 
    this.sleepData = new StanfordSleepinessData(this.scale, new Date());
    this.sleepService = new SleepService();
  }

  ngOnInit() {
  }

  async getKeyCount(){
		const {keys} = await Preferences.keys();
		return keys ? keys.length+1 : 1 
	}

	async addToLog(): Promise<void> {
		try {
			this.sleepData = new StanfordSleepinessData(this.scale, new Date());
			this.sleepService.logSleepinessData(this.sleepData);
			let keyCount = await this.getKeyCount();
			let index = String(keyCount);
			let newKey = "Sleepiness" + index;
			let newValue = this.sleepData.loggedAt.toLocaleDateString("en-US", this.options) + "|" + String(this.scale) + "|" + this.sleepData.loggedAt.toLocaleString();
			await Preferences.set({
				key: newKey, //Sleepiness1
				value: newValue //date : val
			});
			this.added = true;
			const { value } = await Preferences.get({ key: newKey });
			console.log(`End time: ${value}`);
		} catch (error) {
			console.error('Error while adding to log:', error);
		}
	}

	async clearLog(): Promise<void>{
		try{
			await Preferences.clear();
			console.log("capacitor cleared");
		}catch(error){
			console.error("nothing in capacitor");
		}
	}


  clearSleepinessLog():void{
		this.clearLog();
    	SleepService.AllSleepinessData = [];//clear sleep service array
	}

	showSleepinessLog():void{
		console.log("DISPLAY SLEEP SERVICE SLEEPINESS ARRAY");
		SleepService.AllSleepinessData.forEach(element =>{
			console.log(element);
		});
 	}


}
