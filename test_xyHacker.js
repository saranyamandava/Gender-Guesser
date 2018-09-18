

async function start(){
	
	model = await tf.loadModel('model/model.json')
        
        var status = document.getElementById('status')
      
        status.innerHTML = 'Model Loaded'
        
        var myText = document.getElementById("myText");
        var s = myText.value;
        console.log(s)
        
         
        }
        
