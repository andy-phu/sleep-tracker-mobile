import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { OvernightSleepData } from '../../data/overnight-sleep-data';
import { SleepService } from '../../services/sleep.service';


@Component({
  selector: 'app-overnight',
  templateUrl: './overnight.page.html',
  styleUrls: ['./overnight.page.scss'],
})
export class OvernightPage implements OnInit {

  options:Intl.DateTimeFormatOptions = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	};
	

	start: string = new Date().toISOString();
	end: string = new Date().toISOString();
	overNight: OvernightSleepData; 
  	sleepService: SleepService;
	added = false;

  constructor() { 
    this.overNight = new OvernightSleepData(new Date(), new Date());
    this.sleepService = new SleepService();

  }

  ngOnInit() {
  }

  	async getKeyCount(){
		const {keys} = await Preferences.keys();
		return keys ? keys.length+1 : 1 
	}

	async addToLog(startLocale:string, start: string, end:string): Promise<void> {
		try {
		//console.log("add to log: ", this.startString, this.endString);
			let keyCount = await this.getKeyCount();
			let index = String(keyCount);
			console.log(`index: ${index}`);
			let newKey = "Overnight" + index;
			let newValue = start + "|" + end + "|" + startLocale;
			await Preferences.set({
				key: newKey, //overnight1
				value: newValue //startDate : endDate
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
	  
	async logAllPreferences(): Promise<void> {
		try {
		  const keys = await Preferences.keys(); // Get all keys
		  console.log(keys);
		  for (const key of keys.keys) {
			try {
			  const { value } = await Preferences.get({ key }); // Get value for each key
			  let valueArr = value?.split("|");
			  let startValue = valueArr ? valueArr[0] :"Value Array Doesn't Exist";
			  let endValue = valueArr ? valueArr[1] : "Value Array Doesn't Exist";

			  console.log(`Key: ${key}, Value: ${startValue} ${endValue}`);
			} catch (error) {
			  console.error(`error getting value for key ${key}:`, error);
			}
		  }
		} catch (error) {
		  console.error('error getting key', error);
		}
	  }


	addOvernightSleep():void{
		// console.log(this.start);
		// console.log(this.end);
		let startDate = new Date(this.start);
		let startLocale = startDate.toLocaleString();
		let endDate = new Date(this.end);
		let startString = startDate.toLocaleDateString('en-US', this.options);
		let endString = endDate.toLocaleDateString('en-US', this.options);

		// console.log("home page date",startDate, endDate);
		// console.log("home page string",startDate.toLocaleString('en-US',this.options), endDate.toLocaleString('en-US',this.options));
		if (endDate > startDate){
			//this.overNight = new OvernightSleepData(startDate,endDate);
			this.addToLog(startLocale, startString,endString); //adds to the database everytime the button is clicked
			console.log("overNightObject:", this.overNight);
      //add to sleep services array of overnight objects our new initialized overNight Object
      this.sleepService.logOvernightData(this.overNight);
		}
		else{
			console.error("END DATE MUST BE AFTER START DATE");
		}
		// console.log('summary string:', this.overNight.summaryString());
		// console.log('date string:', this.overNight.dateString());
	}

  	clearOvernightLog():void{
		this.clearLog();
    	SleepService.AllOvernightData = [];//clear sleep service array
	}

	showOvernightLog():void{
		this.logAllPreferences();
		console.log("DISPLAY SLEEP SERVICE OVERNIGHT ARRAY");
		SleepService.AllOvernightData.forEach(element =>{
			console.log(element);
		});
 	}

	  
	  


}
