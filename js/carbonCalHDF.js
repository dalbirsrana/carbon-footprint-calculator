function Comma(number)
{
number = '' + number;
if (number.length > 3) 
{
var mod = number.length % 3;
var output = (mod > 0 ? (number.substring(0,mod)) : '');
for (i=0 ; i < Math.floor(number.length / 3); i++) 
{
if ((mod == 0) && (i == 0))
output += number.substring(mod+ 3 * i, mod + 3 * i + 3);
else
output+= ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
}
return (output);
}
else return number;
}


function cal_home(num)
{
	var flag1 = 0;
	var flag = 1;
	var arrValue = document.getElementById('States_id').value.split(",");
	var states_elect = parseInt(arrValue[0]);
	var states_gas = parseInt(arrValue[1]);
	var elec_text = parseInt(document.getElementById('elec_text_id').value);
	var gas_text = parseInt(document.getElementById('gas_text_id').value);
	var oil_text = parseInt(document.getElementById('oil_text_id').value);
	var propane_text = parseInt(document.getElementById('propane_text_id').value);

	if (elec_text <= 0 || isNaN(elec_text) == true)
	{   
		if(document.getElementById('elec_text_id').value=='')
		{
			flag = 0; 
			elec_text=0;  
		}  
		else 
		{ 
			flag1 = 1; 
			document.getElementById('elec_text_id').value=''; 
		}
	}        
	else   
	{  
		flag = 0; 
	}

	if (gas_text <= 0 || isNaN(gas_text) == true )
	{   
		if ( document.getElementById('gas_text_id').value == '' )  
		{ 
			flag = 0; 
			gas_text=0;  
		}  
		else 
		{ 
			flag1 = 1; 
			document.getElementById('gas_text_id').value=''; 
		}
	}       
	else   
	{  
		flag = 0; 
	}

	if (oil_text <= 0 || isNaN(oil_text) == true )
	{   
		if ( document.getElementById('oil_text_id').value == '' )  
		{ 
			flag = 0; 
			oil_text=0;  
		}  
		else 
		{ 
			flag1 = 1; 
			document.getElementById('oil_text_id').value=''; 
		}
	}        
	else   
	{  
		flag = 0; 
	}

	if (propane_text <= 0 || isNaN(propane_text) == true )
	{   
		if ( document.getElementById('propane_text_id').value == '' )  
		{ 
			flag = 0; 
			propane_text=0;  
		}  
		else 
		{ 
			flag1 = 1;  
			document.getElementById('propane_text_id').value=''; 
		}
	}        
	else   
	{  
		flag = 0; 
	}

	if (document.getElementById('elec_text_id').value!='' || document.getElementById('gas_text_id').value!='' || document.getElementById('oil_text_id').value!='' || document.getElementById('propane_text_id').value!='')
    {
		val=states_elect + ',' + states_gas + '~' + elec_text + '~' + gas_text + '~' + oil_text + '~' + propane_text;
  
  		var elements = document.getElementById('spanresult_home').getElementsByTagName('div');
		
		len=0;
		if(elements.length>0)
			len = elements.length/2;

		if (flag1==1) 
		{ 
			alert('Please enter valid number');
			
		}
        else          
		{
			if (flag==0)
			{  
				if(num==undefined)
				{
					len++;
					var result_home=((states_elect * elec_text) + (states_gas * gas_text) + (9 * oil_text) + (6 * propane_text));
					var divId1= "Home"+len;
					var divId2= "divData"+len;
					
				    document.getElementById('spanResultTop').style.display='block';
					
					var result1 =  '<div id="Home' + len + '" style="padding-top:2px">' + "Home Emissions " + len + ": " + Comma(result_home) + ' lbs CO<sub>2</sub>/Yr&nbsp;&nbsp;' + '<a href="javascript:edit('+len+')" >Edit</a> <span style="color:#999999">|</span> <span id="spnDeleteHome' + len +'"><a href="javascript:deleteData('+len+')" >Delete</a></span></div><div style="display:none" id="divData' + len + '">'+val+'</div>';
					document.getElementById('spanresult_home').innerHTML+=result1;
//					document.getElementById('result_home_id').value=result_home;
					
					
					totalHomeCarbon(len);
					document.getElementById('tableEnergy').style.visibility="hidden";
					clear();
				}
				else
				{
					var result_home=((states_elect * elec_text) + (states_gas * gas_text) + (9 * oil_text) + (6 * propane_text));
					
				
					document.getElementById('Home'+num).innerHTML="Home Emissions " + num + ": " + Comma(result_home) + ' lbs CO<sub>2</sub>/Yr&nbsp;&nbsp;<a href="javascript:edit('+num+')">Edit</a> <span style="color:#999999">|</span> <span id="spnDeleteHome' + len +'"><a href="javascript:deleteData('+num+')">Delete</a></span>';
					document.getElementById('divData'+num).innerHTML=val;
					totalHomeCarbon(len);
					document.getElementById('tableEnergy').style.visibility="hidden";
					clear();
					document.getElementById('spnDeleteHome'+num).style.display="inline";
				}
			}
		}
	}
	else 
	{ 
		alert('Please fill atleast one filled');
	
	}
}

function totalHomeCarbon(len)
{
	var total=0;
	for(var i=1; i<=len; i++)
	{
		val = document.getElementById('divData'+i).innerHTML;
		arrVal = val.split('~');

		var arrValue = arrVal[0].split(",");
		var states_elect = parseInt(arrValue[0]);
		var states_gas = parseInt(arrValue[1]);

		total+=((states_elect * arrVal[1]) + (states_gas * arrVal[2]) + (9 * arrVal[3]) + (6 * arrVal[4]));
	}
	document.getElementById('result_home_id').value=total;
	document.getElementById('result_home_id_comma').value=Comma(total);
}
  
function clear()
{
	document.getElementById('elec_text_id').value="";
	document.getElementById('gas_text_id').value="";
	document.getElementById('oil_text_id').value="";
	document.getElementById('propane_text_id').value="";
	document.getElementById('States_id').options[0].selected=true;
	document.getElementById('home_calculate').onclick=function(){cal_home();}
}
 
 
function edit(i)
{
	document.getElementById('spnDeleteHome'+i).style.display="none";
	document.getElementById('tableEnergy').style.visibility="visible";
	var val = document.getElementById('divData'+i).innerHTML;
	arrVal = val.split('~');

	for(var k=0; k<document.getElementById('States_id').length; k++)
	{
		if(document.getElementById('States_id').options[k].value==arrVal[0])
		{
			document.getElementById('States_id').options[k].selected=true;
			break;
		}
	}
	document.getElementById('elec_text_id').value=arrVal[1]!=0 ? arrVal[1] : '';
	document.getElementById('gas_text_id').value=arrVal[2]!=0 ? arrVal[2] : '';
	document.getElementById('oil_text_id').value=arrVal[3]!=0 ? arrVal[3] : '';
	document.getElementById('propane_text_id').value=arrVal[4]!=0 ? arrVal[4] : '';
	
	document.getElementById('home_calculate').onclick=function(){cal_home(i);}
}

function deleteData(i)
{
	var elements = document.getElementById('spanresult_home').getElementsByTagName('div');	
	len=1;
	
	if(elements.length>0)
		len = (elements.length/2-1);
	
	
	objDiv = document.getElementById('Home'+i);
	document.getElementById('spanresult_home').removeChild(objDiv);
	objDiv = document.getElementById('divData'+i);
	document.getElementById('spanresult_home').removeChild(objDiv);
	totalHomeCarbon(len);

if(elements.length==0)
document.getElementById('spanResultTop').style.display='none';
}





function showHideDriving()
{
if(document.getElementById('span_modal_result').innerHTML!='' || document.getElementById('span_mgg_result').innerHTML!='')
{
	alert("First delete the calculated Driving Emissions value");
	return false;
}
if (document.getElementById('select_modal').style.display=='block')
    document.getElementById('select_modal').style.display='none';
else document.getElementById('select_modal').style.display='block';

if (document.getElementById('enter_mpg').style.display=='block')
    document.getElementById('enter_mpg').style.display='none';
else document.getElementById('enter_mpg').style.display='block';
}

function calDrivingMPG(num)
{ 
	var flag1 = 0;
	var flag = 1;
	var driving_fuel=0;
	var driving_average_miles = parseFloat(document.getElementById('driving_average_miles').value);
	var driving_miles_year = parseFloat(document.getElementById('driving_miles_year').value);
	
	if (document.getElementById('driving_mpg_gas').checked == true)
		driving_fuel = parseFloat(document.getElementById('driving_mpg_gas').value);
	else if (document.getElementById('driving_mpg_diesel').checked == true)
		driving_fuel = parseFloat(document.getElementById('driving_mpg_diesel').value);
	else if (document.getElementById('driving_mpg_e85').checked == true)
		driving_fuel = parseFloat(document.getElementById('driving_mpg_e85').value);
	else if (document.getElementById('driving_mpg_cng').checked == true)
		driving_fuel = parseFloat(document.getElementById('driving_mpg_cng').value);

	if (driving_average_miles <= 0 || isNaN(driving_average_miles) == true )
	{   
		if ( document.getElementById('driving_average_miles').value == '' )   
			flag1 = 1;   
		else 
		{ 
			flag1 = 1; 
			document.getElementById('driving_average_miles').value=''; 
		}
	}        
	else   
		flag = 0;

	if (flag1==1) 
	{ 
		alert('Please enter valid number');
		span_mgg_result='';
		document.getElementById('span_mgg_result').innerHTML+=result;
	}
	else          
	{
		if (flag==0)
		{
			val=driving_average_miles + '~' + driving_miles_year + '~' + driving_fuel;
			var elements = document.getElementById('span_mgg_result').getElementsByTagName('div');
		
			len=0;
			if(elements.length>0)
				len = elements.length/2;
			
			var driving_result_mpg = parseInt((driving_miles_year / driving_average_miles) * driving_fuel);			
			if(num==undefined)
			{   
			    document.getElementById('spanResultTopMgg').style.display='block';
				len++;
				var result1 = '<div id="DrivingMPG' + len + '" style="padding-top:2px">' + 'Driving Emissions ' + len + " : " + Comma(driving_result_mpg) + ' lbs CO<sub>2</sub>/Yr&nbsp;&nbsp;' + '<a href="javascript:editDrivingMPGData('+len+')" >Edit</a> <span style="color:#999999">|</span> <span id="spnDeleteDrivingMPG' + len +'"><a href="javascript:deleteDrivingMPGData('+len+')" >Delete</a></span></div><div style="display:none" id="divDrivingMPGData' + len + '">'+val+'</div>';
				document.getElementById('span_mgg_result').innerHTML+=result1;
							
				totalDrivingMPG()
				clearDrivingMPGData();
			}
			else
			{
				document.getElementById('DrivingMPG'+num).innerHTML='Driving Emissions ' + num + " : " + Comma(driving_result_mpg) + ' lbs CO<sub>2</sub>/Yr&nbsp;&nbsp;<a href="javascript:editDrivingMPGData('+num+')">Edit</a> <span style="color:#999999">|</span> <span id="spnDeleteDrivingMPG' + len +'"><a href="javascript:deleteDrivingMPGData('+num+')" >Delete</a></span><br><br>';
				document.getElementById('divDrivingMPGData'+num).innerHTML=val;
				totalDrivingMPG()
				clearDrivingMPGData();
				document.getElementById('spnDeleteDrivingMPG'+num).style.display="inline";
			}
		}
	}
}

function totalDrivingMPG()
{
	var total=0;
	var elements = document.getElementById('span_mgg_result').getElementsByTagName('div');
	len = (elements.length/2);

	for(var i=1; i<=len; i++)
	{
		var app = navigator.appName;
		if(app=='Microsoft Internet Explorer')
			val = document.getElementById('divDrivingMPGData'+i).innerHTML;
		else
			val = document.getElementById('divDrivingMPGData'+i).textContent;
			
		arrVal = val.split('~');
		total+= parseInt((arrVal[1] / arrVal[0]) * arrVal[2]);		
	}

	var elements = document.getElementById('span_modal_result').getElementsByTagName('div');
	len = (elements.length/2);

	var val='';
	for(var i=1; i<=len; i++)
	{
		var app = navigator.appName;
		if(app=='Microsoft Internet Explorer')
			val = document.getElementById('divDrivingData'+i).innerHTML;
		else
			val = document.getElementById('divDrivingData'+i).textContent;
			
		arrVal = val.split('~');
		total +=  ((arrVal[2] * arrVal[3] * 19.56)/arrVal[0]);
	}

	document.getElementById('driving_result_mpg_id').value=parseInt(total);
	document.getElementById('driving_result_mpg_id_comma').value=Comma(parseInt(total));
}

function clearDrivingMPGData()
{
	document.getElementById('driving_average_miles').value="";
	document.getElementById('driving_miles_year').options[0].selected=true;
	document.getElementById('driving_mpg_gas').checked=true;
	document.getElementById('calculate_driving_mpg').onclick=function(){calDrivingMPG();}
}
 
 
function editDrivingMPGData(i)
{
	document.getElementById('spnDeleteDrivingMPG'+i).style.display="none";
	
	var app = navigator.appName;
	if(app=='Microsoft Internet Explorer')
		val = document.getElementById('divDrivingMPGData'+i).innerHTML;
	else
		val = document.getElementById('divDrivingMPGData'+i).textContent;

	arrVal = val.split('~');

	document.getElementById('driving_average_miles').value=arrVal[0];
	
	for(var k=0; k<document.getElementById('driving_miles_year').length; k++)
	{
		if(document.getElementById('driving_miles_year').options[k].value==arrVal[1])
		{
			document.getElementById('driving_miles_year').options[k].selected=true;
			break;
		}
	}

	if (arrVal[2] == "19.564")
		document.getElementById('driving_mpg_gas').checked = true;
	else if (arrVal[2] == "22.864")
		document.getElementById('driving_mpg_diesel').checked = true;
	else if (arrVal[2] == "16.16")
		document.getElementById('driving_mpg_e85').checked = true;
	else if (arrVal[2] == "16")
		document.getElementById('driving_mpg_cng').checked = true;

	document.getElementById('calculate_driving_mpg').onclick=function(){calDrivingMPG(i);}
}

function deleteDrivingMPGData(i)
{
	objDiv = document.getElementById('DrivingMPG'+i);
	document.getElementById('span_mgg_result').removeChild(objDiv);
	objDiv = document.getElementById('divDrivingMPGData'+i);
	document.getElementById('span_mgg_result').removeChild(objDiv);
	totalDrivingMPG()




var elements = document.getElementById('span_mgg_result').getElementsByTagName('div');	

if(elements.length==0)
document.getElementById('spanResultTopMgg').style.display='none';



}












	function changeModel(val)
	{
arrText = new Array(
	new Array("Select model...", "MDX 4WD", "RL", "Rdx 4WD", "TL", "TSX", "RsX", "Nsx", "3.5RL", "3.2CL", "3.2 TL", "3.5 RL", "MDX", "Integra", "2.3 CL/3.0 CL", "SLx", "2.5 TL", "Legend"),
	new Array("Select model...", "DB9 Coupe", "DB9 Volante", "V8 Vantage", "V12 Vanquish", "VanQuish", "DB-7 GT", "DB-7 Vantage"),
	new Array("Select model...", "A3","A3 Quattro", "A4", "A4 Avant Quattro", "A4 Cabriolet", "A4 Cabriolet Quattro", "A6", "A6 Quattro", "A8", "A8 L", "Q7", "R8", "RS4", "S4", "S6", "S8", "TT Coupe", "TT Roadster", "TT Coupe Quattro", "TT Roadster Quattro", "Allroad Quattro"),
	new Array("Select model...", "328CI", "328CXI", "328I", "328XI", "335CI", "335CXI", "335I", "528I", "528XI", "535I", "550I", "650CI", "750I", "M5", "M6", "X3 3.0SI", "X5 4.8I", "Z4 3.0I", "Z4", "Z4 M", "325 CI", "325I", "330CI", "330I", "525I", "530I", "545I", "645 CI", "745I", "M3", "X3", "X5", "Z4 Roadster", "323CI", "323I", "328I", "540I", "540I Sport Wagon", "740I Sport", "M Coupe", "M Roadster", "M5", "X5", "Z3 Coupe", "Z8", "318I/318IS/318TI", "Z3 Roadster", "840CI", "850CI", "740I"),
	new Array("Select model...", "Arnage", "Arnage RL", "Azure", "Continental Flying Spur", "Continental GT", "Continental GTC", "Arnage LWB", "Bentley Arnage", "Continental R", "Continental SC", "Continental T", "Brooklands R Limo", "Bentley Turbo RT"),
	new Array("Select model...", "Veyron"),
	new Array("Select model...", "Enclave AWD", "Enclave FWD", "Lacrosse/Allure", "Lucerne", "Terraza FWD", "Rainier 2WD", "Rainier AWD", "Rendezvous AWD", "Redezvous FWD", "Terraza FWD", "Terraza AWD", "Century", "Perk Avenue", "Rainier 2WD", "Rainier AWD", "Lesabre", "Regal", "Riviera", "Skylark", "Roadmaster"),
    new Array("Select model...", "CTS", "CTS AWD", "DTS", "Escalade 2WD", "Escalade AWD", "Limousine", "SRX 2WD", "SRX AWD", "STS", "STS AWD", "XLR", "Armored DTS", "Armored Deville", "Seville", "Deville", "Eldorado", "Catera", "Fleetwood"),
   
   new Array("Select model...", "Aveo", "Aveo5", "C15 Silverado 2WD", "C1500 Avalanche 2WD", "C1500 Suburban 2WD",	"C1500 Tahoc 2WD", 
		  "Classic", "Cobalt",	"Colarado 2WD",	"Colarado 4WD", "Colorado Cab",	"Colorado Crew Cab", "Corvette", "Equinox",	"Impala", "Malibu Hybrid", 	"Trailblazer",	"Uplander FWD", "Uplander AWD", 
		  "Malibu",	"Malibu Maxx", "Optra", "Optra Wagon", "Optra 5", "Astro 2WD(Cargo)", "Astro 2WD (Cargo) conv)", "Astro 2WD (Passenger)", "Astro AWD (Cargo)", "Astro AWD (Cargo) Conv", "Astro AWD (Passenger)", "Blazer 2WD", 
"Blazer 4WD", "C15 Silverado Hybrid 2WD", "C1500 Avalanche 2WD", "C1500 Silverado 2WD", "C1500 Suburbon 2WD", "C1500 Tahoe 2WD", "C2500 HD Silverado 2WD",
"Cavalier", "Classic", "Corvette", "Epica", "K15 Silverado Hybrid 4WD", "K1500 Avalanche 4WD", "K1500 Silverado 4WD",  "K1500 Silverado AWD",
"K1500 Suburban 4WD", "K1500 Suburban AWD", "K1500 Tahoe 4WD", "K1500 Tahoe AWD", "K2500 HD Silverado 4WD", "Trailblazer 2WD", "Trailblazer 4WD", 
"Venture FWD", "Venture AWD", "Monte Carlo", "Tracker", "Prizm", "Camrro",  "Metro", "Caprice",  "Caprice Wagon", "Corsica", "Lumina Minivan 2WD"),
   
   new Array("Select model...", "300 AWD", "300/SRT-8", "Aspen 2WD", "Aspen 4WD", "Crossfire Coupe", "Crossfire Roadster", "PT Cruiser", "PT Cruiser Convertible", "Pacifica AWD", "Pacifica FWD", "Sebring", "Sebring AWD", "Sebring Convertible", "Town and Country", "300M", "Concorde/LHS", "Voyager 2WD", "Cirrus"),
	new Array("Select model...", "Avenger", "Avenger AWD", "Caliber", "Caliber AWD", "Caravan 2WD", "Charger", "Charger AWD", "Durango 2WD", "Durango 4WD", "Magnum", "Magnum AWD", "Nitro 2WD", "Nitro 4WD", "Viper Convertible", "Viper Coupe", "Stratus", "Interpid", "Neon"),
	new Array("Select model...", "F430", "599 Gtb Fiorano", "612 Scaglietti", "360 Modena/Spider/Challenge", "575 Maranello", "456 MGT/MGTA", "575", "550 Maranello/Barchetta", "F355/F355 F1", "F355 Berlinetta/GTS", "348 TB/TS/Spider", "512 TR"),
	new Array("Select model...", "Crown Victoria", "Edge AWD", "Edge FWD", "Escape 4WD", "Escape FWD", "Escape Hybrid 4WD", "Escape Hybrid FWD", "Expedition 2WD", "Explorer 2WD", "Explorer 4WD", "Explorer sport Trac 2WD", "Explorer Sport Trac 4WD", "F150 FFV 2WD", "F150 FFV 4WD", "F150 Pickup 2WD", "F150 Pickup 4WD", "F150 StxSE 2WD", "Focus FWD", "Fusion AWD", "Fusion FWD", "Mustang", "Ranger 2WD", "Ranger 4WD", "Taurus AWD", "Taurus FWD", "Taurus X AWD", "Taurus X FWD", "Taurus", "500 AWD", "500 FWD", "Freestyle AWD", "FreeStyle FWD", "Fusion", "GT2WD", "Taurus Wagon", "Thunderbird", "E150 Club Wagon", "E150 Econoline 2WD", "E250 Econoline 2WD", "Escape 2WD", "F150 Natural Gas", "Focus", "Windstar FWD", "Contour", "Escort"),
    new Array("Select model...", "Acadia AWD", "Acadia FWD", "C15 Sierra 2WD", "C1500 Yukon 2WD", "Canyon 2WD", "Canyon 4WD", "Canyon cab", "Canyon crew Cab 2WD", "Canyon Crew Cab 4WD", "Envoy 2WD", "Envoy 4WD", "G15/25 Savana", "G1500/2500 Savana", "H1500 Savana", "K15 Sierra 4WD", "K15 Sierra AWD", "K1500 Yukon", "C15 Sierra Hybrid 2WD", "K1500 Sierra 4WD/AWD", "Jimmy 2WD/4WD", "Safari 2WD", "Safari AWD"),
	new Array("Select model...", "Accord 2DR", "Accord 4DR", "CR-V 2WD", "CR-V 4WD", "Civic", "Civic Hybrid", "Element 2WD", "Element 4WD", "Fit", "Pilot 2WD", "Pilot 4WD", "S200", "Accord", "Accord Hybrid", "Odyssey 2WD"),
	new Array("Select model...", "H3 4WD"),
	new Array("Select model...", "Accent", "Azera", "Elantra", "Entourage", "Santafe", "Sonata", "Tiburon", "Tucson 2WD", "Tucson 4WD", "Veracruz 2WD", "Veracruz 4WD", "XG350"),  
	new Array("Select model...", "Fx35 AWD", "Fx35 Rwd", "Fx45 AWD", "G35", "G35x", "G37 Coupe", "M35", "M35x", "M45", "M45x", "QX56 2WD", "Qx56"),
	new Array("Select model...", "Ascender 2WD", "Ascender 4WD", "I-290 2WD", "I-370 2WD", "I-370 2WD", "I-370 4WD"),
	new Array("Select model...", "S-Type 3.0L", "S-Type 4L", "S-Type R", "Super V8", "VDPLWB", "X-Type", "X J8", "X J8L", "XJR", "XK", "XKR"),
	new Array("Select model...", "Gallardo", "Murcielago"),
	new Array("Select model...", "LR2", "LR3", "Range Rover"),
	new Array("Select model...", "ES 350", "GS 350", "GS 350 AWD", "GS 450H", "GS 460", "GX 470)", "IS 250", "IS 250 AWD", "IS 350", "LS 460", "LS 460 L", "LS 600 HL", "LX 570", "RX 350 2WD", "RX 350 4WD", "RX 400H 2WD", "RX 400H 4WD", "SC 430", "ES 330", "GS 300 4WD", "RX 330 2WD", "RX 330 4WD"),
	new Array("Select model...", "ELISE/EXIGE"),
	new Array("Select model...", "B2300 2WD", "B3000 2WD", "B4000 2WD", "B4000 4WD", "CX-7 2WD", "CX-7 4WD", "CX-9 2WD", "CX-9 4WD", "Mazda3", "Mazda SPEED3", "MX-5", "Mazda 6", "Mazda RX", "Tribute 4WD", "Tribute FWD", "Tribute Hybrid 2WD", "Tribute Hybrid 4WD"),
	new Array("Select model...", "ML 63 AMG", "Mayback 57", "Mayback 62", "R 320 CDI4 Matic", "R 350", "R 350 4Matic", "C 300", "C 350", "CL 550", "CL 600", "CL 63 AMG", "CL 65 AMG", "CLK 350", "CLK 550", "CLS 550", "CLS 63 AMG", "E 320 Bluetec", "E 350", "E 550", "E 63 AMG", "G 500", "G 55 AMG", "GL 320CDI 4Matic", "GL 450 4Matic", "GL 550 4Matic", "ML 320CDI 4Matic", "ML 350 4Matic", "ML 550 4Matic", "S 550", "S 600", "S 63 AMG", "S 65 AMG", "SL 55 AMG", "SL 550", "SL 600", "SL 65 AMG", "SLK 280", "SLK 350", "SLK 55 AMG", "C 230", "C 280", "CL 500", "CL 55 AMG", "CL 65 AMG", "E 320 CDI", "E 500", "E 55 AMG", "ML 350", "ML 500", "R 500", "S 350", "S 430", "S 500", "S 55 AMG", "SL 500", "Slr", "C230 Kompressor", "E 320", "E 320 CDI"),
	new Array("Select model...", "Eclipse", "Eclipse Spyder", "Endeavor 2WD", "Endeavor AWD", "Galant", "Lancer", "Outlander 2WD", "Outlander 4WD"),
	new Array("Select model...", "350 Z", "350 Z Roadster", "Altima", "Altima Hybrid", "Armada 2WD", "Armada 4wd", "Frontier 2WD", "Frontier 4WD", "Maxima", "Pathfinder 2WD", "Pathfinder 4WD", "Quest", "Rogue AWD", "Rogue FWD", "Sentra", "Titan 2WD", "Titan 4WD", "Versa", "Xterra 2WD", "Xterra 4WD"),
	new Array("Select model...", "911 GT3", "911 GT3 RS", "911 Turbo", "Boxster", "Boxster S", "Carrera 2 Cabriolet", "Carrera 2 Coupe", "Carrera 2 S Cabriolet", "Carrera 2 S Coupe", "Carrera 4 Cabriolet", "Carrera 4 Coupe", "Carrera 4 S Cabriolet", "Carrera 4 S Coupe", "Carrera 4 S Targa", "Carrera 4 Targa", "Cayenne", "Cayenne S", "Cayenne Turbo", "Cayman", "Cayman S", "GT3 911", "GT3 RS 911", "Turbo 4 911", "Targa", "Targa Kit", "Turbo 2 911 GT2", "Carrera 2 911 GT3"),
	new Array("Select model...", "Phantom", "Park Ward", "Silver Seraph", "Corniche", "Silver Spur", "Silver Spur Park Ward"),
	new Array("Select model...", "Forenza", "Grand Vitara", "Reno", "SX4", "SX4 AWD", "SX4 Sedan", "Xl7 AWD", "XL7 FWD", "Aerio", "Aerio AWD", "Forenza", "Swift", "Verona", "Esteem", "Vitara 2-DOOR", "Vitara 4-DOOR"),
	new Array("Select model...", "4 Runner", "4 Runner 4WD", "Avalon", "Camry", "Camry Hybrid", "Camry Solara", "Corolla", "Corolla Matrix", "FJ Cruiser 2WD", "FJ Cruiser 4WD", "Highlander 2WD", "Highlander 4WD", "Highlander Hybrid", "Land Cruiser", "Prius", "RAV 4 2WD", "RAV 4 4WD", "Scion TC", "Scion XB", "Scion XD", "Sequoia 2WD", "Sequoia 4WD", "Sienna 2WD", "Sienna 4WD", "Tacomma 2WD", "Tacomma 4WD", "Tundra 2WD", "Tundra 4WD", "Yaris", "Celica", "Echo", "MR 2"),
	new Array("Select model...", "EOS", "GTI", "Jetta", "New Beetle", "Passat", "Passat 4 Motion", "Passat Wagon", "R32", "Rabbit", "Touareg", "Pharton", "Tauareg", "Eurovan", "Eurovan Camper", "Cabrio"),
	new Array("Select model...", "C30 FWD", "C70 Convertible", "S40 AWD", "S40 FWD", "S60 AWD", "S60 FWD", "S80 AWD", "S80 FWD", "V50 AWD", "V50 FWD", "V70 FWD", "XC70 AWD", "XC 90 AWD", "XC90 FWD", "V40", "V70 AWD", "V70") 
);						


arrValue = new Array(
new Array("", "118", "100", "105", "95", "83", "77", "111", "105", "91", "91", "105", "111", "83", "91", "125", "100", "105"),
new Array("", "143", "143", "125", "154", "143", "167", "143"),	  
new Array("", "80", "95", "83", "91", "80", "91", "91", "100", "105", "118", "133", "125", "125", "118", "125", "125", "87", "91", "100", "100", "125"),
new Array("", "87", "95", "87", "95", "95", "95", "95", "91", "95", "95", "105", "110", "105", "143", "143", "100", "125", "87", "111", "91", "91", "95", "95", "95", "91", "105", "105", "100", "118", "118", "125", "91", "95", "95", "100", "118", "125", "118", "100", "100", "133", "143", "100", "133", "87", "95", "111", "125", "118"),
new Array("", "167", "167", "167", "154", "154", "154", "182", "182", "167", "167", "167", "182", "167"),
new Array("", "182"),
new Array("", "105", "100", "100", "105", "105", "118", "125", "111", "100", "105", "111", "87", "95", "125", "91", "100", "100", "87", "105"),
new Array("", "95", "95", "111", "133", "133", "133", "125", "125", "118", "118", "111", "125", "125", "100", "100", "100", "105", "105"),

new Array("", "74", "74", "118",  "125", "125", "118",  "83", "77", "100",  "111", "125", "100",   "100", "100", "100",  "71", "143", "105", "111", "87", "100", "87", "87", "87",	"118", "125", "125", "125", "143", "143", "118", "125", "118", "113", "133", "125", "125", "222", "77", "77", "100", "91", "125", "133", "133", "143", "133", "133", "125", "133", "222", "125", "125", "100", "105", "95", "111", "69", "105", "71", "105", "105", "87", "100"),

new Array("", "111", "100", "125", "133", "91", "91", "95", "95", "111", "87", "105", "91", "100", "100", "91", "95", "95"),
new Array("", "87", "105", "83", "91", "100", "100", "111", "125", "133", "100", "111", "111", "118", "118", "118", "91", "95", "80"),
new Array("", "154", "154", "167", "167", "167", "182", "222", "167", "222", "182", "182", "143", "167"),
new Array("", "105", "111", "100", "100", "91", "71", "63", "133", "125", "125", "125", "125", "133", "133", "125", "133", "125", "71", "95", "87", "105", "105", "125", "100", "87", "111", "100", "95", "100", "87", "105", "95", "83", "133", "100", "111", "133", "133", "125", "100", "154", "85", "111", "91", "74"),
new Array("", "105", "100", "133", "118", "100", "111", "125", "100", "118", "118", "125", "143", "130", "143", "125", "133", "118", "143", "125", "125", "143"),
new Array("", "85", "80", "87", "87", "70", "48", "91", "95", "67", "105", "118", "118", "95", "83", "71", "100"),
new Array("", "133"),
new Array("", "71", "95", "69", "105", "100", "83", "91", "95", "100", "105", "111", "105"),
new Array("", "118", "111", "133", "100", "100", "95", "105", "105", "111", "118", "133", "143", "143"),
new Array("", "118", "118", "95", "105", "105", "118"),
new Array("", "95", "100", "111", "111", "100", "105", "100", "100", "111", "100", "105"),
new Array("", "143", "182"),
new Array("", "105", "143", "133"),
new Array("", "87", "87", "95", "87", "100", "125", "80", "87", "95", "100", "100", "95", "133", "100", "105", "77", "80", "105", "87", "91", "100", "105"),
new Array("", "87"),
new Array("", "95", "118", "118", "133", "100", "105", "105", "111", "77", "91", "87", "87", "105", "100", "91", "63", "71"),
new Array("", "167", "154", "154", "95", "118", "118", "95", "95", "118", "143", "143", "143", "95", "111", "133", "118", "133", "74", "100", "111", "133", "154", "167", "95", "133", "133", "95", "118", "133", "118", "143", "143", "143", "143", "118", "143", "143", "95", "100", "118", "87", "91", "111", "118", "133", "71", "105", "125", "125", "133", "143", "105", "105", "111", "143", "80", "91", "71"),
new Array("", "95", "100", "111", "118", "100", "80", "95", "100"),
new Array("", "100", "100", "91", "59", "133", "143", "111", "125", "91", "118", "125", "100", "87", "83", "71", "143", "143", "69", "118", "118"),
new Array("", "111", "111", "105", "91", "95", "95", "95", "100", "100", "100", "100", "100", "100", "100", "100", "118", "125", "133", "91", "95", "111", "111", "105", "100", "100", "118", "118"),
new Array("", "143", "154", "154", "167", "167", "182"),
new Array("", "87", "105", "87", "77", "83", "74", "111", "105", "80", "83", "87", "74", "91", "77", "95", "95"),	 
new Array("", "111", "118", "87", "83", "61", "83", "67", "71", "111", "111", "95", "100", "77", "133", "43", "87", "91", "80", "80", "69", "125", "133", "100", "111", "100", "111", "125", "133", "63", "80", "65", "77"),
new Array("", "83", "80", "80", "83", "91", "100", "83", "100", "80", "133", "133", "125", "118", "125", "87"),
new Array("", "87", "91", "91", "87", "95", "91", "105", "100", "91", "87", "100", "111", "125", "118", "87", "105", "95") 
);


		var index = document.getElementById("DriveMake").selectedIndex-1;
		var obj = document.getElementById("DriveModel");

		for(i=obj.length; i>=0; i--)
		{
			obj.remove(i);    		
		}

		for(var i=0; i<arrText[index].length; i++)
		{
			var opt = document.createElement("option");
			opt.value=arrValue[index][i];
			opt.appendChild(document.createTextNode(arrText[index][i]));
			obj.appendChild(opt);
			if(val!=undefined && val==arrValue[index][i])
			{
				opt.selected=true;
			}
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
function calDrivingModal(num)
{
	var drivingYear = parseFloat(document.getElementById('drivingYear').value);       
	var DriveMake = document.getElementById('DriveMake').value; 
	var DriveModel = parseFloat(document.getElementById('DriveModel').value); 
	var drivingMilesYear = parseFloat(document.getElementById('drivingMilesYear').value);

	val=drivingYear + '~' + DriveMake + '~' + DriveModel + '~' + drivingMilesYear;

	var elements = document.getElementById('span_modal_result').getElementsByTagName('div');

	len=0;
	if(elements.length>0)
		len = (elements.length/2);

	var driving_result_mpg = ((DriveModel * drivingMilesYear * 19.56) / drivingYear);
	driving_result_mpg = parseInt(driving_result_mpg);

	if(num==undefined)
	{
		len++;
		
		document.getElementById('spanResultTopMod').style.display='block';
		
		var result1 = '<div id="Driving' + len + '" style="padding-top:2px">' + ' Driving Emissions ' + len + " : " + Comma(driving_result_mpg) + ' lbs CO<sub>2</sub>/Yr&nbsp;&nbsp;' + '<a href="javascript:editDrivingData('+len+')" >Edit</a> <span style="color:#999999">|</span> <span id="spnDeleteDriving' + len +'"><a href="javascript:deleteDrivingData('+len+')" >Delete</a></span></div><div style="display:none" id="divDrivingData' + len + '">'+val+'</div>';
		document.getElementById('span_modal_result').innerHTML+=result1;
		
		totalDrivingMPG()
		clearDrivingData();
	}
	else
	{
		document.getElementById('Driving'+num).innerHTML=' Driving Emissions ' + num + " : " + Comma(driving_result_mpg) + ' lbs CO<sub>2</sub>/Yr&nbsp;&nbsp;<a href="javascript:editDrivingData('+num+')" >Edit</a> <span style="color:#999999">|</span> <span id="spnDeleteDriving' + len +'"><a href="javascript:deleteDrivingData('+num+')">Delete</a></span>';
		document.getElementById('divDrivingData'+num).innerHTML=val;
		totalDrivingMPG()
		clearDrivingData();
		document.getElementById('spnDeleteDriving'+num).style.display="inline";
	}				
}	

function clearDrivingData()
{
	document.getElementById('drivingYear').options[0].selected=true;
	document.getElementById('DriveMake').options[0].selected=true;
	document.getElementById('DriveMake').disabled=true;
	document.getElementById('DriveModel').options[0].selected=true;
	document.getElementById('DriveModel').disabled=true;	
	document.getElementById('drivingMilesYear').options[0].selected=true;
	document.getElementById('drivingMilesYear').disabled=true;		
	document.getElementById('calculate_driving_modal').disabled=true;
	document.getElementById('calculate_driving_modal').onclick=function(){calDrivingModal();}
}
 
 
function editDrivingData(i)
{
	document.getElementById('spnDeleteDriving'+i).style.display="none";
	
	app = navigator.appName;
	if(app=='Microsoft Internet Explorer')
		val = document.getElementById('divDrivingData'+i).innerHTML;
	else
		val = document.getElementById('divDrivingData'+i).textContent;

	arrVal = val.split('~');

	for(var k=0; k<document.getElementById('drivingYear').length; k++)
	{
		if(document.getElementById('drivingYear').options[k].value==arrVal[0])
		{
			document.getElementById('drivingYear').options[k].selected=true;
			break;
		}
	}
	
	document.getElementById('DriveMake').disabled=false;	
	for(var k=0; k<document.getElementById('DriveMake').length; k++)
	{
		if(document.getElementById('DriveMake').options[k].value==arrVal[1])
		{
			document.getElementById('DriveMake').options[k].selected=true;
			break;
		}
	}
	changeModel(arrVal[2]);

	document.getElementById('DriveModel').disabled=false;	
/*	for(var k=0; k<document.getElementById('DriveModel').length; k++)
	{
		if(document.getElementById('DriveModel').options[k].value==arrVal[2])
		{
			document.getElementById('DriveModel').options[k].selected=true;
			break;
		}
	}*/


	document.getElementById('drivingMilesYear').disabled=false;	
	for(var k=0; k<document.getElementById('drivingMilesYear').length; k++)
	{
		if(document.getElementById('drivingMilesYear').options[k].value==arrVal[3])
		{
			document.getElementById('drivingMilesYear').options[k].selected=true;
			break;
		}
	}

	document.getElementById('calculate_driving_modal').disabled=false;
	document.getElementById('calculate_driving_modal').onclick=function(){calDrivingModal(i);}
}

function deleteDrivingData(i)
{
	objDiv = document.getElementById('Driving'+i);
	document.getElementById('span_modal_result').removeChild(objDiv);
	objDiv = document.getElementById('divDrivingData'+i);
	document.getElementById('span_modal_result').removeChild(objDiv);
	totalDrivingMPG()
	
	
	var elements = document.getElementById('span_modal_result').getElementsByTagName('div');	
    if(elements.length==0)
    document.getElementById('spanResultTopMod').style.display='none';


	
	}

















function enableDrivingCal()
{  
	if (document.getElementById('drivingYear').value!='')
	{       
		document.getElementById('DriveMake').disabled=false;
	    document.getElementById('DriveModel').disabled=false;
		document.getElementById('drivingMilesYear').disabled=false; 
	}
	else
	{       
		document.getElementById('DriveMake').disabled=true;
	    document.getElementById('DriveModel').disabled=true;
		document.getElementById('drivingMilesYear').disabled=true; 
	}

	if (document.getElementById('drivingYear').value!='' && document.getElementById('DriveModel').value!='')
    	document.getElementById('calculate_driving_modal').disabled=false;
	else
    	document.getElementById('calculate_driving_modal').disabled=true;
}

function cal_flying()
{
var short_flight = parseInt(document.getElementById('short_flight').value);       
var medium_flight = parseInt(document.getElementById('medium_flight').value); 
var long_flight = parseInt(document.getElementById('long_flight').value);
var flying_result = (500*short_flight)+(1250*medium_flight)+(2000*long_flight);
                 
				 if (flying_result == 0)
				 {	 var flying_result1 = ''; 
                     document.getElementById('table_cal_flying').style.display='none'; 				 
				 }
				 
	   	    else
			 {   var flying_result1 = '<div style="color:000000; padding-bottom:6px;"><b>Your Air Travel Footprint</b></div> <div style="color:#009900;">' + 'Flying Emissions : ' + Comma(flying_result) + ' lbs CO<sub>2</sub>/Yr' + '</div><div style="padding-top:6px;">National Average: 1,016 lbs CO<sub>2</sub>/Yr</div>';
				 document.getElementById('table_cal_flying').style.display='block';
			 }
				 document.getElementById('flying_result_id').value=flying_result;
				 document.getElementById('flying_result_id_comma').value=Comma(flying_result);
				 document.getElementById('span_cal_flying').innerHTML=flying_result1;
			 
}  


function seeResult()
{
var result_home_id = parseInt(document.getElementById('result_home_id').value);
var flying_result_id = parseInt(document.getElementById('flying_result_id').value);
var driving_result_mpg_id = parseInt(document.getElementById('driving_result_mpg_id').value);

drawChart(result_home_id, driving_result_mpg_id, flying_result_id);

if (document.getElementById('result_home_id').value == '')
result_home_id = 0;

if (document.getElementById('flying_result_id').value == '')
flying_result_id = 0;

if (document.getElementById('driving_result_mpg_id').value == '')
driving_result_mpg_id = 0;


var global_result = (result_home_id + flying_result_id + driving_result_mpg_id);
if (global_result == 0)

{ document.getElementById('span_global_result_comma').innerHTML=' ?';
  document.getElementById('span_global_result').value=0;
  document.getElementById('result').style.display="none";
    }
else
{  
   document.getElementById('span_global_result_comma').innerHTML= Comma(global_result) + ' lbs';
   document.getElementById('span_global_result').value= global_result + ' lbs'; 
  
   Attr(); 
   
   }

document.getElementById('spanGalGasEql').innerHTML = parseFloat((parseInt(10000*(global_result*0.0004535/0.00881)))/10000); 
document.getElementById('spanBarOilEql').innerHTML = parseFloat((parseInt(10000*(global_result*0.0004535/0.43)))/10000);
document.getElementById('spanProCylEql').innerHTML = parseFloat((parseInt(10000*(global_result*0.0004535/0.024)))/10000);
document.getElementById('spanRailCoalEql').innerHTML = parseFloat((parseInt(10000*(global_result*0.0004535/191.5)))/10000);
document.getElementById('spanTreeSeedEql').innerHTML = parseFloat((parseInt(10000*(global_result*0.0004535/0.039)))/10000);
document.getElementById('spanHomeElectEql').innerHTML = parseFloat((parseInt(10000*(global_result*0.0004535/7.55)))/10000);
document.getElementById('spanHomeEnergyEql').innerHTML = parseFloat((parseInt(10000*(global_result*0.0004535/11.33)))/10000);
document.getElementById('spanWasteLandfilEql').innerHTML = parseFloat((parseInt(10000*(global_result*0.0004535/2.9)))/10000);
document.getElementById('spanAcresPineEql').innerHTML = parseFloat((parseInt(10000*(global_result*0.0004535/4.4)))/10000);
document.getElementById('spanDeforestEql').innerHTML = parseFloat((parseInt(10000*(global_result*0.0004535/143.37)))/10000);
document.getElementById('spanCarsRoadEql').innerHTML = parseFloat((parseInt(10000*(global_result*0.4536/5202.27)))/10000);
}

function deleteFinalhome()
{  	document.getElementById('result_home_id').value=0;
document.getElementById('result_home_id_comma').value=0;
	seeResult();   }

function deleteFinaldriving()
{  	document.getElementById('driving_result_mpg_id').value=0;
document.getElementById('driving_result_mpg_id_comma').value=0;
	seeResult();   }
	
function deleteFinalflying()
{  	document.getElementById('flying_result_id').value=0;
document.getElementById('flying_result_id_comma').value=0;
	seeResult();   }
  
