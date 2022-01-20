<script>
	// TODO: Load and save from localStorage
	let activities = JSON.parse(localStorage.getItem('activityLogger-nourthepigeon')) || [{id: uuidv4(), name: 'Use Activity Logger', time: 0, dateStarted: getDate(), active: true, datesWorkedOn: []}];
	//let activities = [{id: 0, name: 'Jogging', time: 50000, dateStarted: '2022-01-10', active: true, datesWorkedOn: []}];
	let selectedActivity = undefined;
	let selectedIndex = undefined;
	
	let playPause = false;
	let lastTime = 0;
	let currentTime = 0;
	let deltaTime = 0;
	let delayTime = 0;
	let loopAF;
	
	function timerToggle(){
		if(playPause == false){
			let dates = new Set(selectedActivity.datesWorkedOn);
			dates.add(getDate());
			selectedActivity.datesWorkedOn = Array.from(dates);
			
			loopAF = window.requestAnimationFrame(timer);
		} else {
			window.cancelAnimationFrame(loopAF);
			lastTime = 0;
			currentTime = 0;
			deltaTime = 0;
			
			saveActivities();
		}		
		playPause = !playPause;
	}
	
	function timer(time){
		lastTime = currentTime;
		currentTime = time || 0;
		
		if(lastTime !== 0){
			deltaTime = currentTime - lastTime;
			delayTime += deltaTime;
			selectedActivity.time = selectedActivity.time + deltaTime;
		} 
		
		if(delayTime >= 60000){
			saveActivities();
		}
		
		loopAF = window.requestAnimationFrame(timer);
	}
	
	function saveActivities(){
			delayTime = 0;
			localStorage.setItem('activityLogger-nourthepigeon', JSON.stringify(activities));
	}
	
	function selectActivity(e){
		selectedIndex = activities.findIndex(x => x.id == e.target.id);

		selectedActivity = activities[selectedIndex];
	}
	
	function deselectActivity(){
		if(playPause == true){
			timerToggle();
		} else {
			saveActivities();
		}
		selectedActivity = undefined;
	}
	
	function removeActivity(e){
		activities = activities.filter(x => x.id != e.target.id);
		saveActivities();
	}
	
	function addActivity(e){
		let newActivity = document.getElementById("activityName");
		if(newActivity.value !== ""){
			activities.push({
				id: uuidv4(),
				name: newActivity.value,
				time: 0,
				dateStarted: getDate(),
				datesWorkedOn: [],
				active: true
			})
			activities = activities;
		} else {
			console.log('empty')
		}
		
		newActivity.value = "";
		
		saveActivities();
	}
	
	function getDate(){
    let todaysDate = new Date();
    let todaysDate_formatted = {
        Millisecond: `${todaysDate.getMilliseconds()}`,
        Second: todaysDate.getSeconds() < 10 ? `0${todaysDate.getSeconds()}` : `${todaysDate.getSeconds()}`,
        Minute: todaysDate.getMinutes() < 10 ? `0${todaysDate.getMinutes()}` : `${todaysDate.getMinutes()}`,
        Hour: todaysDate.getHours() < 10 ? `0${todaysDate.getHours()}` : `${todaysDate.getHours()}`,
        Day: todaysDate.getDate() < 10 ? `0${todaysDate.getDate()}` : `${todaysDate.getDate()}`,
        Month: todaysDate.getMonth() < 9 ? `0${todaysDate.getMonth()+1}` : `${todaysDate.getMonth()+1}`, // I hate that months are zero indexed but nothing else is...
        Year: `${todaysDate.getFullYear()}`,
    }
    switch(true){
        case todaysDate.getTimezoneOffset()>0:
            todaysDate_formatted.timzoneOffset = todaysDate.getTimezoneOffset()/60 < 10 ? `-0${todaysDate.getTimezoneOffset()/60}` : `-${todaysDate.getTimezoneOffset()/60}`;
            break;
        case todaysDate.getTimezoneOffset()<0:
            todaysDate_formatted.timzoneOffset = -todaysDate.getTimezoneOffset()/60 < 10 ? `+0${-todaysDate.getTimezoneOffset()/60}` : `+${-todaysDate.getTimezoneOffset()/60}`;
            break;
        case todaysDate.getTimezoneOffset()===0:
            todaysDate_formatted.timzoneOffset = 'Z';
            break;
    }
            return `${todaysDate_formatted.Year}-${todaysDate_formatted.Month}-${todaysDate_formatted.Day}`;
	}
	
	function msToTime(duration) {
  	var milliseconds = Math.floor((duration % 1000) / 100),
    	seconds = Math.floor((duration / 1000) % 60),
    	minutes = Math.floor((duration / (1000 * 60)) % 60),
    	hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  	hours = (hours < 10) ? "0" + hours : hours;
  	minutes = (minutes < 10) ? "0" + minutes : minutes;
  	seconds = (seconds < 10) ? "0" + seconds : seconds;
		
  	return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
	}
	
	function uuidv4() {
  	return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    	(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
</script>

<div>
	<h1>
		Activity Logger
	</h1>
	{#if selectedActivity == undefined}
	<h3>
		Active
	</h3>
	{#each activities as activity (activity.id)}
	<div class="activityContainer">
		<button class="badbutton remove" id={activity.id} on:click={removeActivity}>Trash</button>
		<h4>
			{activity.name}
		</h4>
		<p>
			Date Started: {activity.dateStarted}
			<br>
			Total Time: {msToTime(activity.time)}
		</p>
		<button id={activity.id} on:click={selectActivity}>Open!</button>
	</div>
	<br>
	{/each}
	<div class="activityContainer">
		<form>
			<label>
				<h4>
					New Activity:
				</h4>
				<input id="activityName">
			</label>
		</form>
		<br>
		<button on:click={addActivity}>+</button>
	</div>
	{:else}
	<div class="activityContainer" id="selectedActivity">
		<button class="badbutton" id='deselect' on:click={deselectActivity}>X</button>
		<h3>{selectedActivity.name}</h3>
			<h4>{msToTime(selectedActivity.time)}</h4>
			<p>Total Days: {selectedActivity.datesWorkedOn.length}</p>
			{#if playPause == false}
			<button on:click={timerToggle}>Start Timer</button>
			{:else}
			<button on:click={timerToggle}>Stop Timer</button>
			{/if}
	</div>
	{/if}
</div>

<style>
	.activityContainer {
		position: relative;
		background-color: lightblue;
		border: 2px black solid;
		text-align: center;
	}
	
	.badbutton {
		position: absolute;
		left: 0;
		top: 0;
	}

</style>