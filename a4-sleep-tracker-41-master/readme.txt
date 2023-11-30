--Readme document for (Marcus Linture, mlinture@uci.edu, 54884520) and (Andy Phu, phuat@uci.edu, 18475327)--

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

20/20
- 3/3 The ability to log overnight sleep
- 3/3 The ability to log sleepiness during the day
- 3/3 The ability to view these two categories of logged data
- 3/3 Either using a native device resource or backing up logged data
- 3/3 Following good principles of mobile design
- 3/3 Creating a compelling app
- 2/2 A readme and demo video which explains how these features were implemented and their design rationale

2. How long, in hours, did it take you to complete this assignment?

It took us 15 hours to complete this assigment.

3. What online resources did you consult when completing this assignment? (list specific URLs)

Ionic Documentation: https://ionicframework.com/docs/api/ and related links,
Ideas for popup: https://www.w3schools.com/howto/howto_js_popup.asp,
How to use capacitor: https://capacitorjs.com/docs/apis/preferences 

4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?

We only worked together on this project.

5. Is there anything special we need to know in order to run your code?

No.

--Aim for no more than two sentences for each of the following questions.--


6. Did you design your app with a particular type of user in mind? If so, whom?

We designed our app to mainly target students, as the app has a relatively simple interface and its quick and easy nature to log and view logs. 

7. Did you design your app specifically for iOS or Android, or both?

We designed our app so it would be compatible with both.

8. How can a person log overnight sleep in your app? Why did you choose to support logging overnight sleep in this way?

The user logs their overnight sleep by specifying the date and time of when they fell asleep and woke up, with a calendar and digital clock interface popping up to support the functionalities, respectively. We chose to log sleep this way as it is a simple yet intuitve way to gather all necessary information.

9. How can a person log sleepiness during the day in your app? Why did you choose to support logging sleepiness in this way?

The user logs their sleepiness during the day by using a slider ranging from 1-7, with each number corresponding to the Stanford Sleepiness Scale. Again, we chose this implementation as it makes logging quick without compromising any crucial information.

10. How can a person view the data they logged in your app? Why did you choose to support viewing logged data in this way?

The user views the data by navigating to the logs interface, in which the overnight sleep logs and sleepiness logs are separated and sorted in reverse chronological order. We chose this implementation as most people would probably want to see their most recent logs at top, and combining the two different logs would clutter our interface and potentially overwhelm the user.

11. Which feature choose--using a native device resource, backing up logged data, or both?

We chose to back up the logged data through a capacitor.

12. If you used a native device resource, what feature did you add? How does this feature change the app's experience for a user?

N/A

13. If you backed up logged data, where does it back up to?

It backs up to a local capacitor.

14. How does your app implement or follow principles of good mobile design?

Our app follows principles of good mobile design as it gives off a clean first impression and presents all necessary information without ever overwhelming the user. Our functions prevent any errors as any invalid logs will not be stored, and our relatively simple UI gives users a clear call to action and easy navigation between all pages.