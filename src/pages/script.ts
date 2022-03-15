 // Create a "close" button and append it to each list item
 let myNodelist = document.getElementsByTagName("LI");
 for (let i = 0; i < myNodelist.length; i++) {
   let span = document.createElement("SPAN");
   let txt = document.createTextNode("\u00D7");
   span.className = "close";
   span.appendChild(txt);
   myNodelist[i].appendChild(span);
 }

 // Click on a close button to hide the current list item
 let closebuttom = document.getElementsByClassName("close");
 for (let i = 0; i < closebuttom.length; i++) {
   closebuttom[i].addEventListener("click",function() {
     let div = this.parentElement;
     div.style.display = "none";
   });
 }

 //Clear placeholder on input focus
 function clearPlaceholder() {
   (<HTMLInputElement>document.getElementById("myInput")).placeholder = "";
   (<HTMLInputElement>document.getElementById("myInput")).value = "http://";
 }

 // Create a new list item when clicking on the "Add" button
 function newElement() {
   let li = document.createElement("li");
   let inputValue = (<HTMLInputElement>document.getElementById("myInput")).value;
   var sendlistitem = inputValue;
   let t = document.createTextNode(inputValue);
   li.appendChild(t);
   if (inputValue === "") {
     alert("Você precisa digitar algo! Se liga =D");
   } else {
     document.getElementById("myUL").appendChild(li);
   }
   (<HTMLInputElement>document.getElementById("myInput")).value = "";
   (<HTMLInputElement>document.getElementById("myInput")).placeholder = "Type Url";

   let span = document.createElement("SPAN");
       let txt = document.createTextNode("\u00D7");
       span.className = "close";
       span.appendChild(txt);
       li.appendChild(span);

   send(sendlistitem, li);
 }

 //Send the new list item to server
 //Create another list item from new shorturl
 //Always use Content-Type: application/json in Insomnia to send data in json body
 function send(sendlistitem:string, li:HTMLLIElement) {
   const backendForm = {
     originURL: sendlistitem,
   };
   const backendloginurl = "https://httpshortner.herokuapp.com/fullurl";
   fetch(backendloginurl, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(backendForm),
   })
     .then((response) => response.json())
     .then((showjson) => {
       console.log(showjson);           

       let linkurl = document.createElement("a");
       linkurl.href = showjson.shortURL;
       linkurl.title = showjson.shortURL;
       linkurl.target = "_blank";
       linkurl.appendChild(document.createTextNode(showjson.shortURL));

       let lishorturl = document.createElement("li");            
       let valueshorturl = document.createTextNode(showjson.shortURL);
       lishorturl.appendChild(linkurl);
       lishorturl.appendChild(document.createTextNode("."));
       document.getElementById("myUL").appendChild(lishorturl);

       let spanurl = document.createElement("SPAN");
       spanurl.className = "close";
       let txturl = document.createTextNode("\u00D7");
       spanurl.appendChild(txturl);
       lishorturl.appendChild(spanurl);

       for (let i = 0; i < closebuttom.length; i++) {
         closebuttom[i].addEventListener("click",function() {
           let div = this.parentElement;
           div.style.display = "none";
         });
       }
     })

     .catch((error) => console.log("Erro:", error)); 
 }