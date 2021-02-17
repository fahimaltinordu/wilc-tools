
const provider = new ethers.providers.InfuraProvider("ropsten", "ec6d2493e2004b1f9723f2d11ddf356a");

const WilcContract = "0xf4f690befd90286964d6e85713272d5e692801e0";

const WilcAbi = [
  // Some details about the token
  "function name() view returns (string)",
  "function symbol() view returns (string)",

  // Get the account balance
  "function balanceOf(address) view returns (uint)",

  // Send some of your tokens to someone else
  "function transfer(address to, uint amount)",

  // An event triggered whenever anyone transfers to someone else
  "event Transfer(address indexed from, address indexed to, uint amount)"
];

// The Contract object
const TokenContract = new ethers.Contract(WilcContract, WilcAbi, provider);





const formBtn1 = document.querySelector("#btn-1")
const formBtnPrev2 = document.querySelector("#btn-2-prev")
const formBtnNext2 = document.querySelector("#btn-2-next")
const formBtn3 = document.querySelector("#btn-3")
const formBtnPrev3 = document.querySelector("#btn-3-prev")


const gotoNextForm = (prev, next, stepPrev, stepNext) => {
  // Get form through the button
  const prevForm = prev.parentElement
  const nextForm = next.parentElement
  const nextStep = document.querySelector(`.step--${stepNext}`)
  const prevStep = document.querySelector(`.step--${stepPrev}`)
  // Add active/inactive classes to both previous and next form
  nextForm.classList.add("form-active")
  nextForm.classList.add("form-active-animate")
  prevForm.classList.add("form-inactive")
  // Change the active step element
  prevStep.classList.remove("step-active")
  nextStep.classList.add("step-active")
  // Remove active/inactive classes to both previous an next form
  setTimeout(() => {
    prevForm.classList.remove("form-active")
    prevForm.classList.remove("form-inactive")
    nextForm.classList.remove("form-active-animate")
  }, 1000)
}



//address alanı başladı///////////////////////////////////////////////

var storeditem  = localStorage.getItem("storeditem");
$("#checkAddress").val(storeditem);

formBtn1.addEventListener("click", function(e) {
	
	var address = $('#checkAddress').val();
    if ($('#checkAddress').val() != "") {
        try {
			ethers.utils.getAddress(address); 
			var item = document.getElementById('checkAddress').value;
			localStorage.setItem("storeditem", item);
			// console.log($('#checkAddress').val());
			  gotoNextForm(formBtn1, formBtnNext2, 1, 2);
		} catch (error) {
		   $("#result2").html('<i class="fas fa-window-close"></i> Invalid address');
		   setTimeout(function(){
                     $("#result2").html("");
                     },1500);
		   $("#checkAddress").val("");
		   localStorage.clear();
		   e.preventDefault();
		  return;
        }	
	} else {
		$("#result2").html('<i class="fas fa-window-close"></i> Empty address');
		setTimeout(function(){
                     $("#result2").html("");
                     },1500);
		localStorage.clear();
	}
	e.preventDefault();
})
//address alanı bitti


//amount area started,
function isNumberKey(evt, element) {
  var charCode = (evt.which) ? evt.which : event.keyCode
  if (charCode > 31 && (charCode < 48 || charCode > 57) && !(charCode == 46 || charCode == 8))
    return false;
  else {
    var len = $(element).val().length;
    var index = $(element).val().indexOf('.');
    if (index > 0 && charCode == 46) {
      return false;
    }
    if (index > 0) {
      var CharAfterdot = (len + 1) - index;
      if (CharAfterdot > 3) {
        return false;
      }
    }

  }
  return true;
}

$("#usdamount").change(function() {
            $(this).val(parseFloat($(this).val()).toFixed(2));
        });
		
		

	
// Next button listener of form 2
formBtnNext2.addEventListener("click", function(e) {
	var receipt = $('#usdamount').val();	
		if (receipt != '' && receipt != 0) {
			
			  document.querySelector(`.step--2`).classList.remove("step-active")
			  document.querySelector(`.step--3`).classList.add("step-active")
			  formBtnNext2.parentElement.style.display = "none"

			  $('.form--result').css('display','block');
			  document.querySelector(".form--result").innerHTML = `
					  <div id="sonuc2">
						  <div>
							<img draggable="false" src="img/WILC2.gif" width="100" height="100" alt="Loading QR">
							<p id="loadingicon">Generating QR Code...</p>
						  </div>
					  </div>
					   `
					   
			  $('.form--message').css('display','none');
			  $('.form--confirmation').css('display','none');
			  $('.form--unconfirmation').css('display','none');
			  
			  $('.counttime').append('<div id="countdown">Invoice closes in <span id="time">05:00</span> minutes!</div>');
			  
			  setTimeout(function(){
					  $('.form--message').css('display','block');
					  $('.form--result').css('display','none');
					  $('.form--unconfirmation').css('display','none');
					  $('.form--confirmation').css('display','none');
                     },3000);
			  
			  document.querySelector(".form--message").innerHTML = `
				  <div id="sonuc">
					<div id="qrcode"></div>
				  </div>
				  <div id="paymentinfo">
					<p><b>Payment address:</b> <span id="paymentaddress"></span></p>
					<p><b>Payment amount:</b> <span id="paymentamount"></span></p>
				  </div>
				  <button class="btn btn-info noselect" id="refresh">Close Invoice</button>
				  <button class="btn btn-info noselect" id="check">Check Payment</button>
			    `
			   
			   
			   $("#refresh").click(function() {
				  location.reload();
				  $("#usdamount").val("");
				});
			   
				
					 
				$("#check").click(function() {
					var address = $('#checkAddress').val(); 
					// A filter for when a specific address receives tokens
					const filter = TokenContract.filters.Transfer(null, address)

					// Receive an event when that filter occurs
					TokenContract.on(filter, (from, to, amount, event) => {  
							var received = ethers.utils.formatUnits(amount, 8);
							var finalreceived = ethers.utils.commify( received );
							var sender = from;
							var txid = event.transactionHash; 		
					
							if (finalreceived == amountinwilc) {
								$('.form--message').css('display','none');
								$('.form--confirmation').css('display','block');
								document.querySelector(".form--confirmation").innerHTML = `
								  <div id="confirmtable">
									<div>
									<p><i class="fas fa-check-circle fa-5x" style="color:#82c91e;margin-bottom:10px;"></i></p>
									<p><b>Sender:</b> <span id="confirm6"></span></p>
									<p><b>Tx ID:</b> <span id="confirm7"></span></p>
									<a id="txlinksuccess" href="" target="_blank">Check on Etherscan</a>
									<hr>
									<p><b>Payment Amount:</b> <span id="confirm8"></span></p>
									<p><b>You received:</b> <span id="confirm9"></span></p>
								   </div>
								  </div>
								  <button class="btn btn-info noselect" id="refresh3">Close Invoice</button>
								`
								
								$("#refresh3").click(function() {
								  location.reload();
								  $("#usdamount").val("");
								});
								
								$("#confirm6").html(sender);
								$("#confirm7").html(txid);
								$("#confirm8").html(amountinwilc + " <b>WILC</b>");
								$("#confirm9").html(finalreceived + " <b>WILC</b>");
								
								var x = "https://ropsten.etherscan.io/tx/"
								var result1 = x + txid;
								$('#txlinksuccess').attr('href', result1);
										
								TokenContract.removeAllListeners();
								
							} else {
								$('.form--message').css('display','none');
								$('.form--unconfirmation').css('display','block');
									document.querySelector(".form--unconfirmation").innerHTML = `
								  <div id="unconfirmtable">
									<div>
									<p><i class="fas fa-info-circle fa-5x" style="color:#15aabf;margin-bottom:10px;"></i></p>
									<p><b>Sender:</b> <span id="confirm2"></span></p>
									<p><b>Tx ID:</b> <span id="confirm3"></span> </p>
									<a id="txlinkinfo" href="" target="_blank">Check on Etherscan</a>
									<hr>
									<p><b>Payment Amount:</b> <span id="confirm5"></span></p>
									<p><b>You received:</b> <span id="confirm1"></span></p>
									<p><b>Missing Amount:</b> <span id="confirm4"></span></p>
								   </div>
								  </div>
								  <button class="btn btn-info noselect" id="refresh2">Close Invoice</button>
								`
								
								$("#refresh2").click(function() {
								  location.reload();
								  $("#usdamount").val("");
								});

								var missing = amountinwilc-finalreceived;
								$("#confirm1").html(finalreceived + " <b>WILC</b>");
								$("#confirm2").html(sender);
								$("#confirm3").html(txid);
								$("#confirm4").html(missing + " <b>WILC</b>");
								$("#confirm5").html(amountinwilc + " <b>WILC</b>");
								
								var x = "https://ropsten.etherscan.io/tx/"
								var result2 = x + txid;
								$('#txlinkinfo').attr('href', result2);
								
								// Unsubscribe all listeners for event
								TokenContract.removeAllListeners();
							}
					});

				});
				
				
			    
				function startTimer(duration, display) {
					var timer = duration, minutes, seconds;
					setInterval(function () {
						minutes = parseInt(timer / 60, 10)
						seconds = parseInt(timer % 60, 10);

						minutes = minutes < 10 ? "0" + minutes : minutes;
						seconds = seconds < 10 ? "0" + seconds : seconds;

						display.text(minutes + ":" + seconds);

						if (--timer < 0) {
							location.reload();
						}
					}, 1000);
				}

				jQuery(function ($) {
					var fiveMinutes = 60 * 5,
						display = $('#time');
					startTimer(fiveMinutes, display);
				});
				
				
				var address = $('#checkAddress').val();
				$("#paymentaddress").html(address);
				
				
				
				// var qrcode = new QRCode(document.getElementById("qrcode"), {
						// text: "ilcoin:"+address+"?amount=",
						// width : 180,
						// height : 180,
						// });	
				
				
				var apiprice = 'https://api.coingecko.com/api/v3/simple/price?ids=ilcoin&vs_currencies=usd'			
				fetch(apiprice).then(res=> {
					res.json().then (data=> {
						var price = data.ilcoin.usd;
						console.log("ILC price: " + price);
						var qrprice = (receipt/price).toFixed(8);
						window.amountinwilc = qrprice;
						$("#paymentamount").html(qrprice);
						console.log("Payment amount in ILC: " + qrprice);

						var qrcode = new QRCode(document.getElementById("qrcode"), {
						text: "ethereum:"+address+"?amount="+qrprice,
						width : 180,
						height : 180,
						});						
					})
				});
				
				
		} else {
			$("#result3").html('<i class="fas fa-window-close"></i> Enter Payment Amount');
			   setTimeout(function(){
						 $("#result3").html("");
						 },1500);
				$("#usdamount").val("");
		}
	e.preventDefault()
  
})

// Previous button listener of form 2
formBtnPrev2.addEventListener("click", function(e) {
  gotoNextForm(formBtnNext2, formBtn1, 2, 1);
  $("#usdamount").val("");
  e.preventDefault()
})

//amount area finished