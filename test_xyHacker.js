function clearContents() {
  document.getElementById('myText').value = "";
}
async function loadDict()
{
  await $.ajax({
  url: 'dict.csv',
  dataType: 'text',}).done(success);
}
function success(data)
{
    var wd_idx = new Object();
    lst = data.split(/\r?\n|\r/)
    for(var i = 0 ; i < lst.length ;i++){
        key = (lst[i]).split(',')[0]
        value = (lst[i]).split(',')[1]
        
        if(key == "")
            continue
        wd_idx[key] = parseInt(value)
        
    }
    
    word_index = wd_idx
}

function preprocess(txt)
{
    out = txt.replace(/[^a-zA-Z0-9\s]/, '')
    out = out.trim().split(/\s+/)
    for (var i = 0 ; i < out.length ; i++)
        out[i] = out[i].toLowerCase()
    return out
}


function create_sequences(txt)
{
    max_tokens = 228
    tokens = []
    words = preprocess(txt)
    seq = Array.from(Array(max_tokens), () => 0) 
    start = max_tokens-words.length
    for(var i= 0 ; i< words.length ; i++)
    {
        if (Object.keys(word_index).includes(words[i])){
            seq[i+start] = word_index[words[i]]
        }    
        
    }
    return seq
}
async function start(){
	//img = document.getElementById('image').files[0];
	
        var class_names = ['male','female']
        model = await tf.loadModel('model/model.json')
        
        var status = document.getElementById('status')
      
        status.innerHTML = 'Model Loaded'
        await loadDict()
        var myText = document.getElementById("myText");
        var s = myText.value;
        seq = create_sequences(s) 
        input = tf.tensor(seq)
        input = input.expandDims(0)
        pred = model.predict(input)
        if (pred.dataSync() >= 0.5){
	   document.getElementById("Result").innerHTML = class_names[0]
	   document.getElementById("Probability").innerHTML=(pred.dataSync() * 100).toFixed(0)
	} else{
	   document.getElementById("Result").innerHTML = class_names[1]
	   document.getElementById("Probability").innerHTML=(pred.dataSync() * 100).toFixed(0)	
	}
         
        }
        
