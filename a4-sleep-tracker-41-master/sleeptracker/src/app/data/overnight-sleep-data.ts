import { throwIfEmpty } from 'rxjs';
import { SleepData } from './sleep-data';
import { Preferences } from '@capacitor/preferences';

export class OvernightSleepData extends SleepData {
	private startDate:Date;
	private endDate:Date;
	startString: string;
	endString: string;

	options:Intl.DateTimeFormatOptions = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	};
	


	constructor(sleepStart:Date, sleepEnd:Date) {
		super();
		this.startDate = sleepStart;
		this.endDate = sleepEnd;
		// console.log(`Start Date: ${this.startDate} End Date: ${this.endDate}`);
		this.startString = sleepStart.toLocaleString('en-US',this.options);
		this.endString = sleepEnd.toLocaleString('en-US',this.options);
		// console.log(`Start String: ${this.startString} End String: ${this.endString}`);
	}

	override summaryString():string {
		var sleepStart_ms = this.startDate.getTime();
		var sleepEnd_ms = this.endDate.getTime();


		// Calculate the difference in milliseconds
		var difference_ms = sleepEnd_ms - sleepStart_ms;
		    
		// Convert to hours and minutes
		return Math.floor(difference_ms / (1000*60*60)) + " hours, " + Math.floor(difference_ms / (1000*60) % 60) + " minutes.";
	}

	override dateString():string {
		return "Night of " + this.startDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
	}

	async addToLog(): Promise<void> {
		try {
		  console.log("add to log: ", this.startString, this.endString);
		  await Preferences.set({
			key: this.startString, //overnight1
			value: this.endString //startDate : endDate
		  });
	
		  const { value } = await Preferences.get({ key: this.startString });
		  //console.log(`End time: ${value}`);
		} catch (error) {
		  console.error('Error while adding to log:', error);
		}
	}

	async logAllPreferences(): Promise<void> {
		try {
		  const keys = await Preferences.keys(); // Get all keys
		  console.log(keys);
		  for (const key of keys.keys) {
			try {
			  const { value } = await Preferences.get({ key }); // Get value for each key
			  console.log(`Key: ${key}, Value: ${value}`);
			} catch (error) {
			  console.error(`error getting value for key ${key}:`, error);
			}
		  }
		} catch (error) {
		  console.error('error getting key', error);
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
	  
	  

}
