

function CheckAddress() {
    var address = $('#inputbalance').val();
	if ($('#inputbalance').val() != "") {
	 try {
		ethers.utils.getAddress(address); //ethers.js kütüphanesinden adres kontrolü yapar	
		   $("#resultbalance").html("Valid address");
		   setTimeout(function(){
                     $("#resultbalance").html("");
					 $("#inputbalance").val("");
                     },5000);
		} catch (error) {
		   $("#resultbalance").html("Invalid address");
		   setTimeout(function(){
                     $("#resultbalance").html("");
					 $("#inputbalance").val("");
                     },1500);
		  return;
        }	
	} else {
		$("#resultbalance").html("Empty address");
		setTimeout(function(){
                     $("#resultbalance").html("");
					 $("#inputbalance").val("");
                     },1500);
	}
}