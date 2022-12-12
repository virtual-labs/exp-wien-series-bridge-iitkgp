
var w,check=0;


function add(x,y)
{ 
	var z=[];
	z[0]=x[0] + y[0];
	z[1]=x[1] + y[1];
	return z;
}
function mult(x,y)
{ 
	var z=[];
	z[0]=(x[0] * y[0]) - (x[1] * y[1]);
	z[1]=(x[0] * y[1]) + (x[1] * y[0]);
	return z;
}
function div(x,y)
{ 
	var z=[]; var t=[];
	t[0]=(y[0]) / ((y[0] * y[0]) + (y[1] * y[1]));
	t[1]=(-1 * y[1]) / ((y[0] * y[0]) + (y[1] * y[1]));
	z=mult(x,t);
	return z;
}

/////////////////////////////// The code starts from here/////////////////////////////////////
function Set_c()
{
	var image = document.getElementById('myImage');
	if (image.src.match("s2")) 
	{
		alert('Switch off the circuit first.');
	}
	else
	{
		document.f1.r1.value= 5;
		document.f1.c1.value= parseFloat(document.getElementById('c33').value);
	}
}
function simulate_rc()
{
	if(check==1)
	{
		var r2=parseFloat(document.getElementById('r2').value);
		
		var r3=parseFloat(document.getElementById('r3').value);
		var c4=parseFloat(document.getElementById('c4').value);
		document.f1.c333.value = ((c4*r3)/r2) * 1000000;
		var r4=parseFloat(document.getElementById('r4').value);
		document.f1.r333.value = ((r2*r4)/r3);
		document.f1.rd33.value = w * ((c4*r3)/r2) * ((r2*r4)/r3);
	}
	else
	{
		alert("Please Switch on the supply to verify the milivoltmeter reading first.");
	}

}
function printDiv(divName) {
     var printContents = document.getElementById(divName).innerHTML;
     var originalContents = document.body.innerHTML;	 
     document.body.innerHTML = printContents;
     window.print();
     document.body.innerHTML = originalContents;
}
function changeImage() {
	
		var image = document.getElementById('myImage');
		var im5= document.getElementById('v1');
		var im6= document.getElementById('f1');
		if (image.src.match("s1")) {
			image.src = "./images/s2.png"; cf3=1;
			im5.setAttribute('readonly', 'readonly'); im6.setAttribute('readonly', 'readonly');
			check=1;
			execute_ckt();
		} else {
			image.src = "./images/s1.png"; cf3=0;
			im5.removeAttribute('readonly'); im6.removeAttribute('readonly');
			document.f1.A1.value = 0; check=0;
			perform_meter();
			document.f1.A2.value='';
			document.f1.c333.value='';
			document.f1.r333.value='';
			document.f1.rd33.value='';
			
		}
	}
	function execute_ckt()
	{
		if(check==1)
		{
			document.f1.A1.value=0;
			var r1=[], r3=[], r4=[], v1=[], c1=[], r2=[], c4=[], f1;
			var  z=[], z2=[], z1=[], i=[], i2=[], i1=[], dv=[], dvv=[];
			f1=parseFloat(document.getElementById('f1').value);
			w= 2*3.141*f1;
			r3[0]=parseFloat(document.getElementById('r3').value); r3[1]=0;
			r1=[5,0];
			r4[0]=parseFloat(document.getElementById('r4').value); r4[1]=0; 
			r2[0]=parseFloat(document.getElementById('r2').value); r2[1]=0; 
			c4[1]=(-1 / ((w * parseFloat(document.getElementById('c4').value)))); c4[0]=0; 
			c1[1]=(-1 / ((w * parseFloat(document.getElementById('c1').value)) * 0.000001)); c1[0]=0; 
			v1[0]=parseFloat(document.getElementById('v1').value); v1[1]=0; 
			
			z1=add(add(c1,r1),r2);
			z2=add(add(c4,r4),r3);
			z=div(mult(z1,z2),add(z1,z2));
			//i=div(v1,z); alert(i);
			i1=div(mult(div(v1,z),z2), add(z1,z2)); 
			i2=div(mult(div(v1,z),z1), add(z1,z2)); 
			dv=add(mult(i1,r2),(mult([-1,0], mult(i2,r3))));
			//alert(dv[0]); alert(dv[1]);
			dvv=(Math.sqrt((dv[0] * dv[0]) + (dv[1] * dv[1])))*1000 ;
			document.f1.A1.value= dvv.toPrecision(5);
			document.f1.A2.value= dvv.toPrecision(5);
			perform_meter();
		}
		
	}





