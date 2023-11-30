import { Component } from '@angular/core';
import { SleepService } from '../../services/sleep.service';
import { SleepData } from '../../data/sleep-data';
import { OvernightSleepData } from '../../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../../data/stanford-sleepiness-data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {
	start: string = new Date().toISOString();
	end: string = new Date().toISOString();
	overNight: OvernightSleepData; 


	

	
  	constructor(public sleepService:SleepService) {	
		this.overNight = new OvernightSleepData(new Date(), new Date());
	}

	ngOnInit() {
		console.log(this.allSleepData);                          
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		
		return SleepService.AllSleepData;
	}

	displaySleepData():void{
		// console.log(this.start);
		// console.log(this.end);
		let startDate = new Date(this.start);
		let endDate = new Date(this.end);

		// console.log("home page date",startDate, endDate);
		// console.log("home page string",startDate.toLocaleString('en-US',this.options), endDate.toLocaleString('en-US',this.options));
		if (endDate > startDate){
			this.overNight = new OvernightSleepData(startDate,endDate);
			this.overNight.addToLog(); //adds to the database everytime the button is clicked
			//console.log("overNightObject:", this.overNight);
		}
		else{
			console.error("END DATE MUST BE AFTER START DATE");
		}
		// console.log('summary string:', this.overNight.summaryString());
		// console.log('date string:', this.overNight.dateString());
	}

	clearData():void{
		this.overNight.clearLog();
	}

	showData():void{
		this.overNight.logAllPreferences();
	}


}
