let provider = new ethers.providers.EtherscanProvider("ropsten", "R7R3Z7MMTMQC7J7H8NCNDX2UAAUPP9RU2X");
// let provider = new ethers.providers.InfuraProvider("ropsten", "ec6d2493e2004b1f9723f2d11ddf356a");


var tokenContract;

var TOKEN_ADDRESS = '0xf4f690befd90286964d6e85713272d5e692801e0' //wilc ropsten contract address

const TOKEN_ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"burnAmount","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"upgrade","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"upgradeAgent","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"upgradeMaster","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getUpgradeState","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"canUpgrade","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalUpgraded","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"agent","type":"address"}],"name":"setUpgradeAgent","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"isToken","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"BURN_ADDRESS","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"master","type":"address"}],"name":"setUpgradeMaster","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_owner","type":"address"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_totalSupply","type":"uint256"},{"name":"_decimals","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Upgrade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"agent","type":"address"}],"name":"UpgradeAgentSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"burner","type":"address"},{"indexed":false,"name":"burnedAmount","type":"uint256"}],"name":"Burned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}];

tokenContract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider);


function CheckBalance() {
    var address = $('#inputbalance').val();
	if ($('#inputbalance').val() != "") {
	 try {
		ethers.utils.getAddress(address); //ethers.js kütüphanesinden adres kontrolü yapar
			var callPromise = tokenContract.functions.balanceOf(address); //ethers.js kütüphanesinden bakiye kontrolü yapar
				console.log(tokenContract);
					
					callPromise.then(function(result) {
						console.log(result);
						
						var bakiye = result[0].toString();
							console.log("Saf bakiye: " + bakiye);	
						
						var balance = ethers.utils.formatUnits(bakiye, 8); //ethers.js kütüphanesinden coin formatına çevirir
							console.log("8 basamak bakiye: " + balance);	
						
						var finalbalance = ethers.utils.commify( balance ); //ethers.js kütüphanesinden , ekler: 1000.12345678 >> 1,000.12345678
							console.log("WILC Balance: " + finalbalance);  
						
						$("#resultbalance").html(finalbalance + " WILC");
						setTimeout(function(){
								 $("#resultbalance").html("");
								 $("#inputbalance").val("");
								 },5000);
			
					});
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