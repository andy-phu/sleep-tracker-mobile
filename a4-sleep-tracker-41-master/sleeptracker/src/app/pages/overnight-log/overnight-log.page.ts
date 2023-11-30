import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { OvernightSleepData } from '../../data/overnight-sleep-data';
import { StanfordSleepinessData } from 'src/app/data/stanford-sleepiness-data';

interface OverNightObject{
  start: string;
  end: string;
  difference: string;
  dString: string;
}

interface SleepinessObject{
  time: string;
  feeling: string;
  dstr: string;
}

@Component({
  selector: 'app-overnight-log',
  templateUrl: './overnight-log.page.html',
  styleUrls: ['./overnight-log.page.scss'],
})




export class OvernightLogPage implements OnInit {
  overNightArr: OverNightObject[];
  sleepinessArr: SleepinessObject[];
  selectedSegment: string = 'overnight';
  options:Intl.DateTimeFormatOptions = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	};

  
  constructor() { 
    this.overNightArr = [];
    this.sleepinessArr = [];

  }

  ngOnInit() {
    this.showLog();
  }


	summaryString(start:Date, end:Date):string {
		var sleepStart_ms = start.getTime();
		var sleepEnd_ms = end.getTime();


		// Calculate the difference in milliseconds
		var difference_ms = sleepEnd_ms - sleepStart_ms;
		    
		// Convert to hours and minutes
		return Math.floor(difference_ms / (1000*60*60)) + " hours, " + Math.floor(difference_ms / (1000*60) % 60) + " minutes.";
	}

  async showLog(): Promise<void> {
		try {
		  const keys = await Preferences.keys(); // Get all keys
		  console.log(keys);
		  for (const key of keys.keys) {
			try {
        let tempKey = String(key);
        //if the key is for the overnight's then create overnight objects for it 
        if(tempKey.includes("Overnight")){ 
          const { value } = await Preferences.get({ key }); // Get value for each key
          
          let valueArr = value?.split("|");
          let startValue = valueArr ? valueArr[0] :"Value Array Doesn't Exist";
          let endValue = valueArr ? valueArr[1] : "Value Array Doesn't Exist";
          let localeString = valueArr ? valueArr[2] : "Value Array Doesn't Exist";

          console.log(`key: ${key} value1: ${startValue} value2:${endValue}`);
  
          let tempStartDate: Date = new Date(startValue.replace(' at', ''));
          let tempEndDate: Date = new Date((endValue ?? '').replace(' at', ''));
          console.log("temp start and end date",tempStartDate, tempEndDate);
  
          let diff: string= this.summaryString(tempStartDate, tempEndDate);
          //split value string [startDate,endDate]
          //[Object1(startDate,endDate)]
          //Overnight1 
          //splits value string[date, sleepValue]
          //[Object1(date,sleepValue), Object2(date,sleepValue)]
          const tempObject: OverNightObject = {
            //value: startDate : endDate
            start: startValue,
            end: endValue ?? '', 
            difference: diff,
            dString: tempStartDate.toLocaleString()
          };
  
          this.overNightArr.push(tempObject);
          //console.log(`Key: ${key}, Value: ${value}`);
        }
        else if(tempKey.includes("Sleepiness")){
          const { value } = await Preferences.get({ key });
          let valueArr = value?.split("|");
          let submission = valueArr ? valueArr[0] : "Value Array Doesn't Exist";
          let scale = valueArr ? valueArr[1] : "Value Array Doesn't Exist";
          let dString = valueArr ? valueArr[2] : "Value Array Doesn't Exist";
          let conv:number = parseInt(scale, 10);
          let ret = StanfordSleepinessData.ScaleValues[conv] ?? "";
          console.log(valueArr);
          const temp: SleepinessObject = {
            time: submission,
            feeling: ret,
            dstr: dString
          }
          this.sleepinessArr.push(temp);
        }

        this.overNightArr.sort(function(a,b){
          // console.log(a.start)
          // console.log(b.start)
          let n1 = new Date(a.dString);
          let n2 = new Date(b.dString);
          // console.log(n1)
          // console.log(n2)
          return n2.getTime()-n1.getTime();
        });

        this.sleepinessArr.sort(function(a,b){
          let t1 = new Date(a.dstr);
          let t2 = new Date(b.dstr);
          return t2.getTime()-t1.getTime();
        });
			} catch (error) {
			  console.error(`error getting value for key ${key}:`, error);
			}
		  }
		} catch (error) {
		  console.error('error getting key', error);
		}
	}

  segmentChanged(event: CustomEvent) {
    this.selectedSegment = event.detail.value;

  }

  async clearLog(): Promise<void>{
		try{
			await Preferences.clear();
      this.overNightArr = [];
      this.sleepinessArr = [];
			console.log("capacitor cleared");
		}catch(error){
			console.error("nothing in capacitor");
		}
	}

}
