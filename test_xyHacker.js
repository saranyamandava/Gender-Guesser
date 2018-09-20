function preprocess(s){
	var tokens = s.split(" ")
    
    console.log(tokens.length)
    return tokens
}
function predict(s) {
        
        var class_names = ['Male','Female']
        //get the prediction 
        var pred = model.predict(preprocess(s)).dataSync()
        console.log(pred)            
        //retreive the highest probability class label 
        //const idx = tf.argMax(pred);

                
        //find the predictions 
        //var indices = findIndicesOfMax(pred, 1)
        //console.log(indices)
        //var probs = findTopValues(pred, 1)
        //var names = class_names(indices) 

        //set the table 
        //setTable(names, probs) 
        //document.getElementById("Result").innerHTML = names
        
	    //console.log(names);
        //console.log(document.getElementById("Result"));
    
  }
async function start(){
	//img = document.getElementById('image').files[0];
	
        
        model = await tf.loadModel('model/model.json')
        
        var status = document.getElementById('status')
      
        status.innerHTML = 'Model Loaded'
        
        var myText = document.getElementById("myText");
        var s = myText.value;
        console.log(typeof(s))
        predict(s)
         
        }
        
