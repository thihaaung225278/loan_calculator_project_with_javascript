document.getElementById('loan-form').addEventListener('submit',function(e){
	//hide results
	document.getElementById('results').style.display = 'none';
	//show loading
	document.getElementById('loading').style.display = 'block';

	setTimeout(calculateResults,2000);

	e.preventDefault();
});

function calculateResults(){

	//show results
	document.getElementById('results').style.display = 'block';
	//hide loading
	document.getElementById('loading').style.display = 'none';

	const amount = document.getElementById('amount');
	const interest = document.getElementById('interest');
	const years = document.getElementById('years');
	const monthlyPayment = document.getElementById('monthly-payment');
	const totalPayment = document.getElementById('total-payment');
	const totalInterest = document.getElementById('total-interest');

	const principal = parseFloat(amount.value);
	const calculatedInterest = parseFloat(interest.value) / 100 / 12; 
	const calculatedPayments = parseFloat(years.value) * 12;

	//compute monthly payment
	const x = Math.pow(1+calculatedInterest,calculatedPayments);
	const monthly = (principal*x*calculatedInterest)/(x-1);

	if(isFinite(monthly)){
		monthlyPayment.value = monthly.toFixed(2);
		totalPayment.value = (monthly*calculatedPayments).toFixed(2);
		totalInterest.value = ((monthly*calculatedPayments)-principal).toFixed(2);
	}else{
		//call showError Function
		showError('Please Check numbers....');
	}
}

//showError function
function showError(error){

	//hide results
	document.getElementById('results').style.display = 'none';
	//hide loading
	document.getElementById('loading').style.display = 'none';

	//create div Element
	const errorDiv = document.createElement('div');
	//Add className to div Element
	errorDiv.className = 'alert alert-danger';
	//create textNode and append to errorDiv Element
	errorDiv.appendChild(document.createTextNode(error));
	//select card Element
	const card = document.querySelector('.card');
	//select heading Element
	const heading = document.querySelector('.heading');
	//error insertBefore at card
	card.insertBefore(errorDiv,heading); 
	//Set time out
	setTimeout(showErrorBox,3000);
}

function showErrorBox(){
	document.querySelector('.alert').remove();
}
