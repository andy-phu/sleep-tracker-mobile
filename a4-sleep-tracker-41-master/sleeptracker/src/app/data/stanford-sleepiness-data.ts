/* from the Stanford Sleepiness Scale */
/* https://web.stanford.edu/~dement/sss.html */

import { SleepData } from './sleep-data';
import { Preferences } from '@capacitor/preferences';

export class StanfordSleepinessData extends SleepData {
	public static ScaleValues = [undefined,//Sleepiness scale starts at 1
	'Feeling active, vital, alert, or wide awake', //1
	'Functioning at high levels, but not at peak; able to concentrate', //2
	'Awake, but relaxed; responsive but not fully alert', //3
	'Somewhat foggy, let down', //4
	'Foggy; losing interest in remaining awake; slowed down', //5
	'Sleepy, woozy, fighting sleep; prefer to lie down', //6
	'No longer fighting sleep, sleep onset soon; having dream-like thoughts']; //7

	private loggedValue:number;
	options:Intl.DateTimeFormatOptions = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	};

	constructor(loggedValue:number, loggedAt:Date = new Date()) {
		super();
		this.loggedValue = loggedValue;
		this.loggedAt = loggedAt;
	}

	override summaryString():string {
		return this.loggedValue + ": " + StanfordSleepinessData.ScaleValues[this.loggedValue];
	}

	async addToLog(): Promise<void> {
		try {
			console.log(StanfordSleepinessData.ScaleValues[this.loggedValue] + " at " + this.loggedAt);

			//console.log(`End time: ${value}`);
		  } catch (error) {
			console.error('Error while adding to log:', error);
		  }
	}

	async clearLog(): Promise<void> {
		try{
			await Preferences.clear();
			console.log("capacitor cleared");
		}catch(error){
			console.error("nothing in capacitor");
		}
	}
}
