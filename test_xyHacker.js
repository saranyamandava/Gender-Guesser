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

def tokenize(thresh = 5):
    count  = dict()
    idx = 1
    word_index = dict()
    for txt in data_text:
        words = preprocess(txt)
        for word in words:
            if word in count.keys():
                count[word] += 1
            else:
                count[word]  = 1
    most_counts = [word for word in count.keys() if count[word]>=thresh]
    for word in most_counts:
        word_index[word] = idx
        idx+=1
    return word_index


function create_sequences(txt)
{
    max_tokens = 2750
    tokens = []
    words = process(txt)
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
function start(){
	//img = document.getElementById('image').files[0];
	
        
        model = await tf.loadModel('model/model.json')
        
        var status = document.getElementById('status')
      
        status.innerHTML = 'Model Loaded'
        
        var myText = document.getElementById("myText");
        var s = myText.value;
        seq = create_sequences(s) 
        input = tf.tensor(seq)
        input = input.expandDims(0)
        pred = document.model.predict(input)
        console.log(pred)
         
        }
        
