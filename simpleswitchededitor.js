/*

WEB EGINEERING COURSE - University of L'Aquila 

This example shows how form fields can be changed to static texts which
become editable only by clicking an edit button. This technique
allows to protect form data from unwanted modification. The server
receives the form data as they were sent by the original form
controls.

See the course homepage: http://www.di.univaq.it/gdellape/students.php

*/

function makeInputModifierEdit(staticInput, input)
{
	var inputWrapper = input.parentNode;
	var staticWrapper = staticInput.parentNode;
	
	//l'handler per il bottone "edit" nasconde la stringa e mostra il controllo di input
	//handler for the "edit" button: hides the string and shows the control
	return function(e) {
		inputWrapper.style.display = "inline";
		staticWrapper.style.display = "none";	
	}
}

function makeInputModifierConfirm(staticInput, input)
{
	var inputWrapper = input.parentNode;
	var staticWrapper = staticInput.parentNode;

	//l'handler per il bottone "ok" assegna alla stringa il valore del controllo, 
	//poi mostra la prima e nasconde il secondo
	//handler for the "ok" button: sets the string to the control value, then
	//hides the control and shows the string
	return function(e) {
		staticInput.textContent = input.value;		
		inputWrapper.style.display = "none";
		staticWrapper.style.display = "inline";	
	}
}

function makeInputModifierCancel(staticInput, input)
{
	var inputWrapper = input.parentNode;
	var staticWrapper = staticInput.parentNode;

	//l'handler per il bottone "cancel" assegna al controllo il valore della stringa (cioè quello
	//precedente all'operazione di editing), poi nasconde il primo e mostra la seconda
	//handler for the "cancel" button: sets the control value to the string text (i.e., the value
	//before the edit operation), then hides the control and shows the string
	return function(e) {
		input.value = staticInput.textContent;		
		inputWrapper.style.display = "none";
		staticWrapper.style.display = "inline";	
	}
}

function setupSwitchedInput(input) {
		var currentValue = input.value;
		var inputContainer = input.parentNode;
		
		//creiamo le tre icone (edit, ok e cancel) di cui dotare il controllo
		//create the three button icons (edit, ok, cancel) for the control
		var editIcon =  input.ownerDocument.createElement("img");		
		editIcon.src="edit.png";
		editIcon.alt="[edit]";
		editIcon.title="edit value";
		editIcon.className="edit-button";
		var confirmIcon =  input.ownerDocument.createElement("img");
		confirmIcon.src="accept.png";
		confirmIcon.alt="[ok]";
		confirmIcon.title="accept edit";
		confirmIcon.className="edit-button";
		var cancelIcon =  input.ownerDocument.createElement("img");
		cancelIcon.src="delete.png";
		cancelIcon.alt="[cancel]";
		cancelIcon.title="cancel edit";
		cancelIcon.className="edit-button";
		
		//creiamo la label che conterrà il valore "non editabile" del controllo
		//create the label for the "static" control value
		var staticInput = input.ownerDocument.createElement("span");				
		staticInput.textContent = currentValue;
		
		//creaimo un contenitore per la label e l'icona "edit" corrispondente
		//create a container for the label and its edit icon
		var staticWrapper = input.ownerDocument.createElement("span");				
		staticWrapper.className="switched-static";
		staticWrapper.appendChild(staticInput);
		staticWrapper.appendChild(editIcon);
						
		//creaimo un contenitore per il controllo e le icone "ok" e "concel" corrispondenti
		//create a container for the control and its "ok" and "cancel" icons
		var inputWrapper = input.ownerDocument.createElement("span");		
		inputWrapper.style.display = "none";
		//inseriamo il contenitore prima del controllo, poi mettiamo il controllo nel contenitore
		//insert the container before the control, then insert the control in the container
		inputContainer.insertBefore(inputWrapper,input)		
		inputWrapper.appendChild(input)
		inputWrapper.appendChild(confirmIcon);
		inputWrapper.appendChild(cancelIcon);	
		
		//inseriamo il contenitore della label prima del contenitore del controllo
		//insert the label container before the control container
		inputContainer.insertBefore(staticWrapper,inputWrapper);		
		
		//assegniamo gli handler per i click sulle tre icone
		//assign the click handlers to the icons
		editIcon.onclick = makeInputModifierEdit(staticInput, input);		
		confirmIcon.onclick = makeInputModifierConfirm(staticInput, input);		
		cancelIcon.onclick = makeInputModifierCancel(staticInput, input);	
		
		//quando si fa submit della form, l'input su ogni controllo, se attivo e non confermato, 
		//viene cancellato simulando la pressione della corrispondente icona "cancel"
		//when the form is submitted, the control input, if enabled and not confirmed,
		//is rolled back to the previous value, simulating the "cancel" button.
		input.form.addEventListener("submit",cancelIcon.onclick,false);
}

function scanInputs() {
	 var inputs = document.getElementsByTagName('input');
	 var i;
	 
	 for(i=0; i<inputs.length; ++i) {	 
		if (inputs.item(i).type=="text" && inputs.item(i).className.indexOf("nonswitched")==-1) {			 
			setupSwitchedInput(inputs.item(i))
		}	 
	 }
}

//inizializzazione dello script
//script initialization
function init() {
	scanInputs();
}

window.onload=init;